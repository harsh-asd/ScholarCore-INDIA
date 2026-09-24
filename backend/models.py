from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    is_admin = Column(Boolean, default=False)
    applications = relationship("Application", back_populates="user")

class Scheme(Base):
    __tablename__ = "schemes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    criteria = Column(JSON) # JSON criteria for rules engine
    applications = relationship("Application", back_populates="scheme")

class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    scheme_id = Column(Integer, ForeignKey("schemes.id"))
    status = Column(String, default="pending") # pending, approved, rejected, flagged
    extracted_data = Column(JSON, nullable=True) # OCR extracted data
    discrepancies = Column(JSON, nullable=True) # Flagged discrepancies
    
    user = relationship("User", back_populates="applications")
    scheme = relationship("Scheme", back_populates="applications")
