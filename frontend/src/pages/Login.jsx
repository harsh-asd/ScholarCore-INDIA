import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, UserCircle, Building2, ShieldCheck, AlertCircle, ArrowLeft, X } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlRole = searchParams.get('role');
  
  // Default to STUDENT, but override if urlRole exists
  const [role, setRole] = useState(urlRole || 'STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [securityPin, setSecurityPin] = useState('');
  const [generatedCaptcha] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const [error, setError] = useState('');

  // If a role was passed in the URL, we lock the UI to that role
  const isLocked = !!urlRole;

  useEffect(() => {
    if (urlRole && ['STUDENT', 'INSTITUTE', 'ADMIN'].includes(urlRole)) {
      setRole(urlRole);
    }
  }, [urlRole]);

  const handlePinVerify = () => {
    // Check if account is locked
    const lockoutTime = localStorage.getItem('_sch_lockout_time');
    if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
      setError('SECURITY ALERT: Account locked for 24 hours due to 3 failed attempts.');
      setSecurityPin('');
      return;
    }

    const savedPin = localStorage.getItem('_sch_pin') ? atob(localStorage.getItem('_sch_pin')) : '123';
    if (securityPin === savedPin) {
      // Success: Reset attempts
      localStorage.removeItem('_sch_attempts');
      setShowPinModal(false);
      setIsRouting(true);
      setTimeout(() => {
        setIsRouting(false);
        navigate('/applicant');
      }, 1800);
    } else {
      // Failure: Track attempts
      let attempts = parseInt(localStorage.getItem('_sch_attempts') || '0') + 1;
      localStorage.setItem('_sch_attempts', attempts);
      
      if (attempts >= 3) {
        localStorage.setItem('_sch_lockout_time', Date.now() + (24 * 60 * 60 * 1000)); // Lock for 24h
        setError('SECURITY ALERT: Account locked for 24 hours due to 3 failed attempts.');
      } else {
        setError(`Invalid Security PIN. Access Denied. (${3 - attempts} attempts remaining)`);
      }
      setSecurityPin('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Check if account is locked globally
    const lockoutTime = localStorage.getItem('_sch_lockout_time');
    if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
      setError('SECURITY ALERT: Account locked for 24 hours due to 3 failed attempts.');
      return;
    }

    if (captcha.toUpperCase() !== generatedCaptcha) {
      setError('Invalid Captcha! Please enter the exact characters shown in the image.');
      return;
    }

    if (role === 'ADMIN') {
      if (email.includes('ministry')) {
        localStorage.setItem('_sch_role', btoa('MINISTRY'));
        setIsRouting(true); setTimeout(() => navigate('/admin'), 1500);
      } else if (email.includes('officer') || email.includes('admin')) {
        localStorage.setItem('_sch_role', btoa('OFFICER'));
        setIsRouting(true); setTimeout(() => navigate('/admin'), 1500);
      } else {
        setError('Invalid credentials. Use ministry@mota.gov.in or officer@mota.gov.in');
      }
      return;
    } 
    
    if (role === 'INSTITUTE') {
      if (email.includes('ino') || email.includes('institute')) {
        localStorage.setItem('_sch_role', btoa('INSTITUTE'));
        setIsRouting(true); setTimeout(() => navigate('/institute'), 1500);
      } else {
        setError('Invalid Institute credentials. Use ino@institute.edu');
      }
      return;
    }

    // STUDENT EMAIL RESTRICTION
    if (role === 'STUDENT' && !email.toLowerCase().endsWith('@gmail.com')) {
      setError('Error: Student login is restricted to @gmail.com addresses only.');
      return;
    }

    // REAL STUDENT AUTHENTICATION via BACKEND
    try {
      const response = await fetch('https://scholarcore-india.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        let attempts = parseInt(localStorage.getItem('_sch_attempts') || '0') + 1;
        localStorage.setItem('_sch_attempts', attempts);
        if (attempts >= 3) {
          localStorage.setItem('_sch_lockout_time', Date.now() + (24 * 60 * 60 * 1000));
          setError('SECURITY ALERT: Account locked for 24 hours due to 3 failed attempts.');
        } else {
          setError(`${data.detail || 'Invalid login.'} (${3 - attempts} attempts remaining)`);
        }
        return;
      }
      
      // Success
      localStorage.setItem('_sch_role', btoa('STUDENT'));
      localStorage.setItem('_sch_name', btoa(data.name));
      setShowPinModal(true); // Trigger Step 2 Verification
    } catch (err) {
      setError('Could not connect to the database. Please try again.');
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
       
       {/* Back Button */}
       <button onClick={() => navigate('/')} className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-[#1E5642] font-semibold transition bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
         <ArrowLeft size={18} className="mr-2" /> Back to Portal
       </button>

       <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
         
         {/* Header */}
         <div className="bg-[#1E5642] px-6 py-6 text-center relative">
           <div className="absolute inset-0 bg-black opacity-10"></div>
           <div className="relative z-10 flex justify-center mb-3">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-[#164332]">
               {role === 'STUDENT' && <UserCircle size={32} className="text-[#1E5642]" />}
               {role === 'INSTITUTE' && <Building2 size={32} className="text-[#1E5642]" />}
               {role === 'ADMIN' && <ShieldCheck size={32} className="text-[#1E5642]" />}
             </div>
           </div>
           <h2 className="relative z-10 text-2xl font-extrabold text-white tracking-tight">
             {role === 'STUDENT' && 'Candidate Login'}
             {role === 'INSTITUTE' && 'Institute Nodal Officer'}
             {role === 'ADMIN' && 'Ministry / Officer Portal'}
           </h2>
           <p className="relative z-10 text-sm text-green-100 mt-1">Authenticate to access ScholarCore India</p>
         </div>
         
         <div className="p-8">
           
           {/* Only show role tabs if NOT locked by URL */}
           {!isLocked && (
             <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
               <button type="button" onClick={() => setRole('STUDENT')} className={`flex-1 text-xs font-bold py-2 rounded-md transition ${role === 'STUDENT' ? 'bg-white shadow text-[#1E5642]' : 'text-gray-500 hover:text-gray-700'}`}>
                 STUDENT
               </button>
               <button type="button" onClick={() => setRole('INSTITUTE')} className={`flex-1 text-xs font-bold py-2 rounded-md transition ${role === 'INSTITUTE' ? 'bg-white shadow text-[#1E5642]' : 'text-gray-500 hover:text-gray-700'}`}>
                 INSTITUTE
               </button>
               <button type="button" onClick={() => setRole('ADMIN')} className={`flex-1 text-xs font-bold py-2 rounded-md transition ${role === 'ADMIN' ? 'bg-white shadow text-[#1E5642]' : 'text-gray-500 hover:text-gray-700'}`}>
                 OFFICER / MINISTRY
               </button>
             </div>
           )}

           {isLocked && (
             <div className="mb-6 flex items-center justify-center space-x-2 bg-green-50 text-green-800 p-2 rounded-md text-xs font-bold border border-green-200">
               <Lock size={14} />
               <span>Secured {role} Gateway</span>
             </div>
           )}

           {error && (
             <div className="mb-6 flex items-start space-x-2 bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-100">
               <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
               <p>{error}</p>
             </div>
           )}

           <form onSubmit={handleLogin} className="space-y-6">
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                 {role === 'STUDENT' ? 'OTR / Email Address' : 'Official Email ID'}
               </label>
               <input 
                 required 
                 type="text" 
                 value={email} 
                 onChange={e=>setEmail(e.target.value)} 
                 placeholder={role === 'STUDENT' ? 'student@gmail.com' : role === 'INSTITUTE' ? 'ino@institute.edu' : 'officer@mota.gov.in'}
                 className="w-full bg-gray-50 border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-[#1E5642] focus:border-[#1E5642] outline-none transition" 
               />
             </div>
             <div>
               <div className="flex justify-between items-center mb-1.5">
                 <label className="block text-sm font-semibold text-gray-700">Password</label>
                 <a href="#" onClick={(e) => { e.preventDefault(); alert("A password recovery link has been sent to your registered Email/Mobile via Aadhaar e-KYC."); }} className="text-xs text-blue-600 hover:underline font-medium">Recover OTR / Password</a>
               </div>
               <input 
                 required 
                 type="password" 
                 value={password} 
                 onChange={e=>setPassword(e.target.value)} 
                 placeholder="••••••••"
                 className="w-full bg-gray-50 border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-[#1E5642] focus:border-[#1E5642] outline-none transition" 
               />
             </div>

               {/* CAPTCHA BLOCK */}
               <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Security Captcha</label>
                 <div className="flex items-center space-x-4 mb-3">
                   <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-300 w-32 h-10 flex items-center justify-center rounded overflow-hidden select-none relative">
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                     <span className="text-xl font-bold font-mono tracking-[0.2em] text-gray-800 italic transform -skew-x-12 relative z-10">{generatedCaptcha}</span>
                   </div>
                   <button type="button" onClick={() => alert("Captcha Refreshed!")} className="text-gray-500 hover:text-[#1E5642] transition p-1 bg-white border border-gray-300 rounded shadow-sm" title="Refresh Captcha">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                   </button>
                 </div>
                 <input 
                   required 
                   type="text" 
                   value={captcha} 
                   onChange={e=>setCaptcha(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())} 
                   placeholder="Enter captcha text"
                   className="w-full bg-white border-gray-300 rounded p-2.5 text-sm border focus:ring-2 focus:ring-[#1E5642] focus:border-[#1E5642] outline-none transition uppercase font-mono tracking-widest" 
                 />
               </div>


             <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-[#1E5642] border-gray-300 rounded focus:ring-[#1E5642]" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me securely</label>
             </div>

             <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1E5642] hover:bg-[#164332] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E5642] transition">
               <Lock size={16} className="mr-2 opacity-80" /> Secure Login
             </button>
           </form>
           
           {/* Demo Credentials Box */}
           <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
             <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">Hackathon Demo Credentials</h4>
             <ul className="text-xs text-blue-700 space-y-1 font-medium">
               {role === 'STUDENT' && <li><span className="font-bold">Student:</span> student@gmail.com (pwd: any)</li>}
               {role === 'INSTITUTE' && <li><span className="font-bold">Institute:</span> ino@institute.edu (pwd: any)</li>}
                              {role === 'ADMIN' && (
                 <>
                   <li><span className="font-bold">Ministry Executive:</span> ministry@mota.gov.in <span className="opacity-75">(pwd: any)</span></li>
                   <li><span className="font-bold">Nodal Officer:</span> officer@mota.gov.in <span className="opacity-75">(pwd: any)</span></li>
                 </>
               )}
             </ul>
           </div>

         </div>
       </div>

      {/* GLOBAL ASHOKA EMBLEM LOADER */}
      {isRouting && (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center transition-opacity">
          <div className="relative flex justify-center items-center w-36 h-36">
             <div className="absolute inset-0 border-[6px] border-gray-100 border-t-[#C85237] border-b-[#1E5642] rounded-full animate-spin"></div>
             <img src="/ashoka_emblem.png" alt="Loading..." className="h-20 w-auto relative z-10 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
