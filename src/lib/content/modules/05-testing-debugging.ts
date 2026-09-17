import type { CourseModule } from "../types";

export const module05: CourseModule = {
  slug: "testing-and-debugging",
  order: 6,
  dayRange: "Day 11–12",
  title: "Testing & Debugging Workflows",
  summary:
    "Use Claude Code inside test-driven loops, apply a disciplined reproduce → isolate → fix debugging process, and handle failures that resist a first attempt.",
  objectives: [
    "Run a test-driven development loop with Claude Code",
    "Apply reproduce → isolate → fix when debugging",
    "Recognize and handle flaky or ambiguous test failures",
  ],
  lessonSections: [
    {
      heading: "Test-driven loops: write tests, let Claude implement",
      body: [
        "A test-driven loop inverts the usual order: you (or Claude, under your review) write the test first, describing the behavior you want as an executable specification, and only then does implementation happen against that target. This works especially well with an agentic tool, because the test gives Claude Code an objective, checkable definition of done instead of only a prose description.",
        "A practical pattern: ask Claude to write a failing test that captures the desired behavior, confirm the test actually fails for the right reason (not a typo or setup error), then ask it to implement until that test — and the rest of the suite — passes.",
        "Resist the temptation to let Claude write both the test and the implementation without you checking the test first. A test that's subtly wrong (asserting the wrong thing, or trivially always passing) gives you false confidence no matter how correct the implementation looks.",
      ],
    },
    {
      heading: "Debugging: reproduce → isolate → fix",
      body: [
        "Reproduce first: before proposing any fix, confirm you can reliably trigger the bug — running the exact failing case, capturing the exact error. A fix aimed at a bug you haven't actually reproduced is a guess wearing a diff's clothing.",
        "Isolate second: narrow down where the failure originates — which function, which input, which layer of the stack — before touching code. This is where reading logs, adding a temporary debug statement, or bisecting between a known-good and known-bad state pays off.",
        "Fix last: once the cause is actually located, the fix itself is often small. Ask Claude Code to explain why the bug happened, not just what changed — an explanation you don't understand is a fix you can't fully trust, and it's a sign the isolation step wasn't as complete as it seemed.",
      ],
    },
    {
      heading: "Handling flaky or ambiguous failures",
      body: [
        "A test that fails intermittently is a different problem than one that fails consistently, and deserves different treatment: don't let Claude 'fix' a flaky test by loosening its assertions or adding a retry that papers over a real race condition. Flakiness is usually a signal of a genuine timing or ordering bug worth isolating properly.",
        "When a failure is ambiguous — the error message doesn't clearly point at a cause — resist jumping straight to a fix. Ask for more evidence first: add logging, run the failing case in isolation, or check whether the failure correlates with a specific environment or input.",
        "If a fix is proposed for a flaky or ambiguous failure, ask explicitly: does this address the root cause, or does it just make the symptom less visible? That question alone catches a large share of superficial fixes before they ship.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "In a test-driven loop with Claude Code, what should you check before implementation begins?",
      options: [
        "Nothing — proceed straight to implementation",
        "That the written test actually fails for the right reason, not due to a typo or setup error",
        "That the test file is the correct length",
        "That the implementation already exists",
      ],
      correctIndex: 1,
      explanation:
        "Confirming the test fails for the right reason validates that it's actually testing the intended behavior before you trust it as a target.",
    },
    {
      id: "q2",
      question: "What is the first step in the reproduce → isolate → fix debugging process?",
      options: [
        "Fix the most likely-looking line of code",
        "Reliably reproduce the bug and capture the exact error before proposing any fix",
        "Rewrite the whole module",
        "Ignore the bug if it's intermittent",
      ],
      correctIndex: 1,
      explanation:
        "A fix aimed at an unreproduced bug is a guess. Reproducing first confirms you're solving the actual problem.",
    },
    {
      id: "q3",
      question: "Why is the 'isolate' step important before fixing?",
      options: [
        "It isn't important; fixing can happen immediately",
        "It narrows down where the failure actually originates, so the fix targets the real cause",
        "It only matters for front-end bugs",
        "It replaces the need for reproducing the bug",
      ],
      correctIndex: 1,
      explanation:
        "Isolating the failure to a specific function, input, or layer ensures the eventual fix addresses the actual cause, not a symptom nearby.",
    },
    {
      id: "q4",
      question: "What's a red flag when 'fixing' a flaky test?",
      options: [
        "Investigating a timing or ordering bug",
        "Loosening the test's assertions or adding a retry that papers over a real race condition",
        "Reproducing the flake reliably before changing anything",
        "Asking for more evidence before proposing a fix",
      ],
      correctIndex: 1,
      explanation:
        "Flakiness is often a real bug in disguise. Weakening the test instead of finding the root cause hides the problem rather than solving it.",
    },
    {
      id: "q5",
      question: "When a failure is ambiguous, what should you do before jumping to a fix?",
      options: [
        "Immediately apply the first plausible-looking change",
        "Gather more evidence: add logging, isolate the failing case, check for environment correlation",
        "Delete the failing test",
        "Assume it's unfixable",
      ],
      correctIndex: 1,
      explanation:
        "Ambiguous failures need more evidence before a fix will actually target the cause rather than a coincidental correlation.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Run a reproduce → isolate → fix cycle on a real bug",
    scenario:
      "Find (or intentionally introduce) a small bug in a real or toy project. Use Claude Code to reproduce it reliably, isolate its cause, and fix it — documenting each of the three steps separately.",
    steps: [
      "Identify or introduce a small, real bug.",
      "Reproduce it: capture the exact steps and error.",
      "Isolate it: narrow down the specific cause with Claude Code's help.",
      "Fix it, and confirm the fix resolves the reproduced case.",
    ],
    submissionLabel:
      "Paste your reproduce, isolate, and fix notes as three distinct sections.",
    placeholder:
      "Reproduce: running X causes error Y...\nIsolate: the cause is in function Z because...\nFix: changed A to B, confirmed the original failing case now passes.",
    checks: [
      {
        id: "has-reproduce",
        description: "Includes a reproduce step",
        type: "includesAny",
        value: ["reproduce"],
      },
      {
        id: "has-isolate",
        description: "Includes an isolate step",
        type: "includesAny",
        value: ["isolate"],
      },
      {
        id: "has-fix",
        description: "Includes a fix step",
        type: "includesAny",
        value: ["fix"],
      },
    ],
  },
};
