"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  baseVx: number;
  baseVy: number;
  spawnX: number;
  spawnY: number;
  radius: number;
}

interface ConnectingParticle {
  index1: number;
  index2: number;
  distance: number;
}

const PARTICLE_COUNT = 120;
const PARTICLE_SPEED = 0.3;
const PARTICLE_SIZE_RANGE = 3;
const PARTICLE_OPACITY_RANGE = 0.4;
const PARTICLE_COLORS = ["#ffbb4d", "#ffe6b3", "#ffd580"];
const REPULSION_RANGE = 150;
const REPULSION_FORCE = 0.2;
const FRICTION = 0.99;
const CONNECTION_DISTANCE = 140;
const CONNECTION_OPACITY = 0.12;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas));
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      setTime(currentTime - startTime);
      startTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        updateParticle(particle, canvas, mouseX, mouseY);
        drawParticle(ctx, particle, currentTime);
      });

      drawConnections(ctx, particles, currentTime);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
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

function createParticle(canvas: HTMLCanvasElement): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.05 + Math.random() * 0.05;
  const radius = 150 + Math.random() * 100;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED,
    size: Math.random() * PARTICLE_SIZE_RANGE + 1,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    opacity: Math.random() * PARTICLE_OPACITY_RANGE + 0.2,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
    baseVx: Math.cos(angle) * speed,
    baseVy: Math.sin(angle) * speed,
    spawnX: Math.random() * canvas.width,
    spawnY: Math.random() * canvas.height,
    radius: radius,
  };
}

function updateParticle(
  particle: Particle,
  canvas: HTMLCanvasElement,
  mouseX: number,
  mouseY: number
) {
  const dx = mouseX - particle.x;
  const dy = mouseY - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < REPULSION_RANGE) {
    const force = (REPULSION_RANGE - distance) / REPULSION_RANGE;
    particle.vx -= (dx / distance) * force * REPULSION_FORCE;
    particle.vy -= (dy / distance) * force * REPULSION_FORCE;
  }

  particle.vx += particle.baseVx * 0.01;
  particle.vy += particle.baseVy * 0.01;

  const distFromSpawn = Math.sqrt(
    Math.pow(particle.x - particle.spawnX, 2) + 
    Math.pow(particle.y - particle.spawnY, 2)
  );

  if (distFromSpawn > particle.radius) {
    const dxToSpawn = particle.spawnX - particle.x;
    const dyToSpawn = particle.spawnY - particle.y;
    const dist = Math.sqrt(dxToSpawn * dxToSpawn + dyToSpawn * dyToSpawn);
    const restoringForce = 0.02;
    particle.vx += (dxToSpawn / dist) * restoringForce;
    particle.vy += (dyToSpawn / dist) * restoringForce;
  }

  particle.x += particle.vx;
  particle.y += particle.vy;
  particle.vx *= FRICTION;
  particle.vy *= FRICTION;

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
  particle: Particle,
  currentTime: number
) {
  const pulse = Math.sin(particle.pulsePhase + currentTime * 0.002) * 0.5 + 0.5;
  const size = particle.size + pulse * 0.5;
  
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.opacity * (0.7 + pulse * 0.3);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, size * 0.6, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.opacity * 0.4;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  currentTime: number
) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONNECTION_DISTANCE) {
        const opacity = CONNECTION_OPACITY * (1 - distance / CONNECTION_DISTANCE);
        const pulse = Math.sin(currentTime * 0.002 + i * 0.5) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
        ctx.globalAlpha = opacity * pulse;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}
