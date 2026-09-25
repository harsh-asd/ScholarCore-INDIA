import React, { useState } from 'react';
import { AlertTriangle, Send, MessageCircle } from 'lucide-react';

const Grievances = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 flex gap-6 items-start">
      
      {/* Grievance Form */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-t-4 border-red-600">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6"><AlertTriangle className="mr-2 text-red-600" /> Lodge a Grievance</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
             <label className="block text-sm font-medium text-gray-700">Application ID</label>
             <input type="text" disabled defaultValue="MoTA-2026-892" className="mt-1 w-full border border-gray-300 rounded p-2 bg-gray-50" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Category of Grievance</label>
             <select required className="mt-1 w-full border border-gray-300 rounded p-2 focus:ring-red-500">
               <option value="">Select Category</option>
               <option>Delay in Verification (Institute Level)</option>
               <option>Delay in Verification (District/State Level)</option>
               <option>Disbursement Failed / Pending</option>
               <option>Document Upload Issue</option>
               <option>Other Technical Issue</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Description</label>
             <textarea required rows="4" className="mt-1 w-full border border-gray-300 rounded p-2 focus:ring-red-500" placeholder="Please describe your issue in detail..."></textarea>
           </div>
           {submitted && <div className="p-3 bg-green-50 text-green-800 rounded text-sm font-bold">Grievance submitted successfully. Ticket ID: GR-9921</div>}
           <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded font-bold flex items-center hover:bg-red-700">
             <Send size={16} className="mr-2" /> Submit Grievance
           </button>
        </form>
      </div>

      {/* Past Grievances */}
      <div className="w-1/3 space-y-4">
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
           <h3 className="font-bold text-gray-800 border-b pb-2 mb-4 flex items-center"><MessageCircle size={18} className="mr-2"/> Past Tickets</h3>
           <div className="space-y-3">
              <div className="p-3 border border-gray-100 bg-gray-50 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-800">GR-8812</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Resolved</span>
                </div>
                <p className="text-xs text-gray-600 truncate">Document upload issue with Income Cert...</p>
                <span className="text-[10px] text-gray-400 mt-2 block">10-Oct-2026</span>
              </div>
              <div className="p-3 border border-gray-100 bg-gray-50 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-800">GR-9921</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">In Progress</span>
                </div>
                <p className="text-xs text-gray-600 truncate">Delay in Institute Verification...</p>
                <span className="text-[10px] text-gray-400 mt-2 block">Today</span>
              </div>
           </div>
         </div>
      </div>

    </div>
  );
};

export default Grievances;
