import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import Badge from "@/components/ui/Badge";
import type { Case } from "@/data/cases";

interface Props {
  caseData: Case;
  onContinue: () => void;
}

type DiffColor = "green" | "amber" | "red";
const DIFF_COLOR: Record<string, DiffColor> = {
  Beginner: "green",
  Intermediate: "amber",
  Advanced: "red",
};

const FILE_ROW_META = [
  { icon: "users" as const, label: "Suspects", accent: colors.purple, tint: "rgba(155,107,232,0.12)" },
  { icon: "search" as const, label: "Evidence", accent: colors.gold, tint: "rgba(212,150,42,0.12)" },
  { icon: "mic" as const, label: "Witnesses", accent: colors.blue, tint: "rgba(74,126,232,0.12)" },
  { icon: "clock" as const, label: "Timeline Events", accent: colors.blue, tint: "rgba(74,126,232,0.12)" },
];

/* ------------------------- decorative primitives ------------------------- */

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = { position: "absolute" as const, width: 16, height: 16, borderColor: colors.goldBorder };
  const map = {
    tl: { top: -6, left: -6, borderTopWidth: 2, borderLeftWidth: 2 },
    tr: { top: -6, right: -6, borderTopWidth: 2, borderRightWidth: 2 },
    bl: { bottom: -6, left: -6, borderBottomWidth: 2, borderLeftWidth: 2 },
    br: { bottom: -6, right: -6, borderBottomWidth: 2, borderRightWidth: 2 },
  };
  return <View style={[base, map[position]]} />;
}

function PulseRing() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scale, opacity]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.pulseRing, { transform: [{ scale }], opacity }]}
    />
  );
}

function CaseStamp({ label }: { label: string }) {
  return (
    <View style={styles.stampWrap}>
      <Text style={styles.stampText}>{label}</Text>
    </View>
  );
}

/* --------------------------------- rows ---------------------------------- */

function FileRow({
  index,
  icon,
  label,
  val,
  accent,
  tint,
  anim,
}: {
  index: number;
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  val: string;
  accent: string;
  tint: string;
  anim: Animated.Value;
}) {
  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }),
          },
        ],
      }}
    >
      <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.fileRow}>
        <View style={[styles.fileRowBorder, { borderColor: colors.border }]} />
        <Text style={styles.fileRowIndex}>{String(index + 1).padStart(2, "0")}</Text>
        <View style={[styles.fileIconBg, { backgroundColor: tint }]}>
          <Feather name={icon} size={14} color={accent} />
        </View>
        <View style={styles.fileRowText}>
          <Text style={styles.fileRowLabel}>{label}</Text>
          <Text style={styles.fileRowVal} numberOfLines={1}>
            {val}
          </Text>
        </View>
        <Feather name="chevron-right" size={16} color={colors.textMuted} />
      </LinearGradient>
    </Animated.View>
  );
}

/* ------------------------------ main screen ------------------------------- */

