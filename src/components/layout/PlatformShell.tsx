import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { lazy, Suspense, useEffect } from "react";
import { Menu, Moon, Sun, Command, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgress } from "@/components/motion";
import { pageLinks, services, serviceSlugs } from "@/data/platform";
import { brand } from "@/data/site";
import { usePlatform } from "@/store/platform";
import { useState, type ReactNode } from "react";

const Assistant = lazy(() => import("@/features/ai/Assistant"));
const Palette = lazy(() => import("@/features/ai/CommandPalette"));

export function PlatformShell({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (s) => s.pathname });
  const theme = usePlatform((s) => s.theme);
  const setTheme = usePlatform((s) => s.setTheme);
  const setCommandOpen = usePlatform((s) => s.setCommandOpen);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("secstackhq-theme");
    if (stored === "light" || stored === "dark" || stored === "system") setTheme(stored);
  }, [setTheme]);
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && query.matches));
    apply(); query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [theme]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); usePlatform.getState().setCommandOpen(!usePlatform.getState().commandOpen); } };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, []);
  return <MotionConfig reducedMotion="user"><TooltipProvider>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[100] bg-primary text-primary-foreground p-3 rounded-md">Skip to content</a>
    <ScrollProgress />
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-1 px-3 sm:gap-4 sm:px-8">
        <Link to="/" aria-label="SecStackHQ home" className="min-w-0"><Logo className="gap-1.5 sm:gap-2.5" /></Link>
        <div className="hidden lg:flex items-center gap-6">{pageLinks.filter((p) => p.to !== "/contact").map((p) => <Link key={p.to} to={p.to} activeOptions={{ exact: p.to === "/" }} className="text-sm font-semibold text-muted-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>{p.label}{p.to === "/ai-lab" && <span className="ml-1.5 inline-block size-1.5 rounded-full bg-success" />}</Link>)}</div>
        <div className="flex shrink-0 gap-0 sm:gap-1.5 items-center">
          <Button variant="ghost" size="icon-sm" aria-label="Open command palette" title="Quick navigation" onClick={() => setCommandOpen(true)}><Command /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle theme" title="Toggle light/dark theme" onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
          <Button asChild className="hidden sm:inline-flex h-11"><Link to="/contact">Let's talk <ArrowUpRight /></Link></Button>
          <Sheet open={drawer} onOpenChange={setDrawer}><SheetTrigger asChild><Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger><SheetContent><SheetTitle className="mb-8">SecStackHQ</SheetTitle><div className="flex flex-col gap-2">{pageLinks.map((p) => <Link key={p.to} to={p.to} onClick={() => setDrawer(false)} className="p-3 text-lg font-semibold hover:bg-accent rounded-md">{p.label}</Link>)}</div></SheetContent></Sheet>
        </div>
      </nav>
    </header>
    <AnimatePresence mode="wait" initial={false}><motion.main key={pathname} id="main" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="min-h-[60vh] overflow-x-clip">{children}</motion.main></AnimatePresence>
    <footer className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div><Logo /><p className="mt-5 text-xs font-bold text-primary">{brand.tagline}</p><p className="mt-4 text-sm leading-7 text-muted-foreground max-w-xs">Technology with purpose.<br />Security by design. Growth with intent.</p><div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-success" /> Built with a security-first mindset</div></div>
        <div><h3 className="text-sm mb-4 font-bold">Explore</h3><ul className="space-y-3">{pageLinks.map((p) => <li key={p.to}><Link className="text-sm text-muted-foreground hover:text-primary" to={p.to}>{p.label}</Link></li>)}</ul></div>
        <div><h3 className="text-sm mb-4 font-bold">Expertise</h3><ul className="space-y-3">{services.map((s) => <li key={s.id}><Link to="/services/$slug" params={{ slug: serviceSlugs[s.id] ?? s.id }} className="text-sm text-muted-foreground hover:text-primary">{s.short}</Link></li>)}</ul></div>
        <div><h3 className="text-sm mb-4 font-bold">Start a conversation</h3><a className="text-sm text-primary break-all" href={`mailto:${brand.email}`}>{brand.email}</a><p className="mt-4 text-sm text-muted-foreground">{brand.location}</p><a href={`https://wa.me/${brand.whatsapp}`} className="mt-4 inline-flex text-sm items-center gap-2 text-primary" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight className="size-4" /></a></div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 border-t flex flex-wrap gap-4 justify-between text-xs text-muted-foreground"><span>© 2026 SecStackHQ</span><span>DEVELOP • SECURE • GROW</span></div>
    </footer>
    <Suspense fallback={null}><Assistant /><Palette /></Suspense>
  </TooltipProvider></MotionConfig>;
}