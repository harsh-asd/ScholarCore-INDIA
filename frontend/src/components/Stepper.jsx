import React from 'react';
import { Check, Clock, X, AlertCircle } from 'lucide-react';

const Stepper = ({ currentStep, status }) => {
  const steps = [
    "App Submitted",
    "INO Verified",
    "DNO/SNO Verified",
    "MoTA Approved",
    "PFMS Validation",
    "DBT Disbursal"
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
        
        {steps.map((step, index) => {
          let stepStatus = 'pending'; // pending, current, completed, rejected, review
          if (index < currentStep) stepStatus = 'completed';
          if (index === currentStep) {
             if (status === 'REJECTED') stepStatus = 'rejected';
             else if (status === 'MANUAL_REVIEW') stepStatus = 'review';
             else if (status === 'LOADING') stepStatus = 'loading';
             else stepStatus = 'current';
          }

          let bgColor = 'bg-gray-200';
          let textColor = 'text-gray-500';
          let icon = <div className="w-3 h-3 rounded-full bg-gray-400"></div>;

          if (stepStatus === 'completed') {
            bgColor = 'bg-green-500';
            textColor = 'text-green-600 font-semibold';
            icon = <Check size={16} className="text-white" />;
          } else if (stepStatus === 'current' || stepStatus === 'loading') {
            bgColor = 'bg-blue-600 border-4 border-blue-200';
            textColor = 'text-blue-700 font-bold';
            icon = stepStatus === 'loading' ? <Clock size={16} className="text-white animate-spin" /> : <Clock size={16} className="text-white" />;
          } else if (stepStatus === 'rejected') {
            bgColor = 'bg-red-500';
            textColor = 'text-red-600 font-bold';
            icon = <X size={16} className="text-white" />;
          } else if (stepStatus === 'review') {
            bgColor = 'bg-yellow-500';
            textColor = 'text-yellow-700 font-bold';
            icon = <AlertCircle size={16} className="text-white" />;
          }

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor} shadow-sm transition-all duration-300`}>
                {icon}
              </div>
              <p className={`mt-3 text-xs text-center w-24 ${textColor}`}>{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
