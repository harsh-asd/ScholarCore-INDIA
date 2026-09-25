# 🏆 SCHOLARCORE INDIA: COMPLETE SIH PITCH DECK & PROJECT MANIFESTO
**Problem Statement:** 26239 (Ministry of Tribal Affairs)
**Objective:** A seamless, AI-driven, highly accessible, and scalable National Scholarship Portal (NSP) tailored for ST students.

---

## 🏗️ 1. CORE ARCHITECTURE & TECH STACK
We built a highly decoupled, modern web architecture designed for government scale:
*   **Frontend:** React.js powered by Vite (for lightning-fast compilation), styled with Tailwind CSS for pixel-perfect responsiveness.
*   **Backend:** Python FastAPI (asynchronous, high-performance API routing).
*   **Database:** SQLite (for portable, lightweight hackathon execution, easily swappable to PostgreSQL).
*   **Deployment:** 
    *   **Cloud:** Fully CI/CD integrated with GitHub and auto-deployed to Vercel.
    *   **Local (Stage-Safe):** A custom `start_production.bat` script that concurrently spins up a Python static server and FastAPI backend for zero-dependency offline presentations.

---

## 🔐 2. ENTERPRISE SECURITY: 4-TIER RBAC
We implemented a strict **Role-Based Access Control (RBAC)** architecture enforcing the **Principle of Least Privilege** and **Separation of Duties**:
1.  **Student (Applicant):** Can only read/write their personal application, view documents in their Vault, and raise Grievances.
2.  **Institute Nodal Officer (INO - Level 1):** Locked into the *Administrator View*. Strictly limited to verifying students from their specific AISHE code. Can Approve or Defect applications.
3.  **Ministry Officer (Level 2):** Can generate the final Merit List and execute the Push to PFMS (Direct Benefit Transfer). Stripped of forecasting visibility.
4.  **Ministry Executive:** Locked into the *Executive View*. Read-only access to massive data analytics and predictive budget forecasting. Cannot manually verify students to prevent administrative corruption.

---

## 🧠 3. ARTIFICIAL INTELLIGENCE & AUTOMATION
*   **Naarad Muni (AI Chatbot):** A custom-built, floating assistant.
    *   *Multilingual:* Context-aware translation into Hindi, Telugu, and English.
    *   *Voice Accessibility:* Integrated Web Speech API for **Speech-to-Text (Mic)** and **Text-to-Speech (Speaker)**, ensuring differently-abled and rural students can apply via voice.
*   **AI Rule Engine Pipeline:** Replaced manual bureaucracy with algorithmic evaluation.
    *   When an application is submitted, a Python backend engine extracts the data (simulating OCR via SpaCy/Tesseract).
    *   It evaluates Income limits (< 2.5L), Caste validity (ST), and Age limits automatically.
    *   Only applications that pass the AI filter are forwarded to the Institute queue.
*   **Predictive Budget Forecasting:** The Executive Dashboard utilizes an ARIMA-style forecasting simulation to predict scholarship fund requirements for the next 5 years based on historical intake.

---

## 🏛️ 4. UI/UX: THE NSP MIRROR
We meticulously redesigned the frontend to mirror the official Government of India National Scholarship Portal (NSP) while significantly upgrading the user experience:
*   **Design Language:** Utilized the official MoTA palette (Forest Green `#1E5642`, Terracotta `#C85237`, Slate Blue `#3B4B61`, Golden Ochre `#D49A36`).
*   **Action Cards:** Interactive home screen blocks (Students, Institutions, Officers, Public) that smoothly expand and lock users into specific portals.
*   **GIGW Accessibility Compliance:** Injected official Government of India text-resizers (`[A-] [A] [A+]`) into the TopBar, allowing visually impaired users to dynamically scale the DOM font size.
*   **Authentic Datasets:** Wrote web-scrapers to extract the *actual* PDF Scheme Guidelines from `tribal.nic.in` and embedded them directly into the student Scheme Selection page.

---

## 📊 5. DATA INGESTION & AUDIT TRAILS
*   **Historical Data ETL:** We did not want to present an empty database to the judges. We wrote a custom Python ETL script (`ingest_dataset.py`) that injected **2,543 realistic historical scholarship records** spanning AY 2021-2025 into the SQLite database. This instantly populated the Analytics Dashboard with massive, impressive data visualizations.
*   **Mandatory Govt Audit Trails:** When an Institute Officer marks an application as "Defective", the system halts execution and triggers a `window.prompt`. The officer *must* type a specific reason (e.g., "Blurry Income Certificate"). This remark is permanently saved to the database as an Audit Trail and displayed on the student's dashboard.

---

## 🚀 6. FINAL DEPLOYMENT WORKFLOW
*   We created a `.gitignore` to strip out massive `node_modules` and `venv` folders.
*   We ran `npm run build` to compile the Vite application into heavily optimized, minified static HTML/JS assets.
*   We initialized Git, committed the final architecture, and pushed the entire payload to the `harsh-asd/ScholarCore-INDIA` GitHub repository.
*   The system is now continuously deployed on Vercel, with local fallback secured via batch scripting.

**Status:** 100% Feature Complete. Stage Ready.
