import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <div className="animated-gradient absolute inset-0 opacity-[0.07] dark:opacity-[0.1]" />
    </div>
  );
};

export default Background;
