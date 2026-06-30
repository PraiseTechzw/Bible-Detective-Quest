import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { getRankForLevel } from "@/constants/ranks";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";

function getDailyCase(solved: string[]) {
  const dayOfYear = Math.floor(Date.now() / 86400000);
  const pool = CASES;
  return pool[dayOfYear % pool.length];
}

function useEntrance(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, delay, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, []);
  return { opacity, transform: [{ translateY }] };
}

const MODES = [
  {
    emoji: "📖",
    title: "Story Mode",
    desc: "Journey through Scripture case by case",
    color: colors.gold,
    gradient: ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.05)"] as const,
    border: colors.goldBorder,
    available: true,
    badge: null,
    onPress: () => router.push("/(tabs)" as any),
    howTo: "Unlock and solve all 6 cases in order. Each case must be completed to unlock the next.",
  },
  {
    emoji: "☀️",
    title: "Daily Mystery",
    desc: "A rotating case — different every day",
    color: colors.blue,
    gradient: ["rgba(74,126,232,0.18)", "rgba(74,126,232,0.05)"] as const,
    border: "rgba(74,126,232,0.35)",
    available: true,
    badge: "DAILY",
    onPress: null as (() => void) | null,
    howTo: "A case rotates daily. Complete it for bonus streak XP.",
  },
  {
    emoji: "⏱️",
    title: "Time Attack",
    desc: "Solve a case before the clock runs out",
    color: colors.red,
    gradient: ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.05)"] as const,
    border: "rgba(232,64,64,0.35)",
    available: true,
    badge: "TIMED",
    onPress: () => router.push("/(tabs)" as any),
    howTo: "Same cases, faster pace. Every wrong answer costs 30 seconds. Finish before time is up.",
  },
  {
    emoji: "❤️",
    title: "Survival Mode",
    desc: "No hints. No retries. One wrong answer ends it.",
    color: colors.purple,
    gradient: ["rgba(124,94,232,0.18)", "rgba(124,94,232,0.05)"] as const,
    border: "rgba(124,94,232,0.35)",
    available: true,
    badge: "HARD",
    onPress: () => router.push("/(tabs)" as any),
    howTo: "Every question is final. One wrong answer ends your run. Perfect score or bust.",
  },
  {
    emoji: "📅",
    title: "Weekly Challenge",
    desc: "New themed case bundle every Monday",
    color: colors.green,
    gradient: ["rgba(46,204,142,0.18)", "rgba(46,204,142,0.05)"] as const,
    border: "rgba(46,204,142,0.35)",
    available: false,
    badge: "SOON",
    onPress: null,
    howTo: "Weekly themed bundles — coming in a future update.",
  },
  {
    emoji: "👥",
    title: "Church Group",
    desc: "Investigate together as a team",
    color: colors.amber,
    gradient: ["rgba(245,166,35,0.18)", "rgba(245,166,35,0.05)"] as const,
    border: "rgba(245,166,35,0.35)",
    available: false,
    badge: "SOON",
    onPress: null,
    howTo: "Multiplayer mode — coming in a future update.",
  },
];

const DIFFICULTY_GUIDE = [
  { emoji: "🟢", label: "Beginner", cases: "Cases 1–2", desc: "Shorter timelines, fewer suspects, classic stories. Perfect starting point." },
  { emoji: "🟡", label: "Intermediate", cases: "Cases 3–4", desc: "Multiple credible suspects, more evidence to cross-reference, tricky timelines." },
  { emoji: "🔴", label: "Advanced", cases: "Cases 5–6", desc: "Ambiguous motives, overlapping testimony, spiritual dimensions — hardest questions." },
];

const LEARNING_PATHS = [
  { emoji: "🗺️", label: "Bible Geography", sub: "Walk the ancient Near East", color: colors.blue },
  { emoji: "⏳", label: "Prophetic Timeline", sub: "Connect prophecy to fulfilment", color: colors.purple },
  { emoji: "👤", label: "Character Studies", sub: "Deep dives into biblical figures", color: colors.gold },
  { emoji: "📜", label: "Book-by-Book", sub: "Genesis → Revelation study path", color: colors.green },
];