export default function IntroScreen({ caseData, onContinue }: Props) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const ctaGlow = useRef(new Animated.Value(0.4)).current;

  const rowAnims = useRef(FILE_ROW_META.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();

    Animated.stagger(
      90,
      rowAnims.map((v) =>
        Animated.timing(v, {
          toValue: 1,
          duration: 420,
          delay: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ),
    ).start();

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ctaGlow, { toValue: 0.9, duration: 1400, useNativeDriver: true }),
        Animated.timing(ctaGlow, { toValue: 0.4, duration: 1400, useNativeDriver: true }),
      ]),
    );
    glowLoop.start();
    return () => glowLoop.stop();
  }, []);

  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom;

  const fileRows = [
    { ...FILE_ROW_META[0], val: caseData.suspects.join(", ") },
    { ...FILE_ROW_META[1], val: `${caseData.evidence.length} items` },
    { ...FILE_ROW_META[2], val: `${caseData.witnesses.length} on record` },
    { ...FILE_ROW_META[3], val: `${caseData.timeline.length} events` },
  ];

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* Hero banner */}
          <LinearGradient
            colors={["#1C2844", "#0E1628", "#070A13"]}
            style={styles.heroBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.heroBorder, { borderColor: colors.goldBorder }]} />
            <View style={styles.heroSheen} pointerEvents="none" />

            <CaseStamp label={caseData.difficulty} />

            <View style={styles.heroIcon}>
              <PulseRing />
              <LinearGradient colors={["rgba(212,150,42,0.3)", "rgba(196,125,26,0.1)"]} style={styles.heroIconBg}>
                <CornerBracket position="tl" />
                <CornerBracket position="tr" />
                <CornerBracket position="bl" />
                <CornerBracket position="br" />
                <Feather name="folder" size={28} color={colors.gold} />
              </LinearGradient>
            </View>

            <Text style={styles.heroLabel}>CASE FILE</Text>
            <Text style={styles.heroTitle}>{caseData.title}</Text>
            <Text style={styles.heroRef}>{caseData.bibleReference}</Text>

            <View style={styles.heroDivider} />

            <View style={styles.heroBadges}>
              <Badge label={caseData.difficulty} color={DIFF_COLOR[caseData.difficulty] ?? "gold"} />
              <Badge label={`Victim: ${caseData.victim}`} color="muted" icon="user-x" />
              <Badge label={`${caseData.rewards.xp} XP`} color="gold" icon="zap" />
            </View>
          </LinearGradient>

          {/* Intro text */}
          <View style={styles.introSection}>
            <View style={styles.sectionHead}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.blue }]} />
              <Text style={styles.sectionLabel}>CASE INTRODUCTION</Text>
              <View style={styles.sectionLine} />
            </View>
            <LinearGradient
              colors={[colors.surface2, colors.surface1]}
              style={styles.introCard}
            >
              <View style={[styles.introBorder, { borderColor: colors.border }]} />
              <Feather
                name="file-text"
                size={54}
                color={colors.border}
                style={styles.introWatermark}
              />
              <Text style={styles.introText}>{caseData.introduction}</Text>
            </LinearGradient>
          </View>

          {/* File overview */}
          <View style={styles.introSection}>
            <View style={styles.sectionHead}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.purple }]} />
              <Text style={styles.sectionLabel}>FILE OVERVIEW</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.fileGrid}>
              {fileRows.map((row, i) => (
                <FileRow
                  key={row.label}
                  index={i}
                  icon={row.icon}
                  label={row.label}
                  val={row.val}
                  accent={row.accent}
                  tint={row.tint}
                  anim={rowAnims[i]}
                />
              ))}
            </View>
          </View>

          <View style={{ height: 110 }} />
        </Animated.View>
      </ScrollView>

      {/* CTA */}
      <LinearGradient
        colors={["rgba(7,10,19,0)", "rgba(7,10,19,0.97)", "#070A13"]}
        style={[styles.footer, { paddingBottom: bottomPad + 12 }]}
      >
        <Text style={styles.footerHint}>Review the file above, then step into the investigation.</Text>
        <View style={styles.ctaWrap}>
          <Animated.View style={[styles.ctaGlow, { opacity: ctaGlow }]} pointerEvents="none" />
          <GoldButton
            label="Begin Investigation"
            onPress={onContinue}
            icon="search"
            iconRight={false}
            size="lg"
            style={styles.beginBtn}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1, paddingHorizontal: 16 },

  heroBanner: {
    borderRadius: colors.radius.lg,
    padding: 22,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 18,
    position: "relative",
    overflow: "hidden",
  },
  heroBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  heroSheen: {
    position: "absolute",
    top: -60,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(212,150,42,0.06)",
  },

  stampWrap: {
    position: "absolute",
    top: 14,
    right: 14,
    borderWidth: 1.5,
    borderColor: "rgba(212,150,42,0.55)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    transform: [{ rotate: "8deg" }],
  },
  stampText: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1.5,
    color: "rgba(212,150,42,0.75)",
    textTransform: "uppercase",
  },

  heroIcon: { marginBottom: 12, alignItems: "center", justifyContent: "center" },
  pulseRing: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: colors.gold,
  },
  heroIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.goldBorder,
  },
  heroLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 3,
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  heroRef: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 14,
  },
  heroDivider: {
    width: 40,
    height: 1,
    backgroundColor: colors.goldBorder,
    marginBottom: 14,
  },
  heroBadges: { flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" },

  introSection: { marginBottom: 16 },
  sectionHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionAccent: { width: 3, height: 14, borderRadius: 2 },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 4,
  },
  introCard: {
    borderRadius: colors.radius.lg,
    padding: 18,
    position: "relative",
    overflow: "hidden",
  },
  introBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  introWatermark: {
    position: "absolute",
    bottom: -10,
    right: -6,
    opacity: 0.5,
  },
  introText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: colors.text,
    lineHeight: 26,
  },

  fileGrid: { gap: 8 },
  fileRow: {
    borderRadius: colors.radius.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    position: "relative",
    overflow: "hidden",
  },
  fileRowBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  fileRowIndex: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: colors.border,
    letterSpacing: 1,
  },
  fileIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fileRowText: { flex: 1 },
  fileRowLabel: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  fileRowVal: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text, marginTop: 1 },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  footerHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: colors.textMuted,
    marginBottom: 10,
    textAlign: "center",
  },
  ctaWrap: { width: "100%", position: "relative" },
  ctaGlow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: colors.radius.lg ?? 16,
    backgroundColor: "rgba(212,150,42,0.18)",
  },
  beginBtn: { width: "100%" },
});