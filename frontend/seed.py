import requests
import random
import time

# Target endpoint for seeding (assuming a standard local Express/Django/Flask app on port 5000)
API_URL = "http://localhost:5000/api/applications/seed"

# Data sets for random generation
NAMES = ["Amit Kumar", "Priya Singh", "Rahul Verma", "Sneha Joshi", "Vikram Malhotra", 
         "Anjali Desai", "Rohan Gupta", "Kavya Patel", "Aditya Nair", "Pooja Sharma",
         "Karan Mehta", "Neha Reddy", "Arjun Das", "Riya Sen", "Siddharth Bose",
         "Meera Menon", "Varun Iyer", "Tara Ahluwalia", "Rishabh Jain", "Aisha Khan"]

ROLES = ["Software Engineer", "Data Scientist", "Product Manager", "UI/UX Designer"]
STATUSES = ["Approved", "Approved", "Approved", "Pending Review", "Pending Review", "Rejected"]

def generate_dummy_applications(count=20):
    applications = []
    for i in range(count):
        app = {
            "applicant_name": NAMES[i % len(NAMES)],
            "role": random.choice(ROLES),
            "status": random.choice(STATUSES),
            "submission_date": f"2023-10-{random.randint(10, 25)}"
        }
        applications.append(app)
    return applications

def seed_database():
    print(f"Generating 20 dummy applications...")
    apps = generate_dummy_applications(20)
    
    print(f"Attempting to seed to {API_URL}...")
    try:
        response = requests.post(API_URL, json={"applications": apps})
        if response.status_code == 200 or response.status_code == 201:
            print("Successfully seeded database!")
        else:
            print(f"Failed to seed. Status code: {response.status_code}")
            print(f"Response: {response.text}")
    except requests.exceptions.ConnectionError:
        print("Backend is not running or unreachable. Seeding failed, but fallback mock data in frontend will be used for demo.")
        print("Run the backend server and try again if you want to test live data.")

if __name__ == "__main__":
    seed_database()
