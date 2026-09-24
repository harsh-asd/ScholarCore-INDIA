from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class SchemeBase(BaseModel):
    name: str
    description: str
    criteria: Dict[str, Any]

class SchemeCreate(SchemeBase):
    pass

class Scheme(SchemeBase):
    id: int
    class Config:
        orm_mode = True
        from_attributes = True

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    is_admin: bool = False

class User(UserBase):
    id: int
    is_admin: bool
    class Config:
        orm_mode = True
        from_attributes = True

class ApplicationBase(BaseModel):
    user_id: int
    scheme_id: int

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: int
    status: str
    extracted_data: Optional[Dict[str, Any]] = None
    discrepancies: Optional[Dict[str, Any]] = None
    class Config:
        orm_mode = True
        from_attributes = True
