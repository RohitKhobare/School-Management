import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaLaptopCode, FaBook, FaFutbol, FaFlask, FaPaintBrush } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';

const FacilitiesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const facilities = [
    {
      id: 1,
      title: 'Modern Classrooms',
      description: 'Smart boards, comfortable seating, and excellent lighting for optimal learning environment.',
      icon: MdSchool,
      features: ['Smart Boards', 'Air Conditioning', 'Natural Lighting', 'Ergonomic Furniture']
    },
    {
      id: 2,
      title: 'Computer Laboratory',
      description: 'State-of-the-art computers with high-speed internet for digital literacy programs.',
      icon: FaLaptopCode,
      features: ['Latest Computers', 'High-Speed Internet', 'Educational Software', 'Coding Classes']
    },
    {
      id: 3,
      title: 'Library & Reading Corner',
      description: 'Extensive collection of books, magazines, and digital resources for all age groups.',
      icon: FaBook,
      features: ['10,000+ Books', 'Digital Resources', 'Reading Programs', 'Quiet Study Areas']
    },
    {
      id: 4,
      title: 'Sports Complex',
      description: 'Multi-purpose sports facilities including playground, courts, and fitness equipment.',
      icon: FaFutbol,
      features: ['Multi-Sport Courts', 'Swimming Pool', 'Fitness Equipment', 'Outdoor Playground']
    },
    {
      id: 5,
      title: 'Science Laboratory',
      description: 'Well-equipped labs for hands-on experiments and scientific exploration.',
      icon: FaFlask,
      features: ['Modern Equipment', 'Safety Measures', 'Interactive Experiments', 'STEM Programs']
    },
    {
      id: 6,
      title: 'Art & Music Room',
      description: 'Creative spaces for artistic expression, music lessons, and cultural activities.',
      icon: FaPaintBrush,
      features: ['Art Supplies', 'Musical Instruments', 'Performance Stage', 'Exhibition Space']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % facilities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % facilities.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + facilities.length) % facilities.length);
  };

  return (
    <section className="py-20 bg-linear-to-br from-amber-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            World-class facilities designed to provide the best learning environment for our students.
          </p>
        </div>

        {/* Main Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {facilities.map((facility) => (
                <div key={facility.id} className="w-full shrink-0">
                  <div className="bg-white p-12 mx-4 rounded-2xl shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      {/* Content */}
                      <div className="space-y-6">
                        <div className="text-6xl mb-4">{React.createElement(facility.icon, { className: 'text-6xl' })}</div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-800 mb-4">{facility.title}</h3>
                          <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            {facility.description}
                          </p>
                        </div>
                        
                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                          {facility.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-linear-to-r from-amber-400 to-amber-600 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Visual Placeholder */}
                      <div className="bg-linear-to-br from-amber-100 to-amber-200 rounded-2xl h-80 flex items-center justify-center">
                        <div className="text-8xl opacity-50">{React.createElement(facility.icon, { className: 'text-8xl' })}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <FaChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <FaChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="hidden lg:flex justify-center mt-8 space-x-1">
          {facilities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`p-2 cursor-pointer rounded-full transition-all duration-200 w-1 h-1 ${
                currentSlide === index 
                  ? 'bg-linear-to-r from-amber-400 to-amber-600 scale-150' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Facility Grid Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilities.map((facility, index) => (
            <button
              key={facility.id}
              onClick={() => setCurrentSlide(index)}
              className={`p-4 cursor-pointer rounded-xl transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-linear-to-br from-amber-400 to-amber-600 text-white scale-105'
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:scale-105'
              } shadow-lg hover:shadow-xl`}
            >
              <div className="text-2xl mb-2">{React.createElement(facility.icon, { className: 'text-2xl' })}</div>
              <p className="text-sm font-medium">{facility.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSlider;