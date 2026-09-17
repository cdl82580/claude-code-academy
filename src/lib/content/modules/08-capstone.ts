import type { CourseModule } from "../types";

export const module08: CourseModule = {
  slug: "capstone-project",
  order: 9,
  dayRange: "Day 17–20",
  title: "Capstone Project",
  summary:
    "Bring every module together on one real piece of work — a small app built end-to-end, or a meaningful refactor — using Claude Code across the full lifecycle: plan, code, test, debug, document.",
  objectives: [
    "Choose a capstone scope that's real but achievable in the time available",
    "Run the full lifecycle — plan, code, test, debug, document — using Claude Code",
    "Apply prompting, review, testing, and safety practices from every prior module",
    "Produce a finished, documented piece of work you can point to afterward",
  ],
  lessonSections: [
    {
      heading: "Choosing your capstone",
      body: [
        "Pick one of two shapes: build a small app end-to-end (something real enough to have an actual user-facing purpose, small enough to finish in the time you have), or take on a meaningful refactor in an existing repo (a real improvement, not a toy exercise). Either is valid — the goal is applying everything from Modules 1–7 to something with real stakes, not inventing busywork.",
        "Scope it the way Module 3 taught: a clear, bounded definition of done, not an open-ended ambition. 'Build a small habit tracker with add/complete/delete and local persistence' is capstone-sized; 'build the next great productivity platform' is not.",
        "If you're refactoring an existing repo instead, pick something with a genuine before/after you can point to — a slow code path made fast, a tangled module made clear, a missing test suite added around risky code — so the capstone has a concrete result, not just activity.",
      ],
    },
    {
      heading: "Running the full lifecycle",
      body: [
        "Plan: before writing code, use what Module 3 taught — get Claude Code to lay out an approach, confirm the scope, and identify the files or components involved. Code: build incrementally, using CLAUDE.md (Modules 2 and 2.5) so context carries across sessions instead of being re-explained each time. Test: apply Module 5's test-driven loop — tests as an executable definition of done, not an afterthought. Debug: when something breaks, use reproduce → isolate → fix rather than guessing. Document: leave the finished work with a README or CLAUDE.md good enough that someone else (or future you) could pick it up cold.",
        "Treat this as a multi-session project, not one sitting — which means Module 6's context-management practices apply directly: summarize progress between sessions, keep your CLAUDE.md current as the architecture solidifies, and scope each session's work rather than trying to hold the whole project in one conversation.",
        "Review your own diffs the way Module 2 and Module 7 describe: as though someone else will read them, because for the capstone, that's true — this course's checks, and potentially your own future self, will.",
      ],
    },
    {
      heading: "What 'done' looks like",
      body: [
        "A finished capstone has evidence at each lifecycle stage: a plan you can point to, working code, a real test run (not just 'it looked right'), at least one genuine debugging story (even a small one), and documentation someone unfamiliar with the project could use to get oriented. It doesn't need to be large — it needs to be complete across all five stages.",
        "This is also a good moment to revisit your ~/.claude/CLAUDE.md developer profile from Module 2.5: did anything about how you like to work change over the course? A capstone is a natural checkpoint for updating it.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "What are the two valid capstone shapes described in this module?",
      options: [
        "A slide deck, or a spreadsheet",
        "A small app built end-to-end, or a meaningful refactor in an existing repo",
        "A written essay only, no code",
        "A course evaluation form",
      ],
      correctIndex: 1,
      explanation:
        "The capstone is real, applied work: either a small end-to-end app or a genuine refactor with a before/after.",
    },
    {
      id: "q2",
      question: "What makes a capstone scope well-chosen, per Module 3's prompting lessons?",
      options: [
        "As open-ended and ambitious as possible",
        "A clear, bounded definition of done that's achievable in the available time",
        "Undefined, so it can grow indefinitely",
        "Chosen entirely by Claude Code with no input from you",
      ],
      correctIndex: 1,
      explanation:
        "Scoping principles from Module 3 apply directly: a bounded, concrete definition of done beats an open-ended ambition.",
    },
    {
      id: "q3",
      question: "Which five stages make up the capstone's full lifecycle?",
      options: [
        "Design, market, sell, ship, forget",
        "Plan, code, test, debug, document",
        "Install, authenticate, prompt, plan, edit",
        "Read, write, run, review, deploy",
      ],
      correctIndex: 1,
      explanation:
        "The capstone applies plan, code, test, debug, and document — pulling directly from Modules 3, 2/2.5, 5, 5, and 7.",
    },
    {
      id: "q4",
      question: "Why treat the capstone as a multi-session project?",
      options: [
        "Because Module 6's context-management practices (summarizing progress, keeping CLAUDE.md current) apply directly to sustained work",
        "Because it must be finished in a single sitting",
        "Because sessions have no memory at all",
        "Because documentation is unnecessary for multi-session work",
      ],
      correctIndex: 0,
      explanation:
        "A capstone-sized project benefits from the same context-management discipline as any large, multi-session effort covered in Module 6.",
    },
    {
      id: "q5",
      question: "What counts as evidence that a capstone is 'done'?",
      options: [
        "Code that compiles, with nothing else required",
        "A plan, working code, a real test run, a genuine debugging story, and documentation for an unfamiliar reader",
        "Only a final demo video",
        "A single sentence describing the idea",
      ],
      correctIndex: 1,
      explanation:
        "Completeness across all five lifecycle stages — not size — is what defines a finished capstone.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Complete and document your capstone project",
    scenario:
      "Build your capstone — a small end-to-end app or a meaningful refactor — using Claude Code for the full lifecycle. This is the final practicum: pass it, along with every module's quiz, to unlock your certificate of completion.",
    steps: [
      "Choose and scope your capstone (app or refactor).",
      "Plan it with Claude Code before writing code.",
      "Build it incrementally, keeping a CLAUDE.md current as you go.",
      "Test it with a real test-driven loop.",
      "Debug at least one real issue using reproduce → isolate → fix.",
      "Document the finished result for an unfamiliar reader.",
    ],
    submissionLabel:
      "Paste a summary covering all five lifecycle stages: what you planned, what you built, how you tested it, one debugging story, and a link or excerpt from your documentation.",
    placeholder:
      "Plan: I chose to build/refactor...\nCode: I implemented...\nTest: I wrote tests for... and ran them, result...\nDebug: I hit an issue where..., reproduced it by..., isolated it to..., fixed it by...\nDocument: I wrote a README/CLAUDE.md covering...",
    checks: [
      {
        id: "has-plan",
        description: "Includes a plan section",
        type: "includesAny",
        value: ["plan"],
      },
      {
        id: "has-test-and-debug",
        description: "Includes both testing and debugging evidence",
        type: "includesAll",
        value: ["test", "debug"],
      },
      {
        id: "has-document",
        description: "Includes a documentation section",
        type: "includesAny",
        value: ["document", "readme", "claude.md"],
      },
      {
        id: "sufficient-detail",
        description: "Overall submission is substantial",
        type: "minLength",
        value: 200,
      },
    ],
  },
};
