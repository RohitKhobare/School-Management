import React from 'react';

const TeachingMethodology = () => {
  const methodology = [
    {
      title: "Play-Based Learning",
      description: "Learning through games, activities, and interactive experiences that make education enjoyable.",
      icon: "🎮"
    },
    {
      title: "Hands-On Activities",
      description: "Practical learning experiences that help students understand concepts through direct engagement.",
      icon: "✋"
    },
    {
      title: "Individual Attention",
      description: "Personalized support for each student to help them reach their full potential.",
      icon: "👥"
    },
    {
      title: "Technology Integration",
      description: "Using modern technology tools to enhance learning and prepare students for the digital age.",
      icon: "💻"
    }
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Teaching <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Methodology
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovative teaching approaches that make learning engaging, effective, and enjoyable for every student.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodology.map((method, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-6">{method.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{method.title}</h3>
              <p className="text-gray-600 leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachingMethodology;
