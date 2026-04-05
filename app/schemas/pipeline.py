from pydantic import BaseModel

class PipelineResponse(BaseModel):
    status: str
