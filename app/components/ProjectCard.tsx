"use client";

import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="flex-shrink-0 w-full bg-[#333333] border border-[#ffbb4d]/30 rounded-2xl p-6 hover:border-[#ffbb4d] transition-all duration-300 shadow-md hover:shadow-xl"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.76, 1] }}
    >
      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-[#ffbb4d]/20 to-[#ffe6b3]/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#ffbb4d] text-4xl font-light">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-light mb-3 text-white">{project.title}</h3>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech, index) => (
          <motion.span
            key={index}
            className="bg-[#ffbb4d]/20 text-white px-3 py-1 rounded-full text-xs hover:bg-[#ffbb4d] hover:text-[#333333] transition-colors duration-300 border border-[#ffbb4d]/30"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.76, 1] }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <motion.a
        href={project.link}
        className="text-[#ffbb4d] hover:text-[#ffe6b3] transition-colors font-light inline-flex items-center group"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.76, 1] }}
      >
        View details
        <motion.span className="ml-2" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>→</motion.span>
      </motion.a>
    </motion.div>
  );
}
