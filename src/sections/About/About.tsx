import { Compass, Eye, Target } from "lucide-react";

import { Counter } from "@/components/common/Counter";
import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText, MotionCard, SlideIn, StaggerContainer, TiltCard } from "@/components/motion";
import { stats } from "@/data/site";

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
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s) => (
              <MotionCard key={s.label} className="glass shadow-depth rounded-2xl p-5 sm:p-6">
                <div className="font-display text-gradient text-3xl font-extrabold sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-muted-foreground mt-1 text-sm font-medium">{s.label}</p>
              </MotionCard>
            ))}
          </StaggerContainer>
        </div>

        <div className="flex flex-col gap-4 lg:pt-16">
          {pillars.map((p, i) => (
            <SlideIn key={p.title} direction="left" delay={i * 0.12}>
              <TiltCard max={6} className="border-glow glass shadow-depth rounded-3xl">
                <div className="flex gap-5 p-6 sm:p-8">
                  <span className="bg-gradient-brand text-primary-foreground shadow-glow grid size-12 shrink-0 place-items-center rounded-2xl">
                    <p.icon className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="text-muted-foreground mt-2">{p.text}</p>
                  </div>
                </div>
              </TiltCard>
            </SlideIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
