import React from 'react';

// SVG 1: Intro Screen Angry Doctor Heart
export const AngryHeartSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,60 C20,95 100,95 100,60" fill="none" stroke="#C3E5DE" strokeWidth="4" strokeLinecap="round" />
    <path className="pulse-heart" d="M60,95 C-10,50 30,10 60,35 C90,10 130,50 60,95 Z" fill="#A6A6D9" />
    <circle cx="60" cy="85" r="8" fill="#FFF" stroke="#B7B7B7" strokeWidth="2" />
    <circle cx="60" cy="85" r="4" fill="#B7B7B7" />
    <path d="M40,25 C40,15 48,15 48,22" fill="none" stroke="#8E7C7A" strokeWidth="2" />
    <path d="M80,25 C80,15 72,15 72,22" fill="none" stroke="#8E7C7A" strokeWidth="2" />
    <path className="angry-steam" d="M38,20 Q33,12 38,5" fill="none" stroke="#C3E5DE" strokeWidth="2" strokeLinecap="round" />
    <path className="angry-steam" d="M82,20 Q77,12 82,5" fill="none" stroke="#C3E5DE" strokeWidth="2" strokeLinecap="round" />

    
    {/* Angry face details */}
    <path d="M46,38 L54,42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M74,38 L66,42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="45" r="2.5" fill="#FFFFFF" />
    <circle cx="70" cy="45" r="2.5" fill="#FFFFFF" />
    <path d="M56,56 Q60,52 64,56" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// SVG 2: Traditional Cutting Chai
export const ChaiSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,85 L40,30 L80,30 L90,85 Z" fill="#FFE0B2" stroke="#D4A373" strokeWidth="3" />
    <path d="M40,30 L80,30 L83,15 L37,15 Z" fill="#E6CCB2" opacity="0.6" />
    <path d="M33,70 L37,45 L83,45 L87,70 Z" fill="#D4A373" />
    <rect x="33" y="45" width="54" height="20" rx="3" fill="#D4A373" stroke="#A98467" strokeWidth="1.5" />
    <path className="angry-steam" d="M50,12 C50,2 60,2 60,-8" fill="none" stroke="#E6CCB2" strokeWidth="2" strokeLinecap="round" />
    <path className="angry-steam" d="M70,12 C70,4 64,4 64,-4" fill="none" stroke="#E6CCB2" strokeWidth="2" strokeLinecap="round" />
    <circle cx="60" cy="55" r="3" fill="#FFF" opacity="0.7"/>
    <circle cx="53" cy="58" r="2" fill="#FFF" opacity="0.7"/>
  </svg>
);

// SVG 3: Strikethrough Pickup Ruled Letter
export const RuledLetterSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="15" width="80" height="90" rx="6" fill="#FFF" stroke="#C3E5DE" strokeWidth="2" />
    <line x1="30" y1="35" x2="90" y2="35" stroke="#E5E0E0" strokeWidth="1.5" />
    <line x1="30" y1="50" x2="90" y2="50" stroke="#E5E0E0" strokeWidth="1.5" />
    <line x1="30" y1="65" x2="90" y2="65" stroke="#E5E0E0" strokeWidth="1.5" />
    <line x1="30" y1="80" x2="90" y2="80" stroke="#E5E0E0" strokeWidth="1.5" />
    
    <text x="35" y="47" fontFamily="Quicksand" fontSize="7" fill="#B3A2A2" fontWeight="700">Are you a doctor...</text>
    <line x1="32" y1="44" x2="88" y2="44" stroke="#5BB3A1" strokeWidth="2" strokeLinecap="round" />
    
    <text x="35" y="62" fontFamily="Quicksand" fontSize="7" fill="#B3A2A2" fontWeight="700">Because my heart beats...</text>
    <line x1="32" y1="59" x2="88" y2="59" stroke="#5BB3A1" strokeWidth="2" strokeLinecap="round" />

    <path d="M60,72 L60,90 M55,83 L60,90 L65,83" fill="none" stroke="#5BB3A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

  </svg>
);

// SVG 4: Glowing Cardiac Stethoscope Beat Wave
export const StethoscopeBeatSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,60 L40,60 L48,35 L56,85 L64,50 L72,68 L80,60 L105,60" fill="none" stroke="#5BB3A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path className="pulse-heart" d="M92,45 C86,30 96,20 102,30 C108,20 118,30 112,45 C107,52 102,57 102,57 Z" fill="#E0C097" />
    <circle cx="102" cy="38" r="1.5" fill="#FFF" />

  </svg>
);

// SVG 5: Cap and Medical Heart Beat
export const DoctorDreamSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,55 L30,42 C30,35 90,35 90,42 L90,55" fill="#80C2B9" stroke="#5EA69D" strokeWidth="2" />
    <path d="M25,55 L95,55 L90,65 L30,65 Z" fill="#FFF" stroke="#5EA69D" strokeWidth="2" />
    <path d="M56,43 L64,43 M60,39 L60,47" fill="none" stroke="#5BB3A1" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M35,80 C35,100 85,100 85,80" fill="none" stroke="#B7B7B7" strokeWidth="3" strokeLinecap="round" />
    <path className="pulse-heart" d="M60,95 C52,88 56,82 60,85 C64,82 68,88 60,95 Z" fill="#A6A6D9" />

  </svg>
);

// SVG 6: Stubborn card blushing stethoscope
export const BlushingStethoscopeSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,60 C20,95 100,95 100,60" fill="none" stroke="#C3E5DE" strokeWidth="4" strokeLinecap="round" />
    <path className="pulse-heart" d="M60,90 C-10,45 30,5 60,30 C90,5 130,45 60,90 Z" fill="#A6A6D9" />
    <path d="M20,60 C20,30 40,30 60,60 C80,30 100,30 100,60" fill="none" stroke="#5BB3A1" strokeWidth="2" strokeDasharray="4" />
    <path d="M48,45 Q52,48 56,45" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M64,45 Q68,48 72,45" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="45" cy="52" r="3" fill="#E0C097" opacity="0.8" />
    <circle cx="75" cy="52" r="3" fill="#E0C097" opacity="0.8" />
    <path d="M57,51 Q60,54 63,51" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />

  </svg>
);
