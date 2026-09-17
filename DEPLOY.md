# Deploying the OFS Funnel

Two apps, deployed from this one repository:

- **Frontend** (`frontend/`) — Create React App → hosted on **Vercel**
- **Backend** (`backend/`) — FastAPI (Python) → hosted on **Render**
- **Database** — MongoDB Atlas (cluster `ofs-live`, project "OFS Funnel")

## Backend (Render web service)
- Runtime: Python
- Build command: `pip install -r backend/requirements.txt`
- Start command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
- Environment variables: see `backend/.env.example` (set the real values in Render → Environment).

## Frontend (Vercel)
- Root directory: `frontend`
- Framework preset: Create React App (auto-detected)
- Environment variable: `REACT_APP_BACKEND_URL` = the Render backend URL (e.g. `https://ofs-backend.onrender.com`)
- `frontend/vercel.json` rewrites all routes to `index.html` so client-side routing works on refresh.

## After both are live
1. Set the backend's `CORS_ORIGINS` to the Vercel URL (and later the custom domain).
2. Register the Calendly webhook (cancellations / no-shows):
   ```
   POST https://api.calendly.com/webhook_subscriptions
   url = https://<render-backend>/api/webhooks/calendly
   events = ["invitee.canceled","invitee_no_show.created"]
   scope = organization
   ```
3. Point the custom domain (Squarespace DNS) at Vercel.

## Secrets
Never commit `backend/.env`. All secrets live in the host's environment settings.
Rotate the Airtable / GoHighLevel / Calendly keys after launch.
