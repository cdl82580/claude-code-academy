export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CheckRule = {
  id: string;
  description: string;
  type: "includesAny" | "includesAll" | "regex" | "minLength" | "minLines";
  value: string | string[] | number;
  flags?: string;
};

export type Practicum = {
  title: string;
  scenario: string;
  steps: string[];
  submissionLabel: string;
  placeholder: string;
  checks: CheckRule[];
};

export type CourseModule = {
  slug: string;
  order: number;
  dayRange: string;
  title: string;
  summary: string;
  objectives: string[];
  lessonSections: { heading: string; body: string[] }[];
  quiz: QuizQuestion[];
  passThreshold: number;
  practicum: Practicum;
};
