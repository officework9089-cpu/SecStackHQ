import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { adminAuth } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: () => {
    if (adminAuth.isAuthenticated()) {
      throw redirect({ to: "/admin" });
    }
  },
  head: () => ({
    meta: [{ title: "Admin Login — SecStackHQ" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@secstackhq.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = adminAuth.login(email, password);
      setLoading(false);

      if (success) {
        toast.success("Welcome back, Admin");
        navigate({ to: "/admin" });
      } else {
        toast.error("Invalid credentials. Try admin@secstackhq.com / admin123");
      }
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2f6bff]/10 text-[#2f6bff]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-['Sora'] text-2xl font-bold tracking-tight text-foreground">
            SecStackHQ Admin
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to manage projects, leads, and site content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@secstackhq.com"
                className="w-full rounded-lg border border-input bg-background py-2.5 pr-4 pl-10 text-sm text-foreground outline-none transition focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-background py-2.5 pr-10 pl-10 text-sm text-foreground outline-none transition focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2f6bff] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f6bff]/90 disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Sign In"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
}