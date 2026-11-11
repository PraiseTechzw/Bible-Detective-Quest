const colors = {
  bg: "#070A13",
  surface1: "#0D1220",
  surface2: "#141C32",
  surface3: "#1A2340",

  gold: "#D4962A",
  goldLight: "#F0B93E",
  goldDim: "#8B6018",
  goldGlow: "rgba(212,150,42,0.25)",
  goldBorder: "rgba(212,150,42,0.35)",
  goldGradient: ["#F0B93E", "#C47D1A"] as const,
  goldGradientSubtle: ["rgba(240,185,62,0.15)", "rgba(196,125,26,0.05)"] as const,

  parchment: "#F0E9D2",
  text: "#E8E2D0",
  textMuted: "#7A85A3",
  textFaint: "#3A4260",

  blue: "#4A7EE8",
  blueGlow: "rgba(74,126,232,0.2)",
  purple: "#7C5EE8",
  purpleGlow: "rgba(124,94,232,0.2)",
  red: "#E84040",
  redGlow: "rgba(232,64,64,0.2)",
  green: "#2ECC8E",
  greenGlow: "rgba(46,204,142,0.2)",
  amber: "#F5A623",

  border: "rgba(255,255,255,0.07)",
  borderBright: "rgba(255,255,255,0.12)",

  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    full: 999,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },
} as const;

export default colors;
