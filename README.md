# Nutrifresh Founder OS — Deployment Guide

## What's in this project

| File | What it does |
|------|-------------|
| `src/App.jsx` | The full Founder OS React app |
| `src/main.jsx` | React entry point |
| `api/chat.js` | Serverless function — proxies AI Co-pilot calls through your Anthropic API key |
| `index.html` | HTML shell |
| `package.json` | Dependencies (React + Vite) |

---

## Deploy to Vercel (free, ~5 minutes)

### Step 1 — Push to GitHub
1. Create a new repo on [github.com](https://github.com) — call it `nutrifresh-founder-os`
2. Upload this entire folder (drag and drop all files into the repo)

### Step 2 — Import into Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (free account)
2. Click **Add New → Project**
3. Select your `nutrifresh-founder-os` GitHub repo
4. Framework preset will auto-detect as **Vite** — leave all settings as default
5. Before clicking Deploy, expand **Environment Variables** and add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (your Anthropic API key from [console.anthropic.com](https://console.anthropic.com))
6. Click **Deploy**

Vercel will build and give you a URL like `nutrifresh-founder-os.vercel.app`.

---

## Run locally (optional)

```bash
npm install
npm run dev
```

The app opens at http://localhost:5173. The AI Co-pilot tab won't work locally unless you create a `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-...
```
And run with `vercel dev` instead of `npm run dev` (installs with `npm i -g vercel`).

---

## Notes
- **Data is stored in the browser** — each person who opens the URL gets their own separate data
- **The AI Co-pilot** uses Claude Sonnet via your Anthropic API key (costs a few cents per session)
- To share with your manager, just send them the Vercel URL
