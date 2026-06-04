export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
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

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}