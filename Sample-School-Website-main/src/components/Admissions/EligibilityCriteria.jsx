import React from 'react';

const EligibilityCriteria = () => {
  const eligibilityCriteria = [
    {
      grade: "Nursery",
      ageRange: "3-4 years",
      requirements: ["Age as on 31st March", "Basic toilet training", "Social interaction readiness"]
    },
    {
      grade: "LKG",
      ageRange: "4-5 years",
      requirements: ["Age as on 31st March", "Basic communication skills", "Previous school experience preferred"]
    },
    {
      grade: "UKG",
      ageRange: "5-6 years",
      requirements: ["Age as on 31st March", "LKG completion certificate", "Basic reading/writing skills"]
    },
    {
      grade: "Grade 1",
      ageRange: "6-7 years",
      requirements: ["Age as on 31st March", "UKG completion certificate", "School readiness assessment"]
    },
    {
      grade: "Grade 2-5",
      ageRange: "7-11 years",
      requirements: ["Age appropriate", "Previous grade completion", "Transfer certificate", "Academic assessment"]
    }
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Eligibility <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Criteria
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Age-appropriate admission criteria for different grades to ensure optimal learning environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eligibilityCriteria.map((criteria, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-400 to-blue-600 rounded-full mb-4">
                  <span className="text-white font-bold text-lg">{criteria.grade.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{criteria.grade}</h3>
                <p className="text-amber-600 font-semibold">{criteria.ageRange}</p>
              </div>
              
              <div className="space-y-3">
                {criteria.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 shrink-0"></div>
                    <span className="text-gray-700 text-sm">{req}</span>
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

export default EligibilityCriteria;
