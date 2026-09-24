from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000/docs")
    page.screenshot(path="backend_docs.png")
    page.goto("http://localhost:5173/")
    page.screenshot(path="frontend_home.png")
    browser.close()
