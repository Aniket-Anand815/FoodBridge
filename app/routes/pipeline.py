from fastapi import APIRouter

router = APIRouter(prefix="/pipeline", tags=["Pipeline"])

@router.get("/")
def pipeline():
    return {"pipeline": "ok"}
