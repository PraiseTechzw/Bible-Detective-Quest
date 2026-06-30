import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { BADGE_DEFS } from "@/constants/badges";
import { getRankForLevel } from "@/constants/ranks";
import { useGame } from "@/context/GameContext";
import { CASES } from "@/data/cases";
import { BadgeIcon, RankIcon, IconSettings, IconLock, IconCheck, IconFire, IconTrendingUp, IconFolder, IconCoin, IconAward } from "@/components/ui/SvgIcons";

type Rarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
const RARITY_LABEL: Record<Rarity, string> = { COMMON: "COMMON", RARE: "RARE", EPIC: "EPIC", LEGENDARY: "LEGENDARY" };

function BadgeCard({ badge, owned }: { badge: typeof BADGE_DEFS[0]; owned: boolean }) {
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!owned) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.3, duration: 1400, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [owned]);

  return (
    <View style={[badgeStyles.wrap, { opacity: owned ? 1 : 0.32 }]}>
      <LinearGradient
        colors={owned ? [badge.gradTop, badge.gradBot] : [colors.surface2, colors.surface1]}
        style={badgeStyles.card}
      >
        <View style={[badgeStyles.border, { borderColor: owned ? badge.rimColor : colors.border }]} />

        {owned && (
          <Animated.View style={[badgeStyles.glowRing, { backgroundColor: badge.rimColor, opacity: glow }]} />
        )}

        <LinearGradient
          colors={owned ? [badge.rimColor + "60", badge.rimColor + "18"] : [colors.surface3, colors.surface2]}
          style={badgeStyles.medallionOuter}
        >
          <View style={[badgeStyles.medallionInner, { borderColor: owned ? badge.rimColor : colors.border, backgroundColor: owned ? badge.gradTop : colors.surface3 }]}>
            {owned
              ? <BadgeIcon id={badge.svgIcon} size={28} color={badge.rimColor} rimColor={badge.gradTop} />
              : <IconLock size={22} color={colors.textFaint} />
            }
          </View>
        </LinearGradient>

        <Text style={[badgeStyles.name, { color: owned ? colors.text : colors.textFaint }]} numberOfLines={2}>
          {badge.name}
        </Text>
        <Text style={[badgeStyles.desc, { color: owned ? colors.textMuted : colors.textFaint }]} numberOfLines={2}>
          {badge.desc}
        </Text>

        <View style={[badgeStyles.rarityPill, {
          backgroundColor: owned ? badge.rarityColor + "22" : "transparent",
          borderColor: owned ? badge.rarityColor + "55" : colors.border,
        }]}>
          <Text style={[badgeStyles.rarityText, { color: owned ? badge.rarityColor : colors.textFaint }]}>
            {RARITY_LABEL[badge.rarity as Rarity]}
          </Text>
        </View>

        {owned && (
          <View style={[badgeStyles.ownedTag, { backgroundColor: badge.rimColor }]}>
            <Text style={badgeStyles.ownedTagText}>EARNED</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  wrap: { width: "48%", position: "relative" },
  card: { borderRadius: colors.radius.lg, padding: 14, alignItems: "center", gap: 7, position: "relative", overflow: "hidden", minHeight: 180 },
  border: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5, borderRadius: colors.radius.lg },
  glowRing: { position: "absolute", top: 18, width: 66, height: 66, borderRadius: 33 },
  medallionOuter: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", marginTop: 4 },
  medallionInner: { width: 58, height: 58, borderRadius: 29, alignItems: "center", justifyContent: "center", borderWidth: 2 },
  name: { fontFamily: "Inter_700Bold", fontSize: 12, textAlign: "center", lineHeight: 16 },
  desc: { fontFamily: "Inter_400Regular", fontSize: 9, textAlign: "center", lineHeight: 13 },
  rarityPill: { borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 7, paddingVertical: 2 },
  rarityText: { fontFamily: "Inter_700Bold", fontSize: 8, letterSpacing: 0.8 },
  ownedTag: { position: "absolute", top: 0, right: 0, borderBottomLeftRadius: 10, paddingHorizontal: 7, paddingVertical: 3 },
  ownedTagText: { fontFamily: "Inter_700Bold", fontSize: 7, color: "#000", letterSpacing: 0.8 },
});

