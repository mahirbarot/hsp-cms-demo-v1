import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { content } = useContent();
  
  // Use CMS content if available, fallback to static content
  const services = content?.services || [
    {
      title: "Architectural Design",
      description: "From the very first idea to the building process, we create buildings that blend in with their surroundings while retaining their individuality."
    },
    {
      title: "Interior Design",
      description: "By carefully choosing materials, colours, textures, and furnishings that reflect the spirit of the room and its occupants, we bring spaces to life."
    },
    {
      title: "Structural Design",
      description: "We evaluate stresses, loads, and forces operating on structures, ensuring designs adhere to industry standards, safety laws, and building codes."
    },
    {
      title: "Building Work",
      description: "With years of experience, we provide outstanding craftsmanship, creative designs, and dependable service for new construction and renovations."
    },
    {
      title: "Party Wall",
      description: "We assist with party wall agreements, protecting property owners' interests during construction near shared boundaries."
    }
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-black p-6 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.h3 
                className="text-xl md:text-2xl font-bold mb-4 group-hover:text-gray-300 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + 0.2 }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="group-hover:text-gray-200 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + 0.4 }}
              >
                {service.description}
              </motion.p>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
