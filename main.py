from fastapi import FastAPI

from models import StudyRequest
from planner import generate_study_plan

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "AI Study Planner API is running."
    }

@app.post("/generate_plan")
def create_plan(request: StudyRequest):
    response = generate_study_plan(
        request.subjects,
        request.hours,
        request.exam_date
    )
    return response