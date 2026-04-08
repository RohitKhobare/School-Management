import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaLock, FaMagic, FaLeaf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const values = [
  { 
    icon: FaGraduationCap, 
    title: "Quality Education", 
    desc: "Strong academic foundation with innovative teaching methods",
    color: "from-blue-400 to-blue-600"
  },
  { 
    icon: FaLock, 
    title: "Child Safety", 
    desc: "Secure, caring environment with 24/7 supervision",
    color: "from-green-400 to-green-600"
  },
  { 
    icon: FaMagic, 
    title: "Discipline & Values", 
    desc: "Character building through moral education and ethics",
    color: "from-purple-400 to-purple-600"
  },
  { 
    icon: FaLeaf, 
    title: "Holistic Growth", 
    desc: "Complete development of mind, body, and spirit",
    color: "from-amber-400 to-orange-600"
  },
];

const OurValues = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 md:px-16 bg-linear-to-br from-gray-50 to-amber-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-400 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <span className="inline-flex items-center gap-2 mb-4 text-xs tracking-widest font-semibold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            CORE PRINCIPLES
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Core <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Values</span>
          </h2>
          
          <div className="h-1 w-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The fundamental principles that guide our educational philosophy and shape every aspect of our school community.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100
              hover:-translate-y-4 hover:shadow-2xl transition-all duration-500
              ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Background linear */}
              <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {React.createElement(item.icon, { className: 'text-2xl' })}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-amber-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience Our Values in Action</h3>
            <p className="text-gray-600 mb-6">Visit our campus to see how these core values shape every interaction and learning experience.</p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
