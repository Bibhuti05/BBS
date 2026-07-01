export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  responsibilities: string[];
  companyUrl?: string;
}

export interface Skill {
  name: string;
}

export interface BlogPostMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogPostData {
  slug: string;
  meta: BlogPostMeta;
  Component: React.FC;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}