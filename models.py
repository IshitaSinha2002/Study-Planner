from pydantic import BaseModel, Field
from typing import List, Dict

class StudyRequest(BaseModel):
    subjects: str
    hours: str
    exam_date: str

class StudyTask(BaseModel):
    subject: str = Field(description="Subject name")
    topic: str = Field(description="Topic to study")
    duration: str = Field(description="Study duration")

class StudyPlan(BaseModel):
    schedule: Dict[str, list[StudyTask]]