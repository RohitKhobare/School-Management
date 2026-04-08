import React from 'react';

const ContactFAQ = () => {
  const faqs = [
    {
      question: "What are the school timings?",
      answer: "Our school operates from 8:00 AM to 2:30 PM, Monday through Friday. Extended care is available until 5:00 PM."
    },
    {
      question: "How can I schedule a school visit?",
      answer: "You can schedule a visit by calling our admissions office at +91 98765 43210 or filling out the contact form above."
    },
    {
      question: "What documents are required for admission?",
      answer: "Required documents include birth certificate, previous school records, address proof, and medical certificate. Visit our admissions page for the complete list."
    },
    {
      question: "Do you provide transportation?",
      answer: "Yes, we provide safe and reliable transportation services covering various routes across the city. Contact our transport office for route details."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Frequently Asked <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
