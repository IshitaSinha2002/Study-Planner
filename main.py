from dotenv import load_dotenv
import os
import json

from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_groq import ChatGroq

from pydantic import BaseModel, Field
from typing import List, Dict

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

class StudyTask(BaseModel):
    subject: str = Field(description="Subject name")
    topic: str = Field(description="Topic to study")
    duration: str = Field(description="Study duration")

class StudyPlan(BaseModel):
    schedule: Dict[str, list[StudyTask]]

parser = PydanticOutputParser(pydantic_object=StudyPlan)

llm = ChatGroq(
    groq_api_key = groq_api_key,
    model = "llama-3.3-70b-versatile",
    temperature = 0.7
)

subjects = input("Enter subjects: ")
hours = input("Enter daily study hours: ")
exam_date = input("Enter exam date (YYYY-MM-DD): ")

prompt = PromptTemplate(
    input_variables=["subjects", "hours", "exam_date"],

    partial_variables = {
        "format_instructions": parser.get_format_instructions()
    },

    template="""
    You are an AI study planner. Create a detailed weekly study plan.

    Subjects: {subjects}
    Daily Study Hours: {hours}  
    Exam Date: {exam_date}

    Rules:
    - Divide time properly
    - Include revisions sessions
    - Keep schedule realistic and balanced  
    - Create a day-wise plan

    {format_instructions}
    """,
)

chain = prompt | llm | parser

response = chain.invoke({
    "subjects": subjects,
    "hours": hours,
    "exam_date": exam_date
})

print("\nYour Weekly Study Plan:\n")
print(json.dumps(response.dict(), indent=4))