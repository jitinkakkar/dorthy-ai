# Dorthy AI Frontend

React + TypeScript frontend with OpenAI ChatKit for Dorthy AI chatbot.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
```

3. Open browser:
```
http://127.0.0.1:5170
```

## Configuration

Edit `src/lib/config.ts` to customize:
- Greeting message
- Starter prompts  
- Chat placeholder text
- Theme colors

## Key Files

- `src/App.tsx` - Main application component
- `src/components/ChatKitPanel.tsx` - ChatKit integration
- `src/components/ThemeToggle.tsx` - Dark/light theme switcher
- `src/lib/config.ts` - Configuration settings
- `src/store/useAppStore.ts` - Global state (Zustand)
