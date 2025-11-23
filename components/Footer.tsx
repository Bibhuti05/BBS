import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} BBS, i churn code like machine but better than AI.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="https://github.com/Bibhuti05" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://x.com/bibhuticodes" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/feed/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;