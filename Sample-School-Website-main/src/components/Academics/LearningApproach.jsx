import React from 'react';

const LearningApproach = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Learning <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Approach
              </span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Foundation Building</h3>
                  <p className="text-gray-600">Strong emphasis on fundamental concepts in all subjects to create a solid base for future learning.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Skill Development</h3>
                  <p className="text-gray-600">Focus on developing critical thinking, problem-solving, and communication skills alongside academic knowledge.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Character Formation</h3>
                  <p className="text-gray-600">Integration of values and ethics in daily learning to develop well-rounded individuals.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Continuous Assessment</h3>
                  <p className="text-gray-600">Regular evaluation and feedback to track progress and provide personalized support.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-amber-100 to-amber-200 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engaging classroom experiences</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningApproach;
