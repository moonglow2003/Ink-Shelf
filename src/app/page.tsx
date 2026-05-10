'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 3.5 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-between py-12 px-6 relative">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          alt="Background" 
          className="w-full h-full object-cover grayscale opacity-60" 
          src="/splash-bg.jpg"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Background Decor Overlays */}
      <div className="fixed inset-0 bg-dot-grid-overlay z-[1]"></div>
      <div className="fixed inset-0 bg-halftone z-[2]"></div>
      <div className="fixed inset-0 speed-lines z-[3]"></div>

      {/* Header Logo */}
      <header className="relative z-10 w-full flex justify-center mb-8 content-entry">
        <div className="bg-white p-4 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
          <img 
            alt="InkShelf Logo" 
            className="w-48 md:w-64 h-auto object-contain" 
            src="/logo.jpg"
          />
        </div>
      </header>

      {/* Spacer */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        {/* Empty space to allow background visibility */}
      </div>

      {/* Footer / Loading State */}
      <footer className="relative z-10 w-full flex flex-col items-center mt-12 content-entry">
        <div className="bg-white border-[4px] border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center space-y-4 transform rotate-1">
          {/* Loading Text */}
          <p className="text-black font-bold uppercase tracking-[0.2em] text-sm italic">
            Loading your library...
          </p>
          
          {/* Ink Splat Loading Animation */}
          <div className="flex space-x-3 items-end h-8">
            <div className="animate-ink-1">
              <svg fill="black" height="12" viewBox="0 0 100 100" width="12">
                <circle cx="50" cy="50" r="45"></circle>
                <circle cx="20" cy="20" r="15"></circle>
              </svg>
            </div>
            <div className="animate-ink-2">
              <svg fill="black" height="16" viewBox="0 0 100 100" width="16">
                <path d="M50 0 C70 0 100 30 100 50 C100 70 70 100 50 100 C30 100 0 70 0 50 C0 30 30 0 50 0"></path>
              </svg>
            </div>
            <div className="animate-ink-3">
              <svg fill="black" height="10" viewBox="0 0 100 100" width="10">
                <circle cx="50" cy="50" r="40"></circle>
                <circle cx="80" cy="30" r="10"></circle>
              </svg>
            </div>
          </div>
        </div>
        

      </footer>

      {/* Decorative Elements */}
      {/* Bottom-left dynamic block */}
      <div className="fixed bottom-[-40px] left-[-40px] w-48 h-48 bg-black transform rotate-45 z-[5] border-8 border-white/20"></div>
      

    </main>
  );
}
