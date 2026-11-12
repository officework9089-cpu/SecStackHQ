import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowUpRight, ShieldCheck, Code2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";
import { PageSection } from "@/components/common/PageIntro";
import { ServiceGrid, ProjectGrid } from "@/components/common/PlatformGrids";
import { GenerativePreview } from "@/features/ai/GenerativePreview";
import { pageHead } from "@/lib/page-head";
import { brand } from "@/data/site";
import heroLight from "@/assets/Bg_Secstack.png";
import heroDark from "@/assets/Bd_Sectsack_dark.png";
const Scene = lazy(() => import("@/components/common/BrandScene"));
export const Route = createFileRoute("/")({ head: () => ({ ...pageHead("Technology, security & growth", "SecStackHQ connects development, cybersecurity and digital growth. Explore our AI Lab and plan your next project.", "/"), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: brand.name, slogan: brand.tagline, email: brand.email }) }] }), component: Home });
function Home() { return <>
  <section className="relative overflow-hidden border-b min-h-[540px] flex items-center">
    <img src={heroLight} alt="" width={1920} height={1080} className="absolute inset-0 size-full object-cover opacity-25 dark:hidden" /><img src={heroDark} alt="" width={1920} height={1080} className="absolute inset-0 size-full object-cover opacity-25 hidden dark:block" />
    <div className="absolute inset-0 bg-background/40" />
    <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-8 pt-16 pb-16 sm:pt-20 sm:pb-20">
      <FadeIn><div className="inline-flex items-center gap-2 text-xs font-bold text-primary border border-primary/20 bg-background/70 rounded-md px-3 py-2 mb-7"><span className="size-1.5 bg-success rounded-full" />A technology & security platform</div><h1 className="font-bold text-5xl sm:text-7xl lg:text-8xl leading-[1.1]">SecStack<span className="text-primary">HQ</span></h1><p className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold">Build. <span className="text-gradient">Secure.</span> Grow.</p><p className="mt-6 text-base sm:text-lg leading-8 max-w-xl text-muted-foreground">Your next idea deserves a stronger foundation.<br className="hidden sm:block" />Engineering, security and digital growth — connected.</p><div className="flex flex-wrap gap-3 mt-9"><Button asChild size="xl"><Link to="/ai-lab">Explore the AI Lab <ArrowUpRight /></Link></Button><Button asChild variant="outline" size="xl"><Link to="/contact">Start a project</Link></Button></div><p className="mt-8 text-xs font-semibold text-muted-foreground">DEVELOP • SECURE • GROW</p></FadeIn>
    </div>
  </section>
  <section className="border-b"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-6"><span className="text-xs text-muted-foreground">CONNECTED EXPERTISE</span>{[{ icon:Code2,title:"Thoughtful engineering" },{ icon:ShieldCheck,title:"Security by design" },{ icon:TrendingUp,title:"Growth with intent" }].map((p) => <span key={p.title} className="flex gap-2 items-center text-sm font-semibold"><p.icon className="size-4 text-primary" />{p.title}</span>)}</div></section>
  <PageSection><div className="grid gap-12 lg:grid-cols-2 items-center"><div><p className="text-xs font-bold text-primary mb-5">INTELLIGENCE, IN PRACTICE</p><h2 className="text-3xl sm:text-4xl font-bold leading-tight">From a question<br />to a clearer direction.</h2><p className="mt-6 text-muted-foreground leading-8 max-w-md">Explore a secure launch, shape your next product, or make sense of the possibilities. A useful first step, before the big decisions.</p><Button asChild variant="link" className="px-0 mt-6"><Link to="/ai-lab">Try the tools <ArrowUpRight /></Link></Button><ClientOnly fallback={<div className="h-56" />}><Suspense fallback={<div className="h-56" />}><Scene /></Suspense></ClientOnly></div><GenerativePreview /></div></PageSection>
  <section className="bg-surface border-y"><PageSection><div className="flex flex-col sm:flex-row justify-between gap-6 sm:items-end mb-10"><div><p className="text-xs text-primary font-bold mb-4">OUR EXPERTISE</p><h2 className="text-3xl sm:text-4xl font-bold">One partner. Six disciplines.</h2></div><Link to="/services" className="inline-flex items-center gap-2 text-primary text-sm font-semibold">All services <ArrowUpRight className="size-4" /></Link></div><ServiceGrid compact /></PageSection></section>
  <PageSection><div className="flex flex-col sm:flex-row justify-between gap-6 sm:items-end mb-10"><div><p className="text-xs text-primary font-bold mb-4">THE POSSIBILITIES</p><h2 className="text-3xl sm:text-4xl font-bold">Ideas brought to life.</h2><p className="text-sm text-muted-foreground mt-4">Illustrative case studies · sample outcomes</p></div><Link to="/projects" className="text-primary inline-flex gap-2 items-center text-sm font-semibold">Explore projects <ArrowUpRight className="size-4" /></Link></div><ProjectGrid limit={3} /></PageSection>
  <section className="bg-primary text-primary-foreground"><PageSection><div className="flex flex-col md:flex-row md:items-center justify-between gap-8"><div><p className="text-xs font-bold mb-5">YOUR NEXT CHAPTER</p><h2 className="text-3xl sm:text-4xl font-bold">Let's build something<br />worth believing in.</h2></div><Button asChild variant="secondary" size="xl"><Link to="/contact">Start a conversation <ArrowUpRight /></Link></Button></div></PageSection></section>
</>; }
