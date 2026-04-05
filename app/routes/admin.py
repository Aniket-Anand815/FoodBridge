from fastapi import APIRouter

router=APIRouter(prefix="/admin",tags=["admin"])

@router.get("/dashboard")
def dashboard():

    return {"message":"Admin Dashboard"}

@router.get("/analytics")
def analytics():

    return {
        "donations": 120,
        "ngos": 32,
        "pickups": 15,
        "users": 456
    }