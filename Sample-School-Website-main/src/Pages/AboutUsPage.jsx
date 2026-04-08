import React from "react";
import AboutHero from "../components/About/AboutHero";
import OurMission from "../components/About/OurMission";
import OurVision from "../components/About/OurVision";
import OurValues from "../components/About/OurValues";
import PrincipalMessage from "../components/About/PrincipalMessage";
import WhyChooseUsAbout from "../components/About/WhyChooseUsAbout";
import OurJourney from "../components/About/OurJourney";
import WhyParentsTrustUs from "../components/About/WhyParentsTrustUs";

const AboutUsPage = () => {
  return (
    <>
      <AboutHero />
      <OurJourney />
      <OurMission />
      <OurVision />
      <OurValues />
      <PrincipalMessage />
      <WhyParentsTrustUs />
      <WhyChooseUsAbout />
    </>
  );
};

export default AboutUsPage;
