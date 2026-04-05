import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Step 1: Create synthetic training data
data = pd.DataFrame({
    "distance_km": [1, 2, 5, 10, 12, 3, 4],
    "capacity": [500, 400, 300, 100, 80, 350, 250],
    "reliability": [0.95, 0.9, 0.85, 0.6, 0.5, 0.88, 0.75],
    "success": [1, 1, 1, 0, 0, 1, 0]
})

X = data[["distance_km", "capacity", "reliability"]]
y = data["success"]

# Step 2: Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Step 3: Save model
joblib.dump(model, "app/models/matcher_model.pkl")

print("✅ Matcher ML model trained and saved")
