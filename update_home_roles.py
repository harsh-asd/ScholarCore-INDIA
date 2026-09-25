import re

with open(r"frontend\src\pages\Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "navigate('/login')": "navigate('/login?role=STUDENT')",
    "navigate('/institute')": "navigate('/login?role=INSTITUTE')",
    "navigate('/admin')": "navigate('/login?role=ADMIN')"
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(r"frontend\src\pages\Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Home.jsx updated to pass role parameters!")
