import { Project, Experience, Skill } from "./types";
import {
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/Bibhuti05", icon: Github },
  { name: "X / Twitter", href: "https://x.com/bibhuticodes", icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/feed/", icon: Linkedin },
];

export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "React Native" },
  { name: "Node.js" },
  { name: "JavaScript" },
  { name: "PostgreSQL" },
  { name: "MySQL" },
  { name: "SQLite" },
  { name: "MongoDB" },
  { name: "Redis" },
  { name: "Prisma" },
  { name: "Socket.io" },
  { name: "GitHub" },
  { name: "Git" },
  { name: "npm" },
  { name: "Bun" },
  { name: "HTML" },
  { name: "CSS" },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 4,
    role: "Technical Support Consultant",
    company: "Adobe",
    period: "Mar 2026 - Apr 2026",
    description:
      "Technical Support Engineer – Adobe (Noida). On OMHRA Payroll.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTWyFb8AA31Ka6oQuAH0Fb1LJnLUsv5wWuw&s",
    responsibilities: [
      "Provided advanced technical support to enterprise clients on Adobe Experience Cloud, with deep specialization in Adobe Audience Manager.",
      "Designed and implemented Proof of Concept (POC) solutions using Adobe Web SDK and Edge Network for real-time data collection and audience integration.",
      "Expert in Audience Manager data model — built and troubleshot complex Signals, Traits, Segments, including Boolean logic, recency/frequency rules, and TTL configurations.",
      "Managed backend support operations including DCS (Data Collection Servers), profile merging, ID synchronization, and real-time trait/segment qualification issues.",
      "Diagnosed and resolved complex integration issues involving DIL, Web SDK, Server-to-Server (S2S) data ingestion, and destination activations.",
      "Supported clients on Audience Manager REST APIs, Bulk Management Tool (BAAM), and integrations with Adobe Analytics, Target, and Real-Time CDP.",
    ],
    companyUrl: "https://www.adobe.com/",
  },
  {
    id: 1,
    role: "Software Development Engineer (Front-end)",
    company: "Zemuria.com",
    period: "2024 - 2026",
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
    title: "UfdLoader",
    description:
      "Terminal-based download accelerator built with multi-connection technology. Features parallel segmented downloads, resume support, cross-platform native binaries, real-time terminal UI with per-connection progress bars, and an interactive folder picker.",
    tags: ["Bun", "TypeScript", "React", "Ink", "Axios"],
    link: "https://1in1b.github.io/ufd/",
    github: "https://github.com/1IN1B/ufd",
    image: "/assets/ufdloader.png",
  },
  {
    id: 2,
    title: "Xplore",
    description:
      "Minimalist anonymous video and text chat application — an Omegle-inspired clone built with Next.js, WebRTC, and Socket.io. Features peer-to-peer video/audio streaming, real-time messaging, skip-to-next-partner, and dark/light theme support.",
    tags: ["Next.js", "WebRTC", "Socket.io", "TypeScript", "Tailwind CSS"],
    link: "https://xplore-production.up.railway.app/",
    github: "https://github.com/1IN1B/xplore",
    image: "/assets/xplore.png",
  },
  {
    id: 3,
    title: "TicketGo",
    description:
      "Modern ticket management system with authentication, role-based access, form validation, and database integration. Built with Next.js, TypeScript, MySQL, NextAuth, Radix UI, and Zustand for state management.",
    tags: ["Next.js", "TypeScript", "MySQL", "NextAuth", "Zustand"],
    link: "https://ticketgo-wine.vercel.app/",
    github: "https://github.com/1IN1B/ticketgo",
    image: "/assets/ticketgo.png",
  },
];
