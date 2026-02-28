"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FaviconLoader from "./components/FaviconLoader";
import ProjectCard from "./components/ProjectCard";
import ParticleBackground from "./components/ParticleBackground";
import PdfViewer from "./components/PdfViewer";

const SECTIONS = ["hero", "about", "projects", "contact"];
const LOADER_DURATION = 2500;
const SWIPE_THRESHOLD = 50;

function navigateSection(current: number, direction: -1 | 1): number {
  return Math.max(0, Math.min(current + direction, SECTIONS.length - 1));
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldUnmountLoader, setShouldUnmountLoader] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Unmount immediately after exit animation starts
      setShouldUnmountLoader(true);
    }, LOADER_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      setCurrentSection(prev => navigateSection(prev, e.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentSection(prev => navigateSection(prev, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentSection(prev => navigateSection(prev, -1));
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        setCurrentSection(prev => navigateSection(prev, diff > 0 ? 1 : -1));
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

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return renderHero(setIsPdfOpen);
      case 1:
        return renderAbout();
      case 2:
        return renderProjects();
      case 3:
        return renderContact();
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-[#333333] overflow-hidden relative text-white">
      <ParticleBackground />
      <div className="h-full relative z-1">
        <NavigationDots currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <AnimatePresence mode="wait">
          {!shouldUnmountLoader && <FaviconLoader key="loader" />}
          {renderSection()}
        </AnimatePresence>
      </div>
      <PdfViewer
        pdfUrl="/Resume.pdf"
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
      />
    </div>
  );
}

function NavigationDots({
  currentSection,
  setCurrentSection,
}: {
  currentSection: number;
  setCurrentSection: (index: number) => void;
}) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {SECTIONS.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSection(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentSection === index
              ? "bg-[#ffbb4d] scale-125"
              : "bg-[#ffbb4d]/50 hover:bg-[#ffe6b3]"
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
}

function renderHero(setIsPdfOpen: (open: boolean) => void) {
  return (
    <motion.section
      key="hero"
      className="h-full flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.76, 1],
      }}
    >
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#ffbb4d] rounded-full blur-3xl opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffe6b3] rounded-full blur-3xl opacity-15"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#ffd580] rounded-full blur-2xl opacity-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.2 }}
        className="relative z-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-light tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.3 }}
        >
          <span className="text-white">James</span>{" "}
          <span className="text-[#ffbb4d]">Li</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.5 }}
        >
          4th year Mathematics Student at Toronto Metropolitan University
        </motion.p>


        <motion.button
          onClick={() => setIsPdfOpen(true)}
          className="inline-block bg-[#ffbb4d] text-[#333333] px-10 py-4 hover:bg-[#ffe6b3] transition-colors duration-300 font-medium tracking-wide rounded-full shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.7 }}
        >
          View Résumé
        </motion.button>

        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 1 }}
        >
          <span className="text-gray-400 text-sm mb-4">Scroll to explore</span>
          <motion.div
            className="w-[1px] h-20 bg-gradient-to-b from-[#ffbb4d] to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function renderAbout() {
  const stats = [
    { value: "4+", label: "Years in Mathematics" },
    { value: "n=n+1", label: "Lines of Code Written" },
  ];

  return (
    <motion.section
      key="about"
      className="h-full flex flex-col justify-center px-4 md:px-16 py-12 relative overflow-hidden"
      initial={{ opacity: 0, x: 30, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.97 }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.76, 1],
      }}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-10 right-20 w-48 h-48 bg-[#ffbb4d] rounded-full blur-3xl opacity-15"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-36 h-36 bg-[#ffe6b3] rounded-full blur-2xl opacity-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-light mb-12 text-center"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.2 }}
        >
          About{" "}
          <span className="text-[#ffbb4d]">Me</span>
        </motion.h2>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-[#333333]/80 border border-[#ffbb4d]/30 rounded-2xl hover:border-[#ffbb4d] transition-colors backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-light text-[#ffbb4d] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            className="relative w-full max-w-sm mx-auto md:mx-0"
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffbb4d] to-[#ffe6b3] rounded-2xl transform rotate-3 opacity-15" />
            <Image
              src="/profile.jpg"
              alt="James Li"
              width={400}
              height={500}
              className="relative object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.7 }}
          >
            <h3 className="text-2xl font-light text-white">Who am I?</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Currently, I am completing my fourth year in my mathematics program at Toronto Metropolitan University with an emphasis on pure mathematics, including Real and Complex Analysis, as well as Group and Ring Theory.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              I have a strong passion for Computer Science and software development. Below you will find personal projects I have created that reflect this interest.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              In my free time, I enjoy going to the gym and learning to play the guitar.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {["English", "Mandarin Chinese", "Japanese"].map((lang, index) => (
                <motion.span
                  key={lang}
                  className="border border-[#ffbb4d] text-white px-5 py-2 text-sm hover:bg-[#ffbb4d] hover:text-[#333333] transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function renderProjects() {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal Website for hosting my works, includes contact information and CV. Built with Next.js, TailwindCSS, and Llama.cpp.",
      technologies: ["NextJS", "TailwindCSS", "Llama.cpp"],
      image: "/project1.png",
      link: "https://github.com/James-Li-t/port2026",
    },
    {
      id: 2,
      title: "Mathematics Visualization Tool",
      description: "Interactive web application for visualizing complex mathematical concepts including calculus, linear algebra, and abstract algebra structures.",
      technologies: ["React", "D3.js", "TypeScript"],
      image: "/project2.png",
      link: "#",
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      description: "Comprehensive data visualization dashboard for statistical analysis with real-time updates and interactive charts.",
      technologies: ["Python", "Pandas", "Plotly"],
      image: "/project3.png",
      link: "#",
    },
  ];

  return (
    <motion.section
      key="projects"
      className="h-full flex flex-col justify-center px-4 py-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.76, 1],
      }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-1/4 w-32 h-32 bg-[#ffbb4d] rounded-full blur-3xl opacity-10"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-40 h-40 bg-[#ffe6b3] rounded-full blur-2xl opacity-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-light mb-4 text-center"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.2 }}
        >
          Featured{" "}
          <span className="text-[#ffbb4d]">Projects</span>
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.3 }}
        >
          A collection of projects showcasing my passion for mathematics and software development
        </motion.p>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.4 + index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function renderContact() {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/james-li-3675a91b4/",
      icon: "/linkedin-icon.svg",
      alt: "LinkedIn",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/James-Li-t",
      icon: "/github-icon.svg",
      alt: "GitHub",
      label: "GitHub",
    },
  ];

  return (
    <motion.section
      key="contact"
      className="h-full flex flex-col justify-center px-4 py-12 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.97, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -30 }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.76, 1],
      }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-[#ffbb4d] rounded-full blur-3xl opacity-15"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-36 h-36 bg-[#ffe6b3] rounded-full blur-2xl opacity-12"
        animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-24 h-24 bg-[#ffd580] rounded-full blur-xl opacity-8"
        animate={{ rotate: [0, -360], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-light mb-4 text-center"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.2 }}
        >
          Get In{" "}
          <span className="text-[#ffbb4d]">Touch</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.3 }}
        >
          Feel free to reach out and connect with me through the following platforms.
        </motion.p>

        {/* Social links grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.5 }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <SocialLink {...link} />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional contact info */}
        <motion.div
          className="bg-[#333333]/80 border border-[#ffbb4d]/30 rounded-2xl p-8 mb-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.8 }}
        >
          <p className="text-gray-300 mb-2">
            Alternatively, you can reach me at:
          </p>
          <a
            href="mailto:Jamesli28000@gmail.com"
            className="text-[#ffbb4d] font-medium hover:text-white transition-colors"
          >
            Jamesli28000@gmail.com
          </a>
        </motion.div>

        <motion.div
          className="border-t border-[#ffbb4d]/30 pt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.76, 1], delay: 0.9 }}
        >
          <p className="text-gray-400">Disclaimer: This website was 67% vibecoded.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SocialLink({
  href,
  icon,
  alt,
  label,
}: {
  href: string;
  icon: string;
  alt: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      className="bg-[#333333]/80 text-white border border-[#ffbb4d]/30 py-4 px-8 hover:bg-[#ffbb4d] hover:text-[#333333] transition-colors duration-300 flex items-center justify-center gap-3 min-w-[200px] font-light rounded-xl shadow-md hover:shadow-lg backdrop-blur-sm"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.76, 1] }}
    >
      <Image src={icon} alt={alt} width={20} height={20} className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </motion.a>
  );
}
