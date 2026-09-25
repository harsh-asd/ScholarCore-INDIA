import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useAccessibility } from '../AccessibilityContext';
import { Accessibility, Sun, Moon, Droplet, Type, Link as LinkIcon, ImageOff, MousePointer2, X } from 'lucide-react';

const TopBar = () => {
  const { lang, setLang, t } = useLanguage();
  const a11y = useAccessibility();
  
  const [showLang, setShowLang] = useState(false);
  const [showA11y, setShowA11y] = useState(false);
  
  const menuRef = useRef(null);
  const a11yRef = useRef(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLang(false);
      }
      if (a11yRef.current && !a11yRef.current.contains(event.target)) {
        setShowA11y(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#f0f0f0] text-gray-700 text-xs py-1 px-4 flex justify-between items-center w-full border-b border-gray-300 relative z-50">
      <div className="flex items-center space-x-6">
        <span className="hover:text-blue-600 cursor-pointer">{t('gov')}</span>
        <span className="hover:text-blue-600 cursor-pointer">{t('ministry')}</span>
        <div className="flex items-center space-x-1 font-bold text-gray-800 italic">
          <span className="text-orange-500">Digital</span> 
          <span className="text-green-600">India</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        
        {/* GIGW Font Resizers */}
        <div className="hidden sm:flex items-center space-x-1 border-r border-gray-300 pr-3 font-serif">
          <button onClick={() => a11y.setTextSize(90)} className="px-1.5 py-0.5 hover:bg-gray-200 hover:text-blue-700 transition" title="Decrease Font Size (A-)">A-</button>
          <button onClick={() => a11y.setTextSize(100)} className="px-1.5 py-0.5 hover:bg-gray-200 hover:text-blue-700 transition" title="Default Font Size (A)">A</button>
          <button onClick={() => a11y.setTextSize(110)} className="px-1.5 py-0.5 hover:bg-gray-200 hover:text-blue-700 transition font-bold" title="Increase Font Size (A+)">A+</button>
        </div>
        
        {/* Custom NSP Language Dropdown */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => { setShowLang(!showLang); setShowA11y(false); }} 
            className="flex items-center hover:text-blue-600 px-1 font-bold focus:outline-none" 
            title="Select Language"
          >
            <span className="text-sm font-semibold">अ</span>
            <span className="text-[10px] ml-0.5 mt-1 text-blue-700 font-bold">A</span>
          </button>

          {showLang && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg overflow-hidden py-1">
              <button onClick={() => {setLang('en'); setShowLang(false);}} className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${lang === 'en' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>English</button>
              <button onClick={() => {setLang('hi'); setShowLang(false);}} className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${lang === 'hi' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>हिंदी</button>
              <button onClick={() => {setLang('te'); setShowLang(false);}} className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${lang === 'te' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>తెలుగు</button>
            </div>
          )}
        </div>
        
        {/* Accessibility Button & Menu */}
        <div className="relative" ref={a11yRef}>
          <button 
            onClick={() => { setShowA11y(!showA11y); setShowLang(false); }}
            className="w-6 h-6 flex items-center justify-center hover:text-blue-600 transition"
            title="Accessibility Controls"
          >
            <Accessibility size={20} strokeWidth={2.5} />
          </button>

          {showA11y && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-2xl rounded-sm overflow-hidden z-50 text-gray-800 font-sans">
              
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Accessibility size={20} />
                  <h3 className="font-bold text-base">Accessibility Controls</h3>
                </div>
                <button onClick={() => setShowA11y(false)} className="text-gray-500 hover:text-black">
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 grid grid-cols-2 gap-3">
                <button onClick={() => a11y.setDarkContrast(!a11y.darkContrast)} className={`flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 ${a11y.darkContrast ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-purple-800 text-purple-900'}`}>
                  <Sun size={28} className="mb-2" />
                  <span className="text-[11px] font-bold">Dark Contrast</span>
                </button>

                <button onClick={() => a11y.setInvert(!a11y.invert)} className={`flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 ${a11y.invert ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-purple-800 text-purple-900'}`}>
                  <Moon size={28} className="mb-2" />
                  <span className="text-[11px] font-bold">Invert</span>
                </button>

                <button onClick={() => a11y.setSaturation(!a11y.saturation)} className={`flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 ${a11y.saturation ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-purple-800 text-purple-900'}`}>
                  <Droplet size={28} className="mb-2" />
                  <span className="text-[11px] font-bold">Saturation</span>
                </button>

                <button onClick={() => a11y.setTextSize(Math.min(a11y.textSize + 10, 150))} className="flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 border-purple-800 text-purple-900">
                  <span className="text-2xl font-bold font-serif mb-1 leading-none tracking-tighter">A+</span>
                  <span className="text-[11px] font-bold">Text Size Increase</span>
                </button>

                <button onClick={() => a11y.setTextSize(Math.max(a11y.textSize - 10, 70))} className="flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 border-purple-800 text-purple-900">
                  <span className="text-2xl font-bold font-serif mb-1 leading-none tracking-tighter">A-</span>
                  <span className="text-[11px] font-bold">Text Size Decrease</span>
                </button>

                <button onClick={() => a11y.setHighlightLinks(!a11y.highlightLinks)} className={`flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 ${a11y.highlightLinks ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-purple-800 text-purple-900'}`}>
                  <LinkIcon size={28} className="mb-2" />
                  <span className="text-[11px] font-bold">Highlight Links</span>
                </button>

                <button onClick={() => a11y.setHideImages(!a11y.hideImages)} className={`flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 ${a11y.hideImages ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-purple-800 text-purple-900'}`}>
                  <ImageOff size={28} className="mb-2" />
                  <span className="text-[11px] font-bold">Hide Images</span>
                </button>

                <button onClick={() => a11y.resetAll()} className="flex flex-col items-center justify-center border rounded-md py-3 transition hover:bg-blue-50 border-purple-800 text-purple-900">
                  <MousePointer2 size={28} className="mb-2" />
                  <span className="text-[11px] font-bold">Default Cursor</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
