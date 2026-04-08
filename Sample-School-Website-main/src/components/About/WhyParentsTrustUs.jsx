import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthModal from '../Auth/AuthModal';

const WhyParentsTrustUs = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    <section className="py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-amber-50 rounded-3xl p-10 md:p-14
                      shadow-xl border border-amber-200 text-center">

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
          Building Trust Through Education
        </h2>

        <div className="mx-auto mt-4 h-1 w-20 bg-linear-to-r from-amber-400 to-amber-600 rounded-full"></div>

        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          Years of trust, dedicated educators, a nurturing environment, and
          consistent academic excellence make M.M. Vidya Mandir a preferred
          choice for parents.
        </p>

        <button
          onClick={() => setActiveModal("signup")}
          className="mt-8 bg-amber-500 text-black px-10 py-3 rounded-full
                     font-semibold shadow-md
                     hover:shadow-xl hover:scale-105
                     transition-all duration-300 cursor-pointer"
        >
          Join Our School
        </button>
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

export default WhyParentsTrustUs;
