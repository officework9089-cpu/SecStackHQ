import { useEffect } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { brand, navLinks, services } from "@/data/site";
import { scrollToSection } from "@/hooks/use-active-section";

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const run = (fn: () => void) => {
    onOpenChange(false);
    setTimeout(fn, 50);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to a section or service…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sections">
          {navLinks.map((l) => (
            <CommandItem key={l.id} onSelect={() => run(() => scrollToSection(l.id))}>
              <ArrowRight /> {l.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Services">
          {services.map((s) => (
            <CommandItem key={s.id} onSelect={() => run(() => scrollToSection("services"))}>
              <s.icon /> {s.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Contact">
          <CommandItem onSelect={() => run(() => window.open(`mailto:${brand.email}`))}>
            <Mail /> Email us
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open(`https://wa.me/${brand.whatsapp}`, "_blank"))}>
            <MessageCircle /> WhatsApp
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
