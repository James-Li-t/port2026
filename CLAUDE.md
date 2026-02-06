# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.6 application using React 19.2.3 with TypeScript. The project is bootstrapped with `create-next-app` and uses Tailwind CSS for styling with the Geist font family.

## Key Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Application Structure

- `app/` - Main application directory with Next.js App Router files
  - `layout.tsx` - Root layout component with metadata and font imports
  - `page.tsx` - Main homepage component
  - `not-found.tsx` - 404 page component
- `public/` - Static assets including SVG files
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## Development Workflow

1. Start development server with `npm run dev`
2. Edit files in the `app/` directory to modify the application
3. The homepage is located at `app/page.tsx`
4. The main layout is defined in `app/layout.tsx`
5. All styling is handled through Tailwind CSS classes in the JSX components

The application uses the App Router with the `app/` directory structure, which is the modern approach for Next.js 13+ applications.