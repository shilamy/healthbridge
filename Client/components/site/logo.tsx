import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Activity className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
      </span>
      {showWord && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Medi<span className="text-primary">Core</span>
        </span>
      )}
    </span>
  );
}
