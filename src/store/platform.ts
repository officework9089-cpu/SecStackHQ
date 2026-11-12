import { create } from "zustand";
import type { ContactInput } from "@/lib/contact-schema";

type ThemeChoice = "light" | "dark" | "system";
interface PlatformState {
  theme: ThemeChoice;
  commandOpen: boolean;
  assistantOpen: boolean;
  prompt: string;
  demo: boolean;
  intake: Partial<ContactInput>;
  setTheme: (theme: ThemeChoice) => void;
  setCommandOpen: (open: boolean) => void;
  setAssistantOpen: (open: boolean) => void;
  ask: (prompt: string) => void;
  setDemo: (demo: boolean) => void;
  setIntake: (intake: Partial<ContactInput>) => void;
}
export const usePlatform = create<PlatformState>((set) => ({
  theme: "system", commandOpen: false, assistantOpen: false, prompt: "", demo: true, intake: {},
  setTheme: (theme) => { set({ theme }); try { localStorage.setItem("secstackhq-theme", theme); } catch { /* private browsing */ } },
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setAssistantOpen: (assistantOpen) => set({ assistantOpen }),
  ask: (prompt) => set({ prompt, assistantOpen: true, commandOpen: false }),
  setDemo: (demo) => set({ demo }),
  setIntake: (intake) => set({ intake }),
}));