import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useState } from "react";

import { CommandMenu } from "@/components/layout/CommandMenu";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition, ScrollProgress } from "@/components/motion";
import { useTheme } from "@/hooks/use-theme";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";
import { Hero } from "@/sections/Hero/Hero";
import { Process } from "@/sections/Process/Process";
import { Projects } from "@/sections/Projects/Projects";
import { Services } from "@/sections/Services/Services";
import { Testimonials } from "@/sections/Testimonials/Testimonials";
import { WhyUs } from "@/sections/WhyUs/WhyUs";

const title = "SecStackHQ — Web Development, Cybersecurity & Digital Growth";
const description =
  "SecStackHQ builds fast websites, runs penetration tests, designs brands and grows businesses with SEO and social media. Develop. Secure. Grow.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SecStackHQ",
          slogan: "Develop. Secure. Grow.",
          email: "hello@secstackhq.com",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme, toggle } = useTheme();
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only z-[80] rounded-full px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      {/* <CustomCursor /> */}
      <Navbar theme={theme} onToggleTheme={toggle} onOpenCommand={() => setCmdOpen(true)} />
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
      <PageTransition>
        <main id="main" className="overflow-x-clip">
          <Hero />
          <About />
          <Projects />
          <Services />
          <WhyUs />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </MotionConfig>
  );
}
