import React from 'react';
import { MessageSquare, Megaphone, HeadphonesIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const GoiHeader = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleScroll = (id) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
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
                <h1 className="text-[38px] font-bold text-[#4a4a4a] tracking-tighter flex items-center">
                  sci <span className="text-[11px] uppercase font-semibold tracking-wide text-[#666] ml-2 leading-tight text-left">national<br/>scholarcore<br/>portal</span>
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
           <div className="flex flex-col space-y-[4px] cursor-pointer hover:opacity-80 transition mt-[-10px]">
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
  );
};

export default GoiHeader;
