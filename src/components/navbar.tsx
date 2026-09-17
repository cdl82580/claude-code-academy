import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "@/app/(auth)/actions";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email ||
    "";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/#curriculum" className="transition-colors hover:text-foreground">
            Curriculum
          </Link>
          <Link href="/#certificate" className="transition-colors hover:text-foreground">
            Certificate
          </Link>
          {user ? (
            <Link href="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
          ) : null}
        </nav>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="size-9">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-semibold">
                  {initials(fullName) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="truncate">{fullName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/dashboard" />}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/certificate" />}>Certificate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={signOut} className="contents">
                <DropdownMenuItem render={<button type="submit" className="w-full text-left" />}>
                  Sign out
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
              Log in
            </Button>
            <Button nativeButton={false} render={<Link href="/signup" />}>Sign up free</Button>
          </div>
        )}
      </div>
    </header>
  );
}
