import { FadeIn } from "@/components/motion";
import type { ReactNode } from "react";
export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="border-b bg-surface"><div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24"><FadeIn><div className="flex gap-2 items-center text-xs font-bold uppercase text-primary mb-5"><span className="size-2 bg-primary" />{eyebrow}</div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">{title}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">{description}</p>{children && <div className="mt-8">{children}</div>}</FadeIn></div></section>;
}
export function PageSection({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20 ${className}`}>{children}</section>; }