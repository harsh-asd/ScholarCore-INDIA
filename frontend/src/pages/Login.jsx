import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        navigate('/application');
      } else {
        // Fallback for hackathon demo
        navigate('/application');
      }
    } catch {
      navigate('/application');
    }
  };

  return (
    <div className="max-w-sm mx-auto py-24 px-6">
       <div className="bg-white shadow-xl rounded-lg p-8 border-t-4 border-[#112233]">
         <div className="flex justify-center mb-6">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
             <Lock size={32} className="text-gray-600" />
           </div>
         </div>
         <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Applicant Login</h2>
         
         <form onSubmit={handleLogin} className="space-y-5">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Application ID / Email</label>
             <input required type="text" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border-gray-300 rounded p-2.5 border focus:ring-blue-500 focus:border-blue-500" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
             <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border-gray-300 rounded p-2.5 border focus:ring-blue-500 focus:border-blue-500" />
           </div>
           <button type="submit" className="w-full bg-[#1E5642] text-white font-bold py-3 rounded shadow hover:bg-opacity-90 transition mt-4">
             Login
           </button>
         </form>

         <div className="relative mt-8 mb-6">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-300"></div>
           </div>
           <div className="relative flex justify-center text-sm">
             <span className="px-2 bg-white text-gray-500">Or authenticate with</span>
           </div>
         </div>

         <button 
           onClick={() => {
             alert('Simulating redirect to DigiLocker / MeriPehchaan India Stack Auth...');
             navigate('/applicant');
           }}
           className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-[#187884] text-[#187884] font-bold py-2.5 rounded shadow-sm hover:bg-[#187884] hover:text-white transition group"
         >
           <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/DigiLocker_logo.svg" alt="DigiLocker" className="h-6 opacity-80 group-hover:opacity-100 transition-opacity bg-white p-0.5 rounded" />
           <span>MeriPehchaan (DigiLocker)</span>
         </button>

         <div className="mt-6 text-center">
           <button onClick={() => navigate('/register')} className="text-sm text-blue-600 hover:underline font-semibold">New Student Registration</button>
         </div>
       </div>
    </div>
  );
};

export default Login;
