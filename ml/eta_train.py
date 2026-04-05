import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Synthetic training data
data = pd.DataFrame({
    "distance_km": [1, 2, 5, 8, 10, 12, 3, 6],
    "hour": [10, 14, 18, 9, 20, 22, 12, 17],
    "is_peak": [0, 0, 1, 0, 1, 1, 0, 1],
    "speed_kmph": [35, 40, 25, 45, 20, 18, 38, 28],
    "eta_minutes": [5, 8, 20, 12, 30, 40, 7, 22]
})

X = data[["distance_km", "hour", "is_peak", "speed_kmph"]]
y = data["eta_minutes"]

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "app/models/eta_model.py")

print("✅ ETA model trained and saved")
