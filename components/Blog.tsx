import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, PenLine } from 'lucide-react';
import { getAllPosts } from '../blog-loader';
import BlogCard from './BlogCard';

const Blog: React.FC = () => {
  const posts = getAllPosts();

  return (
    <>
      <Helmet>
        <title>Blog — Bibhuti Bhushan Saha</title>
        <meta name="description" content="Articles about React, TypeScript, web development, and software engineering." />
      </Helmet>

      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <PenLine size={28} className="text-primary-600 dark:text-primary-400" />
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                Blog
              </h1>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Thoughts on web development, TypeScript, React, and building things that work.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {posts.length === 0 && (
              <p className="text-zinc-500 dark:text-zinc-400 text-center py-20">
                No posts yet. Stay tuned!
              </p>
            )}
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                meta={post.meta}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
