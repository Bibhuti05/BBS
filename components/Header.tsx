import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better trigger

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
    // Trigger once on mount
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

  // Shared glass styles for consistency
  const glassPillStyles = "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-lg shadow-gray-200/20 dark:shadow-black/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        
        {/* Logo Pill */}
        <div className="pointer-events-auto">
            <a 
              href="#" 
              onClick={(e) => scrollToSection(e, '#hero')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-transform hover:scale-105 ${glassPillStyles}`}
            >
              <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                BBS<span className="text-primary-600 dark:text-primary-400">Portfolio</span>
              </span>
            </a>
        </div>

        {/* Desktop Nav Pill (Tab Switcher) */}
        <nav className={`hidden md:flex pointer-events-auto items-center p-1.5 rounded-full ${glassPillStyles}`}>
          {NAV_LINKS.map((link) => {
             const isActive = activeSection === link.href.replace('#', '');
             return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`
                    relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-primary-700 dark:text-primary-300 bg-white dark:bg-gray-800 shadow-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                    }
                  `}
                >
                  {link.name}
                </a>
             );
          })}
        </nav>

        {/* Theme Toggle Pill */}
        <div className={`pointer-events-auto rounded-full p-1.5 ${glassPillStyles}`}>
          <ThemeToggle className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;