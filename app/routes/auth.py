import sqlite3
import bcrypt
import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.organization import Organization

router = APIRouter(prefix="/auth")

DB_PATH = "nahor.db"


@router.post("/register")
def register(data: dict):

    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # check if username exists
    cursor.execute("SELECT id FROM users WHERE username=?", (username,))
    existing = cursor.fetchone()

    if existing:
        conn.close()
        return {"error": "Username already exists"}

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    cursor.execute(
        "INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)",
        (username, hashed, role)
    )

    conn.commit()
    conn.close()

    return {"message": "User registered successfully"}


@router.post("/register_ngo")
def register_ngo(data: dict, db: Session = Depends(get_db)):
    username = data.get("username")
    password = data.get("password")
    role = "ngo"
    
    name = data.get("name")
    ngo_name = data.get("ngoName")
    email = data.get("email")
    id_number = data.get("idNumber")

    if not id_number:
        return {"error": "ID Number is required for registration"}

    # Mock details since we are not using Gemini AI for now
    details = {
        "ngo_name": ngo_name,
        "ngo_type": "NGO",
        "registration_number": "REG12345",
        "district_name": "Central Delhi",
        "state_name": "Delhi",
        "address": "MOCK ADDRESS",
        "pin_code": "110001",
        "sub_district": "Connaught Place",
        "last_update_on": "2025-06-15",
        "sectors": "Health, Education, Food",
        "latitude": 28.6139,
        "longitude": 77.2090,
        "is_blacklisted": False
    }


    # Insert user
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username=?", (username,))
    if cursor.fetchone():
        conn.close()
        return {"error": "Username already exists"}

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    cursor.execute(
        "INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)",
        (username, hashed, role)
    )
    conn.commit()
    conn.close()

    # Insert Organization using SQLAlchemy
    new_org = Organization(
        name=name,
        ngo_name=details.get("ngo_name", ngo_name),
        contact_email=email,
        id_number=id_number,
        is_verified=True,  # since it succeeded
        registration_number=details.get("registration_number", "REG12345"),
        state=details.get("state_name", "Delhi"),
        district=details.get("district_name", "Central Delhi"),
        sub_district=details.get("sub_district", "Connaught Place"),
        pin_code=details.get("pin_code", "110001"),
        sectors=details.get("sectors", "Food, Education"),
        rating=4.5, # Default since not in JSON
        type=details.get("ngo_type", "NGO"),
        latitude=float(details.get("latitude", 28.6139)),
        longitude=float(details.get("longitude", 77.2090)),
        is_blacklisted=details.get("is_blacklisted", False)
    )
    
    db.add(new_org)
    db.commit()

    return {"message": "NGO verified by AI and registered successfully"}


@router.post("/login")
def login(data: dict):

    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT hashed_password, role FROM users WHERE username=?",
        (username,)
    )

    user = cursor.fetchone()

    conn.close()

    if not user:
        return {"error": "Invalid username"}

    stored_hash, role = user

    if not bcrypt.checkpw(password.encode(), stored_hash.encode()):
        return {"error": "Invalid password"}

    return {
        "access_token": "demo_token",
        "role": role
    }