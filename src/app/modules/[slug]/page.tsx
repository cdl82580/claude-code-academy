import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Target } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizForm } from "@/components/quiz-form";
import { PracticumForm } from "@/components/practicum-form";
import { StarterProjects } from "@/components/starter-projects";
import { PermissionsTip } from "@/components/permissions-tip";
import { CodeBlock } from "@/components/code-block";
import { createClient } from "@/lib/supabase/server";
import { courseModules, getModuleBySlug, getNextModule } from "@/lib/content/modules";
import { getProgressMap } from "@/lib/progress";
import { isAiFeedbackConfigured } from "@/lib/ai/practicum-feedback";

export function generateStaticParams() {
  return courseModules.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const courseModule = getModuleBySlug(slug);
  if (!courseModule) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/modules/${slug}`);

  const progressMap = await getProgressMap(supabase, user.id);
  const row = progressMap[slug];
  const next = getNextModule(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Link
            href="/dashboard"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>

          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline">{courseModule.dayRange}</Badge>
              <span className="text-xs font-medium text-muted-foreground">
                Module {courseModule.order} of {courseModules.length}
              </span>
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {courseModule.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{courseModule.summary}</p>
          </div>

          <Tabs defaultValue="lesson">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lesson">Lesson</TabsTrigger>
              <TabsTrigger value="quiz">
                Quiz {row?.quiz_passed ? <CheckCircle2 className="ml-1 size-3.5 text-success" /> : null}
              </TabsTrigger>
              <TabsTrigger value="practicum">
                Practicum{" "}
                {row?.practicum_verified ? (
                  <CheckCircle2 className="ml-1 size-3.5 text-success" />
                ) : null}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lesson" className="space-y-8 pt-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Target className="size-4" /> Objectives
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {courseModule.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {courseModule.lessonSections.map((section, i) => (
                <section key={i} className="space-y-3">
                  <h2 className="font-heading text-xl font-semibold">{section.heading}</h2>
                  {section.body.map((p, j) => (
                    <p key={j} className="leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                  {section.examples?.map((ex, j) => <CodeBlock key={j} {...ex} />)}
                </section>
              ))}

              {next ? (
                <div className="flex justify-end border-t border-border pt-6">
                  <Link
                    href={`/modules/${next.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Next: {next.title} <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : null}
            </TabsContent>

            <TabsContent value="quiz" className="pt-6">
              <QuizForm
                moduleSlug={slug}
                questions={courseModule.quiz}
                passThreshold={courseModule.passThreshold}
                initialPassed={row?.quiz_passed}
              />
            </TabsContent>

            <TabsContent value="practicum" className="space-y-6 pt-6">
              <div>
                <h2 className="font-heading text-xl font-semibold">{courseModule.practicum.title}</h2>
                <p className="mt-1 text-muted-foreground">{courseModule.practicum.scenario}</p>
              </div>
              <PermissionsTip />
              <StarterProjects />
              <PracticumForm
                moduleSlug={slug}
                practicum={courseModule.practicum}
                initialSubmission={row?.practicum_submission}
                initialChecks={row?.practicum_checks}
                initialVerified={row?.practicum_verified}
                aiFeedbackEnabled={isAiFeedbackConfigured()}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
