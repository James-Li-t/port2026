---
name: port2026-portfolio
description: Guide for developing and maintaining the Port2026 portfolio website (Next.js 16.1.6 + React 19 + Tailwind CSS). Use when working on portfolio features, project showcases, contact forms, or styling updates. Triggered by requests to add/modify projects, update styling, fix animations, or improve portfolio functionality.
---

# Port2026 Portfolio Development

## Overview

This skill provides guidance for developing and maintaining the Port2026 personal portfolio website. The project uses Next.js 16.1.6 with App Router, React 19.2.3, TypeScript 5, and Tailwind CSS 4. The portfolio features smooth scroll animations using Framer Motion and a distinctive golden/orange color scheme (#ffbb4d, #ffd580).

## Project Context

- **Tech Stack**: Next.js 16.1.6, React 19.2.3, TypeScript 5, Tailwind CSS 4
- **Framework**: App Router architecture in `app/` directory
- **Styling**: Utility-first with Tailwind CSS, custom scrollbar styling
- **Animations**: Framer Motion for smooth transitions and scroll effects
- **Font**: Geist font family (Geist Sans + Geist Mono)
- **Current Status**: v0.1.0, primarily AI-assisted development (67% "vibecoded")

## Project Structure

```
app/
├── components/
│   └── ProjectCard.tsx      # Project display component with motion
├── page.tsx                 # Main portfolio page with scroll sections
├── layout.tsx               # HTML shell with font loading
├── not-found.tsx            # Error page
└── globals.css              # Custom scrollbar and Tailwind imports
```

## Core Tasks

### 1. Project Showcase Updates

When adding or modifying portfolio projects:

**Workflow:**
1. Open `app/page.tsx` to view the `projects` array (line ~8)
2. Add new project object with required fields:
   - `id`: Unique number
   - `title`: Project name
   - `description`: Brief project description
   - `technologies`: Array of tech stack strings
   - `image`: Image path relative to `app/assets/`
   - `link`: Project URL
3. Update the project mapping in the render section (line ~242)
4. Ensure image files are placed in `app/assets/` directory

**Example Project Object:**
```typescript
{
  id: 2,
  title: "AI Chat App",
  description: "Real-time chat application with WebSocket integration",
  technologies: ["Next.js", "WebSocket", "React"],
  image: "/assets/ai-chat.jpg",
  link: "https://github.com/example/ai-chat"
}
```

### 2. Styling Updates

**Tailwind CSS Patterns:**
- Use utility classes for responsive design
- Color palette: #ffbb4d (primary), #ffd580 (scrollbar)
- Typography: Geist Sans (body), Geist Mono (monospace)
- Animations: `animate={{ ... }}` with Framer Motion

**Common Patterns:**
- Smooth scroll: `scroll-smooth` class
- Animations: `motion.div` with `animate`, `transition`
- Hover effects: `hover:text-[#ffbb4d]`
- Gradients: `bg-gradient-to-b`, `bg-gradient-to-r`

### 3. Animation Enhancements

**Framer Motion Usage:**
- Import: `import { motion, AnimatePresence } from "framer-motion"`
- Scroll animations: Vertical scroll sections with scroll progress
- Touch support: Mobile-friendly touch event handlers
- Loading animations: Floating elements with `animate={{ y: [...] }}`

**Key Animation Props:**
- `transition`: Duration, delay, repeat for infinite animations
- `initial={{ opacity: 0 }}`: Fade-in effects
- `animate={{ opacity: 1 }}`: Entrance animations
- `exit={{ opacity: 0 }}`: Exit animations for sections

### 4. Contact Integration

**Email Contact:**
- NodeMailer installed (v8.0.0) for email functionality
- Configure email service in `.env.local` or create API routes
- API endpoints: `/api/contact` for form submissions

**CV Integration:**
- Currently integrated in project description
- Update CV link in project array as needed
- Consider adding downloadable CV section

### 5. Responsive Design

**Mobile Optimization:**
- Touch event handlers in `page.tsx` for mobile scrolling
- Responsive images and text sizes
- Custom scrollbar for consistent UX

**Viewport Settings:**
- Ensure proper meta tags in `layout.tsx`
- Test on multiple viewport sizes

## Development Workflow

**Starting Development:**
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint checks
```

**File Location:**
- Main page: `app/page.tsx` (329 lines with scroll logic)
- Project card: `app/components/ProjectCard.tsx` (46 lines)
- Layout: `app/layout.tsx` (34 lines)
- Styles: `app/globals.css` (custom scrollbar)

## Best Practices

1. **Type Safety**: TypeScript throughout for type definitions
2. **Component Reuse**: Keep ProjectCard component for consistency
3. **Animation Performance**: Use `will-change` sparingly, keep animations lightweight
4. **Image Optimization**: Place images in `app/assets/` for easy access
5. **Error Handling**: Add try-catch blocks for async operations
6. **Accessibility**: Include semantic HTML and aria-labels where needed

## Customization Guidelines

**Color Scheme Updates:**
- Primary color: `#ffbb4d`
- Scrollbar: `#ffd580` to `#ffbb4d`
- Text colors: Use hex codes for consistency

**Typography Changes:**
- Update font loading in `layout.tsx` with Geist family
- Consider adding Google Fonts for personal branding

**Layout Modifications:**
- Modify scroll sections in `page.tsx` based on needs
- Adjust section heights and content in ProjectCard component

## Troubleshooting

**Common Issues:**
- **Animations not working**: Check Framer Motion import and syntax
- **Images not showing**: Verify image paths in `app/assets/` directory
- **Scroll stuck**: Check touch event handlers in mobile section
- **Build errors**: Run `npm run lint` to check for TypeScript/ESLint issues
- **Style conflicts**: Check Tailwind CSS configuration and CSS imports

## AI Development Notes

**Development Context:**
- Project mentions 67% AI-assisted development
- Uses OpenCode with qwen3 model for framework/design assistance
- Disclaimer states: "This website was 67% vibecoded"

**When AI Assistance is Appropriate:**
- Framework decisions and initial setup
- Design patterns and animation suggestions
- Code structure and organization
- Quick implementations for common patterns

**When Manual Implementation Preferred:**
- Critical security updates
- Performance optimizations
- User interaction logic
- Custom business logic

## Resources

### scripts/
*Currently no custom scripts needed. All functionality is handled via React components.*

### references/
*Refer to existing project files for specific implementation details:*
- `app/page.tsx` - Scroll animation logic
- `app/components/ProjectCard.tsx` - Project display patterns
- `app/layout.tsx` - Font loading and structure

### assets/
*Place portfolio images in `app/assets/` directory for project cards.*

---

**Note**: This skill focuses on portfolio development patterns. For broader Next.js guidance, refer to Next.js documentation at https://nextjs.org/docs.
