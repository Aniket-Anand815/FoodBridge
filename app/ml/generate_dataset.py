import pandas as pd
import random

rows = []

for i in range(1000):

    registration_valid = random.choice([0,1])
    documents_uploaded = random.choice([0,1])

    previous_accepts = random.randint(0,50)
    pickup_success_rate = round(random.uniform(0.1,0.98),2)

    complaints = random.randint(0,6)
    account_age_days = random.randint(1,400)

    # simple fraud logic for training
    fraud = 0
    if complaints > 3 or pickup_success_rate < 0.4 or registration_valid == 0:
        fraud = 1

    rows.append([
        registration_valid,
        documents_uploaded,
        previous_accepts,
        pickup_success_rate,
        complaints,
        account_age_days,
        fraud
    ])

columns = [
    "registration_valid",
    "documents_uploaded",
    "previous_accepts",
    "pickup_success_rate",
    "complaints",
    "account_age_days",
    "fraud"
]

df = pd.DataFrame(rows, columns=columns)

df.to_csv("app/ml/ngo_training_data.csv", index=False)

print("Dataset generated successfully!")