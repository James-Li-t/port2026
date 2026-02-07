"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./components/ProjectCard";

// Project data
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal Website for hosting my works, includes contact information and CV. Vibecoded the framework and design with the qwen3 model running on OpenCode hosted on my local machine.",
    technologies: ["NextJS", "TailwindCSS", "Ollama"],
    image: "/project1.png",
    link: "https://github.com/James-Li-t/port2026"
  },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ["hero", "about", "projects", "contact"];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        // Scrolling down
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
      } else {
        // Scrolling up
        setCurrentSection(prev => Math.max(prev - 1, 0));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
      } else if (e.key === "ArrowUp") {
        setCurrentSection(prev => Math.max(prev - 1, 0));
      }
    };

    // Touch event handlers for mobile scrolling
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        // Minimum threshold to detect swipe (50 pixels)
        if (diff > 0) {
          // Swiped up - go to next section
          setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
        } else {
          // Swiped down - go to previous section
          setCurrentSection(prev => Math.max(prev - 1, 0));
        }
      }

      touchStartY = 0;
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);


  return (
    <div className="h-screen bg-linear-to-b from-cyan-50 to-amber-100 overflow-hidden relative text-[#333333]">

      {/* Sections Container */}
      <div className="h-full relative" style={{ zIndex: 1 }}>
        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-[#ffbb4d] scale-125"
                : "bg-[#ffe6b3] hover:bg-[#ffd580]"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Sections Container */}
        <div className="h-full">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.section
              key="hero"
              className="h-full flex flex-col items-center justify-center px-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Welcome to <span className="text-[#ffbb4d]">James Li</span>
                </h1>
                <p className="text-xl text-[#666666] max-w-2xl mb-8 mx-auto">
                4th year Mathematics Student @ Toronto Metropolitan University
                </p>
                <motion.a
                  href="/Resume.pdf"
                  download
                  className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] font-medium py-3 px-8 rounded-full transition-colors text-lg inline-block"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 187, 77, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  View Résumé
                </motion.a>

                {/* Scroll indicator */}
                <motion.div
                  className="mt-16 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-[#666666] mb-2">Scroll Down</span>
                  <motion.div className="w-8 h-12 border-2 border-[#ffbb4d] rounded-full flex justify-center" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                </motion.div>
              </motion.div>
            </motion.section>
          )}

          {currentSection === 1 && (
            <motion.section
              key="about"
              className="h-full flex flex-col justify-center px-4 md:px-16 py-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  className="text-4xl font-bold mb-12 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  About <span className="text-[#ffbb4d]">Me</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <img
                      src="/profile.jpg"
                      alt="James Li"
                      className="object-cover rounded-2xl"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-[#333333]">Who am I?</h3>
                    <p className="text-[#666666] mb-6 leading-relaxed">
                    Currently, I am completing my fourth year in my mathematics program at TMU with an emphasis on pure mathematics (Real/Complex Analysis, Group/Ring Theory). 

                    I also have a passion for Computer Science and Software development, below you will be able to view some personal projects I have developed.
                    </p>
                    <p className="text-[#666666] mb-6 leading-relaxed">
                    In my free time I enjoy going to the gym 💪 and learning to play the guitar 🎸😎.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                      {["English", "Mandarin Chinese", "Japanese"].map((skill, index) => (
                        <motion.span
                          key={skill}
                          className="bg-[#ffe6b3] text-[#333333] px-4 py-2 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 2 && (
            <motion.section
              key="projects"
              className="h-full flex flex-col justify-center px-4 py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                  className="text-4xl font-bold mb-12 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Featured <span className="text-[#ffbb4d]">Projects</span>
                </motion.h2>

                {/* Horizontal scrollable projects container */}
                <div className="overflow-x-auto pb-8">
                  <div className="flex space-x-6 w-max">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 3 && (
            <motion.section
              key="contact"
              className="h-full flex flex-col justify-center px-4 py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                  className="text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Get In <span className="text-[#ffbb4d]">Touch</span>
                </motion.h2>

                <motion.p
                  className="text-xl text-[#666666] mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Feel free to reach out and connect with me through the following platforms.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href="https://www.linkedin.com/in/james-li-3675a91b4/"
                    className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] py-4 px-8 rounded-full transition-colors flex items-center justify-center space-x-3 min-w-[200px] font-medium"
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255, 187, 77, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-6 h-6" />
                    <span>LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/James-Li-t"
                    className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] py-4 px-8 rounded-full transition-colors flex items-center justify-center space-x-3 min-w-[200px] font-medium"
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255, 187, 77, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/github-icon.svg" alt="GitHub" className="w-6 h-6" />
                    <span>GitHub</span>
                  </motion.a>
                </motion.div>

                <motion.div
                  className="border-t border-[#ffe6b3] pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-[#666666]">
                     Disclaimer: This website was 67% vibecoded.                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
}
