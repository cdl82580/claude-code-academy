"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, ListChecks, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Practicum } from "@/lib/content/types";
import type { CheckResult } from "@/lib/content/validation";
import { submitPracticum, requestPracticumFeedback } from "@/app/modules/actions";

export function PracticumForm({
  moduleSlug,
  practicum,
  initialSubmission,
  initialChecks,
  initialVerified,
  aiFeedbackEnabled,
}: {
  moduleSlug: string;
  practicum: Practicum;
  initialSubmission?: string | null;
  initialChecks?: CheckResult[] | null;
  initialVerified?: boolean;
  aiFeedbackEnabled?: boolean;
}) {
  const [text, setText] = useState(initialSubmission ?? "");
  const [checks, setChecks] = useState<CheckResult[] | null>(initialChecks ?? null);
  const [verified, setVerified] = useState(Boolean(initialVerified));
  const [isPending, startTransition] = useTransition();

  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isFeedbackPending, startFeedbackTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        const res = await submitPracticum(moduleSlug, text);
        setChecks(res.results);
        setVerified(res.verified);
        if (res.verified) {
          toast.success("Practicum verified!");
        } else {
          toast.error("Not verified yet — check the requirements below and revise.");
        }
      } catch {
        toast.error("Something went wrong submitting your practicum. Try again.");
      }
    });
  }

  function handleGetFeedback() {
    startFeedbackTransition(async () => {
      try {
        const res = await requestPracticumFeedback(moduleSlug, text);
        setAiFeedback(res.feedback);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not get AI feedback right now.");
      }
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h4 className="mb-2 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <ListChecks className="size-4" /> Steps
        </h4>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm">
          {practicum.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-2">
        <label htmlFor="practicum-submission" className="text-sm font-medium">
          {practicum.submissionLabel}
        </label>
        <Textarea
          id="practicum-submission"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={practicum.placeholder}
          rows={10}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSubmit} disabled={text.trim().length === 0 || isPending} size="lg">
          {isPending ? "Checking…" : "Submit practicum"}
        </Button>
        {aiFeedbackEnabled ? (
          <Button
            onClick={handleGetFeedback}
            disabled={text.trim().length === 0 || isFeedbackPending}
            variant="outline"
            size="lg"
          >
            <Sparkles className="size-4" />
            {isFeedbackPending ? "Thinking…" : "Get AI feedback"}
          </Button>
        ) : null}
      </div>

      {checks ? (
        <div
          className={
            "space-y-2 rounded-lg border px-4 py-3 " +
            (verified ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10")
          }
        >
          <p className="text-sm font-semibold">
            {verified ? "Verified — nice work." : "Not verified yet"}
          </p>
          <ul className="space-y-1 text-sm">
            {checks.map((c) => (
              <li key={c.id} className="flex items-start gap-2">
                {c.passed ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                ) : (
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                )}
                <span>{c.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {aiFeedback ? (
        <div className="space-y-1.5 rounded-lg border border-accent bg-accent/40 px-4 py-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-accent-foreground">
            <Sparkles className="size-4" /> AI feedback
          </p>
          <p className="text-sm text-accent-foreground/90">{aiFeedback}</p>
          <p className="pt-1 text-xs text-muted-foreground">
            Coaching only — this doesn&apos;t affect verification above.
          </p>
        </div>
      ) : null}
    </div>
  );
}
