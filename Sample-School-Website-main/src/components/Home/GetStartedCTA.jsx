import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, FaGraduationCap, FaSchool, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthModal from '../Auth/AuthModal';

const GetStartedCTA = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
    <section id="cta-section" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards your child's bright future. Join our school community today!
          </p>
        </div>

        {/* Main CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 px-2 sm:px-0">
          {/* Admission Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3">Start Admission Process</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Begin your child's educational journey with us. Simple application process with guidance at every step.
              </p>
            </div>
            
            <div className="space-y-2 sm:space-y-3 mb-6">
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                <span>Online application form</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                <span>Document verification</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                <span>School tour & interaction</span>
              </div>
            </div>

            <Link 
            to="/admissions"
            className="w-full bg-amber-600 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Apply now
          </Link>
          </div>

          {/* Visit Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSchool className="text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3">Schedule a Visit</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Experience our campus firsthand. Meet our teachers and see our facilities in action.
              </p>
            </div>
            
            <div className="space-y-2 sm:space-y-3 mb-6">
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                <span>Campus tour with guide</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                <span>Meet with principal</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                <span>Classroom observation</span>
              </div>
            </div>

            <button 
              onClick={() => {
                // Scroll to contact section or open contact modal
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If no contact section, you could open a contact modal or redirect
                  window.location.href = '/contact';
                }
              }}
              className="w-full bg-amber-600 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaCalendarAlt className="w-3 sm:w-4 h-3 sm:h-4" />
              Book a Visit
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-12 shadow-lg border border-gray-100 mx-2 sm:mx-0">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">Get in Touch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-xs sm:text-sm text-gray-600">+91 98765 43210</p>
              <p className="text-xs sm:text-sm text-gray-600">+91 87654 32109</p>
            </div>
            
            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Email Us</h4>
              <p className="text-xs sm:text-sm text-gray-600">info@mmvidyamandir.edu.in</p>
              <p className="text-xs sm:text-sm text-gray-600">admissions@mmvidyamandir.edu.in</p>
            </div>
            
            <div className="text-center">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-xs sm:text-sm text-gray-600">123 Education Street</p>
              <p className="text-xs sm:text-sm text-gray-600">Pune, Maharashtra 411001</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-0">
          <button
            onClick={() => setActiveModal("signup")}
            className="bg-amber-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-amber-700 transition-colors duration-200 text-center cursor-pointer"
          >
            Get Started
          </button>
          <Link 
            to="/contact"
            className="border-2 border-amber-600 text-amber-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-amber-600 hover:text-white transition-colors duration-200 text-center"
          >
            Contact Us
          </Link>
          <Link 
            to="/about"
            className="border-2 border-amber-600 text-amber-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-amber-600 hover:text-white transition-colors duration-200 text-center"
          >
            Learn More
          </Link>
          <Link 
            to="/gallery"
            className="border-2 border-amber-600 text-amber-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-amber-600 hover:text-white transition-colors duration-200 text-center"
          >
            View Gallery
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-gray-600 text-xs sm:text-sm md:text-lg">
            <FaStar className="inline mr-1 sm:mr-2" /> Join over 500 families who have chosen excellence for their children's education <FaStar className="inline ml-1 sm:ml-2" />
          </p>
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

export default GetStartedCTA;