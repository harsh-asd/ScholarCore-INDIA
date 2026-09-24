from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Using sqlite for easy local testing without a running postgres instance, 
# but the models are compatible with PostgreSQL as requested.
# To switch to PostgreSQL, change the URL to "postgresql://user:password@localhost/scholarship_db"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
