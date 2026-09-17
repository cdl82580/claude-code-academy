import type { SupabaseClient } from "@supabase/supabase-js";
import { courseModules } from "@/lib/content/modules";

export type ModuleProgressRow = {
  user_id: string;
  module_slug: string;
  quiz_score: number | null;
  quiz_passed: boolean;
  quiz_attempts: number;
  practicum_submission: string | null;
  practicum_verified: boolean;
  practicum_checks: { id: string; description: string; passed: boolean }[] | null;
  updated_at: string;
};

export type ProgressMap = Record<string, ModuleProgressRow>;

export async function getProgressMap(
  supabase: SupabaseClient,
  userId: string,
): Promise<ProgressMap> {
  const { data } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", userId);

  const map: ProgressMap = {};
  for (const row of data ?? []) {
    map[row.module_slug] = row as ModuleProgressRow;
  }
  return map;
}

export function isModuleComplete(row: ModuleProgressRow | undefined): boolean {
  return Boolean(row?.quiz_passed && row?.practicum_verified);
}

export function isCourseComplete(map: ProgressMap): boolean {
  return courseModules.every((m) => isModuleComplete(map[m.slug]));
}

export function completionCount(map: ProgressMap): number {
  return courseModules.filter((m) => isModuleComplete(map[m.slug])).length;
}
