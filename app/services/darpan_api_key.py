import requests
import os

DARPAN_API_KEY = os.getenv("DARPAN_API_KEY")

URL = "https://api.surepass.io/api/v1/ngos/darpan"

def verify_ngo(darpan_id):

    headers = {
        "Authorization": f"Bearer {DARPAN_API_KEY}"
    }

    payload = {
        "darpan_id": darpan_id
    }

    response = requests.post(URL, json=payload, headers=headers)

    return response.json()