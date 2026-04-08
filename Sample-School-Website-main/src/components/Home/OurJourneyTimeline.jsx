import React from 'react';
import { MdSchool } from 'react-icons/md';
import { FaTrophy, FaTools, FaLaptopCode, FaStar } from 'react-icons/fa';

const OurJourneyTimeline = () => {
  const milestones = [
    {
      year: "2008",
      title: "Foundation",
      description: "M.M. Vidya Mandir was established with a vision to provide quality education.",
      icon: MdSchool
    },
    {
      year: "2012",
      title: "First Recognition",
      description: "Received state recognition for excellence in primary education.",
      icon: FaTrophy
    },
    {
      year: "2016",
      title: "Infrastructure Expansion",
      description: "Added modern facilities including computer lab, library, and sports complex.",
      icon: FaTools
    },
    {
      year: "2020",
      title: "Digital Learning",
      description: "Successfully transitioned to hybrid learning model during pandemic.",
      icon: FaLaptopCode
    },
    {
      year: "2024",
      title: "Excellence Continues",
      description: "Celebrating 15+ years of educational excellence with 500+ successful students.",
      icon: FaStar
    }
  ];

  return (
    <section id="journey-section" className="py-20 bg-linear-to-br from-white via-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A timeline of growth, achievements, and milestones that have shaped our school into what it is today.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-amber-400 to-amber-600 rounded-full hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-4xl mb-4">{React.createElement(milestone.icon, { className: 'text-4xl' })}</div>
                    <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-full shadow-lg order-first md:order-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-linear-to-r from-amber-400 to-amber-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Be Part of Our Continuing Journey</h3>
            <p className="text-lg mb-6 opacity-90">
              Join us as we continue to create more milestones and shape the future of education.
            </p>
            <button 
              onClick={() => {
                const admissionSection = document.getElementById('admission-section');
                if (admissionSection) {
                  admissionSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If no admission section, scroll to contact or CTA
                  const ctaSection = document.getElementById('cta-section');
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Join Our School Family
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourneyTimeline;