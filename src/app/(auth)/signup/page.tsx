import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signUpWithPassword, signInWithGoogle } from "@/app/(auth)/actions";
import { GoogleIcon } from "@/components/google-icon";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Create your account</CardTitle>
            <CardDescription>Start the course free — takes under a minute.</CardDescription>
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

            <form action={signUpWithPassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" name="fullName" type="text" required autoComplete="name" />
              </div>
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
                  minLength={8}
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground">At least 8 characters.</p>
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
