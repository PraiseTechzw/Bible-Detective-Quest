import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";
import { getRankForLevel } from "@/constants/ranks";
import {
  IconClock, IconHeart, IconAward, IconZap, IconLock,
  IconTrendingUp, IconArrowRight, RankIcon,
} from "@/components/ui/SvgIcons";

function useEntrance(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, delay, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, []);
  return { opacity, transform: [{ translateY }] };
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins > 0) return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  return `${secs}s`;
}

function MedalIcon({ rank }: { rank: number }) {
  const configs = [
    { bg: ["rgba(255,215,0,0.25)", "rgba(255,215,0,0.08)"] as const, border: "rgba(255,215,0,0.6)", text: "#FFD700", label: "1" },
    { bg: ["rgba(192,192,192,0.25)", "rgba(192,192,192,0.08)"] as const, border: "rgba(192,192,192,0.6)", text: "#C0C0C0", label: "2" },
    { bg: ["rgba(205,127,50,0.25)", "rgba(205,127,50,0.08)"] as const, border: "rgba(205,127,50,0.6)", text: "#CD7F32", label: "3" },
  ];
  const cfg = configs[rank - 1] ?? { bg: [colors.surface3, colors.surface2] as const, border: colors.border, text: colors.textMuted, label: String(rank) };
  return (
    <LinearGradient colors={cfg.bg} style={[medalStyles.wrap, { borderColor: cfg.border }]}>
      <Text style={[medalStyles.text, { color: cfg.text }]}>{cfg.label}</Text>
    </LinearGradient>
  );
}
const medalStyles = StyleSheet.create({
  wrap: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  text: { fontFamily: "Inter_700Bold", fontSize: 13 },
});

function AnimatedBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  const width = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(width, { toValue: pct, duration: 700, delay, useNativeDriver: false }).start();
  }, [pct]);
  return (
    <View style={barStyles.bg}>
      <Animated.View style={[barStyles.fill, { width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }), backgroundColor: color }]} />
    </View>
  );
}
const barStyles = StyleSheet.create({
  bg: { flex: 1, height: 5, backgroundColor: colors.surface3, borderRadius: 3, overflow: "hidden" },
  fill: { height: 5, borderRadius: 3 },
});

