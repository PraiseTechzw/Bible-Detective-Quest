import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { SuspectProfile } from "@/data/cases";

interface Props {
  suspects: SuspectProfile[];
  suspectNames: string[];
  onContinue: () => void;
}

const STRENGTH_COLOR: Record<string, string> = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#22C55E",
};

const STRENGTH_ICON: Record<string, keyof typeof Feather.glyphMap> = {
  High: "alert-triangle",
  Medium: "alert-circle",
  Low: "check-circle",
};

export default function SuspectBoard({ suspects, suspectNames, onContinue }: Props) {
  const c = colors.light;
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setReviewed((prev) => new Set([...prev, name]));
    setExpanded((prev) => (prev === name ? null : name));
  };

  const allReviewed = reviewed.size >= suspects.length;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleRow}>
          <Feather name="users" size={18} color={c.gold} />
          <Text style={[styles.sectionTitle, { color: c.gold }]}>Suspect Board</Text>
        </View>
        <Text style={[styles.subtitle, { color: c.mutedForeground }]}>
          Review every suspect before making your decision.
        </Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {suspects.map((suspect) => {
          const isOpen = expanded === suspect.name;
          const isReviewed = reviewed.has(suspect.name);
          const strengthColor = STRENGTH_COLOR[suspect.evidenceStrength];
          const strengthIcon = STRENGTH_ICON[suspect.evidenceStrength];

          return (
            <Pressable
              key={suspect.name}
              onPress={() => toggle(suspect.name)}
              style={({ pressed }) => [
                styles.card,
                {
                  borderColor: isOpen ? strengthColor : c.border,
                  backgroundColor: isOpen ? `${strengthColor}10` : c.card,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.suspectAvatar, { backgroundColor: `${strengthColor}20`, borderColor: `${strengthColor}50` }]}>
                  <Feather name="user" size={18} color={strengthColor} />
                </View>
                <View style={styles.suspectInfo}>
                  <Text style={[styles.suspectName, { color: c.foreground }]}>{suspect.name}</Text>
                  <View style={styles.strengthRow}>
                    <Feather name={strengthIcon} size={12} color={strengthColor} />
                    <Text style={[styles.strengthText, { color: strengthColor }]}>
                      {suspect.evidenceStrength} Evidence
                    </Text>
                  </View>
                </View>
                <View style={styles.cardRight}>
                  {isReviewed && <Feather name="check-circle" size={14} color="#22C55E" />}
                  <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={c.mutedForeground} />
                </View>
              </View>

              {isOpen && (
                <View style={styles.expanded}>
                  <View style={[styles.divider, { backgroundColor: c.border }]} />
                  <View style={styles.row}>
                    <Text style={[styles.label, { color: c.mutedForeground }]}>MOTIVE</Text>
                    <Text style={[styles.value, { color: c.foreground }]}>{suspect.motive}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.label, { color: c.mutedForeground }]}>ANALYSIS</Text>
                    <Text style={[styles.value, { color: c.foreground }]}>{suspect.description}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: c.border }]}>
        {!allReviewed && (
          <Text style={[styles.hint, { color: c.mutedForeground }]}>
            Review all suspects before proceeding
          </Text>
        )}
        <Pressable
          onPress={allReviewed ? onContinue : undefined}
          style={({ pressed }) => [
            styles.continueBtn,
            {
              backgroundColor: allReviewed ? c.gold : c.muted,
              opacity: pressed && allReviewed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={[styles.continueBtnText, { color: allReviewed ? c.primaryForeground : c.mutedForeground }]}>
            Deliver Verdict
          </Text>
          <Feather name="arrow-right" size={16} color={allReviewed ? c.primaryForeground : c.mutedForeground} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 20, letterSpacing: 0.5 },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 13 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  suspectAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  suspectInfo: { flex: 1 },
  suspectName: { fontFamily: "Inter_700Bold", fontSize: 16 },
  strengthRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  strengthText: { fontFamily: "Inter_500Medium", fontSize: 12 },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  expanded: { marginTop: 10, gap: 10 },
  divider: { height: 1, marginBottom: 4 },
  row: { gap: 4 },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2 },
  value: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: colors.light.background,
    borderTopWidth: 1,
  },
  hint: { fontFamily: "Inter_400Regular", fontSize: 12, textAlign: "center", marginBottom: 8 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  continueBtnText: { fontFamily: "Inter_700Bold", fontSize: 15 },
});
