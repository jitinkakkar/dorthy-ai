# Dorthy AI Backend

FastAPI backend with OpenAI Agents SDK for Dorthy AI chatbot.

## Setup

1. Create `.env` file:
```bash
OPENAI_API_KEY=sk-proj-your-key-here
VECTOR_STORE_ID=vs_69127ab0438c81918e2e4d9b45c1e6a8
```

2. Install dependencies:
```bash
uv sync
```

3. Run server:
```bash
uv run uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `POST /chatkit` - Main chat endpoint
- `GET /health` - Health check

## Key Files

- `app/dorthy_agent.py` - Agent definitions (4 agents)
- `app/dorthy_workflow.py` - Workflow orchestration
- `app/dorthy_chat.py` - ChatKit server integration
- `app/main.py` - FastAPI entry point
- `app/memory_store.py` - Thread/message storage
