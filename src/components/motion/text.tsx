import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/calculator";
import { easeOutExpo } from "@/animations/variants";

/** Splits text into words and reveals each word with a staggered rise. */
export function AnimatedText({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "span",
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string | ((word: string, i: number) => string);
  delay?: number;
  as?: ElementType;
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } };
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn(
                "inline-block",
                typeof wordClassName === "function" ? wordClassName(word, i) : wordClassName,
              )}
              variants={{
                hidden: { y: "110%", rotateX: -40, opacity: 0 },
                visible: { y: "0%", rotateX: 0, opacity: 1, transition: { duration: 0.9, ease: easeOutExpo } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-gradient", className)}>{children}</span>;
}
