import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { CASES } from "@/data/cases";
import { BIBLE_BOOKS } from "@/data/bibleBooks";
import GoldButton from "@/components/ui/GoldButton";
import { useGame } from "@/context/GameContext";
import { IconArrowLeft, IconCheckCircle, IconLock, IconSparkles } from "@/components/ui/SvgIcons";

type StoryQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  ref: string;
};

const QUESTIONS: StoryQuestion[] = [
  {
    id: "q1",
    prompt: "How many books are in the Bible?",
    options: ["60", "66", "72", "39"],
    answer: 1,
    ref: "Bible structure",
  },
  {
    id: "q2",
    prompt: "How many books are in the Old Testament?",
    options: ["27", "33", "39", "40"],
    answer: 2,
    ref: "Bible structure",
  },
  {
    id: "q3",
    prompt: "How many books are in the New Testament?",
    options: ["12", "24", "27", "29"],
    answer: 2,
    ref: "Bible structure",
  },
  {
    id: "q4",
    prompt: "Which book opens the Bible?",
    options: ["Genesis", "Exodus", "Psalms", "Matthew"],
    answer: 0,
    ref: "Genesis 1:1",
  },
  {
    id: "q5",
    prompt: "Which book closes the Bible?",
    options: ["Jude", "Revelation", "Malachi", "John"],
    answer: 1,
    ref: "Revelation 22",
  },
  {
    id: "q6",
    prompt: "Which section contains the Gospels?",
    options: ["Law", "History", "Poetry", "New Testament"],
    answer: 3,
    ref: "The Gospels",
  },
];

