import React from 'react';
import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ContentProvider>
      <div className="bg-black text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Services />
          <Projects />
          <Gallery />
          <Careers />
          <Contact />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}

export default App;
