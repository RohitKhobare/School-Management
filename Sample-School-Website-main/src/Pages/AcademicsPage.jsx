import React from 'react';
import AcademicsHero from '../components/Academics/AcademicsHero';
import CurriculumOverview from '../components/Academics/CurriculumOverview';
import TeachingMethodology from '../components/Academics/TeachingMethodology';
import LearningApproach from '../components/Academics/LearningApproach';
import AcademicsCTA from '../components/Academics/AcademicsCTA';

const AcademicsPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-gray-50">
      <AcademicsHero />
      <CurriculumOverview />
      <TeachingMethodology />
      <LearningApproach />
      <AcademicsCTA />
    </div>
  );
};

export default AcademicsPage;
