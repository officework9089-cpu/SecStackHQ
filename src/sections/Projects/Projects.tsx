import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { useState } from "react";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projectFilters, projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Projects that <GradientText>move the needle</GradientText>
          </>
        }
        description="A snapshot of what we've built, secured and grown for clients across industries."
      />

      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-2">
        {projectFilters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              filter === f ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground",
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="bg-gradient-brand shadow-glow absolute inset-0 -z-10 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-glow glass shadow-depth group overflow-hidden rounded-3xl"
            >
              <button
                onClick={() => setSelected(p)}
                className="relative block aspect-[16/10] w-full overflow-hidden text-left"
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
                <div className="from-brand-navy/85 via-brand-navy/30 absolute inset-0 flex items-end bg-gradient-to-t to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="bg-tile text-brand-navy flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
                    <Maximize2 className="size-4" /> View case study
                  </span>
                </div>
              </button>
              <div className="flex flex-col gap-3 p-6">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">{p.category}</span>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl p-0 sm:max-w-2xl">
          {selected && (
            <>
              <img
                src={selected.image}
                alt={selected.title}
                width={1280}
                height={832}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">{selected.category}</span>
                <DialogTitle className="font-display text-2xl font-bold sm:text-3xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">{selected.details}</DialogDescription>
                <div className="flex flex-wrap gap-2">
                  {selected.stack.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full px-3 py-1">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button variant="hero" size="xl" asChild>
                    <a href={selected.demo} target="_blank" rel="noreferrer">
                      <ExternalLink /> Live demo
                    </a>
                  </Button>
                  <Button variant="glass" size="xl" asChild>
                    <a href={selected.github} target="_blank" rel="noreferrer">
                      <Github /> GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
