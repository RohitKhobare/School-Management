import React from "react";

const points = [
  "Experienced & caring teachers",
  "Safe and joyful environment",
  "Strong academic foundation",
  "Focus on overall development",
];

const WhyChooseUsAbout = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="inline-block text-xs tracking-widest font-semibold text-amber-600 bg-amber-100 px-4 py-1 rounded-full mb-4">
          WHY US
        </span>

        <h2 className="text-4xl font-serif font-bold text-gray-900">
          Why Parents Trust <span className="text-amber-600">Us</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {points.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-amber-50 border border-amber-200
                       px-6 py-5 rounded-2xl shadow-md
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-400 text-white font-bold">
              ✓
            </div>
            <p className="text-gray-800 font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsAbout;
