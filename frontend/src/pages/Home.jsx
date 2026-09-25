import React, { useState, useEffect } from 'react';
import { ChevronRight, GraduationCap, Building2, Users, UsersRound, Award, Megaphone, CheckCircle, ArrowRight, MessageCircle, ArrowLeft, UserPlus, FileText, ClipboardCheck, Activity, CreditCard, MapPin, Fingerprint, QrCode, FileEdit, LogIn, HelpCircle, Search, PlusCircle, Globe, UserCog, Scale, BarChart3, ClipboardList, Headset, LifeBuoy, Landmark } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import NaaradChatbot from '../components/NaaradChatbot';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState('default');

  return (
    <div className="w-full bg-white min-h-screen relative overflow-x-hidden font-sans">
      
      {/* NSP Style Hero Carousel */}
      <div className="relative w-full h-[320px] bg-gradient-to-r from-blue-50 via-white to-indigo-50 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070" alt="Students" className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-multiply" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 tracking-tight drop-shadow-sm">{t('empowering')}</h1>
          <p className="text-lg md:text-xl text-blue-700 font-medium tracking-wide max-w-2xl mx-auto">{t('lifelong')}</p>
        </div>
        
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-white p-3 rounded-full text-blue-600 shadow-sm transition"><ChevronRight className="rotate-180" size={32}/></button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-white p-3 rounded-full text-blue-600 shadow-sm transition"><ChevronRight size={32}/></button>
      </div>

      {/* NSP Style Latest Updates Marquee */}
      <div id="announcements" className="bg-blue-600 text-white flex items-center shadow-md scroll-mt-24 font-medium">
        <div className="bg-[#C85237] font-bold px-6 py-2 whitespace-nowrap z-10 relative">
          LATEST UPDATES
          <div className="absolute right-[-10px] top-0 w-0 h-0 border-t-[18px] border-t-transparent border-l-[10px] border-l-[#C85237] border-b-[18px] border-b-transparent"></div>
        </div>
        <div className="overflow-hidden whitespace-nowrap pl-6 py-2 flex-1">
          <marquee behavior="scroll" direction="left" scrollamount="6" className="text-sm font-medium tracking-wide" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
            <span className="mx-8">ðŸ”´ One Time Registration (OTR) is mandatory for Academic Year 2026-27.</span>
            <span className="mx-8">ðŸ”´ Ministry of Tribal Affairs extends National Fellowship deadline to 31st October 2026.</span>
            <span className="mx-8">ðŸ”´ Aadhaar authentication is compulsory for Direct Benefit Transfer (DBT).</span>
            <span className="mx-8">ðŸ”´ INO verification process guidelines updated for the new term.</span>
          </marquee>
        </div>
      </div>


      {/* Refined MoTA Action Cards Row */}
      <div className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="flex flex-wrap w-full">
          <div onClick={() => setActiveView('students')} className={`flex-1 min-w-[200px] h-32 text-gray-900 flex flex-col items-center justify-center cursor-pointer transition duration-300 border-r border-[#164332] ${activeView === 'students' ? 'bg-[#164332]' : 'bg-[#1E5642] hover:bg-[#164332]'}`}>
            <div className="flex flex-col items-center space-y-2">
               <GraduationCap size={32} strokeWidth={1.5} />
               <span className="text-xl font-semibold tracking-wide">{t('students_card')}</span>
            </div>
          </div>
          <div onClick={() => setActiveView('institutions')} className={`flex-1 min-w-[200px] h-32 text-gray-900 flex flex-col items-center justify-center cursor-pointer transition duration-300 border-r border-[#A6432D] ${activeView === 'institutions' ? 'bg-[#A6432D]' : 'bg-[#C85237] hover:bg-[#A6432D]'}`}>
            <div className="flex flex-col items-center space-y-2">
               <Building2 size={32} strokeWidth={1.5} />
               <span className="text-xl font-semibold tracking-wide">{t('institutions')}</span>
            </div>
          </div>
          <div onClick={() => setActiveView('officers')} className={`flex-1 min-w-[200px] h-32 text-gray-900 flex flex-col items-center justify-center cursor-pointer transition duration-300 border-r border-[#2A3749] ${activeView === 'officers' ? 'bg-[#2A3749]' : 'bg-[#3B4B61] hover:bg-[#2A3749]'}`}>
            <div className="flex flex-col items-center space-y-2">
               <Users size={32} strokeWidth={1.5} />
               <span className="text-xl font-semibold tracking-wide">{t('officers')}</span>
            </div>
          </div>
          <div onClick={() => setActiveView('public')} className={`flex-1 min-w-[200px] h-32 text-gray-900 flex flex-col items-center justify-center cursor-pointer transition duration-300 border-r border-[#125D67] ${activeView === 'public' ? 'bg-[#125D67]' : 'bg-[#187884] hover:bg-[#125D67]'}`}>
            <div className="flex flex-col items-center space-y-2">
               <UsersRound size={32} strokeWidth={1.5} />
               <span className="text-xl font-semibold tracking-wide">{t('public')}</span>
            </div>
          </div>
          <div onClick={() => setActiveView('fellowship')} className={`flex-1 min-w-[200px] h-32 text-gray-900 flex flex-col items-center justify-center cursor-pointer transition duration-300 ${activeView === 'fellowship' ? 'bg-[#B3802C]' : 'bg-[#D49A36] hover:bg-[#B3802C]'}`}>
            <div className="flex flex-col items-center space-y-2">
               <Award size={32} strokeWidth={1.5} />
               <span className="text-xl font-semibold tracking-wide">{t('fellowship')}</span>
            </div>
          </div>
        </div>
      </div>

      {activeView === 'default' && (
        <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column: Announcements */}
          <div>
            <div className="flex flex-col items-center md:items-start mb-6 text-center md:text-left">
              <Megaphone size={64} className="text-[#C85237] mb-4 drop-shadow-sm" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-gray-800">{t('announcements')}</h2>
            </div>
            
            <div className="border-l-4 border-gray-200 pl-4 space-y-6 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              <div className="border-b border-dashed border-gray-300 pb-4">
                <p className="text-[15px] text-[#2F6955] font-medium leading-relaxed">{t('ticker_text')}</p>
              </div>
              <div className="border-b border-dashed border-gray-300 pb-4">
                <p className="text-[15px] text-[#2F6955] font-medium leading-relaxed">Renewal applications for the MoTA National Overseas Scholarship (Merit Based Scheme) are now open for the upcoming cohort.</p>
              </div>
              <div className="border-b border-dashed border-gray-300 pb-4">
                <p className="text-[15px] text-[#2F6955] font-medium leading-relaxed">All disabled students must first login in the UDID portal and provide consent to share their UDID details and then submit application in NSP.</p>
              </div>
              <Link to="#" className="text-[#1E5642] font-bold text-sm inline-block mt-2 hover:underline">View more</Link>
            </div>
          </div>

          {/* Right Column: OTR */}
          <div>
            <div className="flex flex-col items-center md:items-start mb-6 text-center md:text-left">
              <div className="mb-4 relative flex items-center justify-center drop-shadow-sm">
                <GraduationCap size={64} className="text-[#1E5642]" strokeWidth={1.5} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
                  <span className="text-[#1E5642] font-extrabold text-xl tracking-tighter block">OTR</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{t('otr_title')}</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
              <p>{t('otr_desc_1')}</p>
              <p>{t('otr_desc_2')}</p>
              <p>{t('otr_desc_3')}</p>
              <button onClick={() => navigate('/register')} className="text-[#1E5642] font-bold text-lg inline-flex items-center hover:underline mt-4">
                {t('otr_apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'students' && (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex items-center mb-8 border-b-4 border-[#1E5642] pb-4">
            <button onClick={() => setActiveView('default')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-bold text-black tracking-tight">{t('students_card')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Announcements */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Megaphone size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Announcements</h3>
              <p className="text-sm text-[#2F6955] mb-4 leading-relaxed">Renewal applications for MoTA Scholarships are open in the portal. Closing date for student application is 31-10-2026.</p>
            </div>

            {/* 2. OTR */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition relative">
              <div className="flex justify-between items-start mb-4">
                 <div className="relative">
                   <GraduationCap size={56} className="text-[#1E5642]" strokeWidth={1.5} />
                   <span className="absolute top-[22px] left-[13px] text-[#1E5642] font-extrabold text-sm">OTR</span>
                 </div>
                 <div className="border-2 border-black rounded flex flex-col items-center bg-white p-1">
                    <QrCode size={40} className="text-black" />
                    <span className="text-[7px] font-bold bg-black text-gray-900 w-full text-center mt-1 uppercase">NSP OTR App</span>
                 </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">OTR</h3>
              <p className="text-sm text-gray-700 mb-3">One Time Registration (OTR) is a unique 14-digit number issued based on Aadhaar...</p>
              <button onClick={() => navigate('/login?role=STUDENT')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Login</button>
            </div>

            {/* 3. Apply For Scholarship */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <UserPlus size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply For Scholarship</h3>
              <p className="text-sm text-gray-700 mb-4">Login with your OTR ID and PASSWORD to fill and check status of your Fresh and Renewal Scholarship application.</p>
              <button onClick={() => navigate('/login?role=STUDENT')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Login</button>
            </div>

            {/* 4. Schemes on NSP */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition border-l-4 border-l-[#1E5642]">
              <FileText size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Schemes on Portal</h3>
              <p className="text-sm text-gray-700 mb-4">List of scholarship schemes with specification, FAQ and scheme opening and closing timeline.</p>
              <button onClick={() => {navigate('/login?role=STUDENT')}} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Schemes on Portal</button>
            </div>

            {/* 5. Scholarship Eligibility */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <ClipboardCheck size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scholarship Eligibility</h3>
              <p className="text-sm text-gray-700 mb-4">Know your eligibility for different scholarship schemes available on the National Scholarship Portal.</p>
              <button onClick={() => navigate('/applicant/schemes')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">View</button>
            </div>

            {/* 6. Application Status */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Activity size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Application Status</h3>
              <p className="text-sm text-gray-700 mb-4">Track your real-time application status For Academic Year 2026-27.</p>
              <button onClick={() => navigate('/login?role=STUDENT')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Login</button>
            </div>

            {/* 7. Track Your Payment */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <CreditCard size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track Your Payment</h3>
              <p className="text-sm text-gray-700 mb-4">Track your scholarship disbursement status directly on the PFMS portal.</p>
              <button onClick={() => window.open('https://pfms.nic.in/', '_blank')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Track Your Payment</button>
            </div>

            {/* 8. Aadhaar Seva Kendra */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <MapPin size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aadhaar Seva Kendra<br/><span className="text-sm font-normal text-gray-500">(Geo-visualization)</span></h3>
              <p className="text-sm text-gray-700 mb-4">Know the Aadhaar Seva Kendra nearest to your location.</p>
              <button onClick={() => window.open('https://bhuvan.nrsc.gov.in/aadhaar/', '_blank')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Aadhaar Seva Kendra</button>
            </div>

            {/* 9. Aadhaar Seeding */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Fingerprint size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aadhaar Seeding</h3>
              <p className="text-sm text-gray-700 mb-4">Check your bank account seeding status with Aadhaar.</p>
              <div className="flex flex-col space-y-2 items-start">
                <button onClick={() => window.open('https://resident.uidai.gov.in/bank-mapper', '_blank')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">Check Bank Account(Aadhaar Linked)</button>
                <button onClick={() => window.open('https://uidai.gov.in/images/AadhaarSeedingInstructions.pdf', '_blank')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">How to seed Aadhaar with Bank</button>
              </div>
            </div>

            {/* 10. Check UDID details */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <UserPlus size={56} className="text-[#1E5642] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Check UDID details<br/><span className="text-sm font-normal text-gray-500">(For Disabled Applicants)</span></h3>
              <p className="text-sm text-gray-700 mb-4">Check UDID details at Swavlamban Portal</p>
              <button onClick={() => window.open('https://www.swavlambancard.gov.in/', '_blank')} className="text-black font-bold border-b border-black hover:text-[#1E5642]">UDID details</button>
            </div>

          </div>
        </div>
      )}

      {activeView === 'institutions' && (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex items-center mb-8 border-b-4 border-[#C85237] pb-4">
            <button onClick={() => setActiveView('default')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-bold text-black tracking-tight">{t('institutions')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Announcements */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Megaphone size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Announcements</h3>
              <ul className="space-y-3 list-disc pl-4 text-sm text-[#2F6955] mb-4 leading-relaxed">
                <li>The Portal is open for Academic year 2026-27 from 1'st June 2026 onwards.</li>
                <li>Students may apply for one merit-based scholarship scheme and one or more welfare-based scholarship schemes from AY 2026â€“27, as per scheme eligibility criteria.</li>
                <li>From AY 2024-25 One Time Registration (OTR) no. is required to fill the scholarship application. Head of Institutes (HoIs) and Institute Nodal Officers (INOs) are advised to inform the students to register for OTR. For detailed guidelines on OTR please visit <Link to="#" onClick={() => document.getElementById('faqs')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold hover:underline">OTR FAQs</Link></li>
              </ul>
              <Link to="#" onClick={() => document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold border-b border-black hover:text-[#C85237]">View all</Link>
            </div>

            {/* 2. Registration Form */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <FileEdit size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Registration Form</h3>
              <p className="text-sm text-gray-700 mb-4">New Institutes (not on-boarded on NSP) having valid AISHE/UDISE+/NCVT code can register on NSP.</p>
              <button onClick={() => navigate('/register')} className="text-black font-bold border-b border-black hover:text-[#C85237]">Apply now!</button>
            </div>

            {/* 3. Login */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <LogIn size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Login</h3>
              <p className="text-sm text-gray-700 mb-4">Institute Nodal Officers (HoIs/INOs) can login using their user id and password.</p>
              <button onClick={() => navigate('/login?role=ADMIN')} className="text-black font-bold border-b border-black hover:text-[#C85237]">Login</button>
            </div>

            {/* 4. How To Fill Registration Form */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition border-l-4 border-l-[#C85237]">
              <HelpCircle size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">How To Fill Registration Form</h3>
              <p className="text-sm text-gray-700 mb-4">To know how to fill registration form of institute</p>
              <button onClick={() => window.open('https://scholarships.gov.in/public/faq/NSP_Inst_Manual.pdf', '_blank')} className="text-black font-bold border-b border-black hover:text-[#C85237]">Click here</button>
            </div>

            {/* 5. Know your AISHE Code */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Search size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Know your AISHE Code</h3>
              <p className="text-sm text-gray-700 mb-4">Find out the AISHE code of your institute</p>
              <button onClick={() => window.open('https://aishe.gov.in/aishe/aisheCode', '_blank')} className="text-black font-bold border-b border-black hover:text-[#C85237]">Click here</button>
            </div>

            {/* 6. Get AISHE Code */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <PlusCircle size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get AISHE Code</h3>
              <p className="text-sm text-gray-700 mb-4">Apply in the AISHE Portal to register your institute for AISHE code</p>
              <button onClick={() => window.open('https://aishe.gov.in/', '_blank')} className="text-black font-bold border-b border-black hover:text-[#C85237]">Get AISHE code</button>
            </div>

            {/* 7. UDISE+ Website */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Globe size={56} className="text-[#C85237] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">UDISE+ Website</h3>
              <p className="text-sm text-gray-700 mb-4">For registration of your institute in UDISE+</p>
              <button onClick={() => window.open('https://udiseplus.gov.in/', '_blank')} className="text-black font-bold border-b border-black hover:text-[#C85237]">Click here</button>
            </div>

          </div>
        </div>
      )}

      {activeView === 'officers' && (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex items-center mb-8 border-b-4 border-[#3B4B61] pb-4">
            <button onClick={() => setActiveView('default')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-bold text-black tracking-tight">{t('officers')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            
            {/* 1. Announcements */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Megaphone size={56} className="text-[#3B4B61] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Announcements</h3>
              <ul className="space-y-3 list-disc pl-4 text-sm text-[#2F6955] mb-4 leading-relaxed">
                <li>The Portal is open for Academic year 2026-27 from 1'st June 2026 onwards.</li>
                <li>Students may apply for one merit-based scholarship scheme and one or more welfare-based scholarship schemes from AY 2026â€“27, as per scheme eligibility criteria.</li>
                <li>From AY 2024-25 One Time Registration (OTR) no. is required to fill the scholarship application. Ministry/Department/Zone/State/District level Nodal Officers are advised to inform the students to register for OTR. For detailed guidelines on OTR please visit <Link to="#" onClick={() => document.getElementById('faqs')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold hover:underline">OTR FAQs</Link></li>
              </ul>
              <Link to="#" onClick={() => document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold border-b border-black hover:text-[#3B4B61]">View all</Link>
            </div>

            {/* 2. Nodal Officers */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <UserCog size={56} className="text-[#3B4B61] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nodal Officers <span className="text-sm font-normal text-gray-500">(Scheme-wise)</span></h3>
              <p className="text-sm text-gray-700 mb-4">Find the list of Nodal Officers designated by the Ministries/Departments/ States/UTs for each scheme</p>
              <button onClick={() => window.open('https://scholarships.gov.in/public/nodalOfficerList', '_blank')} className="text-black font-bold border-b border-black hover:text-[#3B4B61]">Find List</button>
            </div>

            {/* 3. Login */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition border-l-4 border-l-[#3B4B61]">
              <LogIn size={56} className="text-[#3B4B61] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Login</h3>
              <p className="text-sm text-gray-700 mb-4">Nodal officers can login using their USER ID and PASSWORD</p>
              <button onClick={() => navigate('/admin/analytics')} className="text-black font-bold border-b border-black hover:text-[#3B4B61]">Login</button>
            </div>

            {/* 4. Grievance Redressal Officers */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
              <Scale size={56} className="text-[#3B4B61] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grievance Redressal Officers <span className="text-sm font-normal text-gray-500">(Scheme-wise)</span></h3>
              <p className="text-sm text-gray-700 mb-4">Find the list of Grievance Redressal Officers(GROs) for Central Sector Schemes on NSP</p>
              <button onClick={() => window.open('https://scholarships.gov.in/public/faq/GRO_List.pdf', '_blank')} className="text-black font-bold border-b border-black hover:text-[#3B4B61]">Find List</button>
            </div>

          </div>
        </div>
      )}

      {activeView === 'public' && (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex items-center mb-8 border-b-4 border-[#187884] pb-4">
            <button onClick={() => setActiveView('default')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-bold text-black tracking-tight">{t('public')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             
             {/* 1. Dashboard */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <BarChart3 size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dashboard</h3>
                <p className="text-sm text-gray-700 mb-4">Visualization of the statistical data available on NSP regarding the receipt and processing of scholarship applications in schemes onboarded on NSP.</p>
                <button onClick={() => navigate('/admin/analytics')} className="text-black font-bold border-b border-black hover:text-[#187884]">View all</button>
             </div>

             {/* 2. Find Institutes on NSP */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <Search size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Find Institutes on NSP</h3>
                <p className="text-sm text-gray-700 mb-4">Search Institutes available on NSP</p>
                <button onClick={() => window.open('https://scholarships.gov.in/public/findInstitute', '_blank')} className="text-black font-bold border-b border-black hover:text-[#187884]">Search now!</button>
             </div>

             {/* 3. Nodal Officers (Scheme-wise) */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <UserCog size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Nodal Officers <span className="text-sm font-normal text-gray-500">(Scheme-wise)</span></h3>
                <p className="text-sm text-gray-700 mb-4">Search Scheme-wise Nodal Officers</p>
                <button onClick={() => navigate('/applicant/schemes')} className="text-black font-bold border-b border-black hover:text-[#187884]">View</button>
             </div>

             {/* 4. Nodal Officers (District-wise) */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition border-l-4 border-l-[#187884]">
                <MapPin size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Nodal Officers <span className="text-sm font-normal text-gray-500">(District-wise)</span></h3>
                <p className="text-sm text-gray-700 mb-4">Search District-wise Nodal Officers (DNOs)</p>
                <button onClick={() => window.open('https://scholarships.gov.in/public/nodalOfficerList', '_blank')} className="text-black font-bold border-b border-black hover:text-[#187884]">View</button>
             </div>

             {/* 5. Grievance Registration */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <ClipboardList size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Grievance Registration</h3>
                <p className="text-sm text-gray-700 mb-4">Register Your Grievance or Check Status</p>
                <button onClick={() => navigate('/applicant/grievances')} className="text-black font-bold border-b border-black hover:text-[#187884]">View</button>
             </div>

             {/* 6. NSP Helpdesk */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <Headset size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">NSP Helpdesk</h3>
                <p className="text-sm text-gray-700 mb-4">NSP Helpdesk</p>
                <button onClick={() => document.getElementById('helpdesk')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold border-b border-black hover:text-[#187884]">View</button>
             </div>

             {/* 7. PFMS Helpdesk */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <LifeBuoy size={56} className="text-[#187884] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">PFMS Helpdesk</h3>
                <p className="text-sm text-gray-700 mb-4">PFMS Helpdesk</p>
                <button onClick={() => document.getElementById('helpdesk')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold border-b border-black hover:text-[#187884]">View</button>
             </div>

          </div>
        </div>
      )}

      {activeView === 'fellowship' && (
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex items-center mb-8 border-b-4 border-[#D49A36] pb-4">
            <button onClick={() => setActiveView('default')} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-4xl font-bold text-black tracking-tight">{t('fellowship')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
             
             {/* 1. Candidate Login */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <GraduationCap size={56} className="text-[#D49A36] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Candidate Login</h3>
                <p className="text-sm text-gray-700 mb-4">Login for Fellowship Candidates</p>
                <button onClick={() => navigate('/login?role=STUDENT')} className="text-black font-bold border-b border-black hover:text-[#D49A36]">Candidate Login</button>
             </div>

             {/* 2. Institute Login */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition border-l-4 border-l-[#D49A36]">
                <Building2 size={56} className="text-[#D49A36] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Institute Login</h3>
                <p className="text-sm text-gray-700 mb-4">Login for Fellowship Institutes</p>
                <button onClick={() => navigate('/login?role=INSTITUTE')} className="text-black font-bold border-b border-black hover:text-[#D49A36]">Institute Login</button>
             </div>

             {/* 3. Ministry Login */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <Landmark size={56} className="text-[#D49A36] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ministry Login</h3>
                <p className="text-sm text-gray-700 mb-4">Login for Ministry Officials handling fellowships</p>
                <button onClick={() => navigate('/login?role=ADMIN')} className="text-black font-bold border-b border-black hover:text-[#D49A36]">Ministry Login</button>
             </div>

             {/* 4. Announcements */}
             <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition">
                <Megaphone size={56} className="text-[#D49A36] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Announcements</h3>
                <ul className="space-y-3 list-disc pl-4 text-sm text-[#2F6955] mb-4 leading-relaxed">
                  <li>One Time Registration(OTR) is required to avail the fellowship.</li>
                  <li>OTR is a unique number allotted to the candidate and is applicable for entire academic career.</li>
                  <li>OTR can be generated using the link: <a href="#" onClick={(e) => {e.preventDefault(); navigate('/register')}} className="text-blue-600 hover:underline break-all">https://scholarships.gov.in/otrapplication/#/login-page</a></li>
                </ul>
                <Link to="#" onClick={() => document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})} className="text-black font-bold border-b border-black hover:text-[#D49A36]">View more</Link>
             </div>

          </div>
        </div>
      )}

      

      {/* NSP Style FAQ & Help Desk Section */}
      <div id="faqs" className="w-full bg-white border-t border-gray-200 py-16 mt-8 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <HelpCircle className="text-[#1E5642]" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              <details className="group border-b border-gray-200 pb-4">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-700 hover:text-[#1E5642]">
                  <span>1. What is One Time Registration (OTR)?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronRight size={18} />
                  </span>
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed pl-2 border-l-2 border-[#1E5642]">
                  OTR is a unique 14-digit number issued based on the Aadhaar/Aadhaar Enrolment ID. It is applicable for the student's entire academic career on the portal.
                </p>
              </details>
              
              <details className="group border-b border-gray-200 pb-4">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-700 hover:text-[#1E5642]">
                  <span>2. How do I track my Scholarship Status?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronRight size={18} />
                  </span>
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed pl-2 border-l-2 border-[#1E5642]">
                  Click on the "Students" action card above and login using your OTR. You will see a real-time timeline showing exactly where your application is (INO, DNO, or PFMS).
                </p>
              </details>
              
              <details className="group border-b border-gray-200 pb-4">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-700 hover:text-[#1E5642]">
                  <span>3. Who do I contact if my application is stuck?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronRight size={18} />
                  </span>
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed pl-2 border-l-2 border-[#1E5642]">
                  You can register a grievance using the 'Public' action card. Your grievance will be automatically routed to the Grievance Redressal Officer (GRO) handling your state/district.
                </p>
              </details>
              
              <details className="group pb-2">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-700 hover:text-[#1E5642]">
                  <span>4. Is Aadhaar mandatory for MoTA Fellowship?</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronRight size={18} />
                  </span>
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed pl-2 border-l-2 border-[#1E5642]">
                  Yes. As per the DBT mandate, a valid Aadhaar linked to your active bank account is required for the seamless disbursal of funds via PFMS.
                </p>
              </details>
            </div>
          </div>
          
          {/* Help Desk Section */}
          <div id="helpdesk" className="bg-[#1E5642] rounded-lg shadow-sm border border-[#164332] p-8 text-gray-900 relative overflow-hidden scroll-mt-20">
             {/* Decorative Background Icon */}
             <Headset className="absolute -bottom-6 -right-6 text-gray-900 opacity-10 w-48 h-48" />
             
             <div className="flex items-center space-x-3 mb-6 relative z-10">
              <Headset size={32} className="text-[#D49A36]" />
              <h2 className="text-2xl font-bold text-gray-900">Central Help Desk</h2>
            </div>
            
            <p className="text-gray-200 text-sm mb-8 leading-relaxed relative z-10">
              For any technical queries or assistance with the MoTA Fellowship Portal, please contact our dedicated support team. Operational on all working days from 8:00 AM to 8:00 PM.
            </p>
            
            <div className="space-y-6 relative z-10">
               <div className="flex items-start space-x-4 bg-[#164332] p-4 rounded-md border border-[#113224]">
                 <div className="bg-[#D49A36] p-2 rounded-full">
                   <Megaphone size={20} className="text-gray-900" />
                 </div>
                 <div>
                   <h4 className="text-sm text-gray-300 font-semibold mb-1">Toll Free Helpline</h4>
                   <p className="text-xl font-bold tracking-wider">0120 - 6619540</p>
                 </div>
               </div>
               
               <div className="flex items-start space-x-4 bg-[#164332] p-4 rounded-md border border-[#113224]">
                 <div className="bg-[#D49A36] p-2 rounded-full">
                   <MessageCircle size={20} className="text-gray-900" />
                 </div>
                 <div>
                   <h4 className="text-sm text-gray-300 font-semibold mb-1">Email Support</h4>
                   <p className="text-lg font-bold">helpdesk@mota.gov.in</p>
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Floating Chatbot */}
      <NaaradChatbot />

    </div>
  );
};

export default Home;
