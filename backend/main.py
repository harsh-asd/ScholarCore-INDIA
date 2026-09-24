from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Scholarship Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.post("/applications/", response_model=schemas.Application)
def create_application(application: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    db_application = models.Application(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

@app.get("/applications/", response_model=list[schemas.Application])
def read_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Application).offset(skip).limit(limit).all()
