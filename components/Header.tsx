import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const link of NAV_LINKS) {
        const sectionId = link.href.replace('#', '');
        const element = document.getElementById(sectionId);
        
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
             setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const glassPillStyles = "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-700/40 shadow-lg shadow-zinc-200/20 dark:shadow-black/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Gradient blur backdrop — pure blur, no color tint */}
      <div
        className="absolute inset-0 h-[140px] backdrop-blur-2xl"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="pt-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          
          {/* Logo Pill */}
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href="#"
              onClick={(e) => scrollToSection(e, '#hero')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${glassPillStyles}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                BBS<span className="text-primary-600 dark:text-primary-400">Portfolio</span>
              </span>
            </motion.a>
          </motion.div>

          {/* Desktop Nav Pill (Tab Switcher) */}
          <motion.nav
            className={`hidden md:flex pointer-events-auto items-center p-1.5 rounded-full ${glassPillStyles}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`
                    relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'text-primary-700 dark:text-primary-300 bg-white dark:bg-zinc-800 shadow-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                    }
                  `}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={!isActive ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </motion.nav>

          {/* Theme Toggle Pill */}
          <motion.div
            className={`pointer-events-auto rounded-full p-1.5 ${glassPillStyles}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ThemeToggle className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-full transition-colors" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;