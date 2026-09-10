import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from './toast/ToastContext';
import { useContactModal } from './ContactModalContext';

export const ContactModal: React.FC = () => {
  const { isOpen, closeContactModal } = useContactModal();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContactModal();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeContactModal]);

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
      setTimeout(() => {
        setIsSubmitted(false);
        closeContactModal();
      }, 2000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      addToast('Failed to send message. Please try again later.', 'error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeContactModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal expanded from button layoutId */}
          <motion.div
            layoutId="contact-cta-button"
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 260,
            }}
            className="relative w-full max-w-lg bg-[#141414] text-white rounded-3xl border border-zinc-700/60 shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-semibold tracking-tight text-white">Get in touch</span>
              </div>
              <button
                type="button"
                onClick={closeContactModal}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-2">
                      <Check size={24} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message sent!</h3>
                    <p className="text-sm text-zinc-400 max-w-xs">
                      Thanks for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="modal-name" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:border-accent/60 focus:bg-white/10 focus:outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-email" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:border-accent/60 focus:bg-white/10 focus:outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-message" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        id="modal-message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Tell me about your project, ideas, or questions..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:border-accent/60 focus:bg-white/10 focus:outline-none resize-none transition-all text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        id="modal-contact-submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-accent text-black font-bold text-sm hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-accent/20"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
