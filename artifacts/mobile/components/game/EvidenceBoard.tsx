import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { Evidence } from "@/data/cases";

interface Props {
  evidence: Evidence[];
  onContinue: () => void;
  caseTitle: string;
}

const ICON_MAP: Record<string, keyof typeof Feather.glyphMap> = {
  fire: "zap",
  "alert-circle": "alert-circle",
  frown: "frown",
  "map-pin": "map-pin",
  droplet: "droplet",
  "shield-off": "shield-off",
  coffee: "coffee",
  user: "user",
  heart: "heart",
  "message-circle": "message-circle",
  "eye-off": "eye-off",
  gift: "gift",
  moon: "moon",
  "alert-triangle": "alert-triangle",
  shield: "shield",
  "dollar-sign": "dollar-sign",
};

export default function EvidenceBoard({ evidence, onContinue, caseTitle }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const c = colors.light;

  const toggle = (id: string) => {
    setViewed((prev) => new Set([...prev, id]));
    setExpanded((prev) => (prev === id ? null : id));
  };

  const allViewed = viewed.size >= evidence.length;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleRow}>
          <Feather name="search" size={18} color={c.gold} />
          <Text style={[styles.sectionTitle, { color: c.gold }]}>Evidence Board</Text>
        </View>
        <Text style={[styles.subtitle, { color: c.mutedForeground }]}>
          Tap each item to examine. {viewed.size}/{evidence.length} examined.
        </Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {evidence.map((item) => {
          const isOpen = expanded === item.id;
          const isViewed = viewed.has(item.id);
          const iconName = ICON_MAP[item.icon] ?? "circle";

          return (
            <Pressable
              key={item.id}
              onPress={() => toggle(item.id)}
              style={({ pressed }) => [
                styles.card,
                {
                  borderColor: isOpen ? c.gold : c.border,
                  backgroundColor: isOpen ? "#1E1A0E" : c.card,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconBg, { backgroundColor: isOpen ? `${c.gold}30` : `${c.muted}` }]}>
                  <Feather name={iconName} size={18} color={isOpen ? c.gold : c.mutedForeground} />
                </View>
                <View style={styles.cardTitleCol}>
                  <Text style={[styles.evidenceTitle, { color: isViewed ? c.foreground : c.parchment }]}>
                    {item.title}
                  </Text>
                  {!isOpen && (
                    <Text style={[styles.tapHint, { color: c.mutedForeground }]}>Tap to examine</Text>
                  )}
                </View>
                <View style={styles.statusRow}>
                  {isViewed && <Feather name="check-circle" size={14} color="#22C55E" />}
                  <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={c.mutedForeground} />
                </View>
              </View>

              {isOpen && (
                <View style={styles.expanded}>
                  <View style={[styles.divider, { backgroundColor: c.border }]} />
                  <Text style={[styles.description, { color: c.foreground }]}>{item.description}</Text>
                  <View style={[styles.lessonBox, { backgroundColor: `${c.gold}15`, borderColor: `${c.gold}40` }]}>
                    <Feather name="book-open" size={13} color={c.gold} />
                    <Text style={[styles.lessonText, { color: c.gold }]}>{item.lesson}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: c.border }]}>
        {!allViewed && (
          <Text style={[styles.footerHint, { color: c.mutedForeground }]}>
            Examine all evidence before proceeding
          </Text>
        )}
        <Pressable
          onPress={allViewed ? onContinue : undefined}
          style={({ pressed }) => [
            styles.continueBtn,
            {
              backgroundColor: allViewed ? c.gold : c.muted,
              opacity: pressed && allViewed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={[styles.continueBtnText, { color: allViewed ? c.primaryForeground : c.mutedForeground }]}>
            Proceed to Witnesses
          </Text>
          <Feather name="arrow-right" size={16} color={allViewed ? c.primaryForeground : c.mutedForeground} />
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
  list: { flex: 1, paddingHorizontal: 16 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitleCol: { flex: 1 },
  evidenceTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  tapHint: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  expanded: { marginTop: 10 },
  divider: { height: 1, marginBottom: 10 },
  description: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22, marginBottom: 12 },
  lessonBox: {
    flexDirection: "row",
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "flex-start",
  },
  lessonText: { fontFamily: "Inter_500Medium", fontSize: 13, lineHeight: 20, flex: 1 },
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
  footerHint: { fontFamily: "Inter_400Regular", fontSize: 12, textAlign: "center", marginBottom: 8 },
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
