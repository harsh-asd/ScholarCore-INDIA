import time
import requests
import psycopg2

print("==============================================")
print("  ScholarCore India - Diagnostic Search Tool  ")
print("==============================================\n")

print("[*] Testing API Connectivity...")
start_time = time.time()
try:
    response = requests.get("http://localhost:8000/")
    latency = (time.time() - start_time) * 1000
    if response.status_code == 200:
        print(f"[+] FastAPI Backend is ONLINE. Latency: {latency:.2f} ms")
    else:
        print(f"[-] FastAPI Backend returned status {response.status_code}")
except Exception as e:
    print(f"[-] FastAPI Backend is OFFLINE or unreachable. Error: {e}")

print("\n[*] Testing AI Analytics Endpoints...")
start_time = time.time()
try:
    forecast_response = requests.get("http://localhost:8000/api/admin/forecast-budget")
    latency = (time.time() - start_time) * 1000
    if forecast_response.status_code == 200:
        print(f"[+] ARIMA Forecasting API is ONLINE. Latency: {latency:.2f} ms")
    else:
        print(f"[-] Forecasting API error: {forecast_response.status_code}")
except Exception as e:
    print(f"[-] Forecasting API is OFFLINE. Error: {e}")

print("\n[*] Testing PostgreSQL Database Population...")
start_time = time.time()
try:
    conn = psycopg2.connect(
        dbname="scholarship_db",
        user="user",
        password="password",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT count(*) FROM applications;")
    app_count = cursor.fetchone()[0]
    latency = (time.time() - start_time) * 1000
    print(f"[+] PostgreSQL is ONLINE. Latency: {latency:.2f} ms")
    print(f"[+] Total Applications Found in DB: {app_count}")
    conn.close()
except Exception as e:
    print(f"[-] PostgreSQL Database is OFFLINE or unpopulated. Error: {e}")

print("\n==============================================")
print("             DIAGNOSTICS COMPLETE             ")
print("==============================================")
