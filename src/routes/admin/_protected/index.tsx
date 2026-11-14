import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderKanban, MessageSquare, ShieldAlert, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/")({
  head: () => ({ meta: [{ title: "Dashboard Overview — SecStackHQ" }] }),
  component: OverviewPage,
});

const stats = [
  { label: "Active Projects", value: "14", change: "+3 this month", icon: FolderKanban },
  { label: "New Inquiries", value: "28", change: "6 unread", icon: MessageSquare },
  { label: "Security Audits", value: "9", change: "2 in progress", icon: ShieldAlert },
  { label: "Monthly Growth", value: "+34%", change: "Organic & SEO", icon: TrendingUp },
];

function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-['Sora'] text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Monitor agency performance, active client builds, and inbound leads.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <div className="rounded-lg bg-[#2f6bff]/10 p-2 text-[#2f6bff]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-['Sora'] text-base font-semibold">Recent Inquiries</h2>
            <Link to="/admin/contacts" className="text-xs font-medium text-[#2f6bff] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border text-sm">
            {[
              { name: "Alex Rivera", service: "Penetration Testing", time: "2h ago" },
              { name: "NovaPay Ltd", service: "Full-Stack Web App", time: "5h ago" },
              { name: "KiteWorks", service: "SEO & Brand Identity", time: "1d ago" },
            ].map((lead) => (
              <div key={lead.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.service}</p>
                </div>
                <span className="text-xs text-muted-foreground">{lead.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-['Sora'] text-base font-semibold">Portfolio Projects</h2>
            <Link to="/admin/projects" className="text-xs font-medium text-[#2f6bff] hover:underline">
              Manage
            </Link>
          </div>
          <div className="divide-y divide-border text-sm">
            {[
              { title: "FinVault Security Portal", category: "Cybersecurity", status: "Published" },
              { title: "CloudScale SaaS Platform", category: "Web Dev", status: "Published" },
              { title: "Aether Brand Overhaul", category: "Branding", status: "Draft" },
            ].map((proj) => (
              <div key={proj.title} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{proj.title}</p>
                  <p className="text-xs text-muted-foreground">{proj.category}</p>
                </div>
                <span className="rounded-full bg-[#2f6bff]/10 px-2.5 py-0.5 text-xs font-medium text-[#2f6bff]">
                  {proj.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}