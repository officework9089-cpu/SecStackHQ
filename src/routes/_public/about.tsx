import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Award, ArrowRight, CheckCircle2, Code2, ShieldCheck, Search, Cpu, Rocket } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { GradientText, MotionCard, StaggerContainer } from "@/components/motion";
import { stats } from "@/data/site";
import { Counter } from "@/components/common/Counter";
import { Button } from "@/components/ui/button";
import AboutHero from "@/assets/Futuristic Blue Cybersecurity Abstract Background.png";
export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [{ title: "About Us & Our Process — SecStackHQ" }],
  }),
  component: AboutUsPage,
});

const processSteps = [
  {
    step: "01",
    title: "Discovery & Threat Modeling",
    desc: "We analyze your technical requirements, business goals, and potential threat vectors before writing a single line of code.",
    icon: Search,
  },
  {
    step: "02",
    title: "Secure Architecture & Build",
    desc: "Our engineers build blazing-fast React/Full-stack web applications following zero-trust principles and modern UI standards.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Rigorous Penetration Testing",
    desc: "Ethical hackers simulate real-world cyberattacks against the build to patch vulnerabilities prior to going live.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Growth & Scaling",
    desc: "We optimize your platform for search engines, conversion rates, and sustainable digital expansion.",
    icon: Rocket,
  },
];

function AboutUsPage() {
  return (
    <div className="min-h-screen  text-foreground pb-16">
      {/* 1. Modern Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 pt-32 pb-10 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 -z-30">
          <img
            src={AboutHero}
            alt="SecStackHQ Infrastructure"
            className="size-full object-cover object-center  dark:opacity-20"
          />
        </div>
        {/* <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background/90 via-background/70 to-background" /> */}

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
            {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <Award className="size-3.5" /> About SecStackHQ
            </div> */}

            <h1 className="font-['Sora'] text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.1]">
              Engineered for <span className="bg-gradient-to-r from-[#2f6bff] to-indigo-500 bg-clip-text text-transparent">Scale & Security</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We combine full-stack developers, ethical hackers, UI designers, and growth marketers under one roof to build digital products that perform and protect.
            </p>
          </motion.div>
          
        </div>
        
        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4 max-w-7xl mx-auto px-6 lg:px-12 mt-16 sm:mt-20">
          {stats.map((s) => (
            <MotionCard
              key={s.label}
              className="glass shadow-depth flex flex-col justify-center rounded-3xl p-6 text-center border border-border/60"
            >
              <div className="font-['Sora'] text-gradient text-3xl font-extrabold sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-muted-foreground mt-2 text-xs font-medium sm:text-sm">
                {s.label}
              </p>
            </MotionCard>
          ))}
        </StaggerContainer>
      </section>

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-6 pt-4 lg:px-12 space-y-28">


        {/* 2. Text & Image Split Section (Immediately After Hero & Stats) */}
        <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              Who We Are
            </div>
            <h2 className="font-['Sora'] text-3xl font-bold tracking-tight sm:text-4xl">
              One unified team to <GradientText>develop, secure</GradientText> and grow your brand.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Most web agencies hand off code that fails security reviews or design websites that look stunning but lack marketing conversion. SecStackHQ was founded to eliminate these gaps entirely.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Full-stack React & TypeScript engineering",
                "Offensive security audits & penetration testing",
                "Conversion-focused UI/UX design & brand scaling",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2f6bff]/15 text-[#2f6bff]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="SecStackHQ team collaborating on secure architecture"
              className="w-full h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2f6bff]">Multidisciplinary Expertise</span>
              <h3 className="text-lg font-bold text-foreground mt-1">Bridging the gap between code and cyber resilience</h3>
            </div>
          </div>
        </section>

        {/* 3. Process Section After Text & Image */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              Our Methodology
            </div>
            <h2 className="font-['Sora'] text-3xl font-bold tracking-tight sm:text-4xl">
              How We <GradientText>Execute Projects</GradientText>
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              A transparent, battle-tested 4-step pipeline ensuring your platform is engineered right the first time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="glass group relative rounded-3xl border border-border/80 p-6 transition-all hover:-translate-y-1 hover:border-[#2f6bff]/50 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2f6bff]/10 text-[#2f6bff]">
                        <Icon className="size-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-muted-foreground/40 group-hover:text-[#2f6bff] transition-colors">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-['Sora'] text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative rounded-3xl overflow-hidden border border-border/80 bg-slate-950 p-8 sm:p-12 shadow-2xl text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2f6bff]/20 via-indigo-500/10 to-purple-500/20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-white">
            <h3 className="font-['Sora'] text-3xl font-bold">Ready to build something secure and extraordinary?</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Let's connect with our engineers and discuss your next roadmap milestone.
            </p>
            <div>
              <Button asChild size="lg" className="bg-[#2f6bff] text-white hover:bg-[#2f6bff]/90 rounded-full px-8 py-6 text-base font-semibold">
                <Link to="/">
                  Start a Project <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}