from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.organization import Organization
from math import radians, cos, sin, asin, sqrt

router = APIRouter(prefix="/organizations", tags=["organizations"])

def haversine(lon1, lat1, lon2, lat2):
    # Calculate the great circle distance between two points on the earth
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371 # Radius of earth in kilometers
    return c * r

@router.get("/all")
def get_all(db: Session = Depends(get_db)):
    return db.query(Organization).all()

@router.get("/nearby")
def get_nearby(lat: float, lng: float, db: Session = Depends(get_db)):
    radius = 10.0
    max_radius = 100.0 # Upper limit to avoid infinite expansion
    
    while radius <= max_radius:
        orgs = db.query(Organization).all()
        nearby = []
        for org in orgs:
            dist = haversine(lng, lat, org.longitude, org.latitude)
            if dist <= radius:
                org_data = org.__dict__.copy()
                org_data.pop('_sa_instance_state', None)
                org_data['distance'] = round(dist, 2)
                nearby.append(org_data)
        
        if nearby:
            return {"radius": radius, "organizations": sorted(nearby, key=lambda x: x['distance'])}
        
        radius += 3.0
    
    return {"radius": radius, "organizations": [], "message": "No organizations found within 100km"}
