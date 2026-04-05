from fastapi import APIRouter
from app.ml.predict_ngo_risk import predict_risk

router = APIRouter()

@router.post("/verify-ngo-ai")
def verify_ngo(data: dict):

    prediction, risk_score = predict_risk(data)

    return {
        "fraud_prediction": int(prediction),
        "risk_score": float(risk_score)
    }