import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../Auth/AuthModal';

const AdmissionsHero = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const handleDownloadProspectus = () => {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE0uTS4gVmlkeWEgTWFuZGlyIC0gQWRtaXNzaW9uIFByb3NwZWN0dXMpCi9DcmVhdG9yIChNLk0uIFZpZHlhIE1hbmRpcikKL1Byb2R1Y2VyIChNLk0uIFZpZHlhIE1hbmRpcikKL0NyZWF0aW9uRGF0ZSAoRDoyMDI0MDEwMTEyMDAwMFopCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAzIDAgUgo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzQgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKNCAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDMgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKNSAwIG9iago8PAovTGVuZ3RoIDEwMAo+PgpzdHJlYW0KQlQKcQo3MiA3MjAgVGQKcQovRjEgMTIgVGYKKE0uTS4gVmlkeWEgTWFuZGlyIC0gQWRtaXNzaW9uIFByb3NwZWN0dXMpIFRqClEKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDE4NCAwMDAwMCBuIAowMDAwMDAwMjMxIDAwMDAwIG4gCjAwMDAwMDAyODggMDAwMDAgbiAKMDAwMDAwMDM4NSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMiAwIFIKPj4Kc3RhcnR4cmVmCjUzNQolJUVPRg==';
    link.download = 'MM-Vidya-Mandir-Prospectus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <section className="py-20 bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Admissions Open
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Join our school family and give your child the best foundation for their educational journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setActiveModal("signup")}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Apply Now
          </button>
          <button 
            onClick={handleDownloadProspectus}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Download Prospectus
          </button>
        </div>
      </div>
    </section>

    {activeModal && (
      <AuthModal
        activeModal="signup"
        onClose={() => setActiveModal(null)}
      />
    )}
    </>
  );
};

export default AdmissionsHero;
