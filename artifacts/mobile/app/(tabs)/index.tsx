import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const insets = useSafeAreaInsets();
  const { level, xp, xpToNextLevel, coins, solvedCases, badges, isCaseSolved, isCaseLocked } = useGame();

  const rankTitle = RANK_TITLES[Math.min(level - 1, RANK_TITLES.length - 1)];
  const xpPct = Math.min((xp / xpToNextLevel) * 100, 100);
  const topPad = Platform.OS === "web" ? 60 : insets.top;

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13", "#070A13"]} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <View>
          <Text style={styles.titleLine1}>BIBLE</Text>
          <Text style={styles.titleLine2}>DETECTIVE</Text>
          <View style={[styles.titleUnderline, { backgroundColor: colors.gold }]} />
        </View>
        <Pressable style={styles.coinsBtn}>
          <LinearGradient
            colors={["rgba(212,150,42,0.2)", "rgba(196,125,26,0.08)"]}
            style={styles.coinsBg}
          >
            <Feather name="disc" size={14} color={colors.gold} />
            <Text style={styles.coinsVal}>{coins}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View style={styles.profileWrap}>
          <LinearGradient
            colors={["#1C2640", "#0F1628", "#0A0F1E"]}
            style={styles.profileCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.profileGoldBorder, { borderColor: colors.goldBorder }]} />

            {/* Top section */}
            <View style={styles.profileTop}>
              <View style={styles.badgeWrap}>
                <LinearGradient
                  colors={["rgba(212,150,42,0.25)", "rgba(196,125,26,0.08)"]}
                  style={styles.badgeBg}
                >
                  <Feather name="shield" size={26} color={colors.gold} />
                </LinearGradient>
                <View style={styles.levelPill}>
                  <Text style={styles.levelPillText}>{level}</Text>
                </View>
              </View>
              <View style={styles.profileMid}>
                <Text style={styles.rankTitle}>{rankTitle}</Text>
                <Text style={styles.rankSub}>Sacred Investigator</Text>
              </View>
              <View style={styles.solvedWrap}>
                <Text style={styles.solvedNum}>{solvedCases.length}</Text>
                <Text style={styles.solvedLabel}>Solved</Text>
              </View>
            </View>

            {/* XP Bar */}
            <View style={styles.xpSection}>
              <View style={styles.xpLabelRow}>
                <Text style={styles.xpLabel}>EXPERIENCE</Text>
                <Text style={styles.xpVal}>{xp} <Text style={styles.xpMax}>/ {xpToNextLevel}</Text></Text>
              </View>
              <View style={styles.xpBarBg}>
                <LinearGradient
                  colors={[colors.goldLight, colors.gold]}
                  style={[styles.xpBarFill, { width: `${xpPct}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <View style={[styles.xpGlow, { width: `${xpPct}%` }]} />
              </View>
              <Text style={styles.nextLevelLabel}>Level {level + 1} → {xpToNextLevel - xp} XP needed</Text>
            </View>

            {/* Badges */}
            {badges.length > 0 && (
              <View style={styles.badgesRow}>
                {badges.slice(0, 3).map((b, i) => (
                  <View key={i} style={styles.badgeChip}>
                    <Feather name="award" size={9} color={colors.gold} />
                    <Text style={styles.badgeChipText} numberOfLines={1}>{b}</Text>
                  </View>
                ))}
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { icon: "folder" as const, label: "Cases", val: `${solvedCases.length}/${CASES.length}` },
            { icon: "award" as const, label: "Badges", val: String(badges.length) },
            { icon: "zap" as const, label: "Total XP", val: String(xp + solvedCases.reduce((acc, id) => {
              const c = CASES.find(c => c.id === id);
              return acc + (c?.rewards.xp ?? 0);
            }, 0)) },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.statCardInner}>
                <Feather name={s.icon} size={16} color={colors.gold} />
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Section */}
        <View style={styles.sectionRow}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.gold }]} />
          <Text style={styles.sectionTitle}>Case Files</Text>
          <Text style={styles.sectionCount}>{solvedCases.length}/{CASES.length} solved</Text>
        </View>

        {CASES.map((c, idx) => (
          <CaseCard
            key={c.id}
            caseData={c}
            solved={isCaseSolved(c.id)}
            locked={isCaseLocked(c.id, idx)}
            onPress={() => router.push(`/case/${c.id}`)}
          />
        ))}

        <View style={styles.footer}>
          <Feather name="book" size={12} color={colors.textFaint} />
          <Text style={styles.footerText}>All cases grounded strictly in biblical scripture</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  titleLine1: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.gold,
    letterSpacing: 5,
  },
  titleLine2: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: colors.text,
    letterSpacing: 4,
    lineHeight: 30,
    marginTop: -2,
  },
  titleUnderline: { height: 2, width: 60, borderRadius: 1, marginTop: 4 },
  coinsBtn: { marginTop: 4 },
  coinsBg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: colors.radius.full,
    borderWidth: 1,
    borderColor: colors.goldBorder,
  },
  coinsVal: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.gold },

  profileWrap: { marginHorizontal: 16, marginBottom: 14 },
  profileCard: {
    borderRadius: colors.radius.lg,
    padding: 18,
    position: "relative",
    overflow: "hidden",
  },
  profileGoldBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  profileTop: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18 },
  badgeWrap: { position: "relative" },
  badgeBg: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.goldBorder,
  },
  levelPill: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: colors.gold,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  levelPillText: { fontFamily: "Inter_700Bold", fontSize: 11, color: "#000" },
  profileMid: { flex: 1 },
  rankTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  rankSub: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  solvedWrap: { alignItems: "center" },
  solvedNum: { fontFamily: "Inter_700Bold", fontSize: 28, color: colors.text },
  solvedLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted, letterSpacing: 0.5 },

  xpSection: { gap: 5 },
  xpLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  xpLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 1.2 },
  xpVal: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  xpMax: { color: colors.textMuted },
  xpBarBg: {
    height: 6,
    backgroundColor: colors.surface3,
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },
  xpBarFill: { height: 6, borderRadius: 3 },
  xpGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(240,185,62,0.3)",
  },
  nextLevelLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },

  badgesRow: { flexDirection: "row", gap: 6, marginTop: 12, flexWrap: "wrap" },
  badgeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(212,150,42,0.1)",
    borderWidth: 1,
    borderColor: colors.goldBorder,
    borderRadius: colors.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeChipText: { fontFamily: "Inter_500Medium", fontSize: 9, color: colors.gold },

  statsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  statCard: { flex: 1 },
  statCardInner: {
    borderRadius: colors.radius.md,
    padding: 12,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionAccent: { width: 3, height: 18, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  sectionCount: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted },

  footer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  footerText: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint, textAlign: "center" },
});
