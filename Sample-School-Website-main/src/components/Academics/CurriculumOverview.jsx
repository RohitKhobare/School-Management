import React from 'react';
import { FaBook, FaFlask, FaCalculator, FaGlobe, FaPalette, FaMusic, FaRunning, FaLanguage } from 'react-icons/fa';

const CurriculumOverview = () => {
  const subjects = [
    {
      icon: FaLanguage,
      name: "English Language",
      description: "Comprehensive language skills development including reading, writing, speaking, and listening.",
      features: ["Grammar & Vocabulary", "Creative Writing", "Public Speaking", "Literature Appreciation"]
    },
    {
      icon: FaCalculator,
      name: "Mathematics",
      description: "Building strong mathematical foundations through interactive and practical learning methods.",
      features: ["Number Concepts", "Problem Solving", "Mental Math", "Practical Applications"]
    },
    {
      icon: FaFlask,
      name: "Science",
      description: "Hands-on exploration of scientific concepts through experiments and observations.",
      features: ["Nature Studies", "Simple Experiments", "Scientific Method", "Environmental Awareness"]
    },
    {
      icon: FaGlobe,
      name: "Social Studies",
      description: "Understanding our world, culture, and society through engaging activities.",
      features: ["Geography", "History", "Civics", "Cultural Studies"]
    },
    {
      icon: FaPalette,
      name: "Arts & Crafts",
      description: "Nurturing creativity and artistic expression through various mediums.",
      features: ["Drawing & Painting", "Craft Projects", "Creative Expression", "Art Appreciation"]
    },
    {
      icon: FaMusic,
      name: "Music & Dance",
      description: "Developing musical talents and cultural appreciation through performance arts.",
      features: ["Vocal Training", "Instrument Learning", "Dance Forms", "Cultural Programs"]
    },
    {
      icon: FaRunning,
      name: "Physical Education",
      description: "Promoting physical fitness, teamwork, and sportsmanship through various activities.",
      features: ["Sports Training", "Fitness Activities", "Team Games", "Health Education"]
    },
    {
      icon: FaBook,
      name: "Hindi Language",
      description: "Developing proficiency in Hindi language and literature for cultural connection.",
      features: ["Reading & Writing", "Grammar", "Poetry", "Cultural Context"]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Curriculum
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A well-balanced curriculum that focuses on academic excellence while nurturing creativity, critical thinking, and character development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <subject.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{subject.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{subject.description}</p>
              </div>
              
              <div className="space-y-2">
                {subject.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumOverview;