type Tab = "timeAttack" | "survival";

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const { timeAttackBestTimes, survivalHighScore, solvedCases, level, playerName } = useGame();
  const rank = getRankForLevel(level);
  const [activeTab, setActiveTab] = useState<Tab>("timeAttack");

  const headerAnim = useEntrance(0);
  const profileAnim = useEntrance(60);
  const tabAnim = useEntrance(120);
  const contentAnim = useEntrance(180);

  const timeAttackEntries = CASES.map((c) => ({
    case: c,
    bestMs: timeAttackBestTimes[c.id] ?? null,
    solved: solvedCases.includes(c.id),
  })).sort((a, b) => {
    if (a.bestMs === null && b.bestMs === null) return 0;
    if (a.bestMs === null) return 1;
    if (b.bestMs === null) return -1;
    return a.bestMs - b.bestMs;
  });

  const bestTimeMs = timeAttackEntries.find(e => e.bestMs !== null)?.bestMs ?? null;
  const totalTimeMs = Object.values(timeAttackBestTimes).reduce((a, b) => a + b, 0);
  const completedTimeAttack = timeAttackEntries.filter(e => e.bestMs !== null).length;

  const survivalGrades = [
    { label: "Bronze", minScore: 1, color: "#CD7F32", border: "rgba(205,127,50,0.5)" },
    { label: "Silver", minScore: 3, color: "#C0C0C0", border: "rgba(192,192,192,0.5)" },
    { label: "Gold", minScore: 6, color: "#FFD700", border: "rgba(255,215,0,0.5)" },
    { label: "Platinum", minScore: 10, color: "#4FC3F7", border: "rgba(79,195,247,0.5)" },
    { label: "Legendary", minScore: 15, color: colors.purple, border: "rgba(155,89,182,0.5)" },
  ];

  const currentGrade = [...survivalGrades].reverse().find(g => survivalHighScore >= g.minScore) ?? null;
  const nextGrade = survivalGrades.find(g => g.minScore > survivalHighScore) ?? null;

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.header, { paddingTop: topPad + 8 }, headerAnim]}>
        <View>
          <Text style={styles.headerLabel}>RECORDS</Text>
          <Text style={styles.headerTitle}>Leaderboard</Text>
        </View>
        <View style={[styles.rankChip, { borderColor: rank.rimColor + "50", backgroundColor: rank.color + "12" }]}>
          <RankIcon id={rank.svgIcon} size={16} color={rank.color} />
          <Text style={[styles.rankChipText, { color: rank.color }]}>{rank.shortTitle}</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }}
      >
        {/* Personal record summary */}
        <Animated.View style={[styles.summaryRow, profileAnim]}>
          <LinearGradient colors={["#1A2240", "#0F1628"]} style={[styles.summaryCard, { borderColor: "rgba(232,64,64,0.3)" }]}>
            <View style={styles.summaryIcon}>
              <IconClock size={20} color={colors.red} />
            </View>
            <View style={styles.summaryBody}>
              <Text style={styles.summaryLabel}>Best Time Attack</Text>
              <Text style={[styles.summaryVal, { color: colors.red }]}>
                {bestTimeMs !== null ? formatTime(bestTimeMs) : "—"}
              </Text>
              <Text style={styles.summarySub}>{completedTimeAttack}/{CASES.length} cases</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={["#1A1040", "#0F0A28"]} style={[styles.summaryCard, { borderColor: "rgba(155,89,182,0.3)" }]}>
            <View style={styles.summaryIcon}>
              <IconHeart size={20} color={colors.purple} />
            </View>
            <View style={styles.summaryBody}>
              <Text style={styles.summaryLabel}>Survival High Score</Text>
              <Text style={[styles.summaryVal, { color: colors.purple }]}>
                {survivalHighScore > 0 ? survivalHighScore : "—"}
              </Text>
              <Text style={styles.summarySub}>
                {currentGrade ? `${currentGrade.label} rank` : "No runs yet"}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Tabs */}
        <Animated.View style={[styles.tabs, tabAnim]}>
          {([
            { key: "timeAttack" as Tab, label: "Time Attack", icon: <IconClock size={14} color={activeTab === "timeAttack" ? "#000" : colors.textMuted} /> },
            { key: "survival" as Tab, label: "Survival", icon: <IconHeart size={14} color={activeTab === "survival" ? "#000" : colors.textMuted} /> },
          ]).map((t) => (
            <Pressable key={t.key} onPress={() => setActiveTab(t.key)} style={styles.tabBtn}>
              {activeTab === t.key ? (
                <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.tabActive}>
                  {t.icon}
                  <Text style={styles.tabActiveText}>{t.label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabInactive}>
                  {t.icon}
                  <Text style={styles.tabInactiveText}>{t.label}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </Animated.View>

        {activeTab === "timeAttack" ? (
          <Animated.View style={contentAnim}>
            {/* Summary stats */}
            {completedTimeAttack > 0 && (
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.statsStrip}>
                <View style={[styles.statsStripBorder, { borderColor: colors.border }]} />
                <StatBox icon={<IconClock size={15} color={colors.red} />} label="Best" val={bestTimeMs !== null ? formatTime(bestTimeMs) : "—"} color={colors.red} />
                <View style={styles.statDivider} />
                <StatBox icon={<IconZap size={15} color={colors.gold} />} label="Total" val={totalTimeMs > 0 ? formatTime(totalTimeMs) : "—"} color={colors.gold} />
                <View style={styles.statDivider} />
                <StatBox icon={<IconAward size={15} color={colors.green} />} label="Completed" val={`${completedTimeAttack}/${CASES.length}`} color={colors.green} />
              </LinearGradient>
            )}

            <View style={styles.sectionHeader}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.red }]} />
              <Text style={styles.sectionTitle}>Case Rankings</Text>
              <Text style={styles.sectionSub}>sorted by best time</Text>
            </View>

            {timeAttackEntries.map((entry, idx) => {
              const hasTime = entry.bestMs !== null;
              const fastestMs = Math.min(...timeAttackEntries.filter(e => e.bestMs !== null).map(e => e.bestMs as number), Infinity);
              const pct = hasTime && fastestMs > 0 ? Math.min(100, (fastestMs / (entry.bestMs as number)) * 100) : 0;
              const rankPos = hasTime ? timeAttackEntries.filter(e => e.bestMs !== null && (e.bestMs as number) < (entry.bestMs as number)).length + 1 : null;

              return (
                <Animated.View
                  key={entry.case.id}
                  style={[
                    { opacity: contentAnim.opacity as any },
                    { transform: [{ translateY: (contentAnim.transform as any)[0].translateY }] },
                  ]}
                >
                  <Pressable
                    onPress={() => hasTime || entry.solved ? router.push(`/case/${entry.case.id}?mode=timeAttack` as any) : undefined}
                    style={({ pressed }) => ({ opacity: pressed && (hasTime || entry.solved) ? 0.85 : 1 })}
                  >
                    <LinearGradient
                      colors={hasTime ? ["rgba(232,64,64,0.1)", "rgba(232,64,64,0.03)"] : [colors.surface2, colors.surface1]}
                      style={[styles.caseRow, { borderColor: hasTime ? "rgba(232,64,64,0.3)" : colors.border }]}
                    >
                      {/* Rank medal */}
                      <View style={styles.rankCol}>
                        {rankPos !== null
                          ? <MedalIcon rank={rankPos} />
                          : (
                            <View style={styles.noRankWrap}>
                              {!entry.solved
                                ? <IconLock size={16} color={colors.textFaint} />
                                : <Text style={styles.noRankText}>—</Text>
                              }
                            </View>
                          )
                        }
                      </View>

                      {/* Case info */}
                      <View style={styles.caseInfo}>
                        <Text style={styles.caseNum}>{entry.case.caseNumber}</Text>
                        <Text style={[styles.caseTitle, { color: hasTime ? colors.text : entry.solved ? colors.textMuted : colors.textFaint }]} numberOfLines={1}>
                          {entry.case.title}
                        </Text>
                        <Text style={styles.caseRef}>{entry.case.bibleReference}</Text>
                        {hasTime && (
                          <View style={styles.barRow}>
                            <AnimatedBar pct={pct} color={rankPos === 1 ? "#FFD700" : colors.red} delay={300 + idx * 60} />
                          </View>
                        )}
                      </View>

                      {/* Time / Status */}
                      <View style={styles.timeCol}>
                        {hasTime ? (
                          <>
                            <Text style={[styles.timeVal, { color: rankPos === 1 ? "#FFD700" : colors.red }]}>
                              {formatTime(entry.bestMs as number)}
                            </Text>
                            {rankPos === 1 && (
                              <View style={styles.bestBadge}>
                                <Text style={styles.bestBadgeText}>BEST</Text>
                              </View>
                            )}
                            <Pressable
                              onPress={() => router.push(`/case/${entry.case.id}?mode=timeAttack` as any)}
                              style={styles.retryBtn}
                            >
                              <Text style={styles.retryText}>Beat it</Text>
                              <IconArrowRight size={11} color={colors.gold} />
                            </Pressable>
                          </>
                        ) : entry.solved ? (
                          <Pressable
                            onPress={() => router.push(`/case/${entry.case.id}?mode=timeAttack` as any)}
                            style={styles.tryBtn}
                          >
                            <Text style={styles.tryText}>Try</Text>
                            <IconArrowRight size={11} color={colors.gold} />
                          </Pressable>
                        ) : (
                          <View style={styles.lockedPill}>
                            <IconLock size={11} color={colors.textFaint} />
                            <Text style={styles.lockedText}>Locked</Text>
                          </View>
                        )}
                      </View>
                    </LinearGradient>
                  </Pressable>
                </Animated.View>
              );
            })}

            {completedTimeAttack === 0 && (
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.emptyCard}>
                <View style={[styles.emptyCardBorder, { borderColor: colors.border }]} />
                <IconClock size={36} color={colors.textFaint} />
                <Text style={styles.emptyTitle}>No Time Attack records yet</Text>
                <Text style={styles.emptyBody}>Solve a case in Time Attack mode to set your first record. Every second counts.</Text>
                <Pressable onPress={() => router.push("/(tabs)/play" as any)} style={styles.emptyBtn}>
                  <LinearGradient colors={["rgba(232,64,64,0.2)", "rgba(232,64,64,0.08)"]} style={styles.emptyBtnInner}>
                    <IconClock size={14} color={colors.red} />
                    <Text style={[styles.emptyBtnText, { color: colors.red }]}>Start Time Attack</Text>
                  </LinearGradient>
                </Pressable>
              </LinearGradient>
            )}
          </Animated.View>
        ) : (
          <Animated.View style={contentAnim}>
            {/* Grade card */}
            <LinearGradient
              colors={currentGrade ? [`${currentGrade.color}18`, `${currentGrade.color}05`] : [colors.surface2, colors.surface1]}
              style={[styles.gradeCard, { borderColor: currentGrade ? currentGrade.border : colors.border }]}
            >
              <View style={styles.gradeTop}>
                <View style={[styles.gradeIconWrap, { backgroundColor: (currentGrade?.color ?? colors.textFaint) + "20" }]}>
                  <IconHeart size={28} color={currentGrade?.color ?? colors.textFaint} />
                </View>
                <View style={styles.gradeInfo}>
                  <Text style={styles.gradeLabel}>Your Rank</Text>
                  <Text style={[styles.gradeTitle, { color: currentGrade?.color ?? colors.textFaint }]}>
                    {currentGrade?.label ?? "Unranked"}
                  </Text>
                  <Text style={styles.gradeScore}>
                    High score: <Text style={{ color: colors.purple, fontFamily: "Inter_700Bold" }}>{survivalHighScore}</Text>
                  </Text>
                </View>
              </View>

              {nextGrade && survivalHighScore > 0 && (
                <View style={styles.nextGradeRow}>
                  <View style={styles.ngBar}>
                    <View style={[
                      styles.ngFill,
                      {
                        width: `${Math.min(100, (survivalHighScore / nextGrade.minScore) * 100)}%` as any,
                        backgroundColor: nextGrade.color,
                      }
                    ]} />
                  </View>
                  <Text style={[styles.ngLabel, { color: nextGrade.color }]}>
                    {nextGrade.minScore - survivalHighScore} more to {nextGrade.label}
                  </Text>
                </View>
              )}
            </LinearGradient>

            {/* Grade table */}
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.purple }]} />
              <Text style={styles.sectionTitle}>Grade Table</Text>
            </View>

            {survivalGrades.map((grade, i) => {
              const isAchieved = survivalHighScore >= grade.minScore;
              const isCurrent = currentGrade?.label === grade.label;
              return (
                <LinearGradient
                  key={grade.label}
                  colors={isAchieved ? [`${grade.color}14`, `${grade.color}05`] : [colors.surface2, colors.surface1]}
                  style={[styles.gradeRow, { borderColor: isAchieved ? grade.border : colors.border }]}
                >
                  <View style={[styles.gradeDot, { backgroundColor: isAchieved ? grade.color : colors.surface3, borderColor: isAchieved ? grade.color : colors.border }]} />
                  <View style={styles.gradeRowInfo}>
                    <Text style={[styles.gradeRowLabel, { color: isAchieved ? grade.color : colors.textMuted }]}>{grade.label}</Text>
                    <Text style={styles.gradeRowReq}>{grade.minScore}+ correct answers</Text>
                  </View>
                  {isCurrent && (
                    <View style={[styles.currentBadge, { backgroundColor: `${grade.color}20`, borderColor: grade.border }]}>
                      <Text style={[styles.currentBadgeText, { color: grade.color }]}>CURRENT</Text>
                    </View>
                  )}
                  {isAchieved && !isCurrent && (
                    <View style={styles.achievedCheck}>
                      <IconAward size={16} color={grade.color} />
                    </View>
                  )}
                  {!isAchieved && (
                    <Text style={styles.gradeReqText}>{grade.minScore}</Text>
                  )}
                </LinearGradient>
              );
            })}

            {/* Survival tips */}
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.amber }]} />
              <Text style={styles.sectionTitle}>Survival Tips</Text>
            </View>
            {[
              { tip: "Read the biblical passage before starting — the text is your only source of truth.", icon: <IconAward size={15} color={colors.amber} /> },
              { tip: "Witness testimony is chronological. Wrong timeline placements cost a life.", icon: <IconTrendingUp size={15} color={colors.amber} /> },
              { tip: "The final verdict is worth the most. Don't rush it.", icon: <IconHeart size={15} color={colors.amber} /> },
            ].map((t, i) => (
              <LinearGradient key={i} colors={["rgba(245,166,35,0.08)", "rgba(245,166,35,0.02)"]} style={styles.tipCard}>
                <View style={[styles.tipCardBorder, { borderColor: "rgba(245,166,35,0.25)" }]} />
                <View style={styles.tipIconWrap}>{t.icon}</View>
                <Text style={styles.tipText}>{t.tip}</Text>
              </LinearGradient>
            ))}

            {survivalHighScore === 0 && (
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.emptyCard}>
                <View style={[styles.emptyCardBorder, { borderColor: colors.border }]} />
                <IconHeart size={36} color={colors.textFaint} />
                <Text style={styles.emptyTitle}>No Survival runs yet</Text>
                <Text style={styles.emptyBody}>In Survival Mode, one wrong answer ends your run. How many can you get right in a row?</Text>
                <Pressable onPress={() => router.push("/(tabs)/play" as any)} style={styles.emptyBtn}>
                  <LinearGradient colors={["rgba(155,89,182,0.2)", "rgba(155,89,182,0.08)"]} style={styles.emptyBtnInner}>
                    <IconHeart size={14} color={colors.purple} />
                    <Text style={[styles.emptyBtnText, { color: colors.purple }]}>Start Survival</Text>
                  </LinearGradient>
                </Pressable>
              </LinearGradient>
            )}
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

