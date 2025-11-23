import React from "react";
import { ArrowRight, Download } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center z-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20 backdrop-blur-sm flex items-center gap-2 dt w-fit mx-auto ">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            Open to new opportunities!
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight animate-fade-in-up [animation-delay:100ms]">
          Building Systems. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-700 dark:from-primary-400 dark:to-emerald-600">
            {"useEffect( )"}
          </span>{" "}
          for effect.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms]">
          I am a passionate software developer from India who loves building
          products with real life {" "}
          <span className="text-primary-600 dark:text-primary-400 font-semibold">
            Impact
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
          <a
            href="https://drive.google.com/file/d/1H8IXBW2BYOO1j44XKTkMvK-kxALLphRq/view?usp=drive_link"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary-500/30"
          >
            Resume / CV <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="group relative w-full sm:w-auto rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 focus:outline-none hover:scale-105"
            style={{ padding: 0 }}
          >
            {/* Spinning gradient shadow */}
            <span
              className="absolute inset-0 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none spin-gradient"
              style={{
                filter: "blur(50px)",
                background:
                  "conic-gradient(from 0deg, #06b6d4, #a21caf, #22d3ee, #16a34a, #06b6d4)",
                transition: "opacity 0.3s",
              }}
            />
            {/* Spinning gradient border */}
            <span
              className="absolute inset-0 rounded-full  z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none spin-gradient"
              style={{
                background:
                  "conic-gradient(from 0deg, #06b6d4, #a21caf, #22d3ee, #16a34a, #06b6d4)",
                transition: "opacity 0.3s",
              }}
            />
            {/* Button content */}
            <span className="relative z-20 w-full sm:w-auto px-8 py-3.5 rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 ">
              Contact Me
            </span>
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-primary-500 dark:text-primary-400 opacity-70">
        <Download className="rotate-90" size={24} />
      </div>
    </section>
  );
};

export default Hero;
