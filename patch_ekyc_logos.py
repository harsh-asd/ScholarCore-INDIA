import re

with open(r"frontend\src\pages\ApplicationForm.jsx", "r", encoding="utf-8") as f:
    content = f.read()

old_ekyc = """              <h3 className="text-xl font-bold text-[#1E5642] mb-2 flex items-center">
                 <Camera className="mr-2" />
                 AI Face Liveness Verification
              </h3>
              <p className="text-sm text-gray-600 mb-6">To prevent identity fraud, please ensure your face is clearly visible. The AI will match this live capture against your Aadhaar/DigiLocker photo.</p>"""

new_ekyc = """              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
                <h3 className="text-xl font-bold text-[#1E5642] flex items-center">
                   <Camera className="mr-2" />
                   Aadhaar eKYC Liveness Verification
                </h3>
                <div className="flex items-center space-x-3">
                   <img src="/aadhaar.png" alt="Aadhaar" className="h-10 w-auto object-contain" />
                   <img src="/digilocker.png" alt="DigiLocker" className="h-10 w-auto object-contain" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6 font-medium">To prevent identity fraud and duplicate applications, the AI will match this live capture against your official Aadhaar vault photo.</p>"""

content = content.replace(old_ekyc, new_ekyc)

with open(r"frontend\src\pages\ApplicationForm.jsx", "w", encoding="utf-8") as f:
    f.write(content)
