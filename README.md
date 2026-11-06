# SecStackHQ Digital Studio

Build an Website that 
# MASTER PROMPT — SECSTACKHQ MODERN WEBSITE DEVELOPMENT

## Role & Expertise
Act as a Senior Full Stack Developer, UI/UX Architect, and Motion Design Engineer with 10+ years of professional experience building premium, scalable, responsive, and visually immersive websites.

Your mission is to design and develop a world-class website for **SecStackHQ**, a technology and digital growth company specializing in Web Development, Cybersecurity, Penetration Testing, Graphic Design, SEO, and Digital Marketing.

The website must feel like a premium technology brand from the future: modern, energetic, intelligent, interactive, professional, and visually unforgettable.

---

## 1. Technology Stack

Use modern, production-ready technologies:

- React.js with TypeScript
- Vite
- Tailwind CSS
- Framer Motion / Motion for React
- GSAP for advanced animation sequences where necessary
- React Three Fiber + Three.js for selected 3D elements
- Lucide React for icons
- React Router for navigation
- Modular, reusable React components
- Clean architecture and maintainable code

Avoid unnecessary dependencies and excessive animation libraries.

---

## 2. Design Direction & Brand Identity

Create a premium futuristic design system for SecStackHQ.

### Brand Identity
- Brand: SecStackHQ
- Tagline: DEVELOP • SECURE • GROW
- Primary colors: Electric Blue, Cyan, Violet, Deep Navy
- Background: Bright white / soft light gray with subtle gradient surfaces
- Typography: Modern geometric sans-serif with bold, expressive headlines
- Style: Light futuristic, premium technology, clean, energetic, and sophisticated

### Visual Effects
Implement:
- Glowing gradient borders
- Soft neon shadows
- Glassmorphism cards
- 3D-style typography
- Animated gradient text
- Floating UI elements
- Depth-based shadows
- Subtle background grids
- Animated particles and orbital elements
- Smooth hover transformations
- Interactive gradient buttons
- Perspective-based 3D card effects

Maintain visual clarity and readability. Effects must enhance the experience, not overwhelm it.

---

## 3. Advanced Motion & Animation System

**Motion is a core design requirement, not an optional decoration.**

Use modern Motion for React / Framer Motion components throughout the website.

### Global Animation Requirements
- Smooth page transitions
- Section entrance animations
- Scroll-triggered reveals
- Staggered animations for cards and lists
- Smooth opacity and transform transitions
- Animated headings and gradient text
- Interactive hover and tap states
- Animated navigation indicators
- Parallax effects for selected backgrounds
- Scroll progress indicator
- Smooth modal and drawer animations
- Animated loading states

### Motion Components
Create reusable animation components:

- `FadeIn`
- `SlideIn`
- `RevealOnScroll`
- `StaggerContainer`
- `AnimatedText`
- `GradientText`
- `MotionCard`
- `MagneticButton`
- `TiltCard`
- `FloatingElement`
- `PageTransition`
- `ScrollProgress`

Use Motion variants and reusable animation configurations.

Example:

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.7,
    ease: "easeOut"
  }}
>
  <YourComponent />
