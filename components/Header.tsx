import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../constants';
import { BookOpen, Mail, MoreHorizontal } from 'lucide-react';

const MORE_LINKS = [
  { name: 'Blog', href: '/blog', icon: BookOpen, isRoute: true },
  { name: 'Contact', href: '#contact', icon: Mail, isRoute: false },
];

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const morePanelRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHomePage) return;

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
  }, [isHomePage]);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        morePanelRef.current && !morePanelRef.current.contains(e.target as Node) &&
        moreBtnRef.current && !moreBtnRef.current.contains(e.target as Node)
      ) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate(`/${href}`);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const glassPillStyles = "bg-white/40 dark:bg-zinc-900/40 backdrop-blur border border-white/20 dark:border-zinc-700/20 shadow-xl shadow-black/10 dark:shadow-black/50";

  const visibleLinks = NAV_LINKS.filter((l) => l.name !== 'Blog' && l.name !== 'Contact');

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div
        className="absolute inset-0 h-[140px] backdrop-blur shadow-black/5"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="pt-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${glassPillStyles}`}
            >
              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                BBS<span className="text-primary-600 dark:text-primary-400">Portfolio</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="relative pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <nav
              className={`hidden md:flex items-center p-1.5 rounded-full ${glassPillStyles}`}
            >
              {visibleLinks.map((link) => {
                const isActive = isHomePage && activeSection === link.href.replace('#', '');

                return (
                  <a
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
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="relative">
                <button
                  ref={moreBtnRef}
                  onClick={() => setMoreOpen((prev) => !prev)}
                  className={`
                    flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${moreOpen
                      ? 'text-primary-700 dark:text-primary-300 bg-white dark:bg-zinc-800 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                    }
                  `}
                >
                  More
                  <MoreHorizontal size={16} />
                </button>

                {moreOpen && (
                  <div
                    ref={morePanelRef}
                    className="absolute right-0 top-full mt-2 min-w-[160px] py-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border border-white/20 dark:border-zinc-700/20 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/50 animate-more-expand-down origin-top"
                  >
                    {MORE_LINKS.map((item) => {
                      const isActive = item.isRoute
                        ? location.pathname.startsWith('/blog')
                        : false;

                      if (item.isRoute) {
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setMoreOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                              isActive
                                ? 'text-primary-600 dark:text-primary-400 bg-primary-600/5'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                            }`}
                          >
                            <item.icon size={16} />
                            {item.name}
                          </Link>
                        );
                      }

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setMoreOpen(false);
                            scrollToSection(e, item.href);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                          <item.icon size={16} />
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          </motion.div>

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
