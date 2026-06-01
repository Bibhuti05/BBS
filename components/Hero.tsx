import React from "react";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 z-10 text-center">
        {/* Photo */}
        <div className="flex-shrink-0 mb-10 animate-fade-in-up [animation-delay:100ms]">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, #10b981, #059669, #34d399, #047857, #a7f3d0, #10b981)",
                padding: "4px",
              }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-dark-bg"></div>
            </div>
            <div className="absolute inset-[4px] rounded-full bg-white dark:bg-dark-bg"></div>
            <div className="absolute inset-[8px] rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900 dark:to-emerald-900 flex items-center justify-center">
              <span className="text-6xl md:text-7xl font-bold text-primary-600/20 dark:text-primary-400/20 select-none">
                B
              </span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="inline-flex mb-6 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20 backdrop-blur-sm items-center gap-2 w-fit animate-fade-in-up [animation-delay:200ms]">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            Open to new opportunities!
          </span>
        </div>

        {/* Name */}
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-2 animate-fade-in-up [animation-delay:300ms]">
          Hi, I'm
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight leading-tight animate-fade-in-up [animation-delay:400ms]">
          Bibhuti Bhushan{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-700 dark:from-primary-400 dark:to-emerald-600">
            Saha
          </span>
        </h1>

        {/* Role + Tagline */}
        <p className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2 animate-fade-in-up [animation-delay:500ms]">
          Frontend Developer
        </p>
        <p className="text-base md:text-lg text-primary-600 dark:text-primary-400 font-medium mb-4 italic animate-fade-in-up [animation-delay:500ms]">
          From pixel to production
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 justify-center animate-fade-in-up [animation-delay:600ms]">
          <MapPin size={16} className="text-zinc-500 dark:text-zinc-400" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">India</span>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-xl mx-auto animate-fade-in-up [animation-delay:600ms]">
          Specializing in React, Next.js & TypeScript. Building products with
          real-world{" "}
          <span className="text-primary-600 dark:text-primary-400 font-semibold">
            Impact
          </span>
          .
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up [animation-delay:700ms]">
          <a
            href="https://drive.google.com/file/d/1H8IXBW2BYOO1j44XKTkMvK-kxALLphRq/view?usp=drive_link"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary-500/30"
          >
            Resume / CV <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 hover:border-primary-500 dark:hover:border-primary-500"
          >
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 justify-center animate-fade-in-up [animation-delay:800ms]">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              aria-label={link.name}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary-500 dark:text-primary-400 opacity-70">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;