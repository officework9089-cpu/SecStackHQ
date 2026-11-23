import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_protected")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({ to: "/admin/login" });
    }

    return { user: session.user };
  },
  component: AdminLayout,
});

const navItems = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban, exact: false },
  { label: "Contacts", to: "/admin/contacts", icon: MessageSquare, exact: false },
  { label: "Settings", to: "/admin/settings", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Redirect immediately if the session expires or user signs out in another tab
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate({ to: "/admin/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setSigningOut(true);
    const { error } = await supabase.auth.signOut();
    setSigningOut(false);

    if (error) {
      toast.error(error.message || "Failed to sign out");
      return;
    }

    toast.info("Signed out of admin panel");
    navigate({ to: "/admin/login" });
  };

  const userEmail = user.email ?? "admin@secstackhq.com";
  const initials = userEmail.slice(0, 2).toUpperCase();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2f6bff] text-white">
              <Shield className="h-4 w-4" />
            </div>
            <span className="font-['Sora'] text-base font-bold tracking-tight">
              SecStack<span className="text-[#2f6bff]">HQ</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className: "!bg-[#2f6bff]/10 !text-[#2f6bff] font-semibold",
                }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-border p-4">
          <Link
            to="/"
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <span>View Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            disabled={signingOut}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{userEmail}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2f6bff]/15 text-xs font-bold text-[#2f6bff]">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}