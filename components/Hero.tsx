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
        <motion.div className="flex-shrink-0 mb-10" variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, #10b981, #059669, #34d399, #047857, #a7f3d0, #10b981)",
                padding: "4px",
              }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-dark-bg"></div>
            </motion.div>
            <div className="absolute inset-[4px] rounded-full bg-white dark:bg-dark-bg"></div>
            <motion.div
              className="absolute inset-[8px] rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900 dark:to-emerald-900 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-6xl md:text-7xl font-bold text-primary-600/20 dark:text-primary-400/20 select-none">
                B
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="inline-flex mb-6 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20 backdrop-blur-sm items-center gap-2 w-fit"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            Open to new opportunities!
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

        <motion.p className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2" variants={fadeUp} transition={{ duration: 0.5 }}>
          Frontend Developer
        </motion.p>
        <motion.p className="text-base md:text-lg text-primary-600 dark:text-primary-400 font-medium mb-4 italic" variants={fadeUp} transition={{ duration: 0.5 }}>
          From pixel to production
        </motion.p>

        <motion.div className="flex items-center gap-2 mb-4 justify-center" variants={fadeUp} transition={{ duration: 0.5 }}>
          <MapPin size={16} className="text-zinc-500 dark:text-zinc-400" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">India</span>
        </motion.div>

        <motion.p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-xl mx-auto" variants={fadeUp} transition={{ duration: 0.5 }}>
          Specializing in React, Next.js & TypeScript. Building products with
          real-world{" "}
          <span className="text-primary-600 dark:text-primary-400 font-semibold">
            Impact
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