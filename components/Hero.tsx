import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";
import Avatar3D from "./Avatar3D";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-6 z-10 flex flex-col items-center text-center gap-8"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* 3D Model */}
        <motion.div 
          className="w-full max-w-lg" 
          variants={fadeUp} 
          transition={{ duration: 0.6 }}
        >
          <Avatar3D />
        </motion.div>

        {/* Text Content */}
        <div className="w-full">
        <motion.p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-2" variants={fadeUp} transition={{ duration: 0.5 }}>
          Hi, I'm
        </motion.p>
        <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight leading-tight" variants={fadeUp} transition={{ duration: 0.6 }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-rose-700 dark:from-primary-400 dark:to-rose-600">
            Bibhuti
          </span>{" "}
          Bhushan Saha
        </motion.h1>

        <motion.p className="text-xl md:text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2 tracking-wide" variants={fadeUp} transition={{ duration: 0.5 }}>
          Full Stack Developer
        </motion.p>
        <motion.p className="text-base md:text-lg text-primary-600 dark:text-primary-400 font-medium mb-5 italic" variants={fadeUp} transition={{ duration: 0.5 }}>
          From idea to production
        </motion.p>

        <motion.div className="flex items-center gap-2 mb-5 justify-center bg-zinc-100 dark:bg-zinc-800/50 w-fit mx-auto px-3 py-1.5 rounded-full" variants={fadeUp} transition={{ duration: 0.5 }}>
          <MapPin size={14} className="text-primary-500 dark:text-primary-400" />
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">India</span>
        </motion.div>

        <motion.p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed" variants={fadeUp} transition={{ duration: 0.5 }}>
          Specializing in React, Next.js, Node.js & TypeScript. Architecting robust, scalable solutions with real-world{" "}
          <span className="text-primary-600 dark:text-primary-400 font-semibold relative inline-block">
            Impact
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500/30 rounded-full"></span>
          </span>
          . 
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6" variants={fadeUp} transition={{ duration: 0.5 }}>
          <motion.a
            href="https://drive.google.com/file/d/1L2_U8WJtk6JSefjhCtb5b6RbWzTuvRMn/view?usp=sharing"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Resume / CV <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-medium flex items-center justify-center gap-2 hover:border-primary-500 dark:hover:border-primary-500"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        <motion.div className="flex items-center gap-4 justify-center" variants={fadeUp} transition={{ duration: 0.5 }}>
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              aria-label={link.name}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;