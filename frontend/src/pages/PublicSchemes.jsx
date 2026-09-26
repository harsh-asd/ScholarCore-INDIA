import React from 'react';
import { Search, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicSchemes = () => {
  const navigate = useNavigate();
  const schemes = [
    { id: 1, name: 'Pre-Matric Scholarship for ST Students', ministry: 'Ministry of Tribal Affairs', status: 'Open', closeDate: '30-Oct-2026', guideline: 'https://tribal.nic.in/downloads/guidelines/pre-matric/EDUGuidelines.pdf', desc: 'Financial assistance for ST students studying in classes IX and X.' },
    { id: 2, name: 'Post-Matric Scholarship for ST Students', ministry: 'Ministry of Tribal Affairs', status: 'Open', closeDate: '31-Oct-2026', guideline: 'https://tribal.nic.in/downloads/guidelines/post-matric/EDUGuidelines.pdf', desc: 'Financial assistance for ST students at post-matriculation or post-secondary stage.' },
    { id: 3, name: 'National Fellowship and Scholarship (Top Class)', ministry: 'Ministry of Tribal Affairs', status: 'Open', closeDate: '15-Nov-2026', guideline: 'https://tribal.nic.in/downloads/guidelines/top-class/EDUGuidelines.pdf', desc: 'Assistance for ST students pursuing higher studies in top-class institutions.' },
    { id: 4, name: 'National Overseas Scholarship for ST Candidates', ministry: 'Ministry of Tribal Affairs', status: 'Open', closeDate: '30-Nov-2026', guideline: 'https://tribal.nic.in/downloads/guidelines/NOS/RevisedGuidelinesNOS07102022.pdf', desc: 'Assistance to selected ST students for pursuing Master level courses and Ph.D abroad.' },
    { id: 5, name: 'National Fellowship for ST Students', ministry: 'Ministry of Tribal Affairs', status: 'Closed', closeDate: '30-Sep-2026', guideline: 'https://tribal.nic.in/downloads/faqs/INSTRUCTIONS%20MANNUAL%20FOR%20FILLING%20%20NFST%20APPLICATION%20FORM.pdf', desc: 'Fellowships provided to ST students to pursue M.Phil and Ph.D degrees.' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] font-sans text-gray-900 flex flex-col">
      
      {/* Hero Section */}
      <div className="bg-[#1E5642] text-white py-12 px-6 shadow-md border-b-4 border-[#FDB813]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Schemes on ScholarCore</h1>
            <p className="text-green-100 max-w-2xl text-lg">Browse, download guidelines, and apply for all active scholarships and fellowships offered by the Ministry of Tribal Affairs (MoTA).</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <input type="text" placeholder="Search by scheme name or keyword..." className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1E5642] focus:outline-none" />
            <select className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1E5642] focus:outline-none bg-gray-50">
               <option>All Ministries</option>
               <option>Ministry of Tribal Affairs</option>
            </select>
            <button className="bg-[#1E5642] hover:bg-[#164332] text-white px-6 py-3 rounded-lg flex items-center font-bold transition shadow-sm"><Search size={18} className="mr-2"/> Filter</button>
          </div>

          <div className="grid gap-6">
            {schemes.map(s => (
              <div key={s.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FileText className="text-[#1E5642] mr-3" size={24}/>
                      <h3 className="text-xl font-black text-gray-800">{s.name}</h3>
                    </div>
                    <p className="text-gray-600 ml-9 mb-2 text-sm">{s.desc}</p>
                    <div className="ml-9 flex flex-wrap gap-2 text-xs font-bold mt-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200">{s.ministry}</span>
                      {s.status === 'Open' ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-200">Open until {s.closeDate}</span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full border border-red-200">Closed (Ended {s.closeDate})</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 md:ml-6 flex flex-col space-y-3 w-full md:w-auto">
                    <a href={s.guideline} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition shadow-sm">
                      <Download size={16} className="mr-2 text-gray-500" /> Guidelines
                    </a>
                    <button 
                      onClick={() => navigate('/login?role=STUDENT')} 
                      disabled={s.status !== 'Open'}
                      className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition shadow-sm ${s.status === 'Open' ? 'bg-[#D49A36] hover:bg-[#B8862F] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {s.status === 'Open' ? 'Apply Now' : 'Applications Closed'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PublicSchemes;
