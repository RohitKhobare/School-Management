import React, { useEffect, useRef, useState } from "react";
import { FaFlag, FaHandsHelping, FaLightbulb } from 'react-icons/fa';

const OurVision = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 md:px-16 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - CONTENT */}
          <div className={`transition-all duration-700 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <span className="inline-flex items-center gap-2 mb-6 text-xs tracking-widest font-semibold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              OUR GOAL
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Vision</span>
            </h2>

            <div className="h-1 w-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mb-6"></div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We envision a future where our students grow into <span className="font-semibold text-amber-600">confident, compassionate, and responsible</span> individuals who are prepared for lifelong learning, leadership, and positive contribution to society.
            </p>

            {/* Vision Goals */}
            <div className="space-y-4">
              {[
                { icon: FaFlag, title: "Future Leaders", desc: "Developing tomorrow's changemakers" },
                { icon: FaHandsHelping, title: "Global Citizens", desc: "Fostering empathy and understanding" },
                { icon: FaLightbulb, title: "Lifelong Learners", desc: "Inspiring curiosity and growth mindset" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-amber-50/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="text-2xl">{React.createElement(item.icon, { className: 'text-2xl' })}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className={`transition-all duration-700 delay-200 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-orange-500 rounded-3xl blur-xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&crop=center" 
                alt="Students collaborating" 
                className="relative w-full h-80 object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-amber-100">
                <div className="text-2xl font-bold text-amber-600">2030</div>
                <div className="text-xs text-gray-600">Vision Goal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {[
            { title: "Confident Learners", desc: "Building self-assurance through achievement" },
            { title: "Responsible Citizens", desc: "Teaching accountability and social awareness" },
            { title: "Lifelong Growth", desc: "Instilling love for continuous learning" }
          ].map((item, index) => (
            <div key={index} className="bg-linear-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <h3 className="font-bold text-amber-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurVision;
