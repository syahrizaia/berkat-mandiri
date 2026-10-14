"use client";

import React from "react";

export default function LiquidMeshBackground() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* SVG Water Refraction Filter definition for optional SVG distortion */}
      <svg className="hidden">
        <defs>
          <filter id="water-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.02 0.015" 
              numOctaves="3" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="8" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Flowing Liquid Aurora Wave Ribbon (Diagonal flowing light beam) */}
      <div className="absolute -inset-[30%] opacity-40 hardware-accel animate-liquid-aurora">
        <div className="w-full h-full bg-gradient-to-tr from-emerald-500/25 via-teal-400/20 to-cyan-500/25 blur-[120px] rounded-full" />
      </div>

      {/* Layer 2: Floating Organic Liquid Gradient Orbs with Continuous Water Physics */}
      <div className="absolute inset-0 hardware-accel">
        {/* Orb 1: Primary Emerald Glow (Top Left Quadrant) */}
        <div 
          className="absolute -top-[12%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] bg-gradient-to-br from-emerald-400/40 via-teal-500/30 to-emerald-600/25 blur-[95px] liquid-morph-1 animate-liquid-orb-1"
        />

        {/* Orb 2: Marine Teal & Sky Cyan (Top Right Quadrant) */}
        <div 
          className="absolute top-[10%] -right-[15%] w-[68vw] h-[68vw] max-w-[900px] max-h-[900px] bg-gradient-to-bl from-teal-400/35 via-cyan-400/25 to-sky-500/20 blur-[105px] liquid-morph-2 animate-liquid-orb-2"
        />

        {/* Orb 3: Mint Aqua & Ocean Cyan (Center / Bottom Left) */}
        <div 
          className="absolute top-[45%] -left-[12%] w-[58vw] h-[58vw] max-w-[780px] max-h-[780px] bg-gradient-to-tr from-emerald-500/35 via-teal-300/25 to-cyan-400/20 blur-[90px] liquid-morph-1 animate-liquid-orb-3"
        />

        {/* Orb 4: Sunlit Caustic & Marine Deep Emerald (Bottom Right) */}
        <div 
          className="absolute bottom-[-15%] right-[5%] w-[62vw] h-[62vw] max-w-[820px] max-h-[820px] bg-gradient-to-t from-teal-600/30 via-emerald-400/25 to-amber-300/15 blur-[100px] liquid-morph-2 animate-liquid-orb-1"
        />
      </div>

      {/* Layer 3: Rising Crystal Water Droplet Bubbles (Organic floating bioluminescence) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bubble 1 */}
        <div 
          className="absolute left-[8%] w-5 h-5 rounded-full bg-emerald-400/30 border border-white/60 shadow-[0_4px_16px_rgba(5,150,105,0.25)] backdrop-blur-xs animate-bubble-1"
          style={{ animationDelay: "0s" }}
        />
        {/* Bubble 2 */}
        <div 
          className="absolute left-[20%] w-7 h-7 rounded-full bg-teal-400/25 border border-white/70 shadow-[0_4px_20px_rgba(13,148,136,0.25)] backdrop-blur-xs animate-bubble-2"
          style={{ animationDelay: "-3.5s" }}
        />
        {/* Bubble 3 */}
        <div 
          className="absolute left-[34%] w-4 h-4 rounded-full bg-cyan-300/30 border border-white/50 shadow-[0_2px_12px_rgba(6,182,212,0.2)] backdrop-blur-xs animate-bubble-3"
          style={{ animationDelay: "-7s" }}
        />
        {/* Bubble 4 */}
        <div 
          className="absolute left-[48%] w-8 h-8 rounded-full bg-emerald-300/30 border border-white/75 shadow-[0_6px_24px_rgba(5,150,105,0.3)] backdrop-blur-xs animate-bubble-1"
          style={{ animationDelay: "-2s" }}
        />
        {/* Bubble 5 */}
        <div 
          className="absolute left-[62%] w-5 h-5 rounded-full bg-teal-400/30 border border-white/60 shadow-[0_4px_16px_rgba(13,148,136,0.25)] backdrop-blur-xs animate-bubble-2"
          style={{ animationDelay: "-5.5s" }}
        />
        {/* Bubble 6 */}
        <div 
          className="absolute left-[74%] w-6 h-6 rounded-full bg-sky-400/25 border border-white/70 shadow-[0_4px_18px_rgba(56,189,248,0.2)] backdrop-blur-xs animate-bubble-3"
          style={{ animationDelay: "-9s" }}
        />
        {/* Bubble 7 */}
        <div 
          className="absolute left-[86%] w-4 h-4 rounded-full bg-emerald-400/30 border border-white/60 shadow-[0_2px_12px_rgba(5,150,105,0.2)] backdrop-blur-xs animate-bubble-1"
          style={{ animationDelay: "-4s" }}
        />
        {/* Bubble 8 */}
        <div 
          className="absolute left-[94%] w-7 h-7 rounded-full bg-teal-300/25 border border-white/65 shadow-[0_5px_20px_rgba(20,184,166,0.25)] backdrop-blur-xs animate-bubble-2"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* Layer 4: Animated Water Caustic Mesh Pattern (Continuous gentle drift) */}
      <div className="absolute inset-0 opacity-[0.045] bg-[radial-gradient(#059669_1.2px,transparent_1.2px)] [background-size:32px_32px] animate-caustic-drift" />
    </div>
  );
}
