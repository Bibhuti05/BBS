import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
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
          to_name: 'Bibhuti', // Or your name
          from_email: formState.email,
          message: formState.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      addToast('Message sent successfully! We will get back to you soon.', 'success');
      
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      addToast('Failed to send message. Please try again later.', 'error');
    }
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'bibhuticodes@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9644588233' },
    { icon: MapPin, label: 'Location', value: 'Banglore, India' },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4" variants={fadeUp}>
            Get in <span className="text-primary-600 dark:text-primary-400">Touch</span>
          </motion.h2>
          <motion.p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto" variants={fadeUp}>
            Have a project in mind or want to say hello? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {contactItems.map((item) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 hover:border-primary-500 transition-colors"
                variants={fadeUp}
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <item.icon size={24} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">{item.label}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg border border-zinc-100 dark:border-zinc-700 relative overflow-hidden"
            initial={{ opacity: 0, x: 50, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            animate={
              isSubmitted
                ? {
                    boxShadow: [
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      "0 0 0 12px rgba(16, 185, 129, 0.4)",
                      "0 0 0 30px rgba(16, 185, 129, 0)",
                    ],
                  }
                : {}
            }
          >
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  className="absolute inset-0 z-50 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent)",
                    width: "200%",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "50%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.01, borderColor: "#10b981" }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                  whileFocus={{ scale: 1.01, borderColor: "#10b981" }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Your message..."
                  whileFocus={{ scale: 1.01, borderColor: "#10b981" }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.button
                  key={isSubmitted ? "sent" : isSubmitting ? "sending" : "idle"}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary-500/25 ${
                    isSubmitted
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-primary-600 hover:bg-primary-700'
                  } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </motion.button>
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;