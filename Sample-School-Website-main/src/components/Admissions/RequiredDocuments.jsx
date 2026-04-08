import React from 'react';
import { FaCheckCircle, FaDownload, FaClipboard } from 'react-icons/fa';

const RequiredDocuments = () => {
  const requiredDocuments = [
    "Birth Certificate (Original + 2 copies)",
    "Previous School Transfer Certificate (if applicable)",
    "Previous School Report Card/Progress Report",
    "Address Proof (Utility bill/Rent agreement)",
    "Parent's ID Proof (Aadhar/Passport/Driving License)",
    "Medical Certificate from registered doctor",
    "Recent passport size photographs (4 copies)",
    "Caste Certificate (if applicable for reservation)"
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Required <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Documents
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Please ensure you have all the necessary documents ready for a smooth admission process.
            </p>
            
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button 
                onClick={() => {
                  const content = `M.M. VIDYA MANDIR - DOCUMENT CHECKLIST\n\nRequired Documents for Admission:\n\n1. Birth Certificate (Original + 2 copies)\n2. Previous School Transfer Certificate (if applicable)\n3. Previous School Report Card/Progress Report\n4. Address Proof (Utility bill/Rent agreement)\n5. Parent's ID Proof (Aadhar/Passport/Driving License)\n6. Medical Certificate from registered doctor\n7. Recent passport size photographs (4 copies)\n8. Caste Certificate (if applicable for reservation)\n\nNote: Please bring original documents for verification along with photocopies.\n\nContact: +91 98765 43210\nEmail: admissions@mmvidyamandir.edu.in`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'MM-Vidya-Mandir-Document-Checklist.txt';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(link.href);
                }}
                className="bg-linear-to-r from-amber-400 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FaDownload className="w-4 h-4" />
                Download Document Checklist
              </button>
            </div>
          </div>

          <div className="bg-linear-to-br from-amber-100 to-amber-200 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4"><FaClipboard className="w-24 h-24 mx-auto text-amber-600" /></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Document Verification</h3>
              <p className="text-gray-600">Quick and easy process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequiredDocuments;
