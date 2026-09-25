import React from 'react';
import { Search, ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SchemeSelection = () => {
  const navigate = useNavigate();
  const schemes = [
    { id: 1, name: 'National Fellowship for ST', ministry: 'Ministry of Tribal Affairs', status: 'Open', closeDate: '31-Oct-2026', guideline: 'https://tribal.nic.in/downloads/faqs/INSTRUCTIONS%20MANNUAL%20FOR%20FILLING%20%20NFST%20APPLICATION%20FORM.pdf' },
    { id: 2, name: 'National Overseas Scholarship for ST', ministry: 'Ministry of Tribal Affairs', status: 'Open', closeDate: '15-Nov-2026', guideline: 'https://tribal.nic.in/downloads/guidelines/NOS/RevisedGuidelinesNOS07102022.pdf' },
    { id: 3, name: 'Pre-Matric Scholarship for ST', ministry: 'Ministry of Tribal Affairs', status: 'Closed', closeDate: '30-Sep-2026', guideline: 'https://tribal.nic.in/downloads/guidelines/pre-matric/EDUGuidelines.pdf' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-t-4 border-[#1e3a8a]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Schemes</h2>
        <p className="text-sm text-gray-600 mb-6">Browse and apply for the scholarships based on your eligibility criteria.</p>
        
        <div className="flex space-x-4 mb-6">
          <input type="text" placeholder="Search by scheme name..." className="flex-1 border border-gray-300 rounded p-2 text-sm focus:ring-[#1e3a8a]" />
          <select className="border border-gray-300 rounded p-2 text-sm">
             <option>All Ministries</option>
             <option>Ministry of Tribal Affairs</option>
          </select>
          <button className="bg-[#1e3a8a] text-white px-4 py-2 rounded flex items-center"><Search size={16} className="mr-2"/> Filter</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ministry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schemes.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center">
                        <FileText className="text-gray-400 mr-3" size={20}/>
                        <span className="font-bold text-gray-800">{s.name}</span>
                      </div>
                      <a href={s.guideline} target="_blank" rel="noopener noreferrer" className="ml-8 mt-1 text-[11px] font-semibold text-blue-600 hover:underline flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download Official Guidelines (PDF)
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.ministry}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {s.status === 'Open' ? <span className="text-green-600">{s.closeDate}</span> : <span className="text-red-500">{s.closeDate}</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {s.status === 'Open' ? (
                      <button onClick={() => navigate('/application')} className="text-sm bg-blue-50 text-blue-700 px-4 py-1.5 border border-blue-200 rounded font-semibold hover:bg-blue-600 hover:text-white transition flex items-center justify-center mx-auto">
                        Apply <ArrowRight size={14} className="ml-1"/>
                      </button>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">Closed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchemeSelection;
