import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    hero: null,
    about: null,
    services: [],
    projects: [],
    gallery: [],
    footer: null,
    loading: true
  });

  // Load content from markdown files
  useEffect(() => {
    const loadContent = async () => {
      try {
        // For development, we'll use static content since the files are in the content directory
        // In production with Netlify CMS, these would be served from the public directory
        const parsedContent = {
          hero: {
            title: "Shaping the Future",
            subtitle: "Client Satisfaction Is Our Profit",
            backgroundImage: "/images/bg-hero-hs.jpg",
            published: true
          },
          about: {
            title: "About Us",
            image: "/images/bedroom-hs.jpg",
            description: "Welcome to our architectural and interior designing firm, where dreams come true and creativity and functionality collide. Our passion is to create environments that uplift, soothe, and tell a story of yours. We are committed to creating environments that represent the individuality and requirements of our clients, whether they are institutional, commercial, or residential, and we have a great regard for the art and science of design. We transform spaces into captivating environments that resonate with those who inhabit them.",
            visionTitle: "Our Vision",
            visionText: "To produce timeless, inventive, and sustainable designs that improves everyday life and the human experience.",
            approachTitle: "Our Approach",
            approachText: "We support a team-based approach to design. We try to comprehend our clients' goals, preferences, and needs by working closely with them. We are able to translate concepts into beautiful and useful designs that strike a balance between purpose and aesthetics through the relationship-centric approach.",
            published: true
          },
          services: [
            {
              title: "Architectural Design",
              description: "From the very first idea to the building process, we create buildings that blend in with their surroundings while retaining their individuality.",
              published: true
            },
            {
              title: "Interior Design",
              description: "By carefully choosing materials, colours, textures, and furnishings that reflect the spirit of the room and its occupants, we bring spaces to life.",
              published: true
            },
            {
              title: "Structural Design",
              description: "We evaluate stresses, loads, and forces operating on structures, ensuring designs adhere to industry standards, safety laws, and building codes.",
              published: true
            },
            {
              title: "Building Work",
              description: "With years of experience, we provide outstanding craftsmanship, creative designs, and dependable service for new construction and renovations.",
              published: true
            },
            {
              title: "Party Wall",
              description: "We assist with party wall agreements, protecting property owners' interests during construction near shared boundaries.",
              published: true
            }
          ],
          projects: [
            {
              id: 1,
              title: "Enscape",
              category: "Residential",
              year: "2023",
              image: "/images/escape1.png",
              description: "Contemporary living space with sustainable materials",
              featured: true,
              published: true
            },
            {
              id: 2,
              title: "Urban Office",
              category: "Commercial",
              year: "2023",
              image: "/images/enscape2.jpg",
              description: "Smart office design for the modern workforce",
              featured: true,
              published: true
            },
            {
              id: 3,
              title: "Work space",
              category: "Hospitality",
              year: "2022",
              image: "/images/enscape3.jpg",
              description: "Sustainable luxury in harmony with nature",
              featured: true,
              published: true
            },
            {
              id: 4,
              title: "Commercial",
              category: "Cultural",
              year: "2022",
              image: "/images/blbrd_trh_02.jpg",
              description: "A landmark cultural institution",
              featured: true,
              published: true
            }
          ],
          gallery: [
            { id: 1, src: "/images/37 wiltshire lane, pinner, eastcote, hillingdon, ha5 2ly-model0022 .jpg", alt: 'Architectural Design 1', title: "Architectural Design 1", order: 1, published: true },
            { id: 2, src: "/images/blbrd_trh_01.jpg", alt: 'Architectural Design 2', title: "Architectural Design 2", order: 2, published: true },
            { id: 3, src: "/images/enscape2.jpg", alt: 'Architectural Design 3', title: "Architectural Design 3", order: 3, published: true },
            { id: 4, src: "/images/family room.png", alt: 'Architectural Design 4', title: "Architectural Design 4", order: 4, published: true },
            { id: 5, src: "/images/enscape_2024-08-23-17-25-12.jpg", alt: 'Architectural Design 5', title: "Architectural Design 5", order: 5, published: true },
          ],
          footer: {
            companyName: "H S Planning Ltd.",
            tagline: "Shaping the Future",
            copyrightYear: "2024",
            links: '[{"text": "Home", "url": "#home"}, {"text": "About", "url": "#about"}, {"text": "Contact", "url": "#contact"}]',
            published: true
          },
          loading: false
        };

        setContent(parsedContent);
      } catch (error) {
        console.error('Error loading content:', error);
        setContent(prev => ({ ...prev, loading: false }));
      }
    };

    loadContent();
  }, []);

  // Simple markdown parser (you might want to use a proper markdown parser)
  const parseMarkdown = (markdown) => {
    if (!markdown) return null;
    
    const lines = markdown.split('\n');
    const data = {};
    
    lines.forEach(line => {
      if (line.startsWith('title:')) {
        data.title = line.replace('title:', '').trim();
      } else if (line.startsWith('subtitle:')) {
        data.subtitle = line.replace('subtitle:', '').trim();
      } else if (line.startsWith('description:')) {
        data.description = line.replace('description:', '').trim();
      } else if (line.startsWith('image:')) {
        data.image = line.replace('image:', '').trim();
      } else if (line.startsWith('backgroundImage:')) {
        data.backgroundImage = line.replace('backgroundImage:', '').trim();
      } else if (line.startsWith('visionTitle:')) {
        data.visionTitle = line.replace('visionTitle:', '').trim();
      } else if (line.startsWith('visionText:')) {
        data.visionText = line.replace('visionText:', '').trim();
      } else if (line.startsWith('approachTitle:')) {
        data.approachTitle = line.replace('approachTitle:', '').trim();
      } else if (line.startsWith('approachText:')) {
        data.approachText = line.replace('approachText:', '').trim();
      } else if (line.startsWith('companyName:')) {
        data.companyName = line.replace('companyName:', '').trim();
      } else if (line.startsWith('tagline:')) {
        data.tagline = line.replace('tagline:', '').trim();
      } else if (line.startsWith('copyrightYear:')) {
        data.copyrightYear = line.replace('copyrightYear:', '').trim();
      }
    });
    
    return data;
  };

  const parseServices = (markdown) => {
    if (!markdown) return [];
    // This would parse multiple service files
    // For now, return empty array - will be populated by individual service files
    return [];
  };

  const parseProjects = (markdown) => {
    if (!markdown) return [];
    // This would parse multiple project files
    // For now, return empty array - will be populated by individual project files
    return [];
  };

  const parseGallery = (markdown) => {
    if (!markdown) return [];
    // This would parse multiple gallery files
    // For now, return empty array - will be populated by individual gallery files
    return [];
  };

  const value = {
    content,
    setContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
