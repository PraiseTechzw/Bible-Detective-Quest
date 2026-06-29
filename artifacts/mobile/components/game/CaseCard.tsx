import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { Case } from "@/data/cases";

interface Props {
  caseData: Case;
  solved: boolean;
  locked: boolean;
  onPress: () => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: "#22C55E",
  Intermediate: "#F59E0B",
  Advanced: "#EF4444",
};

export default function CaseCard({ caseData, solved, locked, onPress }: Props) {
  const c = colors.light;
  const diffColor = DIFFICULTY_COLOR[caseData.difficulty] ?? c.primary;

  return (
    <Pressable
      onPress={locked ? undefined : onPress}
      style={({ pressed }) => [styles.card, { opacity: locked ? 0.45 : pressed ? 0.8 : 1 }]}
    >
      <View style={styles.header}>
        <View style={[styles.caseNumBadge, { borderColor: c.gold }]}>
          <Text style={[styles.caseNum, { color: c.gold }]}>{caseData.caseNumber}</Text>
        </View>
        {solved && (
          <View style={[styles.solvedBadge, { backgroundColor: "#22C55E20", borderColor: "#22C55E" }]}>
            <Feather name="check-circle" size={12} color="#22C55E" />
            <Text style={[styles.solvedText, { color: "#22C55E" }]}>SOLVED</Text>
          </View>
        )}
        {locked && (
          <View style={[styles.solvedBadge, { backgroundColor: "#ffffff10", borderColor: c.border }]}>
            <Feather name="lock" size={12} color={c.mutedForeground} />
            <Text style={[styles.solvedText, { color: c.mutedForeground }]}>LOCKED</Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: c.foreground }]}>{caseData.title}</Text>

      <Text style={[styles.ref, { color: c.mutedForeground }]}>{caseData.bibleReference}</Text>

      <View style={styles.footer}>
        <View style={[styles.diffBadge, { backgroundColor: `${diffColor}20`, borderColor: diffColor }]}>
          <Text style={[styles.diffText, { color: diffColor }]}>{caseData.difficulty}</Text>
        </View>

        <View style={styles.meta}>
          <Feather name="user-x" size={11} color={c.mutedForeground} />
          <Text style={[styles.metaText, { color: c.mutedForeground }]}>Victim: {caseData.victim}</Text>
        </View>

        <View style={styles.xpRow}>
          <Feather name="zap" size={11} color={c.gold} />
          <Text style={[styles.xpText, { color: c.gold }]}>{caseData.rewards.xp} XP</Text>
        </View>
      </View>

      {!locked && (
        <View style={styles.arrow}>
          <Feather name="arrow-right" size={16} color={c.gold} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.light.border,
    padding: 18,
    marginBottom: 14,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  caseNumBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  caseNum: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  solvedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  solvedText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.8,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginBottom: 4,
  },
  ref: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    marginBottom: 14,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  diffBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  diffText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: "auto",
  },
  xpText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
  },
  arrow: {
    position: "absolute",
    right: 18,
    top: "50%",
  },
});
