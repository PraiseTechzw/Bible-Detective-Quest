import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { Case } from "@/data/cases";

interface Props {
  caseData: Case;
  onFinish: () => void;
}

function AnimatedCounter({ target, color, suffix = "" }: { target: number | string; color: string; suffix?: string }) {
  const num = typeof target === "number" ? target : 0;
  const val = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = React.useState("0");

  useEffect(() => {
    if (typeof target !== "number") { setDisplay(String(target)); return; }
    Animated.timing(val, { toValue: num, duration: 1200, delay: 600, useNativeDriver: false }).start();
    const listener = val.addListener(({ value }) => setDisplay(Math.floor(value).toString()));
    return () => val.removeListener(listener);
  }, []);

  return <Text style={[styles.rewardVal, { color }]}>{typeof target === "number" ? `+${display}${suffix}` : target}</Text>;
}

export default function RevealScreen({ caseData, onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 60 : insets.top;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.8)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;

  const sectionOpacities = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;
  const sectionSlides = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(24))).current;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Animated.parallel([
      Animated.timing(heroOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(heroScale, { toValue: 1, useNativeDriver: true, tension: 55, friction: 8 }),
    ]).start();

    sectionOpacities.forEach((op, i) => {
      Animated.parallel([
        Animated.timing(op, { toValue: 1, duration: 500, delay: 300 + i * 120, useNativeDriver: true }),
        Animated.spring(sectionSlides[i], { toValue: 0, delay: 300 + i * 120, useNativeDriver: true, tension: 60, friction: 12 }),
      ]).start();
    });
  }, []);

  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom;

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <LinearGradient colors={["#0A0F1E", colors.bg]} style={StyleSheet.absoluteFill} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Hero */}
        <Animated.View style={{ opacity: heroOpacity, transform: [{ scale: heroScale }] }}>
          <LinearGradient colors={["#1E2844", "#0E1628", "#070A13"]} style={styles.heroBanner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={[styles.heroBorder, { borderColor: colors.goldBorder }]} />
            <LinearGradient colors={["rgba(212,150,42,0.3)", "rgba(212,150,42,0.08)"]} style={styles.heroIconBg}>
              <Feather name="book-open" size={32} color={colors.gold} />
            </LinearGradient>
            <Text style={styles.heroLabel}>CASE REVEALED</Text>
            <Text style={styles.heroTitle}>{caseData.title}</Text>
            <Text style={styles.heroRef}>{caseData.bibleReference}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Biblical Account */}
        <AnimSection opacity={sectionOpacities[0]} slide={sectionSlides[0]}>
          <SectionHead title="Biblical Account" color={colors.gold} />
          <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.textCard}>
            <View style={[styles.textCardBorder, { borderColor: colors.border }]} />
            <Text style={styles.revealText}>{caseData.revealText}</Text>
          </LinearGradient>
        </AnimSection>

        {/* Verse */}
        <AnimSection opacity={sectionOpacities[1]} slide={sectionSlides[1]}>
          <LinearGradient colors={["rgba(212,150,42,0.12)", "rgba(212,150,42,0.04)"]} style={styles.verseBox}>
            <View style={[styles.verseBorder, { borderColor: colors.goldBorder }]} />
            <View style={[styles.verseAccent, { backgroundColor: colors.gold }]} />
            <View style={styles.verseContent}>
              <Text style={styles.verseText}>{caseData.revealVerse}</Text>
            </View>
          </LinearGradient>
        </AnimSection>

        {/* Lessons */}
        <AnimSection opacity={sectionOpacities[2]} slide={sectionSlides[2]}>
          <SectionHead title="Detective Lessons" color={colors.blue} />
          <View style={styles.lessonsGrid}>
            {caseData.lessons.map((lesson, i) => (
              <LinearGradient key={i} colors={[colors.surface2, colors.surface1]} style={styles.lessonCard}>
                <View style={[styles.lessonBorder, { borderColor: colors.border }]} />
                <View style={[styles.lessonTypeBadge, { backgroundColor: "rgba(74,126,232,0.15)", borderColor: "rgba(74,126,232,0.35)" }]}>
                  <Text style={[styles.lessonType, { color: colors.blue }]}>{lesson.type.toUpperCase()}</Text>
                </View>
                <Text style={styles.lessonText}>{lesson.text}</Text>
              </LinearGradient>
            ))}
          </View>
        </AnimSection>

        {/* Reflection */}
        <AnimSection opacity={sectionOpacities[3]} slide={sectionSlides[3]}>
          <SectionHead title="Reflection Questions" color={colors.purple} />
          {caseData.reflectionQuestions.map((q, i) => (
            <LinearGradient key={i} colors={[colors.surface2, colors.surface1]} style={styles.reflectionCard}>
              <View style={[styles.reflectionBorder, { borderColor: colors.border }]} />
              <LinearGradient colors={["rgba(124,94,232,0.25)", "rgba(124,94,232,0.08)"]} style={styles.reflectionNum}>
                <Text style={styles.reflectionNumText}>{i + 1}</Text>
              </LinearGradient>
              <Text style={styles.reflectionText}>{q}</Text>
            </LinearGradient>
          ))}
        </AnimSection>

        {/* Rewards */}
        <AnimSection opacity={sectionOpacities[4]} slide={sectionSlides[4]}>
          <LinearGradient colors={["rgba(46,204,142,0.12)", "rgba(46,204,142,0.04)"]} style={styles.rewardsBox}>
            <View style={[styles.rewardsBorder, { borderColor: "rgba(46,204,142,0.35)" }]} />
            <Text style={styles.rewardsTitle}>Case Rewards</Text>
            <View style={styles.rewardsGrid}>
              {[
                { icon: "zap" as const, val: caseData.rewards.xp, label: "XP", color: colors.gold },
                { icon: "disc" as const, val: caseData.rewards.coins, label: "Coins", color: colors.amber },
                { icon: "award" as const, val: caseData.rewards.badge as string | number, label: "Badge", color: colors.purple },
                { icon: "trending-up" as const, val: caseData.rewards.rankProgress, label: "Rank", color: colors.green, suffix: "%" },
              ].map((r, i) => (
                <View key={i} style={styles.rewardItem}>
                  <LinearGradient colors={[`${r.color}20`, `${r.color}06`]} style={styles.rewardIconBg}>
                    <Feather name={r.icon} size={18} color={r.color} />
                  </LinearGradient>
                  <AnimatedCounter target={r.val} color={r.color} suffix={(r as any).suffix} />
                  <Text style={styles.rewardLabel}>{r.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>

          {caseData.nextCaseTitle && (
            <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.closingCard}>
              <View style={[styles.closingBorder, { borderColor: colors.border }]} />
              <Text style={styles.closingText}>{caseData.closingText}</Text>
              <View style={styles.nextCaseRow}>
                <Feather name="arrow-right" size={13} color={colors.gold} />
                <Text style={styles.nextCaseText}>Next: {caseData.nextCaseTitle}</Text>
              </View>
            </LinearGradient>
          )}

          <GoldButton label="Return to Case Files" onPress={onFinish} icon="home" iconRight={false} size="lg" style={styles.finishBtn} />
          <View style={{ height: bottomPad + 24 }} />
        </AnimSection>
      </ScrollView>
    </View>
  );
}

function AnimSection({ opacity, slide, children }: { opacity: Animated.Value; slide: Animated.Value; children: React.ReactNode }) {
  return (
    <Animated.View style={{ opacity, transform: [{ translateY: slide }] }}>
      {children}
    </Animated.View>
  );
}

function SectionHead({ title, color }: { title: string; color: string }) {
  return (
    <View style={secStyles.head}>
      <View style={[secStyles.accent, { backgroundColor: color }]} />
      <Text style={secStyles.title}>{title}</Text>
    </View>
  );
}
const secStyles = StyleSheet.create({
  head: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10, marginTop: 4 },
  accent: { width: 3, height: 18, borderRadius: 2 },
  title: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1, paddingHorizontal: 16 },
  heroBanner: { borderRadius: colors.radius.lg, padding: 24, alignItems: "center", marginTop: 16, marginBottom: 20, gap: 6, position: "relative", overflow: "hidden" },
  heroBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  heroIconBg: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: colors.goldBorder, marginBottom: 8 },
  heroLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 3 },
  heroTitle: { fontFamily: "Inter_700Bold", fontSize: 24, color: colors.text, textAlign: "center" },
  heroRef: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted },
  textCard: { borderRadius: colors.radius.lg, padding: 18, position: "relative", overflow: "hidden", marginBottom: 16 },
  textCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  revealText: { fontFamily: "Inter_400Regular", fontSize: 15, color: colors.text, lineHeight: 26 },
  verseBox: { flexDirection: "row", borderRadius: colors.radius.lg, overflow: "hidden", marginBottom: 20, position: "relative" },
  verseBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  verseAccent: { width: 3 },
  verseContent: { flex: 1, padding: 16 },
  verseText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.parchment, lineHeight: 23, fontStyle: "italic" },
  lessonsGrid: { gap: 8, marginBottom: 20 },
  lessonCard: { borderRadius: colors.radius.md, padding: 14, gap: 6, position: "relative", overflow: "hidden" },
  lessonBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  lessonTypeBadge: { alignSelf: "flex-start", borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  lessonType: { fontFamily: "Inter_600SemiBold", fontSize: 9, letterSpacing: 1.2 },
  lessonText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, lineHeight: 22 },
  reflectionCard: { flexDirection: "row", gap: 12, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, alignItems: "flex-start", position: "relative", overflow: "hidden" },
  reflectionBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  reflectionNum: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", minWidth: 30 },
  reflectionNumText: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.purple },
  reflectionText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, lineHeight: 22, flex: 1 },
  rewardsBox: { borderRadius: colors.radius.lg, padding: 18, marginBottom: 16, marginTop: 4, position: "relative", overflow: "hidden" },
  rewardsBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  rewardsTitle: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.green, textAlign: "center", marginBottom: 14 },
  rewardsGrid: { flexDirection: "row", justifyContent: "space-around" },
  rewardItem: { alignItems: "center", gap: 6, flex: 1 },
  rewardIconBg: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  rewardVal: { fontFamily: "Inter_700Bold", fontSize: 13, textAlign: "center" },
  rewardLabel: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textMuted },
  closingCard: { borderRadius: colors.radius.lg, padding: 18, marginBottom: 16, gap: 10, position: "relative", overflow: "hidden" },
  closingBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  closingText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, lineHeight: 22, fontStyle: "italic", textAlign: "center" },
  nextCaseRow: { flexDirection: "row", alignItems: "center", gap: 6, justifyContent: "center" },
  nextCaseText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.gold },
  finishBtn: { width: "100%", marginBottom: 8 },
});
