import React, { useState } from 'react';
import { MessageSquare, Megaphone, HeadphonesIcon, X, GraduationCap, Building2, User, Users, Play, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const GoiHeader = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  const handleScroll = (id) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    setIsRouting(true);
    setTimeout(() => {
      setIsRouting(false);
      navigate(path);
    }, 1500); // Show Ashoka loader for 1.5s
  };

  const handleExternalLink = (serviceName) => {
    setIsMenuOpen(false);
    alert(`Redirecting to secure gateway for:\n${serviceName}\n\n(Note: This external integration is simulated for the hackathon demo)`);
  };

  return (
    <>
      <div className="bg-white w-full border-b border-gray-200 shadow-sm relative pt-4 pb-2">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center relative z-10">
          
          {/* LEFT: Logos and Academic Year */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition">
              <img src="/ashoka_emblem.png" alt="Ashoka Emblem" className="h-[60px] w-auto object-contain" />
              <div className="flex items-center border-l border-gray-100 pl-3">
                <div className="bg-[#C85237] p-1.5 rounded-sm mr-2 shadow-sm">
                  <div className="w-7 h-7 border-[2.5px] border-white rounded-b-md flex items-end justify-center">
                     <div className="w-4 h-1.5 bg-white mb-1 rounded-sm"></div>
                  </div>
                </div>
                <div className="leading-none">
                  <h1 className="text-[32px] font-bold text-[#4a4a4a] tracking-tighter flex items-center">
                      <img src="/scholarcore_logo.jpg" alt="ScholarCore Logo" className="h-16 w-16 rounded-full object-cover border-2 border-[#D49A36] shadow-sm mr-3" />
                      <span className="text-[11px] uppercase font-semibold tracking-wide text-[#666] leading-tight text-left">national<br/>scholarcore<br/>portal</span>
                    </h1>
                </div>
              </div>
            </Link>
            <div className="mt-1 ml-1">
               <p className="text-[14px] font-extrabold text-[#003366] tracking-wide">Academic Year 2026-27</p>
            </div>
          </div>

          {/* CENTER: Colored Lines (NSP Hamburger Motif) */}
          <div className="flex-1 flex justify-center md:justify-start md:ml-16">
             <div onClick={() => setIsMenuOpen(true)} className="flex flex-col space-y-[4px] cursor-pointer hover:opacity-70 transition p-2 mt-[-10px]">
               <div className="w-8 h-[2.5px] bg-[#f06d86]"></div>
               <div className="w-8 h-[2.5px] bg-[#b46bc8]"></div>
               <div className="w-8 h-[2.5px] bg-[#756cd5]"></div>
               <div className="w-8 h-[2.5px] bg-[#29b6d8]"></div>
             </div>
          </div>

          {/* RIGHT: Top Links */}
          <div className="flex items-center space-x-10 mt-[-10px]">
            <button onClick={() => handleScroll('faqs')} className="flex items-center space-x-2 text-[15px] font-bold text-gray-900 hover:text-blue-600 focus:outline-none">
              <span>FAQs</span>
              <MessageSquare size={18} strokeWidth={2} />
            </button>
            <button onClick={() => handleScroll('announcements')} className="flex items-center space-x-2 text-[15px] font-bold text-gray-900 hover:text-blue-600 focus:outline-none">
              <span>Announcements</span>
              <Megaphone size={18} strokeWidth={2} />
            </button>
            <button onClick={() => handleScroll('helpdesk')} className="flex items-center space-x-2 text-[15px] font-bold text-gray-900 hover:text-blue-600 focus:outline-none">
              <span>Helpdesk</span>
              <HeadphonesIcon size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* OFF-CANVAS SIDE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-transparent" onClick={() => setIsMenuOpen(false)}></div>
          
          {/* Drawer */}
          <div className="relative w-80 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-right overflow-y-auto custom-scrollbar">
            
            {/* Close Button Header */}
            <div className="flex justify-end p-4 border-b border-gray-100">
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-red-500 bg-gray-50 p-2 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            {/* Content List */}
            <div className="py-2 flex-1">
              
              {/* STUDENTS */}
              <div className="px-6 py-4">
                <div className="flex items-center text-[#f06d86] font-bold text-lg mb-4">
                  <GraduationCap size={24} className="mr-3" /> Students
                </div>
                <ul className="space-y-4 text-[15px] text-gray-600 pl-9">
                  <li onClick={() => handleNavigation('/register')} className="cursor-pointer hover:text-blue-600">Apply For One Time Registration (OTR)</li>
                  <li onClick={() => handleNavigation('/login?role=STUDENT')} className="cursor-pointer hover:text-blue-600">Apply For Scholarship</li>
                  <li onClick={() => handleExternalLink('Schemes Repository')} className="cursor-pointer hover:text-blue-600">Schemes on ScholarCore</li>
                  <li onClick={() => handleExternalLink('Eligibility Calculator')} className="cursor-pointer hover:text-blue-600">Scholarship Eligibility</li>
                  <li onClick={() => handleExternalLink('Application Status Tracker')} className="cursor-pointer hover:text-blue-600">Application Status</li>
                  <li onClick={() => handleExternalLink('PFMS Payment Gateway')} className="cursor-pointer hover:text-blue-600">Track Your Payment</li>
                  <li onClick={() => handleExternalLink('UIDAI Seva Kendra Locator')} className="cursor-pointer hover:text-blue-600">Aadhaar Seva Kendra</li>
                  <li onClick={() => handleExternalLink('NPCI Aadhaar Seeding Mapper')} className="cursor-pointer hover:text-blue-600">Check Aadhaar Seeding Status</li>
                  <li onClick={() => handleExternalLink('Google Play Store')} className="cursor-pointer hover:opacity-80 mt-2">
                    <div className="flex items-center text-[#f06d86] font-bold text-sm mb-1">ScholarCore OTR APP</div>
                    <div className="bg-black text-white text-xs flex items-center w-max px-3 py-1.5 rounded">
                      <Play size={14} className="mr-2 text-green-400 fill-current" /> 
                      <div><div className="text-[8px] uppercase">Get it on</div><div className="font-bold text-sm">Google Play</div></div>
                    </div>
                  </li>
                  <li onClick={() => handleExternalLink('Swavlamban UDID Portal')} className="cursor-pointer hover:text-blue-600 mt-2">Check UDID details</li>
                  <li onClick={() => handleExternalLink('DBT Seeding Guidelines PDF')} className="cursor-pointer hover:text-blue-600">How to seed Aadhaar with the Bank Account</li>
                </ul>
              </div>

              <div className="border-t border-gray-100 my-2 mx-4"></div>

              {/* INSTITUTES */}
              <div className="px-6 py-4">
                <div className="flex items-center text-[#b46bc8] font-bold text-lg mb-4">
                  <Building2 size={22} className="mr-3" /> Institutes
                </div>
                <ul className="space-y-4 text-[15px] text-gray-600 pl-9">
                  <li onClick={() => handleExternalLink('Institute Registration Manual PDF')} className="cursor-pointer hover:text-blue-600">How to fill Registration Form</li>
                  <li onClick={() => handleNavigation('/register')} className="cursor-pointer hover:text-blue-600">Registration Form</li>
                  <li onClick={() => handleNavigation('/login?role=INSTITUTE')} className="cursor-pointer hover:text-blue-600">Login</li>
                  <li onClick={() => handleExternalLink('AISHE Database Search')} className="cursor-pointer hover:text-blue-600">Know your AISHE Code</li>
                  <li onClick={() => handleExternalLink('AISHE Code Generation')} className="cursor-pointer hover:text-blue-600">Get AISHE code</li>
                  <li onClick={() => handleExternalLink('UDISE+ Verification Portal')} className="cursor-pointer hover:text-blue-600">UDISE+ website details</li>
                </ul>
              </div>

              <div className="border-t border-gray-100 my-2 mx-4"></div>

              {/* OFFICERS */}
              <div className="px-6 py-4">
                <div className="flex items-center text-[#756cd5] font-bold text-lg mb-4">
                  <User size={22} className="mr-3" /> Officers
                </div>
                <ul className="space-y-4 text-[15px] text-gray-600 pl-9">
                  <li onClick={() => handleNavigation('/login?role=ADMIN')} className="cursor-pointer hover:text-blue-600">Login</li>
                  <li onClick={() => handleExternalLink('Nodal Officer Global Directory')} className="cursor-pointer hover:text-blue-600">Nodal Officers (Scheme-wise)</li>
                  <li onClick={() => handleExternalLink('GRO Directory & Escalation Matrix')} className="cursor-pointer hover:text-blue-600">Grievance Redressal Officers (GROs)</li>
                </ul>
              </div>

              <div className="border-t border-gray-100 my-2 mx-4"></div>

              {/* PUBLIC */}
              <div className="px-6 py-4">
                <div className="flex items-center text-[#29b6d8] font-bold text-lg mb-4">
                  <Users size={22} className="mr-3" /> Public
                </div>
                <ul className="space-y-4 text-[15px] text-gray-600 pl-9">
                  <li onClick={() => handleNavigation('/')} className="cursor-pointer hover:text-blue-600">Dashboard</li>
                  <li onClick={() => handleExternalLink('Public Institute Directory')} className="cursor-pointer hover:text-blue-600">Find Institutes on ScholarCore</li>
                  <li onClick={() => handleExternalLink('Public Transparency Ledger')} className="cursor-pointer hover:text-blue-600">List of Applicants Processed for Scholarships</li>
                  <li onClick={() => handleExternalLink('Public Nodal Officer Directory')} className="cursor-pointer hover:text-blue-600">Nodal Officers (Scheme-wise)</li>
                  <li onClick={() => handleExternalLink('District Officer Directory')} className="cursor-pointer hover:text-blue-600">Nodal Officers (District-wise)</li>
                  <li onClick={() => { setIsMenuOpen(false); handleScroll('helpdesk'); }} className="cursor-pointer hover:text-blue-600">ScholarCore Helpdesk</li>
                  <li onClick={() => handleExternalLink('PFMS Ticketing System')} className="cursor-pointer hover:text-blue-600">PFMS Helpdesk</li>
                  <li onClick={() => handleExternalLink('CPGRAMS Grievance Portal')} className="cursor-pointer hover:text-blue-600">Grievance Registration</li>
                  <li onClick={() => handleExternalLink('Common Service Centre (CSC) Gateway')} className="cursor-pointer hover:text-blue-600">CSC Login</li>
                </ul>
              </div>

            </div>

            {/* Footer Links */}
            <div className="bg-[#eeeeee] p-6 mt-4">
              <ul className="space-y-4 text-[15px] text-gray-700">
                <li onClick={() => { setIsMenuOpen(false); handleScroll('faqs'); }} className="cursor-pointer hover:text-blue-600">About ScholarCore</li>
                <li onClick={() => { setIsMenuOpen(false); handleScroll('helpdesk'); }} className="cursor-pointer hover:text-blue-600">Contact us</li>
                <li onClick={() => handleNavigation('/')} className="cursor-pointer hover:text-blue-600">Site map</li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* GLOBAL ASHOKA EMBLEM LOADER */}
      {isRouting && (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center transition-opacity">
          <div className="relative flex justify-center items-center w-36 h-36">
             <div className="absolute inset-0 border-[6px] border-gray-100 border-t-[#C85237] border-b-[#1E5642] rounded-full animate-spin"></div>
             <img src="/ashoka_emblem.png" alt="Loading..." className="h-20 w-auto relative z-10 animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
};

export default GoiHeader;
