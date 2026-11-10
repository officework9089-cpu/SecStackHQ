import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Command, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/common/Logo";
import { MagneticButton } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/site";
import { scrollToSection, useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils/calculator";

const ids = navLinks.map((l) => l.id);

export function Navbar({
  theme,
  onToggleTheme,
  onOpenCommand,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenCommand: () => void;
}) {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 lg:grid-cols-[auto_1fr_auto]",
            scrolled ? "glass shadow-depth" : "border border-transparent",
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="min-w-0"
            aria-label="SecStackHQ home"
          >
            <Logo />
          </a>

          <ul className="hidden items-center justify-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  aria-current={active === l.id ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active === l.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="bg-accent absolute inset-0 -z-10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenCommand}
              className="text-muted-foreground hover:bg-accent hover:text-foreground hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors md:flex"
              aria-label="Open quick navigation"
            >
              <Command className="size-3.5" /> K
            </button>
            <button
              onClick={onToggleTheme}
              className="hover:bg-accent grid size-10 place-items-center rounded-full transition-colors"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <MagneticButton className="hidden sm:inline-block">
              <Button variant="hero" size="lg" onClick={() => go("contact")}>
                Start a Project
              </Button>
            </MagneticButton>
            <button
              onClick={() => setOpen((o) => !o)}
              className="hover:bg-accent relative grid size-10 place-items-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="bg-foreground absolute left-0 top-0 h-0.5 w-5 rounded-full"
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="bg-foreground absolute left-0 top-1.5 h-0.5 w-5 rounded-full"
                  animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                />
                <motion.span
                  className="bg-foreground absolute left-0 top-3 h-0.5 w-5 rounded-full"
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-background/70 absolute inset-0 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass shadow-glow-lg relative mx-3 mt-24 rounded-3xl p-4"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-col"
              >
                {navLinks.map((l) => (
                  <motion.li
                    key={l.id}
                    variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(l.id);
                      }}
                      className={cn(
                        "font-display flex items-center justify-between rounded-2xl px-4 py-3.5 text-xl font-semibold",
                        active === l.id ? "bg-accent text-primary" : "hover:bg-accent",
                      )}
                    >
                      {l.label}
                      {active === l.id && <span className="bg-gradient-brand size-2 rounded-full" />}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <Button variant="hero" size="xl" className="mt-4 w-full" onClick={() => go("contact")}>
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
