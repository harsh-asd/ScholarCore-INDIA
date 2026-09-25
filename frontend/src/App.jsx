import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import TopBar from './components/TopBar';
import GoiHeader from './components/GoiHeader';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ApplicantDashboard from './pages/ApplicantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import InstituteDashboard from './pages/InstituteDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ApplicationForm from './pages/ApplicationForm';
import SchemeSelection from './pages/SchemeSelection';
import DocumentVault from './pages/DocumentVault';
import ApplicationStatus from './pages/ApplicationStatus';
import Grievances from './pages/Grievances';

import { LanguageProvider } from './LanguageContext';
import { AccessibilityProvider } from './AccessibilityContext';

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
    <AccessibilityProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-[#F4F5F7] font-sans text-gray-900 flex flex-col">
        <TopBar />
        <GoiHeader />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/application" element={<ApplicationForm />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/applicant" element={<ApplicantDashboard />} />
            <Route path="/applicant/schemes" element={<SchemeSelection />} />
            <Route path="/applicant/documents" element={<DocumentVault />} />
            <Route path="/applicant/status" element={<ApplicationStatus />} />
            <Route path="/applicant/grievances" element={<Grievances />} />
            
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
            <Route path="/institute" element={<InstituteDashboard />} />
          </Route>
        </Routes>
        
          </div>
        </Router>
      </LanguageProvider>
    </AccessibilityProvider>
  );
}

export default App;
