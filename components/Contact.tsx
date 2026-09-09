import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from './toast/ToastContext';

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
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: formState.name, to_name: 'Bibhuti', from_email: formState.email, message: formState.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      addToast('Message sent successfully!', 'success');
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      addToast('Failed to send message. Please try again later.', 'error');
    }
  };

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-20"
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

        {/* Contact form */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-8">
            or send a message
          </p>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 py-10"
              >
                <div className="p-2 rounded-full bg-accent/10">
                  <Check size={18} className="text-accent" />
                </div>
                <p className="text-base text-zinc-300">
                  Message sent — I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-0"
                exit={{ opacity: 0, y: -10 }}
              >
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field) => (
                  <div key={field.id} className="border-b border-white/8 py-5">
                    <label htmlFor={field.id} className="block text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formState[field.id as keyof typeof formState]}
                      onChange={handleChange}
                      required
                      placeholder={field.placeholder}
                      className="w-full bg-transparent text-base text-white placeholder-zinc-700 outline-none transition-colors"
                    />
                  </div>
                ))}

                <div className="border-b border-white/8 py-5">
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent text-base text-white placeholder-zinc-700 outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-2 text-base font-semibold text-white hover:text-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-wait"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
