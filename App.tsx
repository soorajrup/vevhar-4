import React, { useState } from 'react';
import { WorldClock } from './components/WorldClock';
import { FooterInfo } from './components/FooterInfo';
import { Skyscraper3D } from './components/Skyscraper3D';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'about'>('home');

  return (
    <div className="w-full bg-black text-[#e5e5e5] min-h-screen">
      
      {/* VIEW: HOME */}
      {view === 'home' && (
        <section className="relative w-full h-[100dvh] flex flex-col justify-between overflow-hidden fade-in">
          {/* Top Header */}
          <div className="w-full p-6 md:p-12 shrink-0 flex justify-center">
            <WorldClock />
          </div>

          {/* Center 3D Element */}
          <div className="flex-grow flex items-center justify-center translate-y-8">
            <div className="w-48 h-48 md:w-64 md:h-64 opacity-90">
              <Skyscraper3D />
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="w-full p-6 md:p-12 shrink-0">
            <FooterInfo onAboutClick={() => setView('about')} />
          </div>
        </section>
      )}

      {/* VIEW: ABOUT */}
      {view === 'about' && (
        <section className="w-full h-[100dvh] flex flex-col items-center justify-center p-8 md:p-24 fade-in">
           {/* Font size reduced by 50% back to text-[11px] (mobile) and text-xs (desktop) */}
           <div className="max-w-3xl text-[11px] md:text-xs text-center leading-loose tracking-[0.1em] text-[#e5e5e5] opacity-90">
              <p className="mb-6">
                Software driven asset management firm specializing in purpose built rentals, hotels, and senior housing.
              </p>
              
              <div className="mt-12 flex justify-center font-sans">
                 <button 
                   onClick={() => setView('home')} 
                   className="border-b border-white/20 pb-0.5 hover:border-white transition-colors cursor-pointer bg-transparent text-[11px] md:text-xs tracking-[0.2em] uppercase text-[#e5e5e5] outline-none"
                 >
                   Back
                 </button>
              </div>
           </div>
        </section>
      )}
        
    </div>
  );
};

export default App;
