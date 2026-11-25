import { motion } from "motion/react";
import { ExternalLink, Github, Maximize2, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import AboutHero from "@/assets/Futuristic Blue Cybersecurity Abstract Background.png";

interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  image: string;
  stack: string[];
  demo: string;
  github: string;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Projects() {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    let active = true;

    async function loadFeaturedProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, category, summary, details, image, stack, demo, github")
        .eq("status", "Published");

      if (!active) return;

      if (!error && data) {
        const shuffled = shuffleArray(data as FeaturedProject[]);
        setFeaturedProjects(shuffled.slice(0, 3));
      }
      setLoading(false);
    }

    loadFeaturedProjects();
    return () => {
      active = false;
    };
  }, []);

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

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-14 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span>Loading featured projects...</span>
        </div>
      ) : featuredProjects.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No published projects available yet.
        </div>
      ) : (
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
                  src={p.image || AboutHero}
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
                <span className="text-primary text-xs font-bold tracking-widest uppercase">
                  {p.category}
                </span>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.summary}</p>
                {p.stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto rounded-3xl p-0 sm:max-w-2xl">
          {selected && (
            <>
              <img
                src={selected.image || AboutHero}
                alt={selected.title}
                width={1280}
                height={832}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">
                  {selected.category}
                </span>
                <DialogTitle className="font-display text-2xl font-bold sm:text-3xl">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base whitespace-pre-line">
                  {selected.details}
                </DialogDescription>
                {selected.stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full px-3 py-1">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
                {(selected.demo || selected.github) && (
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    {selected.demo && (
                      <Button variant="hero" size="xl" asChild>
                        <a href={selected.demo} target="_blank" rel="noreferrer">
                          <ExternalLink /> Live demo
                        </a>
                      </Button>
                    )}
                    {selected.github && (
                      <Button variant="glass" size="xl" asChild>
                        <a href={selected.github} target="_blank" rel="noreferrer">
                          <Github /> GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}