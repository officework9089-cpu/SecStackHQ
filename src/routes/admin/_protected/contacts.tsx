import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_protected/contacts")({
  head: () => ({ meta: [{ title: "Contact Submissions — SecStackHQ" }] }),
  component: ContactsAdminPage,
});

interface ContactRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  service: string;
  message: string;
  complexity: string;
  estimated_cost: number | null;
  estimated_timeline_weeks: number | null;
  replied: boolean;
}

function ContactsAdminPage() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadContacts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        toast.error(error.message || "Failed to load contact submissions");
      } else {
        setContacts(data ?? []);
      }
      setLoading(false);
    }

    loadContacts();
    return () => {
      active = false;
    };
  }, []);

  const toggleReplied = async (contact: ContactRecord) => {
    const nextReplied = !contact.replied;
    setUpdatingId(contact.id);

    // Optimistic update
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, replied: nextReplied } : c))
    );

    const { error } = await supabase
      .from("contacts")
      .update({ replied: nextReplied })
      .eq("id", contact.id);

    setUpdatingId(null);

    if (error) {
      // Revert on failure
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, replied: contact.replied } : c))
      );
      toast.error(error.message || "Could not update status");
      return;
    }

    toast.success(nextReplied ? "Marked as replied" : "Marked as unread");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Sora'] text-2xl font-bold tracking-tight">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          Review and respond to submissions from your website contact form.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading submissions...
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No contact submissions yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-semibold">{contact.name}</h3>
                  {contact.company && (
                    <span className="text-xs text-muted-foreground">• {contact.company}</span>
                  )}
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                    {contact.service}
                  </span>
                  {contact.estimated_cost != null && (
                    <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                      Est. ${Number(contact.estimated_cost).toLocaleString()}
                      {contact.estimated_timeline_weeks ? ` · ~${contact.estimated_timeline_weeks}w` : ""}
                    </span>
                  )}
                  {contact.replied && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Replied
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {contact.email} {contact.subject ? `— ${contact.subject}` : ""}
                </p>
                <p className="pt-1 text-sm text-foreground/90">{contact.message}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(
                    `Re: ${contact.subject || contact.service} — SecStackHQ`
                  )}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f6bff] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#2f6bff]/90"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Reply
                </a>
                <button
                  type="button"
                  disabled={updatingId === contact.id}
                  onClick={() => toggleReplied(contact)}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent disabled:opacity-50"
                >
                  {contact.replied ? "Mark Unread" : "Mark Replied"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}