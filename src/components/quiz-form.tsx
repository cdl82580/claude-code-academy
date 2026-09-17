"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { QuizQuestion } from "@/lib/content/types";
import { submitQuiz, type QuizResult } from "@/app/modules/actions";

export function QuizForm({
  moduleSlug,
  questions,
  passThreshold,
  initialPassed,
}: {
  moduleSlug: string;
  questions: QuizQuestion[];
  passThreshold: number;
  initialPassed?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function handleSubmit() {
    startTransition(async () => {
      try {
        const res = await submitQuiz(moduleSlug, answers);
        setResult(res);
        if (res.passed) {
          toast.success(`Quiz passed — ${res.correctCount}/${res.total} correct`);
        } else {
          toast.error(`Not quite — ${res.correctCount}/${res.total} correct. Review and retake.`);
        }
      } catch {
        toast.error("Something went wrong submitting your quiz. Try again.");
      }
    });
  }

  return (
    <div className="space-y-6">
      {initialPassed && !result ? (
        <div className="flex items-center gap-2 rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success-foreground">
          <CheckCircle2 className="size-4 shrink-0 text-success" />
          You&apos;ve already passed this quiz. You can retake it any time.
        </div>
      ) : null}

      {questions.map((q, idx) => {
        const answered = result !== null;
        const selected = answers[q.id];
        const perQ = result?.perQuestion.find((p) => p.id === q.id);

        return (
          <Card key={q.id}>
            <CardHeader>
              <CardDescription>Question {idx + 1}</CardDescription>
              <CardTitle className="text-base font-medium leading-relaxed">
                {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <RadioGroup
                value={selected !== undefined ? String(selected) : ""}
                onValueChange={(v) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: Number(v) }))
                }
                disabled={answered}
              >
                {q.options.map((opt, optIdx) => {
                  const isCorrectOpt = perQ && optIdx === perQ.correctIndex;
                  const isWrongSelected = perQ && !perQ.correct && optIdx === selected;
                  return (
                    <div
                      key={optIdx}
                      className={
                        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm " +
                        (answered && isCorrectOpt
                          ? "border-success/50 bg-success/10"
                          : answered && isWrongSelected
                            ? "border-destructive/50 bg-destructive/10"
                            : "border-border")
                      }
                    >
                      <RadioGroupItem value={String(optIdx)} id={`${q.id}-${optIdx}`} />
                      <Label htmlFor={`${q.id}-${optIdx}`} className="flex-1 cursor-pointer font-normal">
                        {opt}
                      </Label>
                      {answered && isCorrectOpt ? (
                        <CheckCircle2 className="size-4 shrink-0 text-success" />
                      ) : null}
                      {answered && isWrongSelected ? (
                        <XCircle className="size-4 shrink-0 text-destructive" />
                      ) : null}
                    </div>
                  );
                })}
              </RadioGroup>
              {answered ? (
                <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                  {q.explanation}
                </p>
              ) : null}
            </CardContent>
          </Card>
        );
      })}

      {!result ? (
        <Button onClick={handleSubmit} disabled={!allAnswered || isPending} size="lg">
          {isPending ? "Grading…" : "Submit quiz"}
        </Button>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            Score: <span className="font-semibold">{Math.round(result.score * 100)}%</span> (
            {result.correctCount}/{result.total}) — pass threshold{" "}
            {Math.round(passThreshold * 100)}%
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setAnswers({});
            }}
          >
            Retake quiz
          </Button>
        </div>
      )}
    </div>
  );
}
