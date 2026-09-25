import React from 'react';
import { LayoutDashboard, FileText, UploadCloud, Activity, AlertTriangle, Building2, ShieldCheck, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const applicantItems = [
    { name: 'Dashboard', path: '/applicant', icon: <LayoutDashboard size={18} /> },
    { name: 'Scheme Selection', path: '/applicant/schemes', icon: <FileText size={18} /> },
    { name: 'Document Vault', path: '/applicant/documents', icon: <UploadCloud size={18} /> },
    { name: 'Application Status', path: '/applicant/status', icon: <Activity size={18} /> },
    { name: 'Grievances', path: '/applicant/grievances', icon: <AlertTriangle size={18} /> },
  ];

  const renderLinks = (items) => (
    <ul>
      {items.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center space-x-3 px-6 py-3 border-l-4 transition-colors ${
                isActive 
                  ? 'bg-[#1a334d] border-[#FF9933] text-white' 
                  : 'border-transparent text-gray-300 hover:bg-[#1a334d] hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="w-64 bg-[#112233] text-white min-h-screen flex flex-col shadow-lg overflow-y-auto">
      <div className="p-4 bg-[#0a1520] border-b border-gray-700">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Applicant Menu</p>
      </div>
      <div className="py-2">
        {renderLinks(applicantItems)}
      </div>

      <div className="p-4 bg-[#0a1520] border-y border-gray-700 mt-2">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Institute (INO) Menu</p>
      </div>
      <div className="py-2">
        {renderLinks([{ name: 'Institute Verification', path: '/institute', icon: <Building2 size={18} /> }])}
      </div>

      <div className="p-4 bg-[#0a1520] border-y border-gray-700 mt-2">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Ministry (Admin) Menu</p>
      </div>
      <div className="py-2 mb-4">
        {renderLinks([
          { name: 'MoTA Dashboard', path: '/admin', icon: <ShieldCheck size={18} /> }
        ])}
      </div>
    </div>
  );
};

export default Sidebar;
