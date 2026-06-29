import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";

export type GameStep = "intro" | "evidence" | "witnesses" | "timeline" | "suspects" | "verdict" | "reveal";

const STEPS: { key: GameStep; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { key: "intro", label: "Intro", icon: "file-text" },
  { key: "evidence", label: "Evidence", icon: "search" },
  { key: "witnesses", label: "Witnesses", icon: "mic" },
  { key: "timeline", label: "Timeline", icon: "clock" },
  { key: "suspects", label: "Suspects", icon: "users" },
  { key: "verdict", label: "Verdict", icon: "scale" },
  { key: "reveal", label: "Reveal", icon: "book-open" },
];

interface Props {
  step: GameStep;
  caseTitle: string;
  caseNumber: string;
}

export default function StepHeader({ step, caseTitle, caseNumber }: Props) {
  const c = colors.light;
  const insets = useSafeAreaInsets();
  const currentIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: c.background, borderBottomColor: c.border }]}>
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={22} color={c.foreground} />
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={[styles.caseNum, { color: c.gold }]}>{caseNumber}</Text>
          <Text style={[styles.caseTitle, { color: c.foreground }]} numberOfLines={1}>
            {caseTitle}
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.stepsRow}>
        {STEPS.map((s, idx) => {
          const done = idx < currentIdx;
          const active = idx === currentIdx;
          return (
            <View key={s.key} style={styles.stepItem}>
              <View
                style={[
                  styles.stepDot,
                  {
                    backgroundColor: active ? c.gold : done ? "#22C55E" : c.muted,
                    borderColor: active ? c.gold : done ? "#22C55E" : c.border,
                  },
                ]}
              >
                {done ? (
                  <Feather name="check" size={8} color="#fff" />
                ) : (
                  <Feather name={s.icon} size={8} color={active ? c.primaryForeground : c.mutedForeground} />
                )}
              </View>
              {idx < STEPS.length - 1 && (
                <View style={[styles.stepLine, { backgroundColor: done ? "#22C55E" : c.border }]} />
              )}
            </View>
          );
        })}
      </View>

      <Text style={[styles.stepLabel, { color: c.mutedForeground }]}>
        Step {currentIdx + 1} of {STEPS.length} — {STEPS[currentIdx].label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: { flex: 1, alignItems: "center" },
  caseNum: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.5 },
  caseTitle: { fontFamily: "Inter_700Bold", fontSize: 15 },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  stepItem: { flexDirection: "row", alignItems: "center" },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLine: { width: 20, height: 1.5 },
  stepLabel: { fontFamily: "Inter_400Regular", fontSize: 11, textAlign: "center", letterSpacing: 0.5 },
});
