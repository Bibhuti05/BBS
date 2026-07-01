import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import type { BlogPostMeta } from '../types';

interface BlogCardProps {
  slug: string;
  meta: BlogPostMeta;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, meta, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${slug}`}
        className="group block card-spotlight rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300 overflow-hidden"
      >
        <div className="card-spotlight-border rounded-2xl" />
        <div className="relative z-10 p-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-3">
            {meta.title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
            {meta.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>

            <span className="flex items-center gap-1.5">
              <Tag size={14} />
              {meta.tags.join(', ')}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
