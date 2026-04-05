import joblib
import numpy as np

model = joblib.load("app/ai/ngo_model.pkl")

def predict_ngo(features):

    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0][1]

    return {
        "fraud": bool(prediction),
        "risk_score": float(probability)
    }