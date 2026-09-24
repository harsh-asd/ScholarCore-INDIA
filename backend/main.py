from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, ai_pipeline
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Scholarship Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Enabled Scholarship Management System API"}

MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB

@app.post("/extract_document/")
async def extract_document(file: UploadFile = File(...)):
    valid_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf']
    if file.content_type not in valid_types and not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail={"error": "Invalid file format", "message": "Only images and PDF formats are supported."})
    
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail={"error": "File too large", "message": "File size exceeds the 5MB limit."})
    
    try:
        text, confidence = ai_pipeline.extract_text_from_image(contents)
        extracted_entities = ai_pipeline.extract_entities(text, confidence)
        return {"extracted_data": extracted_entities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.User).offset(skip).limit(limit).all()

@app.post("/schemes/", response_model=schemas.Scheme)
def create_scheme(scheme: schemas.SchemeCreate, db: Session = Depends(get_db)):
    db_scheme = models.Scheme(**scheme.dict())
    db.add(db_scheme)
    db.commit()
    db.refresh(db_scheme)
    return db_scheme

@app.get("/schemes/", response_model=list[schemas.Scheme])
def read_schemes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Scheme).offset(skip).limit(limit).all()

import rule_engine

@app.post("/applications/", response_model=schemas.Application)
def create_application(application: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    app_data = application.dict(exclude={"extracted_data"})
    db_application = models.Application(**app_data)
    
    if application.extracted_data:
        db_application.extracted_data = application.extracted_data
    
    scheme = db.query(models.Scheme).filter(models.Scheme.id == application.scheme_id).first()
    if scheme and scheme.criteria and db_application.extracted_data:
        engine = rule_engine.RuleEngine(scheme.criteria)
        evaluation = engine.evaluate(db_application.extracted_data)
        db_application.status = evaluation["status"]
        if evaluation["discrepancies"]:
            db_application.discrepancies = {"issues": evaluation["discrepancies"]}
    
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

@app.get("/applications/", response_model=list[schemas.Application])
def read_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Application).offset(skip).limit(limit).all()



@app.post('/api/evaluate-application')
async def evaluate_application(
    scheme_id: int = Form(...),
    user_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    valid_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf']
    if file.content_type not in valid_types and not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail={"error": "Invalid file format", "message": "Only images and PDF formats are supported."})
    
    # 1. Extract data
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail={"error": "File too large", "message": "File size exceeds the 5MB limit."})
        
    try:
        text, confidence = ai_pipeline.extract_text_from_image(contents)
        extracted_data = ai_pipeline.extract_entities(text, confidence)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'OCR failed: {str(e)}')
        
    # 2. Get scheme
    scheme = db.query(models.Scheme).filter(models.Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail='Scheme not found')
        
    # 3. Rule Engine
    engine = rule_engine.RuleEngine(scheme.criteria)
    evaluation = engine.evaluate(extracted_data)
    
    # 4. Save to DB
    db_application = models.Application(
        user_id=user_id,
        scheme_id=scheme_id,
        status=evaluation['status'],
        extracted_data=extracted_data,
        discrepancies={'issues': evaluation['discrepancies']} if evaluation['discrepancies'] else None
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    
    return {
        'message': 'Application evaluated successfully',
        'application_id': db_application.id,
        'status': db_application.status,
        'discrepancies': evaluation['discrepancies'],
        'extracted_data': extracted_data
    }

import analytics

@app.get('/api/admin/analytics-summary')
def get_analytics(db: Session = Depends(get_db)):
    try:
        return analytics.get_analytics_summary(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Failed to load analytics: {str(e)}')
