
import React from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500 font-sans">
      <Background />
      
      <div className="relative z-0 flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
        <MobileNav />
      </div>
    </div>
  );
};

export default App;
