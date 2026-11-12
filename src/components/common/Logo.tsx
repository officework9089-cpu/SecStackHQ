import markAsset from "@/assets/secstackhq_mark.png";
import { cn } from "@/lib/utils/calculator";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span className="bg-tile shadow-depth grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl">
        <img src={markAsset} alt="" width={40} height={40} className="size-9 object-contain" />
      </span>
      {showText && (
        <span className="font-display truncate text-sm font-bold sm:text-xl">
          SecStack<span className="text-gradient">HQ</span>
        </span>
      )}
    </span>
  );
}