export default function PlayScreen() {
  const insets = useSafeAreaInsets();
  const { solvedCases, streak, isCaseLocked, level, xp, xpToNextLevel } = useGame();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const daily = getDailyCase(solvedCases);
  const isDailyLocked = isCaseLocked(daily.id, CASES.findIndex((c) => c.id === daily.id));
  const rank = getRankForLevel(level);

  const [expandedMode, setExpandedMode] = useState<string | null>(null);

  const headerAnim = useEntrance(0);
  const dailyAnim = useEntrance(80);
  const xpAnim = useEntrance(140);
  const modesAnim = useEntrance(200);
  const diffAnim = useEntrance(260);

  const modeScales = useRef(MODES.map(() => new Animated.Value(1))).current;

  const pressModeIn = (i: number) => Animated.spring(modeScales[i], { toValue: 0.96, useNativeDriver: true, tension: 200, friction: 10 }).start();
  const pressModeOut = (i: number) => Animated.spring(modeScales[i], { toValue: 1, useNativeDriver: true, tension: 100, friction: 8 }).start();

  const modePressHandler = (mode: typeof MODES[0], index: number) => {
    if (!mode.available) {
      setExpandedMode(expandedMode === mode.title ? null : mode.title);
      return;
    }
    setExpandedMode(expandedMode === mode.title ? null : mode.title);
    if (mode.onPress && mode.title !== "Time Attack" && mode.title !== "Survival Mode") mode.onPress();
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.header, { paddingTop: topPad + 8 }, headerAnim]}>
        <View>
          <Text style={styles.headerLabel}>GAME MODES</Text>
          <Text style={styles.headerTitle}>Play</Text>
        </View>
        <View style={styles.headerRight}>
          {streak > 0 && (
            <LinearGradient colors={["rgba(245,166,35,0.25)", "rgba(245,166,35,0.08)"]} style={styles.streakChip}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakNum}>{streak}</Text>
              <Text style={styles.streakLabel}>streak</Text>
            </LinearGradient>
          )}
          <LinearGradient colors={[rank.gradTop, rank.gradBot]} style={styles.rankBadge}>
            <Text style={{ fontSize: 18 }}>{rank.crest}</Text>
            <Text style={[styles.rankLabel, { color: rank.color }]}>Lv{level}</Text>
          </LinearGradient>
        </View>
      </Animated.View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}>

        {/* Daily Mystery */}
        <Animated.View style={dailyAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.blue }]} />
            <Text style={styles.sectionTitle}>Today's Mystery</Text>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE DAILY</Text>
            </View>
          </View>
          <Pressable onPress={isDailyLocked ? undefined : () => router.push(`/case/${daily.id}` as any)}
            style={({ pressed }) => ({ opacity: pressed && !isDailyLocked ? 0.88 : isDailyLocked ? 0.5 : 1 })}>
            <LinearGradient colors={["#1A2240", "#101828"]} style={styles.featuredCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={[styles.featuredBorder, { borderColor: "rgba(74,126,232,0.4)" }]} />
              <View style={styles.featuredTop}>
                <Text style={styles.featuredEmoji}>☀️</Text>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredCaseNum}>{daily.caseNumber} · DAILY</Text>
                  <Text style={styles.featuredTitle}>{daily.title}</Text>
                  <Text style={styles.featuredRef}>{daily.bibleReference}</Text>
                </View>
                {isDailyLocked ? (
                  <Text style={{ fontSize: 20 }}>🔒</Text>
                ) : (
                  <LinearGradient colors={[colors.blue, "#3060C0"]} style={styles.featuredArrow}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>→</Text>
                  </LinearGradient>
                )}
              </View>
              <View style={styles.featuredStats}>
                <StatPill emoji="⚡" val={`${daily.rewards.xp} XP`} />
                <StatPill emoji="🪙" val={`${daily.rewards.coins} coins`} />
                <StatPill emoji="📊" val={daily.difficulty} />
              </View>
              {isDailyLocked && (
                <View style={styles.lockedBanner}>
                  <Text style={styles.lockedBannerText}>🔒  Complete previous cases to unlock this one</Text>
                </View>
              )}
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* XP banner */}
        <Animated.View style={xpAnim}>
          <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.xpBanner}>
            <View style={[styles.xpBannerBorder, { borderColor: colors.border }]} />
            <Text style={{ fontSize: 16 }}>{rank.crest}</Text>
            <Text style={[styles.xpBannerLabel, { color: rank.color }]}>Level {level} · {rank.shortTitle}</Text>
            <View style={styles.xpBannerBar}>
              <LinearGradient colors={[rank.rimColor, rank.color]} style={[styles.xpBannerFill, { width: `${Math.min((xp / xpToNextLevel) * 100, 100)}%` }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
            </View>
            <Text style={styles.xpBannerVal}>{xp}/{xpToNextLevel}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Modes */}
        <Animated.View style={modesAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.purple }]} />
            <Text style={styles.sectionTitle}>All Modes</Text>
          </View>
          <View style={styles.modesGrid}>
            {MODES.map((mode, idx) => {
              const expanded = expandedMode === mode.title;
              return (
                <Animated.View key={mode.title} style={{ width: "48%", transform: [{ scale: modeScales[idx] }] }}>
                  <Pressable
                    onPress={() => modePressHandler(mode, idx)}
                    onPressIn={() => pressModeIn(idx)}
                    onPressOut={() => pressModeOut(idx)}
                  >
                    <LinearGradient colors={mode.gradient} style={[styles.modeCard, { borderColor: mode.border, opacity: mode.available ? 1 : 0.6 }]}>
                      <View style={styles.modeCardTop}>
                        <Text style={styles.modeEmoji}>{mode.emoji}</Text>
                        {mode.badge && (
                          <View style={[styles.modeBadge, {
                            backgroundColor: mode.badge === "SOON" ? "rgba(122,133,163,0.15)" : `${mode.color}20`,
                            borderColor: mode.badge === "SOON" ? colors.border : `${mode.color}50`,
                          }]}>
                            <Text style={[styles.modeBadgeText, { color: mode.badge === "SOON" ? colors.textMuted : mode.color }]}>{mode.badge}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.modeTitle}>{mode.title}</Text>
                      <Text style={styles.modeDesc}>{mode.desc}</Text>
                      {expanded && (
                        <View style={[styles.modeExpanded, { borderTopColor: `${mode.color}30` }]}>
                          <Text style={[styles.modeExpandedText, { color: mode.color }]}>ℹ️  {mode.howTo}</Text>
                          {mode.available && mode.onPress && (
                            <Pressable onPress={mode.onPress} style={[styles.modeLaunchBtn, { backgroundColor: `${mode.color}20`, borderColor: `${mode.color}50` }]}>
                              <Text style={[styles.modeLaunchText, { color: mode.color }]}>▶ Start</Text>
                            </Pressable>
                          )}
                        </View>
                      )}
                    </LinearGradient>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Difficulty Guide */}
        <Animated.View style={diffAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.amber }]} />
            <Text style={styles.sectionTitle}>Difficulty Guide</Text>
          </View>
          {DIFFICULTY_GUIDE.map((d, i) => (
            <LinearGradient key={d.label} colors={[colors.surface2, colors.surface1]} style={styles.diffCard}>
              <View style={[styles.diffCardBorder, { borderColor: colors.border }]} />
              <Text style={{ fontSize: 22 }}>{d.emoji}</Text>
              <View style={{ flex: 1 }}>
                <View style={styles.diffTop}>
                  <Text style={styles.diffLabel}>{d.label}</Text>
                  <View style={styles.diffCasePill}><Text style={styles.diffCaseText}>{d.cases}</Text></View>
                </View>
                <Text style={styles.diffDesc}>{d.desc}</Text>
              </View>
            </LinearGradient>
          ))}
        </Animated.View>

        {/* Learning Paths */}
        <View style={{ marginBottom: 8 }}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.green }]} />
            <Text style={styles.sectionTitle}>Learning Paths</Text>
            <View style={styles.soonPill}><Text style={styles.soonPillText}>Coming Soon</Text></View>
          </View>
          {LEARNING_PATHS.map((path) => (
            <LinearGradient key={path.label} colors={[colors.surface2, colors.surface1]} style={styles.pathRow}>
              <View style={[styles.pathRowBorder, { borderColor: colors.border }]} />
              <Text style={{ fontSize: 22 }}>{path.emoji}</Text>
              <View style={styles.pathText}>
                <Text style={styles.pathLabel}>{path.label}</Text>
                <Text style={styles.pathSub}>{path.sub}</Text>
              </View>
              <Text style={{ fontSize: 16 }}>🔒</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Fun fact */}
        <LinearGradient colors={["rgba(212,150,42,0.1)", "rgba(212,150,42,0.04)"]} style={styles.funFactCard}>
          <View style={[styles.funFactBorder, { borderColor: colors.goldBorder }]} />
          <Text style={styles.funFactEmoji}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.funFactLabel}>Did you know?</Text>
            <Text style={styles.funFactText}>The word "detective" doesn't appear in Scripture — but Solomon was essentially running a forensic interview in 1 Kings 3. He just used a sword instead of a questionnaire.</Text>
          </View>
        </LinearGradient>

      </ScrollView>
    </View>
  );
}

