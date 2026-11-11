import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { TOPICS } from "@/data/bibleTools";

interface Props { onBack: () => void; topPad: number; }

const TOPIC_COLORS = [colors.gold, colors.blue, colors.red, colors.purple, colors.green, colors.amber, colors.gold, colors.red, colors.blue, colors.purple, colors.green, colors.amber];

export default function BibleTopics({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topic = selectedTopic ? TOPICS.find(t => t.id === selectedTopic) : null;

  if (topic) {
    const topicColor = TOPIC_COLORS[TOPICS.findIndex(t => t.id === topic.id) % TOPIC_COLORS.length];
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: topPad + 8 }]}>
          <Pressable onPress={() => setSelectedTopic(null)} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>TOPICAL BIBLE</Text>
            <Text style={styles.headerTitle}>{topic.icon} {topic.name}</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
          <LinearGradient colors={[topicColor + "14", topicColor + "05"]} style={[styles.topicHero, { borderColor: topicColor + "40" }]}>
            <Text style={styles.topicHeroEmoji}>{topic.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.topicHeroName, { color: topicColor }]}>{topic.name}</Text>
              <Text style={styles.topicHeroDesc}>{topic.desc}</Text>
            </View>
          </LinearGradient>

          <View style={styles.versesHeader}>
            <View style={[styles.sectionAccent, { backgroundColor: topicColor }]} />
            <Text style={styles.versesTitle}>Key Verses</Text>
            <Text style={styles.versesCount}>{topic.verses.length} verses</Text>
          </View>

          {topic.verses.map((v, i) => (
            <LinearGradient key={i} colors={[colors.surface2, colors.surface1]} style={styles.verseCard}>
              <View style={[styles.verseCardBorder, { borderColor: topicColor + "30" }]} />
              <Text style={[styles.verseRef, { color: topicColor }]}>{v.ref}</Text>
              <Text style={styles.verseText}>{v.text}</Text>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE TOOLS</Text>
          <Text style={styles.headerTitle}>Topical Bible</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{TOPICS.length} topics</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.grid, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        <View style={styles.introBox}>
          <Text style={styles.introText}>Browse verses by topic. Each collection links key Scriptures on a theme — helpful for study, devotion, or sermon prep.</Text>
        </View>
        {TOPICS.map((t, i) => {
          const tc = TOPIC_COLORS[i % TOPIC_COLORS.length];
          return (
            <Pressable key={t.id} onPress={() => setSelectedTopic(t.id)} style={({ pressed }) => [styles.cardWrap, { opacity: pressed ? 0.8 : 1 }]}>
              <LinearGradient colors={[tc + "14", tc + "06"]} style={[styles.topicCard, { borderColor: tc + "40" }]}>
                <Text style={styles.topicEmoji}>{t.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.topicName, { color: tc }]}>{t.name}</Text>
                  <Text style={styles.topicDesc} numberOfLines={2}>{t.desc}</Text>
                </View>
                <View style={[styles.verseCount, { backgroundColor: tc + "20", borderColor: tc + "40" }]}>
                  <Text style={[styles.verseCountText, { color: tc }]}>{t.verses.length}v</Text>
                </View>
              </LinearGradient>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10, gap: 10 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  backIcon: { color: colors.textMuted, fontSize: 16, lineHeight: 20 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5 },
  headerTitle: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  countBadge: { backgroundColor: colors.surface2, borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.border },
  countText: { fontFamily: "Inter_500Medium", fontSize: 11, color: colors.textMuted },
  grid: { paddingHorizontal: 14, paddingTop: 4, gap: 8 },
  introBox: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, marginBottom: 4, borderWidth: 1, borderColor: colors.border },
  introText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  cardWrap: {},
  topicCard: { borderRadius: colors.radius.md, padding: 14, borderWidth: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  topicEmoji: { fontSize: 26 },
  topicName: { fontFamily: "Inter_700Bold", fontSize: 15 },
  topicDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18, marginTop: 2 },
  verseCount: { borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1 },
  verseCountText: { fontFamily: "Inter_700Bold", fontSize: 11 },
  list: { paddingHorizontal: 16, paddingTop: 4 },
  topicHero: { flexDirection: "row", borderRadius: colors.radius.lg, padding: 16, gap: 12, borderWidth: 1, marginBottom: 18, alignItems: "center" },
  topicHeroEmoji: { fontSize: 40 },
  topicHeroName: { fontFamily: "Inter_700Bold", fontSize: 20, marginBottom: 4 },
  topicHeroDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  versesHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionAccent: { width: 3, height: 16, borderRadius: 2 },
  versesTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text, flex: 1 },
  versesCount: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted },
  verseCard: { borderRadius: colors.radius.md, padding: 14, marginBottom: 8, gap: 6, position: "relative", overflow: "hidden" },
  verseCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  verseRef: { fontFamily: "Inter_700Bold", fontSize: 13 },
  verseText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, lineHeight: 24, fontStyle: "italic" },
});
