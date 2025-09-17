import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import escape1Image from '../assets/escape1.png';
import enscape2Image from '../assets/enscape2.jpg';
import enscape3Image from '../assets/enscape3.jpg';
import blbrdTrh02Image from '../assets/blbrd_trh_02.jpg';

const Projects = () => {
  const projectsRef = useRef(null);
  const isInView = useInView(projectsRef, { once: true, threshold: 0.1 });
  const { content } = useContent();
  
  // Use CMS content if available, fallback to static content
  const projects = content?.projects || [
    {
      id: 1,
      title: "Enscape",
      category: "Residential",
      year: "2023",
      image: escape1Image,
      description: "Contemporary living space with sustainable materials"
    },
    {
      id: 2,
      title: "Urban Office",
      category: "Commercial",
      year: "2023",
      image: enscape2Image,
      description: "Smart office design for the modern workforce"
    },
    {
      id: 3,
      title: "Work space",
      category: "Hospitality",
      year: "2022",
      image: enscape3Image,
      description: "Sustainable luxury in harmony with nature"
    },
    {
      id: 4,
      title: "Commercial",
      category: "Cultural",
      year: "2022",
      image: blbrdTrh02Image,
      description: "A landmark cultural institution"
    }
  ];

  console.log('Projects component rendered with', projects.length, 'projects');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = projectsRef.current?.querySelectorAll('.project-card, .mb-16, .mt-16');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-16 md:py-20 bg-black min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={projectsRef} 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Projects
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-400"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Innovative architectural solutions for modern living
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card relative overflow-hidden bg-gray-800 rounded-lg shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image w-full h-64 md:h-[400px] object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div 
                  className="project-overlay absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold mb-2 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="text-base md:text-lg mb-4 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  <motion.button 
                    className="px-4 py-2 md:px-6 md:py-2 border border-white text-white hover:bg-white hover:text-black transition duration-300 rounded"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.3 }}
                  >
                    View Project
                    <svg className="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.button>
                </motion.div>
              </div>
              <motion.div 
                className="year-label absolute -right-4 top-4 bg-white text-black py-2 px-4 rotate-90 origin-left transition-transform duration-300 group-hover:-translate-y-2"
                whileHover={{ y: -10 }}
              >
                {project.year}
              </motion.div>
              <div className="absolute -left-4 bottom-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="text-white text-sm font-medium">{project.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button 
            className="px-6 py-3 md:px-8 md:py-3 border border-white text-white hover:bg-white hover:text-black transition duration-300 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg className="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
