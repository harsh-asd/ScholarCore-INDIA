# ScholarCore India

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Tesseract OCR](https://img.shields.io/badge/Tesseract_OCR-4285F4?style=for-the-badge)

**Smart India Hackathon Submission**  
**Problem Statement ID:** 26239  
**Ministry:** Ministry of Tribal Affairs (MoTA)

---

## 🎯 Executive Summary & Problem-Solution Fit

Currently, the evaluation of tribal scholarship applications involves massive bottlenecks due to manual scrutiny of physical or scanned documents. This leads to administrative delays, human error, and prolonged wait times for deserving students.

The **ScholarCore India** platform is an AI-enabled portal designed to autonomously parse, evaluate, and track scholarship applications. By leveraging **Document Intelligence (Tesseract OCR & spaCy)** and a **Dynamic JSON Rule Engine**, the system extracts key metrics (like annual income and exam scores) directly from uploaded certificates. It then validates this data against configurable government schemes to instantly approve applications or flag anomalies for manual review—drastically reducing the bureaucratic backlog and ensuring rapid disbursement of funds.


---

## 🏗️ Architecture & Tech Stack

### Tech Stack
* **Frontend:** React.js, Tailwind CSS, Recharts (Admin Dashboards), Vite
* **Backend:** Python, FastAPI, SQLAlchemy
* **AI/OCR Pipeline:** Tesseract OCR, spaCy, Pillow
* **Database:** PostgreSQL (utilizing JSONB for dynamic rule schemas)
* **Infrastructure:** Docker, Docker Compose, Nginx

### Data Flow
1. **Ingestion:** The applicant uploads a scanned certificate via the React frontend.
2. **Extraction:** The FastAPI backend receives the document and processes it through the Tesseract/spaCy pipeline, extracting critical entities and calculating an AI Confidence Score.
3. **Evaluation:** The extracted JSON payload is passed to the Rule Engine. The engine fetches the corresponding scheme's criteria from PostgreSQL.
4. **Decision:** 
   - If criteria match and confidence is >75%: `APPROVED`
   - If criteria fail: `REJECTED`
   - If data is missing or OCR confidence is low: `MANUAL_REVIEW`
5. **Analytics:** The dashboard consumes optimized SQL aggregates via `/api/admin/analytics-summary` to render real-time charts.

---

## 📸 Screenshots

*Replace these placeholders with your actual screenshots before presentation.*

### Applicant Tracking Dashboard
![Applicant Dashboard](docs/applicant-dashboard.png)

### Admin Analytics & Data Table
![Admin Analytics Dashboard](docs/admin-analytics.png)

---

## 🚀 Getting Started (Local Deployment)

The entire application is fully containerized. You do not need to manually install Python, Node, PostgreSQL, or Tesseract OCR on your host machine.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Quick Start

1. **Clone the repository and navigate to the root directory:**
   ```bash
   git clone <your-repo-url>
   cd SIH_26239
   ```

2. **Launch the stack using Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```
   *This command will pull the Postgres image, build the FastAPI/Tesseract backend container, compile the React frontend, and spin up the Nginx web server.*

3. **Access the Application:**
   - **Frontend UI:** [http://localhost:80](http://localhost:80) (or `http://localhost:8080` depending on your port mapping)
   - **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Shutdown:**
   To stop the containers and gracefully shut down the application:
   ```bash
   docker-compose down
   ```

---

*Built with ❤️ for the Smart India Hackathon.*
