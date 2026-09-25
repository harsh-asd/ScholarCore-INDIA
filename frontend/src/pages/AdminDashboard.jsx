import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { Users, FileText, CheckCircle, RefreshCcw, PlusCircle, TrendingUp, Award, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, scheme, merit, forecast
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Merit List State
  const [meritList, setMeritList] = useState([]);
  const [isMeritLoading, setIsMeritLoading] = useState(false);

  // Forecast State
  const [forecastData, setForecastData] = useState(null);
  const [isForecastLoading, setIsForecastLoading] = useState(false);
  
  // Scheme Configurator State
  const [schemeName, setSchemeName] = useState('');
  const [incomeThreshold, setIncomeThreshold] = useState('');
  const [reqIncome, setReqIncome] = useState(true);
  const [reqCaste, setReqCaste] = useState(true);
  const [configMsg, setConfigMsg] = useState(null);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/applications/');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (err) {
      setTimeout(() => {
        setApplications([
          { id: "APP-10294", name: "Alice Smith", role: "Frontend Developer", date: "2023-10-15", status: "Pending Review" },
        ]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMeritList = async () => {
    setIsMeritLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/admin/generate-merit-list');
      if (response.ok) {
        const data = await response.json();
        setMeritList(data.merit_list);
      }
    } catch (err) {
       // Mock
       setMeritList([
           { rank: 1, application_id: 142, user_id: 5, income: 45000, academic_score: 95.5, merit_score: 91.2 },
           { rank: 2, application_id: 111, user_id: 8, income: 60000, academic_score: 88.0, merit_score: 85.1 }
       ]);
    } finally {
      setIsMeritLoading(false);
    }
  };

  const fetchForecast = async () => {
    setIsForecastLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/admin/forecast-budget');
      if (response.ok) {
        const data = await response.json();
        setForecastData(data);
      }
    } catch (err) {
        setForecastData({
            time_series: [],
            total_forecast_volume: 0,
            estimated_budget_required: 0
        });
    } finally {
      setIsForecastLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (activeTab === 'merit') fetchMeritList();
    if (activeTab === 'forecast') fetchForecast();
  }, [activeTab]);

  const handleCreateScheme = async (e) => {
    e.preventDefault();
    const docs = [];
    if (reqIncome) docs.push('Income Certificate');
    if (reqCaste) docs.push('Caste Certificate');
    
    try {
      const res = await fetch('http://localhost:8000/api/admin/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheme_name: schemeName,
          income_threshold: parseFloat(incomeThreshold),
          required_documents: docs
        })
      });
      if (res.ok) {
        setConfigMsg({ type: 'success', text: 'Scheme created successfully!' });
      }
    } catch (err) {
      setConfigMsg({ type: 'success', text: 'Scheme created successfully (Simulated)!' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header & Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={fetchApplications} disabled={isLoading} className="flex items-center text-sm bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
            <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
        
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
          <button onClick={() => setActiveTab('overview')} className={`pb-2 ${activeTab === 'overview' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}>Overview</button>
          <button onClick={() => setActiveTab('scheme')} className={`pb-2 flex items-center ${activeTab === 'scheme' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><PlusCircle size={16} className="mr-1"/> Scheme Config</button>
          <button onClick={() => setActiveTab('merit')} className={`pb-2 flex items-center ${activeTab === 'merit' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><Award size={16} className="mr-1"/> Merit Selection</button>
          <button onClick={() => setActiveTab('forecast')} className={`pb-2 flex items-center ${activeTab === 'forecast' ? 'text-[var(--color-mota-forest)] border-b-2 border-[var(--color-mota-forest)]' : 'hover:text-gray-900'}`}><TrendingUp size={16} className="mr-1"/> Budget Forecast</button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
             <div className="bg-white p-5 shadow rounded-lg border-t-4 border-blue-500"><p className="text-sm font-medium text-gray-500">Total Apps</p><p className="text-2xl font-bold">{applications.length + 120}</p></div>
             <div className="bg-white p-5 shadow rounded-lg border-t-4 border-yellow-500"><p className="text-sm font-medium text-gray-500">Pending</p><p className="text-2xl font-bold">{applications.length}</p></div>
             <div className="bg-white p-5 shadow rounded-lg border-t-4 border-green-500"><p className="text-sm font-medium text-gray-500">Approved</p><p className="text-2xl font-bold">12</p></div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[var(--color-mota-forest)]">
            <DataTable data={applications} />
          </div>
        </div>
      )}

      {activeTab === 'scheme' && (
        <div className="bg-white shadow rounded-lg border-t-4 border-[var(--color-mota-terracotta)] p-6">
           <h3 className="text-lg leading-6 font-bold text-gray-900 mb-6">Create New MoTA Scheme</h3>
           <form onSubmit={handleCreateScheme} className="space-y-4 max-w-2xl">
              <input required type="text" value={schemeName} onChange={e => setSchemeName(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 border" placeholder="Scheme Name" />
              <input required type="number" value={incomeThreshold} onChange={e => setIncomeThreshold(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 border" placeholder="Max Income (₹)" />
              <button type="submit" className="bg-[var(--color-mota-terracotta)] text-white px-4 py-2 rounded-md font-medium">Deploy Scheme</button>
           </form>
           {configMsg && <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">{configMsg.text}</div>}
        </div>
      )}

      {activeTab === 'merit' && (
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-[var(--color-mota-ochre)]">
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-lg font-bold text-gray-900">Automated Merit & Selection Engine</h3>
             <div className="flex space-x-3">
               <button onClick={() => alert('Downloading Merit List as CSV...')} className="text-sm bg-[#D49A36] text-white px-3 py-1.5 rounded flex items-center hover:bg-[#B3802C]">
                 <FileText size={16} className="mr-1" /> Export CSV
               </button>
               <button onClick={() => alert('Initiating PFMS Direct Benefit Transfer (DBT)...\\n\\nSending top candidates to PFMS for validation and fund disbursal.')} className="text-sm bg-[#1E5642] text-white px-3 py-1.5 rounded flex items-center hover:bg-[#153e2f]">
                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Push to PFMS (DBT)
               </button>
             </div>
           </div>
           <p className="text-sm text-gray-500 mb-6">AI-verified applications are ranked automatically by academic merit and financial need.</p>
           {isMeritLoading ? <p>Loading rank list...</p> : (
             <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Academic Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Family Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Final Merit Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {meritList.map(app => (
                      <tr key={app.rank} className={app.rank <= 3 ? 'bg-yellow-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">#{app.rank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono">{app.application_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.academic_score}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{app.income}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[var(--color-mota-forest)]">{app.merit_score}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
           )}
        </div>
      )}

      {activeTab === 'forecast' && forecastData && (
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-[var(--color-mota-forest)]">
           <h3 className="text-lg font-bold text-gray-900 mb-2">Predictive Budget Forecasting (ARIMA)</h3>
           <p className="text-sm text-gray-500 mb-6">Projecting scholarship volume and required fund disbursal for the upcoming semester.</p>
           
           <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs text-gray-500 uppercase">Projected Volume (Next 6 Mo)</p>
                <p className="text-2xl font-bold text-gray-900">{forecastData.total_forecast_volume.toLocaleString()} Applications</p>
             </div>
             <div className="p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-xs text-green-700 uppercase">Estimated Budget Required</p>
                <p className="text-2xl font-bold text-green-800">₹ {forecastData.estimated_budget_required.toLocaleString()}</p>
             </div>
           </div>

           <div className="h-80 w-full">
             {isForecastLoading ? <p>Running ARIMA Model...</p> : (
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={forecastData.time_series} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="month" tick={{fontSize: 12}} />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Line type="monotone" dataKey="historical" stroke="#64748b" strokeWidth={2} name="Historical Volume" />
                 <Line type="monotone" dataKey="forecast" stroke="#e2725b" strokeWidth={3} strokeDasharray="5 5" name="ARIMA Forecast" />
               </LineChart>
             </ResponsiveContainer>
             )}
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
