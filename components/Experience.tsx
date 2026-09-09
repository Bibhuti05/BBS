import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="bg-[#eae8e3] py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3"
            variants={fadeUp}
          >
            about
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4"
            variants={fadeUp}
          >
            I work on the parts
            <br />
            that matter most.
          </motion.h2>
        </motion.div>

        {/* Bio + principles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 pb-16 border-b border-black/10">
          <motion.div
            className="space-y-5 text-zinc-600 text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Frontend-focused engineer who cares about performance and user experience.
              I build modern web apps with React and Next.js, and I understand the backend
              well enough to integrate it cleanly.
            </p>
            <p>
              I got here by shipping things that broke and working out why.
              That's also how I ended up doing code reviews and mentoring teammates —
              the moment a bug stops being scary for someone is a good moment.
            </p>
            <p>
              These days I split my time between product work at startups and
              a handful of personal projects I run myself — the best way to
              keep learning things I wouldn't otherwise pick up.
            </p>
          </motion.div>

          <motion.div
            className="space-y-0 divide-y divide-black/8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {[
              'I write frontend first and interfaces second, and I think it shows in the code.',
              'I default to clean, composable architecture. React and TypeScript solve more than they get credit for.',
              'Most of what I know about production came from breaking it and having to fix it fast.',
              'I review code carefully because explaining something is how I find out if I actually understand it.',
            ].map((point, i) => (
              <div key={i} className="flex gap-5 py-5">
                <span className="text-xs font-mono text-zinc-400 mt-1 shrink-0 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">{point}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Experience list */}
        <motion.p
          className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          work experience
        </motion.p>

        <div className="space-y-0 divide-y divide-black/8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="group py-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Number + period */}
              <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-1 shrink-0 w-full sm:w-28">
                <span className="text-xs font-mono text-zinc-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-zinc-400">{exp.period}</span>
              </div>

              {/* Company + role */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-0.5">{exp.company}</h3>
                    <p className="text-sm text-zinc-500">{exp.role}</p>
                  </div>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black/5"
                  >
                    <ArrowUpRight size={16} className="text-zinc-400" />
                  </a>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                  {exp.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.responsibilities.slice(0, 2).map((r, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-black/6 text-zinc-500"
                    >
                      {r.split(' ').slice(0, 5).join(' ')}…
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;