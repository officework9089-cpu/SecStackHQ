import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/projects")({
  head: () => ({ meta: [{ title: "Manage Projects — SecStackHQ" }] }),
  component: ProjectsAdminPage,
});

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  status: "Published" | "Draft";
}

const initialProjects: ProjectItem[] = [
  { id: "1", title: "FinVault Security Portal", category: "Cybersecurity", client: "FinVault", status: "Published" },
  { id: "2", title: "CloudScale SaaS Platform", category: "Web Development", client: "CloudScale", status: "Published" },
  { id: "3", title: "Aether Brand Identity", category: "Branding & SEO", client: "Aether Labs", status: "Draft" },
];

function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setProjects([
      {
        id: crypto.randomUUID(),
        title,
        category,
        client: "New Client",
        status: "Published",
      },
      ...projects,
    ]);
    setTitle("");
    toast.success("Project added to portfolio");
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.success("Project removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Sora'] text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Add, update, or remove case studies displayed on your landing page.
        </p>
      </div>

      {/* Quick Add Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title..."
          className="flex-1 rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
        >
          <option>Web Development</option>
          <option>Cybersecurity</option>
          <option>Branding & SEO</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2f6bff] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f6bff]/90"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-6 py-3.5">Project</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{project.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{project.category}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-[#2f6bff]/10 px-2.5 py-0.5 text-xs font-medium text-[#2f6bff]">
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="rounded-md p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                    title="Delete project"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}