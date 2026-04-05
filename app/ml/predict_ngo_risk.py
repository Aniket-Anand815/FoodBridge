try:
    import joblib
    import numpy as np

    model = joblib.load("app/ml/ngo_fraud_model.pkl")

    def predict_risk(data):

        features = np.array([[
            data["registration_valid"],
            data["documents_uploaded"],
            data["previous_accepts"],
            data["pickup_success_rate"],
            data["complaints"],
            data["account_age_days"]
        ]])

        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]

        return prediction, probability

except Exception as e:

    print("AI Model not loaded:", e)

    def predict_risk(data):
        # fallback if model missing
        return 0, 0.2