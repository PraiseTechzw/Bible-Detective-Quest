import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { getRankForLevel } from "@/constants/ranks";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";
import { BIBLE_BOOKS } from "@/data/bibleBooks";
import {
  IconBook, IconCalendar, IconClock, IconHeart, IconUsers, IconMap, IconScroll, IconUser,
  IconFire, RankIcon, IconZap, IconLock, IconArrowRight, IconInfo,
} from "@/components/ui/SvgIcons";

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

interface ModeConfig {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  gradient: readonly [string, string];
  border: string;
  available: boolean;
  badge: string | null;
  onPress: (() => void) | null;
  howTo: string;
}

const DIFFICULTY_GUIDE = [
  { label: "Beginner", cases: "Cases 1-2", desc: "Shorter timelines, fewer suspects, classic stories. Perfect starting point.", color: colors.green },
  { label: "Intermediate", cases: "Cases 3-4", desc: "Multiple credible suspects, more evidence to cross-reference, tricky timelines.", color: colors.amber },
  { label: "Advanced", cases: "Cases 5-6", desc: "Ambiguous motives, overlapping testimony, spiritual dimensions — hardest questions.", color: colors.red },
];

const LEARNING_PATHS = [
  { icon: <IconMap size={22} color={colors.blue} />, label: "Bible Geography", sub: "Walk the ancient Near East", color: colors.blue },
  { icon: <IconScroll size={22} color={colors.purple} />, label: "Prophetic Timeline", sub: "Connect prophecy to fulfilment", color: colors.purple },
  { icon: <IconUser size={22} color={colors.gold} />, label: "Character Studies", sub: "Deep dives into biblical figures", color: colors.gold },
  { icon: <IconBook size={22} color={colors.green} />, label: "Book-by-Book", sub: "Genesis to Revelation study path", color: colors.green },
];

