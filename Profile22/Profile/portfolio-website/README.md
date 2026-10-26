# Nallagajula Yaswanth Kumar — Portfolio

```
portfolio-website/
├── portfolio-fullstack/     -> the site itself
│   ├── index.html
│   ├── assets/
│   │   ├── css/style.css
│   │   ├── js/main.js
│   │   └── img/favicon.svg, profile.jpg
│   ├── projects/            -> live demo pages (FocusNest, RF Speed Controller)
│   └── Yaswanth_Kumar_Resume.docx
├── server.js                -> Express server: serves the site + contact form API
├── package.json
├── data/messages.json       -> created automatically; contact form submissions land here
├── .env / .env.example
└── .gitignore
```

## Run it

```bash
npm install
npm start
```

Open **http://localhost:3000** — this single server serves the whole site *and*
the contact form API from one port, so there's no CORS to worry about.

Submissions from the contact form are saved to `data/messages.json`. To read
them back, set `ADMIN_TOKEN` in `.env` to any random string, then request:

```bash
curl http://localhost:3000/api/messages -H "X-Admin-Token: your-token-here"
```

## Deploying

- **Frontend only, for free:** GitHub Pages can serve `portfolio-fullstack/`
  as a static site, but it **cannot run `server.js`** — Pages only serves
  static files, not Node servers. If you go this route, the contact form
  will fall back to opening an email draft instead of hitting the API.
- **Full site including the working contact form:** deploy this whole folder
  to a Node-friendly host — Render, Railway, or Cyclic all have free tiers.
  They'll run `npm install && npm start` automatically.

## Environment variables

`.env` holds real values and is gitignored — it never gets pushed to GitHub.
`.env.example` is the safe template that *does* get committed, so anyone
cloning the repo knows what to fill in.
