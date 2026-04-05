from sqlalchemy import Column, Integer, Float, String
from app.database.db import Base


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)