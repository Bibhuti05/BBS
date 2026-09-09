import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, PROJECTS } from '../constants';

const MARQUEE_ITEMS = [
  'React & Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Open to interesting work',
  'Bangalore, India',
  'Building fast & scalable apps',
  'Full‑stack developer',
  'React & Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Open to interesting work',
  'Bangalore, India',
  'Building fast & scalable apps',
  'Full‑stack developer',
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const Hero: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="bg-[#eae8e3] min-h-screen pt-24 flex flex-col">
      {/* Main hero content */}
      <motion.div
        className="flex-1 container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* Left — name & bio */}
        <div className="flex flex-col justify-start">
          <motion.p
            className="text-sm text-zinc-500 mb-3 font-medium"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            Hey, I'm
          </motion.p>

          <motion.h1
            className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-[0.9] tracking-tight text-zinc-900 mb-8"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            Bibhuti
            <br />
            Bhushan
            <br />
            Saha.
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-zinc-500 max-w-sm leading-relaxed mb-10"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            I build backends: APIs, databases, and the servers they run on,
            plus the interfaces that sit on top. React, Next.js &amp; TypeScript.
            From idea to production.
          </motion.p>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-5"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — what I'm building + location/time */}
        <motion.div
          className="flex flex-col gap-0 pt-2 lg:pt-16"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-zinc-400 mb-6 uppercase tracking-widest">
            what I'm building
          </p>

          <div className="space-y-0 divide-y divide-black/8">
            {PROJECTS.map((project, i) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between py-5 hover:opacity-70 transition-opacity"
              >
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1 group-hover:underline underline-offset-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {project.tags[0]} · {project.link.replace('https://', '')}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400 mt-1 ml-4 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </div>

          {/* Location & live time */}
          <div className="mt-8 pt-6 border-t border-black/8 flex items-center justify-between">
            <a
              href="https://drive.google.com/file/d/1L2_U8WJtk6JSefjhCtb5b6RbWzTuvRMn/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
            >
              Resume / CV →
            </a>
            <div className="text-right">
              <p className="text-sm font-mono text-zinc-900 font-bold">{time}</p>
              <p className="text-xs text-zinc-400">Bangalore, India</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Marquee ticker */}
      <div className="py-4 overflow-hidden bg-lime-500">
        <div className="animate-marquee flex gap-0 whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-sm text-white px-2"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-accent inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
