import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '../blog-loader';
import MDXLayout from './MDXLayout';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug!);

  if (!post) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Post not found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.meta.title} — Bibhuti Bhushan Saha</title>
        <meta name="description" content={post.meta.excerpt} />
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:description" content={post.meta.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <section className="min-h-screen pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MDXLayout meta={post.meta}>
            <post.Component />
          </MDXLayout>
        </motion.div>
      </section>
    </>
  );
};

export default BlogPost;
