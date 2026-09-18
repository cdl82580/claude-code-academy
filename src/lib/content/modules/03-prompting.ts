import type { CourseModule } from "../types";

export const module03: CourseModule = {
  slug: "effective-prompting",
  order: 4,
  dayRange: "Day 6–7",
  title: "Effective Prompting & Task Framing",
  summary:
    "The highest-leverage skill in this course: framing tasks so Claude Code's first attempt is usually right, and iterating productively when it isn't.",
  objectives: [
    "Break large tasks into scoped steps",
    "Decide when to let Claude plan versus when to direct it",
    "Supply good context: error messages, logs, and specs",
    "Iterate on a failed attempt productively instead of restarting from scratch",
  ],
  lessonSections: [
    {
      heading: "Breaking large tasks into scoped steps",
      body: [
        "'Add authentication' and 'add an email/password login form that posts to /api/login and redirects to /dashboard on success' are the same goal at two different altitudes — and the second one gets a correct first attempt far more often. Scoping isn't about micromanaging every line; it's about giving the agent a boundary it can't accidentally wander outside of.",
        "A reliable technique for large work: ask for a plan before any edits happen, review the proposed steps, then approve or adjust the plan, then let execution proceed step by step. This front-loads your highest-leverage moment of control to when it's cheapest — before any code exists.",
        "Watch for tasks that are secretly two or three tasks. 'Fix the bug and clean up the file while you're in there' is a common source of scope creep and larger, harder-to-review diffs than necessary — it's usually better as two explicit requests. Side by side, the difference in a real prompt is stark:",
      ],
      examples: [
        { label: "Vague", code: "Add authentication" },
        {
          label: "Scoped",
          code: "Add an email/password login form that posts to /api/login and redirects to /dashboard on success. Use the existing form styling in src/components/ui/. Don't touch the signup flow.",
        },
      ],
    },
    {
      heading: "When to let Claude plan vs. when to direct it",
      body: [
        "For open-ended or unfamiliar territory — 'why is this endpoint slow' — letting Claude investigate and propose a plan usually beats prescribing the fix yourself, since it can gather evidence (logs, profiling, code paths) you haven't looked at yet. For well-understood, mechanical work — 'rename this variable across the file' — directing precisely wastes less time than an open-ended planning phase.",
        "A good heuristic: if you could write the step-by-step plan yourself in under a minute, just direct. If you'd need to investigate first, let Claude plan — that's exactly the investigation it's suited for.",
        "You can also blend the two: direct the overall shape ('use the existing repository pattern in db/repositories, don't introduce a new data-access style') while leaving Claude to plan the mechanical details within that boundary.",
      ],
    },
    {
      heading: "Giving good context",
      body: [
        "Context is the difference between a guess and a diagnosis. When something's broken, paste the actual error message and stack trace rather than paraphrasing it — paraphrasing loses the specific line numbers, types, and wording that often contain the real clue. The same goes for logs: the surrounding lines before a failure are frequently more informative than the failure line itself.",
        "When building something new, a short spec beats a vague goal: what the inputs and outputs are, any constraints (performance, existing patterns to follow, libraries to avoid), and what 'done' looks like. You don't need a formal document — three or four sentences of real constraints outperform a one-line wish.",
        "If you have relevant files that aren't obviously connected to the request — a similar feature elsewhere in the codebase, a design doc, an existing test — point at them explicitly. Claude Code won't know to guess that they're relevant unless you say so.",
      ],
    },
    {
      heading: "Iterating on failed attempts productively",
      body: [
        "A failed first attempt is information, not a dead end. The productive move is rarely 'try again' — it's naming specifically what's wrong: which behavior was incorrect, what you expected instead, and if you know it, why. That turns a retry into a correction instead of a repeat of the same guess:",
      ],
      examples: [
        { label: "Vague retry", code: "Try again" },
        {
          label: "Specific correction",
          code: "This works, but it duplicates the date-formatting logic already in src/lib/format.ts — reuse formatDate from there instead of reimplementing it.",
        },
      ],
    },
    {
      heading: "Changing strategy, not just retrying",
      body: [
        "When an attempt fails repeatedly on the same issue, that's a signal to change strategy rather than keep nudging: provide the missing context you've been withholding, narrow the scope further, or step in and investigate one layer yourself before handing it back.",
        "It's worth explicitly telling Claude when a previous approach is now off the table ('don't try adding a new dependency for this — we've decided against it') so it doesn't retread the same rejected path in a different form.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question:
        "Which of these is the better-scoped version of a task request?",
      options: [
        "\"Add authentication\"",
        "\"Add an email/password login form that posts to /api/login and redirects to /dashboard on success\"",
        "\"Make the app more secure\"",
        "\"Fix everything wrong with login\"",
      ],
      correctIndex: 1,
      explanation:
        "A scoped request names the concrete behavior, endpoint, and success condition — giving the agent a boundary rather than an open-ended goal.",
    },
    {
      id: "q2",
      question: "What's a good heuristic for deciding whether to let Claude plan or to direct it precisely?",
      options: [
        "Always let it plan, regardless of the task",
        "If you could write the step-by-step plan yourself in under a minute, direct it; if you'd need to investigate first, let it plan",
        "Never let it plan; always direct every step",
        "Flip a coin",
      ],
      correctIndex: 1,
      explanation:
        "Well-understood, mechanical work is faster to direct; unfamiliar or investigative work benefits from letting Claude gather evidence and propose a plan.",
    },
    {
      id: "q3",
      question: "When something is broken, what's the best way to give context about the failure?",
      options: [
        "Paraphrase the error message from memory",
        "Paste the actual error message and stack trace, plus surrounding log lines",
        "Just say 'it doesn't work'",
        "Withhold the error to avoid biasing the response",
      ],
      correctIndex: 1,
      explanation:
        "Exact error text and surrounding logs preserve details — line numbers, types, wording — that a paraphrase loses and that often contain the real clue.",
    },
    {
      id: "q4",
      question: "After a failed first attempt, what's the most productive next move?",
      options: [
        "Say 'try again' with no further detail",
        "Name specifically what was wrong, what you expected instead, and why if you know it",
        "Restart the whole session with no memory of the attempt",
        "Immediately give up on the task",
      ],
      correctIndex: 1,
      explanation:
        "Specific correction turns a retry into a targeted fix, rather than repeating the same guess with different wording.",
    },
    {
      id: "q5",
      question: "Why is 'fix the bug and clean up the file while you're in there' often a problematic request?",
      options: [
        "It's actually the ideal way to phrase every request",
        "It bundles two different tasks into one, leading to scope creep and a larger, harder-to-review diff",
        "It's too short to be understood",
        "It never produces a working result",
      ],
      correctIndex: 1,
      explanation:
        "Bundling unrelated goals produces larger, mixed-purpose diffs that are harder to review — usually better split into two explicit requests.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Rewrite a vague task into a scoped one, then iterate on a failure",
    scenario:
      "Take a vague task you might normally hand to Claude Code (e.g. 'make the API better') and rewrite it as a well-scoped request. Run it. Then deliberately give feedback on one thing you'd change, and capture the corrected result.",
    steps: [
      "Write down a vague version of a real or plausible task.",
      "Rewrite it as a scoped request: concrete behavior, files/areas involved, and a definition of done.",
      "Run the scoped request with Claude Code.",
      "Give one specific, targeted piece of feedback on the result (even if the result was already good, request one real refinement) and capture the follow-up response.",
    ],
    submissionLabel:
      "Paste the vague version, your scoped rewrite, and the specific feedback you gave plus what changed as a result.",
    placeholder:
      "Vague: make the API better\nScoped: ...\nFeedback given: ...\nResult after feedback: ...",
    checks: [
      {
        id: "has-vague-and-scoped",
        description: "Includes both a vague version and a scoped rewrite",
        type: "includesAny",
        value: ["vague", "scoped"],
      },
      {
        id: "has-feedback",
        description: "Describes specific feedback given after a first attempt",
        type: "includesAny",
        value: ["feedback", "instead", "expected", "corrected"],
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
