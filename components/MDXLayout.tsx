import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Calendar, Tag } from 'lucide-react';
import type { BlogPostMeta } from '../types';

const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-2" {...props} />,
  p: (props: any) => <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="text-zinc-700 dark:text-zinc-300 leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-primary-600 dark:text-primary-400 hover:underline underline-offset-2" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4" {...props} />,
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) return <code className="bg-zinc-100 dark:bg-zinc-800 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    return <code className="block bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 overflow-x-auto text-sm font-mono my-4" {...props} />;
  },
  pre: (props: any) => <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 overflow-x-auto my-4 border border-zinc-200 dark:border-zinc-700" {...props} />,
  strong: (props: any) => <strong className="font-bold text-zinc-900 dark:text-zinc-100" {...props} />,
  em: (props: any) => <em className="italic text-zinc-600 dark:text-zinc-400" {...props} />,
  table: (props: any) => <table className="w-full border-collapse my-4" {...props} />,
  th: (props: any) => <th className="border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800" {...props} />,
  td: (props: any) => <td className="border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-zinc-700 dark:text-zinc-300" {...props} />,
};

interface MDXLayoutProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
}

const MDXLayout: React.FC<MDXLayoutProps> = ({ meta, children }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {meta.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} />
            {new Date(meta.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>

          <span className="flex items-center gap-1.5">
            <Tag size={16} />
            {meta.tags.join(', ')}
          </span>
        </div>
      </header>

      <MDXProvider components={mdxComponents}>
        <article className="prose-custom">
          {children}
        </article>
      </MDXProvider>
    </div>
  );
};

export default MDXLayout;
