import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useBible } from "@/context/BibleContext";

export type ToolView =
  | "home" | "tools" | "search" | "daily" | "bookmarks" | "highlights"
  | "notes" | "parallel" | "plans" | "prayer" | "dictionary" | "characters"
  | "topics" | "quiz" | "memory" | "timeline" | "calendar" | "sermons"
  | "history" | "ai" | "crossrefs" | "progress";

type ToolCard = {
  id: ToolView; label: string; icon: string; desc: string;
  color: string; glow: string;
};

const TOOLS: ToolCard[] = [
  { id: "daily", label: "Daily Verse", icon: "☀️", desc: "Today's verse & devotion", color: colors.gold, glow: colors.goldGlow },
  { id: "search", label: "Bible Search", icon: "🔍", desc: "Keyword & verse lookup", color: colors.blue, glow: colors.blueGlow },
  { id: "parallel", label: "Parallel Bible", icon: "⚖️", desc: "Compare translations", color: colors.purple, glow: colors.purpleGlow },
  { id: "bookmarks", label: "Bookmarks", icon: "🔖", desc: "Saved verses", color: colors.amber, glow: "rgba(245,166,35,0.2)" },
  { id: "highlights", label: "Highlights", icon: "🖊️", desc: "Coloured verses", color: colors.green, glow: colors.greenGlow },
  { id: "notes", label: "Notes", icon: "📝", desc: "Verse annotations", color: colors.blue, glow: colors.blueGlow },
  { id: "plans", label: "Reading Plans", icon: "📅", desc: "Structured study plans", color: colors.green, glow: colors.greenGlow },
  { id: "progress", label: "Progress", icon: "📊", desc: "Chapters read tracker", color: colors.gold, glow: colors.goldGlow },
  { id: "history", label: "History", icon: "🕐", desc: "Recently read passages", color: colors.textMuted, glow: "rgba(122,133,163,0.2)" },
  { id: "quiz", label: "Bible Quiz", icon: "🎯", desc: "Test your knowledge", color: colors.red, glow: colors.redGlow },
  { id: "memory", label: "Memory Verses", icon: "🧠", desc: "Memorisation practice", color: colors.purple, glow: colors.purpleGlow },
  { id: "topics", label: "Topic Explorer", icon: "🗂️", desc: "Verses by theme", color: colors.gold, glow: colors.goldGlow },
  { id: "characters", label: "Character Profiles", icon: "👤", desc: "Biblical people", color: colors.amber, glow: "rgba(245,166,35,0.2)" },
  { id: "dictionary", label: "Bible Dictionary", icon: "📖", desc: "Key terms defined", color: colors.blue, glow: colors.blueGlow },
  { id: "crossrefs", label: "Cross References", icon: "🔗", desc: "Connected passages", color: colors.green, glow: colors.greenGlow },
  { id: "timeline", label: "Bible Timeline", icon: "⏳", desc: "Biblical history events", color: colors.purple, glow: colors.purpleGlow },
  { id: "calendar", label: "Feast Days", icon: "🕎", desc: "Biblical calendar", color: colors.gold, glow: colors.goldGlow },
  { id: "prayer", label: "Prayer Journal", icon: "🙏", desc: "Requests & answered prayers", color: colors.blue, glow: colors.blueGlow },
  { id: "sermons", label: "Sermon Notes", icon: "🎙️", desc: "Message notes", color: colors.red, glow: colors.redGlow },
  { id: "ai", label: "AI Assistant", icon: "✨", desc: "Ask about Scripture", color: colors.purple, glow: colors.purpleGlow },
];

interface Props { onNavigate: (v: ToolView) => void; onBack: () => void; topPad: number; }

export default function BibleToolsHub({ onNavigate, onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const streak = bible.bibleStreak.count;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE · TOOLS</Text>
          <Text style={styles.headerTitle}>Study Tools</Text>
        </View>
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakCount}>{streak}</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 90 }]}>
        {TOOLS.map(tool => (
          <Pressable key={tool.id} onPress={() => onNavigate(tool.id)} style={({ pressed }) => [styles.cardWrap, { opacity: pressed ? 0.8 : 1 }]}>
            <LinearGradient
              colors={["rgba(255,255,255,0.04)", "rgba(255,255,255,0.01)"]}
              style={[styles.card, { borderColor: colors.border }]}
            >
              <View style={[styles.iconBubble, { backgroundColor: tool.glow }]}>
                <Text style={styles.icon}>{tool.icon}</Text>
              </View>
              <Text style={[styles.cardLabel, { color: tool.color }]}>{tool.label}</Text>
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
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  backIcon: { color: colors.textMuted, fontSize: 16, lineHeight: 20 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  streakBadge: { flexDirection: "row", alignItems: "center", gap: 2, backgroundColor: "rgba(232,64,64,0.15)", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(232,64,64,0.3)" },
  streakIcon: { fontSize: 13 },
  streakCount: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.red },
  grid: { paddingHorizontal: 14, paddingTop: 4, flexDirection: "row", flexWrap: "wrap", gap: "3%" as any, rowGap: 10 },
  cardWrap: { width: "47%" },
  card: { borderRadius: colors.radius.md, padding: 14, gap: 6, borderWidth: 1, minHeight: 90 },
  iconBubble: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 18 },
  cardLabel: { fontFamily: "Inter_700Bold", fontSize: 13 },
  cardDesc: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted, lineHeight: 14 },
});
