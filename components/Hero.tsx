import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-6 z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.p
            className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-6"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            Software Engineer
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight leading-[0.95]"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            Bibhuti
            <br />
            <span className="text-zinc-400 dark:text-[#78716c]">Bhushan Saha</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-500 dark:text-[#C2BDB2] max-w-lg mb-12 leading-relaxed"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            Building modern web experiences with React, Next.js, Node.js & TypeScript.
            From idea to production.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-6 mb-16"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              href="https://drive.google.com/file/d/1L2_U8WJtk6JSefjhCtb5b6RbWzTuvRMn/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-lg font-medium text-zinc-800 dark:text-[#DAD6CE] hover:text-zinc-900 dark:hover:text-white transition-colors"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Resume / CV
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>

            <span className="hidden sm:block text-zinc-300 dark:text-[#2e2e2c]">·</span>

            <motion.a
              href="#contact"
              className="group flex items-center gap-3 text-lg font-medium text-zinc-800 dark:text-[#DAD6CE] hover:text-zinc-900 dark:hover:text-white transition-colors"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Get in Touch
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          <motion.div
            className="flex items-center gap-6"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 dark:text-[#78716c] hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
