
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

const ITEMS = [
  { value: "home", label: "Home", Icon: Home, path: "/" },
  { value: "about", label: "About", Icon: UserRound, path: "/about" },
  { value: "projects", label: "Projects", Icon: FolderKanban, path: "/projects" },
  { value: "services", label: "Services", Icon: BriefcaseBusiness, path: "/services" },
  { value: "contact", label: "Contact", Icon: Mail, path: "/contact" },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab using the current route only
  const currentActive =
    ITEMS.find((item) => item.path === location.pathname)?.value ?? "home";

  // Navigate directly to the selected page
  const go = (value: string) => {
    const selectedItem = ITEMS.find((item) => item.value === value);

    if (!selectedItem) return;

    navigate({ to: selectedItem.path });
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
                      aria-current={
                        currentActive === value ? "page" : undefined
                      }
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
