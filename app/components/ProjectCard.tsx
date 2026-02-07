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
      className="flex-shrink-0 w-80 border border-[#ffe6b3] rounded-2xl p-6 hover:shadow-xl transition-all bg-white backdrop-blur-sm mr-6"
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
    >
      <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 rounded-xl" />
      </div>
      <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
      <p className="text-[#666666] mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span key={index} className="bg-[#ffe6b3] text-[#333333] px-2 py-1 rounded-full text-xs">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <a href={project.link} className="text-[#ffbb4d] hover:text-[#333333] transition-colors font-medium">
          View details →
        </a>
      </div>
    </motion.div>
  );
}
