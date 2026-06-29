import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";

const MODES = [
  {
    icon: "book" as const,
    title: "Story Mode",
    desc: "Journey through the Old Testament",
    color: colors.gold,
    glow: colors.goldGlow,
    gradient: ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.05)"] as const,
    border: colors.goldBorder,
    available: true,
    route: "/(tabs)/index" as const,
  },
  {
    icon: "sun" as const,
    title: "Daily Mystery",
    desc: "A new biblical mystery every day",
    color: colors.blue,
    glow: colors.blueGlow,
    gradient: ["rgba(74,126,232,0.18)", "rgba(74,126,232,0.05)"] as const,
    border: "rgba(74,126,232,0.35)",
    available: false,
  },
  {
    icon: "clock" as const,
    title: "Time Attack",
    desc: "Solve cases against the clock",
    color: colors.red,
    glow: colors.redGlow,
    gradient: ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.05)"] as const,
    border: "rgba(232,64,64,0.35)",
    available: false,
  },
  {
    icon: "heart" as const,
    title: "Survival Mode",
    desc: "No hints. No retries. Pure skill.",
    color: colors.purple,
    glow: colors.purpleGlow,
    gradient: ["rgba(124,94,232,0.18)", "rgba(124,94,232,0.05)"] as const,
    border: "rgba(124,94,232,0.35)",
    available: false,
  },
  {
    icon: "calendar" as const,
    title: "Weekly Challenge",
    desc: "Compete for top rank every week",
    color: colors.green,
    glow: colors.greenGlow,
    gradient: ["rgba(46,204,142,0.18)", "rgba(46,204,142,0.05)"] as const,
    border: "rgba(46,204,142,0.35)",
    available: false,
  },
  {
    icon: "users" as const,
    title: "Church Group Mode",
    desc: "Investigate together as a team",
    color: colors.amber,
    glow: "rgba(245,166,35,0.2)",
    gradient: ["rgba(245,166,35,0.18)", "rgba(245,166,35,0.05)"] as const,
    border: "rgba(245,166,35,0.35)",
    available: false,
  },
];

function getDailyCase(solved: string[]) {
  const dayOfYear = Math.floor(Date.now() / 86400000);
  const unsolved = CASES.filter((c) => !solved.includes(c.id));
  const pool = unsolved.length > 0 ? unsolved : CASES;
  return pool[dayOfYear % pool.length];
}

