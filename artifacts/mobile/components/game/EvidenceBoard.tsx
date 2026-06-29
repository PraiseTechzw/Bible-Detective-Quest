import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { Evidence } from "@/data/cases";

interface Props {
  evidence: Evidence[];
  onContinue: () => void;
  caseTitle: string;
}

const ICON_MAP: Record<string, keyof typeof Feather.glyphMap> = {
  fire: "zap", "alert-circle": "alert-circle", frown: "frown", "map-pin": "map-pin",
  droplet: "droplet", "shield-off": "shield-off", coffee: "coffee", user: "user",
  heart: "heart", "message-circle": "message-circle", "eye-off": "eye-off", gift: "gift",
  moon: "moon", "alert-triangle": "alert-triangle", shield: "shield", "dollar-sign": "dollar-sign",
};

export default function EvidenceBoard({ evidence, onContinue, caseTitle }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setViewed((p) => new Set([...p, id]));
    setExpanded((p) => (p === id ? null : id));
  };

  const allViewed = viewed.size >= evidence.length;

  return (
    <View style={styles.root}>
      {/* Sub header */}
      <LinearGradient colors={["#0F1628", colors.bg]} style={styles.subHeader}>
        <View style={styles.subHeaderRow}>
          <View style={[styles.subHeaderAccent, { backgroundColor: colors.blue }]} />
          <Text style={styles.subHeaderTitle}>Evidence Board</Text>
          <View style={styles.progressChip}>
            <Text style={styles.progressText}>{viewed.size}/{evidence.length}</Text>
          </View>
        </View>
        <Text style={styles.subHeaderHint}>Tap each item to examine it</Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={[colors.blue, "#6A9EFF"]}
            style={[styles.progressFill, { width: `${(viewed.size / evidence.length) * 100}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {evidence.map((item) => {
          const isOpen = expanded === item.id;
          const isViewed = viewed.has(item.id);
          const icon = ICON_MAP[item.icon] ?? "circle";

          return (
            <Pressable
              key={item.id}
              onPress={() => toggle(item.id)}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, marginBottom: 10 })}
            >
              <LinearGradient
                colors={isOpen ? ["#182038", "#101828"] : [colors.surface2, colors.surface1]}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.cardBorder, { borderColor: isOpen ? colors.goldBorder : colors.border }]} />

                <View style={styles.cardTop}>
                  <LinearGradient
                    colors={isOpen ? ["rgba(212,150,42,0.25)", "rgba(196,125,26,0.1)"] : ["rgba(74,126,232,0.12)", "rgba(74,126,232,0.04)"]}
                    style={styles.iconBg}
                  >
                    <Feather name={icon} size={18} color={isOpen ? colors.gold : colors.blue} />
                  </LinearGradient>

                  <View style={styles.cardTitleWrap}>
                    <Text style={[styles.cardTitle, { color: isViewed ? colors.text : colors.parchment }]}>
                      {item.title}
                    </Text>
                    {!isOpen && (
                      <Text style={styles.tapHint}>Tap to examine</Text>
                    )}
                  </View>

                  <View style={styles.cardRight}>
                    {isViewed && <Feather name="check-circle" size={13} color={colors.green} />}
                    <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={colors.textMuted} />
                  </View>
                </View>

                {isOpen && (
                  <View style={styles.expanded}>
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    <Text style={styles.description}>{item.description}</Text>
                    <LinearGradient
                      colors={["rgba(212,150,42,0.12)", "rgba(212,150,42,0.05)"]}
                      style={styles.lessonBox}
                    >
                      <View style={[styles.lessonBoxBorder, { borderColor: colors.goldBorder }]} />
                      <Feather name="book-open" size={13} color={colors.gold} />
                      <Text style={styles.lessonText}>{item.lesson}</Text>
                    </LinearGradient>
                  </View>
                )}
              </LinearGradient>
            </Pressable>
          );
        })}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Footer */}
      <LinearGradient
        colors={["rgba(7,10,19,0)", "rgba(7,10,19,0.97)", colors.bg]}
        style={styles.footer}
      >
        {!allViewed && (
          <Text style={styles.footerHint}>
            Examine all {evidence.length} items to continue
          </Text>
        )}
        <GoldButton
          label="Proceed to Witnesses"
          onPress={allViewed ? onContinue : () => {}}
          icon="arrow-right"
          disabled={!allViewed}
          size="lg"
          style={styles.btn}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  subHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  subHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  subHeaderAccent: { width: 3, height: 18, borderRadius: 2 },
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
  subHeaderHint: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginBottom: 8 },
  progressBar: {
    height: 3,
    backgroundColor: colors.surface3,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: { height: 3, borderRadius: 2 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  card: {
    borderRadius: colors.radius.lg,
    padding: 14,
    position: "relative",
    overflow: "hidden",
  },
  cardBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitleWrap: { flex: 1 },
  cardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  tapHint: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted, marginTop: 2 },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  expanded: { marginTop: 12 },
  divider: { height: 1, marginBottom: 12 },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
    lineHeight: 23,
    marginBottom: 12,
  },
  lessonBox: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderRadius: colors.radius.md,
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
  },
  lessonBoxBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  lessonText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: colors.gold,
    lineHeight: 20,
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footerHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 8,
  },
  btn: { width: "100%" },
});
