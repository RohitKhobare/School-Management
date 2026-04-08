import React from 'react';
import { FaPlay, FaExpand, FaSchool, FaTheaterMasks, FaFutbol, FaLaptop, FaMicroscope, FaPaintBrush, FaSwimmer, FaBook, FaCalculator, FaVideo, FaBasketballBall, FaMusic, FaBookOpen, FaFlask, FaSpa, FaTicketAlt, FaCut, FaFlag, FaUsers, FaChartBar, FaUtensils, FaPenNib, FaGraduationCap } from 'react-icons/fa';

const GalleryGrid = ({ selectedCategory, setSelectedImage }) => {
  const galleryItems = [
    { id: 1, category: 'classroom', title: 'Interactive Learning Session', description: 'Students engaged in hands-on learning', type: 'image', placeholder: <FaSchool className="w-12 h-12" /> },
    { id: 2, category: 'events', title: 'Annual Day Celebration', description: 'Students performing cultural programs', type: 'image', placeholder: <FaTheaterMasks className="w-12 h-12" /> },
    { id: 3, category: 'sports', title: 'Sports Day Activities', description: 'Students participating in various sports', type: 'image', placeholder: <FaFutbol className="w-12 h-12" /> },
    { id: 4, category: 'facilities', title: 'Modern Computer Lab', description: 'State-of-the-art computer laboratory', type: 'image', placeholder: <FaLaptop className="w-12 h-12" /> },
    { id: 5, category: 'classroom', title: 'Science Experiment', description: 'Students conducting science experiments', type: 'image', placeholder: <FaMicroscope className="w-12 h-12" /> },
    { id: 6, category: 'events', title: 'Art Exhibition', description: 'Student artwork display', type: 'image', placeholder: <FaPaintBrush className="w-12 h-12" /> },
    { id: 7, category: 'sports', title: 'Swimming Competition', description: 'Inter-house swimming championship', type: 'image', placeholder: <FaSwimmer className="w-12 h-12" /> },
    { id: 8, category: 'facilities', title: 'Library Reading Corner', description: 'Cozy reading space for students', type: 'image', placeholder: <FaBook className="w-12 h-12" /> },
    { id: 9, category: 'classroom', title: 'Mathematics Class', description: 'Interactive math learning session', type: 'image', placeholder: <FaCalculator className="w-12 h-12" /> },
    { id: 10, category: 'events', title: 'School Assembly', description: 'Morning assembly and announcements', type: 'video', placeholder: <FaVideo className="w-12 h-12" /> },
    { id: 11, category: 'sports', title: 'Basketball Practice', description: 'Students practicing basketball skills', type: 'image', placeholder: <FaBasketballBall className="w-12 h-12" /> },
    { id: 12, category: 'facilities', title: 'Music Room', description: 'Students learning musical instruments', type: 'image', placeholder: <FaMusic className="w-12 h-12" /> },
    { id: 13, category: 'classroom', title: 'English Literature Class', description: 'Students discussing literature', type: 'image', placeholder: <FaBookOpen className="w-12 h-12" /> },
    { id: 14, category: 'events', title: 'Science Fair', description: 'Student science project exhibition', type: 'image', placeholder: <FaFlask className="w-12 h-12" /> },
    { id: 15, category: 'sports', title: 'Yoga Session', description: 'Morning yoga and meditation', type: 'image', placeholder: <FaSpa className="w-12 h-12" /> },
    { id: 16, category: 'facilities', title: 'Playground', description: 'Outdoor play area for students', type: 'image', placeholder: <FaTicketAlt className="w-12 h-12" /> },
    { id: 17, category: 'classroom', title: 'Art and Craft Class', description: 'Creative art activities', type: 'image', placeholder: <FaCut className="w-12 h-12" /> },
    { id: 18, category: 'events', title: 'Independence Day', description: 'Patriotic celebration and flag hoisting', type: 'image', placeholder: <FaFlag className="w-12 h-12" /> },
    { id: 19, category: 'classroom', title: 'Group Discussion', description: 'Students in collaborative learning', type: 'image', placeholder: <FaUsers className="w-12 h-12" /> },
    { id: 20, category: 'classroom', title: 'Presentation Skills', description: 'Students giving presentations', type: 'image', placeholder: <FaChartBar className="w-12 h-12" /> },
    { id: 21, category: 'classroom', title: 'Reading Session', description: 'Guided reading activities', type: 'image', placeholder: <FaBook className="w-12 h-12" /> },
    { id: 22, category: 'facilities', title: 'Cafeteria', description: 'Healthy meal time for students', type: 'image', placeholder: <FaUtensils className="w-12 h-12" /> },
    { id: 23, category: 'classroom', title: 'Creative Writing', description: 'Students working on creative stories', type: 'image', placeholder: <FaPenNib className="w-12 h-12" /> },
    { id: 24, category: 'events', title: 'Graduation Ceremony', description: 'Students receiving certificates', type: 'image', placeholder: <FaGraduationCap className="w-12 h-12" /> }
  ];

  const filteredItems = selectedCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-square bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                  {item.placeholder}
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-4">
                    {item.type === 'video' ? (
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FaPlay className="text-white w-5 h-5 ml-1" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FaExpand className="text-white w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default GalleryGrid;
