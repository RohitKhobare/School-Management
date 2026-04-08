import React, { useState } from 'react';
import { FaEye, FaBullseye, FaHeart } from 'react-icons/fa';
import AuthModal from '../Auth/AuthModal';

const MissionVisionCards = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const cards = [
    {
      id: 'mission',
      icon: FaBullseye,
      title: 'Our Mission',
      subtitle: 'Empowering Every Child',
      description: 'To provide quality education that nurtures intellectual curiosity, creativity, and character development in a safe and supportive environment.',
      details: [
        'Foster academic excellence through innovative teaching methods',
        'Develop critical thinking and problem-solving skills',
        'Promote values of respect, integrity, and compassion',
        'Prepare students for future challenges and opportunities'
      ],
      linear: 'from-blue-400 to-blue-600',
      bglinear: 'from-blue-50 to-blue-100'
    },
    {
      id: 'vision',
      icon: FaEye,
      title: 'Our Vision',
      subtitle: 'Shaping Tomorrow\'s Leaders',
      description: 'To be a leading educational institution that inspires lifelong learning and develops confident, responsible global citizens.',
      details: [
        'Create an inclusive learning community',
        'Integrate technology with traditional teaching',
        'Encourage environmental consciousness',
        'Build strong partnerships with families and community'
      ],
      linear: 'from-green-400 to-green-600',
      bglinear: 'from-green-50 to-green-100'
    },
    {
      id: 'values',
      icon: FaHeart,
      title: 'Our Values',
      subtitle: 'Foundation of Excellence',
      description: 'Core values that guide our educational philosophy and shape the character of our students and community.',
      details: [
        'Excellence in all endeavors',
        'Respect for diversity and individuality',
        'Integrity in thoughts and actions',
        'Compassion and empathy for others'
      ],
      linear: 'from-purple-400 to-purple-600',
      bglinear: 'from-purple-50 to-purple-100'
    }
  ];

  return (
    <section className="py-20 bg-linear-to-br from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Foundation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles and beliefs that drive our commitment to educational excellence and student success.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative group cursor-pointer transition-all duration-500 ${
                activeCard === card.id ? 'scale-105' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`bg-linear-to-br ${card.bglinear} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${card.linear} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h3>
                    <p className={`text-lg font-semibold bg-linear-to-r ${card.linear} bg-clip-text text-transparent`}>
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Expandable Details */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeCard === card.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-4 border-t border-gray-200">
                      <ul className="space-y-2">
                        {card.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-600">
                            <div className={`w-2 h-2 bg-linear-to-r ${card.linear} rounded-full mt-2 shrink-0`}></div>
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${card.linear} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl"><FaBullseye className="text-4xl" /></div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">Ready to Join Our Mission?</h3>
              <p className="text-gray-600">Discover how we can help your child thrive.</p>
            </div>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-linear-to-r from-amber-400 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 ml-4 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      
      {/* Signup Modal */}
      {showSignupModal && (
        <AuthModal
          activeModal="signup"
          onClose={() => setShowSignupModal(false)}
        />
      )}
    </section>
  );
};

export default MissionVisionCards;