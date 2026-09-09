import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home',       href: '#hero',       isRoute: false },
  { name: 'About',      href: '#skills',     isRoute: false },
  { name: 'Work',       href: '#experience', isRoute: false },
  { name: 'Projects',   href: '#portfolio',  isRoute: false },
  { name: 'Blog',       href: '/blog',       isRoute: true  },
  { name: 'Contact',    href: '#contact',    isRoute: false },
];

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!isHomePage) return;
      const scrollPosition = window.scrollY + 200;
      for (const link of NAV_LINKS) {
        if (link.isRoute) continue;
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!isHomePage) { navigate(`/${href}`); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#eae8e3]/90 backdrop-blur-md border-b border-black/5' : ''
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          id="header-logo"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black text-xs font-black leading-none select-none">
            B
          </div>
          <span className="font-bold text-[15px] text-zinc-900 tracking-tight">
            BBS<span className="text-zinc-400 font-normal">.</span>
          </span>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1" id="header-nav">
          {NAV_LINKS.map((link) => {
            const isActive = link.isRoute
              ? location.pathname.startsWith('/blog')
              : isHomePage && activeSection === link.href.replace('#', '');

            if (link.isRoute) {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            id="header-cta"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
