"use client";

import React from "react";
import type { Project } from "../types";

const ProjectCard = React.memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-full bg-background border border-primary/30 rounded-2xl p-5 md:p-6 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl">
      <div className="relative w-full h-40 md:h-48 mb-4 md:mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-3xl md:text-4xl font-light">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-white">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-primary/20 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs hover:bg-primary hover:text-background transition-colors duration-300 border border-primary/30"
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        className="text-primary hover:text-secondary transition-colors font-light inline-flex items-center"
      >
        View details
        <span className="ml-1.5 md:ml-2">→</span>
      </a>
    </div>
  );
});

export default ProjectCard;