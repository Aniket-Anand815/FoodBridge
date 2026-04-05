import sqlite3
import bcrypt
from fastapi import APIRouter

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