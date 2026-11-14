import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import {
  Command,
  ComputerIcon,
  Moon,
  Sun,
} from "lucide-react";
import {
  ThemeToggler,
  type Resolved,
  type ThemeSelection,
} from "@animate-ui/react/primitives/effects/theme-toggler";
import { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { Logo } from "@/components/common/Logo";
import { MagneticButton } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/calculator";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const pageNavLinks = [
  { id: "home", label: "Home", to: "/" },
  { id: "about", label: "About", to: "/about" },
  { id: "projects", label: "Projects", to: "/projects" },
  { id: "services", label: "Services", to: "/services" },
  { id: "contact", label: "Contact", to: "/contact" },
];

export function Navbar({
  theme,
  onToggleTheme,
  onOpenCommand,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenCommand: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const NEXT: Record<ThemeSelection, ThemeSelection> = {
    light: "system",
    system: "dark",
    dark: "light",
  };

  const ICONS = {
    light: Sun,
    dark: Moon,
    system: ComputerIcon,
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="sm:fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 lg:grid-cols-[auto_1fr_auto]",
            scrolled ? "glass shadow-depth" : "border border-transparent",
          )}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="min-w-0 text-left cursor-pointer bg-transparent border-none p-0"
            aria-label="SecStackHQ home"
          >
            <Logo />
          </button>

          {/* Desktop Navigation - Pages Only */}
          <ul className="hidden items-center justify-center gap-1 lg:flex">
            {pageNavLinks.map((l) => {
              const isActive =
                location.pathname === l.to ||
                (l.to === "/" && location.pathname === "/_public/");

              return (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => navigate({ to: l.to })}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="bg-accent absolute inset-0 -z-10 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {l.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex shrink-0 items-center justify-end gap-2">
            {/* Desktop Command Button */}
            <button
              type="button"
              onClick={onOpenCommand}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex cursor-pointer"
              aria-label="Open quick navigation"
            >
              <Command className="size-3.5" />
              K
            </button>

            {/* Theme Toggle */}
            <ThemeToggler
              theme={theme as ThemeSelection}
              resolvedTheme={theme as Resolved}
              setTheme={(nextTheme) => {
                if (nextTheme !== theme) {
                  onToggleTheme();
                }
              }}
            >
              {({ effective, toggleTheme }) => (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full cursor-pointer"
                  aria-label={`Theme: ${effective}. Switch to ${NEXT[effective]}`}
                  onClick={() => toggleTheme(NEXT[effective])}
                >
                  {(() => {
                    const Icon = ICONS[effective];
                    return <Icon size={20} strokeWidth={2} />;
                  })()}
                </Button>
              )}
            </ThemeToggler>

            {/* Desktop CTA */}
            <MagneticButton className="hidden sm:inline-block">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate({ to: "/contact" })}
              >
                Start a Project
              </Button>
            </MagneticButton>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  );
}