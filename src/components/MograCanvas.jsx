import React, { useEffect, useRef } from 'react';

const MograCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const maxParticles = 35;

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

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Spread initially
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 6;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 0.8 + 0.5;
        this.type = Math.random() > 0.45 ? 'petal' : 'heart';
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1.5 - 0.75;
        this.opacity = Math.random() * 0.5 + 0.4;
        
        // Colors
        this.colorPetal = `rgba(255, 255, 250, ${this.opacity})`;
        const coolColors = ['#C3E5DE', '#A2C2E0', '#D1C4E9', '#F9EBE0'];
        this.colorHeart = coolColors[Math.floor(Math.random() * coolColors.length)];

      }

      update() {
        this.x += this.speedX + Math.sin(this.y / 30) * 0.2;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = this.colorPetal;
          ctx.fill();
          
          ctx.beginPath();
          ctx.ellipse(-this.size, 0, 2, 2, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#E8F5E9';
          ctx.fill();
        } else {
          ctx.beginPath();
          const w = this.size;
          const h = this.size;
          ctx.moveTo(0, h / 4);
          ctx.bezierCurveTo(0, -h / 2, -w, -h / 2, -w, h / 4);
          ctx.bezierCurveTo(-w, (3 * h) / 4, 0, h, 0, h);
          ctx.bezierCurveTo(0, h, w, (3 * h) / 4, w, h / 4);
          ctx.bezierCurveTo(w, -h / 2, 0, -h / 2, 0, h / 4);
          ctx.fillStyle = this.colorHeart;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particles
    const localParticles = [];
    for (let i = 0; i < maxParticles; i++) {
      localParticles.push(new Particle());
    }
    particlesRef.current = localParticles;

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Listen to window-level custom click bursts
    const handleBurstEvent = (e) => {
      const { x, y } = e.detail || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      for (let i = 0; i < 15; i++) {
        const p = new Particle();
        p.x = x;
        p.y = y;
        p.speedX = (Math.random() - 0.5) * 6;
        p.speedY = (Math.random() - 0.5) * 6;
        p.opacity = 1;
        particlesRef.current.push(p);
      }
      // Cap max particles
      if (particlesRef.current.length > maxParticles + 45) {
        particlesRef.current.splice(0, particlesRef.current.length - (maxParticles + 45));
      }
    };

    window.addEventListener('mogra-burst', handleBurstEvent);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mogra-burst', handleBurstEvent);
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
        zIndex: 1,
      }}
    />
  );
};

// Global helper to trigger particle burst in React components
export const triggerMograBurst = (x, y) => {
  const event = new CustomEvent('mogra-burst', { detail: { x, y } });
  window.dispatchEvent(event);
};

export default MograCanvas;
