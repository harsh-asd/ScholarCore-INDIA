@echo off
echo ===================================================
echo     SCHOLARCORE INDIA - PRODUCTION SERVER START
echo ===================================================
echo.

echo [1] Starting FastAPI Backend on Port 8000...
start cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --host 0.0.0.0 --port 8000"

echo [2] Starting Frontend Static Server on Port 3000...
start cmd /k "cd frontend\dist && python -m http.server 3000"

echo.
echo ===================================================
echo   PORTAL IS LIVE! 
echo   Access the application at: http://localhost:3000
echo ===================================================
