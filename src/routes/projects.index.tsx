import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { PageIntro, PageSection } from "@/components/common/PageIntro";
import { ProjectGrid } from "@/components/common/PlatformGrids";
import { pageHead } from "@/lib/page-head";
import { Badge } from "@/components/ui/badge";
const filterSchema = z.object({ filter: z.enum(["all","web","security","branding","marketing"]).catch("all").default("all") });
export const Route = createFileRoute("/projects/")({ validateSearch: zodValidator(filterSchema), head: () => pageHead("Projects", "Explore illustrative SecStackHQ case studies across engineering, security, branding and marketing.", "/projects"), component: ProjectsPage });
function ProjectsPage() { const { filter } = Route.useSearch(); return <><PageIntro eyebrow="Selected possibilities" title="Built. Secured. Grown." description="A portfolio of illustrative projects, showing how connected expertise can turn a challenge into a considered solution."><Badge variant="outline">Sample portfolio · outcomes not verified client results</Badge></PageIntro><PageSection><div className="flex flex-wrap gap-3 mb-10" aria-label="Project filters">{["all","web","security","branding","marketing"].map((f) => <Link key={f} to="/projects" search={{ filter: f as "all" | "web" | "security" | "branding" | "marketing" }} aria-current={filter === f ? "page" : undefined} className={`px-5 min-h-11 py-3 border rounded-md capitalize text-sm font-semibold ${filter === f ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground hover:bg-accent"}`}>{f}</Link>)}</div><ProjectGrid filter={filter} /></PageSection></>; }