import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';

const AdmissionsCTA = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartApplication = () => {
    if (user) {
      // If user is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, show signup modal
      setActiveModal("signup");
    }
  };

  return (
    <>
    <section className="py-20 bg-linear-to-br from-amber-400 to-amber-600">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Begin Your Child's Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Take the first step towards your child's bright future. Our admission team is ready to help you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleStartApplication}
            className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {user ? 'Go to Dashboard' : 'Start Application'}
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Schedule Visit
          </button>
          <button 
            onClick={() => window.open('tel:+919876543210')}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Call Us Now
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

export default AdmissionsCTA;
