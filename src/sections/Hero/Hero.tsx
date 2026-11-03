import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useRef } from "react";

import { GridBackdrop, Particles } from "@/components/common/BackgroundFX";
import { Eyebrow } from "@/components/common/SectionHeading";
import { AnimatedText, MagneticButton } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/hooks/use-active-section";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <GridBackdrop />
      <Particles />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <motion.div style={{ y: yText, opacity: fade }} className="flex flex-col items-start gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Eyebrow>Develop • Secure • Grow</Eyebrow>
          </motion.div>

          <h1 className="text-display text-3d font-extrabold">
            <AnimatedText
              text="Build. Secure. Grow."
              animateOnMount
              delay={0.35}
              className="block"
              wordClassName={(_, i) => (i === 1 ? "text-gradient" : "")}
            />
          </h1>

          <motion.p
            className="text-lead text-muted-foreground max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Transform your ideas into powerful digital experiences with technology, security, and creative
            innovation.
          </motion.p>

          <motion.div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <MagneticButton className="w-full sm:w-auto">
              <Button variant="hero" size="xl" className="group w-full" onClick={() => scrollToSection("contact")}>
                Start a Project
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <Button variant="glass" size="xl" className="w-full" onClick={() => scrollToSection("projects")}>
                <Play className="text-primary" /> View Our Work
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span>
              <strong className="text-foreground">120+</strong> projects
            </span>
            <span className="bg-border hidden h-4 w-px sm:block" />
            <span>
              <strong className="text-foreground">15+</strong> countries
            </span>
            <span className="bg-border hidden h-4 w-px sm:block" />
            <span>
              <strong className="text-foreground">24/7</strong> support
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yVisual }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        className="text-muted-foreground absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold md:flex"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
