import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, UserCircle, Building2, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlRole = searchParams.get('role');
  
  // Default to STUDENT, but override if urlRole exists
  const [role, setRole] = useState(urlRole || 'STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If a role was passed in the URL, we lock the UI to that role
  const isLocked = !!urlRole;

  useEffect(() => {
    if (urlRole && ['STUDENT', 'INSTITUTE', 'ADMIN'].includes(urlRole)) {
      setRole(urlRole);
    }
  }, [urlRole]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Simulate Network Request
    setTimeout(() => {
      if (role === 'ADMIN') {
        if (email.includes('ministry')) {
          localStorage.setItem('userRole', 'MINISTRY');
          navigate('/admin');
        } else if (email.includes('officer') || email.includes('admin')) {
          localStorage.setItem('userRole', 'OFFICER');
          navigate('/admin');
        } else {
          setError('Invalid credentials. Use ministry@mota.gov.in or officer@mota.gov.in');
        }
      } else if (role === 'INSTITUTE') {
        if (email.includes('ino') || email.includes('institute')) {
          localStorage.setItem('userRole', 'INSTITUTE');
          navigate('/institute');
        } else {
          setError('Invalid Institute credentials. Use ino@institute.edu');
        }
      } else {
        localStorage.setItem('userRole', 'STUDENT');
        navigate('/applicant');
      }
    }, 600);
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
                 <a href="#" className="text-xs text-blue-600 hover:underline font-medium">Forgot Password?</a>
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
    </div>
  );
};

export default Login;
