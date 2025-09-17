import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { content } = useContent();

  // Use CMS content if available, fallback to static content
  const footerData = content?.footer || {};
  const companyName = footerData.companyName || "H S Planning Ltd.";
  const tagline = footerData.tagline || "Shaping the Future";
  const copyrightYear = footerData.copyrightYear || "2024";
  const links = footerData.links ? JSON.parse(footerData.links) : [
    { text: "Home", url: "#home" },
    { text: "About", url: "#about" },
    { text: "Contact", url: "#contact" }
  ];

  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2">{companyName}</h3>
            <p className="text-gray-400 text-sm">{tagline}</p>
          </motion.div>
          
          <motion.div 
            className="flex space-x-6 mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {links.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.text}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-gray-400 text-sm">&copy; {copyrightYear} {companyName}</p>
            <p className="text-gray-500 text-xs mt-1">All rights reserved.</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-6 pt-6 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-500 text-xs">
            Designed with ❤️ for exceptional architectural experiences
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
