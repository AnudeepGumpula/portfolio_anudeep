# Anudeep Gumpula — Portfolio Website

A full-stack portfolio site with a **FastAPI** backend and a dark cyberpunk-themed vanilla JS frontend.

---

## Project Structure

```
portfolio/
├── backend/
│   ├── main.py          # FastAPI app — all API routes
│   └── requirements.txt
└── frontend/
    ├── index.html        # Main portfolio page
    └── static/
        ├── css/style.css
        └── js/main.js
```

---

## Quick Start

### 1. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the server

```bash
uvicorn main:app --reload --port 8000
```

### 3. Open in browser

```
http://localhost:8000
```

---

## API Endpoints

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| GET    | /api/portfolio  | Full portfolio data      |
| GET    | /api/hero       | Hero/intro section       |
| GET    | /api/skills     | Tech stack               |
| GET    | /api/projects   | Projects list            |
| GET    | /api/experience | Work experience          |
| POST   | /api/contact    | Submit contact message   |
| GET    | /api/health     | Health check             |

### Contact POST body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Let's collaborate!"
}
```

---

## Customization

All portfolio content lives in `backend/main.py` inside the `PORTFOLIO_DATA` dict.
Edit your bio, skills, projects, and experience there — no frontend changes needed.

---

## Tech Stack

- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **Frontend**: Vanilla JS, HTML5, CSS3
- **Fonts**: Syne (display) + Space Mono (code)
- **Design**: Dark cyberpunk — custom cursor, matrix rain, scroll animations
