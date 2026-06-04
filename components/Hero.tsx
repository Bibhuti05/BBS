import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";

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
        className="container mx-auto px-6 z-10 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex-shrink-0 mb-8" variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full opacity-50 blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, #10b981, #059669, #34d399, #047857, #a7f3d0, #10b981)",
              }}
            ></motion.div>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, #10b981, #059669, #34d399, #047857, #a7f3d0, #10b981)",
                padding: "3px",
              }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-dark-bg"></div>
            </motion.div>
            <div className="absolute inset-[3px] rounded-full bg-white dark:bg-dark-bg"></div>
            <motion.div
              className="absolute inset-[6px] rounded-full overflow-hidden bg-gradient-to-br from-primary-50 to-emerald-100/50 dark:from-primary-900/40 dark:to-emerald-900/40 flex items-center justify-center border border-primary-100 dark:border-primary-800/50"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-emerald-600 dark:from-primary-400 dark:to-emerald-500 select-none">
                B
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="inline-flex mb-6 px-4 py-2 rounded-full border border-primary-200/50 dark:border-primary-800/50 bg-primary-50/80 dark:bg-primary-900/30 backdrop-blur-md items-center gap-2.5 w-fit shadow-sm shadow-primary-500/5 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
          </div>
          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
            Open to new opportunities
          </span>
        </motion.div>

        <motion.p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-2" variants={fadeUp} transition={{ duration: 0.5 }}>
          Hi, I'm
        </motion.p>
        <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight leading-tight" variants={fadeUp} transition={{ duration: 0.6 }}>
          Bibhuti Bhushan{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-700 dark:from-primary-400 dark:to-emerald-600">
            Saha
          </span>
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
            href="https://drive.google.com/file/d/1H8IXBW2BYOO1j44XKTkMvK-kxALLphRq/view?usp=drive_link"
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
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-500 dark:text-primary-400 opacity-70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;