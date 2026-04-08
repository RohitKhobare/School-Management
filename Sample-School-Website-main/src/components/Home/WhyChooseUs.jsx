import React, { useEffect, useRef, useState } from "react";
import { FaChalkboardTeacher, FaShieldAlt, FaGraduationCap, FaStar, FaUsers, FaTrophy } from "react-icons/fa";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: FaChalkboardTeacher,
      title: "Expert Teachers",
      description: "Qualified and passionate educators dedicated to nurturing every child's potential.",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    },
    {
      icon: FaShieldAlt,
      title: "Safe Environment",
      description: "Secure campus with modern safety measures ensuring peace of mind for parents.",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    },
    {
      icon: FaGraduationCap,
      title: "Academic Excellence",
      description: "Strong curriculum foundation preparing students for future academic success.",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    },
    {
      icon: FaStar,
      title: "Holistic Development",
      description: "Balanced approach focusing on academics, sports, arts, and character building.",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    },
    {
      icon: FaUsers,
      title: "Small Class Sizes",
      description: "Personalized attention with optimal teacher-to-student ratios for better learning.",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    },
    {
      icon: FaTrophy,
      title: "Proven Results",
      description: "Track record of student achievements and successful transitions to higher education.",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-white via-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADING */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Why Choose <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Our School?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover what makes M.M. Vidya Mandir the perfect choice for your child's educational journey.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group bg-linear-to-br ${reason.bgColor} p-6 sm:p-8 rounded-2xl
              border border-white/50 shadow-lg
              hover:shadow-2xl hover:-translate-y-2
              transition-all duration-500
              ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${reason.color} rounded-full mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-2 sm:mb-0">
                  {reason.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {reason.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-linear-to-br ${reason.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-500
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="bg-amber-100 p-6 sm:p-8 rounded-2xl text-black">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Give Your Child the Best Start?</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 px-4">
              Join hundreds of families who have chosen excellence for their children's education.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => {
                  const ctaSection = document.getElementById('cta-section');
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-linear-to-r from-amber-400 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 ml-4 cursor-pointer"
              >
                Schedule a Visit
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/admissions';
                }}
                className="bg-linear-to-r from-amber-400 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 ml-4 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;