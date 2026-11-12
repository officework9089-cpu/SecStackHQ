import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Moon, ShieldCheck } from "lucide-react";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { pageLinks, services, serviceSlugs } from "@/data/platform";
import { usePlatform } from "@/store/platform";
import { useState } from "react";
export default function CommandPalette() {
  const state = usePlatform(); const navigate = useNavigate(); const [query, setQuery] = useState("");
  const close = () => state.setCommandOpen(false);
  const intent = () => { close(); if (/secur|pentest/i.test(query) && /project|case|show/i.test(query)) void navigate({ to: "/projects", search: { filter: "security" } }); else state.ask(query); };
  return <CommandDialog open={state.commandOpen} onOpenChange={state.setCommandOpen}><CommandInput value={query} onValueChange={setQuery} placeholder="Search pages, services, or ask a question…" /><CommandList><CommandEmpty><span className="text-muted-foreground">No matching pages.</span></CommandEmpty>{query.length > 2 && <CommandGroup heading="Natural language"><CommandItem value={query} onSelect={intent}><ShieldCheck />{query}</CommandItem></CommandGroup>}<CommandGroup heading="Explore">{pageLinks.map((p) => <CommandItem key={p.to} onSelect={() => { close(); void navigate({ to: p.to }); }}><ArrowUpRight />{p.label}</CommandItem>)}</CommandGroup><CommandGroup heading="Services">{services.map((s) => <CommandItem key={s.id} onSelect={() => { close(); void navigate({ to: "/services/$slug", params: { slug: serviceSlugs[s.id] ?? s.id } }); }}><s.icon />{s.title}</CommandItem>)}</CommandGroup><CommandGroup heading="Actions"><CommandItem onSelect={() => { state.setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark"); close(); }}><Moon />Toggle theme</CommandItem><CommandItem onSelect={() => state.ask("Explain pentesting like I'm a founder")}><ShieldCheck />Explain pentesting like I'm a founder</CommandItem></CommandGroup></CommandList></CommandDialog>;
}