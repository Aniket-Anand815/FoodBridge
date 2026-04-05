import os
import pickle

model = None

def load_model():
    global model
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, "ngo_model.pkl")

        if os.path.exists(model_path):
            with open(model_path, "rb") as f:
                model = pickle.load(f)
            print("AI Model loaded successfully")

        else:
            print("AI model file not found:", model_path)

    except Exception as e:
        print("AI Model not loaded:", e)


load_model()


def predict_verification(features):

    if model is None:
        return {
            "score": 0.5,
            "verified": False
        }

    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0][1]

    return {
        "score": float(probability),
        "verified": bool(prediction)
    }