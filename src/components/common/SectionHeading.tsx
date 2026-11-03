import { RevealOnScroll } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass text-primary inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase">
      <span className="bg-gradient-brand size-1.5 rounded-full" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <RevealOnScroll
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-5 md:mb-16",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-h2 font-bold">{title}</h2>
      {description && <p className="text-lead text-muted-foreground">{description}</p>}
    </RevealOnScroll>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
