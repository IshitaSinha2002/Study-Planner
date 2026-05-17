from dotenv import load_dotenv
import os

from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_groq import ChatGroq

from models import StudyPlan

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found")

parser = PydanticOutputParser(
    pydantic_object=StudyPlan
)

llm = ChatGroq(
    groq_api_key=groq_api_key,
    model="llama-3.3-70b-versatile",
    temperature=0.3
)

prompt = PromptTemplate(
    input_variables=["subjects", "hours", "exam_date"],

    partial_variables={
        "format_instructions": parser.get_format_instructions()
    },

    template="""
    You are an intelligent AI Study Planner.

    Create a realistic weekly study schedule.

    Subjects: {subjects}
    Daily Study Hours: {hours}
    Exam Date: {exam_date}

    Requirements:
    - Divide study sessions properly
    - Include revision sessions
    - Keep schedule balanced
    - Create day-wise plan

    {format_instructions}
    """
)

chain = prompt | llm | parser

def generate_study_plan(subjects, hours, exam_date):
    response = chain.invoke({
        "subjects": subjects,
        "hours": hours,
        "exam_date": exam_date
    })
    return response