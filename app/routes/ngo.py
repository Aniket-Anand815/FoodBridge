from fastapi import APIRouter

router=APIRouter(prefix="/ngo",tags=["ngo"])

# Mock state
accepted_ids = []
rejected_ids = []

requests = [
    {"id": 1, "donor": "Taj Mahal Hotel", "amount": "15 kg", "type": "Biryani & Curry", "status": "pending"},
    {"id": 2, "donor": "Marriott Delhi", "amount": "8 kg", "type": "Assorted Breads", "status": "pending"},
    {"id": 3, "donor": "Zomato Cloud Kitchen", "amount": "12 kg", "type": "Continental Meals", "status": "pending"},
    {"id": 4, "donor": "Swiggy Central", "amount": "20 kg", "type": "Rice Bowls", "status": "pending"},
    {"id": 5, "donor": "Local Caterer", "amount": "25 kg", "type": "Wedding Surplus", "status": "pending"},
    {"id": 6, "donor": "Green Hotel", "amount": "10 kg", "type": "Vegetable Salad", "status": "pending"},
    {"id": 7, "donor": "City Kitchen", "amount": "5 kg", "type": "Pastries", "status": "pending"}
]

messages = []

@router.get("/dashboard")
def ngo_dashboard():
    return {
        "pending": len([r for r in requests if r["id"] not in accepted_ids and r["id"] not in rejected_ids]),
        "accepted": len(accepted_ids),
        "rejected": len(rejected_ids),
        "beneficiaries": 287 + (len(accepted_ids) * 10),
        "weekly_donations": [8, 12, 5, 10, 15, 9, len(accepted_ids)],
        "donation_status": [len(accepted_ids), len([r for r in requests if r["id"] not in accepted_ids and r["id"] not in rejected_ids]), len(rejected_ids)],
        "requests": requests,
        "accepted_ids": accepted_ids,
        "rejected_ids": rejected_ids
    }

@router.post("/accept/{id}")
def accept(id:int):
    if id not in accepted_ids and id not in rejected_ids:
        accepted_ids.append(id)
        # Relay message to admin and donor
        req = next((r for r in requests if r["id"] == id), None)
        if req:
            msg = f"NGO accepted donation #{id} from {req['donor']}"
            messages.append({"type": "accept", "message": msg})
        return {"message": "Donation accepted. Message relayed to Donor and Admin."}
    return {"error": "Already processed"}

@router.post("/reject/{id}")
def reject(id:int):
    if id not in accepted_ids and id not in rejected_ids:
        rejected_ids.append(id)
        # Relay message to admin and donor
        req = next((r for r in requests if r["id"] == id), None)
        if req:
            msg = f"NGO rejected donation #{id} from {req['donor']}"
            messages.append({"type": "reject", "message": msg})
        return {"message": "Donation rejected. Message relayed to Donor and Admin."}
    return {"error": "Already processed"}

@router.get("/messages")
def get_messages():
    return messages