import type { CourseModule } from "../types";

export const module01: CourseModule = {
  slug: "foundations",
  order: 1,
  dayRange: "Day 1–2",
  title: "Foundations",
  summary:
    "What Claude Code is, where it fits in your workflow, and the core loop you'll use in every session: prompt, plan, edit, verify.",
  objectives: [
    "Explain what Claude Code is and how it differs from autocomplete-style assistants",
    "Install Claude Code and authenticate your first session",
    "Describe the prompt → plan → edit → verify loop",
    "Use Claude Code to read files, write files, and run shell commands",
  ],
  lessonSections: [
    {
      heading: "What Claude Code is, and where it fits",
      body: [
        "Claude Code is an agentic coding tool: instead of just suggesting the next line of code, it can read your files, make a plan, edit multiple files, run commands in your terminal, and check its own work — all inside a conversation with you. Where an autocomplete tool predicts a token at your cursor, Claude Code operates over your whole project: it can open files you haven't mentioned, run your test suite, and follow multi-step instructions across a session.",
        "You'll typically meet it in one of three places: the command line (the primary interface, run from your project directory), inside an IDE via an extension (VS Code, JetBrains) so edits show up as a diff in your editor, or embedded in an automated workflow (CI, hooks, scripts) where it runs non-interactively. This course focuses mainly on the CLI, since the concepts transfer directly to the IDE and automated contexts.",
        "The key mental shift from traditional tools: you are directing an agent, not typing code yourself and occasionally accepting a suggestion. That means your job shifts toward framing tasks clearly, giving the right context, and reviewing output — skills this course builds deliberately, starting in Module 3.",
      ],
    },
    {
      heading: "Installing and authenticating",
      body: [
        "Claude Code installs as a CLI tool via your package manager of choice (npm, or a native installer depending on platform). Once installed, running it for the first time walks you through authentication — connecting it to your Anthropic account or your organization's Claude access — after which it remembers your session for future runs in that environment.",
        "After installing, navigate to any project directory in your terminal and start a session. Claude Code will orient itself: it can see the files in that directory and its subdirectories, but it won't read or change anything until you ask it to, or until it decides a step requires it — for example, reading a file to answer your question.",
        "First-run checklist: confirm the CLI is on your PATH, confirm authentication succeeded, and try a trivial first prompt (like asking it to summarize the project's README) to confirm it can see your files before you trust it with real work.",
      ],
    },
    {
      heading: "The core loop: prompt → plan → edit → verify",
      body: [
        "Every productive Claude Code session follows the same shape. You prompt: state what you want, with enough context that the request is unambiguous. Claude plans: for anything beyond a trivial change, it lays out the steps it intends to take — which files it'll touch, in what order — before touching anything, so you can redirect it early and cheaply. Claude edits: it makes the actual file changes and, when relevant, runs commands (installing a dependency, running a build). You verify: you review the diff, run the tests yourself or ask Claude to, and either accept the work or send it back with feedback.",
        "The 'verify' step is not optional. Claude Code is capable of writing plausible-looking code that is nonetheless wrong — the same way a capable junior engineer can misunderstand a requirement. Treat every session as a collaboration where you retain final review authority, especially for anything that touches production paths, data, or security boundaries.",
        "This loop scales down to a one-line fix and up to a multi-day refactor — the difference is how much planning and how many verify checkpoints you insert along the way. Small tasks might compress prompt → edit → verify into one exchange; large tasks (covered in Module 6) deliberately slow the loop down.",
      ],
    },
    {
      heading: "Reading files, writing files, and running commands",
      body: [
        "Three primitives cover almost everything Claude Code does to your project: reading a file's contents so it has real information instead of guessing, writing or editing a file to make an actual change, and running a shell command to install packages, run tests, check git status, or start a dev server. You'll see this pattern named directly in this course as read / write / run.",
        "Because these actions can change your filesystem or execute code, Claude Code asks for your permission before taking actions outside a safe default set (see Module 4 for the full permissions model). Early on, expect to see and approve individual file edits and commands — this is a feature, not friction: it's your checkpoint to catch a misunderstanding before it becomes a wasted diff. Make sure 'bypass permissions' mode is off while you work through this course — it skips those prompts entirely, which means skipping the exact moments this course's practicums ask you to pay attention to.",
        "A good first exercise is asking Claude Code to explain a file to you (pure read), then asking it to fix a small, well-defined bug (read + write), then asking it to run your test suite and report the result (run). Doing these separately builds intuition for which primitive is happening at each step of a larger task.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question:
        "What most distinguishes Claude Code from a simple autocomplete-style coding assistant?",
      options: [
        "It only works inside a browser tab",
        "It can read and write files and run shell commands across a project, not just suggest the next token",
        "It requires no review of its output",
        "It only supports one programming language",
      ],
      correctIndex: 1,
      explanation:
        "Claude Code is agentic: it can act across your whole project — reading files, editing multiple of them, and running commands — rather than only predicting the next few tokens at your cursor.",
    },
    {
      id: "q2",
      question: "Where can you use Claude Code?",
      options: [
        "Only in a dedicated desktop app with no terminal access",
        "The command line, an IDE extension, and embedded in automated workflows like CI or hooks",
        "Only inside spreadsheet software",
        "Only on files smaller than 100 lines",
      ],
      correctIndex: 1,
      explanation:
        "Claude Code's primary interface is the CLI, but the same agent shows up as an IDE extension and can run non-interactively in automation.",
    },
    {
      id: "q3",
      question: "In the prompt → plan → edit → verify loop, what is the purpose of the 'plan' step?",
      options: [
        "To skip verification entirely",
        "To let you redirect the approach before any files are touched, when redirecting is cheapest",
        "To automatically deploy the change to production",
        "To generate documentation only, never code",
      ],
      correctIndex: 1,
      explanation:
        "Planning surfaces the intended approach and file list before edits happen, so misunderstandings get caught while they're still cheap to fix.",
    },
    {
      id: "q4",
      question: "Why is the 'verify' step non-optional?",
      options: [
        "Because Claude Code cannot run tests itself",
        "Because plausible-looking output can still be wrong, so human review remains the final check",
        "Because it is required by the installer",
        "Because it only applies to CSS changes",
      ],
      correctIndex: 1,
      explanation:
        "Agentic tools can produce confident, well-formatted, and still-incorrect changes. Verification is how you catch that before it ships.",
    },
    {
      id: "q5",
      question:
        "What are the three primitives that cover most of what Claude Code does to a project?",
      options: [
        "Read, write, and run",
        "Compile, minify, and deploy",
        "Login, logout, and refresh",
        "Draw, animate, and render",
      ],
      correctIndex: 0,
      explanation:
        "Reading files, writing/editing files, and running shell commands are the building blocks nearly every Claude Code task is composed from.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Run your first read → write → run session",
    scenario:
      "In a real terminal, install Claude Code (or open an existing installation), point it at any project directory (a toy project is fine), and run through all three primitives in one session: ask it to read and summarize a file, ask it to make one small edit, and ask it to run a command (e.g. list files, run a test, or check git status).",
    steps: [
      "Open a terminal and start a Claude Code session inside a project directory.",
      "Ask Claude to read and summarize one real file from that project (a pure read action).",
      "Ask Claude to make one small, well-defined edit to a file (a write action) — for example, adding a comment or fixing a typo.",
      "Ask Claude to run a shell command, such as listing files or running a test/build command (a run action), and report the result back to you.",
      "Copy the key excerpts below to show your evidence.",
    ],
    submissionLabel:
      "Paste the file summary Claude gave you, a short description of the edit it made, and the command + output from the run step.",
    placeholder:
      "e.g. Summary: this file exports a React component that...\nEdit: added a one-line comment above the function...\nCommand run: npm test — output: 3 passed, 0 failed...",
    checks: [
      {
        id: "mentions-summary",
        description: "Includes evidence of a file being read/summarized",
        type: "minLength",
        value: 80,
      },
      {
        id: "mentions-command",
        description: "Mentions a command that was run (e.g. test, ls, git, npm, build)",
        type: "includesAny",
        value: ["test", "ls", "git", "npm", "build", "run", "yarn", "pnpm"],
      },
      {
        id: "mentions-edit",
        description: "Describes an edit or change that was made to a file",
        type: "includesAny",
        value: ["edit", "change", "added", "fixed", "wrote", "updated", "comment"],
      },
    ],
  },
};
