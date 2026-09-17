import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo markClassName="size-7" />
          <p className="max-w-sm text-sm text-muted-foreground">
            An independent, self-paced course for learning Claude Code. Not affiliated with or
            endorsed by Anthropic.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <Link href="/#curriculum" className="hover:text-foreground">
            Curriculum
          </Link>
          <Link href="/#certificate" className="hover:text-foreground">
            Certificate
          </Link>
          <Link href="/login" className="hover:text-foreground">
            Log in
          </Link>
          <Link href="/signup" className="hover:text-foreground">
            Sign up
          </Link>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Claude Code Academy. All rights reserved.
      </div>
    </footer>
  );
}
