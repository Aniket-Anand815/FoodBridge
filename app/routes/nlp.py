from fastapi import APIRouter, Depends
from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/ngo", tags=["NGO"])

@router.get("/dashboard")
def ngo_dashboard(current_user: User = Depends(get_current_user)):
    if current_user.role != "ngo":
        return {"detail": "Unauthorized"}

    return {
        "role": "ngo",
        "message": "Welcome NGO",
        "stats": {
            "active_requests": 4,
            "completed_pickups": 21
        }
    }
