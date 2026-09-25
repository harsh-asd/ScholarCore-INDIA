import React from 'react';
import { Eye, Check, X } from 'lucide-react';

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Forgery Check</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Reason</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => {
            const isManualReview = item.status === 'MANUAL_REVIEW' || item.status === 'Under Review';
            
            return (
              <tr key={item.id} className={isManualReview ? 'bg-yellow-50 hover:bg-yellow-100' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Pending Review' ? 'bg-gray-100 text-gray-800' :
                    isManualReview ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="px-2 py-1 inline-flex text-[10px] uppercase font-bold tracking-wider rounded border border-green-300 bg-green-50 text-green-700">
                     Passed
                   </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                  {item.reason ? (
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
                      {item.reason}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900" title="View">
                    <Eye className="w-5 h-5 inline" />
                  </button>
                  <button className="text-green-600 hover:text-green-900" title="Approve">
                    <Check className="w-5 h-5 inline" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" title="Reject">
                    <X className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
