import re

with open(r"frontend\src\pages\Login.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the Handle Login Logic
old_login_logic = """      if (role === 'ADMIN') {
        if (email.includes('admin') || email.includes('mota')) {
          localStorage.setItem('userRole', 'ADMIN');
          navigate('/admin');
        } else {
          setError('Invalid Admin credentials. Use admin@mota.gov.in');
        }
      }"""

new_login_logic = """      if (role === 'ADMIN') {
        if (email.includes('ministry')) {
          localStorage.setItem('userRole', 'MINISTRY');
          navigate('/admin');
        } else if (email.includes('officer') || email.includes('admin')) {
          localStorage.setItem('userRole', 'OFFICER');
          navigate('/admin');
        } else {
          setError('Invalid credentials. Use ministry@mota.gov.in or officer@mota.gov.in');
        }
      }"""

content = content.replace(old_login_logic, new_login_logic)

# 2. Update the header title to reflect OFFICER/MINISTRY
content = content.replace("{role === 'ADMIN' && 'Ministry Admin Login'}", "{role === 'ADMIN' && 'Ministry / Officer Portal'}")

# 3. Update the button tab text
content = content.replace("""               <button type="button" onClick={() => setRole('ADMIN')} className={`flex-1 text-xs font-bold py-2 rounded-md transition ${role === 'ADMIN' ? 'bg-white shadow text-[#1E5642]' : 'text-gray-500 hover:text-gray-700'}`}>
                 MINISTRY
               </button>""", """               <button type="button" onClick={() => setRole('ADMIN')} className={`flex-1 text-xs font-bold py-2 rounded-md transition ${role === 'ADMIN' ? 'bg-white shadow text-[#1E5642]' : 'text-gray-500 hover:text-gray-700'}`}>
                 OFFICER / MINISTRY
               </button>""")

# 4. Update the hackathon demo credentials block
old_demo = "{role === 'ADMIN' && <li><span className=\"font-bold\">Ministry:</span> admin@mota.gov.in (pwd: any)</li>}"
new_demo = """               {role === 'ADMIN' && (
                 <>
                   <li><span className="font-bold">Ministry Executive:</span> ministry@mota.gov.in</li>
                   <li><span className="font-bold">Nodal Officer:</span> officer@mota.gov.in</li>
                 </>
               )}"""

content = content.replace(old_demo, new_demo)

# 5. Update input placeholder
content = content.replace("role === 'INSTITUTE' ? 'ino@institute.edu' : 'admin@mota.gov.in'", "role === 'INSTITUTE' ? 'ino@institute.edu' : 'officer@mota.gov.in'")

with open(r"frontend\src\pages\Login.jsx", "w", encoding="utf-8") as f:
    f.write(content)
