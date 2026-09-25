import React from 'react';
import { UploadCloud, CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';

const DocumentVault = () => {
  const documents = [
    { name: 'Income Certificate', status: 'VERIFIED', uploadDate: '12-Oct-2023', remarks: 'OCR Confidence: 95%' },
    { name: 'Caste Certificate (ST)', status: 'VERIFIED', uploadDate: '12-Oct-2023', remarks: 'Verified via DigiLocker API' },
    { name: 'Previous Academic Marksheet', status: 'PENDING', uploadDate: '15-Oct-2023', remarks: 'Awaiting Nodal Officer Approval' },
    { name: 'Aadhaar Card', status: 'VERIFIED', uploadDate: '10-Oct-2023', remarks: 'E-KYC Completed' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-t-4 border-[var(--color-mota-forest)]">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><UploadCloud className="mr-2 text-[var(--color-mota-forest)]" /> Document Vault</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and view all your uploaded and digitally verified certificates.</p>
          </div>
          <button className="bg-[var(--color-mota-forest)] text-white px-4 py-2 rounded text-sm font-bold shadow flex items-center">
            <UploadCloud size={16} className="mr-2" /> Upload New Document
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-5 flex items-start space-x-4 hover:shadow-md transition bg-gray-50">
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
                <FileText size={24} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{doc.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</span>
                  {doc.status === 'VERIFIED' ? (
                    <span className="flex items-center text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                      <CheckCircle size={12} className="mr-1"/> VERIFIED
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                      <AlertTriangle size={12} className="mr-1"/> PENDING
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">{doc.remarks}</p>
              </div>
              <button className="text-gray-400 hover:text-blue-600">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentVault;
