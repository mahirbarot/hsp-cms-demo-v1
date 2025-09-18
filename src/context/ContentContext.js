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

  // Parse markdown frontmatter
  const parseMarkdown = (content) => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (!match) return {};
    
    const frontmatter = match[1];
    const data = {};
    
    frontmatter.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Convert boolean strings
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        
        // Convert numbers
        if (!isNaN(value) && value !== '') {
          const num = parseFloat(value);
          if (num.toString() === value) value = num;
        }
        
        data[key] = value;
      }
    });
    
    return data;
  };

  // Load content from markdown files
  const loadContent = async () => {
      try {
        setContent(prev => ({ ...prev, loading: true }));
        
        // Check if content sync info is available
        let syncInfo = null;
        try {
          const syncResponse = await fetch('/.content-sync.json');
          if (syncResponse.ok) {
            syncInfo = await syncResponse.json();
            console.log('Content sync info:', syncInfo);
          }
        } catch (error) {
          console.log('No sync info available, using available content');
        }

        // Load hero content
        let hero = null;
        try {
          const heroResponse = await fetch('/hero/hero.md');
          if (heroResponse.ok) {
            const heroContent = await heroResponse.text();
            hero = parseMarkdown(heroContent);
          }
        } catch (error) {
          console.warn('Could not load hero content:', error);
        }

        // Load about content
        let about = null;
        try {
          const aboutResponse = await fetch('/about/about.md');
          if (aboutResponse.ok) {
            const aboutContent = await aboutResponse.text();
            about = parseMarkdown(aboutContent);
          }
        } catch (error) {
          console.warn('Could not load about content:', error);
        }

        // Load services
        const services = [];
        const serviceFiles = ['architectural-design', 'interior-design', 'structural-design', 'building-work', 'party-wall'];
        
        for (const serviceFile of serviceFiles) {
          try {
            const response = await fetch(`/services/${serviceFile}.md`);
            if (response.ok) {
              const content = await response.text();
              const serviceData = parseMarkdown(content);
              if (serviceData.published !== false) {
                services.push(serviceData);
              }
            }
          } catch (error) {
            console.warn(`Could not load service ${serviceFile}:`, error);
          }
        }

        // Load projects
        const projects = [];
        const projectFiles = ['enscape', 'urban-office', 'work-space', 'commercial'];
        
        for (let i = 0; i < projectFiles.length; i++) {
          try {
            const response = await fetch(`/projects/${projectFiles[i]}.md`);
            if (response.ok) {
              const content = await response.text();
              const projectData = parseMarkdown(content);
              if (projectData.published !== false) {
                projects.push({
                  id: i + 1,
                  ...projectData
                });
              }
            }
          } catch (error) {
            console.warn(`Could not load project ${projectFiles[i]}:`, error);
          }
        }

        // Load gallery
        const gallery = [];
        const galleryFiles = ['design-1', 'design-2', 'design-3', 'design-4', 'design-5'];
        
        for (let i = 0; i < galleryFiles.length; i++) {
          try {
            const response = await fetch(`/gallery/${galleryFiles[i]}.md`);
            if (response.ok) {
              const content = await response.text();
              const galleryData = parseMarkdown(content);
              if (galleryData.published !== false) {
                gallery.push({
                  id: i + 1,
                  src: galleryData.image, // Map 'image' to 'src' for compatibility
                  ...galleryData
                });
              }
            }
          } catch (error) {
            console.warn(`Could not load gallery item ${galleryFiles[i]}:`, error);
          }
        }

        // Sort gallery by order
        gallery.sort((a, b) => (a.order || 0) - (b.order || 0));

        // Load footer
        let footer = null;
        try {
          const footerResponse = await fetch('/footer/footer.md');
          if (footerResponse.ok) {
            const footerContent = await footerResponse.text();
            footer = parseMarkdown(footerContent);
          }
        } catch (error) {
          console.warn('Could not load footer content:', error);
        }

        // Combine all loaded content with fallbacks
        const parsedContent = {
          hero: hero || {
            title: "Shaping the Future",
            subtitle: "Client Satisfaction Is Our Profit",
            backgroundImage: "/images/bg-hero-hs.jpg",
            published: true
          },
          about: about || {
            title: "About Us",
            image: "/images/bedroom-hs.jpg",
            description: "Welcome to our architectural and interior designing firm.",
            visionTitle: "Our Vision",
            visionText: "To produce timeless, inventive, and sustainable designs.",
            approachTitle: "Our Approach",
            approachText: "We support a team-based approach to design.",
            published: true
          },
          services: services.length > 0 ? services : [
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
          projects: projects.length > 0 ? projects : [
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
          gallery: gallery.length > 0 ? gallery : [
            { id: 1, src: "/images/37 wiltshire lane, pinner, eastcote, hillingdon, ha5 2ly-model0022 .jpg", alt: 'Architectural Design 1', title: "Architectural Design 1", order: 1, published: true },
            { id: 2, src: "/images/blbrd_trh_01.jpg", alt: 'Architectural Design 2', title: "Architectural Design 2", order: 2, published: true },
            { id: 3, src: "/images/enscape2.jpg", alt: 'Architectural Design 3', title: "Architectural Design 3", order: 3, published: true },
            { id: 4, src: "/images/family room.png", alt: 'Architectural Design 4', title: "Architectural Design 4", order: 4, published: true },
            { id: 5, src: "/images/enscape_2024-08-23-17-25-12.jpg", alt: 'Architectural Design 5', title: "Architectural Design 5", order: 5, published: true },
          ],
          footer: footer || {
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
        // Set fallback content with loading false
        setContent({
          hero: {
            title: "Shaping the Future",
            subtitle: "Client Satisfaction Is Our Profit",
            backgroundImage: "/images/bg-hero-hs.jpg",
            published: true
          },
          about: {
            title: "About Us",
            image: "/images/bedroom-hs.jpg",
            description: "Welcome to our architectural and interior designing firm.",
            visionTitle: "Our Vision",
            visionText: "To produce timeless, inventive, and sustainable designs.",
            approachTitle: "Our Approach", 
            approachText: "We support a team-based approach to design.",
            published: true
          },
          services: [
            { title: "Architectural Design", description: "Creating buildings that blend with surroundings.", published: true },
            { title: "Interior Design", description: "Bringing spaces to life with careful material selection.", published: true },
            { title: "Structural Design", description: "Ensuring designs adhere to industry standards.", published: true }
          ],
          projects: [
            { id: 1, title: "Enscape", category: "Residential", year: "2023", image: "/images/escape1.png", description: "Contemporary living space.", featured: true, published: true }
          ],
          gallery: [
            { id: 1, src: "/images/37 wiltshire lane, pinner, eastcote, hillingdon, ha5 2ly-model0022 .jpg", alt: 'Architectural Design 1', published: true },
            { id: 2, src: "/images/blbrd_trh_01.jpg", alt: 'Architectural Design 2', published: true },
            { id: 3, src: "/images/enscape2.jpg", alt: 'Architectural Design 3', published: true }
          ],
          footer: {
            companyName: "H S Planning Ltd.",
            tagline: "Shaping the Future",
            copyrightYear: "2024",
            links: '[{"text": "Home", "url": "#home"}, {"text": "About", "url": "#about"}, {"text": "Contact", "url": "#contact"}]',
            published: true
          },
          loading: false
        });
      }
    };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to refresh content manually
  const refreshContent = () => {
    console.log('🔄 Manually refreshing content...');
    loadContent();
  };

  const value = {
    content,
    setContent,
    refreshContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
