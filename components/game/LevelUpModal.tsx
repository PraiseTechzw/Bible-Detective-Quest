import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import { getRankForLevel } from "@/constants/ranks";
import { RankIcon } from "@/components/ui/SvgIcons";

interface Props {
  visible: boolean;
  level: number;
  onDismiss: () => void;
}

export default function LevelUpModal({ visible, level, onDismiss }: Props) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const starScale = useRef(new Animated.Value(0)).current;
  const crownBounce = useRef(new Animated.Value(0)).current;

  const rank = getRankForLevel(level);
  const prevRank = getRankForLevel(level - 1);
  const rankChanged = rank.title !== prevRank.title;

  useEffect(() => {
    if (!visible) {
      scale.setValue(0.6);
      opacity.setValue(0);
      bgOpacity.setValue(0);
      starScale.setValue(0);
      crownBounce.setValue(0);
      return;
    }
    Animated.parallel([
      Animated.timing(bgOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 55, friction: 7, delay: 80 }),
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true, delay: 80 }),
    ]).start(() => {
      Animated.spring(starScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 6, delay: 100 }).start();
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(crownBounce, { toValue: -8, duration: 700, useNativeDriver: true }),
          Animated.timing(crownBounce, { toValue: 0, duration: 700, useNativeDriver: true }),
        ])
      );
      loop.start();
    });
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent onRequestClose={onDismiss}>
      <Animated.View style={[styles.overlay, { opacity: bgOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <LinearGradient colors={[rank.gradTop, rank.gradBot, "#0A0A1A"]} style={styles.cardInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={[styles.cardBorder, { borderColor: rank.rimColor + "80" }]} />

            <Animated.View style={[styles.crownWrap, { transform: [{ translateY: crownBounce }] }]}>
              <LinearGradient colors={[rank.rimColor + "40", rank.rimColor + "10"]} style={styles.crownBg}>
                <RankIcon id={rank.svgIcon} size={44} color={rank.color} />
              </LinearGradient>
            </Animated.View>

            <Text style={styles.levelUpLabel}>LEVEL UP</Text>
            <Text style={[styles.levelNumber, { color: rank.color }]}>Level {level}</Text>

            {rankChanged ? (
              <View>
                <Text style={styles.newRankLabel}>NEW RANK UNLOCKED</Text>
                <View style={[styles.rankPill, { backgroundColor: rank.color + "20", borderColor: rank.color + "50" }]}>
                  <Text style={[styles.rankPillText, { color: rank.color }]}>{rank.title}</Text>
                </View>
                <Text style={styles.rankDesc} numberOfLines={2}>{rank.description}</Text>
              </View>
            ) : (
              <Text style={styles.progressLabel}>Climbing toward {rank.title}</Text>
            )}

            <View style={styles.perks}>
              {rank.perks.slice(0, 2).map((p, i) => (
                <View key={i} style={[styles.perk, { borderColor: rank.rimColor + "30" }]}>
                  <View style={[styles.perkDot, { backgroundColor: rank.color }]} />
                  <Text style={[styles.perkText, { color: rank.color }]}>{p}</Text>
                </View>
              ))}
            </View>

            <Pressable onPress={onDismiss} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
              <LinearGradient colors={[rank.rimColor, rank.color]} style={styles.dismissBtn}>
                <Text style={styles.dismissBtnText}>Continue Investigating</Text>
              </LinearGradient>
            </Pressable>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.75)", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { width: "100%", maxWidth: 360, borderRadius: 24, overflow: "hidden" },
  cardInner: { borderRadius: 24, padding: 28, alignItems: "center", gap: 12, position: "relative" },
  cardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5, borderRadius: 24 },
  crownWrap: { alignItems: "center" },
  crownBg: { width: 88, height: 88, borderRadius: 44, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.1)" },
  levelUpLabel: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold, letterSpacing: 4, marginTop: 4 },
  levelNumber: { fontFamily: "Inter_700Bold", fontSize: 48, lineHeight: 52, textShadowColor: "rgba(0,0,0,0.3)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },
  newRankLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 2, textAlign: "center", marginBottom: 8 },
  rankPill: { alignSelf: "center", borderWidth: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 },
  rankPillText: { fontFamily: "Inter_700Bold", fontSize: 14, letterSpacing: 0.3 },
  rankDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, textAlign: "center", lineHeight: 20, marginTop: 8 },
  progressLabel: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center" },
  perks: { width: "100%", gap: 6, marginTop: 4 },
  perk: { flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  perkDot: { width: 6, height: 6, borderRadius: 3 },
  perkText: { fontFamily: "Inter_400Regular", fontSize: 12, flex: 1 },
  dismissBtn: { borderRadius: 20, paddingVertical: 13, paddingHorizontal: 32, marginTop: 6 },
  dismissBtnText: { fontFamily: "Inter_700Bold", fontSize: 15, color: "#000" },
});
