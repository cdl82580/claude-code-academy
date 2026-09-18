export type StarterProject = {
  id: string;
  title: string;
  stack: string;
  fileName: string;
  sizeLabel: string;
  description: string;
  goodFor: string;
};

// Downloadable practice projects, served statically from /public/starters.
// Not tied to any single module — the practicum tab surfaces both on every
// module, since which one fits best depends on the exercise, not the module.
export const starterProjects: StarterProject[] = [
  {
    id: "node-api-starter",
    title: "node-api-starter",
    stack: "Node.js + Express",
    fileName: "node-api-starter.zip",
    sizeLabel: "~40 KB",
    description:
      "A tiny in-memory notes/tasks REST API with a Jest test suite, a GitHub Actions CI workflow, and a shared formatting helper called from three different files.",
    goodFor:
      "Good for: writing a CLAUDE.md from scratch, the reproduce → isolate → fix practicum (it has a real, undocumented bug), a multi-file refactor, and the CI/review exercises.",
  },
  {
    id: "web-widgets-starter",
    title: "web-widgets-starter",
    stack: "Plain HTML/CSS/JS — no install",
    fileName: "web-widgets-starter.zip",
    sizeLabel: "~3 KB",
    description:
      "Three small dependency-free UI widgets (a counter, a to-do list, a tab switcher) that share a utils.js file. Just open index.html — no npm install needed.",
    goodFor:
      "Good for: the Module 2.5 exercise (a second, differently-stacked toy project to confirm your global CLAUDE.md carries over), and spotting/fixing inconsistent conventions across files.",
  },
];
