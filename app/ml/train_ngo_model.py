import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# load dataset
data = pd.read_csv("app/ml/ngo_training_data.csv")

X = data.drop("fraud", axis=1)
y = data["fraud"]

# split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# train model
model = RandomForestClassifier(n_estimators=100)

model.fit(X_train, y_train)

# evaluate
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

# save model
joblib.dump(model, "app/ml/ngo_fraud_model.pkl")

print("Model saved successfully!")