import {
  BottomNavigation,
  BottomNavigationHighlight,
  BottomNavigationHighlightItem,
  BottomNavigationItem,
  BottomNavigationLabel,
} from "@animate-ui/react/primitives/bottom-navigation";

import {
  Home,
  UserRound,
  FolderKanban,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { useActiveSection, scrollToSection } from "@/hooks/use-active-section";

const ITEMS = [
  { value: "home", label: "Home", Icon: Home },
  { value: "about", label: "About", Icon: UserRound },
  { value: "projects", label: "Projects", Icon: FolderKanban },
  { value: "services", label: "Services", Icon: BriefcaseBusiness },
  { value: "contact", label: "Contact", Icon: Mail },
];

const sectionIds = ["home", "services", "contact"];

export function MobileBottomNav() {
  const activeSection = useActiveSection(sectionIds);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome =
    location.pathname === "/" || location.pathname === "/_public/";

  // Determine the active tab based on the current route or visible homepage section
  const currentActive = (() => {
    if (location.pathname.startsWith("/about")) return "about";
    if (location.pathname.startsWith("/projects")) return "projects";
    return activeSection ?? "home";
  })();

  const go = (value: string) => {
    if (value === "about") {
      navigate({ to: "/about" });
      return;
    }

    if (value === "projects") {
      navigate({ to: "/projects" });
      return;
    }

    if (value === "home") {
      if (!isHome) {
        navigate({ to: "/" }).then(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      } else {
        scrollToSection("home");
      }
      return;
    }

    // Section links ("services", "contact")
    if (!isHome) {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => scrollToSection(value), 120);
      });
    } else {
      scrollToSection(value);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-3 lg:hidden">
      <BottomNavigation
        value={currentActive}
        onValueChange={go}
        scrollBehavior="none"
        aria-label="Mobile navigation"
        className="pointer-events-auto flex w-full max-w-[420px] items-center justify-center"
      >
        <BottomNavigationHighlight className="absolute inset-x-0 inset-y-1 z-0 rounded-full bg-muted">
          <ul className="flex w-full items-center justify-around rounded-full border border-border/60 bg-background/90 px-1 py-1 shadow-xl shadow-black/10 backdrop-blur-xl">
            {ITEMS.map(({ value, label, Icon }) => (
              <li key={value} className="flex-1">
                <BottomNavigationHighlightItem value={value}>
                  <BottomNavigationItem value={value} asChild>
                    <button
                      type="button"
                      aria-label={label}
                      className="relative z-10 flex h-[3.75rem] w-full flex-col items-center justify-center gap-1 rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:text-primary"
                    >
                      <Icon
                        size={21}
                        strokeWidth={2}
                        className="shrink-0"
                      />

                      <BottomNavigationLabel className="text-[10px] font-semibold leading-none">
                        {label}
                      </BottomNavigationLabel>
                    </button>
                  </BottomNavigationItem>
                </BottomNavigationHighlightItem>
              </li>
            ))}
          </ul>
        </BottomNavigationHighlight>
      </BottomNavigation>
    </div>
  );
}