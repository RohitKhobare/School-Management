import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ selectedImage, setSelectedImage }) => {
  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden">
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300 cursor-pointer"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="aspect-video bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center">
          <div className="text-8xl opacity-60">{selectedImage.placeholder}</div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h2>
          <p className="text-gray-600 mb-4">{selectedImage.description}</p>
          <div className="flex items-center justify-between">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 font-medium rounded-full capitalize">
              {selectedImage.category}
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
                Download
              </button>
              <button className="px-4 py-2 bg-linear-to-r from-amber-400 to-amber-600 text-white rounded-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
