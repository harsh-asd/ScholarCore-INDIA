import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle, CheckSquare, ChevronRight, Smartphone, X, CheckCircle2 } from 'lucide-react';

const Registration = () => {
  const navigate = useNavigate();
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [agreed3, setAgreed3] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityPin, setSecurityPin] = useState('');

  // OTP State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [generatedOtr, setGeneratedOtr] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isDigilockerVerified, setIsDigilockerVerified] = useState(false);

  const handleDigilockerAuth = () => {
    setShowOtpModal(true);
    setOtp('');
    setOtpError('');
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      setIsDigilockerVerified(true);
      setShowOtpModal(false);
      // Auto-fill form to simulate DigiLocker payload
      setName('Aditi Sharma');
      setEmail('aditi.sharma@example.com');
      alert('DigiLocker KYC successful! Demographic details auto-filled.');
    } else {
      setOtpError('Invalid OTP. For hackathon demo, use 123456');
    }
  };

  const handleAgreementSubmit = (e) => {
    e.preventDefault();
    if (agreed1 && agreed2 && agreed3) {
      setShowForm(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (securityPin.length !== 3) {
      alert('Error: Security PIN must be exactly 3 digits.');
      return;
    }
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      alert('Error: Student registration is restricted to @gmail.com addresses only.');
      return;
    }
    try {
      const response = await fetch('https://scholarcore-india.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.detail || 'Registration failed');
        return;
      }
      
      // GENERATE UNIQUE OTR ID
      const otrId = `OTR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem('_sch_name', btoa(name));
      localStorage.setItem('_sch_email', btoa(email));
      localStorage.setItem('_sch_otr', btoa(otrId));
      localStorage.setItem('_sch_pin', btoa(securityPin));
      
      // SHOW SUCCESS MESSAGE WITH OTR
      alert(`Registration Successful!\n\nYour Unique OTR ID is: ${otrId}\n\nPlease keep this ID safe for all future scholarship applications.`);
      
      navigate('/login?role=STUDENT');
    } catch {
      alert('Could not connect to the server.');
    }
  };

  if (!showForm) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg border-t-4 border-[var(--color-mota-terracotta)] p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Guidelines for Registration</h2>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mr-3 mt-0.5" size={20} />
              <p className="text-sm text-yellow-800">
                Please read the guidelines carefully before starting the registration process. Ensure you have your Aadhaar Card, Income Certificate, and Bank Passbook ready.
              </p>
            </div>
          </div>

          <form onSubmit={handleAgreementSubmit} className="space-y-4 mb-8">
            <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
              <input type="checkbox" required checked={agreed1} onChange={e=>setAgreed1(e.target.checked)} className="mt-1 w-5 h-5 text-[var(--color-mota-terracotta)] rounded" />
              <span className="text-sm text-gray-700">I have read and understood the guidelines for registration.</span>
            </label>
            <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
              <input type="checkbox" required checked={agreed2} onChange={e=>setAgreed2(e.target.checked)} className="mt-1 w-5 h-5 text-[var(--color-mota-terracotta)] rounded" />
              <span className="text-sm text-gray-700">I am aware that if more than one application is found to be submitted by me, all my applications are liable to be rejected.</span>
            </label>
            <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
              <input type="checkbox" required checked={agreed3} onChange={e=>setAgreed3(e.target.checked)} className="mt-1 w-5 h-5 text-[var(--color-mota-terracotta)] rounded" />
              <span className="text-sm text-gray-700">I consent to use my Aadhaar details for demographic authentication.</span>
            </label>

            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={!(agreed1 && agreed2 && agreed3)} className="bg-[var(--color-mota-forest)] text-white px-6 py-2 rounded font-bold shadow disabled:opacity-50 flex items-center">
                Continue <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6">
       <div className="bg-white shadow-xl rounded-lg p-8 border-t-4 border-[var(--color-mota-forest)]">
         <div className="flex flex-col items-center mb-6">
           <img src="/digilocker.png" alt="DigiLocker Logo" className="h-20 w-auto object-contain mb-4" />
           <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">OTR Generation</h2>
           <p className="text-sm text-gray-500 text-center mb-6">Authenticate via DigiLocker for instant KYC</p>
           
                      {!isDigilockerVerified ? (
             <button type="button" onClick={handleDigilockerAuth} className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition mb-6">
               <ShieldCheck size={20} className="mr-2" /> Authenticate with DigiLocker
             </button>
           ) : (
             <div className="w-full flex items-center justify-center bg-green-50 border border-green-200 text-green-700 font-bold py-3 px-4 rounded-lg shadow-sm mb-6">
               <CheckCircle2 size={20} className="mr-2" /> DigiLocker KYC Verified
             </div>
           )}
           
           <div className="relative flex py-2 items-center w-full mb-4">
             <div className="flex-grow border-t border-gray-300"></div>
             <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Or register manually</span>
             <div className="flex-grow border-t border-gray-300"></div>
           </div>
         </div>
         
         <form onSubmit={handleRegister} className="space-y-5">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (As per Aadhaar)</label>
             <input required type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full border-gray-300 rounded p-2 border focus:ring-[var(--color-mota-forest)]" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
             <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border-gray-300 rounded p-2 border focus:ring-[var(--color-mota-forest)]" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
             <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border-gray-300 rounded p-2 border focus:ring-[var(--color-mota-forest)]" />
           </div>

           <button type="submit" className="w-full bg-[var(--color-mota-forest)] text-white font-bold py-3 rounded shadow hover:bg-opacity-90 transition mt-4">
             Register
           </button>
         </form>
       </div>

       {/* Realistic OTP Modal */}
       {showOtpModal && (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all">
             <div className="bg-[#1E5642] px-4 py-3 flex justify-between items-center text-white">
                <h3 className="font-bold flex items-center">
                  <ShieldCheck size={18} className="mr-2" /> Aadhaar e-KYC
                </h3>
                <button onClick={() => setShowOtpModal(false)} className="text-white hover:text-gray-200">
                  <X size={20} />
                </button>
             </div>
             
             <div className="p-6">
               <div className="flex justify-center mb-4">
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                   <Smartphone size={32} className="text-blue-600" />
                 </div>
               </div>
               
               <p className="text-center text-sm text-gray-600 mb-6 font-medium">
                 An OTP has been sent to your Aadhaar-linked mobile number ending in <strong className="text-gray-900">******8932</strong>.
               </p>

               {otpError && (
                 <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-xs text-center font-bold">
                   {otpError}
                 </div>
               )}

               <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Enter 6-Digit OTP</label>
                   <input 
                     type="text" 
                     maxLength="6"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                     className="w-full text-center tracking-[0.5em] font-mono text-xl border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-[#1E5642] focus:border-[#1E5642] outline-none"
                     placeholder="••••••"
                   />
                 </div>
                 
                 <button onClick={verifyOtp} className="w-full bg-[#1E5642] hover:bg-[#164332] text-white font-bold py-3 px-4 rounded-lg shadow transition flex justify-center items-center">
                   Verify & Link Account
                 </button>
                 
                 <p className="text-center text-xs text-blue-600 font-semibold cursor-pointer hover:underline mt-4">
                   Resend OTP (00:45)
                 </p>
               </div>
             </div>
           </div>
         </div>
       )}

    </div>
  );
};



export default Registration;
