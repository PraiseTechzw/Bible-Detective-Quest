import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { getRankForLevel } from "@/constants/ranks";
import { BADGE_DEFS } from "@/constants/badges";
import { CASES } from "@/data/cases";
import { useGame } from "@/context/GameContext";
import CaseCard from "@/components/game/CaseCard";
import LevelUpModal from "@/components/game/LevelUpModal";
import { RankIcon, IconCoin, IconFolder, IconAward, IconZap } from "@/components/ui/SvgIcons";

function useEntrance(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 480, delay, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
  }, []);
  return { opacity, transform: [{ translateY }] };
}

function AnimatedXPBar({ pct }: { pct: number }) {
  const width = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(width, { toValue: pct, duration: 900, delay: 300, useNativeDriver: false }).start();
  }, [pct]);
  return (
    <View style={xpStyles.bg}>
      <Animated.View style={{ width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }}>
        <LinearGradient colors={[colors.goldLight, colors.gold]} style={xpStyles.fill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      </Animated.View>
    </View>
  );
}
const xpStyles = StyleSheet.create({
  bg: { height: 6, backgroundColor: colors.surface3, borderRadius: 3, overflow: "hidden" },
  fill: { height: 6, borderRadius: 3 },
});

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { level, xp, xpToNextLevel, coins, solvedCases, badges, isCaseSolved, isCaseLocked, streak, pendingLevelUp, clearPendingLevelUp, playerName } = useGame();
  const rank = getRankForLevel(level);
  const xpPct = Math.min((xp / xpToNextLevel) * 100, 100);
  const ownedBadges = BADGE_DEFS.filter(b => b.matchFn(badges, solvedCases, level, streak));
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const [showLevelUp, setShowLevelUp] = React.useState(false);

  useEffect(() => {
    if (pendingLevelUp) setShowLevelUp(true);
  }, [pendingLevelUp]);

  const header = useEntrance(0);
  const profileCard = useEntrance(80);
  const stats = useEntrance(160);
  const section = useEntrance(220);

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13", "#070A13"]} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.header, { paddingTop: topPad + 8 }, header]}>
        <View>
          <Text style={styles.titleLine1}>BIBLE</Text>
          <Text style={styles.titleLine2}>DETECTIVE</Text>
          <View style={[styles.titleUnderline, { backgroundColor: colors.gold }]} />
        </View>
        <Pressable style={styles.coinsBtn}>
          <LinearGradient colors={["rgba(212,150,42,0.2)", "rgba(196,125,26,0.08)"]} style={styles.coinsBg}>
            <IconCoin size={14} color={colors.gold} />
            <Text style={styles.coinsVal}>{coins}</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 80 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.profileWrap, profileCard]}>
          <LinearGradient colors={[rank.gradTop, rank.gradBot, "#0A0F1E"]} style={styles.profileCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={[styles.profileBorder, { borderColor: rank.rimColor + "60" }]} />
            <View style={styles.profileTop}>
              <View style={styles.badgeWrap}>
                <LinearGradient colors={[rank.rimColor + "40", rank.rimColor + "10"]} style={styles.badgeBg}>
                  <RankIcon id={rank.svgIcon} size={28} color={rank.color} />
                </LinearGradient>
                <View style={[styles.levelPill, { backgroundColor: rank.color }]}>
                  <Text style={styles.levelPillText}>{level}</Text>
                </View>
              </View>
              <View style={styles.profileMid}>
                <Text style={styles.rankTitle}>{rank.title}</Text>
                <Text style={[styles.rankSub, { color: rank.color }]}>{rank.shortTitle}</Text>
                <Text style={styles.playerName} numberOfLines={1}>{playerName}</Text>
              </View>
              <View style={styles.solvedWrap}>
                <Text style={styles.solvedNum}>{solvedCases.length}</Text>
                <Text style={styles.solvedLabel}>Solved</Text>
              </View>
            </View>
            <View style={styles.xpSection}>
              <View style={styles.xpLabelRow}>
                <Text style={styles.xpLabel}>EXPERIENCE</Text>
                <Text style={styles.xpVal}>{xp} <Text style={styles.xpMax}>/ {xpToNextLevel}</Text></Text>
              </View>
              <AnimatedXPBar pct={xpPct} />
              <Text style={styles.nextLevelLabel}>Level {level + 1} requires {xpToNextLevel - xp} more XP</Text>
            </View>
            {ownedBadges.length > 0 && (
              <View style={styles.badgesRow}>
                {ownedBadges.slice(0, 3).map((b) => (
                  <View key={b.id} style={[styles.badgeChip, { backgroundColor: b.rarityColor + "15", borderColor: b.rarityColor + "45" }]}>
                    <Text style={[styles.badgeChipText, { color: b.rarityColor }]} numberOfLines={1}>{b.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.statsRow, stats]}>
          {[
            { icon: <IconFolder size={16} color={colors.gold} />, label: "Cases", val: `${solvedCases.length}/${CASES.length}` },
            { icon: <IconAward size={16} color={colors.purple} />, label: "Badges", val: `${ownedBadges.length}/${BADGE_DEFS.length}` },
            { icon: <IconZap size={16} color={colors.blue} />, label: "Streak", val: `${streak}d` },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.statCardInner}>
                {s.icon}
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </LinearGradient>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.sectionRow, section]}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.gold }]} />
          <Text style={styles.sectionTitle}>Case Files</Text>
          <Text style={styles.sectionCount}>{solvedCases.length}/{CASES.length} solved</Text>
        </Animated.View>

        {CASES.map((c, idx) => (
          <CaseCard
            key={c.id}
            caseData={c}
            solved={isCaseSolved(c.id)}
            locked={isCaseLocked(c.id, idx)}
            onPress={() => router.push(`/case/${c.id}` as any)}
            entranceDelay={280 + idx * 70}
          />
        ))}

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>All cases grounded strictly in biblical scripture</Text>
        </View>
      </ScrollView>

      <LevelUpModal
        visible={showLevelUp}
        level={pendingLevelUp ?? level}
        onDismiss={() => {
          setShowLevelUp(false);
          clearPendingLevelUp();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14 },
  titleLine1: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold, letterSpacing: 5 },
  titleLine2: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.text, letterSpacing: 4, lineHeight: 30, marginTop: -2 },
  titleUnderline: { height: 2, width: 60, borderRadius: 1, marginTop: 4 },
  coinsBtn: { marginTop: 4 },
  coinsBg: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: colors.radius.full, borderWidth: 1, borderColor: colors.goldBorder },
  coinsVal: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.gold },
  profileWrap: { marginHorizontal: 16, marginBottom: 14 },
  profileCard: { borderRadius: colors.radius.lg, padding: 18, position: "relative", overflow: "hidden" },
  profileBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5, borderRadius: colors.radius.lg },
  profileTop: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18 },
  badgeWrap: { position: "relative" },
  badgeBg: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.1)" },
  levelPill: { position: "absolute", bottom: -2, right: -2, borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  levelPillText: { fontFamily: "Inter_700Bold", fontSize: 11, color: "#000" },
  profileMid: { flex: 1, gap: 2 },
  rankTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text },
  rankSub: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1 },
  playerName: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  solvedWrap: { alignItems: "center" },
  solvedNum: { fontFamily: "Inter_700Bold", fontSize: 28, color: colors.text },
  solvedLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted, letterSpacing: 0.5 },
  xpSection: { gap: 5 },
  xpLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  xpLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 1.2 },
  xpVal: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  xpMax: { color: colors.textMuted },
  nextLevelLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
  badgesRow: { flexDirection: "row", gap: 6, marginTop: 12, flexWrap: "wrap" },
  badgeChip: { borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  badgeChipText: { fontFamily: "Inter_500Medium", fontSize: 9 },
  statsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  statCard: { flex: 1 },
  statCardInner: { borderRadius: colors.radius.md, padding: 12, alignItems: "center", gap: 4, borderWidth: 1, borderColor: colors.border },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, marginBottom: 12 },
  sectionAccent: { width: 3, height: 18, borderRadius: 2 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  sectionCount: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted },
  footer: { alignItems: "center", marginTop: 10, paddingHorizontal: 20, gap: 8 },
  footerLine: { width: 40, height: 1, backgroundColor: colors.border },
  footerText: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint, textAlign: "center" },
});
