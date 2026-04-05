from fastapi import APIRouter

router = APIRouter(prefix="/eta")

@router.post("/predict")
def predict(data: dict):

    distance = data.get("distance", 5)
    traffic = data.get("traffic", "medium")

    speed = 40

    traffic_factor = {
        "low": 1,
        "medium": 1.4,
        "high": 1.8
    }

    eta = (distance / speed) * 60 * traffic_factor.get(traffic, 1)

    return {"eta_minutes": round(eta)}