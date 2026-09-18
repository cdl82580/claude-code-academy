import type { CodeExample } from "@/lib/content/types";

export function CodeBlock({ label, code }: CodeExample) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
        {label}
      </div>
      <pre className="overflow-x-auto bg-card p-3 text-xs leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
