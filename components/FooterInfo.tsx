import React from 'react';

interface FooterInfoProps {
  onAboutClick: () => void;
}

export const FooterInfo: React.FC<FooterInfoProps> = ({ onAboutClick }) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* About Link - Centered above the footer content */}
      <div className="flex justify-center mb-8 md:mb-16">
         <button 
           onClick={onAboutClick}
           className="text-[11px] md:text-xs tracking-[0.2em] border-b border-white/20 pb-0.5 hover:border-white transition-colors uppercase text-[#e5e5e5] bg-transparent cursor-pointer outline-none"
         >
           About
         </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end w-full gap-6 md:gap-0">
        
        {/* Left: Location */}
        <div className="order-2 md:order-1 w-full md:w-1/3 text-center md:text-left">
          <span className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#e5e5e5]">
            Toronto
          </span>
        </div>

        {/* Center: Brand Name */}
        <div className="order-1 md:order-2 w-full md:w-1/3 text-center">
           <span className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#e5e5e5]">
             Vevhar
           </span>
        </div>

        {/* Right: Contact */}
        <div className="order-3 md:order-3 w-full md:w-1/3 text-center md:text-right">
          <a 
            href="mailto:contact@vevharcap.com" 
            className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#e5e5e5] hover:text-white transition-colors"
          >
            contact@vevharcap.com
          </a>
        </div>

      </div>
    </div>
  );
};