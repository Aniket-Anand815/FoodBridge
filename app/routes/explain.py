from fastapi import APIRouter

router = APIRouter(prefix="/explain", tags=["XAI"])

@router.get("/")
def explain():
    return {"explanation": "Model explanation placeholder"}
