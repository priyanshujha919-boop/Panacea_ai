

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chain import analyze_symptoms
from schema import SymptomAnalysis

app = FastAPI(title="AI Engine - Symptom Summarizer & Specialist Suggester")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class SymptomRequest(BaseModel):
    symptoms: str


@app.get("/health")
def health_check():
    """Simple route to confirm the AI engine is up and running."""
    return {"status": "AI engine running"}


@app.post("/analyze-symptoms", response_model=SymptomAnalysis)
def analyze_symptoms_route(payload: SymptomRequest):
    """
    Main route used by the Node.js backend.

    Takes raw symptom text from the patient, runs it through our
    LangChain chain (chain.py), and returns a structured JSON response:
        {
            "summary": "...",
            "specialization": "...",
            "urgency": "low" | "medium" | "high"
        }
    """

    if not payload.symptoms or not payload.symptoms.strip():
        raise HTTPException(status_code=400, detail="Symptoms text cannot be empty.")

    try:
        result = analyze_symptoms(payload.symptoms)
        return result

    except Exception as error:
        print("AI ENGINE ERROR:", str(error))
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze symptoms. Please try again.",
        )
