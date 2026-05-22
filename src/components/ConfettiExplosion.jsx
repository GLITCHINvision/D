import React, { useEffect, useRef } from 'react';

const ConfettiExplosion = () => {
  const canvasRef = useRef(null);
  const confettiRef = useRef([]);
  const audioContextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    class Confetto {
      constructor(x, y, type = 'random') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.5) * 12 - 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.3;
        this.gravity = 0.15;
        this.friction = 0.99;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.01;
        this.size = Math.random() * 6 + 2;

        const types = ['square', 'circle', 'star', 'diamond'];
        this.type = type === 'random' ? types[Math.floor(Math.random() * types.length)] : type;

        const palette = [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
          '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A8D8EA'
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }

      update() {
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
      }

      draw(ctx) {
        if (this.life <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = this.color;

        if (this.type === 'square') {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else if (this.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'star') {
          this.drawStar(ctx, 0, 0, 5, this.size / 2, this.size / 4);
        } else if (this.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size, 0);
          ctx.lineTo(0, this.size);
          ctx.lineTo(-this.size, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let step = Math.PI / spikes;
        let rot = Math.PI / 2 * 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
          rot += step;
          ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
      }
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current = confettiRef.current.filter((c) => {
        c.update();
        c.draw(ctx);
        return c.life > 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const triggerConfetti = (e) => {
      const { x, y, count = 50, types = ['random'] } = e.detail || {
        x: canvas.width / 2,
        y: canvas.height / 2,
        count: 50,
      };

      for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        confettiRef.current.push(new Confetto(x, y, type));
      }
    };

    const playConfettiSound = (e) => {
      try {
        const { frequency = 600 } = e.detail || {};
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * 2, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.2);
      } catch (err) {
        // Audio context blocked
      }
    };

    window.addEventListener('confetti-burst', triggerConfetti);
    window.addEventListener('confetti-sound', playConfettiSound);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('confetti-burst', triggerConfetti);
      window.removeEventListener('confetti-sound', playConfettiSound);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export const triggerConfetti = (x, y, count = 50, types = ['random']) => {
  const event = new CustomEvent('confetti-burst', {
    detail: { x, y, count, types },
  });
  window.dispatchEvent(event);
};

export const playConfettiSound = (frequency = 600) => {
  const event = new CustomEvent('confetti-sound', { detail: { frequency } });
  window.dispatchEvent(event);
};

export default ConfettiExplosion;
