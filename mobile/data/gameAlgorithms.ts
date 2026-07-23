import type { Question, TimelineEvent } from "@/data/cases";

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededShuffle<T>(items: T[], seedSource: string): T[] {
  const result = [...items];
  let seed = hashString(seedSource) || 1;

  for (let i = result.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function scoreQuestion(question: Question) {
  const scriptureSignal = /\b\d+:\d+\b|\b[1-3]?\s?[A-Z][a-z]+\s\d+\b/.test(
    `${question.text} ${question.explanation} ${question.reference ?? ""}`,
  )
    ? 2
    : 0;
  const depthSignal = question.options.length >= 4 ? 1 : 0;
  const lengthSignal = Math.min(3, Math.floor(question.text.length / 80));
  return scriptureSignal + depthSignal + lengthSignal;
}

export function orderBibleQuestions(questions: Question[]): Question[] {
  return [...questions].sort((a, b) => scoreQuestion(a) - scoreQuestion(b));
}

export function orderTimelineEvents(events: TimelineEvent[], seedKey: string): TimelineEvent[] {
  return seededShuffle(events, seedKey);
}

const REFERENCE_DISTRACTORS = [
  "Genesis 1",
  "Psalm 23",
  "Isaiah 53",
  "John 3:16",
  "Romans 8",
  "Revelation 21",
];

export function buildSupplementalQuestions(
  witnessName: string,
  witnessRole: string,
  scriptureFocus: string,
  seedKey: string,
): Question[] {
  const referenceOptions = seededShuffle(
    [scriptureFocus, ...REFERENCE_DISTRACTORS.filter((ref) => ref !== scriptureFocus)],
    `${seedKey}:reference`,
  ).slice(0, 4);

  const roleOptions = seededShuffle(
    [
      witnessRole,
      "Narrator",
      "Background observer",
      "Case analyst",
    ],
    `${seedKey}:role`,
  ).slice(0, 4);

  return [
    {
      id: `${seedKey}-ref`,
      text: `Which passage anchors ${witnessName}'s testimony?`,
      options: referenceOptions,
      correctIndex: referenceOptions.indexOf(scriptureFocus),
      explanation: `This witness is tied to ${scriptureFocus}, which is the scripture focus for this case.`,
      reference: scriptureFocus,
    },
    {
      id: `${seedKey}-role`,
      text: `Which description best matches ${witnessName}?`,
      options: roleOptions,
      correctIndex: roleOptions.indexOf(witnessRole),
      explanation: `${witnessName} is identified in the case as ${witnessRole}.`,
      reference: scriptureFocus,
    },
  ];
}
