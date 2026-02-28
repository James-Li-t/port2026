## 🚀 Features

- **Scroll-based navigation**: Smooth section transitions via scroll wheel, arrow keys, or touch gestures
- **Dynamic particle background**: 120 particles with pulsing effects, connecting lines, mouse repulsion, and constrained movement within fixed radii
- **Dark theme**: Consistent `#333333` background with amber accents (`#ffbb4d`, `#ffe6b3`, `#ffd580`)
- **Responsive design**: Optimized for desktop and mobile devices
- **Animated loading screen**: Sleek favicon loader with 3-second fade-out transition
- **PDF viewer modal**: Dark theme modal for viewing and downloading resume

## 🛠️ Technologies

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 12.33.0** - Animation library with spring easing `[0.34, 1.56, 0.76, 1]`
- **ESLint 9** - Code linting

## 🏗️ Project Structure

```
app/
├── components/
│   ├── FaviconLoader.tsx   # Animated loading screen with favicon
│   ├── ParticleBackground.tsx # Dynamic particle canvas animation
│   ├── PdfViewer.tsx       # Dark theme PDF viewer modal
│   └── ProjectCard.tsx     # Dark theme project card component
├── favicon.ico
├── globals.css             # Global styles and custom scrollbar
├── layout.tsx              # Root layout with Google fonts
├── not-found.tsx           # Custom 404 page
└── page.tsx                # Main homepage with sections
public/                     # Static assets (images, icons, resume.pdf)
skills/                     # Additional project resources
```

## 🏃 Getting Started

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

Creates a production build and starts the production server

### Linting

```bash
npm run lint
```

Runs ESLint to check for code issues

### Verification

```bash
npm run build
```

Builds the production bundle and ensures no TypeScript or compilation errors

## 🎨 Design

- **Color palette**: `#333333` (background), `#ffbb4d` (primary), `#ffe6b3` (secondary), `#ffd580` (accent)
- **Typography**: Geist Sans and Geist Mono from Google Fonts
- **Animations**: Spring easing `[0.34, 1.56, 0.76, 1]` for smooth transitions

