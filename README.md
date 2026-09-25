# AI-Enabled Scholarship & Fellowship Management System
### Smart India Hackathon Submission (PS ID: 26239)
**Ministry of Tribal Affairs (MoTA)**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![AI/ML](https://img.shields.io/badge/AI_Engine-Tesseract_%7C_spaCy_%7C_Naarad Muni-4285F4?style=for-the-badge)

---

## 🎯 The Problem
The Ministry of Tribal Affairs (MoTA) processes thousands of fellowship (NFST) and scholarship (NOS) applications annually. Currently, this involves massive bottlenecks due to manual scrutiny of documents, lack of real-time multi-lingual support, and fragmented applicant tracking.

## 🚀 The Solution: A Next-Generation Portal
We have built an **AI-enabled, full-stack platform** designed to autonomously parse, evaluate, and track scholarship applications for MoTA, fully mimicking the National Scholarship Portal (NSP) with massive technological upgrades.

### Key Innovations & Features
1. **AI OCR Document Scrutiny:** Utilizes Tesseract OCR + spaCy to extract key entities (income, marks, caste) from uploaded certificates, assigns an AI Confidence Score, and flags discrepancies instantly.
2. **"Naarad Muni" Conversational AI Chatbot:** A fully integrated Helpdesk assistant that can autonomously answer queries regarding scheme eligibility, application deadlines, and status tracking right from the homepage.
3. **Universal Accessibility Engine (100% GoI Compliant):** A live React Context engine that allows users to seamlessly invert colors, toggle Dark/Light mode, highlight links, hide images, and adjust font scales dynamically. 
4. **Multilingual Architecture:** Real-time translation engine supporting English, Hindi, and Telugu, drastically lowering the barrier to entry for tribal students.
5. **Configurable Rule-Engine:** MoTA admins can configure rule sets (e.g., Max Income ₹6,000,000, Min Marks 55%) for NFST vs NOS. The engine automatically approves or rejects candidates based on OCR-extracted data against these JSON rules.
6. **Predictive Dashboards & Tracking:** A detailed, visual timeline for applicants to track their PFMS and Ministry-level approvals, combined with an Admin Dashboard for demographic forecasting and scrutiny review.

---

## 🏗️ Architecture & Tech Stack

```text
+-------------------+       +-----------------------+       +-------------------+
|                   |       |                       |       |                   |
|  React.js (Vite)  | <---> |  FastAPI (Python)     | <---> | SQLite3 Database  |
|  Tailwind CSS v4  |       |  (Tesseract + spaCy)  |       | (Schemas & Rules) |
|  Zustand / Context|       |  (Naarad Muni Chat Engine)   |       |                   |
|                   |       |                       |       |                   |
+-------------------+       +-----------------------+       +-------------------+
    Frontend Port 5173           Backend Port 8000              Local Storage
```

---

## 🛠️ Getting Started (Live Demo Instructions)

### 1. Launch the Backend API & Database
We have included a database seeder that automatically populates the database with realistic MoTA schemes (NOS & NFST) and highly realistic mock applications with OCR confidence scores to demonstrate the AI pipeline.
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed_db.py
uvicorn main:app --reload --port 8000
```
*Backend API Docs (Swagger) available at: [http://localhost:8000/docs](http://localhost:8000/docs)*

### 2. Launch the Frontend React UI
```bash
cd frontend
npm install
npm run dev
```
*Frontend available at: [http://localhost:5173](http://localhost:5173)*

### 3. Demo Highlights for Judges
1. **Homepage:** Click the **Students, Institutions, Officers, Public, Fellowship** cards to see the dynamic grids unfold perfectly (cloned from NSP).
2. **Accessibility:** Click the Universal Accessibility Icon (Top Right) and test the Dark Contrast and Text Scaling engines.
3. **Naarad Muni Chatbot:** Click the floating Chatbot in the bottom right and ask "What is the eligibility for NOS?".
4. **Admin Dashboard:** Navigate to `/admin` to see the seeded database of realistic flagged/approved candidates based on the AI OCR extraction!

---
*Built with ❤️ for the Smart India Hackathon 2026.*
