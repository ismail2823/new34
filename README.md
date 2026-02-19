# 🌐 Gateway — Ultraviolet Web Proxy

A clean, fast web proxy powered by **Ultraviolet** — the same tech behind Holy Unblocker, Incognito, and other popular unblocked sites. Works for TikTok, YouTube, Discord, and more.

## 🗂 File Structure

```
your-repo/
├── public/
│   ├── index.html         ← Frontend UI
│   └── uv/
│       └── uv.config.js   ← UV configuration
├── server.js              ← Express + Bare server
├── package.json
└── README.md
```

## 🚀 Deploy on Render.com (Free, no sleep with hack)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Port:** 3000
5. Deploy!

## 🚀 Deploy on Railway (Free Trial)

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. It auto-detects Node.js — just click Deploy
4. Done!

## 🚀 Run Locally

```bash
npm install
npm start
# Open http://localhost:3000
```

## ⚠️ Important Notes

- **HTTPS required** for service workers to work. Render/Railway provide this automatically.
- If running locally, use `localhost` (counts as secure context)
- The UV scripts (uv.bundle.js, uv.sw.js, uv.handler.js) are served automatically from node_modules

## 🔧 How It Works

1. User enters a URL
2. Frontend encodes it and redirects to `/sw/<encoded-url>`
3. Service Worker intercepts, routes through Bare Server at `/bare/`
4. Bare Server fetches the real page and returns it
5. UV rewrites all links/assets to stay proxied
6. Result: you browse freely, the network only sees requests to YOUR server