function StatPill({ emoji, val }: { emoji: string; val: string }) {
  return (
    <View style={pillStyles.pill}>
      <Text style={{ fontSize: 11 }}>{emoji}</Text>
      <Text style={pillStyles.text}>{val}</Text>
    </View>
  );
}
const pillStyles = StyleSheet.create({
  pill: { flexDirection: "row", alignItems: "center", gap: 4 },
  text: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.textMuted },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.gold, letterSpacing: 2 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.text },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  streakChip: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: colors.radius.full, borderWidth: 1, borderColor: "rgba(245,166,35,0.3)" },
  streakEmoji: { fontSize: 14 },
  streakNum: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.amber },
  streakLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.amber },
  rankBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: colors.radius.full, borderWidth: 1, borderColor: colors.border },
  rankLabel: { fontFamily: "Inter_700Bold", fontSize: 13 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(74,126,232,0.12)", borderRadius: colors.radius.full, paddingHorizontal: 9, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(74,126,232,0.3)" },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.blue },
  liveText: { fontFamily: "Inter_700Bold", fontSize: 9, color: colors.blue, letterSpacing: 1 },
  featuredCard: { borderRadius: colors.radius.lg, padding: 16, gap: 12, position: "relative", overflow: "hidden", marginBottom: 18 },
  featuredBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  featuredTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  featuredEmoji: { fontSize: 36 },
  featuredMeta: { flex: 1 },
  featuredCaseNum: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.blue, letterSpacing: 1.5, marginBottom: 2 },
  featuredTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  featuredRef: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  featuredArrow: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  featuredStats: { flexDirection: "row", gap: 14 },
  lockedBanner: { backgroundColor: "rgba(122,133,163,0.12)", borderRadius: colors.radius.md, padding: 10, borderWidth: 1, borderColor: colors.border },
  lockedBannerText: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.textMuted, textAlign: "center" },
  xpBanner: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: colors.radius.md, padding: 12, marginBottom: 20, position: "relative", overflow: "hidden" },
  xpBannerBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  xpBannerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  xpBannerBar: { flex: 1, height: 4, backgroundColor: colors.surface3, borderRadius: 2, overflow: "hidden" },
  xpBannerFill: { height: 4, borderRadius: 2 },
  xpBannerVal: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  modesGrid: { flexDirection: "row", flexWrap: "wrap", gap: "4%" as any, rowGap: 10, marginBottom: 22 },
  modeCard: { borderRadius: colors.radius.lg, padding: 14, gap: 6, borderWidth: 1 },
  modeCardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  modeEmoji: { fontSize: 28 },
  modeBadge: { borderRadius: colors.radius.full, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1 },
  modeBadgeText: { fontFamily: "Inter_700Bold", fontSize: 8, letterSpacing: 0.8 },
  modeTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text },
  modeDesc: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, lineHeight: 16 },
  modeExpanded: { borderTopWidth: 1, marginTop: 8, paddingTop: 8, gap: 8 },
  modeExpandedText: { fontFamily: "Inter_400Regular", fontSize: 11, lineHeight: 17 },
  modeLaunchBtn: { borderRadius: colors.radius.md, padding: 8, alignItems: "center", borderWidth: 1 },
  modeLaunchText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  diffCard: { flexDirection: "row", gap: 12, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, alignItems: "flex-start", position: "relative", overflow: "hidden" },
  diffCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  diffTop: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  diffLabel: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text },
  diffCasePill: { backgroundColor: colors.surface3, borderRadius: colors.radius.full, paddingHorizontal: 7, paddingVertical: 2, borderWidth: 1, borderColor: colors.border },
  diffCaseText: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.textMuted },
  diffDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  soonPill: { backgroundColor: "rgba(122,133,163,0.1)", borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: colors.border },
  soonPillText: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.textMuted },
  pathRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, position: "relative", overflow: "hidden" },
  pathRowBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  pathText: { flex: 1 },
  pathLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text },
  pathSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 1 },
  funFactCard: { flexDirection: "row", gap: 10, borderRadius: colors.radius.lg, padding: 14, marginTop: 4, marginBottom: 8, position: "relative", overflow: "hidden", alignItems: "flex-start" },
  funFactBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  funFactEmoji: { fontSize: 22 },
  funFactLabel: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, marginBottom: 4 },
  funFactText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 19 },
});
