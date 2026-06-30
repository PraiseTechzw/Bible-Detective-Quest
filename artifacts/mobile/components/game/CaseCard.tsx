import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { Case } from "@/data/cases";

interface Props {
  caseData: Case;
  solved: boolean;
  locked: boolean;
  onPress: () => void;
  entranceDelay?: number;
}

type DiffKey = "Beginner" | "Intermediate" | "Advanced";
const DIFF: Record<DiffKey, { color: string; bg: string; border: string }> = {
  Beginner: { color: colors.green, bg: "rgba(46,204,142,0.12)", border: "rgba(46,204,142,0.35)" },
  Intermediate: { color: colors.amber, bg: "rgba(245,166,35,0.12)", border: "rgba(245,166,35,0.35)" },
  Advanced: { color: colors.red, bg: "rgba(232,64,64,0.12)", border: "rgba(232,64,64,0.35)" },
};

export default function CaseCard({ caseData, solved, locked, onPress, entranceDelay = 0 }: Props) {
  const diff = DIFF[caseData.difficulty as DiffKey] ?? DIFF.Beginner;
  const leftColor = locked ? colors.textFaint : solved ? colors.green : colors.gold;

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-20)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, delay: entranceDelay, useNativeDriver: true }),
      Animated.spring(translateX, { toValue: 0, delay: entranceDelay, useNativeDriver: true, tension: 70, friction: 12 }),
    ]).start();
  }, []);

  const onPressIn = () => {
    if (locked) return;
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, tension: 200, friction: 10 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 100, friction: 8 }).start();
  };

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }, { scale }], marginHorizontal: 16, marginBottom: 12 }}>
      <Pressable
        onPress={locked ? undefined : onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ opacity: locked ? 0.45 : 1 }}
      >
        <LinearGradient
          colors={locked ? ["#0E1322", "#0A0E1A"] : solved ? ["#131F18", "#0B1510"] : ["#1A1E30", "#0E1220"]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.leftBar, { backgroundColor: leftColor }]} />
          <View style={styles.inner}>
            <View style={styles.topRow}>
              <View style={[styles.caseNumBadge, { borderColor: colors.goldBorder }]}>
                <Text style={[styles.caseNum, { color: colors.gold }]}>{caseData.caseNumber}</Text>
              </View>
              <View style={styles.statusRow}>
                {solved && (
                  <View style={[styles.statusChip, { backgroundColor: "rgba(46,204,142,0.15)", borderColor: "rgba(46,204,142,0.4)" }]}>
                    <Feather name="check-circle" size={10} color={colors.green} />
                    <Text style={[styles.statusText, { color: colors.green }]}>SOLVED</Text>
                  </View>
                )}
                {locked && (
                  <View style={[styles.statusChip, { backgroundColor: "rgba(122,133,163,0.1)", borderColor: colors.border }]}>
                    <Feather name="lock" size={10} color={colors.textMuted} />
                    <Text style={[styles.statusText, { color: colors.textMuted }]}>LOCKED</Text>
                  </View>
                )}
                {!solved && !locked && (
                  <View style={[styles.statusChip, { backgroundColor: "rgba(212,150,42,0.12)", borderColor: colors.goldBorder }]}>
                    <Feather name="circle" size={10} color={colors.gold} />
                    <Text style={[styles.statusText, { color: colors.gold }]}>OPEN</Text>
                  </View>
                )}
              </View>
            </View>
            <Text style={styles.title}>{caseData.title}</Text>
            <Text style={styles.ref}>{caseData.bibleReference}</Text>
            <View style={styles.bottomRow}>
              <View style={[styles.diffChip, { backgroundColor: diff.bg, borderColor: diff.border }]}>
                <Text style={[styles.diffText, { color: diff.color }]}>{caseData.difficulty}</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="user-x" size={10} color={colors.textMuted} />
                <Text style={styles.metaText}>{caseData.victim}</Text>
              </View>
              <View style={styles.xpChip}>
                <Feather name="zap" size={11} color={colors.gold} />
                <Text style={styles.xpText}>{caseData.rewards.xp} XP</Text>
              </View>
            </View>
          </View>
          {!locked && (
            <View style={styles.arrowWrap}>
              <LinearGradient colors={["rgba(212,150,42,0.2)", "rgba(212,150,42,0.05)"]} style={styles.arrowBg}>
                <Feather name="chevron-right" size={18} color={colors.gold} />
              </LinearGradient>
            </View>
          )}
          <View style={[styles.border, { borderColor: locked ? colors.border : solved ? "rgba(46,204,142,0.2)" : colors.goldBorder }]} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: colors.radius.lg, flexDirection: "row", alignItems: "stretch", overflow: "hidden", position: "relative" },
  leftBar: { width: 3 },
  inner: { flex: 1, padding: 16, gap: 6 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  caseNumBadge: { borderWidth: 1, borderRadius: colors.radius.sm, paddingHorizontal: 7, paddingVertical: 2 },
  caseNum: { fontFamily: "Inter_600SemiBold", fontSize: 9, letterSpacing: 1.5 },
  statusRow: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
  statusChip: { flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 7, paddingVertical: 2 },
  statusText: { fontFamily: "Inter_600SemiBold", fontSize: 9, letterSpacing: 1 },
  title: { fontFamily: "Inter_700Bold", fontSize: 19, color: colors.text, lineHeight: 24 },
  ref: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted },
  bottomRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" },
  diffChip: { borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  diffText: { fontFamily: "Inter_600SemiBold", fontSize: 10 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  xpChip: { flexDirection: "row", alignItems: "center", gap: 3, marginLeft: "auto" },
  xpText: { fontFamily: "Inter_700Bold", fontSize: 12, color: colors.gold },
  arrowWrap: { justifyContent: "center", paddingRight: 12 },
  arrowBg: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  border: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg, pointerEvents: "none" } as any,
});
