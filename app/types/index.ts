export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}

export interface SocialLink {
  href: string;
  icon: string;
  alt: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Particle {
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

export interface PdfViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface NavigationDotsProps {
  currentSection: number;
  setCurrentSection: (index: number) => void;
}

export interface SectionRendererProps {
  currentSection: number;
  setIsPdfOpen: (open: boolean) => void;
}

export interface HeroSectionProps {
  setIsPdfOpen: (open: boolean) => void;
}

export const SECTIONS = ["hero", "about", "projects", "contact"] as const;
export type Section = (typeof SECTIONS)[number];