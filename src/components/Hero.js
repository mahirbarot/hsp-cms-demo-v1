import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import heroBgImage from '../assets/bg-hero-hs.jpg';

const Hero = () => {
  const { content } = useContent();
  
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Use CMS content if available, fallback to static content
  const heroTitle = content?.hero?.title || "Shaping the Future";
  const heroSubtitle = content?.hero?.subtitle || "Client Satisfaction Is Our Profit";
  const heroBg = content?.hero?.backgroundImage || heroBgImage;

  return (
    <section 
      id="home" 
      className="h-screen flex items-center justify-center relative overflow-hidden hero-bg"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <motion.div 
        className="absolute inset-0 bg-black opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroTitle}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {heroSubtitle}
        </motion.p>
        <motion.button 
          onClick={scrollToAbout} 
          className="inline-block group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg 
            className="w-8 h-8 md:w-12 md:h-12 group-hover:text-gray-300 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
