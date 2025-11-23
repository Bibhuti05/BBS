import React from "react";
import { Project, Experience, Skill } from "./types";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
} from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", icon: <Code2 className="w-6 h-6" />, level: 95 },
  { name: "TypeScript", icon: <Layout className="w-6 h-6" />, level: 90 },
  { name: "Tailwind CSS", icon: <Globe className="w-6 h-6" />, level: 95 },
  { name: "Node.js", icon: <Server className="w-6 h-6" />, level: 85 },
  { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, level: 80 },
  { name: "React Native", icon: <Smartphone className="w-6 h-6" />, level: 75 },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Software Development Engineer (Front-end)",
    company: "Zemuria.com",
    period: "2024 - Present",
    description: "Core developer of mysamantha.ai web application",
    logo: "https://pbs.twimg.com/profile_images/1713211566680637440/Uent8cGr_400x400.jpg",
    responsibilities: [
      "Developed and maintained the mysamantha.ai web application using Next.js, focusing on reliability and modern UX.",
      "Implemented an autosave system for fault tolerance in the journal and note-taking features.",
      "Built frontend integrations with AI SDKs and implemented OAuth flow and caching tailored for frontend needs.",
      "Refactored and maintained the Chrome extension 'mysamantha.ai webclipper', including extension authentication and complex message passing.",
      "Delivered backend-independent features and managed interactions with Gemini APIs.",
      "Contributed to building additional products like dashboard features and reporting for other company projects.",
    ],
    companyUrl: "https://zemuria.com/",
  },
  {
    id: 2,
    role: "Software Development Intern",
    company: "Secdesk",
    period: "2024",
    description:
      "Contributed to the MVP application for Secdesk, enhancing online security awareness and enabling client self-service appointment booking.",
    logo: "https://secdesk.com/wp-content/uploads/2023/06/social-share-image-2000x1600-1.jpg",
    responsibilities: [
      "Developed core features for Secdesk's MVP, including appointment booking integration via Calendly and data breach information services.",
      "Built landing pages tailored for regular and VIP customers, ensuring usability and modern frontend practices.",
      "Participated in code reviews, collaborated with team members, and supported brainstorming sessions for product enhancements.",
      "Contributed to optimizing the user journey for both client-facing and internal security service features.",
    ],
    companyUrl: "https://secdesk.com/",
  },
  {
    id: 3,
    role: "Volunteer Frontend Developer",
    company: "1IN1B.",
    period: "2023",
    description:
      "Worked on freelance projects and hobby projects with group and community involvement.",
    logo: "https://avatars.githubusercontent.com/u/136827822?s=200&v=4",
    responsibilities: [
      "Built responsive UI components based on Figma designs.",
      "Debugged and resolved over 200+ frontend issues in the company dashboard.",
      "Assisted in the integration of RESTful APIs.",
      "Participated in daily stand-ups and sprint planning meetings.",
    ],
    companyUrl: "https://github.com/1IN1B",
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoTrack Analytics",
    description:
      "A real-time dashboard for tracking environmental data using D3.js and React. Features interactive maps and data visualization.",
    tags: ["React", "D3.js", "Tailwind"],
    link: "#",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    title: "Nexus Chat App",
    description:
      "A real-time messaging platform with E2E encryption. Built with Socket.io and Node.js, featuring a modern glassmorphism UI.",
    tags: ["Socket.io", "Node.js", "MongoDB"],
    link: "#",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    title: "Cryptofolio",
    description:
      "Cryptocurrency portfolio tracker connecting to multiple exchanges via API. Includes price alerts and P&L analysis.",
    tags: ["TypeScript", "Next.js", "API"],
    link: "#",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    id: 4,
    title: "TaskMaster AI",
    description:
      "Productivity application that uses AI to prioritize tasks based on deadlines and user habits.",
    tags: ["OpenAI", "React", "Firebase"],
    link: "#",
    image: "https://picsum.photos/600/400?random=4",
  },
];
