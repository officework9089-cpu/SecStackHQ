import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

/** Deterministic pseudo-random so SSR and client render the same particles. */
function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function Particles({ count = 28 }: { count?: number }) {
  const reduce = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (seeded(i) * 100).toFixed(2),
        top: (seeded(i + 100) * 100).toFixed(2),
        size: Math.round(2 + seeded(i + 200) * 4),
        dur: 6 + seeded(i + 300) * 8,
        delay: seeded(i + 400) * 4,
        tone: i % 3,
      })),
    [count],
  );
  const tones = ["bg-brand-cyan", "bg-brand-blue", "bg-brand-violet"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${tones[d.tone]}`}
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={reduce ? { opacity: 0.4 } : { y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="bg-surface-glow absolute inset-0" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
