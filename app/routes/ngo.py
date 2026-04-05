from fastapi import APIRouter

router=APIRouter(prefix="/ngo",tags=["ngo"])

accepted=[]

@router.get("/dashboard")
def ngo_dashboard():

    return {
        "pending": 12,
        "accepted": 45,
        "beneficiaries": 287,
        "weekly_donations": [8, 12, 5, 10, 15, 9, 7],
        "donation_status": [45, 12, 8]
    }

@router.post("/accept/{id}")
def accept(id:int):

    accepted.append(id)

    return {"message":"Donation accepted"}