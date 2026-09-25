import os
import random
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User, Scheme, Application
from datetime import datetime, timedelta

def seed_database():
    print("Initializing Database...")
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    # 1. Seed Schemes
    print("Seeding Schemes...")
    if not db.query(Scheme).first():
        schemes = [
            Scheme(
                name="National Fellowship and Scholarship for Higher Education of ST Students (NFST)",
                description="Provides financial assistance to Scheduled Tribe students for pursuing higher education (M.Phil/Ph.D).",
                criteria={"min_income": 0, "max_income": 600000, "category": "ST", "min_marks": 55}
            ),
            Scheme(
                name="National Overseas Scholarship (NOS) for ST Students",
                description="Provides financial assistance to ST students for pursuing Master's and Ph.D. abroad.",
                criteria={"min_income": 0, "max_income": 600000, "category": "ST", "min_marks": 60}
            )
        ]
        db.add_all(schemes)
        db.commit()
    
    # 2. Seed Users (Applicants & Admins)
    print("Seeding Users...")
    if not db.query(User).first():
        users = [
            User(name="Admin User", email="admin@mota.gov.in", is_admin=True),
            User(name="Amit Kumar", email="amit@example.com", is_admin=False),
            User(name="Priya Sharma", email="priya@example.com", is_admin=False),
            User(name="Rahul Verma", email="rahul@example.com", is_admin=False),
            User(name="Sneha Patil", email="sneha@example.com", is_admin=False),
            User(name="Vikram Singh", email="vikram@example.com", is_admin=False),
            User(name="Anjali Desai", email="anjali@example.com", is_admin=False),
            User(name="Suresh Munda", email="suresh@example.com", is_admin=False),
            User(name="Kavita Oraon", email="kavita@example.com", is_admin=False),
        ]
        db.add_all(users)
        db.commit()

    # 3. Seed Applications
    print("Seeding Applications...")
    if not db.query(Application).first():
        users_in_db = db.query(User).filter(User.is_admin == False).all()
        schemes_in_db = db.query(Scheme).all()
        
        statuses = ["approved", "pending", "pending", "rejected", "flagged"]
        
        for i, u in enumerate(users_in_db):
            s = schemes_in_db[i % len(schemes_in_db)]
            status = random.choice(statuses)
            
            # Generate fake OCR data
            ocr_data = {
                "extracted_name": u.name.upper(),
                "extracted_income": random.randint(200000, 750000),
                "extracted_caste": "ST",
                "extracted_marks": round(random.uniform(50.0, 95.0), 1),
                "document_confidence_score": round(random.uniform(0.70, 0.99), 2),
                "verified": status == "approved"
            }
            
            # Generate fake discrepancies if flagged or rejected
            discrepancies = {}
            if status in ["flagged", "rejected"]:
                if ocr_data["extracted_income"] > 600000:
                    discrepancies["income"] = f"Income {ocr_data['extracted_income']} exceeds limit of 6L."
                if ocr_data["extracted_marks"] < s.criteria["min_marks"]:
                    discrepancies["marks"] = f"Marks {ocr_data['extracted_marks']}% below criteria."
                if not discrepancies:
                    discrepancies["document"] = "Blurry document uploaded. Needs manual verification."
                    
            app = Application(
                user_id=u.id,
                scheme_id=s.id,
                status=status,
                extracted_data=ocr_data,
                discrepancies=discrepancies if discrepancies else None,
                created_at=datetime.utcnow() - timedelta(days=random.randint(1, 30))
            )
            db.add(app)
            
        db.commit()

    print("Database seeding completed successfully!")
    db.close()

if __name__ == "__main__":
    seed_database()
