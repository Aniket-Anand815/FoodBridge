from fastapi import APIRouter

router=APIRouter(prefix="/admin",tags=["admin"])

@router.get("/dashboard")
def dashboard():
    return {
        "stats": {
            "total_donations": 1450,
            "active_ngos": 84,
            "pending_verifications": 12,
            "impact_index": 92.5
        },
        "recent_activities": [
            {"id": 1, "action": "New NGO Registered", "user": "Robinhood Army", "time": "2 mins ago"},
            {"id": 2, "action": "Donation Completed", "user": "Taj Mahal Hotel", "time": "15 mins ago"},
            {"id": 3, "action": "Verification Approved", "user": "Feeding India NGO", "time": "1 hour ago"},
            {"id": 4, "action": "System Alert: High Waste", "user": "Zomato Cloud", "time": "3 hours ago"}
        ],
        "alerts": [
            {"id": 1, "level": "High", "msg": "NGO 'Khalsa Aid' requires immediate assistance in Delhi South."},
            {"id": 2, "level": "Medium", "msg": "Food quality report pending for 'Local Caterer' donation."}
        ]
    }

@router.get("/analytics")
def analytics():
    return {
        "monthly_growth": [12, 19, 3, 5, 2, 3, 15],
        "donor_distribution": {
            "Hotels": 45,
            "Caterers": 25,
            "Individual": 20,
            "Cloud Kitchens": 10
        },
        "ngo_performance": [
            {"name": "Seva Foundation", "rating": 4.8, "donations_handled": 150},
            {"name": "Hope Orphanage", "rating": 4.5, "donations_handled": 80},
            {"name": "Robinhood Army", "rating": 4.9, "donations_handled": 210}
        ]
    }