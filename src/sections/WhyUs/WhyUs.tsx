import { motion } from "motion/react";

import { Counter } from "@/components/common/Counter";
import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText, MotionCard, StaggerContainer, TiltCard } from "@/components/motion";
import { reasons } from "@/data/site";

const metrics = [
  { value: 99, suffix: "%", label: "Uptime" },
  { value: 2, suffix: "s", label: "Avg. load time", prefix: "<" },
  { value: 24, suffix: "h", label: "Response time" },
];

export function WhyUs() {
  return (
    <Section id="why" className="bg-surface/60">
      <SectionHeading
        eyebrow="Why SecStackHQ"
        title={
          <>
            Built different. <GradientText>Built secure.</GradientText>
          </>
        }
        description="We obsess over the details that make the difference between a website and a growth engine."
      />

      <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <MotionCard key={r.title}>
            <TiltCard max={8} className="border-glow glass shadow-depth group rounded-3xl">
              <div className="flex flex-col gap-4 p-7">
                <motion.span
                  className="bg-accent text-primary group-hover:bg-gradient-brand group-hover:text-primary-foreground grid size-12 place-items-center rounded-2xl transition-colors duration-300"
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <r.icon className="size-6" />
                </motion.span>
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.text}</p>
              </div>
            </TiltCard>
          </MotionCard>
        ))}
      </StaggerContainer>

      <div className="glass shadow-depth mt-10 grid grid-cols-3 divide-x rounded-3xl">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1 px-2 py-6 text-center sm:py-8">
            <span className="font-display text-gradient text-2xl font-extrabold sm:text-4xl">
              {m.prefix}
              <Counter value={m.value} suffix={m.suffix} />
            </span>
            <span className="text-muted-foreground text-xs font-semibold sm:text-sm">{m.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