function RankCrest({ level }: { level: number }) {
  const rank = getRankForLevel(level);
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 80, height: 80 }}>
      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <LinearGradient colors={[rank.gradTop, rank.gradBot]} style={[crestStyles.outer, { borderColor: rank.rimColor }]}>
          <RankIcon id={rank.svgIcon} size={36} color={rank.color} />
          <View style={[crestStyles.levelPip, { backgroundColor: rank.color }]}>
            <Text style={crestStyles.levelPipText}>{level}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
const crestStyles = StyleSheet.create({
  outer: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center", borderWidth: 2.5 },
  levelPip: { position: "absolute", bottom: -1, right: -1, width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  levelPipText: { fontFamily: "Inter_700Bold", fontSize: 11, color: "#000" },
});

const ACHIEVEMENTS = [
  { icon: (c: string) => <IconFolder size={22} color={c} />, label: "Cases Solved", color: colors.green, getValue: (g: any) => `${g.solvedCases.length} / ${CASES.length}`, isDone: (g: any) => g.solvedCases.length === CASES.length },
  { icon: (c: string) => <IconTrendingUp size={22} color={c} />, label: "XP Earned", color: colors.gold, getValue: (g: any) => `${g.totalXPEarned} XP`, isDone: (g: any) => g.totalXPEarned >= 500 },
  { icon: (c: string) => <IconCoin size={22} color={c} />, label: "Coins Collected", color: colors.amber, getValue: (g: any) => `${g.coins} coins`, isDone: (g: any) => g.coins >= 100 },
  { icon: (c: string) => <IconFire size={22} color={c} />, label: "Streak Record", color: colors.red, getValue: (g: any) => `${g.streak} days`, isDone: (g: any) => g.streak >= 7 },
  { icon: (c: string) => <RankIcon id="chief" size={22} color={c} />, label: "Level 5 Reached", color: colors.blue, getValue: (g: any) => `Level ${g.level}`, isDone: (g: any) => g.level >= 5 },
  { icon: (c: string) => <IconAward size={22} color={c} />, label: "10 Cases Attempted", color: colors.purple, getValue: (g: any) => `${g.casesAttempted} attempts`, isDone: (g: any) => g.casesAttempted >= 10 },
];

function useEntrance(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, delay, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, []);
  return { opacity, transform: [{ translateY }] };
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const game = useGame();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const rank = getRankForLevel(game.level);
  const xpPct = Math.min((game.xp / game.xpToNextLevel) * 100, 100);
  const [activeTab, setActiveTab] = useState<"achievements" | "badges">("badges");

  const card = useEntrance(0);
  const statsAnim = useEntrance(80);
  const tabs = useEntrance(140);

  const ownedCount = BADGE_DEFS.filter(b => b.matchFn(game.badges, game.solvedCases, game.level, game.streak)).length;

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />

      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <View>
          <Text style={styles.headerLabel}>DETECTIVE FILE</Text>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <Pressable onPress={() => router.push("/settings" as any)} style={styles.settingsBtn}>
          <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.settingsBg}>
            <IconSettings size={18} color={colors.textMuted} />
          </LinearGradient>
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}>

        <Animated.View style={card}>
          <LinearGradient colors={[rank.gradTop, rank.gradBot, "#0A0F1E"]} style={styles.identityCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={[styles.identityBorder, { borderColor: rank.rimColor + "80" }]} />
            <View style={styles.identityTop}>
              <RankCrest level={game.level} />
              <View style={styles.identityMid}>
                <Text style={styles.playerName}>{game.playerName}</Text>
                <View style={[styles.rankPill, { backgroundColor: rank.color + "18", borderColor: rank.color + "45" }]}>
                  <Text style={[styles.rankTitle, { color: rank.color }]}>{rank.title}</Text>
                </View>
                <Text style={styles.rankDesc} numberOfLines={2}>{rank.description}</Text>
              </View>
            </View>

            <View style={styles.perksRow}>
              {rank.perks.slice(0, 2).map((p, i) => (
                <View key={i} style={[styles.perkChip, { borderColor: rank.rimColor + "40" }]}>
                  <Text style={[styles.perkText, { color: rank.color }]}>{p}</Text>
                </View>
              ))}
            </View>

            <View style={styles.xpSection}>
              <View style={styles.xpRow}>
                <Text style={styles.xpLabel}>LEVEL {game.level} TO {game.level + 1}</Text>
                <Text style={[styles.xpVal, { color: rank.color }]}>{game.xp}<Text style={styles.xpMax}> / {game.xpToNextLevel} XP</Text></Text>
              </View>
              <View style={styles.xpBarBg}>
                <LinearGradient colors={[rank.rimColor, rank.color]} style={[styles.xpFill, { width: `${xpPct}%` as any }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
              </View>
              <Text style={styles.xpNext}>{game.xpToNextLevel - game.xp} XP to Level {game.level + 1}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.statsRow, statsAnim]}>
          {[
            { icon: <IconFolder size={18} color={colors.green} />, label: "Solved", val: String(game.solvedCases.length), color: colors.green },
            { icon: <IconCoin size={18} color={colors.amber} />, label: "Coins", val: String(game.coins), color: colors.amber },
            { icon: <IconAward size={18} color={colors.purple} />, label: "Badges", val: `${ownedCount}/${BADGE_DEFS.length}`, color: colors.purple },
            { icon: <IconFire size={18} color={colors.red} />, label: "Streak", val: `${game.streak}d`, color: colors.red },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.statCardInner}>
                {s.icon}
                <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </LinearGradient>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.tabs, tabs]}>
          {(["badges", "achievements"] as const).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
              {activeTab === tab ? (
                <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.tabActive}>
                  <Text style={styles.tabActiveText}>{tab === "badges" ? "Badge Hall" : "Achievements"}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabInactive}>
                  <Text style={styles.tabInactiveText}>{tab === "badges" ? "Badge Hall" : "Achievements"}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </Animated.View>

        {activeTab === "badges" ? (
          <View>
            <View style={styles.badgeSummaryRow}>
              <Text style={styles.badgeSummaryText}>{ownedCount} of {BADGE_DEFS.length} earned</Text>
              <View style={styles.badgeSummaryBar}>
                <View style={[styles.badgeSummaryFill, { width: `${(ownedCount / BADGE_DEFS.length) * 100}%` as any, backgroundColor: colors.gold }]} />
              </View>
            </View>
            <View style={styles.badgesGrid}>
              {BADGE_DEFS.map((badge) => {
                const owned = badge.matchFn(game.badges, game.solvedCases, game.level, game.streak);
                return <BadgeCard key={badge.id} badge={badge} owned={owned} />;
              })}
            </View>
            {ownedCount === 0 && (
              <View style={styles.emptyBadges}>
                <IconLock size={40} color={colors.textFaint} />
                <Text style={styles.emptyBadgesText}>No badges yet — solve your first case to start earning them.</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.achievementsWrap}>
            {ACHIEVEMENTS.map((ach) => {
              const done = ach.isDone(game);
              return (
                <LinearGradient key={ach.label} colors={done ? [ach.color + "14", ach.color + "05"] : [colors.surface2, colors.surface1]} style={styles.achCard}>
                  <View style={[styles.achBorder, { borderColor: done ? ach.color + "45" : colors.border }]} />
                  <View style={[styles.achEmojiWrap, { backgroundColor: ach.color + "18" }]}>
                    {ach.icon(ach.color)}
                  </View>
                  <View style={styles.achText}>
                    <Text style={[styles.achLabel, { color: done ? colors.text : colors.textMuted }]}>{ach.label}</Text>
                    <Text style={[styles.achVal, { color: done ? ach.color : colors.textFaint }]}>{ach.getValue(game)}</Text>
                  </View>
                  <View style={[styles.achStatus, { backgroundColor: done ? ach.color + "20" : "transparent", borderColor: done ? ach.color + "45" : colors.border }]}>
                    {done
                      ? <IconCheck size={18} color={ach.color} />
                      : <IconLock size={16} color={colors.textFaint} />
                    }
                  </View>
                </LinearGradient>
              );
            })}
          </View>
        )}

        <View style={styles.caseProgressSection}>
          <View style={styles.sectionRow}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.gold }]} />
            <Text style={styles.sectionTitle}>Case Progress</Text>
            <Text style={styles.sectionCount}>{game.solvedCases.length}/{CASES.length}</Text>
          </View>
          {CASES.map((c, i) => {
            const solved = game.isCaseSolved(c.id);
            const locked = game.isCaseLocked(c.id, i);
            return (
              <LinearGradient key={c.id} colors={solved ? ["rgba(46,204,142,0.1)", "rgba(46,204,142,0.04)"] : [colors.surface2, colors.surface1]} style={styles.caseRow}>
                <View style={[styles.caseRowBorder, { borderColor: solved ? "rgba(46,204,142,0.3)" : colors.border }]} />
                <View style={styles.caseStatusIcon}>
                  {solved
                    ? <IconCheck size={20} color={colors.green} />
                    : locked
                    ? <IconLock size={18} color={colors.textFaint} />
                    : <RankIcon id="rookie" size={18} color={colors.gold} />
                  }
                </View>
                <View style={styles.caseRowText}>
                  <Text style={[styles.caseRowTitle, { color: locked ? colors.textMuted : colors.text }]}>{c.title}</Text>
                  <Text style={styles.caseRowRef}>{c.bibleReference} · {c.difficulty}</Text>
                </View>
                {solved ? (
                  <View style={styles.caseRewardChip}>
                    <Text style={styles.caseRewardText}>+{c.rewards.xp} XP</Text>
                  </View>
                ) : (
                  <Text style={styles.caseXpPreview}>{c.rewards.xp} XP</Text>
                )}
              </LinearGradient>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.gold, letterSpacing: 2 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.text },
  settingsBtn: { marginTop: 8 },
  settingsBg: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  scroll: { flex: 1, paddingHorizontal: 16 },
  identityCard: { borderRadius: colors.radius.lg, padding: 20, marginBottom: 14, gap: 14, position: "relative", overflow: "hidden" },
  identityBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5, borderRadius: colors.radius.lg },
  identityTop: { flexDirection: "row", alignItems: "center", gap: 16 },
  identityMid: { flex: 1, gap: 5 },
  playerName: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  rankPill: { alignSelf: "flex-start", borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  rankTitle: { fontFamily: "Inter_700Bold", fontSize: 12, letterSpacing: 0.3 },
  rankDesc: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, lineHeight: 16 },
  perksRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  perkChip: { borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  perkText: { fontFamily: "Inter_500Medium", fontSize: 9, letterSpacing: 0.3 },
  xpSection: { gap: 5 },
  xpRow: { flexDirection: "row", justifyContent: "space-between" },
  xpLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 1.2 },
  xpVal: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  xpMax: { color: colors.textMuted },
  xpBarBg: { height: 6, backgroundColor: colors.surface3, borderRadius: 3, overflow: "hidden" },
  xpFill: { height: 6, borderRadius: 3 },
  xpNext: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  statCard: { flex: 1 },
  statCardInner: { borderRadius: colors.radius.md, padding: 10, alignItems: "center", gap: 2, borderWidth: 1, borderColor: colors.border },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 14 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 9, color: colors.textMuted },
  tabs: { flexDirection: "row", gap: 8, marginBottom: 14 },
  tab: { flex: 1 },
  tabActive: { borderRadius: colors.radius.md, padding: 10, alignItems: "center" },
  tabActiveText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  tabInactive: { borderRadius: colors.radius.md, padding: 10, alignItems: "center", backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border },
  tabInactiveText: { fontFamily: "Inter_500Medium", fontSize: 13, color: colors.textMuted },
  badgeSummaryRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  badgeSummaryText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted },
  badgeSummaryBar: { flex: 1, height: 4, backgroundColor: colors.surface3, borderRadius: 2, overflow: "hidden" },
  badgeSummaryFill: { height: 4, borderRadius: 2 },
  badgesGrid: { flexDirection: "row", flexWrap: "wrap", gap: "4%" as any, rowGap: 12, marginBottom: 16 },
  emptyBadges: { alignItems: "center", gap: 10, paddingVertical: 30 },
  emptyBadgesText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center" },
  achievementsWrap: { gap: 8, marginBottom: 22 },
  achCard: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: colors.radius.md, padding: 13, position: "relative", overflow: "hidden" },
  achBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  achEmojiWrap: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  achText: { flex: 1 },
  achLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  achVal: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  achStatus: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  caseProgressSection: { marginBottom: 16 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  sectionCount: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted },
  caseRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, position: "relative", overflow: "hidden" },
  caseRowBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  caseStatusIcon: { width: 28, alignItems: "center" },
  caseRowText: { flex: 1 },
  caseRowTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  caseRowRef: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 1 },
  caseRewardChip: { backgroundColor: "rgba(46,204,142,0.12)", borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: "rgba(46,204,142,0.35)" },
  caseRewardText: { fontFamily: "Inter_700Bold", fontSize: 10, color: colors.green },
  caseXpPreview: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
});
