import React from 'react';
import AdmissionsHero from '../components/Admissions/AdmissionsHero';
import AdmissionProcess from '../components/Admissions/AdmissionProcess';
import EligibilityCriteria from '../components/Admissions/EligibilityCriteria';
import RequiredDocuments from '../components/Admissions/RequiredDocuments';
import ApplicationForm from '../components/Admissions/ApplicationForm';
import AdmissionsCTA from '../components/Admissions/AdmissionsCTA';

const AdmissionsPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-gray-50">
      <AdmissionsHero />
      <AdmissionProcess />
      <EligibilityCriteria />
      <RequiredDocuments />
      <ApplicationForm />
      <AdmissionsCTA />
    </div>
  );
};

export default AdmissionsPage;
