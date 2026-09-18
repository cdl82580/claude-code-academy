import type { CourseModule } from "../types";

export const module07: CourseModule = {
  slug: "team-and-production-use",
  order: 8,
  dayRange: "Day 15–16",
  title: "Team & Production Use",
  summary:
    "Bring Claude Code from your own workflow into a team's: code review, CI/CD, security review passes, and shared conventions that hold up under real production pressure.",
  objectives: [
    "Use Claude Code in code review workflows",
    "Integrate Claude Code with CI/CD",
    "Run a security review pass before shipping",
    "Establish team conventions: shared CLAUDE.md and hooks",
  ],
  lessonSections: [
    {
      heading: "Code review workflows with Claude Code",
      body: [
        "Claude Code is useful on both sides of a code review: as a first pass before a human reviewer ever sees the diff (catching obvious issues, checking for missing error handling, verifying tests exist), and as a way to understand an unfamiliar diff someone else wrote before you review it yourself. Neither use replaces human review on anything that matters — it raises the floor of what gets caught and speeds up how fast a reviewer gets oriented.",
        "A useful team pattern is a standing review checklist turned into a slash command or documented step: the same categories of question (security, error handling, test coverage, scope) applied consistently, rather than reviews varying by whoever's doing them that day.",
        "Be explicit about what a review pass is and isn't. An automated first pass is a net that catches some issues, not a guarantee — treat a clean pass as 'nothing obvious found,' not as full sign-off.",
      ],
    },
    {
      heading: "CI/CD integration",
      body: [
        "Running Claude Code non-interactively as part of CI/CD means the same agentic capabilities — reading code, running commands, evaluating output — can execute automatically on triggers like a pull request being opened, without a human driving each step. Common patterns include an automated review comment on new PRs, or a check that runs a broader analysis than your standard linter. Even a plain test-on-push workflow is the foundation this builds on:",
      ],
      examples: [
        {
          label: ".github/workflows/ci.yml",
          code: `name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
        },
      ],
    },
    {
      heading: "Scoping CI's permissions",
      body: [
        "Because CI runs are unattended, they need tighter, more explicit permission boundaries than an interactive session — an unattended agent should never have a wider blast radius than a human would be comfortable granting without watching. Treat CI credentials and scopes the same way you'd treat any other automation's access: least privilege, and auditable.",
        "Output from automated runs should be reviewable after the fact — logged, or posted somewhere a human sees it — so a bad automated judgment gets caught by the team, not silently trusted.",
      ],
    },
    {
      heading: "Security review passes",
      body: [
        "A dedicated security-focused pass — separate from a general code review — looks specifically for the categories that general review often glosses over: injection risks, authentication and authorization gaps, secrets in code or logs, unsafe deserialization, and missing input validation at trust boundaries.",
        "Claude Code can run this kind of pass by being pointed at it explicitly: ask for a review scoped to security concerns rather than general code quality, and give it the same specificity you'd want from a human security reviewer — which trust boundaries matter, what data is sensitive, what the threat model looks like for this specific change. Turning that into a standing slash command (see Module 4) means every reviewer runs the same pass:",
      ],
      examples: [
        {
          label: ".claude/commands/security-review.md",
          code: `Review this diff for:
- Injection risks (SQL, command, template)
- Missing authentication or authorization checks
- Secrets committed in code or logs
- Missing input validation at trust boundaries

Flag anything uncertain rather than assuming it's fine.`,
        },
      ],
    },
    {
      heading: "Treating findings as a worklist",
      body: [
        "Findings from an automated security pass still need a human decision: which findings are real, which are false positives, and which are real but acceptable given context the review pass didn't have. Treat it as generating a worklist, not a verdict.",
      ],
    },
    {
      heading: "Establishing team conventions",
      body: [
        "A shared, committed CLAUDE.md is how a team's conventions become durable and self-enforcing rather than living in one senior engineer's head. The best team CLAUDE.md files get updated the moment someone has to explain the same thing twice in review — that's the signal a convention is worth writing down.",
        "Shared hooks extend the same idea to automation: a hook that runs the team's formatter or linter after every edit means style consistency doesn't depend on everyone remembering to run it manually.",
        "Ownership matters here — treat CLAUDE.md and shared hooks as part of the codebase, reviewed and updated through the same process as any other shared file, not as a side channel that quietly drifts out of sync with how the team actually works.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "What's the right way to think about an automated Claude Code review pass?",
      options: [
        "It fully replaces human review",
        "It raises the floor of what gets caught and speeds up orientation, but doesn't replace human review on anything that matters",
        "It should be ignored entirely",
        "It only works on documentation, never code",
      ],
      correctIndex: 1,
      explanation:
        "An automated first pass catches obvious issues and speeds up review, but a clean pass means 'nothing obvious found,' not full sign-off.",
    },
    {
      id: "q2",
      question: "Why do unattended CI runs need tighter permission boundaries than an interactive session?",
      options: [
        "They don't — the same permissions apply everywhere",
        "Because no human is watching each step, so the blast radius must be limited to what you'd grant without supervision",
        "Because CI is always slower than local sessions",
        "Because CI credentials never matter",
      ],
      correctIndex: 1,
      explanation:
        "Without a human driving each step, an unattended agent's permissions should be scoped tightly and treated with least-privilege discipline.",
    },
    {
      id: "q3",
      question: "What does a dedicated security review pass look for that a general review often misses?",
      options: [
        "Code formatting only",
        "Injection risks, auth gaps, secrets in code, unsafe deserialization, and missing input validation at trust boundaries",
        "Variable naming conventions",
        "Nothing different from a general review",
      ],
      correctIndex: 1,
      explanation:
        "A security-focused pass explicitly targets categories — injection, auth, secrets, deserialization, validation — that general quality review can gloss over.",
    },
    {
      id: "q4",
      question: "How should findings from an automated security review pass be treated?",
      options: [
        "As a final verdict requiring no further judgment",
        "As a worklist requiring human judgment on which findings are real and relevant",
        "As always false positives",
        "As irrelevant to shipping decisions",
      ],
      correctIndex: 1,
      explanation:
        "Automated findings still need a human to judge relevance and context — treat the output as a worklist, not an automatic verdict.",
    },
    {
      id: "q5",
      question: "What signal suggests a team convention is worth writing into a shared CLAUDE.md?",
      options: [
        "It has never come up before",
        "Someone has had to explain the same thing twice in review",
        "It only applies to one person",
        "It's already documented somewhere no one reads",
      ],
      correctIndex: 1,
      explanation:
        "Repeated explanation in review is the practical signal that a convention should be captured durably rather than re-explained indefinitely.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Draft a review checklist and a CI-safe permission scope",
    scenario:
      "Draft a short, reusable code review checklist (as you would turn into a slash command) and describe how you'd scope Claude Code's permissions differently for an unattended CI run versus your own interactive session.",
    steps: [
      "Write a code review checklist covering at least security, error handling, and test coverage.",
      "Describe one concrete way you'd tighten permissions for an unattended CI run compared to an interactive session.",
      "Note how findings from an automated pass should be handled by the team.",
    ],
    submissionLabel:
      "Paste your review checklist and your CI permission-scoping notes.",
    placeholder:
      "Review checklist:\n1. Security: ...\n2. Error handling: ...\n3. Test coverage: ...\n\nCI permission scoping: for CI runs, I would restrict...\n\nHandling findings: automated findings get logged and triaged by...",
    checks: [
      {
        id: "has-security-category",
        description: "Checklist mentions security",
        type: "includesAny",
        value: ["security", "injection", "auth"],
      },
      {
        id: "has-error-category",
        description: "Checklist mentions error handling",
        type: "includesAny",
        value: ["error", "exception", "handling"],
      },
      {
        id: "has-test-category",
        description: "Checklist mentions test coverage",
        type: "includesAny",
        value: ["test", "coverage"],
      },
      {
        id: "has-ci-scoping",
        description: "Describes CI permission scoping",
        type: "includesAny",
        value: ["ci/cd", "ci run", "unattended", "permission", "least privilege", "pipeline", "non-interactive"],
      },
      {
        id: "sufficient-detail",
        description: "Overall submission has enough detail",
        type: "minLength",
        value: 120,
      },
    ],
  },
};
