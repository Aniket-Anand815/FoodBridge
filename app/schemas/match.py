from pydantic import BaseModel

class MatchResponse(BaseModel):
    match: str