</motion.div>
```

Use `motion/react` for modern Motion for React implementations.

---

## 4. Responsive Design — All Devices

The website must be fully responsive and optimized for:

- Small mobile devices: 320px+
- Standard smartphones
- Large smartphones
- Tablets: Portrait and Landscape
- iPads
- Laptops
- Desktop monitors
- Ultra-wide screens

### Responsive Requirements
- Mobile-first development
- Fluid typography using `clamp()`
- Responsive spacing and container widths
- Flexible CSS Grid and Flexbox
- Adaptive navigation and mobile menu
- Responsive hero composition
- Responsive card grids
- Optimized image scaling
- Touch-friendly interactions
- No horizontal overflow
- No overlapping elements
- Responsive animations
- Device-specific layout adjustments

Test every section at mobile, tablet, and desktop breakpoints.

---

## 5. Website Sections

Build a complete, professional, multi-section website.

### A. Navbar
- Premium brand logo
- Home, About, Services, Projects, Process, Contact
- Animated active navigation indicator
- Smooth scroll navigation
- Glassmorphism navbar
- Scroll-aware styling
- Responsive mobile drawer
- Animated hamburger menu
- CTA button: "Start a Project"

### B. Hero Section
Create an impressive, cinematic hero.

Headline:
"Build. Secure. Grow."

Supporting text:
"Transform your ideas into powerful digital experiences with technology, security, and creative innovation."

Features:
- Large 3D-style headline
- Animated gradient typography
- Glowing 3D visual or abstract tech object
- Floating service icons
- Interactive background effects
- Animated CTA buttons
- Scroll-down indicator
- Animated entrance sequence
- Responsive visual composition

### C. About Section
- Company introduction
- Brand philosophy
- Mission and vision
- Animated statistics
- Interactive visual elements
- Scroll-triggered content reveal

### D. Services Section
Create premium animated service cards:

1. Website & Web Application Development
2. Cybersecurity & Penetration Testing
3. Graphic Design & Branding
4. SEO & Digital Marketing
5. Social Media Marketing

Each service card should include:
- Unique icon or visual
- Animated gradient border
- 3D hover tilt
- Glowing hover state
- Service description
- Learn More interaction
- Smooth reveal animation

### E. Projects / Portfolio
- Modern project showcase
- Responsive project grid
- Interactive project cards
- Hover image overlays
- Animated filters
- Project details modal
- Technology stack badges
- Live demo and GitHub links

### F. Why Choose Us
- Security-first approach
- Modern technology
- Scalable architecture
- Performance optimization
- Creative solutions
- Reliable communication

Use animated icons, counters, and interactive feature cards.

### G. Development Process
Create an animated timeline:

1. Discovery
2. Planning
3. Design
4. Development
5. Testing & Security
6. Deployment

Use scroll-based timeline animations and glowing progress indicators.

### H. Testimonials
- Premium testimonial cards
- Smooth carousel transitions
- Responsive slider
- Animated pagination
- Optional client avatars

### I. Contact Section
Create an interactive contact experience.

- Animated contact form
- Name, email, subject, message
- Form validation
- Loading and success states
- Service selection
- WhatsApp CTA
- Email CTA
- Animated contact cards

### J. Footer
- Brand logo
- Company tagline
- Quick navigation
- Services
- Social media links
- Contact information
- Animated hover effects
- Back-to-top button

---

## 6. Advanced UI Interactions

Implement:
- Custom cursor effects on desktop only
- Magnetic CTA buttons
- 3D tilt cards
- Animated background gradients
- Scroll-based visual transformations
- Interactive service cards
- Smooth dropdown menus
- Animated mobile navigation
- Command-style navigation if appropriate
- Responsive light/dark theme toggle

All interactions must remain accessible and usable on touch devices.

---

## 7. Performance & Accessibility

Prioritize:
- Lighthouse performance optimization
- Code splitting
- Lazy loading
- Optimized images
- Efficient animation rendering
- Minimal unnecessary re-renders
- Semantic HTML
- Keyboard navigation
- Accessible contrast
- ARIA attributes
- Reduced-motion support
- SEO-friendly structure
- Proper metadata
- Responsive image delivery

Respect `prefers-reduced-motion` and provide accessible alternatives to motion-heavy interactions.

Avoid animating layout properties unnecessarily. Prefer GPU-friendly transforms and opacity.

---

## 8. Code Architecture

Use a clean, scalable project structure:

```text
src/
├── components/
│   ├── ui/
│   ├── motion/
│   ├── layout/
│   └── common/
├── sections/
│   ├── Hero/
│   ├── About/
│   ├── Services/
│   ├── Projects/
│   ├── Process/
│   ├── Testimonials/
│   └── Contact/
├── hooks/
├── animations/
├── data/
├── assets/
├── lib/
├── types/
├── styles/
├── App.tsx
└── main.tsx
```

Keep components reusable, typed, modular, and easy to maintain.

---

## 9. Development Instructions

Follow these implementation rules:

1. Analyze the complete website requirements before coding.
2. Establish a consistent design system and animation system.
3. Build reusable UI and motion components.
4. Implement sections independently.
5. Integrate responsive layouts from the beginning.
6. Add animations progressively without compromising performance.
7. Validate all breakpoints.
8. Test navigation, forms, and interactions.
9. Optimize production build.
10. Deliver complete, functional code.

Do not create a static mockup. Build an actual working React website with functional components, real interactions, responsive behavior, and reusable animations.

---

## Final Objective

Deliver a **premium, futuristic, light-themed SecStackHQ website** that combines:

- Professional business credibility
- Modern React architecture
- Smooth Motion for React animations
- Interactive 3D visual experiences
- Glowing gradients and premium UI
- Responsive design across every device
- Clean, maintainable production-ready code

The final website should feel like a high-end digital technology brand — visually impressive, technically robust, and ready to showcase to international clients.

**Brand Signature: SecStackHQ — DEVELOP. SECURE. GROW.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b2a6372-2e84-46ed-84b4-f21cefa392f2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
