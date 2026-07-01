import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import {
  IconArrowLeft,
  IconBookOpen,
  IconBookmark,
  IconCalendar,
  IconFire,
  IconMarker,
  IconNote,
  IconScroll,
  IconSparkles,
  IconStar,
  IconTrendingUp,
  IconUsers,
  IconWarning,
} from "@/components/ui/SvgIcons";
import { useBible } from "@/context/BibleContext";

export type ToolView =
  | "home"
  | "tools"
  | "search"
  | "daily"
  | "bookmarks"
  | "highlights"
  | "notes"
  | "parallel"
  | "plans"
  | "prayer"
  | "dictionary"
  | "characters"
  | "topics"
  | "quiz"
  | "memory"
  | "timeline"
  | "calendar"
  | "sermons"
  | "history"
  | "ai"
  | "crossrefs"
  | "progress";

type ToolCard = {
  id: ToolView;
  label: string;
  desc: string;
  color: string;
  glow: string;
  icon: React.ReactNode;
};

const TOOLS: ToolCard[] = [
  {
    id: "daily",
    label: "Daily Verse",
    desc: "Today's verse and devotion",
    color: colors.gold,
    glow: colors.goldGlow,
    icon: <IconSparkles size={20} color={colors.gold} />,
  },
  {
    id: "search",
    label: "Bible Search",
    desc: "Keyword and verse lookup",
    color: colors.blue,
    glow: colors.blueGlow,
    icon: <IconBookOpen size={20} color={colors.blue} />,
  },
  {
    id: "parallel",
    label: "Parallel Bible",
    desc: "Compare translations",
    color: colors.purple,
    glow: colors.purpleGlow,
    icon: <IconTrendingUp size={20} color={colors.purple} />,
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    desc: "Saved verses",
    color: colors.amber,
    glow: "rgba(245,166,35,0.2)",
    icon: <IconBookmark size={20} color={colors.amber} />,
  },
  {
    id: "highlights",
    label: "Highlights",
    desc: "Coloured verses",
    color: colors.green,
    glow: colors.greenGlow,
    icon: <IconMarker size={20} color={colors.green} />,
  },
  {
    id: "notes",
    label: "Notes",
    desc: "Verse annotations",
    color: colors.blue,
    glow: colors.blueGlow,
    icon: <IconNote size={20} color={colors.blue} />,
  },
  {
    id: "plans",
    label: "Reading Plans",
    desc: "Structured study plans",
    color: colors.green,
    glow: colors.greenGlow,
    icon: <IconCalendar size={20} color={colors.green} />,
  },
  {
    id: "quiz",
    label: "Bible Quiz",
    desc: "Test your knowledge",
    color: colors.red,
    glow: colors.redGlow,
    icon: <IconWarning size={20} color={colors.red} />,
  },
  {
    id: "memory",
    label: "Memory Verses",
    desc: "Memorisation practice",
    color: colors.purple,
    glow: colors.purpleGlow,
    icon: <IconStar size={20} color={colors.purple} />,
  },
  {
    id: "characters",
    label: "Character Profiles",
    desc: "Biblical people",
    color: colors.amber,
    glow: "rgba(245,166,35,0.2)",
    icon: <IconUsers size={20} color={colors.amber} />,
  },
  {
    id: "dictionary",
    label: "Bible Dictionary",
    desc: "Key terms defined",
    color: colors.blue,
    glow: colors.blueGlow,
    icon: <IconBookOpen size={20} color={colors.blue} />,
  },
  {
    id: "sermons",
    label: "Sermon Notes",
    desc: "Message notes",
    color: colors.red,
    glow: colors.redGlow,
    icon: <IconScroll size={20} color={colors.red} />,
  },
];

interface Props {
  onNavigate: (v: ToolView) => void;
  onBack: () => void;
  topPad: number;
}

export default function BibleToolsHub({ onNavigate, onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const streak = bible.bibleStreak.count;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <IconArrowLeft size={16} color={colors.textMuted} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE TOOLS</Text>
          <Text style={styles.headerTitle}>Study Tools</Text>
        </View>
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <IconFire size={14} color={colors.red} />
            <Text style={styles.streakCount}>{streak}</Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: insets.bottom + 90 },
        ]}
      >
        {TOOLS.map((tool) => (
          <Pressable
            key={tool.id}
            onPress={() => onNavigate(tool.id)}
            style={({ pressed }) => [
              styles.cardWrap,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.04)", "rgba(255,255,255,0.01)"]}
              style={[styles.card, { borderColor: colors.border }]}
            >
              <View style={[styles.iconBubble, { backgroundColor: tool.glow }]}>
                {tool.icon}
              </View>
              <Text style={[styles.cardLabel, { color: tool.color }]}>
                {tool.label}
              </Text>
              <Text style={styles.cardDesc}>{tool.desc}</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: colors.text,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(232,64,64,0.15)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(232,64,64,0.3)",
  },
  streakCount: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.red,
  },
  grid: {
    paddingHorizontal: 14,
    paddingTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "3%" as any,
    rowGap: 10,
  },
  cardWrap: { width: "47%" },
  card: {
    borderRadius: colors.radius.md,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    minHeight: 90,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 14,
  },
});
