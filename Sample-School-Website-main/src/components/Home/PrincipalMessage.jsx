import React from 'react';
import { FaQuoteLeft, FaQuoteRight, FaBook, FaAward, FaStar, FaHeart, FaRocket, FaChalkboardTeacher } from 'react-icons/fa';

const PrincipalMessage = () => {
  return (
    <section className="py-20 bg-linear-to-br from-amber-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold section-heading mb-6 whitespace-nowrap">
            <span className="inline-block">Message from Our</span>
            <span className="inline-block ml-3 md:ml-4 bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Principal
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Principal Image */}
          <div className="relative">
            <div className="relative">
              <div className="w-72 h-72 mx-auto bg-linear-to-br from-amber-100 to-amber-200 rounded-md flex items-center justify-center shadow-2xl">
                <div className="w-65 h-65 bg-linear-to-br from-gray-200 to-gray-300 rounded- flex items-center justify-center overflow-hidden ring-4 ring-white">
                  <img
                    src="https://news.globalindianschool.org/content/thumbnail/Ms-Vandana-Midha_FI1x.jpg"
                    alt="Mrs. Priya Sharma, Principal"
                    className="w-72 h-72 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-amber-300 rounded-full opacity-50 animate-bounce"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-amber-400 rounded-full opacity-30 animate-ping"></div>
          </div>

          {/* Message Content */}
          <div className="space-y-8">
            <div className="relative">
              <FaQuoteLeft className="absolute -top-4 -left-4 text-4xl text-amber-400 opacity-50" />
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
                <p className="lead text-gray-700 mb-6">
                  Welcome to M.M. Vidya Mandir Primary School, where every child's journey begins with endless possibilities. 
                  As an educator with over 20 years of experience, I believe that education is not just about academic excellence, 
                  but about nurturing the whole child.
                </p>
                <p className="lead text-gray-700 mb-6">
                  Our dedicated team of teachers and staff work tirelessly to create an environment where children feel safe, 
                  valued, and inspired to reach their full potential. We celebrate each child's unique talents and guide them 
                  to become confident, compassionate, and responsible citizens.
                </p>
                <p className="lead text-gray-700">
                  I invite you to join our school family and witness the transformation that quality education can bring to 
                  your child's life. Together, we will build a foundation for lifelong learning and success.
                </p>
              </div>
              <FaQuoteRight className="absolute -bottom-4 -right-4 text-4xl text-amber-400 opacity-50" />
            </div>

            {/* Principal Info */}
            <div className="text-center lg:text-left">
              <div className="bg-linear-to-r from-amber-400 to-amber-600 p-6 rounded-2xl text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Mrs. Priya Sharma</h3>
                <p className="text-base md:text-lg opacity-90 mb-4">Principal, M.M. Vidya Mandir Primary School</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <FaBook className="text-sm opacity-90 mr-2" />
                    <span className="text-sm opacity-90">M.Ed, B.Ed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaAward className="text-sm opacity-90 mr-2" />
                    <span className="text-sm opacity-90">20+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left">
              <button 
                onClick={() => {
                  const ctaSection = document.getElementById('cta-section');
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-amber-600 border-2 border-amber-400 cursor-pointer px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Schedule a Meeting with Principal
              </button>
            </div>
          </div>
        </div>

        {/* School Values */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-4"><FaStar className="w-10 h-10 text-amber-500 mx-auto" /></div>
            <h3 className="text-xl md:text-xl font-semibold text-gray-800 mb-3">Excellence</h3>
            <p className="text-sm md:text-base text-gray-600">Striving for the highest standards in everything we do.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4"><FaHeart className="w-8 h-8 text-rose-500 mx-auto" /></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compassion</h3>
            <p className="text-gray-600">Caring for each child with understanding and empathy.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4"><FaRocket className="w-8 h-8 text-sky-500 mx-auto" /></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">Embracing new methods and technologies for better learning.</p>
          </div> 
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;