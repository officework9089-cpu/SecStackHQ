import { motion } from "motion/react";
import { ArrowUp, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { brand, navLinks, services } from "@/data/site";
import { scrollToSection } from "@/hooks/use-active-section";

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "X / Twitter", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "GitHub", icon: Github, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-surface relative overflow-hidden border-t">
      <div className="bg-gradient-brand absolute inset-x-0 top-0 h-px opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="text-gradient font-display text-sm font-bold tracking-[0.25em]">{brand.tagline}</p>
          <p className="text-muted-foreground max-w-xs text-sm">
            Technology, security and creative growth for ambitious brands around the world.
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -4 }}
                className="glass hover:text-primary hover:shadow-glow grid size-10 place-items-center rounded-xl transition-[color,box-shadow]"
              >
                <s.icon className="size-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">Quick links</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(l.id);
                  }}
                  className="text-muted-foreground hover:text-primary inline-block transition-all hover:translate-x-1"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services");
                  }}
                  className="text-muted-foreground hover:text-primary inline-block transition-all hover:translate-x-1"
                >
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">Contact</h3>
          <ul className="text-muted-foreground space-y-3 text-sm">
            <li className="flex gap-2.5">
              <Mail className="text-primary size-4 shrink-0" />
              <a href={`mailto:${brand.email}`} className="hover:text-primary break-all">
                {brand.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="text-primary size-4 shrink-0" />
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {brand.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="text-primary size-4 shrink-0" />
              <span>{brand.location}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t px-5 py-6 text-xs sm:flex-row sm:px-8">
        <p className="text-muted-foreground">© {new Date().getFullYear()} SecStackHQ. All rights reserved.</p>
        <motion.button
          onClick={() => scrollToSection("home")}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          className="bg-gradient-brand text-primary-foreground shadow-glow flex items-center gap-2 rounded-full px-4 py-2 font-semibold"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" /> Back to top
        </motion.button>
      </div>
    </footer>
  );
}
