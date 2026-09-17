import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Circle, Download, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { courseModules } from "@/lib/content/modules";
import { getProgressMap, isModuleComplete, isCourseComplete } from "@/lib/progress";

export default async function CertificatePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/certificate");

  const progressMap = await getProgressMap(supabase, user.id);
  const complete = isCourseComplete(progressMap);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Certificate of completion
          </h1>
          <p className="mt-2 text-muted-foreground">
            Pass every module&apos;s quiz and hands-on practicum — including the capstone — to
            unlock your certificate.
          </p>

          {complete ? (
            <Card className="mt-8 border-primary/40 bg-accent/40">
              <CardHeader className="text-center">
                <GraduationCap className="mx-auto mb-2 size-10 text-primary" />
                <CardTitle className="font-heading text-2xl">You did it!</CardTitle>
                <CardDescription>
                  Every module is complete. Your certificate is ready to view and download,
                  anytime.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<a href="/api/certificate" target="_blank" rel="noopener noreferrer" />}
                >
                  <Download className="size-4" /> View / download PDF
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Your progress</CardTitle>
                <CardDescription>Finish the items below to unlock your certificate.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {courseModules.map((m) => {
                    const done = isModuleComplete(progressMap[m.slug]);
                    return (
                      <li key={m.slug} className="flex items-center justify-between gap-3 py-3">
                        <div className="flex items-center gap-2">
                          {done ? (
                            <CheckCircle2 className="size-4 shrink-0 text-success" />
                          ) : (
                            <Circle className="size-4 shrink-0 text-muted-foreground" />
                          )}
                          <span className="text-sm">
                            {m.order}. {m.title}
                          </span>
                        </div>
                        {!done ? (
                          <Link
                            href={`/modules/${m.slug}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Continue
                          </Link>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
