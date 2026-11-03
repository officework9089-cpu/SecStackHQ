import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import {
  defaultViewport,
  fadeVariants,
  revealVariants,
  staggerContainer,
  staggerItem,
  type Direction,
} from "@/animations/variants";

type DivProps = Omit<HTMLMotionProps<"div">, "children"> & { children?: ReactNode };

export function FadeIn({ delay = 0, children, ...rest }: DivProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={defaultViewport}
      transition={{ duration: 0.8, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  direction = "up",
  delay = 0,
  children,
  ...rest
}: DivProps & { direction?: Direction; delay?: number }) {
  return (
    <motion.div
      variants={fadeVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealOnScroll({ delay = 0, children, ...rest }: DivProps & { delay?: number }) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  stagger = 0.1,
  delay = 0,
  children,
  ...rest
}: DivProps & { stagger?: number; delay?: number }) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: DivProps) {
  return (
    <motion.div variants={staggerItem} {...rest}>
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
