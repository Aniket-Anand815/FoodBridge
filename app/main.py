from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FoodBridge API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from app.routes import auth, donor, ngo, admin, verification, eta
app.include_router(auth.router)
app.include_router(donor.router)
app.include_router(ngo.router)
app.include_router(admin.router)
app.include_router(verification.router)
app.include_router(eta.router)

@app.get("/")
def root():
    return {"status": "MajorProj running"}