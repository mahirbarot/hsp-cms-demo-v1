import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const phone = '447940222723';
    
    const whatsappMessage = `Hello,%0A%0AYou%20have%20a%20new%20message:%0A%0AName:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}%0A%0AThank%20you!`;
    const whatsappURL = `https://wa.me/${phone}?text=${whatsappMessage}`;
    window.location.href = whatsappURL;
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300" 
                value={formData.name}
                onChange={handleInputChange}
                required
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300" 
                value={formData.email}
                onChange={handleInputChange}
                required
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea 
                name="message"
                placeholder="Your Message" 
                rows="6" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300" 
                value={formData.message}
                onChange={handleInputChange}
                required
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                type="submit" 
                className="px-6 py-3 md:px-8 md:py-3 bg-white text-black hover:bg-gray-200 transition duration-300 rounded-lg font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <motion.svg 
                className="w-6 h-6 mr-4 text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </motion.svg>
              <p className="hover:text-gray-300 transition-colors duration-300">hsplanningltd@yahoo.com</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
