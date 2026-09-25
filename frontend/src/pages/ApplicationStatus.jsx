import React from 'react';
import { Activity, Check, Clock } from 'lucide-react';

const ApplicationStatus = () => {
  const steps = [
    { title: 'Application Submitted', desc: 'You successfully submitted the application.', date: '15-Oct-2026', status: 'completed' },
    { title: 'AI Scrutiny & Verification', desc: 'Documents processed via OCR Rule Engine.', date: '15-Oct-2026', status: 'completed' },
    { title: 'Institute Nodal Officer (INO)', desc: 'Pending verification at institute level.', date: 'Pending', status: 'current' },
    { title: 'District Nodal Officer (DNO)', desc: 'Pending verification at district level.', date: '-', status: 'upcoming' },
    { title: 'State Nodal Officer (SNO)', desc: 'Pending verification at state level.', date: '-', status: 'upcoming' },
    { title: 'Ministry (MoTA) Approval', desc: 'Final merit list generation.', date: '-', status: 'upcoming' },
    { title: 'PFMS Disbursal', desc: 'Funds transferred to Aadhaar seeded account.', date: '-', status: 'upcoming' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6"><Activity className="mr-2 text-blue-600" /> Application Status Tracker</h2>
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-8">
           <p className="font-semibold text-blue-900">Application ID: MoTA-2026-892</p>
           <p className="text-sm text-blue-700">Scheme: National Fellowship for ST</p>
        </div>

        <div className="relative border-l-4 border-gray-200 ml-6 space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-8">
              {step.status === 'completed' ? (
                <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow">
                  <Check size={12} className="text-white" />
                </div>
              ) : step.status === 'current' ? (
                <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center shadow animate-pulse">
                  <Clock size={12} className="text-white" />
                </div>
              ) : (
                <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-white shadow"></div>
              )}
              
              <div>
                <h4 className={`font-bold text-lg ${step.status === 'completed' ? 'text-gray-900' : step.status === 'current' ? 'text-blue-700' : 'text-gray-500'}`}>
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                <span className="text-xs font-semibold text-gray-400 mt-2 block">{step.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
