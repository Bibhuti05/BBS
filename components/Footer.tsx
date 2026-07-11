import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { href: "https://github.com/Bibhuti05", icon: Github },
  { href: "https://x.com/bibhuticodes", icon: Twitter },
  { href: "https://www.linkedin.com/feed/", icon: Linkedin },
];

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="relative border-t border-zinc-100 dark:border-zinc-800 py-12 overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Radial gradient from bottom */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-64 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="mb-4 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} BBS, i churn code like machine but better than AI.
          </p>
        </motion.div>
        
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.3, y: -3 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
