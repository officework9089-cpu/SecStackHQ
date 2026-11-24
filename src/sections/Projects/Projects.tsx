import { motion } from "motion/react";
import { ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import AboutHero from "@/assets/Futuristic Blue Cybersecurity Abstract Background.png";

interface FeaturedProject {
  id: string;
  title: string;
  image: string;
  demo: string;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function LiveProjectColumn({ project }: { project: FeaturedProject }) {
  const [activePreview, setActivePreview] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  const hasValidDemo =
    Boolean(project.demo) &&
    project.demo.startsWith("http") &&
    !project.demo.includes("github.com");

  return (
    <motion.a
      href={project.demo || "#"}
      target={project.demo ? "_blank" : undefined}
      rel={project.demo ? "noreferrer" : undefined}
      aria-label={`Open ${project.title}`}
      onPointerEnter={() => setActivePreview(true)}
      onPointerLeave={() => setActivePreview(false)}
      onPointerDown={() => setActivePreview(true)}
      onPointerUp={() => setActivePreview(false)}
      onPointerCancel={() => setActivePreview(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-glow glass shadow-depth group relative block h-[290px] w-full overflow-hidden rounded-2xl bg-card sm:h-[360px] md:h-[400px] lg:h-[460px] lg:rounded-3xl"
    >
      {/* Fallback / Background Cover Image (hero framed at top by default) */}
      <img
        src={project.image || AboutHero}
        alt={project.title}
        loading="lazy"
        className={`absolute inset-0 size-full object-cover object-top transition-transform duration-[4500ms] ease-in-out ${
          activePreview
            ? "-translate-y-[18%] scale-[1.03]"
            : "translate-y-0 scale-100"
        } ${
          hasValidDemo && iframeLoaded && !iframeFailed
            ? "opacity-0"
            : "opacity-100"
        }`}
      />

      {/* Live Scaled Real Homepage Preview */}
      {hasValidDemo && !iframeFailed && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="origin-top-left transition-transform duration-[5500ms] ease-in-out"
            style={{
              width: "250%",
              height: "520%",
              transform: activePreview
                ? "scale(0.4) translateY(-38%)"
                : "scale(0.4) translateY(0%)",
            }}
          >
            <iframe
              src={project.demo}
              title={project.title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeFailed(true)}
              className={`size-full border-0 bg-white transition-opacity duration-500 ${
                iframeLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      )}

      {/* Subtle top-right external link indicator */}
      <div className="pointer-events-none absolute top-2.5 right-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-black/65 text-white opacity-90 backdrop-blur-md transition-all duration-300 sm:top-3.5 sm:right-3.5 sm:size-9 sm:opacity-0 sm:group-hover:opacity-100">
        <ExternalLink className="size-3.5 sm:size-4" />
      </div>
    </motion.a>
  );
}

export function Projects() {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadFeaturedProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, image, demo")
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
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end lg:mb-10">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Projects that <GradientText>move the needle</GradientText>
            </>
          }
          description="A snapshot of what we've built, secured, and grown for clients across industries."
        />
        <Button
          variant="glass"
          size="lg"
          asChild
          className="w-full justify-center sm:mb-4 sm:w-auto sm:justify-start"
        >
          <Link to="/projects">
            View all projects <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground sm:py-14 sm:text-base">
          <Loader2 className="size-4 animate-spin sm:size-5" />
          <span>Loading live previews...</span>
        </div>
      ) : featuredProjects.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground sm:py-12 sm:text-base">
          No published projects available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {featuredProjects.map((project) => (
            <LiveProjectColumn key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
}