import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const CONTACT_CARDS = [
  {
    id: 'email',
    Icon: Mail,
    label: 'Email',
    handle: 'bibhuticodes@gmail.com',
    description: 'Best way to reach me. I read everything.',
    href: 'mailto:bibhuticodes@gmail.com',
  },
  {
    id: 'github',
    Icon: Github,
    label: 'GitHub',
    handle: '@Bibhuti05',
    description: 'Code, experiments, and open-source bits.',
    href: 'https://github.com/Bibhuti05',
  },
  {
    id: 'linkedin',
    Icon: Linkedin,
    label: 'LinkedIn',
    handle: 'Bibhuti Bhushan Saha',
    description: "If that's where you'd rather talk.",
    href: 'https://www.linkedin.com/feed/',
  },
  {
    id: 'twitter',
    Icon: Twitter,
    label: 'X / Twitter',
    handle: '@bibhuticodes',
    description: 'Occasional thoughts on code and product.',
    href: 'https://x.com/bibhuticodes',
  },
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-[#0e0e0e] text-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Heading */}
        <motion.div
          className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Say hello.
              <br />
              <span className="text-zinc-600">I usually reply.</span>
            </h2>
          </div>
          <div className="md:pt-4">
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
              Work, a question about code, or something you're building and want a second opinion on. All fine.
            </p>
          </div>
        </motion.div>

        {/* Social cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CONTACT_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target={card.id !== 'email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              id={`contact-${card.id}`}
              className="contact-card group relative overflow-hidden flex flex-col gap-4 p-5 rounded-2xl border border-zinc-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Film strip sweep overlay — CSS-driven, re-triggers each hover */}
              <span className="film-strip absolute inset-y-0 w-[60%] -left-[80%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none -skew-x-12" />

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full border border-zinc-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={14} className="text-zinc-400" />
              </div>

              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center">
                <card.Icon size={16} className="text-zinc-300" />
              </div>

              {/* Info */}
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{card.label}</p>
                <p className="text-xs font-mono text-zinc-500 mb-2">{card.handle}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{card.description}</p>
              </div>
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
