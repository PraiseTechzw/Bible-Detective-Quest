import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { getRankForLevel } from "@/constants/ranks";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";
import type { GameMode } from "@/context/GameContext";

function getDailyCase() {
  const dayOfYear = Math.floor(Date.now() / 86400000);
  return CASES[dayOfYear % CASES.length];
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

// Case picker modal — shown for Time Attack & Survival before a game starts
function CasePickerModal({ visible, mode, onClose, onSelect }: {
  visible: boolean;
  mode: GameMode;
  onClose: () => void;
  onSelect: (caseId: string) => void;
}) {
  const { solvedCases, isCaseLocked } = useGame();
  const modeLabel = mode === "timeAttack" ? "⏱️ Time Attack" : "❤️ Survival Mode";
  const modeColor = mode === "timeAttack" ? colors.red : colors.purple;
  const modeDesc = mode === "timeAttack"
    ? "Solve the case in 3 minutes. Every wrong answer costs 30 seconds."
    : "One life. Zero hints. One wrong answer ends the case.";

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={picker.backdrop} onPress={onClose}>
        <Pressable style={picker.sheet} onPress={() => {}}>
          <LinearGradient colors={["#0F1425", "#070A13"]} style={StyleSheet.absoluteFill} />
          <View style={[picker.handle, { backgroundColor: colors.border }]} />

          <View style={picker.sheetHeader}>
            <Text style={[picker.sheetTitle, { color: modeColor }]}>{modeLabel}</Text>
            <Text style={picker.sheetDesc}>{modeDesc}</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
            {CASES.map((c, i) => {
              const solved = solvedCases.includes(c.id);
              const locked = isCaseLocked(c.id, i);
              const statusEmoji = solved ? "✅" : locked ? "🔒" : "🔍";
              return (
                <Pressable
                  key={c.id}
                  onPress={locked ? undefined : () => onSelect(c.id)}
                  style={({ pressed }) => ({ opacity: pressed && !locked ? 0.8 : locked ? 0.4 : 1 })}
                >
                  <LinearGradient
                    colors={locked ? [colors.surface2, colors.surface1] : [modeColor + "12", modeColor + "05"]}
                    style={[picker.caseRow, { borderColor: locked ? colors.border : modeColor + "40" }]}
                  >
                    <Text style={{ fontSize: 20, width: 28, textAlign: "center" }}>{statusEmoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[picker.caseName, { color: locked ? colors.textMuted : colors.text }]}>{c.title}</Text>
                      <Text style={picker.caseMeta}>{c.bibleReference} · {c.difficulty}</Text>
                    </View>
                    <View style={[picker.xpPill, { backgroundColor: modeColor + "18", borderColor: modeColor + "40" }]}>
                      <Text style={[picker.xpText, { color: modeColor }]}>+{c.rewards.xp} XP</Text>
                    </View>
                    {!locked && <Text style={[picker.go, { color: modeColor }]}>▶</Text>}
                  </LinearGradient>
                </Pressable>
              );
            })}
          </ScrollView>

          <Pressable onPress={onClose} style={picker.cancelBtn}>
            <Text style={picker.cancelText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const picker = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 16, gap: 12, borderTopWidth: 1, borderColor: colors.border, overflow: "hidden" },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 4 },
  sheetHeader: { gap: 4, marginBottom: 4 },
  sheetTitle: { fontFamily: "Inter_700Bold", fontSize: 20 },
  sheetDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  caseRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: colors.radius.md, padding: 13, marginBottom: 7, borderWidth: 1 },
  caseName: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  caseMeta: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 1 },
  xpPill: { borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  xpText: { fontFamily: "Inter_700Bold", fontSize: 10 },
  go: { fontFamily: "Inter_700Bold", fontSize: 18 },
  cancelBtn: { borderRadius: colors.radius.md, padding: 14, alignItems: "center", backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, marginTop: 4 },
  cancelText: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.textMuted },
});

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
  const daily = getDailyCase();
  const isDailyLocked = isCaseLocked(daily.id, CASES.findIndex((c) => c.id === daily.id));
  const rank = getRankForLevel(level);

  const [pickerMode, setPickerMode] = useState<GameMode | null>(null);
  const [expandedMode, setExpandedMode] = useState<string | null>(null);

  const headerAnim = useEntrance(0);
  const dailyAnim = useEntrance(80);
  const xpAnim = useEntrance(140);
  const modesAnim = useEntrance(200);
  const diffAnim = useEntrance(260);

  const modeScales = useRef(["Story Mode", "Daily Mystery", "Time Attack", "Survival Mode", "Weekly Challenge", "Church Group"].map(() => new Animated.Value(1))).current;
  const pressModeIn = (i: number) => Animated.spring(modeScales[i], { toValue: 0.96, useNativeDriver: true, tension: 200, friction: 10 }).start();
  const pressModeOut = (i: number) => Animated.spring(modeScales[i], { toValue: 1, useNativeDriver: true, tension: 100, friction: 8 }).start();

  const launchCase = (caseId: string, mode: GameMode) => {
    setPickerMode(null);
    router.push(`/case/${caseId}?mode=${mode}` as any);
  };

  const MODES = [
    {
      emoji: "📖", title: "Story Mode",
      desc: "Journey through Scripture case by case",
      color: colors.gold,
      gradient: ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.05)"] as const,
      border: colors.goldBorder, badge: null, available: true,
      howTo: "Unlock all 6 cases in order. Complete each one to move to the next.",
      onPress: () => router.push("/(tabs)" as any),
    },
    {
      emoji: "☀️", title: "Daily Mystery",
      desc: "A different case rotates every day",
      color: colors.blue,
      gradient: ["rgba(74,126,232,0.18)", "rgba(74,126,232,0.05)"] as const,
      border: "rgba(74,126,232,0.35)", badge: "DAILY", available: !isDailyLocked,
      howTo: isDailyLocked ? "Complete the previous case to unlock today's mystery." : `Today: "${daily.title}" — ${daily.bibleReference}. Tap ▶ Start to begin.`,
      onPress: isDailyLocked ? null : () => launchCase(daily.id, "daily"),
    },
    {
      emoji: "⏱️", title: "Time Attack",
      desc: "3 minutes. Solve it or lose it.",
      color: colors.red,
      gradient: ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.05)"] as const,
      border: "rgba(232,64,64,0.35)", badge: "TIMED", available: true,
      howTo: "Pick any unlocked case. 3-minute countdown. Each wrong answer −30 seconds. Finish before time's up.",
      onPress: () => setPickerMode("timeAttack"),
    },
    {
      emoji: "❤️", title: "Survival Mode",
      desc: "No hints. No mercy. One wrong = game over.",
      color: colors.purple,
      gradient: ["rgba(124,94,232,0.18)", "rgba(124,94,232,0.05)"] as const,
      border: "rgba(124,94,232,0.35)", badge: "HARD", available: true,
      howTo: "You get 3 lives. Any wrong answer costs a life. Lose all 3 and the case is closed — by you, against yourself.",
      onPress: () => setPickerMode("survival"),
    },
    {
      emoji: "📅", title: "Weekly Challenge",
      desc: "New themed case bundle every Monday",
      color: colors.green,
      gradient: ["rgba(46,204,142,0.18)", "rgba(46,204,142,0.05)"] as const,
      border: "rgba(46,204,142,0.35)", badge: "SOON", available: false,
      howTo: "Weekly themed bundles — coming in a future update.",
      onPress: null,
    },
    {
      emoji: "👥", title: "Church Group",
      desc: "Investigate together as a team",
      color: colors.amber,
      gradient: ["rgba(245,166,35,0.18)", "rgba(245,166,35,0.05)"] as const,
      border: "rgba(245,166,35,0.35)", badge: "SOON", available: false,
      howTo: "Multiplayer group mode — coming in a future update.",
      onPress: null,
    },
  ];

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
            <Text style={[styles.rankShort, { color: rank.rimColor }]}>{rank.shortTitle}</Text>
            <Text style={[styles.rankLabel, { color: rank.color }]}>Lv{level}</Text>
          </LinearGradient>
        </View>
      </Animated.View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}>

        {/* Daily Mystery hero card */}
        <Animated.View style={dailyAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.blue }]} />
            <Text style={styles.sectionTitle}>Today's Mystery</Text>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE DAILY</Text>
            </View>
          </View>
          <Pressable onPress={isDailyLocked ? undefined : () => launchCase(daily.id, "daily")}
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
                  <Text style={{ fontSize: 22 }}>🔒</Text>
                ) : (
                  <LinearGradient colors={[colors.blue, "#3060C0"]} style={styles.featuredArrow}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>▶</Text>
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
                  <Text style={styles.lockedBannerText}>🔒  Complete previous cases to unlock</Text>
                </View>
              )}
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* XP banner */}
        <Animated.View style={xpAnim}>
          <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.xpBanner}>
            <View style={[styles.xpBannerBorder, { borderColor: colors.border }]} />
            <Text style={[styles.xpBannerLabel, { color: rank.color }]}>Level {level} · {rank.shortTitle}</Text>
            <View style={styles.xpBannerBar}>
              <LinearGradient colors={[rank.rimColor, rank.color]} style={[styles.xpBannerFill, { width: `${Math.min((xp / xpToNextLevel) * 100, 100)}%` }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
            </View>
            <Text style={styles.xpBannerVal}>{xp}/{xpToNextLevel}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Modes grid */}
        <Animated.View style={modesAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.purple }]} />
            <Text style={styles.sectionTitle}>All Modes</Text>
            <Text style={styles.sectionSub}>Tap a card to expand</Text>
          </View>
          <View style={styles.modesGrid}>
            {MODES.map((mode, idx) => {
              const expanded = expandedMode === mode.title;
              return (
                <Animated.View key={mode.title} style={{ width: "48%", transform: [{ scale: modeScales[idx] }] }}>
                  <Pressable
                    onPress={() => setExpandedMode(expanded ? null : mode.title)}
                    onPressIn={() => pressModeIn(idx)}
                    onPressOut={() => pressModeOut(idx)}
                  >
                    <LinearGradient colors={mode.gradient} style={[styles.modeCard, { borderColor: mode.border, opacity: mode.available ? 1 : 0.6 }]}>
                      <View style={styles.modeCardTop}>
                        <Text style={styles.modeEmoji}>{mode.emoji}</Text>
                        {mode.badge && (
                          <View style={[styles.modeBadge, {
                            backgroundColor: mode.badge === "SOON" ? "rgba(122,133,163,0.15)" : mode.color + "20",
                            borderColor: mode.badge === "SOON" ? colors.border : mode.color + "50",
                          }]}>
                            <Text style={[styles.modeBadgeText, { color: mode.badge === "SOON" ? colors.textMuted : mode.color }]}>{mode.badge}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.modeTitle}>{mode.title}</Text>
                      <Text style={styles.modeDesc}>{mode.desc}</Text>
                      {expanded && (
                        <View style={[styles.modeExpanded, { borderTopColor: mode.color + "30" }]}>
                          <Text style={[styles.modeExpandedText, { color: mode.color }]}>ℹ️  {mode.howTo}</Text>
                          {mode.available && mode.onPress && (
                            <Pressable onPress={mode.onPress} style={[styles.modeLaunchBtn, { backgroundColor: mode.color + "20", borderColor: mode.color + "50" }]}>
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
          {DIFFICULTY_GUIDE.map((d) => (
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
            <Text style={styles.funFactText}>The word "detective" doesn't appear in Scripture — but Solomon ran what was essentially a forensic interview in 1 Kings 3. He just used a sword instead of a questionnaire.</Text>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Case picker modals for Time Attack & Survival */}
      <CasePickerModal
        visible={pickerMode !== null}
        mode={pickerMode ?? "timeAttack"}
        onClose={() => setPickerMode(null)}
        onSelect={(caseId) => launchCase(caseId, pickerMode ?? "timeAttack")}
      />
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
  rankShort: { fontFamily: "Inter_700Bold", fontSize: 9, letterSpacing: 0.8 },
  rankLabel: { fontFamily: "Inter_700Bold", fontSize: 13 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  sectionSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
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
  featuredArrow: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
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
