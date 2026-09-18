import type { CourseModule } from "../types";

export const module06: CourseModule = {
  slug: "multi-file-and-large-scale-changes",
  order: 7,
  dayRange: "Day 13–14",
  title: "Multi-file & Large-scale Changes",
  summary:
    "Handle refactors that span many files, run migration tasks safely, and manage context limits when a codebase is bigger than any one session can hold.",
  objectives: [
    "Plan and execute a refactor across many files",
    "Approach a framework or library migration methodically",
    "Manage context limits when working on a large codebase",
  ],
  lessonSections: [
    {
      heading: "Refactors across many files",
      body: [
        "A refactor that touches dozens of files is really a sequencing problem more than a coding problem. Start by asking Claude Code to find every affected location (a search/read pass) before any edits happen, so you both have an accurate map of the blast radius rather than discovering scope mid-change.",
        "Break the refactor into independently reviewable chunks where possible — by directory, by module, or by pattern — rather than one enormous diff. Smaller, coherent chunks are easier to verify, easier to revert individually if one chunk goes wrong, and easier to land incrementally if the codebase is under active development elsewhere.",
        "For mechanical renames or pattern replacements, be explicit about the exact pattern and its exceptions — mechanical work benefits from precise direction more than open-ended planning:",
      ],
      examples: [
        {
          label: "Scoped refactor prompt",
          code: "Rename formatDate to formatDateTime everywhere it's used, except in src/legacy/ which is being deprecated separately. Show me the full list of affected files before making any changes.",
        },
      ],
    },
    {
      heading: "Migration tasks: framework and library upgrades",
      body: [
        "Migrations combine two hard things: they touch a lot of code, and the correctness bar is 'behaves identically, just on the new version' rather than 'does something new' — which makes silent regressions the main risk rather than obvious breakage. Start with the migration guide or changelog for the specific version jump, and have Claude Code map that guide's changes onto your actual codebase's usage patterns.",
        "A staged approach beats a single giant migration commit: get the dependency updated and the build green first, then work through deprecation warnings or behavior changes file by file or feature by feature, verifying as you go rather than batching every change together and debugging a wall of failures at the end.",
        "Keep the test suite as your safety net through a migration — if coverage is thin in the area you're migrating, it's often worth strengthening it before the migration starts, not after something breaks in production.",
      ],
    },
    {
      heading: "Managing context limits on big codebases",
      body: [
        "No session holds an entire large codebase in view at once — Claude Code reads what's relevant on demand rather than the whole repository up front, so how you scope a task determines how well it can reason about it. For big tasks, point directly at the relevant directories or files rather than relying on a broad, unscoped search to find them.",
        "Long sessions accumulate context, and old context can crowd out room for new information or become less relevant as the task evolves. For a large, multi-day effort, it often helps to periodically summarize progress and start a fresher session from that summary rather than one continuously growing conversation:",
      ],
      examples: [
        {
          label: "Session handoff summary",
          code: `Progress so far:
- Migrated src/api/users.js and src/api/orders.js to the new client
- Still need: src/api/payments.js, src/api/webhooks.js
- Decision: keeping the old retry wrapper, don't reintroduce it`,
        },
      ],
    },
    {
      heading: "Letting CLAUDE.md do some of the work",
      body: [
        "CLAUDE.md pulls its weight here too: a good architecture overview means Claude Code needs to discover less from scratch every session, which effectively stretches how far a limited context window goes on a large project.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "What's the recommended first step before making edits in a large, multi-file refactor?",
      options: [
        "Start editing the first file you think of",
        "Find every affected location first, so you have an accurate map of the blast radius",
        "Skip planning and let the diff grow organically",
        "Delete the files being refactored and start over",
      ],
      correctIndex: 1,
      explanation:
        "Mapping the full scope before editing avoids discovering the true size of the change mid-refactor.",
    },
    {
      id: "q2",
      question: "Why break a large refactor into independently reviewable chunks?",
      options: [
        "It makes the diff bigger and harder to follow",
        "Smaller chunks are easier to verify, revert individually, and land incrementally",
        "It's required by every version control system",
        "It has no practical benefit",
      ],
      correctIndex: 1,
      explanation:
        "Coherent, smaller chunks reduce review burden and risk compared to one enormous, all-at-once diff.",
    },
    {
      id: "q3",
      question: "What is the main risk during a framework or library migration?",
      options: [
        "The app becoming too fast",
        "Silent regressions, since the correctness bar is 'behaves identically on the new version'",
        "There being too many new features",
        "The build succeeding too early",
      ],
      correctIndex: 1,
      explanation:
        "Migrations aim for identical behavior on a new foundation, so silent regressions — not obvious new bugs — are the main hazard.",
    },
    {
      id: "q4",
      question: "What's a good practice if test coverage is thin in an area about to be migrated?",
      options: [
        "Proceed without any tests",
        "Strengthen coverage before the migration starts, not after something breaks",
        "Remove the existing tests to simplify the migration",
        "Migrate a different, unrelated part of the codebase instead",
      ],
      correctIndex: 1,
      explanation:
        "Strong test coverage acts as a safety net during a migration; it's more valuable added before the migration than discovered missing after a break.",
    },
    {
      id: "q5",
      question: "Why does a good CLAUDE.md architecture overview help on a large codebase?",
      options: [
        "It has no effect on how Claude Code works",
        "It means Claude Code needs to discover less from scratch each session, stretching a limited context window further",
        "It replaces the need for any tests",
        "It automatically fixes bugs",
      ],
      correctIndex: 1,
      explanation:
        "Durable architectural context reduces how much a session has to rediscover on its own, making better use of limited context.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Plan a multi-file refactor before touching code",
    scenario:
      "Pick a plausible multi-file refactor in a real or toy project (e.g. renaming a widely-used function, extracting a shared utility, or updating an import pattern across many files). Have Claude Code map every affected location first, then break the work into reviewable chunks — without necessarily executing the whole thing.",
    steps: [
      "Choose a refactor that would plausibly touch many files.",
      "Ask Claude Code to find every affected location before any edits.",
      "Break the full scope into 2 or more independently reviewable chunks.",
      "Execute at least one chunk and review its diff.",
    ],
    submissionLabel:
      "Paste the list of affected locations Claude found, how you chunked the work, and the result of executing at least one chunk.",
    placeholder:
      "Refactor: rename formatDate to formatDateTime\nAffected locations found: ...\nChunking plan: chunk 1 = src/components, chunk 2 = src/utils...\nChunk 1 result: ...",
    checks: [
      {
        id: "has-affected-locations",
        description: "Lists affected locations found before editing",
        type: "includesAny",
        value: ["affected", "found", "location", "files"],
      },
      {
        id: "has-chunking",
        description: "Describes breaking the work into chunks",
        type: "includesAny",
        value: ["chunk", "phase", "step 1", "part 1"],
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