export default function PlayScreen() {
  const insets = useSafeAreaInsets();
  const { solvedCases, streak, isCaseLocked, level, xp, xpToNextLevel, survivalHighScore, timeAttackBestTimes } = useGame();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const daily = getDailyCase();
  const dailyIdx = CASES.findIndex((c) => c.id === daily.id);
  const isDailyLocked = isCaseLocked(daily.id, dailyIdx);
  const storyUnlocked = solvedCases.length >= CASES.length;
  const rank = getRankForLevel(level);
  const [expandedMode, setExpandedMode] = useState<string | null>(null);
  const bibleBooksTotal = BIBLE_BOOKS.length;
  const otBooks = BIBLE_BOOKS.filter((book) => book.testament === "OT").length;
  const ntBooks = BIBLE_BOOKS.filter((book) => book.testament === "NT").length;

  const headerAnim = useEntrance(0);
  const dailyAnim = useEntrance(80);
  const xpAnim = useEntrance(140);
  const modesAnim = useEntrance(200);
  const diffAnim = useEntrance(260);

  const MODES: ModeConfig[] = [
    {
      icon: <IconBook size={28} color={colors.gold} />,
      title: "Story Mode",
      desc: "Journey through the full 66-book Bible",
      color: colors.gold,
      gradient: ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.05)"] as const,
      border: colors.goldBorder,
      available: storyUnlocked,
      badge: storyUnlocked ? null : "LOCKED",
      onPress: storyUnlocked ? () => router.push("/story" as any) : null,
      howTo: storyUnlocked
        ? "Play the Bible Chronicle once every case is finished. It becomes a separate full-Bible journey."
        : `Unlock by solving all ${CASES.length} cases first. Story Mode is a separate Bible Chronicle journey.`,
    },
    {
      icon: <IconCalendar size={28} color={colors.blue} />,
      title: "Daily Mystery",
      desc: "A rotating case — different every day",
      color: colors.blue,
      gradient: ["rgba(74,126,232,0.18)", "rgba(74,126,232,0.05)"] as const,
      border: "rgba(74,126,232,0.35)",
      available: true,
      badge: "DAILY",
      onPress: isDailyLocked ? null : () => router.push(`/case/${daily.id}?mode=daily` as any),
      howTo: "A case rotates daily. Complete it for bonus streak XP.",
    },
    {
      icon: <IconClock size={28} color={colors.red} />,
      title: "Time Attack",
      desc: "Solve a case before the clock runs out",
      color: colors.red,
      gradient: ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.05)"] as const,
      border: "rgba(232,64,64,0.35)",
      available: true,
      badge: "TIMED",
      onPress: () => {
        const firstUnsolved = CASES.find((c, i) => !solvedCases.includes(c.id) && !isCaseLocked(c.id, i));
        const target = firstUnsolved ?? CASES[0];
        router.push(`/case/${target.id}?mode=timeAttack` as any);
      },
      howTo: "Same cases, faster pace. Every wrong answer costs 30 seconds. Best time is recorded per case.",
    },
    {
      icon: <IconHeart size={28} color={colors.purple} />,
      title: "Survival Mode",
      desc: "No hints. No retries. One wrong answer ends it.",
      color: colors.purple,
      gradient: ["rgba(124,94,232,0.18)", "rgba(124,94,232,0.05)"] as const,
      border: "rgba(124,94,232,0.35)",
      available: true,
      badge: "HARD",
      onPress: () => {
        router.push(`/case/${CASES[0].id}?mode=survival` as any);
      },
      howTo: "Every question is final. One wrong answer ends your run. High score is saved.",
    },
    {
      icon: <IconCalendar size={28} color={colors.green} />,
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
      icon: <IconUsers size={28} color={colors.amber} />,
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

  const modeScales = useRef(MODES.map(() => new Animated.Value(1))).current;
  const pressModeIn = (i: number) => Animated.spring(modeScales[i], { toValue: 0.96, useNativeDriver: true, tension: 200, friction: 10 }).start();
  const pressModeOut = (i: number) => Animated.spring(modeScales[i], { toValue: 1, useNativeDriver: true, tension: 100, friction: 8 }).start();

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
              <IconFire size={14} color={colors.amber} />
              <Text style={styles.streakNum}>{streak}</Text>
              <Text style={styles.streakLabel}>streak</Text>
            </LinearGradient>
          )}
          <LinearGradient colors={[rank.gradTop, rank.gradBot]} style={styles.rankBadge}>
            <RankIcon id={rank.svgIcon} size={18} color={rank.color} />
            <Text style={[styles.rankLabel, { color: rank.color }]}>Lv{level}</Text>
          </LinearGradient>
        </View>
      </Animated.View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}>

        <Animated.View style={dailyAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.blue }]} />
            <Text style={styles.sectionTitle}>Today's Mystery</Text>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE DAILY</Text>
            </View>
          </View>
          <Pressable
            onPress={isDailyLocked ? undefined : () => router.push(`/case/${daily.id}?mode=daily` as any)}
            style={({ pressed }) => ({ opacity: pressed && !isDailyLocked ? 0.88 : isDailyLocked ? 0.5 : 1 })}
          >
            <LinearGradient colors={["#1A2240", "#101828"]} style={styles.featuredCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={[styles.featuredBorder, { borderColor: "rgba(74,126,232,0.4)" }]} />
              <View style={styles.featuredTop}>
                <View style={styles.featuredIconWrap}>
                  <IconCalendar size={36} color={colors.blue} />
                </View>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredCaseNum}>{daily.caseNumber} · DAILY</Text>
                  <Text style={styles.featuredTitle}>{daily.title}</Text>
                  <Text style={styles.featuredRef}>{daily.bibleReference}</Text>
                </View>
                {isDailyLocked
                  ? <IconLock size={22} color={colors.textMuted} />
                  : (
                    <LinearGradient colors={[colors.blue, "#3060C0"]} style={styles.featuredArrow}>
                      <IconArrowRight size={18} color="#fff" />
                    </LinearGradient>
                  )
                }
              </View>
              <View style={styles.featuredStats}>
                <StatPill icon={<IconZap size={11} color={colors.gold} />} val={`${daily.rewards.xp} XP`} />
                <StatPill icon={<View style={styles.diffDot} />} val={daily.difficulty} />
              </View>
              {isDailyLocked && (
                <View style={styles.lockedBanner}>
                  <IconLock size={13} color={colors.textMuted} />
                  <Text style={styles.lockedBannerText}>Complete previous cases to unlock this one</Text>
                </View>
              )}
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {(survivalHighScore > 0 || Object.keys(timeAttackBestTimes).length > 0) && (
          <Animated.View style={xpAnim}>
            <View style={styles.sectionRow}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.green }]} />
              <Text style={styles.sectionTitle}>Your Records</Text>
            </View>
            <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.recordsCard}>
              <View style={[styles.recordsBorder, { borderColor: colors.border }]} />
              {survivalHighScore > 0 && (
                <View style={styles.recordRow}>
                  <IconHeart size={16} color={colors.purple} />
                  <Text style={styles.recordLabel}>Survival High Score</Text>
                  <Text style={[styles.recordVal, { color: colors.purple }]}>{survivalHighScore}</Text>
                </View>
              )}
              {Object.keys(timeAttackBestTimes).length > 0 && (
                <View style={styles.recordRow}>
                  <IconClock size={16} color={colors.red} />
                  <Text style={styles.recordLabel}>Best Time Attack</Text>
                  <Text style={[styles.recordVal, { color: colors.red }]}>
                    {Math.min(...Object.values(timeAttackBestTimes).map(t => Math.floor(t / 1000)))}s
                  </Text>
                </View>
              )}
            </LinearGradient>
          </Animated.View>
        )}

        <Animated.View style={xpAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.gold }]} />
            <Text style={styles.sectionTitle}>Bible Journey</Text>
          </View>
          <LinearGradient colors={["rgba(212,150,42,0.12)", "rgba(255,255,255,0.03)"]} style={styles.journeyCard}>
            <View style={[styles.journeyBorder, { borderColor: colors.goldBorder }]} />
            <View style={styles.journeyTop}>
              <View style={styles.journeyCount}>
                <Text style={styles.journeyCountNum}>{bibleBooksTotal}</Text>
                <Text style={styles.journeyCountLabel}>Books</Text>
              </View>
              <View style={styles.journeyStats}>
                <View style={styles.journeyStatRow}>
                  <Text style={styles.journeyStatLabel}>Old Testament</Text>
                  <Text style={styles.journeyStatValue}>{otBooks}</Text>
                </View>
                <View style={styles.journeyStatRow}>
                  <Text style={styles.journeyStatLabel}>New Testament</Text>
                  <Text style={styles.journeyStatValue}>{ntBooks}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.journeyText}>
              Story Mode covers the full Bible story across 66 books, from creation to revelation.
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={xpAnim}>
          <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.xpBanner}>
            <View style={[styles.xpBannerBorder, { borderColor: colors.border }]} />
            <RankIcon id={rank.svgIcon} size={18} color={rank.color} />
            <Text style={[styles.xpBannerLabel, { color: rank.color }]}>Level {level} · {rank.shortTitle}</Text>
            <View style={styles.xpBannerBar}>
              <LinearGradient colors={[rank.rimColor, rank.color]} style={[styles.xpBannerFill, { width: `${Math.min((xp / xpToNextLevel) * 100, 100)}%` as any }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
            </View>
            <Text style={styles.xpBannerVal}>{xp}/{xpToNextLevel}</Text>
          </LinearGradient>
        </Animated.View>

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
                    onPress={() => setExpandedMode(expanded ? null : mode.title)}
                    onPressIn={() => pressModeIn(idx)}
                    onPressOut={() => pressModeOut(idx)}
                  >
                    <LinearGradient colors={mode.gradient} style={[styles.modeCard, { borderColor: mode.border, opacity: mode.available ? 1 : 0.6 }]}>
                      <View style={styles.modeCardTop}>
                        {mode.icon}
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
                          <View style={styles.modeExpandedRow}>
                            <IconInfo size={13} color={mode.color} />
                            <Text style={[styles.modeExpandedText, { color: mode.color }]}>{mode.howTo}</Text>
                          </View>
                {mode.available && mode.onPress && (
                            <Pressable onPress={mode.onPress} style={[styles.modeLaunchBtn, { backgroundColor: `${mode.color}20`, borderColor: `${mode.color}50` }]}>
                              <Text style={[styles.modeLaunchText, { color: mode.color }]}>Start</Text>
                              <IconArrowRight size={13} color={mode.color} />
                            </Pressable>
                          )}
                          {!mode.available && (
                            <View style={[styles.modeLaunchBtn, { backgroundColor: "rgba(122,133,163,0.12)", borderColor: colors.border }]}>
                              <IconLock size={13} color={colors.textMuted} />
                              <Text style={[styles.modeLaunchText, { color: colors.textMuted }]}>Locked</Text>
                            </View>
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

        <Animated.View style={diffAnim}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.amber }]} />
            <Text style={styles.sectionTitle}>Difficulty Guide</Text>
          </View>
          {DIFFICULTY_GUIDE.map((d) => (
            <LinearGradient key={d.label} colors={[colors.surface2, colors.surface1]} style={styles.diffCard}>
              <View style={[styles.diffCardBorder, { borderColor: colors.border }]} />
              <View style={[styles.diffDotLarge, { backgroundColor: d.color }]} />
              <View style={{ flex: 1 }}>
                <View style={styles.diffTop}>
                  <Text style={[styles.diffLabel, { color: d.color }]}>{d.label}</Text>
                  <View style={styles.diffCasePill}><Text style={styles.diffCaseText}>{d.cases}</Text></View>
                </View>
                <Text style={styles.diffDesc}>{d.desc}</Text>
              </View>
            </LinearGradient>
          ))}
        </Animated.View>

        <View style={{ marginBottom: 8 }}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.green }]} />
            <Text style={styles.sectionTitle}>Learning Paths</Text>
            <View style={styles.soonPill}><Text style={styles.soonPillText}>Coming Soon</Text></View>
          </View>
          {LEARNING_PATHS.map((path) => (
            <LinearGradient key={path.label} colors={[colors.surface2, colors.surface1]} style={styles.pathRow}>
              <View style={[styles.pathRowBorder, { borderColor: colors.border }]} />
              <View style={[styles.pathIcon, { backgroundColor: path.color + "15" }]}>{path.icon}</View>
              <View style={styles.pathText}>
                <Text style={styles.pathLabel}>{path.label}</Text>
                <Text style={styles.pathSub}>{path.sub}</Text>
              </View>
              <IconLock size={16} color={colors.textFaint} />
            </LinearGradient>
          ))}
        </View>

        <LinearGradient colors={["rgba(212,150,42,0.1)", "rgba(212,150,42,0.04)"]} style={styles.funFactCard}>
          <View style={[styles.funFactBorder, { borderColor: colors.goldBorder }]} />
          <IconBook size={22} color={colors.gold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.funFactLabel}>Did you know?</Text>
            <Text style={styles.funFactText}>
              The word "detective" doesn't appear in Scripture — but Solomon was essentially running a forensic interview in 1 Kings 3. He just used a sword instead of a questionnaire.
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

