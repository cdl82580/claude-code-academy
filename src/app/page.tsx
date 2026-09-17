import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, GraduationCap, Terminal } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courseModules } from "@/lib/content/modules";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, var(--color-accent) 0%, transparent 70%)",
            }}
          />
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
              20 days · 7 modules + capstone · self-paced
            </Badge>
            <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Learn Claude Code, hands-on — from first session to shipped capstone.
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              A self-paced course on Anthropic&apos;s agentic coding tool. Read real lessons, pass a
              quiz for every module, complete hands-on practicums in your own terminal, and earn a
              certificate of completion you can keep.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
                Start learning free <ArrowRight className="ml-1 size-4" />
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href="#curriculum" />}>
                See the curriculum
              </Button>
            </div>
          </div>
        </section>

        {/* Feature strip */}
        <section className="border-y border-border/70 bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
            <div className="flex items-start gap-3">
              <Terminal className="mt-0.5 size-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-heading font-semibold">Hands-on practicums</h3>
                <p className="text-sm text-muted-foreground">
                  Real terminal work in your own projects, verified with evidence you submit —
                  not multiple choice alone.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-heading font-semibold">Module quizzes</h3>
                <p className="text-sm text-muted-foreground">
                  Short, focused quizzes after every module confirm the concepts actually stuck.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 size-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-heading font-semibold">Certificate of completion</h3>
                <p className="text-sm text-muted-foreground">
                  Finish every module and the capstone to unlock a downloadable PDF certificate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Curriculum
            </h2>
            <p className="mt-3 text-muted-foreground">
              Nine modules, each with a lesson, a quiz, and a hands-on practicum — following the
              course syllabus day by day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courseModules.map((m) => (
              <Card key={m.slug} className="flex h-full flex-col justify-between">
                <CardHeader>
                  <div className="mb-1 flex items-center justify-between">
                    <Badge variant="outline">{m.dayRange}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">
                      Module {m.order}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-lg">{m.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{m.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certificate */}
        <section id="certificate" className="border-t border-border/70 bg-muted/30">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 md:flex-row md:text-left">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <FileCheck2 className="size-3.5" /> Certificate of completion
              </div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Finish the course, get a certificate you can actually show.
              </h2>
              <p className="text-muted-foreground">
                Pass every module&apos;s quiz and verified practicum — including the capstone — and
                your certificate unlocks automatically. Download it as a PDF any time from your
                dashboard.
              </p>
              <Button nativeButton={false} render={<Link href="/signup" />}>
                Get started <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-heading text-sm font-semibold text-primary">
                    Claude Code Academy
                  </span>
                  <GraduationCap className="size-5 text-primary" />
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Certificate of Completion
                </p>
                <p className="mt-3 font-heading text-2xl font-semibold">Your Name Here</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  has successfully completed the Learn Claude Code course
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Certificate No. CCA-0000</span>
                  <span>Issued —</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
