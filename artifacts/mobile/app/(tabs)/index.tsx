import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { CASES } from "@/data/cases";
import { useGame } from "@/context/GameContext";
import CaseCard from "@/components/game/CaseCard";

const RANK_TITLES = [
  "Rookie Detective",
  "Junior Investigator",
  "Field Detective",
  "Senior Detective",
  "Lead Investigator",
  "Chief Detective",
  "Master Sleuth",
];

export default function HomeScreen() {
  const c = colors.light;
  const insets = useSafeAreaInsets();
  const { level, xp, xpToNextLevel, coins, solvedCases, badges, isCaseSolved, isCaseLocked } =
    useGame();

  const rankTitle = RANK_TITLES[Math.min(level - 1, RANK_TITLES.length - 1)];
  const xpProgress = xp / xpToNextLevel;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: c.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: topPad + 12, paddingBottom: bottomPad + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.appTitle, { color: c.gold }]}>BIBLE DETECTIVE</Text>
            <Text style={[styles.appSub, { color: c.mutedForeground }]}>Sacred Truth Uncovered</Text>
          </View>
          <View style={[styles.coinsChip, { backgroundColor: `${c.gold}20`, borderColor: `${c.gold}40` }]}>
            <Feather name="circle" size={13} color={c.gold} />
            <Text style={[styles.coinsText, { color: c.gold }]}>{coins}</Text>
          </View>
        </View>

        <View style={[styles.profileCard, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={styles.profileTop}>
            <View style={[styles.detectiveBadge, { backgroundColor: `${c.gold}20`, borderColor: `${c.gold}50` }]}>
              <Feather name="shield" size={28} color={c.gold} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.rankTitle, { color: c.foreground }]}>{rankTitle}</Text>
              <Text style={[styles.levelText, { color: c.mutedForeground }]}>Level {level}</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={[styles.statsNum, { color: c.foreground }]}>{solvedCases.length}</Text>
              <Text style={[styles.statsLabel, { color: c.mutedForeground }]}>Solved</Text>
            </View>
          </View>

          <View style={styles.xpRow}>
            <Text style={[styles.xpLabel, { color: c.mutedForeground }]}>
              XP: {xp} / {xpToNextLevel}
            </Text>
            <Text style={[styles.xpLabel, { color: c.gold }]}>Level {level + 1}</Text>
          </View>
          <View style={[styles.xpBarBg, { backgroundColor: c.muted }]}>
            <View
              style={[
                styles.xpBarFill,
                { backgroundColor: c.gold, width: `${Math.min(xpProgress * 100, 100)}%` },
              ]}
            />
          </View>

          {badges.length > 0 && (
            <View style={styles.badgesRow}>
              {badges.slice(0, 4).map((badge, i) => (
                <View key={i} style={[styles.badgeChip, { backgroundColor: `${c.gold}15`, borderColor: `${c.gold}30` }]}>
                  <Feather name="award" size={10} color={c.gold} />
                  <Text style={[styles.badgeText, { color: c.gold }]} numberOfLines={1}>
                    {badge}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Feather name="folder" size={16} color={c.gold} />
          <Text style={[styles.sectionTitle, { color: c.foreground }]}>Active Case Files</Text>
          <Text style={[styles.sectionCount, { color: c.mutedForeground }]}>
            {solvedCases.length}/{CASES.length} solved
          </Text>
        </View>

        {CASES.map((caseData, idx) => (
          <CaseCard
            key={caseData.id}
            caseData={caseData}
            solved={isCaseSolved(caseData.id)}
            locked={isCaseLocked(caseData.id, idx)}
            onPress={() => router.push(`/case/${caseData.id}`)}
          />
        ))}

        <View style={[styles.footerNote, { borderColor: c.border }]}>
          <Feather name="book" size={14} color={c.mutedForeground} />
          <Text style={[styles.footerNoteText, { color: c.mutedForeground }]}>
            All cases are grounded strictly in biblical text. No fictional additions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  appTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    letterSpacing: 2,
  },
  appSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 2,
  },
  coinsChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  coinsText: { fontFamily: "Inter_700Bold", fontSize: 14 },
  profileCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  profileTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  detectiveBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: { flex: 1 },
  rankTitle: { fontFamily: "Inter_700Bold", fontSize: 16 },
  levelText: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  statsCol: { alignItems: "center" },
  statsNum: { fontFamily: "Inter_700Bold", fontSize: 22 },
  statsLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  xpRow: { flexDirection: "row", justifyContent: "space-between" },
  xpLabel: { fontFamily: "Inter_400Regular", fontSize: 12 },
  xpBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  xpBarFill: {
    height: 6,
    borderRadius: 3,
  },
  badgesRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  badgeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    maxWidth: 160,
  },
  badgeText: { fontFamily: "Inter_500Medium", fontSize: 10 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, flex: 1 },
  sectionCount: { fontFamily: "Inter_400Regular", fontSize: 13 },
  footerNote: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    borderTopWidth: 1,
    paddingTop: 14,
    marginHorizontal: 16,
    marginTop: 6,
  },
  footerNoteText: { fontFamily: "Inter_400Regular", fontSize: 12, lineHeight: 18, flex: 1 },
});
