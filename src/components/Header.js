import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <motion.a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="text-2xl font-bold mb-4 md:mb-0 hover:text-gray-300 transition-colors duration-300">
            H S Planning Ltd.
          </h1>
        </motion.a>
        
        {/* Mobile menu button */}
        <motion.button
          className="md:hidden mb-4 text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </motion.svg>
        </motion.button>

        {/* Navigation menu */}
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth >= 768) && (
            <motion.ul 
              className="flex flex-wrap justify-center space-x-4 md:space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {['Home', 'About', 'Services', 'Projects', 'Gallery', 'Careers', 'Contact'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <motion.a 
                    href={`#${item.toLowerCase()}`}
                    className="relative cursor-pointer block py-2 px-3 rounded-lg transition-all duration-300 hover:text-gray-300 hover:bg-white/10"
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase()); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
