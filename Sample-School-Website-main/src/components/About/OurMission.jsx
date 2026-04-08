import React, { useEffect, useRef, useState } from "react";
import { MdSchool } from 'react-icons/md';
import { FaBook, FaStar } from 'react-icons/fa';

const OurMission = () => {
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
    <section ref={ref} className="py-20 px-6 md:px-16 bg-linear-to-br from-gray-50 to-amber-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - IMAGE */}
          <div className={`transition-all duration-700 delay-200 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-orange-500 rounded-3xl blur-xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop&crop=center" 
                alt="Students learning" 
                className="relative w-full h-80 object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 bg-amber-400 p-3 rounded-2xl shadow-lg animate-bounce">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CONTENT */}
          <div className={`transition-all duration-700 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <span className="inline-flex items-center gap-2 mb-6 text-xs tracking-widest font-semibold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              OUR PURPOSE
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Mission</span>
            </h2>

            <div className="h-1 w-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mb-6"></div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our mission is to provide a <span className="font-semibold text-amber-600">safe, inclusive and joyful</span> environment where children develop strong academic foundations, moral values, creativity, and lifelong curiosity—preparing them confidently for the future.
            </p>

            {/* Mission Points */}
            <div className="space-y-4">
              {[
                { icon: MdSchool, title: "Safe Learning Environment", desc: "Secure campus with caring supervision" },
                { icon: FaBook, title: "Academic Excellence", desc: "Strong foundation in core subjects" },
                { icon: FaStar, title: "Character Building", desc: "Values-based education for life" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl">{React.createElement(item.icon, { className: 'text-2xl' })}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))} 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;

