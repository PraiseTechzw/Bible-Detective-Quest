import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { Case } from "@/data/cases";

interface Props {
  caseData: Case;
  onContinue: () => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: "#22C55E",
  Intermediate: "#F59E0B",
  Advanced: "#EF4444",
};

export default function IntroScreen({ caseData, onContinue }: Props) {
  const c = colors.light;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const diffColor = DIFFICULTY_COLOR[caseData.difficulty] ?? c.primary;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={[styles.caseFileBanner, { backgroundColor: `${c.gold}12`, borderColor: `${c.gold}40` }]}>
            <View style={styles.bannerRow}>
              <Feather name="folder" size={16} color={c.gold} />
              <Text style={[styles.caseNumberText, { color: c.gold }]}>{caseData.caseNumber}</Text>
            </View>
            <Text style={[styles.caseTitleLarge, { color: c.foreground }]}>{caseData.title}</Text>
            <Text style={[styles.bibleRef, { color: c.mutedForeground }]}>{caseData.bibleReference}</Text>

            <View style={styles.metaRow}>
              <View style={[styles.metaBadge, { backgroundColor: `${diffColor}20`, borderColor: diffColor }]}>
                <Text style={[styles.metaBadgeText, { color: diffColor }]}>{caseData.difficulty}</Text>
              </View>
              <View style={[styles.metaBadge, { backgroundColor: c.muted, borderColor: c.border }]}>
                <Feather name="user-x" size={10} color={c.mutedForeground} />
                <Text style={[styles.metaBadgeText, { color: c.mutedForeground }]}>Victim: {caseData.victim}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.introBox, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.introLabel, { color: c.gold }]}>CASE INTRODUCTION</Text>
            <Text style={[styles.introText, { color: c.foreground }]}>{caseData.introduction}</Text>
          </View>

          <View style={[styles.fileCard, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.fileCardTitle, { color: c.mutedForeground }]}>CASE FILE OVERVIEW</Text>
            <View style={styles.fileRow}>
              <Feather name="users" size={14} color={c.gold} />
              <Text style={[styles.fileLabel, { color: c.mutedForeground }]}>Suspects</Text>
              <Text style={[styles.fileValue, { color: c.foreground }]}>{caseData.suspects.join(", ")}</Text>
            </View>
            <View style={styles.fileRow}>
              <Feather name="search" size={14} color={c.gold} />
              <Text style={[styles.fileLabel, { color: c.mutedForeground }]}>Evidence Items</Text>
              <Text style={[styles.fileValue, { color: c.foreground }]}>{caseData.evidence.length}</Text>
            </View>
            <View style={styles.fileRow}>
              <Feather name="mic" size={14} color={c.gold} />
              <Text style={[styles.fileLabel, { color: c.mutedForeground }]}>Witnesses</Text>
              <Text style={[styles.fileValue, { color: c.foreground }]}>{caseData.witnesses.length}</Text>
            </View>
            <View style={styles.fileRow}>
              <Feather name="zap" size={14} color={c.gold} />
              <Text style={[styles.fileLabel, { color: c.mutedForeground }]}>XP Reward</Text>
              <Text style={[styles.fileValue, { color: c.gold }]}>{caseData.rewards.xp} XP</Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </Animated.View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: c.border, backgroundColor: c.background }]}>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [styles.beginBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1 }]}
        >
          <Feather name="search" size={18} color={c.primaryForeground} />
          <Text style={[styles.beginBtnText, { color: c.primaryForeground }]}>Begin Investigation</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  caseFileBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginTop: 16,
    marginBottom: 14,
    gap: 6,
  },
  bannerRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  caseNumberText: { fontFamily: "Inter_600SemiBold", fontSize: 11, letterSpacing: 1.5 },
  caseTitleLarge: { fontFamily: "Inter_700Bold", fontSize: 26 },
  bibleRef: { fontFamily: "Inter_400Regular", fontSize: 14 },
  metaRow: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 8 },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  metaBadgeText: { fontFamily: "Inter_500Medium", fontSize: 12 },
  introBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    gap: 8,
  },
  introLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.5 },
  introText: { fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 26 },
  fileCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  fileCardTitle: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.5, marginBottom: 2 },
  fileRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  fileLabel: { fontFamily: "Inter_400Regular", fontSize: 13, flex: 1 },
  fileValue: { fontFamily: "Inter_500Medium", fontSize: 13, textAlign: "right", flex: 2 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  beginBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
  },
  beginBtnText: { fontFamily: "Inter_700Bold", fontSize: 16 },
});
