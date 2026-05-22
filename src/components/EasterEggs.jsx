import { useEffect } from 'react';
import { triggerConfetti, playConfettiSound } from './ConfettiExplosion';
import { triggerMograBurst } from './MograCanvas';

const EasterEggs = ({ onSecretUnlocked }) => {
  useEffect(() => {
    let keySequence = [];
    const secretSequences = {
      // Konami code style
      'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight': () => {
        triggerMograBurst(window.innerWidth / 2, window.innerHeight / 2);
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            triggerConfetti(
              Math.random() * window.innerWidth,
              Math.random() * window.innerHeight,
              30,
              ['star', 'diamond']
            );
            playConfettiSound(200 + i * 100);
          }, i * 150);
        }
      },
      // Rainbow party
      'r,a,i,n,b,o,w': () => {
        const colors = [
          '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF',
          '#4B0082', '#9400D3'
        ];
        for (let i = 0; i < 7; i++) {
          setTimeout(() => {
            triggerConfetti(
              window.innerWidth / 2,
              window.innerHeight / 2,
              40,
              ['circle', 'square', 'star']
            );
            playConfettiSound(440 + i * 100);
          }, i * 100);
        }
      },
      // Heart surge
      's,m,i,l,e': () => {
        triggerMograBurst(window.innerWidth / 2, window.innerHeight / 2);
        setTimeout(() => triggerMograBurst(window.innerWidth / 2, window.innerHeight / 2), 200);
        setTimeout(() => triggerMograBurst(window.innerWidth / 2, window.innerHeight / 2), 400);
      },
      // Celebration
      'c,e,l,e,b,r,a,t,e': () => {
        const corners = [
          { x: window.innerWidth * 0.25, y: window.innerHeight * 0.25 },
          { x: window.innerWidth * 0.75, y: window.innerHeight * 0.25 },
          { x: window.innerWidth * 0.25, y: window.innerHeight * 0.75 },
          { x: window.innerWidth * 0.75, y: window.innerHeight * 0.75 },
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        ];
        corners.forEach((pos, idx) => {
          setTimeout(() => {
            triggerConfetti(pos.x, pos.y, 30);
            playConfettiSound(300 + idx * 100);
          }, idx * 100);
        });
      },
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      
      // Add arrow keys properly
      if (e.key.startsWith('Arrow')) {
        keySequence.push(e.key);
      } else if (key.match(/^[a-z]$/)) {
        keySequence.push(key);
      } else {
        return;
      }

      // Keep only last 20 keys
      if (keySequence.length > 20) {
        keySequence.shift();
      }

      const currentSequence = keySequence.join(',');

      // Check all secret sequences
      Object.entries(secretSequences).forEach(([sequence, callback]) => {
        if (currentSequence.endsWith(sequence)) {
          e.preventDefault();
          callback();
          keySequence = []; // Reset sequence
          if (onSecretUnlocked) {
            onSecretUnlocked(sequence);
          }
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    // Easter egg: Double click on body
    let clickCount = 0;
    let clickTimer = null;

    const handleDoubleClick = (e) => {
      clickCount++;
      if (clickCount === 2) {
        triggerConfetti(e.clientX, e.clientY, 40, ['circle', 'square']);
        playConfettiSound(800);
        clickCount = 0;
      }

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 300);
    };

    document.addEventListener('click', handleDoubleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleDoubleClick);
      clearTimeout(clickTimer);
    };
  }, [onSecretUnlocked]);

  return null;
};

export default EasterEggs;
