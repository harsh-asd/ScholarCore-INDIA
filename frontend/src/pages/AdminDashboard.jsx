import React, { useState } from 'react';
import { 
  Users, CheckCircle, Clock, AlertTriangle, FileText, CheckSquare, 
  XSquare, Download, Bell, Activity, Sliders, TrendingUp, PieChart as PieChartIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pendingApplications } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('_sch_role') ? atob(localStorage.getItem('_sch_role')) : 'OFFICER'; // 'MINISTRY' or 'OFFICER'
  const [activeTab, setActiveTab] = useState('ANALYTICS'); // NEW: Added Analytics tab

  // Mock Data for Charts
  const velocityData = [
    { name: 'Week 1', Received: 4000, Processed: 2400 },
    { name: 'Week 2', Received: 3000, Processed: 1398 },
    { name: 'Week 3', Received: 2000, Processed: 9800 },
    { name: 'Week 4', Received: 2780, Processed: 3908 },
    { name: 'Week 5', Received: 1890, Processed: 4800 },
  ];

  const distributionData = [
    { name: 'Approved', value: 4500 },
    { name: 'Pending Review', value: 3000 },
    { name: 'Deficient/Flagged', value: 1500 },
    { name: 'Rejected', value: 500 },
  ];
  const COLORS = ['#1E5642', '#D49A36', '#C85237', '#808080'];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login?role=ADMIN');
  };

  const handleApprove = (id) => {
    alert(`Application ${id} approved and digitally signed. Disbursement initiated via PFMS.`);
  };

  const handleDeficiency = (id) => {
    alert(`Deficiency marked for ${id}. SMS and Email notification sent to the applicant for resubmission.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-[#1E5642] text-white py-4 px-6 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-1 rounded">
            <img src="/ashoka_emblem.png" alt="Logo" className="h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Ministry of Tribal Affairs</h1>
            <p className="text-xs text-green-100 opacity-90">{userRole === 'MINISTRY' ? 'Ministry Executive Dashboard' : 'Nodal Officer Dashboard'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
            <button className="hover:text-green-200 transition relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
            </button>
          </div>
          <div className="flex items-center space-x-3 border-l border-green-700 pl-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold">{userRole === 'MINISTRY' ? 'Hon. Secretary' : 'State Nodal Officer'}</p>
              <p className="text-xs text-green-200">ID: MOTA-ADM-09</p>
            </div>
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-lg font-bold shadow-inner">
              {userRole === 'MINISTRY' ? 'HS' : 'NO'}
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-red-200 hover:text-white font-bold transition">Logout</button>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-6">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Control Panel</p>
            </div>
            <nav className="flex flex-col">
              <button onClick={() => setActiveTab('ANALYTICS')} className={`flex items-center space-x-3 p-4 text-sm font-medium transition ${activeTab === 'ANALYTICS' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Activity size={18} /><span>Executive Analytics</span>
              </button>
              <button onClick={() => setActiveTab('VERIFICATION')} className={`flex items-center space-x-3 p-4 text-sm font-medium transition ${activeTab === 'VERIFICATION' ? 'bg-[var(--color-mota-forest)] text-white border-l-4 border-green-800' : 'text-gray-600 hover:bg-gray-50'}`}>
                <CheckSquare size={18} /><span>Application Verification</span>
              </button>
              {userRole === 'MINISTRY' && (
                <button onClick={() => setActiveTab('RULES')} className={`flex items-center space-x-3 p-4 text-sm font-medium transition ${activeTab === 'RULES' ? 'bg-[var(--color-mota-terracotta)] text-white border-l-4 border-orange-800' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Sliders size={18} /><span>Dynamic Rule Engine</span>
                </button>
              )}
              <button className="flex items-center space-x-3 p-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition border-l-4 border-transparent">
                <Users size={18} /><span>Institute Management</span>
              </button>
              <button className="flex items-center space-x-3 p-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition border-l-4 border-transparent">
                <FileText size={18} /><span>Merit List Generation</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* TAB: ANALYTICS */}
          {activeTab === 'ANALYTICS' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Executive Dashboard</h2>
                  <p className="text-gray-600 text-sm mt-1">Real-time Scheme Performance & AI Scrutiny Velocity</p>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm text-sm font-bold flex items-center hover:bg-gray-50">
                  <Download size={16} className="mr-2"/> Export Report
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4 border-t-4 border-t-blue-500">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users size={24} /></div>
                  <div><p className="text-xs text-gray-500 font-bold uppercase">Total Received</p><h3 className="text-2xl font-black text-gray-800">24,592</h3></div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4 border-t-4 border-t-green-500">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><CheckCircle size={24} /></div>
                  <div><p className="text-xs text-gray-500 font-bold uppercase">AI Approved</p><h3 className="text-2xl font-black text-gray-800">18,204</h3></div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4 border-t-4 border-t-yellow-500">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><AlertTriangle size={24} /></div>
                  <div><p className="text-xs text-gray-500 font-bold uppercase">Flagged / Deficient</p><h3 className="text-2xl font-black text-gray-800">4,120</h3></div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4 border-t-4 border-t-purple-500">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600"><TrendingUp size={24} /></div>
                  <div><p className="text-xs text-gray-500 font-bold uppercase">Fund Disbursed</p><h3 className="text-2xl font-black text-gray-800">₹42.5 Cr</h3></div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center"><Activity size={18} className="mr-2 text-blue-600"/> Application Velocity (Weekly)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={velocityData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                        <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                        <Bar dataKey="Received" fill="#94a3b8" radius={[4,4,0,0]} />
                        <Bar dataKey="Processed" fill="#1E5642" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center"><PieChartIcon size={18} className="mr-2 text-orange-600"/> Status Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                          {distributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DYNAMIC RULE ENGINE */}
          {activeTab === 'RULES' && userRole === 'MINISTRY' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Dynamic Rule Engine Configuration</h2>
                <p className="text-gray-600 text-sm mt-1">Configure automated AI screening parameters scheme-wise instantly.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h3 className="font-bold text-lg text-gray-800">National Fellowship for ST (NFST)</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">Active</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Max Annual Family Income Eligibility (₹)</label>
                      <input type="number" defaultValue="250000" className="w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 border focus:ring-[#C85237]" />
                      <p className="text-xs text-gray-500 mt-1">Applications exceeding this OCR-detected income will be automatically rejected.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Minimum AI Confidence Score for Auto-Approval (%)</label>
                      <input type="range" min="50" max="99" defaultValue="85" className="w-full accent-[#C85237]" />
                      <div className="flex justify-between text-xs text-gray-500 font-bold mt-1"><span>50%</span><span>85% Current Threshold</span><span>99%</span></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded border border-gray-200">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-[#C85237] rounded focus:ring-[#C85237]" />
                      <span className="text-sm font-medium text-gray-800">Mandatory Bank Aadhaar Seeding Check via NPCI</span>
                    </label>
                    <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded border border-gray-200">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-[#C85237] rounded focus:ring-[#C85237]" />
                      <span className="text-sm font-medium text-gray-800">Auto-verify ST Certificate via DigiLocker</span>
                    </label>
                    <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded border border-gray-200">
                      <input type="checkbox" className="w-5 h-5 text-[#C85237] rounded focus:ring-[#C85237]" />
                      <span className="text-sm font-medium text-gray-800">Enable Strict Biometric Attendance Filter</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button onClick={() => alert('Rule Engine updated successfully. New parameters will apply to incoming applications instantly.')} className="bg-[#C85237] text-white px-6 py-2.5 rounded shadow font-bold hover:bg-[#a64028] transition">Deploy Rules to Production</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VERIFICATION */}
          {activeTab === 'VERIFICATION' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Application Scrutiny Inbox</h2>
                  <p className="text-gray-600 text-sm mt-1">Applications requiring manual human-in-the-loop verification.</p>
                </div>
                <div className="bg-white rounded border border-gray-300 p-1 flex">
                  <button className="px-4 py-1.5 text-sm font-semibold bg-gray-100 text-gray-800 rounded">Pending (24)</button>
                  <button className="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800">Processed (1.2k)</button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Applicant ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name / Scheme</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">AI Confidence</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Flag Reason</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 font-bold">{app.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{app.name}</div>
                          <div className="text-xs text-gray-500">NFST - Scholarship</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">68%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-red-600 font-medium">Income mismatch detected by OCR</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleApprove(app.id)} className="text-green-600 hover:text-green-900 mx-2" title="Approve"><CheckSquare size={20}/></button>
                          <button onClick={() => handleDeficiency(app.id)} className="text-yellow-600 hover:text-yellow-900 mx-2" title="Mark Deficient"><AlertTriangle size={20}/></button>
                          <button className="text-red-600 hover:text-red-900 mx-2" title="Reject"><XSquare size={20}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