export default function PlayScreen() {
  const insets = useSafeAreaInsets();
  const { solvedCases, streak, isCaseLocked, level, xp, xpToNextLevel } = useGame();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const daily = getDailyCase(solvedCases);
  const isDailyLocked = isCaseLocked(daily.id, CASES.findIndex((c) => c.id === daily.id));

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <View>
          <Text style={styles.headerLabel}>GAME MODES</Text>
          <Text style={styles.headerTitle}>Play</Text>
        </View>
        <View style={styles.streakWrap}>
          <LinearGradient
            colors={streak > 0 ? ["rgba(245,166,35,0.25)", "rgba(245,166,35,0.08)"] : ["rgba(122,133,163,0.12)", "rgba(122,133,163,0.04)"]}
            style={styles.streakChip}
          >
            <Feather name="zap" size={14} color={streak > 0 ? colors.amber : colors.textMuted} />
            <Text style={[styles.streakNum, { color: streak > 0 ? colors.amber : colors.textMuted }]}>{streak}</Text>
            <Text style={[styles.streakLabel, { color: streak > 0 ? colors.amber : colors.textMuted }]}>day streak</Text>
          </LinearGradient>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}>

        {/* Daily Mystery Feature Card */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.blue }]} />
            <Text style={styles.sectionTitle}>Today's Mystery</Text>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>DAILY</Text>
            </View>
          </View>

          <Pressable
            onPress={isDailyLocked ? undefined : () => router.push(`/case/${daily.id}`)}
            style={({ pressed }) => ({ opacity: pressed && !isDailyLocked ? 0.88 : isDailyLocked ? 0.5 : 1 })}
          >
            <LinearGradient
              colors={["#1A2240", "#101828"]}
              style={styles.featuredCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.featuredBorder, { borderColor: "rgba(74,126,232,0.4)" }]} />

              <View style={styles.featuredTop}>
                <LinearGradient
                  colors={["rgba(74,126,232,0.3)", "rgba(74,126,232,0.08)"]}
                  style={styles.featuredIcon}
                >
                  <Feather name="sun" size={22} color={colors.blue} />
                </LinearGradient>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredLabel}>CASE FILE • {daily.caseNumber}</Text>
                  <Text style={styles.featuredTitle}>{daily.title}</Text>
                  <Text style={styles.featuredRef}>{daily.bibleReference}</Text>
                </View>
                {isDailyLocked ? (
                  <Feather name="lock" size={18} color={colors.textMuted} />
                ) : (
                  <LinearGradient colors={[colors.blue, "#3060C0"]} style={styles.featuredArrow}>
                    <Feather name="arrow-right" size={16} color="#fff" />
                  </LinearGradient>
                )}
              </View>

              <View style={styles.featuredStats}>
                <View style={styles.featuredStat}>
                  <Feather name="zap" size={11} color={colors.gold} />
                  <Text style={styles.featuredStatText}>{daily.rewards.xp} XP</Text>
                </View>
                <View style={styles.featuredStat}>
                  <Feather name="disc" size={11} color={colors.amber} />
                  <Text style={styles.featuredStatText}>{daily.rewards.coins} Coins</Text>
                </View>
                <View style={styles.featuredStat}>
                  <Feather name="tag" size={11} color={colors.textMuted} />
                  <Text style={styles.featuredStatText}>{daily.difficulty}</Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {/* XP Progress compact */}
        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.xpBanner}>
          <View style={[styles.xpBannerBorder, { borderColor: colors.border }]} />
          <Feather name="trending-up" size={14} color={colors.gold} />
          <Text style={styles.xpBannerLabel}>Level {level}</Text>
          <View style={styles.xpBannerBar}>
            <LinearGradient
              colors={[colors.goldLight, colors.gold]}
              style={[styles.xpBannerFill, { width: `${Math.min((xp / xpToNextLevel) * 100, 100)}%` }]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={styles.xpBannerVal}>{xp}/{xpToNextLevel} XP</Text>
        </LinearGradient>

        {/* Mode grid */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.purple }]} />
            <Text style={styles.sectionTitle}>All Modes</Text>
          </View>
          <View style={styles.modesGrid}>
            {MODES.map((mode) => (
              <Pressable
                key={mode.title}
                onPress={mode.available && mode.route ? () => router.push(mode.route as any) : undefined}
                style={({ pressed }) => ({ opacity: pressed && mode.available ? 0.8 : 1, width: "48%" })}
              >
                <LinearGradient
                  colors={mode.gradient}
                  style={[styles.modeCard, { borderColor: mode.border, opacity: mode.available ? 1 : 0.55 }]}
                >
                  <View style={styles.modeCardTop}>
                    <LinearGradient
                      colors={[`${mode.color}25`, `${mode.color}08`]}
                      style={styles.modeIcon}
                    >
                      <Feather name={mode.icon} size={20} color={mode.color} />
                    </LinearGradient>
                    {!mode.available && (
                      <View style={styles.soonChip}>
                        <Text style={styles.soonText}>SOON</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.modeTitle}>{mode.title}</Text>
                  <Text style={styles.modeDesc}>{mode.desc}</Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Learning path teaser */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.green }]} />
            <Text style={styles.sectionTitle}>Learning Paths</Text>
            <View style={styles.soonPill}><Text style={styles.soonPillText}>Coming Soon</Text></View>
          </View>
          {[
            { icon: "map" as const, label: "Bible Geography", sub: "Walk the ancient lands", color: colors.blue },
            { icon: "clock" as const, label: "Prophetic Timeline", sub: "Connect prophecy to fulfilment", color: colors.purple },
            { icon: "book-open" as const, label: "Character Studies", sub: "Deep dives into biblical figures", color: colors.gold },
          ].map((path) => (
            <LinearGradient key={path.label} colors={[colors.surface2, colors.surface1]} style={styles.pathRow}>
              <View style={[styles.pathRowBorder, { borderColor: colors.border }]} />
              <LinearGradient
                colors={[`${path.color}18`, `${path.color}06`]}
                style={styles.pathIcon}
              >
                <Feather name={path.icon} size={16} color={path.color} />
              </LinearGradient>
              <View style={styles.pathText}>
                <Text style={styles.pathLabel}>{path.label}</Text>
                <Text style={styles.pathSub}>{path.sub}</Text>
              </View>
              <Feather name="lock" size={14} color={colors.textFaint} />
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

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
  streakWrap: {},
  streakChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: colors.radius.full,
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.3)",
    marginTop: 4,
  },
  streakNum: { fontFamily: "Inter_700Bold", fontSize: 18 },
  streakLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 22 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(74,126,232,0.12)",
    borderRadius: colors.radius.full,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(74,126,232,0.3)",
  },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.blue },
  liveText: { fontFamily: "Inter_700Bold", fontSize: 9, color: colors.blue, letterSpacing: 1 },
  featuredCard: {
    borderRadius: colors.radius.lg,
    padding: 16,
    gap: 14,
    position: "relative",
    overflow: "hidden",
  },
  featuredBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  featuredTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  featuredIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(74,126,232,0.35)",
  },
  featuredMeta: { flex: 1 },
  featuredLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.blue, letterSpacing: 1.5, marginBottom: 2 },
  featuredTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  featuredRef: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  featuredArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredStats: { flexDirection: "row", gap: 14 },
  featuredStat: { flexDirection: "row", alignItems: "center", gap: 5 },
  featuredStatText: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.textMuted },
  xpBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: colors.radius.md,
    padding: 12,
    marginBottom: 22,
    position: "relative",
    overflow: "hidden",
  },
  xpBannerBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  xpBannerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.gold },
  xpBannerBar: { flex: 1, height: 4, backgroundColor: colors.surface3, borderRadius: 2, overflow: "hidden" },
  xpBannerFill: { height: 4, borderRadius: 2 },
  xpBannerVal: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  modesGrid: { flexDirection: "row", flexWrap: "wrap", gap: "4%" as any, rowGap: 12 },
  modeCard: {
    borderRadius: colors.radius.lg,
    padding: 14,
    gap: 6,
    borderWidth: 1,
  },
  modeCardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  modeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  soonChip: {
    backgroundColor: "rgba(122,133,163,0.15)",
    borderRadius: colors.radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  soonText: { fontFamily: "Inter_600SemiBold", fontSize: 8, color: colors.textMuted, letterSpacing: 0.8 },
  modeTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text },
  modeDesc: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, lineHeight: 16 },
  soonPill: {
    backgroundColor: "rgba(122,133,163,0.1)",
    borderRadius: colors.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  soonPillText: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.textMuted },
  pathRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: colors.radius.md,
    padding: 14,
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  pathRowBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  pathIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pathText: { flex: 1 },
  pathLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text },
  pathSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 1 },
});
