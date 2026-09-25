import React from 'react';
import { LayoutDashboard, FileText, UploadCloud, Activity, AlertTriangle, Building2, ShieldCheck, BarChart3, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('_sch_role') ? atob(localStorage.getItem('_sch_role')) : 'STUDENT';
  
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

  const handleLogout = () => {
    localStorage.removeItem('_sch_role'); localStorage.removeItem('_sch_name');
    navigate('/');
  };

  return (
    <div className="w-64 bg-[#112233] text-white min-h-screen flex flex-col shadow-lg overflow-y-auto">
      
      {userRole === 'STUDENT' && (
        <>
          <div className="p-4 bg-[#0a1520] border-b border-gray-700">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Applicant Menu</p>
          </div>
          <div className="py-2 flex-grow">
            {renderLinks(applicantItems)}
          </div>
        </>
      )}

      {userRole === 'INSTITUTE' && (
        <>
          <div className="p-4 bg-[#0a1520] border-b border-gray-700">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Institute (INO) Menu</p>
          </div>
          <div className="py-2 flex-grow">
            {renderLinks([{ name: 'Institute Verification', path: '/institute', icon: <Building2 size={18} /> }])}
          </div>
        </>
      )}

      {(userRole === 'MINISTRY' || userRole === 'OFFICER' || userRole === 'ADMIN') && (
        <>
          <div className="p-4 bg-[#0a1520] border-b border-gray-700">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Ministry Menu</p>
          </div>
          <div className="py-2 flex-grow">
            {renderLinks([
              { name: 'MoTA Dashboard', path: '/admin', icon: <ShieldCheck size={18} /> }
            ])}
          </div>
        </>
      )}

      {/* Global Logout Button at the bottom */}
      <div className="p-4 bg-[#0a1520] border-t border-gray-700 mt-auto">
        <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-2 py-2 text-red-400 hover:text-red-300 transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Secure Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
