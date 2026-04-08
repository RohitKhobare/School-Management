import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaHeart, FaTrophy, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PrincipalMessage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-6 md:px-16 bg-linear-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <span className="inline-flex items-center gap-2 mb-4 text-xs tracking-widest font-semibold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            LEADERSHIP MESSAGE
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            A Message from Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Principal</span>
          </h2>
          
          <div className="h-1 w-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - IMAGE */}
          <div className={`relative transition-all duration-700 delay-200 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            {/* Main Image Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-20"></div>
              
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                <img
                  src="https://news.globalindianschool.org/content/thumbnail/Ms-Vandana-Midha_FI1x.jpg"
                  alt="Principal Mrs. Sunita Sharma"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-linear-to-br from-amber-400 to-orange-500 text-white p-4 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold">15+</div>
                    <div className="text-xs">Years</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-amber-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Available for Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CONTENT */}
          <div className={`transition-all duration-700 delay-400 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-amber-100">
              {/* Quote Icon */}
              <div className="mb-6">
                <svg className="w-12 h-12 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              {/* Message */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "At M.M. Vidya Mandir, education goes beyond textbooks. We nurture character, confidence, and curiosity. Every child is encouraged to explore, learn, and grow in a safe and joyful environment. Our commitment is to develop not just academic excellence, but also strong moral values that will guide our students throughout their lives."
              </blockquote>
              
              {/* Principal Info */}
              <div className="border-t border-amber-100 pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mrs. Sunita Sharma
                </h3>
                <p className="text-amber-600 font-semibold mb-4">
                  Principal & Educational Leader
                </p>
                
                {/* Credentials */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>M.Ed in Educational Leadership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>15+ Years in Primary Education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>Child Psychology Specialist</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Button */}
              <div className="mt-8">
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>Schedule a Meeting</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Achievement Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-600 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {[
            { number: "500+", label: "Students Mentored", icon: FaGraduationCap },
            { number: "98%", label: "Parent Satisfaction", icon: FaHeart },
            { number: "15+", label: "Awards Received", icon: FaTrophy },
            { number: "100%", label: "Success Stories", icon: FaStar }
          ].map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-amber-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-2xl mb-2">{React.createElement(stat.icon, { className: 'text-2xl' })}</div>
              <div className="text-2xl font-bold text-amber-600 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;