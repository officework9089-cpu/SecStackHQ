import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText, MotionCard, StaggerContainer, TiltCard } from "@/components/motion";
import { services, type Service } from "@/data/site";
import { scrollToSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;
  return (
    <MotionCard className={cn("h-full", index === 0 && "md:col-span-2 lg:col-span-1 lg:row-span-2")}>
      <TiltCard className="border-glow glass shadow-depth group h-full rounded-3xl transition-shadow duration-500 hover:shadow-glow-lg">
        <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 sm:p-8">
          <div className="bg-gradient-brand absolute -right-16 -top-16 size-40 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
          <div className="flex items-start justify-between">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="bg-gradient-brand text-primary-foreground shadow-glow grid size-14 place-items-center rounded-2xl"
            >
              <Icon className="size-7" />
            </motion.span>
            <span className="font-display text-muted-foreground/40 text-4xl font-extrabold">0{index + 1}</span>
          </div>
          <h3 className="text-xl font-bold sm:text-2xl">{service.title}</h3>
          <p className="text-muted-foreground">{service.description}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                key="pts"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-2 overflow-hidden"
              >
                {service.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium">
                    <Check className="text-primary size-4 shrink-0" /> {p}
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-primary mt-1 text-sm font-bold underline-offset-4 hover:underline"
                  >
                    Get a quote →
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="text-primary mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-bold"
          >
            {open ? "Show less" : "Learn more"}
            <ArrowUpRight
              className={cn("size-4 transition-transform", open ? "rotate-90" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5")}
            />
          </button>
        </div>
      </TiltCard>
    </MotionCard>
  );
}

export function Services() {
  return (
    <Section id="services" className="bg-surface/60">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Services built for <GradientText>modern growth</GradientText>
          </>
        }
        description="Five disciplines, one integrated team. Pick a single service or let us handle your entire digital presence."
      />
      <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </StaggerContainer>
    </Section>
  );
}
