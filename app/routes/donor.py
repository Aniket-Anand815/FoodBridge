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
        "donations": 42,
        "pickups": 38,
        "impact": 1250,
        "savings": "₹15,400",
        "donation_trends": [12, 15, 8, 22, 18, 25, 30],
        "donation_types": [55, 25, 20],
        "recent_history": [
            {"date": "2024-04-23", "item": "Biryani", "qty": "10 kg", "ngo": "Seva Foundation", "status": "Completed"},
            {"date": "2024-04-22", "item": "Salad", "qty": "5 kg", "ngo": "Hope Orphanage", "status": "Completed"},
            {"date": "2024-04-21", "item": "Breads", "qty": "15 kg", "ngo": "Robinhood Army", "status": "Completed"}
        ]
    }