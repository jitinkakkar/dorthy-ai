import clsx from "clsx";
import { useRef } from "react";

import { ChatKitPanel } from "./components/ChatKitPanel";
import type { ChatKit } from "./components/ChatKitPanel";
import { useAppStore } from "./store/useAppStore";

export default function App() {
  const chatkitRef = useRef<ChatKit | null>(null);

  const scheme = useAppStore((state) => state.scheme);

  const containerClass = "h-screen bg-gradient-to-br from-[#1d5b5f] via-[#1d5b5f]/95 to-[#2a7075] relative overflow-hidden";

  return (
    <div className={containerClass}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#f1bd3f]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#f8c954]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#a4984b]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main container - Split layout on desktop, stacked on mobile */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-stretch gap-0">
        
        {/* Left side - Hero section */}
        <div className="flex-shrink-0 w-full lg:w-[45%] flex flex-col justify-center items-center p-4 py-6 lg:p-12 relative">
          {/* Decorative accent shape */}
          <div className="absolute top-10 right-10 w-32 h-32 border-4 border-[#f1bd3f]/30 rounded-3xl rotate-12 hidden lg:block"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-[#f8c954]/20 rounded-full hidden lg:block"></div>
          
          <div className="max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl px-6 py-3 lg:px-10 lg:py-5 shadow-2xl border border-white/50 ring-2 ring-[#f1bd3f]/30 transform hover:scale-105 hover:rotate-1 transition-all duration-500">
              <img src="/logo.png" alt="Dorthy AI" className="h-12 lg:h-20 w-auto" />
            </div>

            {/* Tagline - Compact on mobile */}
            <div className="space-y-2 lg:space-y-4">
              <h1 className="text-2xl lg:text-6xl font-bold leading-tight">
                <span className="text-white/90">There's </span>
                <span className="text-white relative inline-block">
                  NO
                  <svg className="absolute -bottom-1 lg:-bottom-2 left-0 w-full" height="6" viewBox="0 0 100 8">
                    <path d="M0 4 Q25 0, 50 4 T100 4" stroke="url(#gradient)" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f1bd3f" />
                        <stop offset="100%" stopColor="#f8c954" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br className="hidden lg:block" />
                <span className="text-white/90"> place like</span>
                <br />
                <span className="text-3xl lg:text-7xl bg-gradient-to-r from-[#f1bd3f] via-[#f8c954] to-[#f1bd3f] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  your own
                </span>
              </h1>
              
              <p className="text-sm lg:text-xl text-white/70 font-light max-w-md hidden lg:block">
                Your personal AI guide for finding and buying your dream home in Ontario
              </p>
            </div>

            {/* Feature badges - Hidden on mobile */}
            <div className="hidden lg:flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium">
                ✨ AI-Powered
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium">
                🏠 Ontario Focused
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium">
                💡 Expert Guidance
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Chat interface */}
        <div className="flex-1 flex items-center justify-center p-3 pb-4 lg:p-8 lg:pr-12">
          <div className="w-full h-full max-h-[calc(100vh-240px)] lg:max-h-[calc(100vh-4rem)] relative">
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#f1bd3f]/20 via-[#f8c954]/10 to-transparent rounded-[2.5rem] blur-2xl"></div>
            
            {/* Chat container with glass effect */}
            <div className="relative w-full h-full rounded-[1.5rem] lg:rounded-[2rem] bg-white/95 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] border border-white/40 overflow-hidden transform lg:hover:scale-[1.01] transition-transform duration-500">
              <ChatKitPanel onChatKitReady={(chatkit) => (chatkitRef.current = chatkit)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
