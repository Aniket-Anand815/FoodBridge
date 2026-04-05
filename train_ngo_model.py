import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier


# Example NGO dataset
data = {
    "years_active": [1,2,5,10,3,7,12,4,6,8],
    "num_projects": [1,2,10,20,3,15,30,5,8,18],
    "volunteers": [5,10,50,100,12,70,120,20,40,80],
    "verified": [0,0,1,1,0,1,1,0,1,1]
}

df = pd.DataFrame(data)

X = df[["years_active","num_projects","volunteers"]]
y = df["verified"]

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2)

model = RandomForestClassifier()
model.fit(X_train,y_train)

print("Model trained")

# Save model
with open("app/ai/ngo_model.pkl","wb") as f:
    pickle.dump(model,f)

print("ngo_model.pkl saved")