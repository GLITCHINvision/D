import React, { useEffect, useRef } from 'react';

const AmbientEffects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating orbs in background
    const createOrb = () => {
      const orb = document.createElement('div');
      const size = Math.random() * 80 + 40;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      const colors = [
        'rgba(255, 107, 107, 0.1)',
        'rgba(78, 205, 196, 0.1)',
        'rgba(69, 183, 209, 0.1)',
        'rgba(255, 160, 122, 0.1)',
      ];

      orb.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${x}%;
        top: ${y}%;
        filter: blur(40px);
        pointer-events: none;
        animation: floatOrb ${duration}s infinite ease-in-out ${delay}s;
      `;

      container.appendChild(orb);
    };

    // Create initial orbs
    for (let i = 0; i < 3; i++) {
      createOrb();
    }

    // Add CSS animation for floating
    if (!document.getElementById('ambient-styles')) {
      const style = document.createElement('style');
      style.id = 'ambient-styles';
      style.textContent = `
        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        .ambient-shimmer {
          animation: shimmer 3s infinite ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup is handled by component unmount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};

export default AmbientEffects;
