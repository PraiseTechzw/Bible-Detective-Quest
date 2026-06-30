export interface RankTier {
  minLevel: number;
  maxLevel: number;
  title: string;
  shortTitle: string;
  crest: string;
  color: string;
  gradTop: string;
  gradBot: string;
  rimColor: string;
  description: string;
  perks: string[];
}

export const RANK_TIERS: RankTier[] = [
  {
    minLevel: 1,
    maxLevel: 2,
    title: "Rookie Detective",
    shortTitle: "ROOKIE",
    crest: "🔍",
    color: "#7A85A3",
    gradTop: "#1A1E2E",
    gradBot: "#0E1220",
    rimColor: "#4A5278",
    description: "You just picked up your first case file. Don't trip over the magnifying glass.",
    perks: ["Access to Beginner cases", "Hint system enabled", "Learning mode active"],
  },
  {
    minLevel: 3,
    maxLevel: 4,
    title: "Junior Investigator",
    shortTitle: "JUNIOR",
    crest: "📋",
    color: "#2ECC8E",
    gradTop: "#0A2018",
    gradBot: "#051008",
    rimColor: "#1A8050",
    description: "Now you're taking notes. Professional detectives take notes. Good sign.",
    perks: ["Access to Intermediate cases", "Daily Mystery unlocked", "Bonus XP on streaks"],
  },
  {
    minLevel: 5,
    maxLevel: 7,
    title: "Field Detective",
    shortTitle: "FIELD",
    crest: "🕵️",
    color: "#4A7EE8",
    gradTop: "#0A1830",
    gradBot: "#050C18",
    rimColor: "#2050A0",
    description: "Out of the office, into the ancient Near East. Watch your sandals.",
    perks: ["Access to all cases", "Time Attack mode unlocked", "2× XP events eligible"],
  },
  {
    minLevel: 8,
    maxLevel: 11,
    title: "Senior Detective",
    shortTitle: "SENIOR",
    crest: "⚖️",
    color: "#9B59B6",
    gradTop: "#180A28",
    gradBot: "#0C0515",
    rimColor: "#602888",
    description: "Your judgment is trusted. The ancient witnesses answer to you now.",
    perks: ["Suspect analysis unlocks early", "Streak shield (one-day miss forgiven)", "Access to challenge cases"],
  },
  {
    minLevel: 12,
    maxLevel: 16,
    title: "Lead Investigator",
    shortTitle: "LEAD",
    crest: "🏛️",
    color: "#D4962A",
    gradTop: "#251400",
    gradBot: "#130A00",
    rimColor: "#905000",
    description: "You're running the case room now. Other detectives look to you for guidance.",
    perks: ["Survival Mode unlocked", "Badge collection complete tracking", "Weekly Challenge eligible"],
  },
  {
    minLevel: 17,
    maxLevel: 22,
    title: "Chief Detective",
    shortTitle: "CHIEF",
    crest: "👮",
    color: "#F5A623",
    gradTop: "#251800",
    gradBot: "#130C00",
    rimColor: "#A06010",
    description: "Chief. It's in the title now. The whole department answers to you.",
    perks: ["All modes unlocked", "Case commentary mode", "Top of leaderboard eligible"],
  },
  {
    minLevel: 23,
    maxLevel: 999,
    title: "Master Sleuth",
    shortTitle: "MASTER",
    crest: "📜",
    color: "#E84040",
    gradTop: "#280808",
    gradBot: "#140404",
    rimColor: "#900000",
    description: "There are no more mysteries in all of Scripture that intimidate you. You have ascended.",
    perks: ["Legendary badge eligible", "All content complete", "You basically wrote the commentary"],
  },
];

export function getRankForLevel(level: number): RankTier {
  return RANK_TIERS.find((r) => level >= r.minLevel && level <= r.maxLevel) ?? RANK_TIERS[0];
}

export const XP_TABLE: number[] = [300, 450, 675, 1012, 1518, 2277, 3415, 5122, 7683, 11524];
export function xpForLevel(level: number): number {
  if (level <= XP_TABLE.length) return XP_TABLE[level - 1];
  return Math.floor(300 * Math.pow(1.5, level - 1));
}
