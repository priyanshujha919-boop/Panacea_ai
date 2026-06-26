# AI Engine — Symptom Summarizer & Specialist Suggester

This is the GenAI part of the project, built separately from the Node.js
backend using **FastAPI + LangChain + Gemini**.

It does exactly what the resume bullet says:
> "Built AI-powered symptom summarization and doctor specialization suggestion features."

## How it fits into the project

```
React (frontend)
      |
      v
Node.js backend (Express) -- localhost:8000
      |
      |  (HTTP POST, internal call, not exposed to browser)
      v
FastAPI AI engine -- localhost:8001
      |
      v
LangChain -> Gemini (gemini-1.5-flash)
```

The frontend never talks to FastAPI directly — it goes through the
Node.js backend, which calls this AI engine internally and forwards the
result. This keeps the API key only on the server side, and keeps the
existing JWT/cookie-based auth on the Node side untouched.

## Files

- `schema.py` — Pydantic model that defines the structured JSON shape
  we want back from the LLM (`summary`, `specialization`, `urgency`).
- `chain.py` — the actual LangChain chain (`prompt | llm | parser`),
  built the way CampusX's LangChain playlist teaches it.
- `main.py` — the FastAPI app exposing `/analyze-symptoms`.

## Setup

```bash
cd ai_engine
python -m venv venv
source venv/bin/activate      # on Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# then paste your free Gemini API key into .env
```

## Run

```bash
uvicorn main:app --reload --port 8001
```

Check it's running:

```
GET http://localhost:8001/health
```

## Endpoint

**POST** `/analyze-symptoms`

Request body:
```json
{ "symptoms": "I've had chest pain and shortness of breath for 2 days" }
```

Response:
```json
{
  "summary": "Patient reports chest pain and shortness of breath persisting for 2 days.",
  "specialization": "Cardiologist",
  "urgency": "high"
}
```
