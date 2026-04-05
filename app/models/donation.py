from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    food_item = Column(String)
    quantity = Column(String)
    status = Column(String, default="PENDING")