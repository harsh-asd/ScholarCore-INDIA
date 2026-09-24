import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import TopBar from './components/TopBar';
import GoiHeader from './components/GoiHeader';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ApplicantDashboard from './pages/ApplicantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

const DashboardLayout = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6 bg-[#F4F5F7]">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
        <TopBar />
        <GoiHeader />
        
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/applicant" element={<ApplicantDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          </Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
