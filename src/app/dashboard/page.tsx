import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Circle, CircleDot, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { courseModules, TOTAL_MODULES } from "@/lib/content/modules";
import { getProgressMap, isModuleComplete, completionCount, isCourseComplete } from "@/lib/progress";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const progressMap = await getProgressMap(supabase, user.id);
  const done = completionCount(progressMap);
  const pct = Math.round((done / TOTAL_MODULES) * 100);
  const complete = isCourseComplete(progressMap);

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    user.email ||
    "there";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight">{fullName}</h1>
            </div>
            <div className="w-full max-w-xs">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course progress</span>
                <span className="font-medium">
                  {done}/{TOTAL_MODULES} modules
                </span>
              </div>
              <Progress value={pct} />
            </div>
          </div>

          {complete ? (
            <Card className="mb-8 border-primary/40 bg-accent/50">
              <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex items-center gap-3">
                  <GraduationCap className="size-8 text-primary" />
                  <div>
                    <p className="font-heading text-lg font-semibold">Course complete!</p>
                    <p className="text-sm text-muted-foreground">
                      Every module is passed and verified. Your certificate is ready.
                    </p>
                  </div>
                </div>
                <Button nativeButton={false} render={<Link href="/certificate" />}>View certificate</Button>
              </CardContent>
            </Card>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courseModules.map((m) => {
              const row = progressMap[m.slug];
              const moduleComplete = isModuleComplete(row);
              const started = Boolean(row);

              return (
                <Link key={m.slug} href={`/modules/${m.slug}`}>
                  <Card className="h-full transition-colors hover:border-primary/50">
                    <CardHeader>
                      <div className="mb-1 flex items-center justify-between">
                        <Badge variant="outline">{m.dayRange}</Badge>
                        {moduleComplete ? (
                          <CheckCircle2 className="size-5 text-success" />
                        ) : started ? (
                          <CircleDot className="size-5 text-primary" />
                        ) : (
                          <Circle className="size-5 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="font-heading text-lg">
                        {m.order}. {m.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{m.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <Badge variant={row?.quiz_passed ? "default" : "secondary"}>
                          Quiz {row?.quiz_passed ? "passed" : "not passed"}
                        </Badge>
                        <Badge variant={row?.practicum_verified ? "default" : "secondary"}>
                          Practicum {row?.practicum_verified ? "verified" : "pending"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
