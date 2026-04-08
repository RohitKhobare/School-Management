import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactInfoCards = () => {
  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone Numbers',
      details: ['+91 98765 43210', '+91 87654 32109'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: FaEnvelope,
      title: 'Email Addresses',
      details: ['info@mmvidyamandir.edu.in', 'admissions@mmvidyamandir.edu.in'],
      color: 'from-green-400 to-green-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'School Address',
      details: ['123 Education Street', 'Pune, Maharashtra 411001'],
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8:00 AM - 4:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
      color: 'from-amber-400 to-amber-600'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${info.color} rounded-full mb-4`}>
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;
