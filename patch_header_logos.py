import re

with open(r"frontend\src\components\GoiHeader.jsx", "r", encoding="utf-8") as f:
    content = f.read()

old_header = """        <div className="flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img src="/ashoka_emblem.png" alt="Ashoka Emblem" className="h-[52px] w-auto object-contain mr-2" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a] tracking-tight">ScholarCore India</h1>
              <p className="text-sm md:text-base text-gray-600 font-medium tracking-wide">National Scholarship Portal Integration (MoTA)</p>
            </div>
          </div>"""

new_header = """        <div className="flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <img src="/ashoka_emblem.png" alt="Ashoka Emblem" className="h-[60px] w-auto object-contain" />
            <div className="h-12 w-px bg-gray-300"></div>
            <img src="/mota_logo.png" alt="Ministry of Tribal Affairs" className="h-[60px] w-auto object-contain mix-blend-multiply" />
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-[#1e3a8a] tracking-tight">National Scholarship Portal</h1>
              <p className="text-sm text-gray-600 font-medium">Government of India</p>
            </div>
          </div>
          <div className="hidden md:flex items-center mt-4 md:mt-0">
             <img src="/nsp_logo.png" alt="NSP Logo" className="h-[65px] w-auto object-contain mix-blend-multiply" />
          </div>"""

content = content.replace(old_header, new_header)

with open(r"frontend\src\components\GoiHeader.jsx", "w", encoding="utf-8") as f:
    f.write(content)
