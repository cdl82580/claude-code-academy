import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill="var(--color-primary)" />
      <path
        d="M12 13L18.5 19.5C18.9 19.9 18.9 20.55 18.5 20.95L12 27.5"
        stroke="var(--color-primary-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 27.5H29.5"
        stroke="var(--color-primary-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="29" cy="12.5" r="2.6" fill="var(--color-primary-foreground)" />
      <path
        d="M29 15.1V20"
        stroke="var(--color-primary-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      {showWordmark ? (
        <span className="font-heading text-lg font-semibold leading-none tracking-tight">
          Claude Code Academy
        </span>
      ) : null}
    </span>
  );
}
