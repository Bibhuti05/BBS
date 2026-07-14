
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
import ScrollToTop from './components/ScrollToTop';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

const Portfolio: React.FC = () => {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <ScrollToTop />
      <div className="min-h-screen text-zinc-800 dark:text-zinc-200 transition-colors duration-500 font-sans">
        <Background />
        <ToastContainer />
        <ClickShockwave />

      <div className="relative z-0 flex flex-col">
        <Header />
        
        <main className="flex-grow">
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
    </ToastProvider>
  );
};

export default App;
