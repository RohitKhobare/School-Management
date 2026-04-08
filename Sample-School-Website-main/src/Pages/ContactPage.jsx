import React from 'react';
import ContactHero from '../components/Contact/ContactHero';
import ContactInfoCards from '../components/Contact/ContactInfoCards';
import ContactFormSection from '../components/Contact/ContactFormSection';
import ContactFAQ from '../components/Contact/ContactFAQ';
import ContactCTA from '../components/Contact/ContactCTA';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-gray-50">
      <ContactHero />
      <ContactInfoCards />
      <ContactFormSection />
      <ContactFAQ />
      <ContactCTA />
    </div>
  );
};

export default ContactPage;
