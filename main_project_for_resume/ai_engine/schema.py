
from pydantic import BaseModel, Field
from typing import Literal


class SymptomAnalysis(BaseModel):
    """
    This is the final structure we want back from the LLM after it reads
    the patient's symptoms.

    summary         -> a short, doctor-friendly summary of what the patient said
    specialization  -> which type of doctor this patient should see
    urgency         -> how serious this looks, used to flag urgent cases
    """

    summary: str = Field(
        description="A short 2-3 line professional summary of the patient's symptoms, written the way a doctor would note it down."
    )

    specialization: str = Field(
        description="The single most relevant doctor specialization for these symptoms, e.g. Cardiologist, Neurologist, Dermatologist, Orthopedic, Pediatrician, General Physician."
    )

    urgency: Literal["low", "medium", "high"] = Field(
        description="How urgent the symptoms seem. 'high' means the patient should see a doctor immediately, 'low' means it can be a routine appointment."
    )
