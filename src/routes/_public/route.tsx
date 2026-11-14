import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useState } from "react";

import { CommandMenu } from "@/components/layout/CommandMenu";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition, ScrollProgress } from "@/components/motion";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
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
      <Navbar
        theme={theme}
        onToggleTheme={toggle}
        onOpenCommand={() => setCmdOpen(true)}
      />
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
      <PageTransition>
        <main id="main" className="overflow-x-clip">
          {/* Child pages (/, /projects, etc.) render here */}
          <Outlet />
        </main>
        <Footer />
      </PageTransition>
    </MotionConfig>
  );
}