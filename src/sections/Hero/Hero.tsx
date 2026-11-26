
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useEffect, useState } from "react";

import heroLight from "@/assets/Bg_Secstack.AVIF";
import heroDark from "@/assets/Bd_Sectsack_dark.AVIF";

import { Particles } from "@/components/common/BackgroundFX";
import { AnimatedText, MagneticButton } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/hooks/use-active-section";

export function Hero() {
  const [resolvedTheme, setResolvedTheme] =
    useState<"dark" | "light">("light");

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTheme = () => {
      setResolvedTheme(
        document.documentElement.classList.contains("dark")
          ? "dark"
          : "light"
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const heroBackground =
    resolvedTheme === "dark" ? heroDark : heroLight;

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      {/* Hero background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={heroBackground}
            src={heroBackground}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        <div
          className={`absolute inset-0 ${
            resolvedTheme === "dark"
              ? "bg-[#050816]/25"
              : "bg-white/15"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />

        {!reduceMotion && (
          <>
            <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />
          </>
        )}
      </div>

      {/* Lightweight background effects */}
      {!reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
        >
          <Particles count={12} />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex max-w-3xl flex-col items-start gap-7">

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <AnimatedText
              text="Build. Secure. Grow."
              animateOnMount
              delay={reduceMotion ? 0 : 0.2}
              className="block"
              wordClassName={(_, i) =>
                i === 1 ? "text-gradient" : ""
              }
            />
          </h1>

          <p className="text-lead max-w-2xl text-muted-foreground">
            Transform your ideas into powerful digital experiences
            with innovative technology, advanced cybersecurity,
            and creative digital solutions.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3 text-sm font-semibold text-muted-foreground">
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
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted-foreground md:flex"
        aria-label="Scroll to about section"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 0.8 }}
      >
        Scroll

        {!reduceMotion && (
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
          >
            <ChevronDown className="size-5" />
          </motion.span>
        )}
      </motion.button>
    </section>
  );
}
