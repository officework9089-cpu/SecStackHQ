import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Counter } from "@/components/common/Counter";
import ThreeDImagePageflip, {
  type PageFlipLeaf,
} from "@/components/common/ThreeDImagePageflip";
import {
  GradientText,
  MotionCard,
  StaggerContainer,
  TiltCard,
} from "@/components/motion";
import { Button } from "@/components/ui/button";
import { reasons, services, type Service } from "@/data/site";
import { cn } from "@/lib/utils/calculator";
import aboutHero from "@/assets/Futuristic Blue Cybersecurity Abstract Background.png";

export const Route = createFileRoute("/_public/services")({
  head: () => ({
    meta: [
      { title: "Services & Why SecStackHQ — Develop. Secure. Grow." },
      {
        name: "description",
        content:
          "Explore SecStackHQ's full-stack web development, cybersecurity, branding, and growth services—and see why ambitious teams trust our engineering.",
      },
    ],
  }),
  component: ServicesAndWhyUsPage,
});

const metrics = [
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 2, suffix: "s", label: "Avg. Load Time", prefix: "<" },
  { value: 24, suffix: "h", label: "Incident Response" },
];

const interactivePlates: PageFlipLeaf[] = [
  {
    id: 1,
    frontImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    backImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    frontTitle: "Zero-Trust Node",
    frontSubtitle: "Encrypted Perimeter Defense",
    frontBadge: "Security",
    backTitle: "Code Auditing",
    backSubtitle: "Automated Static & Dynamic Analysis",
    backBadge: "Pentesting",
  },
  {
    id: 2,
    frontImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    backImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    frontTitle: "Cloud Scaling",
    frontSubtitle: "Elastic Edge & Container Clusters",
    frontBadge: "Web Dev",
    backTitle: "Database Hardening",
    backSubtitle: "Isolated VPC & Encrypted Storage",
    backBadge: "Infra",
  },
  {
    id: 3,
    frontImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    backImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    frontTitle: "Growth Engine",
    frontSubtitle: "Technical SEO & Conversion Funnels",
    frontBadge: "Growth",
    backTitle: "Brand Systems",
    backSubtitle: "High-Contrast UI & Design Tokens",
    backBadge: "Branding",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;

  return (
    <MotionCard
      className={cn(
        "h-full",
        index === 0 && "md:col-span-2 lg:col-span-1 lg:row-span-2"
      )}
    >
      <TiltCard className="border-glow glass shadow-depth group h-full rounded-3xl transition-shadow duration-500 hover:shadow-glow-lg">
        <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 sm:p-8">
          <div className="bg-gradient-brand absolute -top-16 -right-16 size-40 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />

          <div className="flex items-start justify-between">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="bg-gradient-brand text-primary-foreground shadow-glow grid size-14 place-items-center rounded-2xl"
            >
              <Icon className="size-7" />
            </motion.span>
            <span className="font-display text-muted-foreground/40 text-4xl font-extrabold">
              0{index + 1}
            </span>
          </div>

          <h3 className="text-xl font-bold sm:text-2xl">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                key="pts"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-2.5 overflow-hidden border-t border-border/50 pt-3"
              >
                {service.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Check className="text-primary size-4 shrink-0" /> {p}
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    to="/contact"
                    className="text-primary inline-flex items-center gap-1 text-sm font-bold underline-offset-4 hover:underline"
                  >
                    Get a quote <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="text-primary mt-auto inline-flex w-fit cursor-pointer items-center gap-1.5 pt-2 text-sm font-bold"
          >
            {open ? "Show less" : "Learn more"}
            <ArrowUpRight
              className={cn(
                "size-4 transition-transform",
                open
                  ? "rotate-90"
                  : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              )}
            />
          </button>
        </div>
      </TiltCard>
    </MotionCard>
  );
}

function ServicesAndWhyUsPage() {
  return (
    <div className="min-h-screen  pb-24 text-foreground">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden border-b border-border/60 pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_70%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2f6bff] via-indigo-500 to-cyan-500 opacity-20 blur-[140px]"
        /> */}

                {/* Background Image & Gradient Overlay */}
                <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
                  <img
                    src= {aboutHero}
                    alt="SecStackHQ Infrastructure"
                    className="size-full object-cover object-center dark:opacity-20 scale-105"
                  />
                  {/* Gradient fade to blend nicely with the page background */}
                  {/* <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/80 to-background" /> */}
                </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* <Link
            to="/"
            className="glass mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground/25 hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Back to Home
          </Link> */}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
              <Layers className="size-3.5" /> Capabilities &amp; Advantage
            </div> */}

            <h1 className="font-['Sora'] text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.1]">
              Services built for{" "}
              <GradientText>modern, secure growth</GradientText>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Five integrated disciplines under one roof—backed by obsessive
              engineering standards, offensive security testing, and measurable
              performance.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-28 px-6 pt-20 lg:px-12">
        {/* 2. Services Bento Grid */}
        <section aria-labelledby="services-heading" className="space-y-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              What we do
            </span>
            <h2
              id="services-heading"
              className="font-['Sora'] mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              End-to-End <GradientText>Digital Execution</GradientText>
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              Pick a single specialized service or let us architect and scale
              your entire digital presence.
            </p>
          </div>

          <StaggerContainer
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.12}
          >
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </StaggerContainer>
        </section>

        {/* 3. Why Choose Us + Interactive 3D Blueprint Book */}
        <section
          aria-labelledby="why-heading"
          className="space-y-14 border-t border-border/60 pt-20"
        >
          {/* Split Header + 3D Pageflip Showcase */}
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                <ShieldCheck className="size-3.5" /> Why SecStackHQ
              </div>
              <h2
                id="why-heading"
                className="font-['Sora'] text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Built different. <GradientText>Built secure.</GradientText>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We obsess over the details that separate an ordinary website
                from a resilient growth engine. Flip through our architecture
                plates to inspect how we combine speed, security, and design.
              </p>

              {/* Performance Metrics Strip */}
              <div className="glass shadow-depth grid grid-cols-3 divide-x divide-border/70 rounded-2xl border border-border/70">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col items-center gap-1 px-2 py-5 text-center"
                  >
                    <span className="font-display text-gradient text-xl font-extrabold sm:text-3xl">
                      {m.prefix}
                      <Counter value={m.value} suffix={m.suffix} />
                    </span>
                    <span className="text-muted-foreground text-[11px] font-semibold sm:text-xs">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Interactive Pageflip Component */}
            <div className="glass relative overflow-hidden rounded-3xl border border-border/80 bg-card/40 p-4 sm:p-6 shadow-xl">
              <div className="mb-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                <Sparkles className="size-3.5 text-[#2f6bff]" /> Click or use
                arrow keys to flip pages
              </div>
              <div className="flex justify-center overflow-x-auto">
                <ThreeDImagePageflip
                  pages={interactivePlates}
                  accentColor="#2f6bff"
                  pageWidth={215}
                  pageHeight={300}
                />
              </div>
            </div>
          </div>

          {/* Why Us Reasons Grid */}
          {/* <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <MotionCard key={r.title}>
                <TiltCard
                  max={8}
                  className="border-glow glass shadow-depth group h-full rounded-3xl"
                >
                  <div className="flex flex-col gap-4 p-7">
                    <motion.span
                      className="bg-accent text-primary group-hover:bg-gradient-brand group-hover:text-primary-foreground grid size-12 place-items-center rounded-2xl transition-colors duration-300"
                      whileInView={{ rotate: [0, -10, 10, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <r.icon className="size-6" />
                    </motion.span>
                    <h3 className="text-lg font-bold">{r.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                </TiltCard>
              </MotionCard>
            ))}
          </StaggerContainer> */}
        </section>

        {/* 4. Bottom CTA Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-slate-950 p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2f6bff]/25 via-indigo-500/10 to-cyan-500/20" />
          <div className="relative z-10 mx-auto max-w-2xl space-y-5 text-white">
            <h3 className="font-['Sora'] text-2xl font-bold sm:text-3xl">
              Not sure which package fits your roadmap?
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Book a quick discovery call and we'll map out the exact
              architecture, security audit, and growth scope you need.
            </p>
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#2f6bff] px-8 py-6 text-base font-semibold text-white hover:bg-[#2f6bff]/90"
              >
                <Link to="/contact">
                  Request a Custom Quote <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}