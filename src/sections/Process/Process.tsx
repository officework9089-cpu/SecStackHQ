import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText } from "@/components/motion";
import { processSteps } from "@/data/site";
import { cn } from "@/lib/utils/calculator";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            A process designed for <GradientText>zero surprises</GradientText>
          </>
        }
        description="Six clear stages take you from idea to a secure, live product — with full visibility at every step."
      />

      <ol ref={ref} className="relative mx-auto max-w-4xl">
        {/* track */}
        <div className="bg-border absolute top-0 bottom-0 left-6 w-0.5 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY }}
          className="bg-gradient-brand shadow-glow absolute top-0 bottom-0 left-6 w-0.5 origin-top md:left-1/2 md:-translate-x-1/2"
        />

        {processSteps.map((s, i) => {
          const right = i % 2 === 1;
          return (
            <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-2 md:gap-16">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="bg-gradient-brand text-primary-foreground shadow-glow-lg relative z-10 grid size-12 place-items-center rounded-2xl md:absolute md:left-1/2 md:-translate-x-1/2"
              >
                <s.icon className="size-5" />
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: right ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "border-glow glass shadow-depth rounded-3xl p-6",
                  right ? "md:col-start-2" : "md:col-start-1 md:text-right",
                )}
              >
                <span className="text-primary text-xs font-bold tracking-widest uppercase">Step 0{i + 1}</span>
                <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{s.text}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
