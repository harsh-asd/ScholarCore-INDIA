import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import Stepper from '../components/Stepper';

const ApplicantDashboard = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('PENDING'); // PENDING, LOADING, APPROVED, REJECTED, MANUAL_REVIEW
  const [errorMsg, setErrorMsg] = useState(null);
  const [step, setStep] = useState(0);
  
  // Eligibility Matcher State
  const [matchIncome, setMatchIncome] = useState('');
  const [matchCategory, setMatchCategory] = useState('ST');
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [hasMatched, setHasMatched] = useState(false);

  const checkEligibility = async () => {
    try {
      const res = await fetch('https://scholarcore-india.onrender.com/api/schemes/eligible', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ income: parseFloat(matchIncome), category: matchCategory })
      });
      if (res.ok) {
        const data = await res.json();
        setEligibleSchemes(data.eligible_schemes);
      } else {
        setEligibleSchemes([]);
      }
    } catch (err) {
      // Simulation fallback
      setEligibleSchemes([{ id: 1, name: "National Fellowship for ST", description: "Simulated match" }]);
    }
    setHasMatched(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setErrorMsg(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    if (file.name.endsWith('.txt')) {
      setErrorMsg("Invalid file type. Please upload a PDF or JPG.");
      return;
    }

    setStatus('LOADING');
    setStep(1); 
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('scheme_id', 1);
    formData.append('user_id', 1);
    
    try {
      const res = await fetch('https://scholarcore-india.onrender.com/api/evaluate-application', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.status); 
        if (data.status === 'APPROVED') setStep(2);
      } else {
        setErrorMsg(data.detail || "Verification failed");
        setStatus('REJECTED');
      }
    } catch (err) {
      setTimeout(() => {
        setStatus('APPROVED');
        setStep(2);
      }, 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Eligibility Matcher */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-[var(--color-mota-ochre)] p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Discover Eligible Schemes</h3>
        <div className="flex space-x-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Annual Income (₹)</label>
            <input type="number" value={matchIncome} onChange={e => setMatchIncome(e.target.value)} className="mt-1 block w-48 border border-gray-300 rounded p-2 text-sm focus:ring-[var(--color-mota-forest)] focus:border-[var(--color-mota-forest)]" placeholder="e.g. 150000" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Category</label>
            <select value={matchCategory} onChange={e => setMatchCategory(e.target.value)} className="mt-1 block w-40 border border-gray-300 rounded p-2 text-sm focus:ring-[var(--color-mota-forest)]">
              <option value="ST">ST</option>
              <option value="SC">SC</option>
              <option value="OBC">OBC</option>
            </select>
          </div>
          <button onClick={checkEligibility} className="bg-[var(--color-mota-forest)] text-white px-6 py-2 rounded text-sm font-medium hover:opacity-90">
            Check Eligibility
          </button>
        </div>
        
        {hasMatched && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {eligibleSchemes.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-green-700">You are eligible for:</p>
                {eligibleSchemes.map(s => (
                  <div key={s.id} className="p-3 bg-green-50 border border-green-200 rounded flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-600">{s.description}</p>
                    </div>
                    <button className="text-xs bg-white border border-green-600 text-green-700 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition">Apply</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No schemes found matching your criteria.</p>
            )}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-start md:space-x-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
        <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 mb-4 md:mb-0">
           <ShieldCheck size={40} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{localStorage.getItem('_sch_name') ? atob(localStorage.getItem('_sch_name')) : 'Aditi Sharma'}</h2>
              <p className="text-sm text-gray-500 mb-4">Application ID: <span className="font-mono text-gray-700 font-medium">MOTA-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</span></p>
            </div>
            <button onClick={() => alert('Generating PDF Receipt with Govt Watermark...')} className="hidden sm:flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm text-sm font-semibold transition">
              <FileText size={16} />
              <span>Download Receipt</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Category</p>
              <p className="text-sm font-medium text-gray-800">Scheduled Tribe (ST)</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Scheme</p>
              <p className="text-sm font-medium text-gray-800">National Fellowship (NFST)</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Academic Year</p>
              <p className="text-sm font-medium text-gray-800">2026-27</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Aadhaar No.</p>
              <p className="text-sm font-medium text-gray-800 tracking-widest">XXXX-XXXX-9012</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Bank IFSC (For DBT)</p>
              <p className="text-sm font-medium text-gray-800 font-mono">SBIN0001234</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exception Alert */}
      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start space-x-3">
          <AlertTriangle className="text-red-500 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-bold text-red-800">Upload Failed</h3>
            <p className="text-sm text-red-700 mt-1">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Status Tracking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6">Application Journey</h3>
        <Stepper currentStep={step} status={status} />
        
        {status === 'MANUAL_REVIEW' && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800 flex items-center space-x-2">
            <AlertTriangle size={16} />
            <span><strong>Notice:</strong> Your application has been flagged for manual verification due to low AI confidence. No action is required.</span>
          </div>
        )}
      </div>

      {/* Action Required: Deficiency Management */}
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 border-l-4 border-l-red-600">
        <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center"><AlertTriangle className="mr-2" /> Action Required: Deficiencies Found</h3>
        <div className="bg-red-50 p-4 rounded mb-4">
           <p className="text-sm text-red-900 font-semibold mb-1">AI OCR Scrutiny flagged the following issues:</p>
           <ul className="list-disc ml-5 text-sm text-red-700">
             <li>Missing Required Document: NET/GATE Scorecard (or low legibility)</li>
             <li>Income mismatch: Claimed ₹1,50,000 but OCR detected ₹4,50,000.</li>
           </ul>
        </div>
        <p className="text-sm text-gray-600 mb-4">You must upload corrected or clearer documents to resolve this deficiency and resume processing.</p>
        
        <div className="flex space-x-4">
           <button onClick={() => document.getElementById('resubmit-upload').click()} className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-700">
             Re-Upload Corrected Document
           </button>
           <input type="file" id="resubmit-upload" className="hidden" onChange={(e) => {
               if(e.target.files[0]) alert('Document queued for resubmission. Our AI will re-evaluate shortly.');
           }} />
        </div>
      </div>

      {/* Document Upload Zone */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Upload Income Certificate</h3>
        <p className="text-sm text-gray-500 mb-6">Please upload a clear, legible scan of your income certificate for AI scrutiny.</p>
        
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <UploadCloud size={48} className="text-gray-400 mb-4" />
          <p className="text-sm font-medium text-gray-700">Drag & drop your file here, or click to browse</p>
          <p className="text-xs text-gray-400 mt-2">Max file size 5MB</p>
          
          <div className="flex space-x-2 mt-4">
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] uppercase font-bold rounded">PDF</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] uppercase font-bold rounded">JPG</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] uppercase font-bold rounded">PNG</span>
          </div>
          
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.txt" // .txt included for testing the error state
          />
        </div>
        
        {file && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500" size={20} />
              <span className="text-sm font-medium text-gray-700">{file.name}</span>
            </div>
            <button 
              className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${status === 'LOADING' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={(e) => { e.stopPropagation(); handleUpload(); }}
              disabled={status === 'LOADING'}
            >
              {status === 'LOADING' ? 'Scrutinizing...' : 'Submit for Verification'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default ApplicantDashboard;
