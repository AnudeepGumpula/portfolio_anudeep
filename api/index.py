from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime


# Resolve frontend directory relative to this file's location


app = FastAPI(title="Anudeep Gumpula Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

PORTFOLIO_DATA = {
    "hero": {
        "name": "Anudeep Gumpula",
        "title": "Software Engineer · Full Stack",
        "tagline": "Building scalable AI-driven systems at the intersection of product, data, and engineering.",
        "location": "United States",
        "email": "anudeepgumpula@gmail.com",
        "phone": "4646004930",
        "linkedin": "https://linkedin.com/in/Anudeep-Gumpula",
        "github": "https://github.com/AnudeepGumpula"
    },
    "about": {
        "bio": "Experienced full-stack engineer with strong expertise in React, Next.js, Python, MongoDB, and SQL, delivering scalable AI-driven and marketplace-oriented solutions. Proven ability to own features end-to-end while balancing product intuition, UX sensibility, and technical excellence. Skilled in backend API design, data modeling, funnel analysis, and service ownership within fast-paced, ambiguous environments.",
        "highlights": [
            "4+ years of full-stack engineering experience",
            "MS Computer Science — Rivier University (CGPA: 3.8)",
            "Specialized in AI-driven systems & LLM integrations",
            "Microsoft Azure & AI certified (AZ-900, AI-900)"
        ]
    },
    "skills": [
        { "category": "Languages", "items": ["Python", "Go", "JavaScript", "TypeScript"], "icon": "code" },
        { "category": "Frontend", "items": ["React", "Next.js", "HTML5", "CSS3"], "icon": "monitor" },
        { "category": "Backend & Data", "items": ["FastAPI", "RESTful APIs", "MongoDB", "PostgreSQL", "SQL"], "icon": "server" },
        { "category": "AI & ML", "items": ["LangChain", "CrewAI", "Autogen", "HuggingFace", "Quantum ML"], "icon": "cpu" },
        { "category": "Analytics", "items": ["Funnel Analysis", "Metrics Instrumentation", "Data Modeling", "Performance Optimization"], "icon": "bar-chart" },
        { "category": "Cloud & DevOps", "items": ["Microsoft Azure", "Docker", "CI/CD", "Service Ownership"], "icon": "cloud" }
    ],
    "projects": [
        {
            "id": 1,
            "title": "Quantum Neural Network Explorer",
            "subtitle": "Interactive Quantum ML Systems & Visualization Platform",
            "description": "Architected a full-stack quantum neural network simulator with trainable Ry/Rz gates and CNOT entanglement, optimized over 100+ epochs. Built real-time decision boundary & Bloch sphere visualizations. Modular experimentation framework reduced iteration time by ~60%.",
            "tech": ["Python", "Quantum ML", "FastAPI", "React", "Visualization"],
            "github": "https://github.com/AnudeepGumpula/quantum-neural-network",
            "highlight": "60% faster iteration"
        },
        {
            "id": 2,
            "title": "Multi-Agent AI Adaptive Learning",
            "subtitle": "LLM-powered intelligent learning path generation",
            "description": "Developed multi-agent learning system capable of generating adaptive learning paths using LLMs. Built backend with FastAPI + PostgreSQL to manage stateful learning sessions. Designed evaluation pipelines to measure model accuracy and reasoning reliability.",
            "tech": ["Python", "HuggingFace", "FastAPI", "LangChain", "CrewAI", "Autogen", "PostgreSQL"],
            "github": "https://github.com/AnudeepGumpula/Adaptive-Learning",
            "highlight": "Multi-agent LLM system"
        },
        {
            "id": 3,
            "title": "Location Prediction on Twitter",
            "subtitle": "NLP + ML ensemble for real-time geo-prediction",
            "description": "Built a model to predict user locations using NLP preprocessing and ensemble ML techniques. Deployed a REST API via Flask for real-time prediction with high accuracy across diverse user datasets.",
            "tech": ["Python", "Flask", "NLP", "Machine Learning", "REST API"],
            "github": None,
            "highlight": "Ensemble ML + NLP"
        }
    ],
    "experience": [
        {
            "role": "Artificial Intelligence Researcher",
            "company": "Handshake AI",
            "period": "Nov 2025 – Present",
            "location": "Remote",
            "highlights": [
                "Accelerated iteration cycles by 30% via Python APIs",
                "Increased model interaction consistency by 25%",
                "Reduced deployment time by 20% with full service ownership"
            ]
        },
        {
            "role": "AI Software Engineer",
            "company": "Tern Computer Inc",
            "period": "Jul 2025 – Oct 2025",
            "location": "NY, US",
            "highlights": [
                "Improved user engagement by 18% with React/Next.js chatbot",
                "Maintained 99.9% uptime for chatbot backend APIs",
                "Reduced data retrieval latency by 15% via DB optimization"
            ]
        },
        {
            "role": "Graduate Research Assistant",
            "company": "Rivier University",
            "period": "May 2024 – Feb 2025",
            "location": "NH, US",
            "highlights": [
                "Improved assessment accuracy by 40% with PostgreSQL models",
                "Ensured 99% system availability during peak academic usage",
                "Engineered scalable APIs supporting hundreds of concurrent sessions"
            ]
        },
        {
            "role": "Systems Engineer",
            "company": "Tata Consultancy Services",
            "period": "Oct 2021 – Aug 2023",
            "location": "TS, IN",
            "highlights": [
                "Optimized SQL queries by 25% via indexing strategies",
                "Built MongoDB-backed APIs for scalable service workflows",
                "Enhanced UX through JavaScript and SQL-driven integrations"
            ]
        },
        {
            "role": "Full-Stack Engineer",
            "company": "H.C.Roots Foundation",
            "period": "Jan 2021 – Sep 2021",
            "location": "KA, IN",
            "highlights": [
                "Improved platform engagement by 30% with React + MongoDB",
                "Built Python ETL pipelines accelerating reporting efficiency",
                "Collaborated closely with product and design teams"
            ]
        }
    ],
    "certifications": [
        "Microsoft Azure Fundamentals (AZ-900)",
        "Microsoft AI Fundamentals (AI-900)",
        "CCNAv7",
        "Python for Data Science — IBM",
        "Career Essentials in GenAI — Microsoft & LinkedIn"
    ]
}

messages_store = []

@app.get("/api/portfolio")
async def get_portfolio():
    return PORTFOLIO_DATA

@app.get("/api/hero")
async def get_hero():
    return PORTFOLIO_DATA["hero"]

@app.get("/api/skills")
async def get_skills():
    return PORTFOLIO_DATA["skills"]

@app.get("/api/projects")
async def get_projects():
    return PORTFOLIO_DATA["projects"]

@app.get("/api/experience")
async def get_experience():
    return PORTFOLIO_DATA["experience"]

@app.post("/api/contact")
async def send_message(msg: ContactMessage):
    entry = {
        "id": len(messages_store) + 1,
        "name": msg.name,
        "email": msg.email,
        "message": msg.message,
        "timestamp": datetime.now().isoformat()
    }
    messages_store.append(entry)
    return {"success": True, "message": f"Thanks {msg.name}! Message received. Anudeep will get back to you soon."}

@app.get("/api/health")
async def health():
    return {"status": "online", "timestamp": datetime.now().isoformat()}