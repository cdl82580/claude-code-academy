import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signInWithPassword, signInWithGoogle } from "@/app/(auth)/actions";
import { GoogleIcon } from "@/components/google-icon";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Welcome back</CardTitle>
            <CardDescription>Log in to continue your course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {params.error ? (
              <Alert variant="destructive">
                <AlertDescription>{params.error}</AlertDescription>
              </Alert>
            ) : null}

            <form action={signInWithGoogle}>
              <Button type="submit" variant="outline" className="w-full">
                <GoogleIcon className="size-4" />
                Continue with Google
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <form action={signInWithPassword} className="space-y-4">
              <input type="hidden" name="next" value={params.next ?? "/dashboard"} />
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
