import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/Bibhuti05', Icon: Github, label: 'GitHub' },
  { href: 'https://x.com/bibhuticodes', Icon: Twitter, label: 'Twitter' },
  { href: 'https://www.linkedin.com/feed/', Icon: Linkedin, label: 'LinkedIn' },
];

const Footer: React.FC = () => (
  <motion.footer
    className="bg-[#0e0e0e] border-t border-white/5 py-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs font-mono text-zinc-600">
        © {new Date().getFullYear()} BBS. Made in India, mostly at night.
      </p>
      <div className="flex items-center gap-5">
        {socialLinks.map(({ href, Icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-zinc-600 hover:text-white transition-colors duration-200"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  </motion.footer>
);

export default Footer;
