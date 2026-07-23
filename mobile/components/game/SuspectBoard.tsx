import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { SuspectProfile } from "@/data/cases";

interface Props {
  suspects: SuspectProfile[];
  suspectNames: string[];
  onContinue: () => void;
}

type EvidStr = "High" | "Medium" | "Low";
const STR: Record<EvidStr, { color: string; icon: keyof typeof Feather.glyphMap; label: string }> = {
  High: { color: colors.red, icon: "alert-triangle", label: "High Evidence" },
  Medium: { color: colors.amber, icon: "alert-circle", label: "Medium Evidence" },
  Low: { color: colors.green, icon: "check-circle", label: "Low Evidence" },
};

export default function SuspectBoard({ suspects, suspectNames, onContinue }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setReviewed((p) => new Set([...p, name]));
    setExpanded((p) => (p === name ? null : name));
  };

  const allReviewed = reviewed.size >= suspects.length;

  return (
    <View style={styles.root}>
      {/* Sub header */}
      <LinearGradient colors={["#0F1628", colors.bg]} style={styles.subHeader}>
        <View style={styles.subHeaderRow}>
          <View style={[styles.accent, { backgroundColor: colors.red }]} />
          <Text style={styles.subHeaderTitle}>Suspect Board</Text>
          <View style={styles.progressChip}>
            <Text style={styles.progressText}>{reviewed.size}/{suspects.length}</Text>
          </View>
        </View>
        <Text style={styles.hint}>Review every suspect before delivering your verdict</Text>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {suspects.map((suspect) => {
          const isOpen = expanded === suspect.name;
          const isReviewed = reviewed.has(suspect.name);
          const str = STR[suspect.evidenceStrength as EvidStr] ?? STR.Low;

          return (
            <Pressable
              key={suspect.name}
              onPress={() => toggle(suspect.name)}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, marginBottom: 10 })}
            >
              <LinearGradient
                colors={isOpen ? ["#261414", "#160C0C"] : [colors.surface2, colors.surface1]}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.cardBorder, { borderColor: isOpen ? `${str.color}50` : colors.border }]} />
                <View style={[styles.leftBar, { backgroundColor: isOpen ? str.color : colors.textFaint }]} />

                <View style={styles.cardInner}>
                  <View style={styles.cardTop}>
                    <LinearGradient
                      colors={[`${str.color}20`, `${str.color}06`]}
                      style={styles.avatar}
                    >
                      <Feather name="user" size={20} color={str.color} />
                    </LinearGradient>
                    <View style={styles.suspectInfo}>
                      <Text style={styles.suspectName}>{suspect.name}</Text>
                      <View style={styles.strengthRow}>
                        <Feather name={str.icon} size={11} color={str.color} />
                        <Text style={[styles.strengthText, { color: str.color }]}>{str.label}</Text>
                      </View>
                    </View>
                    <View style={styles.cardRight}>
                      {isReviewed && <Feather name="check-circle" size={13} color={colors.green} />}
                      <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={colors.textMuted} />
                    </View>
                  </View>

                  {isOpen && (
                    <View style={styles.expandedContent}>
                      <View style={[styles.divider, { backgroundColor: colors.border }]} />
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>MOTIVE</Text>
                        <Text style={styles.infoText}>{suspect.motive}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>ANALYSIS</Text>
                        <Text style={styles.infoText}>{suspect.description}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </Pressable>
          );
        })}
        <View style={{ height: 110 }} />
      </ScrollView>

      <LinearGradient
        colors={["rgba(7,10,19,0)", "rgba(7,10,19,0.97)", colors.bg]}
        style={styles.footer}
      >
        {!allReviewed && (
          <Text style={styles.footerHint}>Review all suspects to continue</Text>
        )}
        <GoldButton
          label="Deliver Verdict"
          onPress={allReviewed ? onContinue : () => {}}
          icon="scale"
          iconRight={false}
          disabled={!allReviewed}
          size="lg"
          style={styles.btn}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  subHeader: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 12 },
  subHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  accent: { width: 3, height: 18, borderRadius: 2 },
  subHeaderTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text, flex: 1 },
  progressChip: {
    backgroundColor: colors.surface3,
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted },
  hint: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted },
  scroll: { flex: 1, paddingHorizontal: 16 },
  card: {
    borderRadius: colors.radius.lg,
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
  },
  cardBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  leftBar: { width: 3, borderRadius: 0 },
  cardInner: { flex: 1, padding: 14 },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  suspectInfo: { flex: 1 },
  suspectName: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text },
  strengthRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  strengthText: { fontFamily: "Inter_500Medium", fontSize: 12 },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  expandedContent: { marginTop: 12, gap: 10 },
  divider: { height: 1, marginBottom: 4 },
  infoRow: { gap: 3 },
  infoLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.textMuted, letterSpacing: 1.5 },
  infoText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, lineHeight: 22 },
  footer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footerHint: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, textAlign: "center", marginBottom: 8 },
  btn: { width: "100%" },
});
