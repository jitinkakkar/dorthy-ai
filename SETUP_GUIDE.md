# Dorthy AI - Setup & Run Guide 🏡

Welcome! This guide will help you set up and run your Dorthy AI chatbot - a friendly assistant for first-time home buyers in Ontario, Canada.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 20+** installed
- **Python 3.11+** installed
- **uv** (recommended) or pip - [Install uv](https://docs.astral.sh/uv/getting-started/installation/)
- **OpenAI API Key** - Get one from [platform.openai.com](https://platform.openai.com/api-keys)
- **Vector Store ID** - Your existing ID: `vs_69127ab0438c81918e2e4d9b45c1e6a8`

## 🚀 Quick Start

### Step 1: Set Up Environment Variables

Create a `.env` file in the **backend** directory:

```bash
cd backend
```

Create `backend/.env` with the following content:

```bash
# Your OpenAI API Key
OPENAI_API_KEY=sk-proj-your-actual-key-here

# Your Vector Store ID (already set for you)
VECTOR_STORE_ID=vs_69127ab0438c81918e2e4d9b45c1e6a8
```

**⚠️ Important:** Replace `sk-proj-your-actual-key-here` with your real OpenAI API key!

### Step 2: Install Backend Dependencies

```bash
# Make sure you're in the backend directory
cd backend

# Using uv (recommended)
uv sync

# OR using pip
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -e .
```

### Step 3: Start the Backend Server

```bash
# Make sure you're in the backend directory and have activated your venv
# Using uv
uv run uvicorn app.main:app --reload --port 8000

# OR using pip (with venv activated)
uvicorn app.main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

Keep this terminal running!

### Step 4: Install Frontend Dependencies

Open a **new terminal** window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

### Step 5: Start the Frontend

```bash
# Make sure you're in the frontend directory
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://127.0.0.1:5170/
  ➜  Network: use --host to expose
```

### Step 6: Open in Browser

Open your browser and go to:
```
http://127.0.0.1:5170
```

You should see the Dorthy AI interface! 🎉

## 🧪 Testing the Chatbot

Try these starter prompts:

1. **"I'm interested in buying my first home in Ontario"**
   - Dorthy will start gathering information about your situation

2. **"What programs are available for first-time buyers?"**
   - Dorthy will ask you questions to understand your needs

3. **"Help me understand the home buying process"**
   - Dorthy will guide you through the process

## 📁 Project Structure

```
dorthy-ai/
├── backend/
│   ├── app/
│   │   ├── dorthy_agent.py      # Your agent workflow logic
│   │   ├── dorthy_chat.py       # ChatKit server integration
│   │   ├── main.py              # FastAPI entry point
│   │   └── memory_store.py      # Thread/message storage
│   ├── pyproject.toml           # Python dependencies
│   └── .env                     # ⚠️ Environment variables (create this!)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatKitPanel.tsx # Chat interface
│   │   │   └── ThemeToggle.tsx  # Light/dark mode
│   │   ├── lib/
│   │   │   └── config.ts        # App configuration
│   │   └── App.tsx              # Main app component
│   └── package.json
└── SETUP_GUIDE.md              # This file!
```

## 🔧 Configuration

### Backend Configuration

The backend is configured in `backend/app/dorthy_agent.py`:

- **Completeness Check Agent**: Extracts user information from conversations
- **Gather More Information Agent**: Your friendly "Dorthy" persona that asks questions
- **Program Teaser Agent**: Shows potential programs based on user info
- **Ask Email Agent**: Requests email for detailed reports

### Frontend Configuration

The frontend is configured in `frontend/src/lib/config.ts`:

- **Greeting**: Welcome message
- **Starter Prompts**: Initial conversation starters
- **Placeholder**: Chat input placeholder text

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'agents'`
**Solution:** Install dependencies with `uv sync` or `pip install -e .`

**Problem:** `ChatKit dependencies are missing`
**Solution:** Make sure `openai-chatkit` is installed: `pip install openai-chatkit`

**Problem:** `OPENAI_API_KEY not found`
**Solution:** Create `backend/.env` file with your API key (see Step 1)

### Frontend Issues

**Problem:** `Cannot connect to backend`
**Solution:** Make sure backend is running on port 8000

**Problem:** `VITE_CHATKIT_API_DOMAIN_KEY not defined`
**Solution:** This is okay for local development! The default placeholder will be used.

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key | `sk-proj-...` |
| `VECTOR_STORE_ID` | ✅ Yes | Vector store for file search | `vs_6912...` |

### Frontend (Optional)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `VITE_CHATKIT_API_DOMAIN_KEY` | ⚠️ Production only | Domain key for ChatKit | `domain_pk_localhost_dev` |
| `VITE_CHATKIT_API_URL` | ❌ No | Backend API URL | `/chatkit` |

## 🚢 Deployment (Future)

For production deployment:

1. Register your domain at [OpenAI Domain Allowlist](https://platform.openai.com/settings/organization/security/domain-allowlist)
2. Get your production `domain_pk_...` key
3. Set `VITE_CHATKIT_API_DOMAIN_KEY` in your deployment environment
4. Deploy backend and frontend to your hosting provider

## 💡 Next Steps

Now that you have Dorthy AI running:

1. ✅ Test the conversation flow
2. ✅ Customize the agent instructions in `backend/app/dorthy_agent.py`
3. ✅ Update the UI branding in `frontend/src/lib/config.ts`
4. ✅ Add more tools/functions as we develop together!

## 🆘 Need Help?

If you run into any issues:

1. Check the terminal logs for error messages
2. Verify your `.env` file is in the correct location (`backend/.env`)
3. Make sure both backend (port 8000) and frontend (port 5170) are running
4. Check that your OpenAI API key is valid

## 📝 Development Tips

### Backend Development

- Backend runs with auto-reload: changes to Python files will restart the server automatically
- View API docs at: `http://127.0.0.1:8000/docs`
- Check health endpoint: `http://127.0.0.1:8000/health`

### Frontend Development

- Frontend runs with hot module replacement: changes appear instantly
- Use browser DevTools to debug
- ChatKit errors appear in browser console

---

**Happy coding! 🎉**

Your Dorthy AI chatbot is ready to help first-time home buyers in Ontario!

