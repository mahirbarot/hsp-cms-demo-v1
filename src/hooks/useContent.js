import { useState, useEffect } from 'react';

export const useContent = () => {
  const [content, setContent] = useState({
    hero: null,
    about: null,
    services: [],
    projects: [],
    gallery: [],
    footer: null,
    loading: true
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load hero content
        const heroResponse = await fetch('/content/hero/hero.md');
        const heroData = heroResponse.ok ? await parseMarkdownFile(heroResponse.text()) : null;

        // Load about content
        const aboutResponse = await fetch('/content/about/about.md');
        const aboutData = aboutResponse.ok ? await parseMarkdownFile(aboutResponse.text()) : null;

        // Load services
        const servicesData = await loadServices();

        // Load projects
        const projectsData = await loadProjects();

        // Load gallery
        const galleryData = await loadGallery();

        // Load footer content
        const footerResponse = await fetch('/content/footer/footer.md');
        const footerData = footerResponse.ok ? await parseMarkdownFile(footerResponse.text()) : null;

        setContent({
          hero: heroData,
          about: aboutData,
          services: servicesData,
          projects: projectsData,
          gallery: galleryData,
          footer: footerData,
          loading: false
        });
      } catch (error) {
        console.error('Error loading content:', error);
        setContent(prev => ({ ...prev, loading: false }));
      }
    };

    loadContent();
  }, []);

  const parseMarkdownFile = async (textPromise) => {
    const text = await textPromise;
    const lines = text.split('\n');
    const data = {};
    
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        data[key] = value;
      }
    });
    
    return data;
  };

  const loadServices = async () => {
    try {
      // In a real implementation, you'd fetch a list of service files
      // For now, we'll return the static services as fallback
      return [
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
    } catch (error) {
      console.error('Error loading services:', error);
      return [];
    }
  };

  const loadProjects = async () => {
    try {
      // In a real implementation, you'd fetch a list of project files
      // For now, we'll return the static projects as fallback
      return [
        {
          id: 1,
          title: "Enscape",
          category: "Residential",
          year: "2023",
          image: "/images/escape1.png",
          description: "Contemporary living space with sustainable materials"
        },
        {
          id: 2,
          title: "Urban Office",
          category: "Commercial",
          year: "2023",
          image: "/images/enscape2.jpg",
          description: "Smart office design for the modern workforce"
        },
        {
          id: 3,
          title: "Work space",
          category: "Hospitality",
          year: "2022",
          image: "/images/enscape3.jpg",
          description: "Sustainable luxury in harmony with nature"
        },
        {
          id: 4,
          title: "Commercial",
          category: "Cultural",
          year: "2022",
          image: "/images/blbrd_trh_02.jpg",
          description: "A landmark cultural institution"
        }
      ];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  };

  const loadGallery = async () => {
    try {
      // In a real implementation, you'd fetch a list of gallery files
      // For now, we'll return the static gallery as fallback
      return [
        { id: 1, src: "/images/37 wiltshire lane, pinner, eastcote, hillingdon, ha5 2ly-model0022 .jpg", alt: 'Architectural Design 1' },
        { id: 2, src: "/images/blbrd_trh_01.jpg", alt: 'Architectural Design 2' },
        { id: 3, src: "/images/enscape2.jpg", alt: 'Architectural Design 3' },
        { id: 4, src: "/images/family room.png", alt: 'Architectural Design 4' },
        { id: 5, src: "/images/enscape_2024-08-23-17-25-12.jpg", alt: 'Architectural Design 5' },
      ];
    } catch (error) {
      console.error('Error loading gallery:', error);
      return [];
    }
  };

  return content;
};
