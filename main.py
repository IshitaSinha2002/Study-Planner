from dotenv import load_dotenv
import os

from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    groq_api_key = groq_api_key,
    model = "llama-3.3-70b-versatile"
)

subjects = input("Enter subjects: ")
hours = input("Enter daily study hours: ")
exam_date = input("Enter exam date (YYYY-MM-DD): ")

prompt = PromptTemplate(
    input_variables=["subjects", "hours", "exam_date"],

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

    Output Format:
    Monday:
    - Subject 1: Time
    - Subject 2: Time
    Tuesday:
    - Subject 1: Time
    """,
)

parser = StrOutputParser()

chain = prompt | llm | parser

response = chain.invoke({
    "subjects": subjects,
    "hours": hours,
    "exam_date": exam_date
})

print("\nYour Weekly Study Plan:\n")
print(response)