"use client";

import React, { useEffect, useRef } from 'react';

// 💐 AESTHETIC EMOJIS
const ITEMS = ['🌹', '🤍', '✨', '🍂'];

class Particle {
  constructor(canvasWidth, canvasHeight, images) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images; // Pre-rendered images
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvasWidth;
    this.y = initial ? Math.random() * this.canvasHeight : -50;
    
    // Pick a random pre-rendered flower image
    this.image = this.images[Math.floor(Math.random() * this.images.length)];
    
    // Size (Small variation, base size handled in pre-render)
    this.size = Math.random() * 0.5 + 0.5; // Scale 0.5x to 1.0x
    this.opacity = Math.random() * 0.5 + 0.5;
    
    // 🌬️ DREAMY PHYSICS
    // Consistent downward flow, not too fast
    this.speedY = Math.random() * 1.5 + 0.8; 
    this.speedX = Math.random() * 0.5 - 0.25; 
    
    // Gentle Rotation
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 0.5 - 0.25;
    
    // Wavy Air Motion
    this.waveAngle = Math.random(); 
    this.waveSpeed = Math.random() * 0.02 + 0.005; 
  }

  update() {
    this.y += this.speedY;
    this.waveAngle += this.waveSpeed;
    this.x += this.speedX + Math.sin(this.waveAngle) * 0.5;
    this.rotation += this.rotationSpeed;

    if (this.y > this.canvasHeight + 50) this.reset(false);
    if (this.x < -50) this.x = this.canvasWidth + 50;
    if (this.x > this.canvasWidth + 50) this.x = -50;
  }

  draw(ctx) {
    if (!this.image) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    
    // ⚡ SUPER FAST DRAWING (Draw Image instead of Text)
    // -20 to center the image (assuming 40px base size)
    const s = 40 * this.size; 
    ctx.drawImage(this.image, -s/2, -s/2, s, s);
    
    ctx.restore();
  }
}

const AestheticFlow = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const imagesRef = useRef([]);

  // 1. PRE-RENDER EMOJIS TO IMAGES (Runs once)
  useEffect(() => {
    const preRenderEmojis = () => {
      return ITEMS.map(emoji => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 50; // Base resolution
        offCanvas.height = 50;
        const ctx = offCanvas.getContext('2d');
        
        ctx.font = "40px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Optional: Soft shadow baked into the image
        ctx.shadowColor = "rgba(0,0,0,0.1)"; 
        ctx.shadowBlur = 2;
        ctx.fillText(emoji, 25, 28);
        
        return offCanvas; // Return the canvas element as an image source
      });
    };
    
    imagesRef.current = preRenderEmojis();
  }, []);

  // 2. SETUP ANIMATION LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      // 🚀 HIGH PERFORMANCE COUNT
      // Since we optimized drawing, we can have WAY more particles without lag.
      const particleCount = window.innerWidth < 768 ? 35 : 60;
      
      particlesRef.current = Array.from({ length: particleCount }, () => 
        new Particle(width, height, imagesRef.current)
      );
    };

    window.addEventListener('resize', resize);
    resize(); 

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
};

export default AestheticFlow;