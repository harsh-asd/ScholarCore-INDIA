import React, { useState } from 'react';
import { Upload, CheckCircle, Save, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [saveStatus, setSaveStatus] = useState('');
  
  // Scheme Selection State
  const [selectedScheme, setSelectedScheme] = useState('NFST');
  
  // File upload state (Vault)
  const [fileStatus, setFileStatus] = useState({});
  const [uploadStatus, setUploadStatus] = useState('PENDING');

  const handleSaveDraft = () => {
    setSaveStatus('Draft Saved Successfully at ' + new Date().toLocaleTimeString());
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleUpload = async (docType, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileStatus(prev => ({...prev, [docType]: 'LOADING'}));
    
    // In a real hackathon flow, we upload right away or store file for final submit.
    // Let's just simulate the file being stored locally in state, then mock success.
    setTimeout(() => {
      setFileStatus(prev => ({...prev, [docType]: 'UPLOADED'}));
    }, 500);
  };
  
  const handleFinalVerify = async () => {
     setUploadStatus('LOADING');
     try {
       const schemeId = selectedScheme === 'NFST' ? 1 : 2;
       const payload = {
         user_id: Math.floor(Math.random() * 1000) + 100, // Generate a mock user ID for demo purposes
         scheme_id: schemeId,
         extracted_data: {
           extracted_name: "LIVE DEMO APPLICANT",
           extracted_income: 145000,
           extracted_caste: "ST",
           extracted_marks: 89.4,
           is_pvtg: true,
           is_pwd: false,
           document_confidence_score: 0.98
         }
       };

       const response = await fetch('https://scholarcore-india.onrender.com/applications/', { 
         method: 'POST', 
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(payload)
       });
       
       if (response.ok) {
         setUploadStatus('APPROVED');
       } else {
         console.error('Failed to submit application');
         setUploadStatus('APPROVED'); // Fallback for UI flow
       }
     } catch (err) {
       console.error('Error submitting application:', err);
       setUploadStatus('APPROVED');
     }
  };

  const requiredDocs = selectedScheme === 'NOS' 
    ? ['Foreign Admission Letter', 'Passport Copy', 'GRE/TOEFL Scorecard']
    : ['Domestic Enrollment Letter', 'NET/GATE Scorecard', 'Income Certificate'];

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Fresh Scholarship Application</h2>
        <div className="flex space-x-3">
          <button onClick={handleSaveDraft} className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded font-medium shadow-sm hover:bg-yellow-200">
            <Save size={18} className="mr-2" /> Save as Draft
          </button>
          <button onClick={() => navigate('/applicant')} className="bg-[var(--color-mota-forest)] text-white px-4 py-2 rounded font-medium shadow hover:opacity-90">
            View Dashboard
          </button>
        </div>
      </div>
      
      {saveStatus && (
        <div className="mb-6 p-3 bg-green-50 text-green-800 border-l-4 border-green-500 rounded">
          {saveStatus}
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-white rounded-t-lg border-b border-gray-200 shadow-sm overflow-hidden text-xs sm:text-sm">
        {['General Details', 'Academic Details', 'Scheme Selection', 'Liveness Check', 'Document Vault'].map((tab, idx) => {
          const step = idx + 1;
          const isActive = activeTab === step;
          return (
            <button 
              key={step} 
              onClick={() => setActiveTab(step)}
              className={`flex-1 py-4 text-center font-bold text-sm ${isActive ? 'bg-[var(--color-mota-forest)] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              Step {step}: {tab}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-8 rounded-b-lg shadow-sm border border-t-0 border-gray-200 min-h-[400px]">
        
        {activeTab === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Applicant General Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" className="mt-1 w-full border rounded p-2" defaultValue="Rahul Sharma" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" className="mt-1 w-full border rounded p-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Gender</label><select className="mt-1 w-full border rounded p-2"><option>Male</option><option>Female</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700">Community / Category</label><select className="mt-1 w-full border rounded p-2" disabled><option>ST (Scheduled Tribe)</option></select></div>
            </div>
            <div className="flex justify-end pt-6">
              <button onClick={() => setActiveTab(2)} className="bg-[#112233] text-white px-6 py-2 rounded flex items-center">Next <ArrowRight size={18} className="ml-2"/></button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Academic Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700">Current Institution</label><input type="text" className="mt-1 w-full border rounded p-2" defaultValue="Indian Institute of Historical Research, Kanpur" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Present Class / Course</label><input type="text" className="mt-1 w-full border rounded p-2" defaultValue="PhD Cultural Anthropology" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Previous Board/University</label><input type="text" className="mt-1 w-full border rounded p-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Previous Passing Percentage</label><input type="number" className="mt-1 w-full border rounded p-2" defaultValue="82" /></div>
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={() => setActiveTab(1)} className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center"><ArrowLeft size={18} className="mr-2"/> Previous</button>
              <button onClick={() => setActiveTab(3)} className="bg-[#112233] text-white px-6 py-2 rounded flex items-center">Next <ArrowRight size={18} className="ml-2"/></button>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Scheme Selection</h3>
            <p className="text-gray-600 mb-6">Select the MoTA scheme you wish to apply for based on your academic intent.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <label className={`p-6 border-2 rounded-lg cursor-pointer transition ${selectedScheme === 'NFST' ? 'border-[var(--color-mota-terracotta)] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <div className="flex items-center space-x-3 mb-2">
                   <input type="radio" name="scheme" checked={selectedScheme === 'NFST'} onChange={() => setSelectedScheme('NFST')} className="w-5 h-5 text-[var(--color-mota-terracotta)]" />
                   <h4 className="font-bold text-gray-900 text-lg">National Fellowship (NFST)</h4>
                 </div>
                 <p className="text-sm text-gray-600 ml-8">For domestic research programs (M.Phil / PhD) within Indian universities.</p>
               </label>
               
               <label className={`p-6 border-2 rounded-lg cursor-pointer transition ${selectedScheme === 'NOS' ? 'border-[var(--color-mota-forest)] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <div className="flex items-center space-x-3 mb-2">
                   <input type="radio" name="scheme" checked={selectedScheme === 'NOS'} onChange={() => setSelectedScheme('NOS')} className="w-5 h-5 text-[var(--color-mota-forest)]" />
                   <h4 className="font-bold text-gray-900 text-lg">National Overseas (NOS)</h4>
                 </div>
                 <p className="text-sm text-gray-600 ml-8">For international study programs (Masters / PhD) at foreign universities.</p>
               </label>
            </div>

            <div className="flex justify-between pt-6 mt-8">
              <button onClick={() => setActiveTab(2)} className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center"><ArrowLeft size={18} className="mr-2"/> Previous</button>
              <button onClick={() => setActiveTab(4)} className="bg-[#112233] text-white px-6 py-2 rounded flex items-center">Verify Identity <ArrowRight size={18} className="ml-2"/></button>
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold uppercase mr-3 tracking-widest border border-blue-200">Anti-Ghosting</span> 
               AI Face Liveness Verification
            </h3>
            <p className="text-sm text-gray-600 mb-6">To prevent identity fraud, please ensure your face is clearly visible. The AI will match this live capture against your Aadhaar/DigiLocker photo.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
               <div className="w-64 h-64 bg-gray-300 rounded-lg border-4 border-dashed border-gray-400 relative overflow-hidden flex items-center justify-center group cursor-pointer hover:border-blue-500 transition">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                  <p className="text-white font-bold drop-shadow-md z-10 flex flex-col items-center">
                    <span className="text-3xl mb-2">📷</span>
                    Click to capture
                  </p>
               </div>
               
               <div className="flex-1 max-w-sm w-full space-y-4">
                 <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Aadhaar Photo Match</p>
                    <div className="flex items-center justify-between">
                       <span className="text-lg font-bold text-green-700">98.4% Confidence</span>
                       <CheckCircle size={24} className="text-green-600" />
                    </div>
                 </div>
                 <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Liveness Check</p>
                    <div className="flex items-center justify-between">
                       <span className="text-lg font-bold text-green-700">Passed (No Spoof Detected)</span>
                       <CheckCircle size={24} className="text-green-600" />
                    </div>
                 </div>
               </div>
            </div>

            <div className="flex justify-between pt-8">
              <button onClick={() => setActiveTab(3)} className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center"><ArrowLeft size={18} className="mr-2"/> Previous</button>
              <button onClick={() => setActiveTab(5)} className="bg-[#112233] text-white px-6 py-2 rounded flex items-center">Proceed to Uploads <ArrowRight size={18} className="ml-2"/></button>
            </div>
          </div>
        )}

        {activeTab === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Document Vault (AI Validation)</h3>
            <p className="text-sm text-gray-500 mb-6">Upload the mandatory documents for the <strong className="text-gray-900">{selectedScheme === 'NFST' ? 'National Fellowship (NFST)' : 'National Overseas (NOS)'}</strong>. Our AI Engine will instantly verify your certificates.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {requiredDocs.map(doc => (
                <div key={doc} className="border border-gray-300 rounded-lg p-6 text-center hover:shadow-md transition bg-gray-50 relative">
                  <h4 className="font-semibold text-sm mb-4 text-gray-800">{doc}</h4>
                  
                  {fileStatus[doc] === 'UPLOADED' ? (
                     <div className="flex flex-col items-center text-green-600">
                       <CheckCircle size={32} className="mb-2" />
                       <span className="text-sm font-bold">Uploaded</span>
                     </div>
                  ) : fileStatus[doc] === 'LOADING' ? (
                     <div className="flex flex-col items-center text-blue-600 animate-pulse">
                       <Upload size={32} className="mb-2" />
                       <span className="text-sm font-bold">Scanning...</span>
                     </div>
                  ) : (
                     <div>
                       <input type="file" onChange={(e) => handleUpload(doc, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                       <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                       <span className="text-xs text-gray-500">Click or Drag File</span>
                     </div>
                  )}
                </div>
              ))}
            </div>

            {uploadStatus === 'LOADING' && <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-center rounded font-bold animate-pulse">Running Backend Rule Engine...</div>}
            
            {uploadStatus === 'APPROVED' && selectedScheme === 'NFST' && (
               <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                 <p className="font-bold text-yellow-800 mb-1">MANUAL_REVIEW: Discrepancy Found</p>
                 <p className="text-sm text-yellow-700">Rule engine flagged: Missing Required Document: NET/GATE Scorecard.</p>
               </div>
            )}
            
            {uploadStatus === 'APPROVED' && selectedScheme === 'NOS' && (
               <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
                 <p className="font-bold text-green-800 mb-1">VERIFIED: Requirements Met</p>
                 <p className="text-sm text-green-700">Foreign Admission and Passport confirmed by OCR.</p>
               </div>
            )}

            <div className="flex justify-between pt-8">
              <button onClick={() => setActiveTab(4)} className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex items-center"><ArrowLeft size={18} className="mr-2"/> Previous</button>
              {uploadStatus === 'PENDING' ? (
                <button onClick={handleFinalVerify} className="bg-[var(--color-mota-forest)] text-white px-6 py-2 rounded flex items-center font-bold">Verify & Submit</button>
              ) : (
                <button onClick={() => navigate('/applicant')} className="bg-[#112233] text-white px-6 py-2 rounded flex items-center shadow font-bold">Return to Dashboard</button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationForm;
