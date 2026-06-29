import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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

export default function IntroScreen({ caseData, onContinue }: Props) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom;

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

            <View style={styles.heroIcon}>
              <LinearGradient colors={["rgba(212,150,42,0.3)", "rgba(196,125,26,0.1)"]} style={styles.heroIconBg}>
                <Feather name="folder" size={28} color={colors.gold} />
              </LinearGradient>
            </View>

            <Text style={styles.heroLabel}>CASE FILE</Text>
            <Text style={styles.heroTitle}>{caseData.title}</Text>
            <Text style={styles.heroRef}>{caseData.bibleReference}</Text>

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
            </View>
            <LinearGradient
              colors={[colors.surface2, colors.surface1]}
              style={styles.introCard}
            >
              <View style={[styles.introBorder, { borderColor: colors.border }]} />
              <Text style={styles.introText}>{caseData.introduction}</Text>
            </LinearGradient>
          </View>

          {/* File overview */}
          <View style={styles.introSection}>
            <View style={styles.sectionHead}>
              <View style={[styles.sectionAccent, { backgroundColor: colors.purple }]} />
              <Text style={styles.sectionLabel}>FILE OVERVIEW</Text>
            </View>
            <View style={styles.fileGrid}>
              {[
                { icon: "users" as const, label: "Suspects", val: caseData.suspects.join(", ") },
                { icon: "search" as const, label: "Evidence", val: `${caseData.evidence.length} items` },
                { icon: "mic" as const, label: "Witnesses", val: `${caseData.witnesses.length} on record` },
                { icon: "clock" as const, label: "Timeline Events", val: `${caseData.timeline.length} events` },
              ].map((row, i) => (
                <LinearGradient
                  key={i}
                  colors={[colors.surface2, colors.surface1]}
                  style={styles.fileRow}
                >
                  <View style={[styles.fileRowBorder, { borderColor: colors.border }]} />
                  <View style={[styles.fileIconBg, { backgroundColor: "rgba(74,126,232,0.12)" }]}>
                    <Feather name={row.icon} size={14} color={colors.blue} />
                  </View>
                  <View style={styles.fileRowText}>
                    <Text style={styles.fileRowLabel}>{row.label}</Text>
                    <Text style={styles.fileRowVal}>{row.val}</Text>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </Animated.View>
      </ScrollView>

      {/* CTA */}
      <LinearGradient
        colors={["rgba(7,10,19,0)", "rgba(7,10,19,0.97)", "#070A13"]}
        style={[styles.footer, { paddingBottom: bottomPad + 12 }]}
      >
        <GoldButton
          label="Begin Investigation"
          onPress={onContinue}
          icon="search"
          iconRight={false}
          size="lg"
          style={styles.beginBtn}
        />
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
  heroIcon: { marginBottom: 12 },
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
  },
  beginBtn: { width: "100%" },
});
