import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — SecStackHQ" }] }),
  component: SettingsAdminPage,
});

function SettingsAdminPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Agency settings saved");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-['Sora'] text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure contact routing and agency metadata.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-border bg-card p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Public Contact Email</label>
          <input
            type="email"
            defaultValue="hello@secstackhq.com"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Agency Tagline</label>
          <input
            type="text"
            defaultValue="Develop. Secure. Grow."
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-[#2f6bff]"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-[#2f6bff] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f6bff]/90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}