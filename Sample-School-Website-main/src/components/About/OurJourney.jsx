import React, { useEffect, useRef, useState } from "react";
import { MdSchool } from 'react-icons/md';
import { FaChartLine, FaTrophy, FaLaptopCode, FaGraduationCap, FaStar, FaUserGraduate, FaChalkboardTeacher, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OurJourney = () => {
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

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      desc: "M.M. Vidya Mandir was established with a vision to provide quality primary education",
      icon: MdSchool,
      color: "from-blue-400 to-blue-600"
    },
    {
      year: "2015",
      title: "Expansion",
      desc: "Added modern facilities and expanded to accommodate 200+ students",
      icon: FaChartLine,
      color: "from-green-400 to-green-600"
    },
    {
      year: "2018",
      title: "Recognition",
      desc: "Received state recognition for excellence in primary education",
      icon: FaTrophy,
      color: "from-amber-400 to-orange-600"
    },
    {
      year: "2020",
      title: "Digital Learning",
      desc: "Successfully transitioned to hybrid learning during challenging times",
      icon: FaLaptopCode,
      color: "from-purple-400 to-purple-600"
    },
    {
      year: "2024",
      title: "500+ Students",
      desc: "Proudly serving over 500 happy students with 25+ dedicated teachers",
      icon: FaGraduationCap,
      color: "from-red-400 to-red-600"
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 md:px-16 bg-linear-to-br from-gray-50 to-amber-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <span className="inline-flex items-center gap-2 mb-4 text-xs tracking-widest font-semibold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            SINCE 2010
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Journey</span>
          </h2>
          
          <div className="h-1 w-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From humble beginnings to becoming a trusted name in primary education - discover the milestones that shaped our legacy.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-amber-400 to-orange-500 rounded-full hidden md:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Left Content (odd items) */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:order-2 md:pl-8'}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-linear-to-br ${milestone.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                        {React.createElement(milestone.icon, { className: 'text-xl' })}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-amber-600">{milestone.year}</div>
                        <div className="text-lg font-semibold text-gray-900">{milestone.title}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>

                {/* Center Timeline Dot */}
                <div className="relative z-10 hidden md:block">
                  <div className="w-6 h-6 bg-linear-to-br from-amber-400 to-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Right Content (even items) */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2 md:pl-8' : 'md:pr-8'}`}>
                  {/* Image placeholder for alternating layout */}
                  <div className="hidden md:block">
                    <div className="w-full h-32 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center opacity-50">
                      <div className="text-4xl">{React.createElement(milestone.icon, { className: 'text-4xl' })}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {[
            { number: "15+", label: "Years of Excellence", icon: FaStar },
            { number: "500+", label: "Happy Students", icon: FaUserGraduate },
            { number: "25+", label: "Dedicated Teachers", icon: FaChalkboardTeacher },
            { number: "100%", label: "Parent Trust", icon: FaHeart }
          ].map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-amber-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-2xl mb-2">{React.createElement(stat.icon, { className: 'text-2xl' })}</div>
              <div className="text-2xl font-bold text-amber-600 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center transition-all duration-700 delay-1200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="bg-linear-to-r from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Be Part of Our Continuing Journey</h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of families who have trusted us with their children's education and future.
            </p>
            <button 
              onClick={() => navigate('/admissions')}
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Start Your Child's Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;