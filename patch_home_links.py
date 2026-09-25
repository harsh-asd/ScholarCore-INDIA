import re

with open(r"frontend\src\pages\Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "alert('Eligibility module opening...')": "navigate('/applicant/schemes')",
    "alert('Redirecting to PFMS Portal...')": "window.open('https://pfms.nic.in/', '_blank')",
    "alert('Opening Geo-visualization map...')": "window.open('https://bhuvan.nrsc.gov.in/aadhaar/', '_blank')",
    "alert('Checking NPCI mapper status...')": "window.open('https://resident.uidai.gov.in/bank-mapper', '_blank')",
    "alert('Showing Seeding Instructions...')": "window.open('https://uidai.gov.in/images/AadhaarSeedingInstructions.pdf', '_blank')",
    "alert('Redirecting to Swavlamban Portal...')": "window.open('https://www.swavlambancard.gov.in/', '_blank')",
    "alert('Opening OTR FAQs...')": "document.getElementById('faqs')?.scrollIntoView({behavior: 'smooth'})",
    "alert('Opening Announcements...')": "document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})",
    "alert('Redirecting to Registration...')": "navigate('/register')",
    "alert('Opening user manual...')": "window.open('https://scholarships.gov.in/public/faq/NSP_Inst_Manual.pdf', '_blank')",
    "alert('Redirecting to AISHE search...')": "window.open('https://aishe.gov.in/aishe/aisheCode', '_blank')",
    "alert('Redirecting to AISHE registration...')": "window.open('https://aishe.gov.in/', '_blank')",
    "alert('Redirecting to UDISE+...')": "window.open('https://udiseplus.gov.in/', '_blank')",
    "alert('Opening Officer Announcements...')": "document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})",
    "alert('Redirecting to Nodal Officer List...')": "window.open('https://scholarships.gov.in/public/nodalOfficerList', '_blank')",
    "alert('Redirecting to GRO PDF List...')": "window.open('https://scholarships.gov.in/public/faq/GRO_List.pdf', '_blank')",
    "alert('Redirecting to Dashboard...')": "navigate('/admin/analytics')",
    "alert('Opening Institute Search...')": "window.open('https://scholarships.gov.in/public/findInstitute', '_blank')",
    "alert('Redirecting to Scheme-wise Search...')": "navigate('/applicant/schemes')",
    "alert('Redirecting to District-wise Search...')": "window.open('https://scholarships.gov.in/public/nodalOfficerList', '_blank')",
    "alert('Opening Grievance Portal...')": "navigate('/applicant/grievances')",
    "alert('Opening NSP Helpdesk Details...')": "document.getElementById('helpdesk')?.scrollIntoView({behavior: 'smooth'})",
    "alert('Opening PFMS Helpdesk Details...')": "document.getElementById('helpdesk')?.scrollIntoView({behavior: 'smooth'})",
    "alert('Opening Candidate Login...')": "navigate('/login')",
    "alert('Opening Institute Login...')": "navigate('/institute')",
    "alert('Opening Ministry Login...')": "navigate('/admin')",
    "alert('Redirecting to OTR Application...')": "navigate('/register')",
    "alert('Opening Fellowship Announcements...')": "document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})"
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(r"frontend\src\pages\Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("All Home.jsx alerts replaced successfully!")
