"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getModuleBySlug } from "@/lib/content/modules";
import { runChecks, allChecksPassed, type CheckResult } from "@/lib/content/validation";

export type QuizResult = {
  score: number;
  correctCount: number;
  total: number;
  passed: boolean;
  perQuestion: { id: string; correct: boolean; correctIndex: number }[];
};

export async function submitQuiz(
  moduleSlug: string,
  answers: Record<string, number>,
): Promise<QuizResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const courseModule = getModuleBySlug(moduleSlug);
  if (!courseModule) throw new Error("Unknown module");

  const perQuestion = courseModule.quiz.map((q) => ({
    id: q.id,
    correct: answers[q.id] === q.correctIndex,
    correctIndex: q.correctIndex,
  }));
  const correctCount = perQuestion.filter((q) => q.correct).length;
  const total = courseModule.quiz.length;
  const score = total > 0 ? correctCount / total : 0;
  const passed = score >= courseModule.passThreshold;

  const { data: existing } = await supabase
    .from("module_progress")
    .select("quiz_attempts, practicum_submission, practicum_verified, practicum_checks")
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .maybeSingle();

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_slug: moduleSlug,
      quiz_score: score,
      quiz_passed: passed,
      quiz_attempts: (existing?.quiz_attempts ?? 0) + 1,
      practicum_submission: existing?.practicum_submission ?? null,
      practicum_verified: existing?.practicum_verified ?? false,
      practicum_checks: existing?.practicum_checks ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_slug" },
  );

  revalidatePath(`/modules/${moduleSlug}`);
  revalidatePath("/dashboard");

  return { score, correctCount, total, passed, perQuestion };
}

export type PracticumResult = {
  results: CheckResult[];
  verified: boolean;
};

export async function submitPracticum(
  moduleSlug: string,
  submissionText: string,
): Promise<PracticumResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const courseModule = getModuleBySlug(moduleSlug);
  if (!courseModule) throw new Error("Unknown module");

  const results = runChecks(submissionText, courseModule.practicum.checks);
  const verified = allChecksPassed(results);

  const { data: existing } = await supabase
    .from("module_progress")
    .select("quiz_score, quiz_passed, quiz_attempts")
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .maybeSingle();

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_slug: moduleSlug,
      quiz_score: existing?.quiz_score ?? null,
      quiz_passed: existing?.quiz_passed ?? false,
      quiz_attempts: existing?.quiz_attempts ?? 0,
      practicum_submission: submissionText,
      practicum_verified: verified,
      practicum_checks: results,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_slug" },
  );

  revalidatePath(`/modules/${moduleSlug}`);
  revalidatePath("/dashboard");

  return { results, verified };
}
