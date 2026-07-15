import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Calendar, Tag } from 'lucide-react';
import type { BlogPostMeta } from '../types';

function mergeClasses(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const mdxComponents = {
  h1: (props: any) => <h1 className={mergeClasses("text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4", props.className)}>{props.children}</h1>,
  h2: (props: any) => <h2 className={mergeClasses("text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2", props.className)}>{props.children}</h2>,
  h3: (props: any) => <h3 className={mergeClasses("text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-2", props.className)}>{props.children}</h3>,
  p: (props: any) => <p className={mergeClasses("text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4", props.className)}>{props.children}</p>,
  ul: (props: any) => <ul className={mergeClasses("list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1", props.className)}>{props.children}</ul>,
  ol: (props: any) => <ol className={mergeClasses("list-decimal list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1", props.className)}>{props.children}</ol>,
  li: (props: any) => <li className={mergeClasses("text-zinc-700 dark:text-zinc-300 leading-relaxed", props.className)}>{props.children}</li>,
  a: (props: any) => <a className={mergeClasses("text-primary-600 dark:text-primary-400 hover:underline underline-offset-2", props.className)} {...props} />,
  blockquote: (props: any) => <blockquote className={mergeClasses("border-l-4 border-primary-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4", props.className)}>{props.children}</blockquote>,
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) return <code className="bg-zinc-100 dark:bg-zinc-800 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    return <code className="text-sm font-mono">{props.children}</code>;
  },
  pre: (props: any) => <pre className="w-full max-w-full min-w-0 bg-zinc-900 dark:bg-black rounded-xl p-5 overflow-x-auto my-6 border border-zinc-700 text-sm font-mono text-zinc-200 shadow-lg">{props.children}</pre>,
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
