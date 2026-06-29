import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";

const RANK_TIERS = [
  { min: 1, max: 2, title: "Rookie Detective", short: "ROOKIE", color: colors.textMuted },
  { min: 3, max: 4, title: "Junior Investigator", short: "JUNIOR", color: colors.green },
  { min: 5, max: 7, title: "Field Detective", short: "FIELD", color: colors.blue },
  { min: 8, max: 11, title: "Senior Detective", short: "SENIOR", color: colors.purple },
  { min: 12, max: 16, title: "Lead Investigator", short: "LEAD", color: colors.gold },
  { min: 17, max: 22, title: "Chief Detective", short: "CHIEF", color: colors.amber },
  { min: 23, max: 99, title: "Master Sleuth", short: "MASTER", color: colors.red },
];

function getRank(level: number) {
  return RANK_TIERS.find((r) => level >= r.min && level <= r.max) ?? RANK_TIERS[0];
}

const ALL_BADGES = [
  { id: "first_blood", label: "First Blood", icon: "droplet" as const, desc: "Solve your first case", color: colors.red },
  { id: "genesis_scholar", label: "Genesis Scholar", icon: "book" as const, desc: "Complete a Genesis case", color: colors.gold },
  { id: "truth_seeker", label: "Truth Seeker", icon: "search" as const, desc: "Examine all evidence", color: colors.blue },
  { id: "just_judge", label: "Just Judge", icon: "scale" as const, desc: "Give the correct verdict", color: colors.purple },
  { id: "brotherhood_broken", label: "Brotherhood Broken", icon: "users" as const, desc: "Solve The First Murder", color: colors.amber },
  { id: "deception_master", label: "Deception Master", icon: "eye-off" as const, desc: "Solve The Stolen Birthright", color: colors.green },
  { id: "coat_of_colors", label: "Coat of Colors", icon: "star" as const, desc: "Solve The Betrayal in Egypt", color: colors.blue },
  { id: "streak_3", label: "On Fire", icon: "zap" as const, desc: "3-day streak", color: colors.amber },
  { id: "master_detective", label: "Master Detective", icon: "award" as const, desc: "Reach Level 5", color: colors.gold },
];

