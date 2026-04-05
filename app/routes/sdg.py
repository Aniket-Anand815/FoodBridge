from fastapi import APIRouter

router = APIRouter(prefix="/sdg", tags=["SDG"])

@router.get("/")
def sdg():
    return {"sdg": "SDG 12 – Responsible Consumption"}