export default function StoryScreen() {
  const insets = useSafeAreaInsets();
  const { solvedCases } = useGame();
  const unlocked = solvedCases.length >= CASES.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[index];
  const bibleStats = useMemo(() => {
    const ot = BIBLE_BOOKS.filter((b) => b.testament === "OT").length;
    const nt = BIBLE_BOOKS.filter((b) => b.testament === "NT").length;
    return { total: BIBLE_BOOKS.length, ot, nt };
  }, []);

  const submit = () => {
    if (selected == null || finished) return;
    const nextCorrect = correctCount + (selected === current.answer ? 1 : 0);
    if (index >= QUESTIONS.length - 1) {
      setCorrectCount(nextCorrect);
      setFinished(true);
      return;
    }
    setCorrectCount(nextCorrect);
    setIndex((p) => p + 1);
    setSelected(null);
  };

  if (!unlocked) {
    return (
      <View style={styles.root}>
        <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <IconArrowLeft size={18} color={colors.textMuted} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text style={styles.kicker}>UNLOCK STORY MODE</Text>
            <Text style={styles.title}>Bible Chronicle</Text>
          </View>
        </View>

        <View style={styles.lockPanel}>
          <LinearGradient colors={["rgba(212,150,42,0.14)", "rgba(255,255,255,0.02)"]} style={styles.lockCard}>
            <View style={[styles.lockBadge, { borderColor: colors.goldBorder }]}>
              <IconLock size={20} color={colors.gold} />
            </View>
            <Text style={styles.lockTitle}>Finish all 6 cases first</Text>
            <Text style={styles.lockText}>
              Story Mode becomes available after you solve every detective case. Then you unlock the full Bible Chronicle journey.
            </Text>
            <View style={styles.lockStats}>
              <Stat label="Solved" value={`${solvedCases.length}/${CASES.length}`} />
              <Stat label="Books" value={`${bibleStats.total}`} />
              <Stat label="OT / NT" value={`${bibleStats.ot}/${bibleStats.nt}`} />
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={styles.root}>
        <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <IconArrowLeft size={18} color={colors.textMuted} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text style={styles.kicker}>STORY COMPLETE</Text>
            <Text style={styles.title}>Bible Chronicle</Text>
          </View>
        </View>

        <View style={styles.finishWrap}>
          <LinearGradient colors={["rgba(46,204,142,0.18)", "rgba(46,204,142,0.05)"]} style={styles.finishIcon}>
            <IconCheckCircle size={44} color={colors.green} />
          </LinearGradient>
          <Text style={styles.finishTitle}>You completed the chronicle</Text>
          <Text style={styles.finishText}>
            The whole Bible arc is now open to you. You answered {correctCount}/{QUESTIONS.length} questions correctly.
          </Text>
          <GoldButton label="Return to Play" onPress={() => router.push("/(tabs)/play" as any)} icon="arrow-right" size="lg" style={styles.finishBtn} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", "#070A13"]} style={StyleSheet.absoluteFill} />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <IconArrowLeft size={18} color={colors.textMuted} />
        </Pressable>
        <View style={styles.headerTextWrap}>
          <Text style={styles.kicker}>STORY MODE</Text>
          <Text style={styles.title}>Bible Chronicle</Text>
        </View>
        <View style={styles.progressChip}>
          <Text style={styles.progressText}>{index + 1}/{QUESTIONS.length}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: (insets.bottom || 0) + 24 }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["rgba(212,150,42,0.12)", "rgba(255,255,255,0.03)"]} style={styles.hero}>
          <View style={[styles.heroBorder, { borderColor: colors.goldBorder }]} />
          <IconSparkles size={24} color={colors.gold} />
          <Text style={styles.heroTitle}>The full 66-book journey</Text>
          <Text style={styles.heroText}>
            Story Mode is a separate Bible chronicle challenge. It tracks the whole Bible story from Genesis to Revelation.
          </Text>
        </LinearGradient>

        <View style={styles.statsRow}>
          <Stat label="Books" value={`${bibleStats.total}`} />
          <Stat label="OT" value={`${bibleStats.ot}`} />
          <Stat label="NT" value={`${bibleStats.nt}`} />
        </View>

        <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.questionCard}>
          <View style={[styles.questionBorder, { borderColor: colors.border }]} />
          <Text style={styles.questionRef}>{current.ref}</Text>
          <Text style={styles.questionPrompt}>{current.prompt}</Text>
          <View style={styles.options}>
            {current.options.map((opt, optIdx) => {
              const active = selected === optIdx;
              return (
                <Pressable key={opt} onPress={() => setSelected(optIdx)} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
                  <LinearGradient
                    colors={active ? ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.06)"] : ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]}
                    style={[styles.option, { borderColor: active ? colors.goldBorder : colors.border }]}
                  >
                    <View style={[styles.optionDot, { borderColor: active ? colors.gold : colors.border }]} />
                    <Text style={[styles.optionText, { color: active ? colors.gold : colors.text }]}>{opt}</Text>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
          <GoldButton
            label={index === QUESTIONS.length - 1 ? "Finish Chronicle" : "Next Question"}
            onPress={submit}
            disabled={selected == null}
            icon="arrow-right"
            size="lg"
            style={styles.cta}
          />
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTextWrap: { flex: 1, alignItems: "center" },
  kicker: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 2 },
  title: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.text },
  progressChip: {
    backgroundColor: colors.surface3,
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressText: { fontFamily: "Inter_700Bold", fontSize: 11, color: colors.textMuted },
  hero: {
    borderRadius: colors.radius.lg,
    padding: 16,
    marginBottom: 12,
    position: "relative",
    overflow: "hidden",
    gap: 8,
  },
  heroBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  heroTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text },
  heroText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  statCard: {
    flex: 1,
    borderRadius: colors.radius.md,
    padding: 12,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  statValue: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text },
  statLabel: { fontFamily: "Inter_500Medium", fontSize: 10, color: colors.textMuted, marginTop: 2 },
  questionCard: {
    borderRadius: colors.radius.lg,
    padding: 16,
    position: "relative",
    overflow: "hidden",
    gap: 12,
  },
  questionBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  questionRef: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.gold, letterSpacing: 1.5, textTransform: "uppercase" },
  questionPrompt: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text, lineHeight: 26 },
  options: { gap: 8 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: colors.radius.md,
    borderWidth: 1,
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.2,
  },
  optionText: { fontFamily: "Inter_500Medium", fontSize: 14, flex: 1 },
  cta: { marginTop: 4 },
  lockPanel: { flex: 1, padding: 16, justifyContent: "center" },
  lockCard: {
    borderRadius: colors.radius.lg,
    padding: 18,
    position: "relative",
    overflow: "hidden",
    gap: 12,
  },
  lockBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(212,150,42,0.12)",
    borderWidth: 1,
  },
  lockTitle: { fontFamily: "Inter_700Bold", fontSize: 20, color: colors.text },
  lockText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  lockStats: { flexDirection: "row", gap: 8 },
  finishWrap: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center", gap: 14 },
  finishIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(46,204,142,0.4)",
  },
  finishTitle: { fontFamily: "Inter_700Bold", fontSize: 24, color: colors.text, textAlign: "center" },
  finishText: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center", lineHeight: 22 },
  finishBtn: { width: "100%", marginTop: 6 },
});
