# Deploying the OFS Funnel

Two apps, both on **Render**, deployed from this one repository:

- **Frontend** (`frontend/`) — Create React App → Render static site `ofs-frontend`
- **Backend** (`backend/`) — FastAPI (Python) → Render web service `ofs-backend`
- **Database** — MongoDB Atlas (cluster `ofs-live`, project "OFS Funnel")

Live at https://www.orderflowschool.com (the apex domain redirects to `www`).

## Deploys are manual

The repo is linked to Render by its public URL, so a `git push` does **not**
start a deploy. After pushing, trigger a deploy on the affected service
(Render dashboard → the service → Manual Deploy → Deploy latest commit).

## Frontend (static site)

- Build command:
  `cd frontend && npm install --legacy-peer-deps && CI=false npm run build && cp build/index.html build/404.html`
- Publish directory: `frontend/build`
- `npm run build` also runs `scripts/postbuild-routes.js`, which writes a real
  HTML file for every route (`build/live/index.html`, …) so deep links answer
  HTTP 200 with their own title/description. **Add new routes to that script.**
- Environment variables (baked in at build time — redeploy after changing):
  - `REACT_APP_BACKEND_URL` — the backend URL
  - `REACT_APP_TRIAL_DAYS` — free-trial length shown on the OFS Live pages.
    Must match the trial length on the Whop plan. Defaults to 1 if unset.

## Backend (web service)

- Runtime: Python
- Build command: `pip install -r backend/requirements.txt`
- Start command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
- Environment variables: see `backend/.env.example`.
  `CORS_ORIGINS` must list every address the site is served from.

## Pages

| Address | What it is |
|---|---|
| `/` | 1:1 mentorship landing page |
| `/apply` | Application form |
| `/success` → `/booking-confirmed` | Qualified: book a call, then confirmation |
| `/not-ready-yet` | Applicants routed to OFS Live |
| `/live` | Direct Live Room page (Instagram bio): free trial or free Discord |
| `/legal/:slug` | Legal pages |

Offer details (price, trial wording, Whop plan, Discord invite) live in
`frontend/src/config/offers.js`.

## Secrets

Never commit `backend/.env`. All secrets live in the host's environment settings.
