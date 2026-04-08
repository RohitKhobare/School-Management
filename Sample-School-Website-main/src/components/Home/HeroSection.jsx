import React, { useState, useEffect, useRef } from 'react';

const HeroSection = ({ onLoginClick, onExploreClick }) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const videoRef = useRef(null);
  
  const slogans = [
    "Where Dreams Take Flight",
    "Nurturing Tomorrow's Leaders",
    "Excellence in Every Child",
    "Building Bright Futures"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      
      const handlePause = () => {
        video.play();
      };
      
      video.addEventListener('pause', handlePause);
      
      return () => {
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const handleExploreClick = () => {
    // Scroll to about section
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (onExploreClick) onExploreClick();
  };

  const handleWatchStory = () => {
    // Scroll to journey timeline section
    const journeySection = document.getElementById('journey-section');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="https://pratibhaintschool.org/wp-content/uploads/2025/02/PIS-Mobile-View-Video.mp4"
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40">
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto py-20">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fadeInDown leading-tight">
            M.M. Vidya Mandir
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-4 animate-fadeInUp">
            Primary School
          </p>
        </div>

        {/* Animated Slogans */}
        <div className="h-16 sm:h-20 flex items-center justify-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold animate-fadeIn px-4">
            {slogans[currentSlogan]}
          </h2>
        </div>

        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp px-4">
          Empowering young minds through innovative education, nurturing creativity, 
          and building character for a brighter tomorrow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp px-4">
          <button 
            onClick={handleExploreClick}
            className="w-full sm:w-auto bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Explore Our School
          </button>
          <button 
            onClick={handleWatchStory}
            className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Watch Our Story
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;