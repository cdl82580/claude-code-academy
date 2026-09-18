import type { CourseModule } from "../types";

export const module02: CourseModule = {
  slug: "working-in-a-real-repo",
  order: 2,
  dayRange: "Day 3–5",
  title: "Working in a Real Repo",
  summary:
    "Point Claude Code at an existing codebase, give it durable project context with CLAUDE.md, and use it for real git workflows — with you reviewing every change.",
  objectives: [
    "Orient Claude Code inside an existing, unfamiliar codebase",
    "Write a project CLAUDE.md that captures context and conventions",
    "Use Claude Code for git basics: branches, commits, and diffs",
    "Review a proposed change and decide whether to accept or reject it",
  ],
  lessonSections: [
    {
      heading: "Pointing Claude Code at an existing codebase",
      body: [
        "Toy projects hide a problem real repos don't: real codebases have history, inconsistent patterns, half-finished migrations, and conventions that live in people's heads rather than in a README. When you start a session in an existing repo, spend the first exchange getting oriented — ask Claude to describe the project's structure, its main entry points, and its build/test commands, before asking it to change anything.",
        "Claude Code reads what it needs on demand rather than ingesting the whole repository up front, so pointing it at the right files matters. If you already know which files or directories are relevant to your task, say so directly — it narrows the search space and produces better first attempts.",
        "Unfamiliar codebase, unfamiliar risk: the first few sessions in a new repo are a good time to ask for smaller, more reviewable changes, and to explicitly ask Claude to explain its reasoning before it edits anything non-trivial.",
      ],
    },
    {
      heading: "CLAUDE.md: durable project context",
      body: [
        "A CLAUDE.md file at your project root is context Claude Code loads automatically every session in that directory tree — so instead of re-explaining your build command, folder layout, or coding conventions every time, you write it once. Good CLAUDE.md content includes: the commands to build/test/lint, a short architecture overview, naming and style conventions, and anything you're tired of repeating.",
        "Keep it living, not exhaustive. A CLAUDE.md that tries to document every file becomes stale and gets ignored; a CLAUDE.md that captures the handful of things a new contributor would ask on day one earns its keep. Update it when you notice yourself explaining the same thing twice in a session.",
        "This is committed to the repo (it's for the whole team), which is different from the personal, global CLAUDE.md you'll build in Module 2.5 — the two layer together rather than compete. A short, real one might look like this:",
      ],
      examples: [
        {
          label: "CLAUDE.md",
          code: `# CLAUDE.md

## Commands
- \`npm run dev\` — start the dev server
- \`npm test\` — run the test suite
- \`npm run lint\` — run eslint

## Architecture
Next.js App Router app. Pages live in \`src/app\`, shared UI in
\`src/components\`, data access in \`src/lib\`.

## Conventions
- Prefer server components; only add "use client" where interactivity requires it.
- Validate all form input with zod before it reaches a server action.`,
        },
      ],
    },
    {
      heading: "Git basics through Claude Code",
      body: [
        "Claude Code can run git directly: checking status, creating branches, staging specific files, writing commit messages, and showing diffs. Because these are real repository operations, treat any state-changing git command the same way you'd treat it from a teammate — worth a glance before it runs, especially anything that rewrites history or touches a shared branch.",
        "A useful pattern: ask Claude to summarize a diff before committing, in plain language, so you're confirming what you think you're confirming rather than rubber-stamping a wall of text. For commit messages, give Claude the 'why' behind a change if it isn't obvious from the diff alone — that context makes for a commit message worth reading in six months.",
        "Destructive operations (force-push, hard reset, discarding uncommitted work) deserve extra caution. A well-behaved agentic workflow treats these as asking-first operations rather than default behavior.",
      ],
    },
    {
      heading: "Reviewing and accepting or rejecting changes",
      body: [
        "Every proposed edit is a diff you get to react to before it's final. Reading a diff well means checking three things: does it do what you asked, does it avoid doing things you didn't ask for (scope creep is a common failure mode), and does it fit the codebase's existing patterns rather than introducing a new one for no reason.",
        "Rejecting or redirecting a change isn't a failure state — it's the loop working as intended. A specific rejection ('this works, but it duplicates logic already in utils/format.ts — reuse that instead') produces a much better second attempt than a vague one ('try again').",
        "For anything you're not confident reviewing yourself (unfamiliar language, subtle concurrency logic, security-sensitive code), it's reasonable to ask Claude to explain the change in more depth, or to run it past a second review pass, before accepting.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "When starting a session in an unfamiliar, existing codebase, what should you do first?",
      options: [
        "Immediately ask for a large refactor",
        "Get oriented: ask about structure, entry points, and build/test commands before making changes",
        "Delete files you don't recognize",
        "Skip reading any files and just guess",
      ],
      correctIndex: 1,
      explanation:
        "Orienting first — structure, entry points, commands — gives both you and Claude the context needed to make good first attempts.",
    },
    {
      id: "q2",
      question: "What belongs in a project's CLAUDE.md file?",
      options: [
        "Nothing — it should always be left empty",
        "Build/test/lint commands, an architecture overview, and conventions worth not re-explaining every session",
        "A full copy of every file in the repo",
        "Only the developer's personal preferences",
      ],
      correctIndex: 1,
      explanation:
        "CLAUDE.md is most useful as durable, team-shared context: commands, architecture, and conventions — not an exhaustive file dump.",
    },
    {
      id: "q3",
      question: "How should Claude Code treat destructive git operations like a force-push or hard reset?",
      options: [
        "As default, silent behavior",
        "As asking-first operations, since they can permanently affect shared or uncommitted work",
        "As something to run automatically after every commit",
        "As irrelevant to review",
      ],
      correctIndex: 1,
      explanation:
        "Destructive, hard-to-reverse git operations warrant explicit confirmation rather than silent execution.",
    },
    {
      id: "q4",
      question: "What makes a code review comment effective when redirecting a proposed change?",
      options: [
        "Being vague, like 'try again'",
        "Being specific about what's wrong and pointing at the fix, e.g. reusing existing logic",
        "Rejecting without any explanation",
        "Always accepting to avoid friction",
      ],
      correctIndex: 1,
      explanation:
        "Specific feedback that names the problem and points toward existing patterns produces a much better next attempt than a vague rejection.",
    },
    {
      id: "q5",
      question: "Project CLAUDE.md vs. a personal developer profile — what's the key difference?",
      options: [
        "There is no difference",
        "Project CLAUDE.md is committed and team-shared; a personal profile is global and applies across all of your projects",
        "Personal profiles override project files entirely and cannot coexist",
        "Project CLAUDE.md is never committed to version control",
      ],
      correctIndex: 1,
      explanation:
        "Project CLAUDE.md is repo-committed, shared context; your personal profile (Module 2.5) is separate, global, and layers on top.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Write a project CLAUDE.md for a real repo",
    scenario:
      "Pick any real or toy repository on your machine (or start a new one). Have Claude Code help you draft a CLAUDE.md at the project root that captures build/test commands, a short architecture overview, and at least one convention. Then use Claude Code to make one small change and review the diff before accepting it.",
    steps: [
      "In a project directory, ask Claude Code to draft a CLAUDE.md covering commands, architecture, and conventions.",
      "Review and edit that file so it's accurate for the real project.",
      "Ask Claude Code to make one small, reviewable change using that context.",
      "Look at the diff yourself before accepting — note what you checked.",
    ],
    submissionLabel:
      "Paste the contents of your CLAUDE.md (or its key sections) plus a short note on the diff you reviewed and why you accepted or redirected it.",
    placeholder:
      "# CLAUDE.md\n\n## Commands\n...\n\n## Architecture\n...\n\n## Conventions\n...\n\nReview note: the diff changed X, I checked Y before accepting because Z.",
    checks: [
      {
        id: "has-commands-section",
        description: "Mentions commands (build, test, lint, run, etc.)",
        type: "includesAny",
        value: ["command", "build", "test", "lint", "npm", "yarn"],
      },
      {
        id: "has-architecture-or-convention",
        description: "Mentions architecture or a convention",
        type: "includesAny",
        value: ["architecture", "convention", "structure", "pattern"],
      },
      {
        id: "review-note",
        description: "Includes a review note about the diff you checked",
        type: "minLength",
        value: 100,
      },
    ],
  },
};
