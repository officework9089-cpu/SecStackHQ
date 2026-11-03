import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText } from "@/components/motion";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = testimonials.length;

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + n) % n, d]),
    [n],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  const t = testimonials[index] ?? testimonials[0]!;
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <Section id="testimonials" className="bg-surface/60">
      <SectionHeading
        eyebrow="Client love"
        title={
          <>
            Trusted by teams <GradientText>worldwide</GradientText>
          </>
        }
      />

      <div
        className="relative mx-auto max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <div className="border-glow glass shadow-glow-lg relative min-h-[340px] overflow-hidden rounded-[2rem] sm:min-h-[300px]">
          <Quote className="text-primary/15 absolute top-6 right-6 size-20" aria-hidden />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60, filter: "blur(6px)" }),
                center: { opacity: 1, x: 0, filter: "blur(0px)" },
                exit: (d: number) => ({ opacity: 0, x: d * -60, filter: "blur(6px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="flex cursor-grab flex-col gap-6 p-7 active:cursor-grabbing sm:p-12"
              aria-live="polite"
            >
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-primary text-primary size-4" />
                ))}
              </div>
              <blockquote className="font-display text-lg leading-relaxed font-medium sm:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span className="bg-gradient-brand text-primary-foreground grid size-12 shrink-0 place-items-center rounded-full font-bold">
                  {initials}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">{t.name}</span>
                  <span className="text-muted-foreground block text-sm">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="glass hover:shadow-glow grid size-11 place-items-center rounded-full transition-shadow"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn("relative h-2.5 rounded-full transition-all", i === index ? "w-8" : "bg-border w-2.5")}
              >
                {i === index && (
                  <motion.span layoutId="t-dot" className="bg-gradient-brand absolute inset-0 rounded-full" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="glass hover:shadow-glow grid size-11 place-items-center rounded-full transition-shadow"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
