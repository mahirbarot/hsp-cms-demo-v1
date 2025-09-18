import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import wiltshireImage from '../assets/37 wiltshire lane, pinner, eastcote, hillingdon, ha5 2ly-model0022 .jpg';
import blbrdTrh01Image from '../assets/blbrd_trh_01.jpg';
import enscape2Image from '../assets/enscape2.jpg';
import familyRoomImage from '../assets/family room.png';
import enscape2024Image from '../assets/enscape_2024-08-23-17-25-12.jpg';

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { content } = useContent();
  
  // Use CMS content if available, fallback to static content
  const galleryImages = content?.gallery?.length > 0 ? content.gallery : [
    { id: 1, src: wiltshireImage, alt: 'Architectural Design 1', title: 'Architectural Design 1' },
    { id: 2, src: blbrdTrh01Image, alt: 'Architectural Design 2', title: 'Architectural Design 2' },
    { id: 3, src: enscape2Image, alt: 'Architectural Design 3', title: 'Architectural Design 3' },
    { id: 4, src: familyRoomImage, alt: 'Architectural Design 4', title: 'Architectural Design 4' },
    { id: 5, src: enscape2024Image, alt: 'Architectural Design 5', title: 'Architectural Design 5' },
  ];

  // Ensure we have images and set initial index safely
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Reset index if it's out of bounds
  React.useEffect(() => {
    if (galleryImages.length > 0 && currentImageIndex >= galleryImages.length) {
      setCurrentImageIndex(0);
    }
  }, [galleryImages.length, currentImageIndex]);

  // Show loading state if content is still loading
  if (content?.loading) {
    return (
      <section id="gallery" className="py-12 md:py-16 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-8"></div>
              <div className="h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg max-w-4xl mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no images
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section id="gallery" className="py-12 md:py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </motion.h2>
        
        <motion.div 
          className="gallery-container max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Image Display */}
          <div className="relative mb-6">
            <motion.div
              key={currentImageIndex}
              className="relative overflow-hidden rounded-lg shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={galleryImages[currentImageIndex]?.src || ''} 
                alt={galleryImages[currentImageIndex]?.alt || `Gallery Image ${currentImageIndex + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', galleryImages[currentImageIndex]?.src);
                  e.target.style.display = 'none';
                }}
                onLoad={(e) => {
                  e.target.style.display = 'block';
                }}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-3 overflow-x-auto pb-2">
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.id || index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'border-white shadow-lg' 
                    : 'border-transparent hover:border-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  src={image?.src || ''} 
                  alt={image?.alt || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Thumbnail failed to load:', image?.src);
                    e.target.style.opacity = '0.5';
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Image Counter */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              {currentImageIndex + 1} of {galleryImages.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