function StatPill({ icon, val }: { icon: React.ReactNode; val: string }) {
  return (
    <View style={pillStyles.pill}>
      {icon}
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
  streakNum: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.amber },
  streakLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.amber },
  rankBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: colors.radius.full, borderWidth: 1, borderColor: colors.border },
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
  featuredIconWrap: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  featuredMeta: { flex: 1 },
  featuredCaseNum: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.blue, letterSpacing: 1.5, marginBottom: 2 },
  featuredTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  featuredRef: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  featuredArrow: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  featuredStats: { flexDirection: "row", gap: 14 },
  diffDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.blue },
  lockedBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "rgba(122,133,163,0.12)", borderRadius: colors.radius.md, padding: 10, borderWidth: 1, borderColor: colors.border },
  lockedBannerText: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.textMuted, flex: 1 },
  recordsCard: { borderRadius: colors.radius.md, padding: 14, marginBottom: 14, position: "relative", overflow: "hidden", gap: 8 },
  recordsBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  recordRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  recordLabel: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, flex: 1 },
  recordVal: { fontFamily: "Inter_700Bold", fontSize: 14 },
  xpBanner: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: colors.radius.md, padding: 12, marginBottom: 20, position: "relative", overflow: "hidden" },
  xpBannerBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  xpBannerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  xpBannerBar: { flex: 1, height: 4, backgroundColor: colors.surface3, borderRadius: 2, overflow: "hidden" },
  xpBannerFill: { height: 4, borderRadius: 2 },
  xpBannerVal: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  journeyCard: { borderRadius: colors.radius.lg, padding: 14, marginBottom: 20, position: "relative", overflow: "hidden", gap: 10 },
  journeyBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  journeyTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  journeyCount: { width: 72, height: 72, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(212,150,42,0.12)", borderWidth: 1, borderColor: colors.goldBorder },
  journeyCountNum: { fontFamily: "Inter_700Bold", fontSize: 24, color: colors.gold, lineHeight: 28 },
  journeyCountLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.gold, letterSpacing: 1.2 },
  journeyStats: { flex: 1, gap: 8 },
  journeyStatRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  journeyStatLabel: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.textMuted },
  journeyStatValue: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text },
  journeyText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  modesGrid: { flexDirection: "row", flexWrap: "wrap", gap: "4%" as any, rowGap: 10, marginBottom: 22 },
  modeCard: { borderRadius: colors.radius.lg, padding: 14, gap: 6, borderWidth: 1 },
  modeCardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  modeBadge: { borderRadius: colors.radius.full, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1 },
  modeBadgeText: { fontFamily: "Inter_700Bold", fontSize: 8, letterSpacing: 0.8 },
  modeTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text },
  modeDesc: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, lineHeight: 16 },
  modeExpanded: { borderTopWidth: 1, marginTop: 8, paddingTop: 8, gap: 8 },
  modeExpandedRow: { flexDirection: "row", gap: 6, alignItems: "flex-start" },
  modeExpandedText: { fontFamily: "Inter_400Regular", fontSize: 11, lineHeight: 17, flex: 1 },
  modeLaunchBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: colors.radius.md, padding: 8, borderWidth: 1 },
  modeLaunchText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  diffCard: { flexDirection: "row", gap: 12, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, alignItems: "flex-start", position: "relative", overflow: "hidden" },
  diffCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  diffDotLarge: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  diffTop: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  diffLabel: { fontFamily: "Inter_700Bold", fontSize: 14 },
  diffCasePill: { backgroundColor: colors.surface3, borderRadius: colors.radius.full, paddingHorizontal: 7, paddingVertical: 2, borderWidth: 1, borderColor: colors.border },
  diffCaseText: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.textMuted },
  diffDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  soonPill: { backgroundColor: "rgba(122,133,163,0.1)", borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: colors.border },
  soonPillText: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.textMuted },
  pathRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, position: "relative", overflow: "hidden" },
  pathRowBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  pathIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  pathText: { flex: 1 },
  pathLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text },
  pathSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 1 },
  funFactCard: { flexDirection: "row", gap: 10, borderRadius: colors.radius.lg, padding: 14, marginTop: 4, marginBottom: 8, position: "relative", overflow: "hidden", alignItems: "flex-start" },
  funFactBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  funFactLabel: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, marginBottom: 4 },
  funFactText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 19 },
});
