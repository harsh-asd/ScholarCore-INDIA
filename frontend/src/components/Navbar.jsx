import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-indigo-600 border-b border-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold text-xl">
              SIH Dashboard
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/applicant"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/applicant' 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  Applicant View
                </Link>
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/admin' 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  Admin View
                </Link>
                <Link
                  to="/admin/analytics"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/admin/analytics' 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  Analytics
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 text-white text-sm">
              <span className="mr-2">Demo User</span>
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-indigo-900 font-bold">
                DU
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
