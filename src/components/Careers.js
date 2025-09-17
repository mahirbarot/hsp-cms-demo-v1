import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Careers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const currentOpenings = [
    "Builder",
    "Business Development Executive", 
    "Sales Executive",
    "Interior Designer"
  ];

  return (
    <section id="careers" className="py-16 md:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Join Our Team
        </motion.h2>
        <motion.p 
          className="text-center text-base md:text-lg mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We are excited to announce that talented people are always welcomed to join our creative 
          team of designers and architects. We would love to speak with you if you have a strong 
          desire to design inspiring and sustainable environments. Send your updated CV.
        </motion.p>
        <motion.h3 
          className="text-xl md:text-2xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Current Openings
        </motion.h3>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {currentOpenings.map((opening, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium">{opening}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.button 
            className="px-6 py-3 md:px-8 md:py-3 bg-white text-black hover:bg-gray-200 transition duration-300 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;
