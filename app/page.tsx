"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-[#fff9e6] to-[#fff5cc] text-[#333333]">
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
                  Hello, I am <span className="text-[#ffbb4d]">James Li</span>
                </h1>
                <p className="text-xl text-[#666666] max-w-2xl mb-8 mx-auto">
                  Current Mathematics undergraduate at Toronto Metropolitan University
                </p>
                <motion.button
                  className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] font-medium py-3 px-8 rounded-full transition-colors text-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 187, 77, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  View Résumé
                </motion.button>

                {/* Scroll indicator */}
                <motion.div
                  className="mt-16 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-[#666666] mb-2">Scroll Down</span>
                  <motion.div
                    className="w-8 h-12 border-2 border-[#ffbb4d] rounded-full flex justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-[#ffbb4d] rounded-full mt-2"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  </motion.div>
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
                    <div className="bg-[#ffe6b3] border-2 border-dashed border-[#ffd580] rounded-2xl w-full h-96 flex items-center justify-center">
                      <span className="text-[#333333] font-medium">Profile Image</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-[#333333]">Who am I?</h3>
                    <p className="text-[#666666] mb-6 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-[#666666] mb-6 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                      {["Mathematics", "Data Analysis", "Problem Solving", "Python", "R"].map((skill, index) => (
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

                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((item, index) => (
                    <motion.div
                      key={item}
                      className="border border-[#ffe6b3] rounded-2xl p-6 hover:shadow-xl transition-all bg-white bg-opacity-70 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
                    >
                      <div className="bg-[#ffe6b3] border-2 border-dashed border-[#ffd580] rounded-xl w-full h-48 mb-6 flex items-center justify-center">
                        <span className="text-[#333333] font-medium">Project {item} Preview</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">Project {item}</h3>
                      <p className="text-[#666666] mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                      </p>
                      <div className="flex justify-between items-center">
                        <a href="#" className="text-[#ffbb4d] hover:text-[#333333] transition-colors font-medium">
                          View details →
                        </a>
                        <div className="flex space-x-2">
                          {[1, 2, 3].map(i => (
                            <span key={i} className="w-3 h-3 bg-[#ffe6b3] rounded-full"></span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
                  Feel free to reach out if you want to collaborate with me, or simply have a chat.
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
                    © {new Date().getFullYear()} James Li. All rights reserved.
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

