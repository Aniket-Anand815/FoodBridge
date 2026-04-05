from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from app.database.db import Base
from sqlalchemy import Boolean
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # donor / collector / admin
    is_active = Column(Boolean, default=True)


class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)

    message = Column(String, nullable=False)
    quantity_kg = Column(Integer)
    waste_type = Column(String)

    distance_km = Column(Float)
    capacity = Column(Integer)
    reliability = Column(Float)

    suitable = Column(Integer)
    confidence = Column(Float)
    eta_minutes = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)
