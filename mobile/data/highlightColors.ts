export const HIGHLIGHT_COLORS = [
  { id: "gold", label: "Gold", value: "rgba(212,150,42,0.35)" },
  { id: "amber", label: "Amber", value: "rgba(245,166,35,0.35)" },
  { id: "blue", label: "Blue", value: "rgba(74,126,232,0.35)" },
  { id: "teal", label: "Teal", value: "rgba(38,198,218,0.35)" },
  { id: "green", label: "Green", value: "rgba(46,204,142,0.35)" },
  { id: "red", label: "Red", value: "rgba(232,64,64,0.35)" },
  { id: "purple", label: "Purple", value: "rgba(124,94,232,0.35)" },
  { id: "pink", label: "Pink", value: "rgba(236,72,153,0.35)" },
] as const;

export type HighlightColorId = (typeof HIGHLIGHT_COLORS)[number]["id"];
