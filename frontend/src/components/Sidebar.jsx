import React from 'react';
import { LayoutDashboard, FileText, UploadCloud, Activity, AlertTriangle, Building2, ShieldCheck, BarChart3, LogOut, CheckSquare, Sliders, Activity } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const safeDecode = (key, fallback) => {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    try { return atob(val); } catch (e) { return val; }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const userRole = safeDecode('_sch_role', 'STUDENT');
  
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
        const urlParams = new URLSearchParams(location.search);
        const itemParams = new URLSearchParams(item.path.split('?')[1] || '');
        const currentTab = urlParams.get('tab') || (location.pathname.startsWith('/admin') || location.pathname.startsWith('/officer') ? 'analytics' : null);
        const itemTab = itemParams.get('tab') || (item.path.startsWith('/admin') || item.path.startsWith('/officer') ? 'analytics' : null);
        
        const isPathMatch = location.pathname === item.path.split('?')[0];
        const isTabMatch = currentTab === itemTab;
        const isActive = isPathMatch && isTabMatch;

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

      {userRole === 'MINISTRY' && (
        <>
          <div className="p-4 bg-[#0a1520] border-b border-gray-700">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Ministry Menu</p>
          </div>
          <div className="py-2 flex-grow">
            {renderLinks([
              { name: 'Executive Analytics', path: '/admin?tab=analytics', icon: <Activity size={18} /> },
              { name: 'Application Verification', path: '/admin?tab=verification', icon: <CheckSquare size={18} /> },
              { name: 'Dynamic Rule Engine', path: '/admin?tab=rules', icon: <Sliders size={18} /> },
              { name: 'Audit Logs & Appeals', path: '/admin?tab=audit', icon: <FileText size={18} /> },
              { name: 'Merit List Generation', path: '/admin?tab=merit', icon: <FileText size={18} /> }
            ])}
          </div>
        </>
      )}
      
      {userRole === 'OFFICER' && (
        <>
          <div className="p-4 bg-[#0a1520] border-b border-gray-700">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Nodal Officer Menu</p>
          </div>
          <div className="py-2 flex-grow">
            {renderLinks([
              { name: 'Analytics', path: '/officer?tab=analytics', icon: <Activity size={18} /> },
              { name: 'Application Verification', path: '/officer?tab=verification', icon: <CheckSquare size={18} /> },
              { name: 'Audit Logs & Appeals', path: '/officer?tab=audit', icon: <FileText size={18} /> }
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
