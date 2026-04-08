import React from 'react';
import { FaUsers, FaGraduationCap, FaTrophy, FaHeart, FaPaintBrush, FaRunning, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  const stats = [
    { icon: FaUsers, number: "500+", label: "Happy Students" },
    { icon: FaGraduationCap, number: "50+", label: "Expert Teachers" },
    { icon: FaTrophy, number: "25+", label: "Awards Won" },
    { icon: FaHeart, number: "15+", label: "Years of Excellence" }
  ];

  return (
    <section id="about-section" className="py-20 bg-linear-to-br from-white via-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
            
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                About Our <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  School
                </span>
              </h2>
            
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                M.M. Vidya Mandir Primary School has been a beacon of educational excellence 
                for over 15 years. We believe in nurturing not just academic brilliance, 
                but also character, creativity, and compassion in every child.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our holistic approach to education ensures that each student develops 
                into a confident, capable, and caring individual ready to make a positive 
                impact on the world.
              </p>
            </div>

            <Link 
              to="/about"
              className="inline-flex items-center bg-linear-to-r from-amber-400 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Learn More About Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaPaintBrush className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Creative Learning</h3>
            <p className="text-gray-600">Fostering creativity through art, music, and innovative teaching methods.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaRunning className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sports & Fitness</h3>
            <p className="text-gray-600">Promoting physical wellness through various sports and fitness activities.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaStar className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Character Building</h3>
            <p className="text-gray-600">Developing strong moral values and leadership qualities in every student.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;