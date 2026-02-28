"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FaviconLoader from "./components/FaviconLoader";
import ProjectCard from "./components/ProjectCard";
import ParticleBackground from "./components/ParticleBackground";
import PdfViewer from "./components/PdfViewer";

const SECTIONS = ["hero", "about", "projects", "contact"];
const LOADER_DURATION = 2500;
const SWIPE_THRESHOLD = 50;
const spring = { duration: 0.8, ease: [0.34, 1.56, 0.76, 1] as const };

const projectsData = [
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

const socialLinksData = [
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

const statsData = [
  { value: "4+", label: "Years in Mathematics" },
  { value: "n=n+1", label: "Lines of Code Written" },
];

function navigateSection(current: number, direction: -1 | 1): number {
  return Math.max(0, Math.min(current + direction, SECTIONS.length - 1));
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldUnmountLoader, setShouldUnmountLoader] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setShouldUnmountLoader(true);
    }, LOADER_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile]);

  return (
    <div className="bg-[#333333] relative text-white">
      <ParticleBackground />
      <div className={`relative z-1 ${isMobile ? "min-h-screen overflow-y-auto" : "h-screen overflow-hidden"}`}>
        <NavigationDots currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <AnimatePresence mode="wait">
          {!shouldUnmountLoader && <FaviconLoader key="loader" />}
          <SectionRenderer currentSection={currentSection} setIsPdfOpen={setIsPdfOpen} />
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
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
      {SECTIONS.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSection(index)}
          className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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

function SectionRenderer({
  currentSection,
  setIsPdfOpen,
}: {
  currentSection: number;
  setIsPdfOpen: (open: boolean) => void;
}) {
  switch (currentSection) {
    case 0:
      return <HeroSection setIsPdfOpen={setIsPdfOpen} />;
    case 1:
      return <AboutSection />;
    case 2:
      return <ProjectsSection />;
    case 3:
      return <ContactSection />;
    default:
      return null;
  }
}

function HeroSection({ setIsPdfOpen }: { setIsPdfOpen: (open: boolean) => void }) {
  return (
    <motion.section
      key="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={spring}
    >
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#ffbb4d] rounded-full blur-3xl opacity-20 md:block hidden"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffe6b3] rounded-full blur-3xl opacity-15 md:block hidden"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...spring, delay: 0.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          <span className="text-white">James</span>{" "}
          <span className="text-[#ffbb4d]">Li</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-xl md:max-w-2xl mx-auto leading-relaxed mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.5 }}
        >
          4th year Mathematics Student at Toronto Metropolitan University
        </motion.p>

        <motion.button
          onClick={() => setIsPdfOpen(true)}
          className="inline-block bg-[#ffbb4d] text-[#333333] px-8 py-3 md:px-10 md:py-4 hover:bg-[#ffe6b3] transition-colors duration-300 font-medium tracking-wide rounded-full shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.7 }}
        >
          View Résumé
        </motion.button>

        <motion.div
          className="mt-12 md:mt-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1 }}
        >
          <span className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">Scroll to explore</span>
          <motion.div
            className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-[#ffbb4d] to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function AboutSection() {
  return (
    <motion.section
      key="about"
      className="min-h-screen flex flex-col justify-center px-4 py-8 md:py-12 relative"
      initial={{ opacity: 0, x: 30, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.97 }}
      transition={spring}
    >
      <motion.div
        className="absolute top-10 right-20 w-48 h-48 bg-[#ffbb4d] rounded-full blur-3xl opacity-15 md:block hidden"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          About{" "}
          <span className="text-[#ffbb4d]">Me</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 md:p-6 bg-[#333333]/80 border border-[#ffbb4d]/30 rounded-2xl hover:border-[#ffbb4d] transition-colors backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-light text-[#ffbb4d] mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-xs md:text-sm font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div
            className="relative w-full max-w-sm mx-auto md:mx-0"
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffbb4d] to-[#ffe6b3] rounded-2xl transform rotate-3 opacity-15 md:block hidden" />
            <Image
              src="/profile.jpg"
              alt="James Li"
              width={400}
              height={500}
              className="relative object-cover rounded-2xl shadow-lg w-full max-w-[300px] mx-auto"
              priority
            />
          </motion.div>
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.7 }}
          >
            <h3 className="text-xl md:text-2xl font-light text-white">Who am I?</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-lg">
              Currently, I am completing my fourth year in my mathematics program at Toronto Metropolitan University, some notable courses I took are: MTH525(Real Analysis), MTH607(Graph Theory), MTH640(Complex Analysis), MTH617(Abstract Algebra), MTH814(Computational Complexity) and MTH642(Data Analytics)
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-lg">
              I have a strong passion for Computer Science and software development. Below you will find personal projects I have created that reflect this interest.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-lg">
              In my free time, I enjoy going to the gym and learning to play the guitar.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-8">
              {["English", "Mandarin Chinese", "Japanese"].map((lang, index) => (
                <motion.span
                  key={lang}
                  className="border border-[#ffbb4d] text-white px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm hover:bg-[#ffbb4d] hover:text-[#333333] transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...spring, delay: 0.8 + index * 0.1 }}
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

function ProjectsSection() {
  return (
    <motion.section
      key="projects"
      className="min-h-screen flex flex-col justify-center px-4 py-8 md:py-12 relative"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={spring}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 text-center"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          Featured{" "}
          <span className="text-[#ffbb4d]">Projects</span>
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-8 md:mb-12 text-center max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          A collection of projects showcasing my passion for mathematics and software development
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ContactSection() {
  return (
    <motion.section
      key="contact"
      className="min-h-screen flex flex-col justify-center px-4 py-8 md:py-12 relative"
      initial={{ opacity: 0, scale: 0.97, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -30 }}
      transition={spring}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 text-center"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          Get In{" "}
          <span className="text-[#ffbb4d]">Touch</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          Feel free to reach out and connect with me through the following platforms.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.5 }}
        >
          {socialLinksData.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <SocialLink {...link} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-[#333333]/80 border border-[#ffbb4d]/30 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-2 text-sm md:text-base">
            Alternatively, you can reach me at:
          </p>
          <a
            href="mailto:Jamesli28000@gmail.com"
            className="text-[#ffbb4d] font-medium hover:text-white transition-colors text-sm md:text-base"
          >
            Jamesli28000@gmail.com
          </a>
        </motion.div>

        <motion.div
          className="border-t border-[#ffbb4d]/30 pt-6 md:pt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.9 }}
        >
          <p className="text-gray-400 text-xs md:text-sm">Disclaimer: This website was 67% vibecoded.</p>
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
      className="bg-[#333333]/80 text-white border border-[#ffbb4d]/30 py-3 md:py-4 px-6 md:px-8 hover:bg-[#ffbb4d] hover:text-[#333333] transition-colors duration-300 flex items-center justify-center gap-2 md:gap-3 min-w-[180px] md:min-w-[200px] font-light rounded-xl shadow-md hover:shadow-lg backdrop-blur-sm"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.76, 1] }}
    >
      <Image src={icon} alt={alt} width={20} height={20} className="w-4 h-4 md:w-5 md:h-5" />
      <span className="font-medium text-sm md:text-base">{label}</span>
    </motion.a>
  );
}
