
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
import InvertedCursor from './components/InvertedCursor';
import { ToastProvider } from './components/toast/ToastContext';
import ToastContainer from './components/toast/ToastContainer';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen text-zinc-800 dark:text-zinc-200 transition-colors duration-500 font-sans">
        <Background />
        <ToastContainer />
        <InvertedCursor />

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
    </ToastProvider>
  );
};

export default App;
