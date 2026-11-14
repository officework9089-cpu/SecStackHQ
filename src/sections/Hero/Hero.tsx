
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";


import { AnimatePresence } from "motion/react";

import heroLight from "@/assets/Bg_Secstack.png";
import heroDark from "@/assets/Bd_Sectsack_dark.png";

import { GridBackdrop, Particles } from "@/components/common/BackgroundFX";
import { AnimatedText, MagneticButton } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/hooks/use-active-section";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const updateTheme = () =>
      setResolvedTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const heroBackground = resolvedTheme === "dark" ? heroDark : heroLight;

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background image */}

      {/* Dynamic theme background */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        <AnimatePresence mode="sync">
          <motion.img
            key={heroBackground}
            src={heroBackground}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Theme-specific overlay */}
        <div
          className={`absolute inset-0 transition-colors duration-700 ${resolvedTheme === "dark"
              ? "bg-[#050816]/25"
              : "bg-white/15"
            }`}
        />

        {/* Content readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />

        {/* Brand ambient glow */}
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

      </div>


      {/* Existing background effects */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* <GridBackdrop /> */}
        <Particles />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          // style={{ y: yText, opacity: fade }}
          className="flex max-w-3xl flex-col items-start gap-7"
        >
          {/* Brand eyebrow */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-semibold tracking-widest text-primary backdrop-blur-md"
          >
            DEVELOP <span className="px-2 text-cyan-400">•</span>
            SECURE <span className="px-2 text-violet-500">•</span>
            GROW
          </motion.div> */}

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <AnimatedText
              text="Build. Secure. Grow."
              animateOnMount
              delay={0.35}
              className="block"
              wordClassName={(_, i) => (i === 1 ? "text-gradient" : "")}
            />
          </h1>

          {/* Description */}
          <motion.p
            className="text-lead max-w-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Transform your ideas into powerful digital experiences with
            innovative technology, advanced cybersecurity, and creative
            digital solutions.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <MagneticButton className="w-full sm:w-auto">
              <Button
                variant="hero"
                size="xl"
                className="group w-full"
                onClick={() => scrollToSection("contact")}
              >
                Start a Project
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticButton>

            <MagneticButton className="w-full sm:w-auto">
              <Button
                variant="glass"
                size="xl"
                className="w-full"
                onClick={() => scrollToSection("projects")}
              >
                <Play className="text-primary" />
                View Our Work
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3 text-sm font-semibold text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span>
              <strong className="text-foreground">120+</strong> Projects
            </span>

            <span className="hidden h-4 w-px bg-border sm:block" />

            <span>
              <strong className="text-foreground">15+</strong> Countries
            </span>

            <span className="hidden h-4 w-px bg-border sm:block" />

            <span>
              <strong className="text-foreground">24/7</strong> Support
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted-foreground md:flex"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
