import type { CheckRule } from "./types";

export type CheckResult = {
  id: string;
  description: string;
  passed: boolean;
};

function normalize(text: string) {
  return text.toLowerCase();
}

export function runCheck(text: string, rule: CheckRule): boolean {
  const normalized = normalize(text);

  switch (rule.type) {
    case "includesAny": {
      const values = Array.isArray(rule.value) ? rule.value : [rule.value];
      return values.some((v) => normalized.includes(normalize(String(v))));
    }
    case "includesAll": {
      const values = Array.isArray(rule.value) ? rule.value : [rule.value];
      return values.every((v) => normalized.includes(normalize(String(v))));
    }
    case "regex": {
      const re = new RegExp(String(rule.value), rule.flags ?? "i");
      return re.test(text);
    }
    case "minLength": {
      return text.trim().length >= Number(rule.value);
    }
    case "minLines": {
      const lines = text.split("\n").filter((l) => l.trim().length > 0);
      return lines.length >= Number(rule.value);
    }
    default:
      return false;
  }
}

export function runChecks(text: string, rules: CheckRule[]): CheckResult[] {
  return rules.map((rule) => ({
    id: rule.id,
    description: rule.description,
    passed: text.trim().length > 0 ? runCheck(text, rule) : false,
  }));
}

export function allChecksPassed(results: CheckResult[]): boolean {
  return results.length > 0 && results.every((r) => r.passed);
}
