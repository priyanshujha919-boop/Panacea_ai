

import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from schema import SymptomAnalysis

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.3,
)


parser = PydanticOutputParser(pydantic_object=SymptomAnalysis)


prompt = PromptTemplate(
    template="""
You are an assistant helping a doctor appointment booking platform.

A patient has described their symptoms below. Read the symptoms carefully
and do the following:
1. Write a short, professional summary of the symptoms (as a doctor would note it).
2. Suggest the single most appropriate doctor specialization for these symptoms.
3. Judge the urgency level of the situation.

Patient symptoms:
{symptoms}

{format_instructions}
""",
    input_variables=["symptoms"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

symptom_chain = prompt | llm | parser


def analyze_symptoms(symptoms: str) -> SymptomAnalysis:
    """
    Small helper function that main.py (FastAPI) calls.

    It just runs the chain with the symptoms text and returns the
    parsed, validated SymptomAnalysis object.
    """
    result = symptom_chain.invoke({"symptoms": symptoms})
    return result
