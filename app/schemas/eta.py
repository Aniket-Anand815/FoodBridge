from pydantic import BaseModel

class ETAResponse(BaseModel):
    eta_minutes: int
