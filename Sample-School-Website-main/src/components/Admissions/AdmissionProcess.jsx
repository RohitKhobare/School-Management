import React, { useState } from 'react';
import { FaCheckCircle, FaFileAlt, FaUserCheck, FaCalendarAlt, FaGraduationCap, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const AdmissionProcess = () => {
  const [activeStep, setActiveStep] = useState(1);

  const admissionSteps = [
    {
      step: 1,
      title: "Application Form",
      description: "Fill out the online application form with student and parent details.",
      icon: FaFileAlt,
      details: [
        "Complete online application form",
        "Upload recent photograph",
        "Provide parent/guardian information",
        "Submit application fee"
      ]
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Submit required documents for verification and processing.",
      icon: FaUserCheck,
      details: [
        "Birth certificate",
        "Previous school records (if applicable)",
        "Address proof",
        "Medical certificate"
      ]
    },
    {
      step: 3,
      title: "School Visit",
      description: "Visit our campus for interaction and assessment.",
      icon: FaCalendarAlt,
      details: [
        "Campus tour with parents",
        "Meet with teachers and principal",
        "Student interaction session",
        "Q&A with admission team"
      ]
    },
    {
      step: 4,
      title: "Admission Confirmation",
      description: "Complete the admission process and join our school family.",
      icon: FaGraduationCap,
      details: [
        "Admission decision notification",
        "Fee payment and confirmation",
        "Orientation program details",
        "Welcome to MM Vidya Mandir!"
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Admission <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple and transparent admission process designed to make joining our school family easy and stress-free.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg">
            {admissionSteps.map((step) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                  activeStep === step.step
                    ? 'bg-linear-to-r from-amber-400 to-amber-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="hidden md:inline">Step {step.step}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {admissionSteps.map((step) => (
            <div
              key={step.step}
              className={`transition-all duration-500 ${
                activeStep === step.step ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-400 to-amber-600 rounded-full mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-xl text-gray-600">{step.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {step.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <FaCheckCircle className="text-green-500 shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-linear-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h4>
                    <p className="text-gray-600 mb-4">
                      Our admission team is here to guide you through every step of the process.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><FaPhone className="inline w-4 h-4 mr-2" />Call: +91 98765 43210</p>
                      <p><FaEnvelope className="inline w-4 h-4 mr-2" />Email: admissions@mmvidyamandir.edu.in</p>
                      <p><FaClock className="inline w-4 h-4 mr-2" />Office Hours: 9 AM - 4 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcess;
