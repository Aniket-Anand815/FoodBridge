from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.location import Location
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/location", tags=["Location"])


@router.post("/update")
def update_location(
    lat: float,
    lng: float,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    record = Location(
        username=user["sub"],
        latitude=lat,
        longitude=lng,
    )

    db.add(record)
    db.commit()

    return {"message": "Location updated"}


@router.get("/latest/{username}")
def get_latest(username: str, db: Session = Depends(get_db)):
    return (
        db.query(Location)
        .filter(Location.username == username)
        .order_by(Location.id.desc())
        .first()
    )