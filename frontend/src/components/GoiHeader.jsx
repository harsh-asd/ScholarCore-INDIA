import React from 'react';
import { MessageSquare, Bell, HeadphonesIcon, Menu } from 'lucide-react';
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
    <div className="bg-white w-full border-b border-gray-100 shadow-sm relative">
      <div className="absolute inset-0 bg-textile-pattern opacity-10 pointer-events-none"></div>
      <div className="flex justify-between items-center py-3 px-6 max-w-[1400px] mx-auto relative z-10">
        
        {/* Left: Logos */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src="/ashoka_emblem.png" alt="Ashoka Emblem" className="h-[52px] w-auto object-contain mr-2" />
            <div className="flex items-center">
              <div className="bg-[#C85237] p-1.5 rounded-sm mr-2 shadow-sm">
                <div className="w-6 h-6 border-2 border-white rounded-b-md flex items-end justify-center">
                   <div className="w-4 h-1 bg-white mb-1 rounded-sm"></div>
                </div>
              </div>
              <div className="leading-tight">
                <h1 className="text-3xl font-bold text-gray-700 tracking-tighter flex items-center">
                  sci <span className="text-[10px] uppercase font-normal tracking-normal text-gray-500 ml-1 leading-none">scholarcore<br/>india<br/>portal</span>
                </h1>
              </div>
            </div>
          </div>
          
          <div className="ml-8 border-l border-gray-300 pl-4">
             <p className="text-xs font-bold text-gray-800">{t('academic_year')}</p>
          </div>
        </div>

        {/* Center: Hamburger */}
        <div className="flex-1 flex justify-center">
           <div className="flex flex-col space-y-1 cursor-pointer hover:opacity-80 transition">
             <div className="w-8 h-1 bg-[#C85237]"></div>
             <div className="w-8 h-1 bg-[#1E5642]"></div>
             <div className="w-8 h-1 bg-[#D49A36]"></div>
           </div>
        </div>

        {/* Right: Links */}
        <div className="flex items-center space-x-8">
          <button onClick={() => handleScroll('faqs')} className="flex items-center space-x-2 text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            <span>{t('faqs')}</span>
            <MessageSquare size={16} className="text-gray-600" />
          </button>
          <button onClick={() => handleScroll('announcements')} className="flex items-center space-x-2 text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            <span>{t('announcements')}</span>
            <Bell size={16} className="text-gray-600" />
          </button>
          <button onClick={() => handleScroll('helpdesk')} className="flex items-center space-x-2 text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            <span>{t('helpdesk')}</span>
            <HeadphonesIcon size={16} className="text-gray-600" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default GoiHeader;
