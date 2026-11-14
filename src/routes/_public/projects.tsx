import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Github, Maximize2, Shield, Code, Palette, Globe } from "lucide-react";

import { projects, projectFilters, type Project } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils/calculator";
import AboutHero from "@/assets/Futuristic Blue Cybersecurity Abstract Background.png";

export const Route = createFileRoute("/_public/projects")({
  head: () => ({
    meta: [{ title: "All Projects & Case Studies — SecStackHQ" }],
  }),
  component: AllProjectsPage,
});

// Category-specific visual config for layout adaptation
const categoryMeta: Record<string, { icon: any; accentColor: string; description: string }> = {
  All: {
    icon: Globe,
    accentColor: "from-[#2f6bff] to-indigo-500",
    description: "Explore our full archive of web applications, security audits, and brand transformations.",
  },
  "Web Development": {
    icon: Code,
    accentColor: "from-blue-500 to-cyan-400",
    description: "High-performance full-stack web applications built for speed, scalability, and conversion.",
  },
  Cybersecurity: {
    icon: Shield,
    accentColor: "from-emerald-500 to-teal-400",
    description: "Penetration testing results, secure architecture implementations, and compliance portals.",
  },
  Branding: {
    icon: Palette,
    accentColor: "from-purple-500 to-pink-500",
    description: "Comprehensive visual identities, UI/UX systems, and high-impact digital storytelling.",
  },
};

function AllProjectsPage() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const activeMeta = categoryMeta[filter] || categoryMeta["All"];
  const ActiveIcon = activeMeta.icon;

  const filteredList = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen text-foreground pb-24">
      {/* Modern Hero Banner */}
      <section className="relative overflow-hidden border-b border-border/60 min-h-[75vh] pt-28 sm:pt-36 pb-16 sm:pb-24 flex flex-col justify-between">
        

        {/* Ambient Category-Reactive Glow Orb */}
        <motion.div
          key={filter}
          initial={{ opacity: 0.35, scale: 0.9 }}
          animate={{ opacity: 0.65, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-32 left-1/2 -z-10 h-90 w-170 -translate-x-1/2 rounded-full bg-linear-to-r opacity-20 blur-[120px]",
            activeMeta.accentColor
          )}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-12 w-full z-10">
          {/* Centered Hero Headline & Subtext */}
          <motion.div
            key={`hero-${filter}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase backdrop-blur-md">
              <ActiveIcon className="size-3.5" />
              {filter === "All" ? "Selected Case Studies" : `${filter} Archive`}
            </div>

            <h1 className="font-['Sora'] text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.1]">
              Engineering{" "}
              <span
                className={cn(
                  "bg-linear-to-r bg-clip-text text-transparent",
                  activeMeta.accentColor
                )}
              >
                Excellence
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {activeMeta.description}
            </p>
          </motion.div>

          {/* Floating Category Filter Dock */}
          <div className="mt-10 flex w-full justify-start px-4 pb-2 sm:justify-center sm:px-0">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="glass inline-flex flex-nowrap items-center gap-1.5 rounded-full border border-border/70 bg-card/70 p-1.5 shadow-lg backdrop-blur-xl whitespace-nowrap overflow-x-auto scrollbar-none [-ms-overflow-style:none]"
            >
              {projectFilters.map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "relative shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-category-pill"
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full bg-linear-to-r shadow-md",
                          categoryMeta[f]?.accentColor || "from-[#2f6bff] to-indigo-500"
                        )}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="mx-auto max-w-7xl px-6 pt-12 lg:px-12">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredList.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="border-glow glass shadow-depth group overflow-hidden rounded-3xl bg-card border border-border"
              >
                <button
                  onClick={() => setSelected(p)}
                  className="relative block aspect-16/10 w-full overflow-hidden text-left"
                  aria-label={`View details for ${p.title}`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1280}
                    height={832}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                      <Maximize2 className="size-4" /> View case study
                    </span>
                  </div>
                </button>
                <div className="flex flex-col gap-3 p-6">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase">{p.category}</span>
                  <h3 className="font-['Sora'] text-xl font-bold">{p.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredList.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </main>

      {/* Case Study Detail Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl p-0 sm:max-w-2xl bg-card border border-border">
          {selected && (
            <>
              <img
                src={selected.image}
                alt={selected.title}
                width={1280}
                height={832}
                className="aspect-video w-full object-cover"
              />
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">{selected.category}</span>
                <DialogTitle className="font-['Sora'] text-2xl font-bold sm:text-3xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed">{selected.details}</DialogDescription>
                <div className="flex flex-wrap gap-2">
                  {selected.stack.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full px-3 py-1">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Button size="lg" asChild className="bg-[#2f6bff] text-white hover:bg-[#2f6bff]/90">
                    <a href={selected.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4" /> Live demo
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={selected.github} target="_blank" rel="noreferrer">
                      <Github className="size-4" /> GitHub repository
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}