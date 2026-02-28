"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const PARTICLE_COUNT = 60;
const PARTICLE_SPEED = 0.2;
const PARTICLE_SIZE_RANGE = 2;
const PARTICLE_OPACITY_RANGE = 0.3;
const PARTICLE_COLORS = ["#ffbb4d", "#ffe6b3", "#ffd580"];
const CONNECTION_DISTANCE = 120;
const CONNECTION_OPACITY = 0.08;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * PARTICLE_SPEED,
      vy: (Math.random() - 0.5) * PARTICLE_SPEED,
      size: Math.random() * PARTICLE_SIZE_RANGE + 1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * PARTICLE_OPACITY_RANGE + 0.2,
    }));

    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16;
      lastTime = currentTime;

      ctx.fillStyle = "#333333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        updateParticle(particle, canvas, deltaTime);
        drawParticle(ctx, particle);
      });

      drawConnections(ctx, particles);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

function updateParticle(
  particle: Particle,
  canvas: HTMLCanvasElement,
  deltaTime: number
) {
  particle.x += particle.vx * deltaTime;
  particle.y += particle.vy * deltaTime;

  if (particle.x < 0 || particle.x > canvas.width) {
    particle.x = particle.x < 0 ? 0 : canvas.width;
    particle.vx *= -1;
  }
  if (particle.y < 0 || particle.y > canvas.height) {
    particle.y = particle.y < 0 ? 0 : canvas.height;
    particle.vy *= -1;
  }
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle
) {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.opacity;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[]
) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONNECTION_DISTANCE) {
        const opacity = CONNECTION_OPACITY * (1 - distance / CONNECTION_DISTANCE);

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}