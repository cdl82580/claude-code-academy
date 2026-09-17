import { MailCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-accent">
              <MailCheck className="size-6 text-accent-foreground" />
            </div>
            <CardTitle className="font-heading text-xl">Check your email</CardTitle>
            <CardDescription>
              We sent you a confirmation link. Click it to activate your account, then log in to
              start the course.
            </CardDescription>
          </CardHeader>
          <CardContent />
        </Card>
      </main>
      <Footer />
    </div>
  );
}
