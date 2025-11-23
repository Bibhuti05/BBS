import React from 'react';

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
  icon: React.ReactNode;
  level: number; // 0-100
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}