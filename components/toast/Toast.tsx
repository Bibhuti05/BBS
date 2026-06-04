import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { ToastMessage, useToast } from './ToastContext';

interface ToastProps {
  toast: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4000); // Auto dismiss after 4 seconds

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const icons = {
    success: <CheckCircle2 className="text-green-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const borderColors = {
    success: 'border-green-500/20',
    error: 'border-red-500/20',
    info: 'border-blue-500/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className={`
        flex items-center gap-3 p-4 
        w-80 sm:w-96
        bg-white/70 dark:bg-zinc-900/70 
        backdrop-blur-md 
        border ${borderColors[toast.type]} 
        shadow-lg shadow-black/5 dark:shadow-black/20 
        rounded-2xl
        pointer-events-auto
      `}
    >
      <div className="flex-shrink-0">
        {icons[toast.type]}
      </div>
      <p className="flex-grow text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {toast.message}
      </p>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
