import type { CourseModule } from "../types";

export const module025: CourseModule = {
  slug: "claude-md-and-developer-profile",
  order: 3,
  dayRange: "Day 5–6",
  title: "Making CLAUDE.md Reusable & Building Your Developer Profile",
  summary:
    "Understand how CLAUDE.md files layer (project vs. global), and build a personal developer profile that carries your preferences into every project.",
  objectives: [
    "Explain how project and user/global CLAUDE.md files layer together",
    "Build a personal ~/.claude/CLAUDE.md developer profile",
    "Reuse a CLAUDE.md starter template across new projects",
    "Understand how CLAUDE.md files resolve hierarchically in a monorepo",
  ],
  lessonSections: [
    {
      heading: "How CLAUDE.md layers work",
      body: [
        "There are two scopes. Project CLAUDE.md lives at ./CLAUDE.md, is committed to the repo, and holds team-shared conventions, architecture, and commands — it's loaded automatically for anyone working in that directory tree. User/global CLAUDE.md lives at ~/.claude/CLAUDE.md, holds your personal preferences, and applies across every project you work in — it is not committed anywhere, because it's about you, not the codebase.",
        "The two stack rather than compete: the global file loads first, establishing your baseline preferences, and the project file layers on top, able to override specifics for that codebase. A global preference like 'default to concise explanations' applies everywhere unless a specific project's CLAUDE.md says otherwise for a good reason.",
        "This separation matters because it lets you write project context once per project (for your team) and personal context once, ever (for yourself) — instead of re-explaining your own preferences inside every project file, which then goes stale the moment your preferences change.",
      ],
    },
    {
      heading: "Building your personal developer profile",
      body: [
        "A useful ~/.claude/CLAUDE.md profile typically covers five things. About me: preferred languages/stacks, your experience level, and things you don't want re-explained. Workflow preferences: concrete defaults like 'always use bun, not npm' or 'run tests before suggesting a commit.' Communication style: how verbose you want explanations, and whether you prefer a menu of options or a straight recommendation. Common commands/aliases: shortcuts that show up across most of your repos — linters, test runners, deploy scripts. Debugging habits: how you want errors diagnosed, e.g. reproduce first, then isolate.",
        "Write it like you're briefing a new collaborator who will work with you across many different projects, not one specific codebase. The value compounds: every new project starts with your baseline already in place.",
        "Revisit it occasionally. As your preferences change — a new default stack, a new debugging habit that's worked well — update the one file rather than letting a stale preference quietly apply everywhere. A real one might look like this:",
      ],
      examples: [
        {
          label: "~/.claude/CLAUDE.md",
          code: `# ~/.claude/CLAUDE.md

## About me
Senior backend engineer, most comfortable in Python and Go. Don't
re-explain basic language syntax — do explain framework-specific
conventions I might not know yet.

## Workflow preferences
- Always use pnpm, never npm or yarn.
- Run the test suite before proposing a commit.
- Prefer small, incremental diffs over large rewrites.

## Communication style
Give a direct recommendation, not a menu of options, unless I ask
for tradeoffs.

## Common commands
- Lint: \`pnpm lint\`
- Tests: \`pnpm test\`

## Debugging habits
Always reproduce the failure first. Don't propose a fix before you
can reliably trigger the bug.`,
        },
      ],
    },
    {
      heading: "A reusable project template pattern",
      body: [
        "Keep a personal CLAUDE.md starter template — in a dotfiles repo or a gist — with sections stubbed out for Commands, Architecture, and Conventions. When you start a new project, copy the template in and fill in the specifics for that codebase. This keeps every project's file structurally consistent and much faster to write than starting from a blank page each time.",
        "A consistent structure also pays off when you're the one reading someone else's project CLAUDE.md months later, or when a teammate is reading yours — familiar headings mean faster orientation.",
      ],
    },
    {
      heading: "Monorepos: hierarchical resolution",
      body: [
        "CLAUDE.md files are read hierarchically up the directory tree, and subdirectory files load on demand as you work in that area of the repo. The practical implication: put shared, repo-wide conventions at the root, and put overrides or package-specific details deeper in the tree, next to the code they describe.",
        "This mirrors how most engineers already think about monorepo documentation — root-level docs for what's true everywhere, package-level docs for what's true locally — so CLAUDE.md placement should follow the same instinct rather than inventing a new mental model.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "Where does a personal developer profile live, and is it committed to a repo?",
      options: [
        "./CLAUDE.md, and yes, it's committed",
        "~/.claude/CLAUDE.md, and no, it's not committed anywhere — it's personal, not project-specific",
        "It doesn't have a fixed location",
        "It lives inside package.json",
      ],
      correctIndex: 1,
      explanation:
        "The global developer profile lives at ~/.claude/CLAUDE.md and is intentionally not committed, since it describes you, not any one project.",
    },
    {
      id: "q2",
      question: "When the global and project CLAUDE.md files conflict, what happens?",
      options: [
        "The global file always wins with no exceptions",
        "The global file loads first as a baseline, and the project file layers on top and can override specifics",
        "Both are ignored",
        "Only the most recently edited file is used",
      ],
      correctIndex: 1,
      explanation:
        "Global loads first, establishing defaults; the project file layers on top and can override for that specific codebase.",
    },
    {
      id: "q3",
      question: "Which of these belongs in a personal developer profile rather than a project CLAUDE.md?",
      options: [
        "The project's build command",
        "Your preference for concise explanations and always using a specific package manager",
        "The project's folder structure",
        "A specific API endpoint's schema",
      ],
      correctIndex: 1,
      explanation:
        "Personal workflow and communication preferences apply across all your projects and belong in the global profile, not a single project's file.",
    },
    {
      id: "q4",
      question: "In a monorepo, where should repo-wide shared conventions live?",
      options: [
        "Duplicated in every package's CLAUDE.md",
        "At the root, with package-specific overrides placed deeper in the tree",
        "Nowhere — monorepos can't use CLAUDE.md",
        "Only in the personal global profile",
      ],
      correctIndex: 1,
      explanation:
        "CLAUDE.md resolves hierarchically: root-level for what's true everywhere, deeper files for local overrides.",
    },
    {
      id: "q5",
      question: "What's the benefit of keeping a reusable CLAUDE.md starter template?",
      options: [
        "It guarantees every project has identical code",
        "It keeps every project's file structurally consistent and faster to write by starting from stubbed sections",
        "It replaces the need for a global profile",
        "It prevents Claude Code from reading the file",
      ],
      correctIndex: 1,
      explanation:
        "A starter template with stubbed Commands/Architecture/Conventions sections speeds up writing a good project file and keeps them consistent.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Write your developer profile and prove it carries over",
    scenario:
      "Write your own ~/.claude/CLAUDE.md developer profile, then spin up two different toy projects and confirm your global preferences carry over into both while each project's own CLAUDE.md stays separate — exactly as described in the syllabus exercise for this module.",
    steps: [
      "Write ~/.claude/CLAUDE.md covering: about me, workflow preferences, communication style, common commands, and debugging habits.",
      "Create (or reuse) two different toy project directories, each with its own project-level CLAUDE.md containing something specific to that project only.",
      "Start a Claude Code session in each project and confirm your global preferences show up in both, while the project-specific content stays distinct per project.",
    ],
    submissionLabel:
      "Paste your ~/.claude/CLAUDE.md content, and briefly describe what you observed carrying over into both toy projects.",
    placeholder:
      "# ~/.claude/CLAUDE.md\n\n## About me\n...\n\n## Workflow preferences\n...\n\n## Communication style\n...\n\nObservation: in both project A and project B, Claude...",
    checks: [
      {
        id: "has-about-me",
        description: "Includes an 'about me' style section",
        type: "includesAny",
        value: ["about me", "experience", "preferred language", "stack"],
      },
      {
        id: "has-workflow-prefs",
        description: "Includes a workflow or communication preference",
        type: "includesAny",
        value: ["prefer", "always use", "workflow", "communication", "concise", "verbose"],
      },
      {
        id: "has-two-project-evidence",
        description: "Describes observing the profile carry over across two projects",
        type: "includesAny",
        value: ["project a", "project b", "both projects", "two projects", "toy project"],
      },
      {
        id: "sufficient-detail",
        description: "Overall submission has enough detail for a full profile plus observations",
        type: "minLength",
        value: 200,
      },
    ],
  },
};
