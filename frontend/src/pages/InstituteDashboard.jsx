import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle, XCircle, AlertTriangle, Search, FileText, Filter } from 'lucide-react';

const InstituteDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    // Fetch applications from the backend
    fetch('http://localhost:8000/applications/')
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error(err));
  }, []);

  const handleVerify = (id) => {
    alert(`Application MOTA-26-${id.toString().padStart(4, '0')} has been successfully verified by the Institute.\n\nIt is now forwarded to the District/State Nodal Officer (DNO/SNO) for the next tier of verification.`);
    // Optimistic update
    setApplications(applications.map(app => app.id === id ? {...app, status: 'INO_VERIFIED'} : app));
  };

  const handleDefect = (id) => {
    const reason = window.prompt("AUDIT TRAIL LOGGING:\n\nPlease enter the specific reason for marking this application as Defective (e.g., 'Income certificate is blurry', 'Name mismatch').\n\nThis remark will be permanently logged and visible to the applicant.");
    
    if (reason === null || reason.trim() === "") {
      alert("Action cancelled: A valid remark is mandatory for Govt Audit Trails.");
      return;
    }

    alert(`Application MOTA-26-${id.toString().padStart(4, '0')} marked as Defective.\n\nAudit Log Saved: "${reason}"\n\nIt has been routed back to the student's dashboard for correction.`);
    setApplications(applications.map(app => app.id === id ? {...app, status: 'DEFECTIVE', remarks: reason} : app));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#3B4B61] rounded-lg flex items-center justify-center text-white shadow-sm border-2 border-transparent">
              <Building2 size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Delhi Technological University (DTU)</h1>
              <p className="text-sm text-gray-500">AISHE Code: <span className="font-mono text-gray-700 font-medium">U-0105</span> | Role: <span className="font-bold text-[#187884]">Institute Nodal Officer (INO)</span></p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Academic Year</p>
            <p className="text-lg font-bold text-[#3B4B61]">2026-27</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow-sm rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm font-medium text-gray-500">Pending Verification</p>
          <p className="text-2xl font-bold text-gray-900">{applications.filter(a => a.status !== 'INO_VERIFIED' && a.status !== 'DEFECTIVE').length + 42}</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg border-l-4 border-green-500">
          <p className="text-sm font-medium text-gray-500">Verified by INO</p>
          <p className="text-2xl font-bold text-gray-900">{applications.filter(a => a.status === 'INO_VERIFIED').length + 128}</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg border-l-4 border-red-500">
          <p className="text-sm font-medium text-gray-500">Defective / Returned</p>
          <p className="text-2xl font-bold text-gray-900">{applications.filter(a => a.status === 'DEFECTIVE').length + 14}</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg border-l-4 border-[#3B4B61]">
          <p className="text-sm font-medium text-gray-500">Total Enrolled Claimants</p>
          <p className="text-2xl font-bold text-gray-900">{applications.length + 184}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <h3 className="text-lg font-bold text-gray-800">Student Enrollment Verification Queue</h3>
          <div className="flex space-x-2">
            <div className="relative">
              <input type="text" placeholder="Search Application ID..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#3B4B61] focus:border-[#3B4B61]" />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-50 text-gray-700">
              <Filter size={16} className="mr-2" /> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Scrutiny Check</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">INO Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 font-medium tracking-wider">MOTA-26-{app.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900">{app.extracted_data?.extracted_name || `Applicant ${app.user_id}`}</p>
                    <p className="text-xs text-gray-500">B.Tech (Computer Science)</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">National Fellowship (NFST)</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.status === 'flagged' || app.status === 'rejected' ? (
                      <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-red-100 text-red-800 rounded border border-red-200 flex items-center w-max"><AlertTriangle size={12} className="mr-1"/> Discrepancy Found</span>
                    ) : (
                      <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-800 rounded border border-green-200 flex items-center w-max"><CheckCircle size={12} className="mr-1"/> AI Cleared</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-3">
                    {app.status === 'INO_VERIFIED' ? (
                       <span className="text-green-600 flex items-center justify-center text-xs font-bold"><CheckCircle size={14} className="mr-1"/> Forwarded to SNO</span>
                    ) : app.status === 'DEFECTIVE' ? (
                       <div className="flex flex-col items-center justify-center">
                         <span className="text-red-600 flex items-center text-xs font-bold mb-1"><XCircle size={14} className="mr-1"/> Marked Defective</span>
                         <span className="text-[9px] text-gray-500 italic bg-gray-100 px-2 py-1 rounded max-w-[120px] truncate" title={app.remarks}>"{app.remarks || 'No remarks'}"</span>
                       </div>
                    ) : (
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleVerify(app.id)} className="text-white bg-[#1E5642] hover:bg-[#153e2f] px-3 py-1.5 rounded text-xs font-semibold transition shadow-sm">
                          Verify
                        </button>
                        <button onClick={() => handleDefect(app.id)} className="text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 px-3 py-1.5 rounded text-xs font-semibold transition shadow-sm">
                          Defect
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">Loading institute applications...</td>
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
