import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from './toast/ToastContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          to_name: 'Bibhuti',
          from_email: formState.email,
          message: formState.message,
        },
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

  const contactInfo = [
    { label: 'Email', value: 'bibhuticodes@gmail.com', href: 'mailto:bibhuticodes@gmail.com' },
    { label: 'Phone', value: '+91 9644588233', href: 'tel:+919644588233' },
    { label: 'Location', value: 'Banglore, India', href: null },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Bibhuti05' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/feed/' },
    { name: 'Twitter', href: 'https://x.com/bibhuticodes' },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
            variants={fadeUp}
          >
            Get in <span className="text-zinc-400 dark:text-[#78716c]">Touch</span>
          </motion.h2>
          <motion.p
            className="text-lg text-zinc-500 dark:text-[#C2BDB2] max-w-xl"
            variants={fadeUp}
          >
            Let's work together. Have something in mind? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto">
          {/* Left — Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <div className="space-y-0">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`py-6 ${i !== contactInfo.length - 1 ? 'border-b border-[#2e2e2c]' : ''}`}
                  variants={fadeUp}
                >
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-2">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-lg text-zinc-800 dark:text-[#DAD6CE] hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg text-zinc-800 dark:text-[#DAD6CE]">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pt-10 border-t border-[#2e2e2c] mt-10"
              variants={fadeUp}
            >
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-4">
                Find me on
              </p>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-[#C2BDB2]">
                {socialLinks.map((link, i) => (
                  <React.Fragment key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                    {i < socialLinks.length - 1 && (
                      <span className="text-zinc-400 dark:text-[#57534e]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 py-12"
                >
                  <div className="p-2 rounded-full bg-emerald-500/10">
                    <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-lg text-zinc-700 dark:text-[#DAD6CE]">
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
                  <div className="border-b border-[#2e2e2c]">
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-lg text-zinc-800 dark:text-[#DAD6CE] placeholder-zinc-400 dark:placeholder-[#57534e] outline-none py-3 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="border-b border-[#2e2e2c]">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-2 pt-6"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-lg text-zinc-800 dark:text-[#DAD6CE] placeholder-zinc-400 dark:placeholder-[#57534e] outline-none py-3 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="border-b border-[#2e2e2c]">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-[#78716c] mb-2 pt-6"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-transparent text-lg text-zinc-800 dark:text-[#DAD6CE] placeholder-zinc-400 dark:placeholder-[#57534e] outline-none py-3 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="pt-8">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group flex items-center gap-3 text-lg font-medium text-zinc-800 dark:text-[#DAD6CE] hover:text-zinc-900 dark:hover:text-white transition-colors ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
                      whileHover={!isSubmitting ? { x: 4 } : {}}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
