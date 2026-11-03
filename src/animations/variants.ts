import type { Transition, Variants } from "motion/react";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const baseTransition: Transition = { duration: 0.7, ease: easeOutExpo };

export type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
};

export const fadeVariants = (direction: Direction = "up", distance = 1): Variants => {
  const o = offsets[direction];
  return {
    hidden: { opacity: 0, x: (o.x ?? 0) * distance, y: (o.y ?? 0) * distance },
    visible: { opacity: 1, x: 0, y: 0, transition: baseTransition },
  };
};

export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: baseTransition },
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: easeOutExpo } },
};

export const defaultViewport = { once: true, amount: 0.2 } as const;