function StatBox({ icon, label, val, color }: { icon: React.ReactNode; label: string; val: string; color: string }) {
  return (
    <View style={sbStyles.wrap}>
      {icon}
      <Text style={[sbStyles.val, { color }]}>{val}</Text>
      <Text style={sbStyles.label}>{label}</Text>
    </View>
  );
}
const sbStyles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", gap: 3 },
  val: { fontFamily: "Inter_700Bold", fontSize: 15 },
  label: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.gold, letterSpacing: 2 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.text },
  rankChip: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 5, marginTop: 8 },
  rankChipText: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  summaryCard: { flex: 1, borderRadius: colors.radius.lg, padding: 14, gap: 8, borderWidth: 1, position: "relative", overflow: "hidden" },
  summaryIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.04)", alignItems: "center", justifyContent: "center" },
  summaryBody: { gap: 2 },
  summaryLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 0.8 },
  summaryVal: { fontFamily: "Inter_700Bold", fontSize: 22 },
  summarySub: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
  tabs: { flexDirection: "row", gap: 8, marginBottom: 16 },
  tabBtn: { flex: 1 },
  tabActive: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: colors.radius.md, padding: 10 },
  tabActiveText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  tabInactive: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: colors.radius.md, padding: 10, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border },
  tabInactiveText: { fontFamily: "Inter_500Medium", fontSize: 13, color: colors.textMuted },
  statsStrip: { flexDirection: "row", alignItems: "center", borderRadius: colors.radius.md, padding: 14, marginBottom: 16, position: "relative", overflow: "hidden" },
  statsStripBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border, marginHorizontal: 4 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10, marginTop: 4 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text, flex: 1 },
  sectionSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
  caseRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: colors.radius.lg, padding: 14, marginBottom: 8, borderWidth: 1, position: "relative", overflow: "hidden" },
  rankCol: { width: 32, alignItems: "center" },
  noRankWrap: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  noRankText: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.textFaint },
  caseInfo: { flex: 1, gap: 1 },
  caseNum: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.textFaint, letterSpacing: 1.5 },
  caseTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  caseRef: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
  barRow: { marginTop: 5 },
  timeCol: { alignItems: "flex-end", gap: 4, minWidth: 60 },
  timeVal: { fontFamily: "Inter_700Bold", fontSize: 15 },
  bestBadge: { backgroundColor: "rgba(255,215,0,0.15)", borderRadius: colors.radius.full, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: "rgba(255,215,0,0.45)" },
  bestBadgeText: { fontFamily: "Inter_700Bold", fontSize: 8, color: "#FFD700", letterSpacing: 0.8 },
  retryBtn: { flexDirection: "row", alignItems: "center", gap: 3 },
  retryText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  tryBtn: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(212,150,42,0.1)", borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: colors.goldBorder },
  tryText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  lockedPill: { flexDirection: "row", alignItems: "center", gap: 4 },
  lockedText: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
  gradeCard: { borderRadius: colors.radius.lg, padding: 18, marginBottom: 16, borderWidth: 1, gap: 12 },
  gradeTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  gradeIconWrap: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" },
  gradeInfo: { flex: 1, gap: 2 },
  gradeLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 1.2 },
  gradeTitle: { fontFamily: "Inter_700Bold", fontSize: 22 },
  gradeScore: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted },
  nextGradeRow: { gap: 6 },
  ngBar: { height: 5, backgroundColor: colors.surface3, borderRadius: 3, overflow: "hidden" },
  ngFill: { height: 5, borderRadius: 3 },
  ngLabel: { fontFamily: "Inter_500Medium", fontSize: 11 },
  gradeRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, borderWidth: 1 },
  gradeDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  gradeRowInfo: { flex: 1 },
  gradeRowLabel: { fontFamily: "Inter_700Bold", fontSize: 14 },
  gradeRowReq: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint, marginTop: 1 },
  currentBadge: { borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  currentBadgeText: { fontFamily: "Inter_700Bold", fontSize: 8, letterSpacing: 1 },
  achievedCheck: {},
  gradeReqText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.textFaint },
  tipCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, position: "relative", overflow: "hidden" },
  tipCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  tipIconWrap: { width: 28, height: 28, alignItems: "center", justifyContent: "center", marginTop: 2 },
  tipText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20, flex: 1 },
  emptyCard: { borderRadius: colors.radius.lg, padding: 28, alignItems: "center", gap: 10, marginTop: 8, borderWidth: 1, position: "relative", overflow: "hidden" },
  emptyCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  emptyTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text, textAlign: "center" },
  emptyBody: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, textAlign: "center", lineHeight: 21, maxWidth: 280 },
  emptyBtn: { marginTop: 4 },
  emptyBtnInner: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: colors.radius.full, paddingHorizontal: 18, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  emptyBtnText: { fontFamily: "Inter_700Bold", fontSize: 13 },
});
