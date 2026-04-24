from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.db import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ngo_name = Column(String) # For separate owner name and NGO name
    type = Column(String) # NGO, Orphanage, Animal Shelter, Old Age Home, Biogas Plant
    latitude = Column(Float)
    longitude = Column(Float)
    address = Column(String)
    rating = Column(Float, default=4.0)
    risk_score = Column(Float, default=0.0)
    is_verified = Column(Boolean, default=False)
    id_number = Column(String) # DARPAN ID
    registration_number = Column(String)
    state = Column(String)
    district = Column(String)
    sub_district = Column(String)
    pin_code = Column(String)
    sectors = Column(String)
    last_update_on = Column(String)
    is_blacklisted = Column(Boolean, default=False)
    contact_email = Column(String)
