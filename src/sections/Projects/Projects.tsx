import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, Maximize2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils/calculator";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  
  // Show only top 3 main featured projects on the homepage
  const featuredProjects = projects.slice(0, 3);

  return (
    <Section id="projects">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-10">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Projects that <GradientText>move the needle</GradientText>
            </>
          }
          description="A snapshot of what we've built, secured, and grown for clients across industries."
        />
        <Button variant="glass" size="lg" asChild className="mb-4">
          <Link to="/projects">
            View all projects <ArrowRight className="size-4 ml-1" />
          </Link>
        </Button>
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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