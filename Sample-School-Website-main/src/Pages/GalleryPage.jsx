import React, { useState } from 'react';
import GalleryHero from '../components/Gallery/GalleryHero';
import CategoryFilter from '../components/Gallery/CategoryFilter';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import ImageModal from '../components/Gallery/ImageModal';
import GalleryCTA from '../components/Gallery/GalleryCTA';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'classroom', name: 'Classroom', count: 8 },
    { id: 'events', name: 'Events', count: 6 },
    { id: 'sports', name: 'Sports', count: 5 },
    { id: 'facilities', name: 'Facilities', count: 5 }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-gray-50">
      <GalleryHero />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <GalleryGrid 
        selectedCategory={selectedCategory}
        setSelectedImage={setSelectedImage}
      />
      <ImageModal 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <GalleryCTA />
    </div>
  );
};

export default GalleryPage;
