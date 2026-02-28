"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  xRange: number;
  yRange: number;
}

export default function FaviconLoader() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldExit(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setParticles(
      [...Array(20)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.2,
        duration: 2 + Math.random() * 2,
        xRange: (Math.random() - 0.5) * 100,
        yRange: (Math.random() - 0.5) * 100,
      }))
    );
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#333333] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldExit ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-[#ffbb4d]"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  opacity: particle.opacity,
                }}
                animate={{
                  x: [0, particle.xRange, 0],
                  y: [0, particle.yRange, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main loader container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: shouldExit ? 0 : 1,
            }}
            transition={{
              scale: { duration: 0.8, ease: [0.34, 1.56, 0.76, 1] },
              opacity: { duration: 3, delay: 0.2 },
            }}
          >
            {/* Glowing ring */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Outer glow rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-[#ffbb4d]"
                  style={{
                    width: `${80 + i * 30}px`,
                    height: `${80 + i * 30}px`,
                    marginLeft: `-${40 + i * 15}px`,
                    marginTop: `-${40 + i * 15}px`,
                  }}
                  animate={{
                    rotate: 360,
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Central favicon container */}
              <motion.div
                className="relative w-20 h-20 bg-gradient-to-br from-[#ffbb4d] to-[#ffe6b3] rounded-2xl flex items-center justify-center shadow-2xl"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.34, 1.56, 0.76, 1],
                }}
              >
                {/* Favicon image */}
                <img
                  src="/favicon.ico"
                  alt="James Li"
                  className="w-12 h-12 object-contain"
                  style={{ filter: "drop-shadow(0 0 8px rgba(255, 187, 77, 0.5))" }}
                />

                {/* Inner glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-[#ffbb4d]"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Name reveal animation */}
            <motion.div
              className="mt-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.h1
                className="text-3xl md:text-4xl font-light text-white tracking-widest"
                initial={{ opacity: 0, letterSpacing: "-0.05em" }}
                animate={{ opacity: 1, letterSpacing: "0.1em" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                JAMES LI
              </motion.h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-48 h-1 bg-[#ffe6b3]/30 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#ffbb4d] to-[#ffe6b3] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Corner accents */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 border-[#ffbb4d]"
              style={{
                top: i < 2 ? "20px" : "auto",
                bottom: i >= 2 ? "20px" : "auto",
                left: i % 2 === 0 ? "20px" : "auto",
                right: i % 2 === 1 ? "20px" : "auto",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: shouldExit ? 0 : 1,
                opacity: shouldExit ? 0 : 1,
              }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            >
              <div
                className="w-full h-full"
                style={{
                  borderTop: i % 2 === 0 ? "2px solid #ffbb4d" : "none",
                  borderRight: i >= 1 ? "2px solid #ffbb4d" : "none",
                  borderBottom: i % 2 === 1 ? "2px solid #ffbb4d" : "none",
                  borderLeft: i < 1 ? "2px solid #ffbb4d" : "none",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
  );
}
