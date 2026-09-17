import type { CourseModule } from "../types";
import { module01 } from "./01-foundations";
import { module02 } from "./02-real-repo";
import { module025 } from "./02-5-claude-md-profile";
import { module03 } from "./03-prompting";
import { module04 } from "./04-tooling";
import { module05 } from "./05-testing-debugging";
import { module06 } from "./06-multi-file-changes";
import { module07 } from "./07-team-production";
import { module08 } from "./08-capstone";

export const courseModules: CourseModule[] = [
  module01,
  module02,
  module025,
  module03,
  module04,
  module05,
  module06,
  module07,
  module08,
].sort((a, b) => a.order - b.order);

export function getModuleBySlug(slug: string): CourseModule | undefined {
  return courseModules.find((m) => m.slug === slug);
}

export function getNextModule(slug: string): CourseModule | undefined {
  const idx = courseModules.findIndex((m) => m.slug === slug);
  if (idx === -1 || idx === courseModules.length - 1) return undefined;
  return courseModules[idx + 1];
}

export const TOTAL_MODULES = courseModules.length;
