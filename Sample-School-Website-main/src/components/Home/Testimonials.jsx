import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaUsers, FaUserFriends, FaUserMd, FaUserTie } from 'react-icons/fa';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh & Priya Patel",
      role: "Parents of Arjun Patel (Grade 3)",
      image: FaUsers,
      rating: 5,
      text: "M.M. Vidya Mandir has been a blessing for our son Arjun. The teachers are incredibly caring and the learning environment is perfect. We've seen tremendous growth in his confidence and academic performance.",
      highlight: "Excellent teachers and caring environment"
    },
    {
      id: 2,
      name: "Sunita Sharma",
      role: "Parent of Kavya Sharma (Grade 2)",
      image: FaUserFriends,
      rating: 5,
      text: "The holistic approach to education at this school is remarkable. My daughter not only excels academically but also participates actively in arts and sports. The school truly nurtures every aspect of a child's development.",
      highlight: "Holistic development approach"
    },
    {
      id: 3,
      name: "Dr. Amit Kumar",
      role: "Parent of Rohan Kumar (Grade 4)",
      image: FaUserMd,
      rating: 5,
      text: "As a doctor, I appreciate the school's focus on both academic excellence and character building. The values instilled here will serve my son throughout his life. Highly recommended!",
      highlight: "Perfect balance of academics and values"
    },
    {
      id: 4,
      name: "Meera & Vikash Singh",
      role: "Parents of Ananya Singh (Grade 1)",
      image: FaUserFriends,
      rating: 5,
      text: "Our daughter was shy when she started, but the supportive environment and skilled teachers helped her blossom. She now loves going to school every day and has made wonderful friends.",
      highlight: "Supportive environment for shy children"
    },
    {
      id: 5,
      name: "Ravi Gupta",
      role: "Parent of Ishaan Gupta (Grade 5)",
      image: FaUserTie,
      rating: 5,
      text: "The school's commitment to individual attention is outstanding. Despite having multiple children in each class, teachers know each child personally and cater to their unique needs.",
      highlight: "Individual attention to every child"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Parents <span className="inline-block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from families who have chosen M.M. Vidya Mandir for their children's education.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-amber-100 to-amber-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-br from-amber-200 to-amber-300 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <FaQuoteLeft className="text-4xl text-amber-400 mb-6" />

              {/* Testimonial Content */}
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 font-light">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                {/* Highlight */}
                <div className="bg-linear-to-r from-amber-100 to-amber-200 p-4 rounded-xl mb-6">
                  <p className="text-amber-800 font-semibold text-center">
                    {React.createElement(FaStar, { className: 'inline mr-2' })}{testimonials[currentTestimonial].highlight}
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{React.createElement(testimonials[currentTestimonial].image, { className: 'text-4xl' })}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 cursor-pointer"
          >
            <FaChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 cursor-pointer"
          >
            <FaChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="hidden lg:flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 cursor-pointer rounded-full transition-all duration-300 ${
                currentTestimonial === index 
                  ? 'bg-linear-to-r from-amber-400 to-amber-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
            <p className="text-gray-600">Parent Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
            <p className="text-gray-600">Happy Families</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">4.9/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
            <p className="text-gray-600">Years of Trust</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-linear-to-r from-amber-400 to-amber-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Happy School Family</h3>
            <p className="text-lg mb-6 opacity-90">
              Experience the difference that quality education and caring teachers can make.
            </p>
            <button 
              onClick={() => {
                const ctaSection = document.getElementById('cta-section');
                if (ctaSection) {
                  ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Schedule a School Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;