const ACHIEVEMENTS = [
  { icon: "check-circle" as const, label: "Cases Solved", color: colors.green, getValue: (g: any) => `${g.solvedCases.length} / ${CASES.length}`, isDone: (g: any) => g.solvedCases.length === CASES.length },
  { icon: "zap" as const, label: "XP Earned", color: colors.gold, getValue: (g: any) => `${g.totalXPEarned} XP`, isDone: (g: any) => g.totalXPEarned >= 500 },
  { icon: "disc" as const, label: "Coins Collected", color: colors.amber, getValue: (g: any) => `${g.coins} coins`, isDone: (g: any) => g.coins >= 100 },
  { icon: "activity" as const, label: "Streak Record", color: colors.red, getValue: (g: any) => `${g.streak} days`, isDone: (g: any) => g.streak >= 7 },
  { icon: "shield" as const, label: "Level 5 Reached", color: colors.blue, getValue: (g: any) => `Level ${g.level}`, isDone: (g: any) => g.level >= 5 },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const game = useGame();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const rank = getRank(game.level);
  const xpPct = Math.min((game.xp / game.xpToNextLevel) * 100, 100);

  const [activeTab, setActiveTab] = useState<"achievements" | "badges">("achievements");

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <View>
          <Text style={styles.headerLabel}>DETECTIVE FILE</Text>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.settingsBtn}>
          <Feather name="settings" size={20} color={colors.textMuted} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}
      >
        {/* Identity card */}
        <LinearGradient
          colors={["#1E2848", "#111828", "#0A0F1E"]}
          style={styles.identityCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.identityBorder, { borderColor: colors.goldBorder }]} />

          <View style={styles.identityTop}>
            <View style={styles.avatarWrap}>
              <LinearGradient
                colors={["rgba(212,150,42,0.3)", "rgba(212,150,42,0.08)"]}
                style={styles.avatar}
              >
                <Feather name="shield" size={34} color={colors.gold} />
              </LinearGradient>
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{game.level}</Text>
              </LinearGradient>
            </View>
            <View style={styles.identityMid}>
              <Text style={styles.playerName}>{game.playerName}</Text>
              <View style={[styles.rankPill, { backgroundColor: `${rank.color}18`, borderColor: `${rank.color}45` }]}>
                <Text style={[styles.rankShort, { color: rank.color }]}>◆ {rank.title}</Text>
              </View>
              <Text style={styles.rankSub}>Bible Detective</Text>
            </View>
          </View>

          {/* XP bar */}
          <View style={styles.xpSection}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>LEVEL {game.level} → {game.level + 1}</Text>
              <Text style={styles.xpVal}>{game.xp}<Text style={styles.xpMax}> / {game.xpToNextLevel} XP</Text></Text>
            </View>
            <View style={styles.xpBarBg}>
              <LinearGradient
                colors={[colors.goldLight, colors.gold]}
                style={[styles.xpFill, { width: `${xpPct}%` }]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.xpNext}>{game.xpToNextLevel - game.xp} XP to Level {game.level + 1}</Text>
          </View>
        </LinearGradient>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { icon: "folder" as const, label: "Solved", val: String(game.solvedCases.length), color: colors.green },
            { icon: "disc" as const, label: "Coins", val: String(game.coins), color: colors.amber },
            { icon: "award" as const, label: "Badges", val: String(game.badges.length), color: colors.purple },
            { icon: "zap" as const, label: "Streak", val: `${game.streak}d`, color: colors.red },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.statCardInner}>
                <View style={[styles.statIconBg, { backgroundColor: `${s.color}18` }]}>
                  <Feather name={s.icon} size={14} color={s.color} />
                </View>
                <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(["achievements", "badges"] as const).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
              {activeTab === tab ? (
                <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.tabActive}>
                  <Text style={styles.tabActiveText}>{tab === "achievements" ? "Achievements" : "Badge Collection"}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabInactive}>
                  <Text style={styles.tabInactiveText}>{tab === "achievements" ? "Achievements" : "Badge Collection"}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {activeTab === "achievements" ? (
          <View style={styles.achievementsWrap}>
            {ACHIEVEMENTS.map((ach) => {
              const done = ach.isDone(game);
              return (
                <LinearGradient
                  key={ach.label}
                  colors={done ? [`${ach.color}14`, `${ach.color}05`] : [colors.surface2, colors.surface1]}
                  style={styles.achCard}
                >
                  <View style={[styles.achBorder, { borderColor: done ? `${ach.color}45` : colors.border }]} />
                  <LinearGradient
                    colors={[`${ach.color}20`, `${ach.color}08`]}
                    style={styles.achIcon}
                  >
                    <Feather name={ach.icon} size={18} color={done ? ach.color : colors.textMuted} />
                  </LinearGradient>
                  <View style={styles.achText}>
                    <Text style={[styles.achLabel, { color: done ? colors.text : colors.textMuted }]}>{ach.label}</Text>
                    <Text style={[styles.achVal, { color: done ? ach.color : colors.textFaint }]}>{ach.getValue(game)}</Text>
                  </View>
                  <View style={[styles.achStatus, { backgroundColor: done ? `${ach.color}20` : "transparent", borderColor: done ? `${ach.color}45` : colors.border }]}>
                    <Feather name={done ? "check" : "lock"} size={13} color={done ? ach.color : colors.textFaint} />
                  </View>
                </LinearGradient>
              );
            })}
          </View>
        ) : (
          <View style={styles.badgesGrid}>
            {ALL_BADGES.map((badge) => {
              const owned = game.badges.includes(badge.label) || game.badges.some((b) => b.toLowerCase().includes(badge.label.toLowerCase().split(" ")[0].toLowerCase()));
              return (
                <View key={badge.id} style={[styles.badgeCard, { opacity: owned ? 1 : 0.38 }]}>
                  <LinearGradient
                    colors={owned ? [`${badge.color}22`, `${badge.color}08`] : [colors.surface2, colors.surface1]}
                    style={styles.badgeCardInner}
                  >
                    <View style={[styles.badgeCardBorder, { borderColor: owned ? `${badge.color}45` : colors.border }]} />
                    <LinearGradient
                      colors={[`${badge.color}25`, `${badge.color}08`]}
                      style={styles.badgeIcon}
                    >
                      <Feather name={badge.icon} size={20} color={owned ? badge.color : colors.textFaint} />
                    </LinearGradient>
                    <Text style={[styles.badgeLabel, { color: owned ? colors.text : colors.textFaint }]} numberOfLines={2}>{badge.label}</Text>
                    <Text style={styles.badgeDesc} numberOfLines={2}>{badge.desc}</Text>
                    {owned && (
                      <View style={[styles.ownedDot, { backgroundColor: badge.color }]} />
                    )}
                  </LinearGradient>
                </View>
              );
            })}
          </View>
        )}

        {/* Case progress section */}
        <View style={styles.caseProgressSection}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.gold }]} />
            <Text style={styles.sectionTitle}>Case Progress</Text>
          </View>
          {CASES.map((c, i) => {
            const solved = game.isCaseSolved(c.id);
            const locked = game.isCaseLocked(c.id, i);
            return (
              <LinearGradient key={c.id} colors={[colors.surface2, colors.surface1]} style={styles.caseRow}>
                <View style={[styles.caseRowBorder, { borderColor: colors.border }]} />
                <View style={[styles.caseRowStatus, {
                  backgroundColor: solved ? "rgba(46,204,142,0.15)" : locked ? "rgba(122,133,163,0.08)" : "rgba(212,150,42,0.12)",
                  borderColor: solved ? "rgba(46,204,142,0.4)" : locked ? colors.border : colors.goldBorder,
                }]}>
                  <Feather
                    name={solved ? "check" : locked ? "lock" : "circle"}
                    size={14}
                    color={solved ? colors.green : locked ? colors.textFaint : colors.gold}
                  />
                </View>
                <View style={styles.caseRowText}>
                  <Text style={styles.caseRowTitle}>{c.title}</Text>
                  <Text style={styles.caseRowRef}>{c.bibleReference}</Text>
                </View>
                {solved && (
                  <View style={styles.caseRewardChip}>
                    <Feather name="zap" size={10} color={colors.gold} />
                    <Text style={styles.caseRewardText}>+{c.rewards.xp}</Text>
                  </View>
                )}
              </LinearGradient>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

import { Pressable } from "react-native";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.gold, letterSpacing: 2 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.text },
  settingsBtn: { marginTop: 12 },
  scroll: { flex: 1, paddingHorizontal: 16 },

  identityCard: {
    borderRadius: colors.radius.lg,
    padding: 20,
    marginBottom: 14,
    gap: 16,
    position: "relative",
    overflow: "hidden",
  },
  identityBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  identityTop: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.goldBorder,
  },
  levelBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  levelBadgeText: { fontFamily: "Inter_700Bold", fontSize: 12, color: "#000" },
  identityMid: { flex: 1, gap: 4 },
  playerName: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  rankPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rankShort: { fontFamily: "Inter_600SemiBold", fontSize: 12, letterSpacing: 0.3 },
  rankSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  xpSection: { gap: 5 },
  xpRow: { flexDirection: "row", justifyContent: "space-between" },
  xpLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 1.2 },
  xpVal: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  xpMax: { color: colors.textMuted },
  xpBarBg: { height: 6, backgroundColor: colors.surface3, borderRadius: 3, overflow: "hidden" },
  xpFill: { height: 6, borderRadius: 3 },
  xpNext: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },

  statsRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  statCard: { flex: 1 },
  statCardInner: {
    borderRadius: colors.radius.md,
    padding: 10,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconBg: { width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 14 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 9, color: colors.textMuted },

  tabs: { flexDirection: "row", gap: 8, marginBottom: 16 },
  tab: { flex: 1 },
  tabActive: { borderRadius: colors.radius.md, padding: 10, alignItems: "center" },
  tabActiveText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  tabInactive: {
    borderRadius: colors.radius.md,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabInactiveText: { fontFamily: "Inter_500Medium", fontSize: 13, color: colors.textMuted },

  achievementsWrap: { gap: 8, marginBottom: 22 },
  achCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: colors.radius.md,
    padding: 13,
    position: "relative",
    overflow: "hidden",
  },
  achBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  achIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  achText: { flex: 1 },
  achLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  achVal: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  achStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  badgesGrid: { flexDirection: "row", flexWrap: "wrap", gap: "4%" as any, rowGap: 12, marginBottom: 22 },
  badgeCard: { width: "48%", position: "relative" },
  badgeCardInner: {
    borderRadius: colors.radius.lg,
    padding: 14,
    alignItems: "center",
    gap: 6,
    position: "relative",
    overflow: "hidden",
  },
  badgeCardBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12, textAlign: "center" },
  badgeDesc: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted, textAlign: "center", lineHeight: 14 },
  ownedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 2,
  },

  caseProgressSection: { marginBottom: 16 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text },
  caseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: colors.radius.md,
    padding: 13,
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  caseRowBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  caseRowStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  caseRowText: { flex: 1 },
  caseRowTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text },
  caseRowRef: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 1 },
  caseRewardChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(212,150,42,0.1)",
    borderRadius: colors.radius.full,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.goldBorder,
  },
  caseRewardText: { fontFamily: "Inter_700Bold", fontSize: 10, color: colors.gold },
});
