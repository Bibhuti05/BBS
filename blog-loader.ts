import type { BlogPostData } from './types';

const rawPosts = import.meta.glob('/content/blog/*.mdx', { eager: true });

const posts: BlogPostData[] = Object.entries(rawPosts).map(([filepath, module]: [string, any]) => {
  const slug = filepath.replace('/content/blog/', '').replace('.mdx', '');
  return {
    slug,
    meta: module.metadata,
    Component: module.default,
  };
});

posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

export function getAllPosts(): BlogPostData[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return posts.find((post) => post.slug === slug);
}
