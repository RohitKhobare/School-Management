import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../Auth/AuthModal';

const GalleryCTA = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    <section className="py-20 bg-linear-to-br from-amber-400 to-amber-600">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Want to Be Part of These Memories?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join our school community and create lasting memories with us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Schedule a Visit
          </button>
          <button 
            onClick={() => navigate('/admissions')}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Apply for Admission
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

export default GalleryCTA;
