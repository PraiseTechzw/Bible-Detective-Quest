import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";

export type GameStep = "intro" | "evidence" | "witnesses" | "timeline" | "suspects" | "verdict" | "reveal";

const STEPS: { key: GameStep; icon: keyof typeof Feather.glyphMap; short: string }[] = [
  { key: "intro", icon: "file-text", short: "Intro" },
  { key: "evidence", icon: "search", short: "Evidence" },
  { key: "witnesses", icon: "mic", short: "Witnesses" },
  { key: "timeline", icon: "clock", short: "Timeline" },
  { key: "suspects", icon: "users", short: "Suspects" },
  { key: "verdict", icon: "scale", short: "Verdict" },
  { key: "reveal", icon: "book-open", short: "Reveal" },
];

interface Props {
  step: GameStep;
  caseTitle: string;
  caseNumber: string;
}

export default function StepHeader({ step, caseTitle, caseNumber }: Props) {
  const insets = useSafeAreaInsets();
  const currentIdx = STEPS.findIndex((s) => s.key === step);
  const current = STEPS[currentIdx];

  return (
    <LinearGradient
      colors={["#131A2E", "#0D1220"]}
      style={[styles.container, { paddingTop: insets.top + 10 }]}
    >
      <View style={[styles.borderBottom, { borderBottomColor: colors.border }]} />

      {/* Top nav */}
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <LinearGradient
            colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]}
            style={styles.backBg}
          >
            <Feather name="chevron-left" size={20} color={colors.text} />
          </LinearGradient>
        </Pressable>

        <View style={styles.titleBlock}>
          <Text style={styles.caseNum}>{caseNumber}</Text>
          <Text style={styles.caseTitle} numberOfLines={1}>{caseTitle}</Text>
        </View>

        <View style={styles.stepCountChip}>
          <Text style={styles.stepCountText}>{currentIdx + 1}/{STEPS.length}</Text>
        </View>
      </View>

      {/* Step dots */}
      <View style={styles.dotsRow}>
        {STEPS.map((s, idx) => {
          const done = idx < currentIdx;
          const active = idx === currentIdx;
          return (
            <React.Fragment key={s.key}>
              {active ? (
                <LinearGradient
                  colors={[colors.goldLight, colors.gold]}
                  style={styles.dotActive}
                >
                  <Feather name={s.icon} size={8} color="#000" />
                </LinearGradient>
              ) : (
                <View style={[styles.dot, done ? styles.dotDone : styles.dotPending]}>
                  {done && <Feather name="check" size={7} color={colors.green} />}
                </View>
              )}
              {idx < STEPS.length - 1 && (
                <View style={[styles.line, done ? { backgroundColor: colors.green } : {}]} />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Current step label */}
      <Text style={styles.currentLabel}>
        {current.short}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    position: "relative",
  },
  borderBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  backBtn: {},
  backBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleBlock: { flex: 1, alignItems: "center" },
  caseNum: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 2,
  },
  caseTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
  },
  stepCountChip: {
    backgroundColor: colors.surface3,
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepCountText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: colors.textMuted,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  dotActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dotDone: {
    backgroundColor: "rgba(46,204,142,0.12)",
    borderColor: "rgba(46,204,142,0.4)",
  },
  dotPending: {
    backgroundColor: colors.surface3,
    borderColor: colors.border,
  },
  line: {
    width: 18,
    height: 1.5,
    backgroundColor: colors.border,
    borderRadius: 1,
  },
  currentLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: colors.gold,
    letterSpacing: 1.5,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
