from fastapi import APIRouter

router=APIRouter(prefix="/donor",tags=["donor"])

donations=[]

@router.post("/donate")
def donate(data:dict):

    donations.append(data)

    return {"message":"Donation created"}

@router.get("/donations")
def donor_dashboard():

    return {
        "donations": 24,
        "pickups": 18,
        "impact": 156,
        "donation_trends": [5, 8, 12, 10, 15],
        "donation_types": [45, 30, 25]
    }