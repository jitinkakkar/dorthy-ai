# Dorthy AI 🏡

A conversational AI assistant for first-time home buyers in Ontario, Canada. Built with OpenAI ChatKit and Agents SDK.

---

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- [uv](https://docs.astral.sh/uv/getting-started/installation/) or pip
- OpenAI API key

### Setup

1. **Create environment file:**
```bash
cd backend
```

Create `backend/.env`:
```bash
OPENAI_API_KEY=sk-proj-your-key-here
VECTOR_STORE_ID=vs_69127ab0438c81918e2e4d9b45c1e6a8
```

2. **Start backend:**
```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

3. **Start frontend** (new terminal):
```bash
cd frontend
npm install
npm run dev
```

4. **Open browser:**
```
http://127.0.0.1:5170
```

---

## How It Works

### Multi-Agent Workflow

1. **Completeness Check** - Silently extracts user information (age, location, income, etc.)
2. **Conditional Routing:**
   - Info incomplete → Dorthy gathers more information (warm, conversational)
   - Info complete → Shows potential programs using File Search

### Agent Models

| Agent | Model | Purpose |
|-------|-------|---------|
| Completeness Check | gpt-4o-mini | Extract structured data |
| Gather Information | gpt-4o | Conversational guide (Dorthy) |
| Program Teaser | gpt-4o + File Search | Match programs from vector store |
| Ask Email | gpt-4o | Request email for detailed report |

---

## Project Structure

```
dorthy-ai/
├── backend/
│   ├── app/
│   │   ├── dorthy_agent.py      # Agent definitions
│   │   ├── dorthy_workflow.py   # Workflow orchestration
│   │   ├── dorthy_chat.py       # ChatKit server
│   │   ├── main.py              # FastAPI entry
│   │   ├── memory_store.py      # Thread storage
│   │   └── thread_item_converter.py
│   ├── pyproject.toml
│   └── .env                     # YOU CREATE THIS
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatKitPanel.tsx # Chat interface
    │   │   └── ThemeToggle.tsx  # Theme switcher
    │   ├── lib/
    │   │   └── config.ts        # Configuration
    │   └── App.tsx
    └── package.json
```

---

## Configuration

### Backend (`backend/.env`)
```bash
OPENAI_API_KEY=sk-proj-...        # Required
VECTOR_STORE_ID=vs_...            # Your vector store ID
```

### Frontend (`frontend/src/lib/config.ts`)
- Greeting message
- Starter prompts
- Theme settings

---

## Development

### Backend (port 8000)
```bash
cd backend
uv run uvicorn app.main:app --reload
```

**Health check:** http://127.0.0.1:8000/health

### Frontend (port 5170)
```bash
cd frontend
npm run dev
```

**Interface:** http://127.0.0.1:5170

---

## Deployment

### 🚂 Railway (Recommended)

Deploy both backend and frontend directly from GitHub in minutes!

**[📖 Railway Deployment Guide →](./RAILWAY_DEPLOYMENT.md)**

Quick steps:
1. Push code to GitHub ✅
2. Connect Railway to your repo
3. Add environment variables
4. Deploy! 🚀

---

## Documentation

- **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)** - Deploy to Railway from GitHub
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Local development setup and troubleshooting

---

## Tech Stack

- **Backend:** FastAPI, OpenAI Agents SDK, Python 3.11
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Chat UI:** OpenAI ChatKit
- **State:** Zustand
- **AI:** OpenAI GPT-4o, File Search

---

## License

See [LICENSE](./LICENSE) for details.
