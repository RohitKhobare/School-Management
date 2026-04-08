import React, { useEffect, useState } from "react";

const AboutHero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-400 via-orange-500 to-red-600">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        {/* BADGE */}
        <div className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 transition-all duration-1000 delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold tracking-wider">EST. 2010</span>
        </div>

        {/* MAIN HEADING */}
        <h1 className={`text-5xl md:text-7xl font-serif font-bold mb-6 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          About <span className="text-amber-300">M.M. Vidya Mandir</span>
        </h1>

        {/* SUBTITLE */}
        <p className={`text-xl md:text-2xl leading-relaxed mb-8 text-gray-100 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Nurturing young minds with <span className="text-amber-300 font-semibold">values</span>, <span className="text-amber-300 font-semibold">confidence</span> and <span className="text-amber-300 font-semibold">joyful learning</span> experiences since 2010.
        </p>

        {/* STATS */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 transition-all duration-1000 delay-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { number: "500+", label: "Happy Students" },
            { number: "15+", label: "Years Experience" },
            { number: "25+", label: "Dedicated Teachers" },
            { number: "100%", label: "Success Rate" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-amber-300">{stat.number}</div>
              <div className="text-sm text-gray-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
