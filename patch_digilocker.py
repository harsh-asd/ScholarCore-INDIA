import re

with open(r"frontend\src\pages\Registration.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add DigiLocker authentication button to the manual registration form view
old_form_header = """         <div className="flex justify-center mb-6">
           <ShieldCheck size={48} className="text-[var(--color-mota-forest)]" />
         </div>
         <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Applicant Registration</h2>
         
         <form onSubmit={handleRegister} className="space-y-5">"""

new_form_header = """         <div className="flex flex-col items-center mb-6">
           <img src="/digilocker.png" alt="DigiLocker Logo" className="h-20 w-auto object-contain mb-4" />
           <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">OTR Generation</h2>
           <p className="text-sm text-gray-500 text-center mb-6">Authenticate via DigiLocker for instant KYC</p>
           
           <button type="button" onClick={() => alert('Redirecting to DigiLocker OAuth...')} className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition mb-6">
             <ShieldCheck size={20} className="mr-2" /> Authenticate with DigiLocker
           </button>
           
           <div className="relative flex py-2 items-center w-full mb-4">
             <div className="flex-grow border-t border-gray-300"></div>
             <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Or register manually</span>
             <div className="flex-grow border-t border-gray-300"></div>
           </div>
         </div>
         
         <form onSubmit={handleRegister} className="space-y-5">"""

content = content.replace(old_form_header, new_form_header)

with open(r"frontend\src\pages\Registration.jsx", "w", encoding="utf-8") as f:
    f.write(content)
