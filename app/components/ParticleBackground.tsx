"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    window.addEventListener("resize", resizeCanvas);

    // Particle configuration
    const particleCount = 240;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 4 + 2,
        color: i % 3 === 0 ? "#ffbb4d" : i % 3 === 1 ? "#ffe6b3" : "#ffd580",
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    // Mouse tracking
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion force when near cursor (gentle)
        const repulsionRange = 150;
        if (distance < repulsionRange) {
          const force = (repulsionRange - distance) / repulsionRange;
          particle.vx -= (dx / distance) * force * 0.3;
          particle.vy -= (dy / distance) * force * 0.3;
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Keep particles within bounds
        if (particle.x < 0) { particle.x = 0; particle.vx *= -1; }
        if (particle.x > canvas.width) { particle.x = canvas.width; particle.vx *= -1; }
        if (particle.y < 0) { particle.y = 0; particle.vy *= -1; }
        if (particle.y > canvas.height) { particle.y = canvas.height; particle.vy *= -1; }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
