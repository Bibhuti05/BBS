
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import ClickShockwave from './components/ClickShockwave';
import { ToastProvider } from './components/toast/ToastContext';
import ToastContainer from './components/toast/ToastContainer';
import { ContactModalProvider } from './components/ContactModalContext';
import { ContactModal } from './components/ContactModal';
import { MarqueeTicker } from './components/MarqueeTicker';
import ScrollToTop from './components/ScrollToTop';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

const Portfolio: React.FC = () => {
  return (
    <div className="relative">
      {/* Fixed Hero section pinned to the viewport */}
      <Hero />

      {/* Spacer matching hero height to create initial scroll space and preserve #hero anchor */}
      <div id="hero" className="h-[calc(100vh-52px)] w-full pointer-events-none" aria-hidden="true" />

      {/* Scroll-over curtain layer: Marquee and sections scroll over the fixed Hero */}
      <div className="relative z-10 bg-[#0a0a0a] shadow-[0_-25px_60px_rgba(0,0,0,0.3)]">
        <MarqueeTicker />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <ContactModalProvider>
        <ScrollToTop />
        <div className="min-h-screen font-sans overflow-x-hidden">
          <Background />
          <ToastContainer />
          <ClickShockwave />
          <ContactModal />

          <div className="relative z-0 flex flex-col">
            <Header />
            
            <main className="grow no-scrollbar">
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </main>
            
            <Footer />
            <MobileNav />
          </div>
        </div>
      </ContactModalProvider>
    </ToastProvider>
  );
};

export default App;
