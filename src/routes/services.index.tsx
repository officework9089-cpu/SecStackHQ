import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageSection } from "@/components/common/PageIntro";
import { ServiceGrid } from "@/components/common/PlatformGrids";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/services/")({ head: () => pageHead("Services", "Explore six connected SecStackHQ disciplines: development, cybersecurity, branding, SEO, digital and social marketing.", "/services"), component: ServicesPage });
function ServicesPage() { return <><PageIntro eyebrow="Six disciplines. One direction." title="Expertise that works together." description="Build the right foundations, secure every layer, and connect your business with the people who matter." /><PageSection><ServiceGrid /></PageSection></>; }