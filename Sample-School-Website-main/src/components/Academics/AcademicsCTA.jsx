import React from 'react';
import { useNavigate } from 'react-router-dom';

const AcademicsCTA = () => {
  const navigate = useNavigate();

  const handleDownloadBrochure = () => {
    // Create a simple brochure PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE0uTS4gVmlkeWEgTWFuZGlyIC0gU2Nob29sIEJyb2NodXJlKQovQ3JlYXRvciAoTS5NLiBWaWR5YSBNYW5kaXIpCi9Qcm9kdWNlciAoTS5NLiBWaWR5YSBNYW5kaXIpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAxMDExMjAwMDBaKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFs0IDAgUl0KL0NvdW50IDEKPT4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA5MAo+PgpzdHJlYW0KQlQKcQo3MiA3MjAgVGQKcQovRjEgMTIgVGYKKE0uTS4gVmlkeWEgTWFuZGlyIC0gU2Nob29sIEJyb2NodXJlKSBUagpRCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxNjQgMDAwMDAgbiAKMDAwMDAwMDIxMSAwMDAwMCBuIAowMDAwMDAwMjY4IDAwMDAwIG4gCjAwMDAwMDAzNjUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDIgMCBSCj4+CnN0YXJ0eHJlZgo1MTUKKSVFT0Y=';
    link.download = 'MM-Vidya-Mandir-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="py-20 bg-linear-to-br from-amber-400 to-amber-600">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Explore Our Academic Program?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Schedule a visit to see our curriculum in action and meet our dedicated teachers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Schedule Campus Visit
          </button>
          <button 
            onClick={handleDownloadBrochure}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
};

export default AcademicsCTA;
