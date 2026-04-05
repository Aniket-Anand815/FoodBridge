from fastapi import APIRouter
from app.services.darpan_api_key import verify_ngo
from app.ai.ngo_verifier import predict_verification

router = APIRouter(prefix="/verification")

@router.post("/ngo")
def verify(data: dict):
    darpan_id = data.get("darpan_id")
    if not darpan_id:
        return {"error": "darpan_id required"}

    # Call Darpan API
    darpan_response = verify_ngo(darpan_id)

    # Assuming darpan_response has the features
    # For now, extract features from response
    # You may need to adjust based on actual API response
    features = [
        darpan_response.get("darpan_verified", 0),
        darpan_response.get("years_active", 0),
        darpan_response.get("previous_projects", 0),
        darpan_response.get("donation_success_rate", 0.0)
    ]

    return predict_verification(features)