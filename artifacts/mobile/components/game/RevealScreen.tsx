import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { Case } from "@/data/cases";

interface Props {
  caseData: Case;
  onFinish: () => void;
}

export default function RevealScreen({ caseData, onFinish }: Props) {
  const c = colors.light;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={[styles.headerBanner, { backgroundColor: `${c.gold}15`, borderColor: `${c.gold}40` }]}>
          <Feather name="book-open" size={28} color={c.gold} />
          <Text style={[styles.bannerTitle, { color: c.gold }]}>Case Revealed</Text>
          <Text style={[styles.bannerRef, { color: c.mutedForeground }]}>{caseData.bibleReference}</Text>
        </View>

        <Text style={[styles.revealText, { color: c.foreground }]}>{caseData.revealText}</Text>

        <View style={[styles.verseBox, { backgroundColor: "#1E1A0E", borderColor: c.gold }]}>
          <Feather name="bookmark" size={16} color={c.gold} />
          <Text style={[styles.verseText, { color: c.parchment }]}>{caseData.revealVerse}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.gold }]}>Detective Lessons</Text>
          {caseData.lessons.map((lesson, i) => (
            <View key={i} style={[styles.lessonCard, { backgroundColor: c.card, borderColor: c.border }]}>
              <View style={[styles.lessonTypeBadge, { backgroundColor: `${c.gold}20` }]}>
                <Text style={[styles.lessonType, { color: c.gold }]}>{lesson.type.toUpperCase()}</Text>
              </View>
              <Text style={[styles.lessonText, { color: c.foreground }]}>{lesson.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.gold }]}>Reflection Questions</Text>
          {caseData.reflectionQuestions.map((q, i) => (
            <View key={i} style={[styles.reflectionCard, { backgroundColor: c.card, borderColor: c.border }]}>
              <Text style={[styles.reflectionNum, { color: c.gold }]}>{i + 1}</Text>
              <Text style={[styles.reflectionText, { color: c.foreground }]}>{q}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.rewardsBox, { backgroundColor: "#1A2A1A", borderColor: "#22C55E50" }]}>
          <Text style={[styles.rewardsTitle, { color: "#22C55E" }]}>Case Rewards Earned</Text>
          <View style={styles.rewardsGrid}>
            <View style={styles.rewardItem}>
              <Feather name="zap" size={20} color={c.gold} />
              <Text style={[styles.rewardVal, { color: c.foreground }]}>{caseData.rewards.xp}</Text>
              <Text style={[styles.rewardLabel, { color: c.mutedForeground }]}>XP</Text>
            </View>
            <View style={styles.rewardItem}>
              <Feather name="circle" size={20} color="#F59E0B" />
              <Text style={[styles.rewardVal, { color: c.foreground }]}>{caseData.rewards.coins}</Text>
              <Text style={[styles.rewardLabel, { color: c.mutedForeground }]}>Coins</Text>
            </View>
            <View style={styles.rewardItem}>
              <Feather name="award" size={20} color={c.gold} />
              <Text style={[styles.rewardVal, { color: c.foreground }]} numberOfLines={2}>
                {caseData.rewards.badge}
              </Text>
              <Text style={[styles.rewardLabel, { color: c.mutedForeground }]}>Badge</Text>
            </View>
            <View style={styles.rewardItem}>
              <Feather name="trending-up" size={20} color="#22C55E" />
              <Text style={[styles.rewardVal, { color: c.foreground }]}>+{caseData.rewards.rankProgress}%</Text>
              <Text style={[styles.rewardLabel, { color: c.mutedForeground }]}>Rank</Text>
            </View>
          </View>
        </View>

        <View style={[styles.closingBox, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.closingText, { color: c.mutedForeground }]}>{caseData.closingText}</Text>
          {caseData.nextCaseTitle && (
            <View style={styles.nextCaseRow}>
              <Feather name="chevron-right" size={14} color={c.gold} />
              <Text style={[styles.nextCaseText, { color: c.gold }]}>
                Next: {caseData.nextCaseTitle}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={onFinish}
          style={({ pressed }) => [styles.finishBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1 }]}
        >
          <Feather name="home" size={16} color={c.primaryForeground} />
          <Text style={[styles.finishBtnText, { color: c.primaryForeground }]}>Return to Case Files</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 20, gap: 16 },
  headerBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    gap: 6,
  },
  bannerTitle: { fontFamily: "Inter_700Bold", fontSize: 22 },
  bannerRef: { fontFamily: "Inter_400Regular", fontSize: 14 },
  revealText: { fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 26 },
  verseBox: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: "flex-start",
    borderLeftWidth: 3,
  },
  verseText: { fontFamily: "Inter_400Regular", fontSize: 14, fontStyle: "italic", lineHeight: 22, flex: 1 },
  section: { gap: 8 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 18, marginBottom: 2 },
  lessonCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  lessonTypeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  lessonType: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1 },
  lessonText: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22 },
  reflectionCard: {
    flexDirection: "row",
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: "flex-start",
  },
  reflectionNum: { fontFamily: "Inter_700Bold", fontSize: 18, minWidth: 20 },
  reflectionText: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22, flex: 1 },
  rewardsBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  rewardsTitle: { fontFamily: "Inter_700Bold", fontSize: 16, textAlign: "center" },
  rewardsGrid: { flexDirection: "row", justifyContent: "space-around" },
  rewardItem: { alignItems: "center", gap: 4, flex: 1 },
  rewardVal: { fontFamily: "Inter_700Bold", fontSize: 15, textAlign: "center" },
  rewardLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  closingBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  closingText: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22, fontStyle: "italic", textAlign: "center" },
  nextCaseRow: { flexDirection: "row", alignItems: "center", gap: 4, justifyContent: "center" },
  nextCaseText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  finishBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
  },
  finishBtnText: { fontFamily: "Inter_700Bold", fontSize: 16 },
});
