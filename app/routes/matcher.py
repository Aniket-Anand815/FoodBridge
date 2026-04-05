from fastapi import APIRouter

router = APIRouter(prefix="/matcher", tags=["Matcher"])

@router.get("/")
def match():
    return {"match": "donor-ngo"}
