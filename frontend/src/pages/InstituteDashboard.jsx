import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle, XCircle, AlertTriangle, Search, FileText, Filter, Lock } from 'lucide-react';

const InstituteDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch applications from the backend
    fetch('https://scholarcore-india.onrender.com/applications/')
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error(err));
  }, []);

  const handleVerify = (id) => {
    alert(`Application MOTA-26-${id.toString().padStart(4, '0')} has been successfully verified by the Institute.\\n\\nIt is now forwarded to the District/State Nodal Officer (DNO/SNO) for the next tier of verification.`);
    // Optimistic update
    setApplications(applications.map(app => app.id === id ? {...app, status: 'INO_VERIFIED'} : app));
  };

  const handleDefect = (id) => {
    const reason = window.prompt("AUDIT TRAIL LOGGING:\\n\\nPlease enter the specific reason for marking this application as Defective (e.g., 'Income certificate is blurry', 'Name mismatch').\\n\\nThis remark will be permanently logged and visible to the applicant.");
    
    if (reason === null || reason.trim() === "") {
      alert("Action cancelled: A valid remark is mandatory for Govt Audit Trails.");
      return;
    }

    alert(`Application MOTA-26-${id.toString().padStart(4, '0')} marked as Defective.\\n\\nAudit Log Saved: "${reason}"\\n\\nIt has been routed back to the student's dashboard for correction.`);
    setApplications(applications.map(app => app.id === id ? {...app, status: 'DEFECTIVE', remarks: reason} : app));
  };

  const pendingApps = applications.filter(app => app.status === 'APPROVED' || app.status === 'SUBMITTED' || app.status === 'PENDING');
  const verifiedApps = applications.filter(app => app.status === 'INO_VERIFIED' || app.status === 'DNO_VERIFIED');
  const defectiveApps = applications.filter(app => app.status === 'DEFECTIVE');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Strict Access Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#3B4B61] rounded-lg flex items-center justify-center text-white shadow-sm border-2 border-transparent">
              <Building2 size={32} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Institute Nodal Officer (INO)</h1>
                <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider flex items-center">
                  <Lock size={12} className="mr-1" /> Level-1 Restricted Access
                </span>
              </div>
              <p className="text-sm text-gray-500">
                You are securely logged in as the Nodal Officer for <strong className="text-gray-700">Indian Institute of Technology, Kanpur (IITK)</strong>.
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">AISHE Code</p>
            <p className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded">U-0560</p>
          </div>
        </div>
        
        {/* RBAC Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-yellow-800">
            <p className="font-bold mb-1">Feature Restrictions Active</p>
            <p>As an INO, your permissions are strictly limited to verifying student records against physical institute documents. You do not have authorization to generate Merit Lists or push funds via PFMS. Those features are locked and reserved for Ministry Level Officers.</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 border-l-4 border-l-blue-500">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600"><FileText size={24}/></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Verification</p>
              <h3 className="text-2xl font-bold text-gray-900">{pendingApps.length}</h3>
            </div>
         </div>
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 border-l-4 border-l-green-500">
            <div className="bg-green-50 p-3 rounded-full text-green-600"><CheckCircle size={24}/></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Verified & Forwarded</p>
              <h3 className="text-2xl font-bold text-gray-900">{verifiedApps.length}</h3>
            </div>
         </div>
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 border-l-4 border-l-red-500">
            <div className="bg-red-50 p-3 rounded-full text-red-600"><XCircle size={24}/></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Marked Defective</p>
              <h3 className="text-2xl font-bold text-gray-900">{defectiveApps.length}</h3>
            </div>
         </div>
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden border-t-4 border-t-[#3B4B61]">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Level-1 Verification Queue</h2>
            <p className="text-sm text-gray-500">Review and verify applications submitted by students in your institute.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="relative">
               <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search by ID or Name..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4B61]"
               />
             </div>
             <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
               <Filter size={16} /> <span>Filter</span>
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action (Level-1)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingApps.filter(app => {
                 try {
                   const data = JSON.parse(app.extracted_data || "{}");
                   return (data.extracted_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || app.id.toString().includes(searchTerm);
                 } catch { return true; }
              }).map(app => {
                let parsedData = {};
                try { parsedData = JSON.parse(app.extracted_data); } catch(e) {}
                
                return (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">MOTA-26-{app.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{parsedData.extracted_name || 'N/A'}</div>
                      <div className="text-xs text-gray-500">Aadhaar Verified</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">NFST</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending Verification
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleVerify(app.id)} className="text-white bg-[#1E5642] hover:bg-[#153e2f] px-3 py-1.5 rounded text-xs font-semibold transition shadow-sm flex items-center">
                          <CheckCircle size={14} className="mr-1" /> Verify
                        </button>
                        <button onClick={() => handleDefect(app.id)} className="text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 px-3 py-1.5 rounded text-xs font-semibold transition shadow-sm flex items-center">
                          <XCircle size={14} className="mr-1" /> Defect
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pendingApps.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">No pending applications found for your institute.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;
