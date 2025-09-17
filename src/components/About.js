import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import bedroomImage from '../assets/bedroom-hs.jpg';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { content } = useContent();

  // Use CMS content if available, fallback to static content
  const aboutData = content?.about || {};
  const aboutTitle = aboutData.title || "About Us";
  const aboutImage = aboutData.image || bedroomImage;
  const aboutDescription = aboutData.description || "Welcome to our architectural and interior designing firm, where dreams come true and creativity and functionality collide. Our passion is to create environments that uplift, soothe, and tell a story of yours. We are committed to creating environments that represent the individuality and requirements of our clients, whether they are institutional, commercial, or residential, and we have a great regard for the art and science of design. We transform spaces into captivating environments that resonate with those who inhabit them.";
  const visionTitle = aboutData.visionTitle || "Our Vision";
  const visionText = aboutData.visionText || "To produce timeless, inventive, and sustainable designs that improves everyday life and the human experience.";
  const approachTitle = aboutData.approachTitle || "Our Approach";
  const approachText = aboutData.approachText || "We support a team-based approach to design. We try to comprehend our clients' goals, preferences, and needs by working closely with them. We are able to translate concepts into beautiful and useful designs that strike a balance between purpose and aesthetics through the relationship-centric approach.";

  return (
    <section id="about" className="py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {aboutTitle}
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img 
              src={aboutImage} 
              alt="About Us" 
              className="w-full h-auto max-w-md mx-auto rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p 
              className="text-base md:text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {aboutDescription}
            </motion.p>
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {visionTitle}
            </motion.h3>
            <motion.p 
              className="text-base md:text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {visionText}
            </motion.p>
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {approachTitle}
            </motion.h3>
            <motion.p 
              className="text-base md:text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {approachText}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
