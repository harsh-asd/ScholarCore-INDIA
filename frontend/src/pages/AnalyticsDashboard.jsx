import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FileText, Clock, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1'];

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/analytics-summary');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        // Fallback mock data
        console.warn('Backend API not reachable, using mock analytics data.');
        setTimeout(() => {
          setData({
            summary: {
              totalApps: 145,
              pending: 34,
              approved: 92,
              rejected: 19
            },
            statusDistribution: [
              { name: 'Approved', value: 92 },
              { name: 'Pending Review', value: 34 },
              { name: 'Rejected', value: 19 }
            ],
            schemeVolume: [
              { name: 'Software Engineer', volume: 65 },
              { name: 'Data Scientist', volume: 30 },
              { name: 'Product Manager', volume: 25 },
              { name: 'UI/UX Designer', volume: 25 }
            ]
          });
          setIsLoading(false);
        }, 800);
        return;
      }
    } catch (err) {
      setError("Failed to load analytics data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  
  if (error && !data) {
    return <div className="p-8 text-red-600 font-bold">{error}</div>;
  }

  if (!data) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <RefreshCcw className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Apps</dt>
                <dd className="text-2xl font-bold text-gray-900">{data.summary.totalApps}</dd>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd className="text-2xl font-bold text-gray-900">{data.summary.pending}</dd>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
                <dd className="text-2xl font-bold text-gray-900">{data.summary.approved}</dd>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                <dd className="text-2xl font-bold text-gray-900">{data.summary.rejected}</dd>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Application Status Distribution</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Application Volume by Scheme</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.schemeVolume} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="volume" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;
