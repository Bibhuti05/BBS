declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { BlogPostMeta } from './types';

  let MDXComponent: ComponentType;
  export default MDXComponent;
  export const metadata: BlogPostMeta;
}
