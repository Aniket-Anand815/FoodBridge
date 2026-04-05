from fastapi import APIRouter

router = APIRouter(prefix="/route", tags=["Route"])

@router.get("/")
def route():
    return {"route": "optimized"}
