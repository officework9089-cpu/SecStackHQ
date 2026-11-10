import { Compass, Eye, ShieldCheck, Target } from "lucide-react";

import { Counter } from "@/components/common/Counter";
import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText, MotionCard, SlideIn, StaggerContainer, TiltCard } from "@/components/motion";
import { stats } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import AboutUs from "@/assets/project-security.jpg"

const pillars = [
  {
    icon: Compass,
    title: "Our philosophy",
    text: "Great digital products sit at the intersection of engineering, security and design. We never treat them separately.",
  },
  {
    icon: Target,
    title: "Our mission",
    text: "To help ambitious businesses launch faster, stay protected, and grow with technology they can trust.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "A web where every brand — from startup to enterprise — has world-class, secure digital infrastructure.",
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About SecStackHQ"
            title={
              <>
                One team to <GradientText>develop, secure</GradientText> and grow your brand.
              </>
            }
            description="SecStackHQ is a technology and digital growth studio. We combine full-stack developers, ethical hackers, designers and marketers under one roof — so your website is beautiful, bulletproof and built to perform."
            className="mb-10 md:mb-12"
          />
          
        </div>

        <div className="items-stretch mb-20">
          {/* Visual Showcase (7 cols) */}
          <div className="">
            <FadeIn direction="right" className="h-full">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl h-full group bg-slate-950">
                <img
                  src={AboutUs}
                  alt="SecStackHQ Cyber Architecture and Cloud Engineering Facility"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                    Defensive Node Architecture
                  </div>
                  <h3 className="text-xl font-bold">Impenetrable Zero-Trust Web Systems</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    Every web application built by our team undergoes simulated attack vectors before deployment.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
      
        <StaggerContainer className="grid grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <MotionCard key={s.label} className="glass shadow-depth rounded-2xl p-5 sm:p-6">
                <div className="font-display text-gradient text-3xl font-extrabold sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-muted-foreground mt-1 text-sm font-medium">{s.label}</p>
              </MotionCard>
            ))}
          </StaggerContainer>
    </Section>
  );
}
