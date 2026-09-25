import requests
from bs4 import BeautifulSoup
import json

class MoTAIntegrationEngine:
    def __init__(self):
        self.dbt_url = "https://dbttribal.gov.in/AllScheme.aspx"
        self.nic_url = "https://tribal.nic.in/ScholarshiP.aspx"

    def fetch_dbt_schemes(self):
        """
        Proof of Concept: Scraping the ASP.NET GridView from DBT Tribal.
        Note: Production use requires handling ASP.NET __VIEWSTATE and __EVENTVALIDATION.
        """
        print(f"[*] Connecting to {self.dbt_url}...")
        try:
            # Disable SSL verify for legacy government portals if certificates are outdated
            response = requests.get(self.dbt_url, verify=False, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Locate the central content table (ASPX GridView format)
            # This ID is a placeholder for the actual ASPX table ID
            table = soup.find('table', {'class': 'table'}) 
            
            schemes = []
            if table:
                rows = table.find_all('tr')[1:] # Skip header
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) >= 3:
                        schemes.append({
                            "scheme_name": cols[0].text.strip(),
                            "beneficiaries": cols[1].text.strip(),
                            "fund_disbursed": cols[2].text.strip()
                        })
                print(f"[+] Successfully extracted {len(schemes)} schemes.")
                return schemes
            else:
                print("[-] Could not locate static table. Page may require Playwright for JavaScript rendering.")
                return []
                
        except Exception as e:
            print(f"[-] Connection failed: {e}")
            return []

    def sync_to_local_db(self, schemes_data):
        """
        Converts the scraped data into the format our FastAPI Rule Engine uses.
        """
        print("[*] Transforming data for ScholarCore India database...")
        for data in schemes_data:
            payload = {
                "name": data['scheme_name'],
                "ministry": "Ministry of Tribal Affairs",
                "rules": {
                    "max_income": 250000,
                    "required_documents": ["Aadhaar", "Income Certificate"]
                }
            }
            # requests.post("http://localhost:8000/api/admin/schemes", json=payload)
            print(f"[Sync] Emulated POST to local DB: {payload['name']}")

if __name__ == "__main__":
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    engine = MoTAIntegrationEngine()
    engine.fetch_dbt_schemes()
    print("\n[+] Integration pipeline ready.")
