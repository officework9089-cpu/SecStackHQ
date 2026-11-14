import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_protected/contacts")({
  head: () => ({ meta: [{ title: "Contact Submissions — SecStackHQ" }] }),
  component: ContactsAdminPage,
});

const initialContacts = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@fintech.io",
    service: "Penetration Testing",
    message: "Looking for an external web app pen-test before our Series A audit.",
    replied: false,
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    email: "sarah@novapay.com",
    service: "Web Development",
    message: "Need a high-converting marketing site built in React with fast Lighthouse scores.",
    replied: true,
  },
];

function ContactsAdminPage() {
  const [contacts, setContacts] = useState(initialContacts);

  const toggleReplied = (id: string) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, replied: !c.replied } : c))
    );
    toast.success("Status updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Sora'] text-2xl font-bold tracking-tight">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          Review and respond to submissions from your website contact form.
        </p>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="font-semibold">{contact.name}</h3>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                  {contact.service}
                </span>
                {contact.replied && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Replied
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{contact.email}</p>
              <p className="pt-1 text-sm text-foreground/90">{contact.message}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`mailto:${contact.email}?subject=Re: ${contact.service} Inquiry — SecStackHQ`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f6bff] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#2f6bff]/90"
              >
                <Mail className="h-3.5 w-3.5" />
                Reply
              </a>
              <button
                onClick={() => toggleReplied(contact.id)}
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent"
              >
                {contact.replied ? "Mark Unread" : "Mark Replied"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}