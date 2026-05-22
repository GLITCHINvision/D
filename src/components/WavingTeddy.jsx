import React, { useEffect, useState } from 'react';

const WavingTeddy = () => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    // Random blink every 2-4 seconds
    const blinkLoop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
      setTimeout(blinkLoop, 2000 + Math.random() * 2500);
    };
    const t = setTimeout(blinkLoop, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!document.getElementById('kawaii-cat-styles')) {
      const style = document.createElement('style');
      style.id = 'kawaii-cat-styles';
      style.textContent = `
        @keyframes catFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pawWave {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          12% { transform: rotate(-30deg) translateY(-3px); }
          25% { transform: rotate(20deg) translateY(-1px); }
          37% { transform: rotate(-25deg) translateY(-2px); }
          50% { transform: rotate(15deg) translateY(0); }
          62% { transform: rotate(-18deg) translateY(-1px); }
          75% { transform: rotate(8deg) translateY(0); }
        }

        @keyframes tailSwish {
          0%, 100% { transform: rotate(-15deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
          75% { transform: rotate(15deg); }
        }

        @keyframes sparkle1 {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes sparkle2 {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(45deg); }
          50% { opacity: 1; transform: scale(1) rotate(225deg); }
        }
        @keyframes sparkle3 {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(90deg); }
          50% { opacity: 1; transform: scale(1) rotate(270deg); }
        }

        @keyframes hiPop {
          0% { opacity: 0; transform: scale(0.5) translateY(6px); }
          50% { transform: scale(1.08) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes whiskerTwitch {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(3deg); }
          60% { transform: rotate(-3deg); }
        }

        .kawaii-cat-container {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 100;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        .cat-float {
          animation: catFloat 2.8s ease-in-out infinite;
        }

        .cat-paw-wave {
          transform-origin: 108px 80px;
          animation: pawWave 1.6s ease-in-out infinite;
        }

        .cat-tail {
          transform-origin: 28px 100px;
          animation: tailSwish 2s ease-in-out infinite;
        }

        .cat-whisker-l {
          transform-origin: 60px 72px;
          animation: whiskerTwitch 3s ease-in-out infinite;
        }
        .cat-whisker-r {
          transform-origin: 88px 72px;
          animation: whiskerTwitch 3s ease-in-out infinite 0.3s;
        }

        .cat-sparkle-1 {
          animation: sparkle1 2.2s ease-in-out infinite;
        }
        .cat-sparkle-2 {
          animation: sparkle2 2.8s ease-in-out infinite 0.6s;
        }
        .cat-sparkle-3 {
          animation: sparkle3 2.4s ease-in-out infinite 1.2s;
        }

        .cat-hi-bubble {
          margin-bottom: 4px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(220, 170, 190, 0.35);
          border-radius: 16px 16px 16px 4px;
          padding: 5px 14px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #7D5A6A;
          white-space: nowrap;
          box-shadow: 0 3px 12px rgba(0,0,0,0.06);
          animation: hiPop 0.5s ease-out forwards;
          font-family: 'Quicksand', sans-serif;
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .kawaii-cat-container {
            bottom: 8px;
            right: 8px;
          }
          .kawaii-cat-container svg {
            width: 100px;
            height: 100px;
          }
          .cat-hi-bubble {
            font-size: 0.68rem;
            padding: 4px 10px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const eyeH = blink ? 0.8 : 5;

  return (
    <div className="kawaii-cat-container">
      <div className="cat-hi-bubble">Hi there! 👋</div>

      <div className="cat-float">
        <svg
          width="130"
          height="130"
          viewBox="0 0 150 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparkles */}
          <g className="cat-sparkle-1">
            <polygon points="20,20 22,26 28,28 22,30 20,36 18,30 12,28 18,26" fill="#F5C8D6" />
          </g>
          <g className="cat-sparkle-2">
            <polygon points="130,15 131.5,19 136,20.5 131.5,22 130,26 128.5,22 124,20.5 128.5,19" fill="#C8E0F5" />
          </g>
          <g className="cat-sparkle-3">
            <polygon points="15,70 16.5,74 21,75.5 16.5,77 15,81 13.5,77 9,75.5 13.5,74" fill="#E0D4F5" />
          </g>

          {/* Tail */}
          <g className="cat-tail">
            <path
              d="M 35 108 Q 15 100 18 80 Q 20 65 30 60"
              stroke="#E0B89A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="30" cy="58" r="4" fill="#F2D0B8" />
          </g>

          {/* Body */}
          <ellipse cx="75" cy="105" rx="30" ry="28" fill="#F2D0B8" />

          {/* Belly white patch */}
          <ellipse cx="75" cy="108" rx="18" ry="18" fill="#FFF5EE" opacity="0.7" />

          {/* Left leg */}
          <ellipse cx="58" cy="128" rx="10" ry="7" fill="#E0B89A" />
          <ellipse cx="58" cy="130" rx="6" ry="3.5" fill="#F2D0B8" opacity="0.6" />

          {/* Right leg */}
          <ellipse cx="92" cy="128" rx="10" ry="7" fill="#E0B89A" />
          <ellipse cx="92" cy="130" rx="6" ry="3.5" fill="#F2D0B8" opacity="0.6" />

          {/* Left arm (resting) */}
          <ellipse cx="48" cy="100" rx="7" ry="14" fill="#E0B89A" transform="rotate(15, 48, 100)" />

          {/* Right arm (WAVING paw!) */}
          <g className="cat-paw-wave">
            <ellipse cx="108" cy="88" rx="7" ry="15" fill="#E0B89A" transform="rotate(-20, 108, 88)" />
            {/* Paw pad */}
            <ellipse cx="112" cy="74" rx="5.5" ry="5" fill="#F2D0B8" />
            <circle cx="110" cy="72" r="1.8" fill="#E8A0B0" opacity="0.6" />
            <circle cx="114" cy="72" r="1.8" fill="#E8A0B0" opacity="0.6" />
            <circle cx="112" cy="76" r="2.2" fill="#E8A0B0" opacity="0.5" />
          </g>

          {/* Head */}
          <circle cx="75" cy="58" r="28" fill="#F2D0B8" />

          {/* Left ear (triangular) */}
          <polygon points="50,38 42,12 60,30" fill="#E0B89A" />
          <polygon points="52,36 46,18 58,32" fill="#F5B8C8" opacity="0.6" />

          {/* Right ear (triangular) */}
          <polygon points="100,38 108,12 90,30" fill="#E0B89A" />
          <polygon points="98,36 104,18 92,32" fill="#F5B8C8" opacity="0.6" />

          {/* Eyes */}
          <ellipse cx="64" cy="55" rx="4.5" ry={eyeH} fill="#3A2F2F">
            {!blink && <animate attributeName="ry" values="5;5;5;5;0.8;5;5" dur="4s" repeatCount="indefinite" begin="0s" />}
          </ellipse>
          {!blink && <circle cx="65.5" cy="53" r="1.8" fill="white" />}

          <ellipse cx="86" cy="55" rx="4.5" ry={eyeH} fill="#3A2F2F">
            {!blink && <animate attributeName="ry" values="5;5;5;5;0.8;5;5" dur="4s" repeatCount="indefinite" begin="0.1s" />}
          </ellipse>
          {!blink && <circle cx="87.5" cy="53" r="1.8" fill="white" />}

          {/* Nose */}
          <polygon points="75,62 72,59 78,59" fill="#E8889A" />

          {/* Mouth */}
          <path d="M 72 64 Q 75 68 78 64" stroke="#C48090" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <line x1="75" y1="62" x2="75" y2="65" stroke="#C48090" strokeWidth="1.2" strokeLinecap="round" />

          {/* Whiskers left */}
          <g className="cat-whisker-l">
            <line x1="60" y1="62" x2="38" y2="58" stroke="#D4A89A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <line x1="60" y1="65" x2="36" y2="65" stroke="#D4A89A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <line x1="60" y1="68" x2="38" y2="72" stroke="#D4A89A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Whiskers right */}
          <g className="cat-whisker-r">
            <line x1="90" y1="62" x2="112" y2="58" stroke="#D4A89A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <line x1="90" y1="65" x2="114" y2="65" stroke="#D4A89A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <line x1="90" y1="68" x2="112" y2="72" stroke="#D4A89A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Blush cheeks */}
          <circle cx="55" cy="66" r="5" fill="#F5A0B8" opacity="0.25" />
          <circle cx="95" cy="66" r="5" fill="#F5A0B8" opacity="0.25" />
        </svg>
      </div>
    </div>
  );
};

export default WavingTeddy;
