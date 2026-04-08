import React from 'react';
import { useNavigate } from 'react-router-dom';

const AcademicsHero = () => {
  const navigate = useNavigate();

  const handleDownloadCurriculum = () => {
    // Create a simple curriculum PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE0uTS4gVmlkeWEgTWFuZGlyIC0gQ3VycmljdWx1bSBPdmVydmlldykKL0NyZWF0b3IgKE0uTS4gVmlkeWEgTWFuZGlyKQovUHJvZHVjZXIgKE0uTS4gVmlkeWEgTWFuZGlyKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMTAxMTIwMDAwWikKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbNCAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggMTAwCj4+CnN0cmVhbQpCVApxCjcyIDcyMCBUZApxCi9GMSAxMiBUZgooTS5NLiBWaWR5YSBNYW5kaXIgLSBDdXJyaWN1bHVtIE92ZXJ2aWV3KSBUagpRCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxNzQgMDAwMDAgbiAKMDAwMDAwMDIyMSAwMDAwMCBuIAowMDAwMDAwMjc4IDAwMDAwIG4gCjAwMDAwMDAzNzUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDIgMCBSCj4+CnN0YXJ0eHJlZgo1MjUKJSVFT0Y=';
    link.download = 'MM-Vidya-Mandir-Curriculum.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="py-20 bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our Academic Program
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Comprehensive curriculum designed to nurture young minds and build strong foundations for lifelong learning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleDownloadCurriculum}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Download Curriculum
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Schedule Visit
          </button>
        </div>
      </div>
    </section>
  );
};

export default AcademicsHero;
