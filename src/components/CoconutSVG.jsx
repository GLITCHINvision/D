import React, { useState } from 'react';
import { triggerMograBurst } from './MograCanvas';

const CoconutSVG = () => {
  const [isCracked, setIsCracked] = useState(false);

  // Play dry coconut cracking noise in browser
  const playCrackAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Short filtered random noise for organic snap
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 6;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.08);
    } catch (e) {
      console.warn("Crack sound failed:", e);
    }
  };

  const handleCrack = (e) => {
    if (isCracked) return;
    setIsCracked(true);
    playCrackAudio();

    // Trigger Mogra/heart particle splash exactly where they tapped
    const rect = e.currentTarget.getBoundingClientRect();
    triggerMograBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  return (
    <div className="coconut-container">
      <svg
        className={`coconut-interactive ${isCracked ? 'cracked' : ''}`}
        onClick={handleCrack}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Inner Glowing Romantic Heart */}
          <g className="inner-heart">
            <path
              className="pulse-heart"
              d="M60,82 C30,55 45,30 60,45 C75,30 90,55 60,82 Z"
              fill="#A6A6D9"
            />
            {/* Blushing smiley face */}
            <circle cx="52" cy="50" r="2.5" fill="#FFF" />
            <circle cx="68" cy="50" r="2.5" fill="#FFF" />
            <circle cx="47" cy="55" r="2" fill="#E0C097" opacity="0.8" />
            <circle cx="73" cy="55" r="2" fill="#E0C097" opacity="0.8" />

            <path
              d="M57,59 Q60,62 63,59"
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Left Coconut Half */}
          <path
            className="coconut-half-left"
            d="M60,20 C35,20 20,45 30,75 C38,98 60,95 60,95"
            fill="#8E5B3C"
            stroke="#6D432A"
            strokeWidth="2.5"
          />
          <path
            className="coconut-half-left"
            d="M60,25 C40,25 28,45 36,71 C42,91 60,88 60,88"
            fill="#FFFBF2"
          />

          {/* Right Coconut Half */}
          <path
            className="coconut-half-right"
            d="M60,20 C85,20 100,45 90,75 C82,98 60,95 60,95"
            fill="#8E5B3C"
            stroke="#6D432A"
            strokeWidth="2.5"
          />
          <path
            className="coconut-half-right"
            d="M60,25 C80,25 92,45 84,71 C78,91 60,88 60,88"
            fill="#FFFBF2"
          />

          {/* Coconut Texture Marks */}
          <circle cx="54" cy="38" r="3" fill="#8E5B3C" opacity="0.4" />
          <circle cx="66" cy="38" r="3" fill="#8E5B3C" opacity="0.4" />
          <circle cx="60" cy="48" r="3" fill="#8E5B3C" opacity="0.4" />
        </g>
      </svg>
      
      {!isCracked && <div className="tap-hint">Tap to crack it open! 🥥</div>}
    </div>
  );
};

export default CoconutSVG;
