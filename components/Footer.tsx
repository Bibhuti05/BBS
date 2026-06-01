import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} BBS, i churn code like machine but better than AI.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="https://github.com/Bibhuti05" className="text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://x.com/bibhuticodes" className="text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/feed/" className="text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;