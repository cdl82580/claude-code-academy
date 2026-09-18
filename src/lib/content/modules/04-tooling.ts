import type { CourseModule } from "../types";

export const module04: CourseModule = {
  slug: "tooling-and-extensions",
  order: 5,
  dayRange: "Day 8–10",
  title: "Tooling & Extensions",
  summary:
    "Extend Claude Code beyond the default toolset: custom slash commands, MCP servers for external tools and data, automation hooks, and the permissions model that keeps it all safe.",
  objectives: [
    "Create and use custom slash commands",
    "Explain what MCP servers are and why you'd connect one",
    "Use hooks to automate actions around Claude Code's behavior",
    "Understand permissions and safe-mode settings",
  ],
  lessonSections: [
    {
      heading: "Custom slash commands",
      body: [
        "Slash commands are shortcuts for prompts you'd otherwise type out repeatedly — a saved, reusable instruction you invoke with a short name instead of re-explaining it every time. If you find yourself typing a similar multi-sentence instruction across sessions ('review this diff for security issues and check for missing error handling'), that's a candidate for a slash command.",
        "Good candidates for custom commands are repeatable, well-defined workflows: a project-specific release checklist, a standard code-review pass, a way of generating a status update from recent activity. The payoff compounds the more often you'd otherwise retype the same instruction.",
        "Treat your set of custom commands as living tooling, the same way you'd treat scripts in a package.json — prune ones you stop using, and promote a prompt to a command as soon as you've typed it out for the third time.",
        "Concretely, a slash command is a Markdown file: one at `.claude/commands/<name>.md` in a project (shared with the team, since it's committed), or at `~/.claude/commands/<name>.md` for a personal one that follows you across projects. The filename becomes the command name, and the file's contents are the prompt that gets sent when you type it — for example, this file makes `/review` available in any session:",
      ],
      examples: [
        {
          label: ".claude/commands/review.md",
          code: `Review the current diff for:
- Security issues (injection, missing auth checks, secrets)
- Missing error handling
- Missing test coverage

List findings as bullets, most severe first.`,
        },
      ],
    },
    {
      heading: "Passing arguments to a command",
      body: [
        "A command can take arguments with the `$ARGUMENTS` placeholder, which gets replaced with whatever you type after the command name. Typing `/fix-issue 142` runs the file below with `$ARGUMENTS` replaced by `142`:",
      ],
      examples: [
        {
          label: ".claude/commands/fix-issue.md",
          code: `Fix issue $ARGUMENTS:
1. Read the issue description and reproduce the problem
2. Find the relevant code
3. Implement a fix
4. Add a regression test that would have caught this bug`,
        },
      ],
    },
    {
      heading: "MCP servers: connecting external tools and data",
      body: [
        "The Model Context Protocol (MCP) is how Claude Code connects to tools and data sources outside your local filesystem — a project tracker, a database, a design tool, an internal API. An MCP server exposes a set of capabilities (read a ticket, query a table, fetch a design file) that Claude Code can then use inside a session, the same way it uses read/write/run on your local files.",
        "The practical benefit: instead of manually copying context out of another tool and pasting it into your terminal, you connect the tool once and reference it directly — 'look at the failing job in our CI dashboard' becomes something Claude Code can actually go do, if an MCP server for that dashboard is connected.",
        "Because an MCP server can grant real access to real systems, connecting one is a trust decision: only connect servers you understand the scope of, and be mindful that any data it can reach becomes something Claude Code can read or, for write-capable servers, change.",
      ],
    },
    {
      heading: "Hooks: automating around Claude Code",
      body: [
        "Hooks let you run your own commands automatically at specific points in Claude Code's workflow — for example, before a tool call, after a session ends, or when specific events occur. This is how you enforce something every time without relying on remembering to ask for it: running a linter after every file edit, or logging every command that gets executed.",
        "Hooks are a good fit for guardrails and consistency, not for creative work — use them for the mechanical, always-do-this rules (formatting, logging, notifications) and leave judgment calls to the conversation itself.",
        "Because hooks run automatically and can execute arbitrary commands, write them defensively: fail loudly rather than silently, and avoid a hook that could itself take a destructive action without a human in the loop.",
        "Hooks are configured in `.claude/settings.json`, under a `hooks` key. Each entry is keyed by event name (like `PostToolUse`), matches specific tools with a `matcher` pattern, and runs a real shell command — this example runs a formatter after every file edit or write, automatically. Hook configuration is one of the areas most likely to have changed since this was written, so confirm the exact event names and JSON shape against `claude --help` or Anthropic's current documentation before relying on the field names below.",
      ],
      examples: [
        {
          label: ".claude/settings.json",
          code: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write ." }
        ]
      }
    ]
  }
}`,
        },
      ],
    },
    {
      heading: "Permissions and safe-mode settings",
      body: [
        "Claude Code's permission system decides which actions happen automatically and which require your explicit approval first. By default, actions that are easy to reverse (reading a file, running a read-only command) are more likely to proceed without a prompt, while actions that are harder to reverse or that touch things outside the current project get a confirmation step.",
        "You can configure permissions to fit your risk tolerance and the project's sensitivity — tightening them for a production-adjacent repo, or loosening specific, well-understood commands you're comfortable auto-approving in a low-stakes sandbox project.",
        "The point of the permission system isn't to slow you down for its own sake — it's to put a checkpoint exactly at the actions with the highest blast radius (deleting data, pushing code, spending money, changing settings), so your attention goes where it matters most instead of being spent equally everywhere.",
        "Claude Code also offers a 'bypass permissions' mode that skips these confirmation prompts entirely, running every action automatically. Experienced users sometimes reach for it in low-stakes, sandboxed work to move faster — but turn it off while you're learning. This course's practicums are built around watching what Claude Code proposes before it happens: the plan it lays out, the diff it wants to apply, the exact command it's about to run. Bypass mode skips past all of that, so you'd finish the hands-on work without ever seeing the thing it's meant to teach.",
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      question: "What is a custom slash command best used for?",
      options: [
        "A one-time task you'll never repeat",
        "A reusable, well-defined instruction you'd otherwise retype across many sessions",
        "Deleting files permanently",
        "Only for formatting code",
      ],
      correctIndex: 1,
      explanation:
        "Slash commands save you from retyping a repeatable, well-defined instruction — the value compounds the more often it would otherwise be repeated.",
    },
    {
      id: "q2",
      question: "What does an MCP server let Claude Code do?",
      options: [
        "Nothing — it's unrelated to Claude Code",
        "Connect to external tools and data sources (like a tracker, database, or API) as part of a session",
        "Only change the color theme of the terminal",
        "Replace the need for git entirely",
      ],
      correctIndex: 1,
      explanation:
        "MCP (Model Context Protocol) is how Claude Code connects to external tools and data sources beyond your local filesystem.",
    },
    {
      id: "q3",
      question: "Why should connecting an MCP server be treated as a trust decision?",
      options: [
        "It has no real effect on anything",
        "It can grant real access to real systems and data, so its scope matters",
        "MCP servers can only ever read, never write",
        "It only affects the visual theme",
      ],
      correctIndex: 1,
      explanation:
        "An MCP server can expose real read or write access to external systems, so understanding its scope before connecting it matters.",
    },
    {
      id: "q4",
      question: "What are hooks best suited for?",
      options: [
        "Creative, judgment-based decisions",
        "Mechanical, always-do-this guardrails like running a linter after every edit or logging commands",
        "Replacing all human review",
        "Nothing — they're purely cosmetic",
      ],
      correctIndex: 1,
      explanation:
        "Hooks automate consistent, mechanical behavior at specific points in the workflow — good for guardrails, not for open-ended judgment calls.",
    },
    {
      id: "q5",
      question: "What is the purpose of Claude Code's permission system?",
      options: [
        "To require approval for absolutely everything, with no distinctions",
        "To put a confirmation checkpoint at higher-blast-radius actions while letting easily reversible actions proceed more freely",
        "To prevent Claude Code from ever running commands",
        "To automatically approve every action without exception",
      ],
      correctIndex: 1,
      explanation:
        "Permissions concentrate your attention on the actions with real consequences — destructive, irreversible, or scope-expanding ones — rather than everywhere equally.",
    },
  ],
  passThreshold: 0.8,
  practicum: {
    title: "Create a custom slash command and describe a hook or MCP use case",
    scenario:
      "Create one custom slash command for a workflow you actually repeat, and describe one concrete hook or MCP server you could use (even hypothetically) to automate or extend your own setup.",
    steps: [
      "Identify a prompt you've typed more than once, or would, and turn it into a custom slash command.",
      "Test it in a real session.",
      "Describe one hook (e.g. run a linter after edits, log every command) or one MCP server (e.g. a project tracker, a database) that would be useful in your own workflow, and why.",
    ],
    submissionLabel:
      "Paste your slash command's name and content, and describe the hook or MCP use case you identified.",
    placeholder:
      "Command name: /review\nCommand content: Review this diff for security issues and missing error handling.\n\nHook/MCP idea: I'd use a hook that runs eslint after every file edit because...",
    checks: [
      {
        id: "has-command",
        description: "Describes a custom slash command name and purpose",
        type: "includesAny",
        value: ["command", "slash", "shortcut", ".md", "claude/commands"],
      },
      {
        id: "has-hook-or-mcp",
        description: "Describes a hook or MCP server use case",
        type: "includesAny",
        value: ["hook", "mcp", "server", "automate", "automation", "integration"],
      },
      {
        id: "sufficient-detail",
        description: "Overall submission has enough detail",
        type: "minLength",
        value: 100,
      },
    ],
  },
};
