import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32 opacity-80 hover:opacity-100 transition-opacity duration-500">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#666666" />
            <stop offset="50%" stopColor="#aaaaaa" />
            <stop offset="100%" stopColor="#666666" />
          </linearGradient>
        </defs>
        
        {/* Left Parallelogram */}
        <path 
          d="M35 25 L55 25 L45 75 L25 75 Z" 
          stroke="url(#metal-gradient)" 
          strokeWidth="2"
          fill="transparent"
        />
        
        {/* Right Parallelogram */}
        <path 
          d="M60 25 L80 25 L70 75 L50 75 Z" 
          stroke="url(#metal-gradient)" 
          strokeWidth="2" 
          fill="transparent"
        />
      </svg>
    </div>
  );
};