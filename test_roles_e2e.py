import os
from playwright.sync_api import sync_playwright

def test_roles():
    print("Starting E2E RBAC Verification...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # --- TEST 1: STUDENT ROLE ---
        print("\\n[1/4] Testing STUDENT Role...")
        context_student = browser.new_context()
        page = context_student.new_page()
        page.goto("http://localhost:5173/login?role=STUDENT")
        
        # Fill login
        page.fill("input[type='text']", "student@gmail.com")
        page.fill("input[type='password']", "password123")
        page.click("button[type='submit']")
        
        # Wait for navigation to /applicant
        page.wait_for_url("**/applicant", timeout=5000)
        print("  âœ“ Successfully routed to /applicant")
        
        # Check Applicant Dashboard elements
        assert page.is_visible("text=Applicant Dashboard")
        assert page.is_visible("text=Application Status")
        print("  âœ“ Student Dashboard rendered correctly")
        context_student.close()
        
        # --- TEST 2: INSTITUTE ROLE ---
        print("\\n[2/4] Testing INSTITUTE Role...")
        context_inst = browser.new_context()
        page = context_inst.new_page()
        page.goto("http://localhost:5173/login?role=INSTITUTE")
        
        # Fill login
        page.fill("input[type='text']", "ino@institute.edu")
        page.fill("input[type='password']", "password123")
        page.click("button[type='submit']")
        
        # Wait for navigation to /institute
        page.wait_for_url("**/institute", timeout=5000)
        print("  âœ“ Successfully routed to /institute")
        
        # Check Institute Dashboard elements
        assert page.is_visible("text=Level-1 Restricted Access")
        assert page.is_visible("text=Level-1 Verification Queue")
        print("  âœ“ Institute Dashboard restricted RBAC rendered correctly")
        context_inst.close()

        # --- TEST 3: OFFICER ROLE ---
        print("\\n[3/4] Testing Nodal OFFICER Role...")
        context_off = browser.new_context()
        page = context_off.new_page()
        page.goto("http://localhost:5173/login?role=ADMIN")
        
        # Fill login with OFFICER email
        page.fill("input[type='text']", "officer@mota.gov.in")
        page.fill("input[type='password']", "password123")
        page.click("button[type='submit']")
        
        # Wait for navigation to /admin
        page.wait_for_url("**/admin", timeout=5000)
        print("  âœ“ Successfully routed to /admin")
        
        # Check Officer RBAC
        assert page.is_visible("text=ADMINISTRATOR VIEW")
        assert page.is_visible("text=Merit Selection") # Default tab
        assert not page.is_visible("text=Budget Forecast") # Should not be visible
        print("  âœ“ Officer RBAC enforced correctly (No Forecast access)")
        context_off.close()

        # --- TEST 4: MINISTRY ROLE ---
        print("\\n[4/4] Testing MINISTRY Executive Role...")
        context_min = browser.new_context()
        page = context_min.new_page()
        page.goto("http://localhost:5173/login?role=ADMIN")
        
        # Fill login with MINISTRY email
        page.fill("input[type='text']", "ministry@mota.gov.in")
        page.fill("input[type='password']", "password123")
        page.click("button[type='submit']")
        
        # Wait for navigation to /admin
        page.wait_for_url("**/admin", timeout=5000)
        print("  âœ“ Successfully routed to /admin")
        
        # Check Ministry RBAC
        assert page.is_visible("text=EXECUTIVE VIEW")
        assert page.is_visible("text=Overview") # Default tab
        assert not page.is_visible("text=Scheme Config") # Should not be visible
        assert not page.is_visible("text=Merit Selection") # Should not be visible
        print("  âœ“ Ministry RBAC enforced correctly (No Action access)")
        context_min.close()

        browser.close()
        
    print("\\nALL RBAC ROUTES AND FEATURES VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    try:
        test_roles()
    except Exception as e:
        print(f"\\nTEST FAILED: {e}")
