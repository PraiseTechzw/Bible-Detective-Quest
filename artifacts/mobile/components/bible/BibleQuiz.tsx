import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/data/bibleTools";

type Difficulty = "all" | "easy" | "medium" | "hard";
type QuizState = "menu" | "question" | "result" | "summary";

interface Props { onBack: () => void; topPad: number; }

export default function BibleQuiz({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [state, setState] = useState<QuizState>("menu");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ q: QuizQuestion; chosen: number }[]>([]);
  const [showHint, setShowHint] = useState(false);

  const startQuiz = useCallback(() => {
    const pool = difficulty === "all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.difficulty === difficulty);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
    setQuestions(shuffled);
    setIdx(0); setSelected(null); setScore(0); setWrongAnswers([]); setShowHint(false);
    setState("question");
  }, [difficulty]);

  const handleAnswer = useCallback((optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const q = questions[idx];
    if (optIdx === q.answerIndex) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(w => [...w, { q, chosen: optIdx }]);
    }
    setState("result");
  }, [selected, questions, idx]);

  const next = useCallback(() => {
    if (idx + 1 >= questions.length) {
      setState("summary");
    } else {
      setIdx(i => i + 1); setSelected(null); setShowHint(false); setState("question");
    }
  }, [idx, questions.length]);

  const q = questions[idx];

  if (state === "menu") {
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: topPad + 8 }]}>
          <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>TOOLS</Text>
            <Text style={styles.headerTitle}>Bible Quiz</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={[styles.menuScroll, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
          <Text style={styles.menuSubtitle}>Test your knowledge of Scripture with {QUIZ_QUESTIONS.length} questions across three difficulty levels.</Text>
          <Text style={styles.sectionLabel}>Difficulty</Text>
          {(["all", "easy", "medium", "hard"] as const).map(d => (
            <Pressable key={d} onPress={() => setDifficulty(d)} style={[styles.diffBtn, difficulty === d && styles.diffBtnActive]}>
              <Text style={styles.diffIcon}>{d === "easy" ? "🟢" : d === "medium" ? "🟡" : d === "hard" ? "🔴" : "🎯"}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.diffLabel, { color: difficulty === d ? colors.gold : colors.text }]}>
                  {d === "all" ? "All Questions" : d.charAt(0).toUpperCase() + d.slice(1)}
                </Text>
                <Text style={styles.diffCount}>
                  {d === "all" ? QUIZ_QUESTIONS.length : QUIZ_QUESTIONS.filter(q => q.difficulty === d).length} questions
                </Text>
              </View>
              {difficulty === d && <Text style={{ color: colors.gold }}>✓</Text>}
            </Pressable>
          ))}
          <Pressable onPress={startQuiz} style={styles.startBtn}>
            <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.startBtnInner}>
              <Text style={styles.startBtnText}>Start Quiz →</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  if (state === "summary") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: topPad + 8 }]}>
          <Pressable onPress={() => setState("menu")} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>QUIZ RESULTS</Text>
            <Text style={styles.headerTitle}>Complete!</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={[styles.menuScroll, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
          <LinearGradient colors={["rgba(212,150,42,0.15)", "rgba(212,150,42,0.04)"]} style={styles.scoreCard}>
            <Text style={styles.scoreBig}>{score}/{questions.length}</Text>
            <Text style={styles.scorePct}>{pct}%</Text>
            <Text style={styles.scoreMsg}>{pct >= 80 ? "Excellent! Scripture master!" : pct >= 60 ? "Good job! Keep studying." : "Keep reading — you'll get there!"}</Text>
          </LinearGradient>
          {wrongAnswers.length > 0 && (
            <>
              <Text style={styles.sectionLabel}>Review Wrong Answers</Text>
              {wrongAnswers.map(({ q, chosen }, i) => (
                <View key={i} style={styles.reviewCard}>
                  <Text style={styles.reviewQ}>{q.question}</Text>
                  <Text style={styles.reviewCorrect}>✓ {q.options[q.answerIndex]}</Text>
                  <Text style={styles.reviewWrong}>✕ Your answer: {q.options[chosen]}</Text>
                  <Text style={styles.reviewRef}>{q.reference}</Text>
                </View>
              ))}
            </>
          )}
          <Pressable onPress={startQuiz} style={styles.startBtn}>
            <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.startBtnInner}>
              <Text style={styles.startBtnText}>Play Again →</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => setState("menu")} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>BIBLE QUIZ · {idx + 1}/{questions.length}</Text>
          <Text style={styles.headerTitle}>Score: {score}</Text>
        </View>
        <View style={[styles.diffPip, { backgroundColor: q?.difficulty === "easy" ? colors.greenGlow : q?.difficulty === "medium" ? "rgba(245,166,35,0.2)" : colors.redGlow }]}>
          <Text style={[styles.diffPipText, { color: q?.difficulty === "easy" ? colors.green : q?.difficulty === "medium" ? colors.amber : colors.red }]}>{q?.difficulty}</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((idx + 1) / questions.length) * 100}%` as any }]} />
      </View>

      <ScrollView contentContainerStyle={[styles.qScroll, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        <Text style={styles.questionText}>{q?.question}</Text>

        {q?.options.map((opt, i) => {
          let bg = colors.surface2;
          let border = colors.border;
          let textColor = colors.text;
          if (selected !== null) {
            if (i === q.answerIndex) { bg = "rgba(46,204,142,0.2)"; border = colors.green; textColor = colors.green; }
            else if (i === selected && selected !== q.answerIndex) { bg = "rgba(232,64,64,0.15)"; border = colors.red; textColor = colors.red; }
          }
          return (
            <Pressable key={i} onPress={() => handleAnswer(i)} style={[styles.optionBtn, { backgroundColor: bg, borderColor: border }]}>
              <View style={styles.optionLeft}>
                <View style={[styles.optionLetter, { borderColor: border }]}>
                  <Text style={[styles.optionLetterText, { color: textColor }]}>{["A", "B", "C", "D"][i]}</Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
              </View>
              {selected !== null && i === q.answerIndex && <Text style={{ fontSize: 16 }}>✓</Text>}
              {selected !== null && i === selected && selected !== q.answerIndex && <Text style={{ fontSize: 16 }}>✕</Text>}
            </Pressable>
          );
        })}

        {state === "result" && (
          <View style={styles.feedbackRow}>
            {selected !== q?.answerIndex && (
              <>
                <Text style={styles.feedbackRef}>Reference: {q?.reference}</Text>
                {showHint && <Text style={styles.hintText}>💡 {q?.hint}</Text>}
                {!showHint && <Pressable onPress={() => setShowHint(true)}><Text style={styles.hintBtn}>Show hint</Text></Pressable>}
              </>
            )}
            <Pressable onPress={next} style={styles.nextBtn}>
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.nextBtnInner}>
                <Text style={styles.nextBtnText}>{idx + 1 >= questions.length ? "See Results" : "Next Question"} →</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
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
  progressBar: { height: 3, backgroundColor: colors.surface3, marginHorizontal: 16, borderRadius: 2, marginBottom: 16, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.gold, borderRadius: 2 },
  menuScroll: { paddingHorizontal: 16, paddingTop: 8 },
  menuSubtitle: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, lineHeight: 22, marginBottom: 20 },
  sectionLabel: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text, marginBottom: 10 },
  diffBtn: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  diffBtnActive: { borderColor: colors.gold, backgroundColor: colors.goldGlow },
  diffIcon: { fontSize: 22 },
  diffLabel: { fontFamily: "Inter_700Bold", fontSize: 14 },
  diffCount: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textFaint, marginTop: 2 },
  startBtn: { marginTop: 16 },
  startBtnInner: { borderRadius: colors.radius.md, paddingVertical: 14, alignItems: "center" },
  startBtnText: { fontFamily: "Inter_700Bold", fontSize: 15, color: "#000" },
  qScroll: { paddingHorizontal: 16, paddingTop: 4 },
  questionText: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text, lineHeight: 28, marginBottom: 20 },
  optionBtn: { borderRadius: colors.radius.md, padding: 14, marginBottom: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  optionLetter: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  optionLetterText: { fontFamily: "Inter_700Bold", fontSize: 13 },
  optionText: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 20 },
  feedbackRow: { marginTop: 8, gap: 8 },
  feedbackRef: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.textMuted },
  hintBtn: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.blue },
  hintText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, fontStyle: "italic" },
  nextBtn: { marginTop: 8 },
  nextBtnInner: { borderRadius: colors.radius.md, paddingVertical: 13, alignItems: "center" },
  nextBtnText: { fontFamily: "Inter_700Bold", fontSize: 14, color: "#000" },
  diffPip: { borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  diffPipText: { fontFamily: "Inter_600SemiBold", fontSize: 10, textTransform: "capitalize" },
  scoreCard: { borderRadius: colors.radius.lg, padding: 28, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: colors.goldBorder, gap: 8 },
  scoreBig: { fontFamily: "Inter_700Bold", fontSize: 52, color: colors.gold },
  scorePct: { fontFamily: "Inter_600SemiBold", fontSize: 24, color: colors.text },
  scoreMsg: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center" },
  reviewCard: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: colors.border, gap: 4 },
  reviewQ: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text },
  reviewCorrect: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.green },
  reviewWrong: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.red },
  reviewRef: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint },
});
