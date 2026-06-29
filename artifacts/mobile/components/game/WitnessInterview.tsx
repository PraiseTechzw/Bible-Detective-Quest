import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { Witness } from "@/data/cases";

interface Props {
  witnesses: Witness[];
  onContinue: () => void;
}

export default function WitnessInterview({ witnesses, onContinue }: Props) {
  const c = colors.light;
  const [activeWitness, setActiveWitness] = useState(0);
  const [questionPhase, setQuestionPhase] = useState<"statement" | "questions">("statement");
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [allDone, setAllDone] = useState(false);

  const witness = witnesses[activeWitness];

  const selectAnswer = (qId: string, idx: number) => {
    if (submitted[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const submitAnswer = (qId: string) => {
    if (answers[qId] == null) return;
    setSubmitted((prev) => ({ ...prev, [qId]: true }));
  };

  const allQuestionsAnswered = witness.questions.every((q) => submitted[q.id]);

  const goNextWitness = () => {
    if (activeWitness < witnesses.length - 1) {
      setActiveWitness((prev) => prev + 1);
      setQuestionPhase("statement");
    } else {
      setAllDone(true);
    }
  };

  if (allDone) {
    return (
      <View style={styles.doneContainer}>
        <View style={[styles.doneIcon, { backgroundColor: `${c.gold}20` }]}>
          <Feather name="check-circle" size={48} color={c.gold} />
        </View>
        <Text style={[styles.doneTitle, { color: c.foreground }]}>All Witnesses Heard</Text>
        <Text style={[styles.doneSubtitle, { color: c.mutedForeground }]}>
          You've gathered testimony from all witnesses. Now it's time to examine the timeline.
        </Text>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [styles.continueBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1 }]}
        >
          <Text style={[styles.continueBtnText, { color: c.primaryForeground }]}>Examine Timeline</Text>
          <Feather name="arrow-right" size={16} color={c.primaryForeground} />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleRow}>
          <Feather name="mic" size={18} color={c.gold} />
          <Text style={[styles.sectionTitle, { color: c.gold }]}>Witness Interviews</Text>
        </View>
        <Text style={[styles.witnessCounter, { color: c.mutedForeground }]}>
          Witness {activeWitness + 1} of {witnesses.length}
        </Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.witnessCard, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={styles.witnessHeader}>
            <View style={[styles.witnessAvatar, { backgroundColor: `${c.gold}20`, borderColor: `${c.gold}40` }]}>
              <Feather name="user" size={22} color={c.gold} />
            </View>
            <View style={styles.witnessInfo}>
              <Text style={[styles.witnessName, { color: c.foreground }]}>{witness.name}</Text>
              <Text style={[styles.witnessRole, { color: c.mutedForeground }]}>{witness.role}</Text>
            </View>
          </View>
        </View>

        {questionPhase === "statement" ? (
          <View>
            <View style={[styles.statementBox, { backgroundColor: "#1A1A24", borderColor: c.border }]}>
              <Text style={[styles.statementLabel, { color: c.gold }]}>Statement</Text>
              <Text style={[styles.statementText, { color: c.foreground }]}>"{witness.statement}"</Text>
            </View>
            <Pressable
              onPress={() => setQuestionPhase("questions")}
              style={({ pressed }) => [styles.nextBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={[styles.nextBtnText, { color: c.primaryForeground }]}>Begin Questioning</Text>
              <Feather name="help-circle" size={16} color={c.primaryForeground} />
            </Pressable>
          </View>
        ) : (
          <View>
            {witness.questions.map((q) => {
              const selected = answers[q.id];
              const isSubmitted = submitted[q.id];
              const isCorrect = isSubmitted && selected === q.correctIndex;

              return (
                <View key={q.id} style={[styles.questionCard, { backgroundColor: c.card, borderColor: c.border }]}>
                  <Text style={[styles.questionText, { color: c.foreground }]}>{q.text}</Text>
                  {q.options.map((opt, idx) => {
                    let bg = c.muted;
                    let border = c.border;
                    let textColor = c.foreground;

                    if (isSubmitted) {
                      if (idx === q.correctIndex) {
                        bg = "#22C55E20";
                        border = "#22C55E";
                        textColor = "#22C55E";
                      } else if (idx === selected) {
                        bg = "#EF444420";
                        border = "#EF4444";
                        textColor = "#EF4444";
                      }
                    } else if (selected === idx) {
                      bg = `${c.gold}20`;
                      border = c.gold;
                      textColor = c.gold;
                    }

                    return (
                      <Pressable
                        key={idx}
                        onPress={() => selectAnswer(q.id, idx)}
                        style={[styles.option, { backgroundColor: bg, borderColor: border }]}
                      >
                        <View style={[styles.optionBullet, { borderColor: border }]}>
                          {isSubmitted && idx === q.correctIndex && (
                            <Feather name="check" size={10} color="#22C55E" />
                          )}
                          {isSubmitted && idx === selected && idx !== q.correctIndex && (
                            <Feather name="x" size={10} color="#EF4444" />
                          )}
                          {!isSubmitted && selected === idx && (
                            <View style={[styles.optionDot, { backgroundColor: c.gold }]} />
                          )}
                        </View>
                        <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
                      </Pressable>
                    );
                  })}

                  {!isSubmitted ? (
                    <Pressable
                      onPress={() => submitAnswer(q.id)}
                      style={[
                        styles.submitBtn,
                        {
                          backgroundColor: selected != null ? c.gold : c.muted,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.submitBtnText, { color: selected != null ? c.primaryForeground : c.mutedForeground }]}
                      >
                        Submit Answer
                      </Text>
                    </Pressable>
                  ) : (
                    <View style={[styles.explanationBox, { backgroundColor: `${c.gold}10`, borderColor: `${c.gold}30` }]}>
                      <Feather name="book-open" size={13} color={c.gold} />
                      <Text style={[styles.explanationText, { color: c.parchment }]}>{q.explanation}</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {allQuestionsAnswered && (
              <Pressable
                onPress={goNextWitness}
                style={({ pressed }) => [styles.nextBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1, marginTop: 4 }]}
              >
                <Text style={[styles.nextBtnText, { color: c.primaryForeground }]}>
                  {activeWitness < witnesses.length - 1 ? "Next Witness" : "All Witnesses Heard"}
                </Text>
                <Feather name="arrow-right" size={16} color={c.primaryForeground} />
              </Pressable>
            )}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 20, letterSpacing: 0.5 },
  witnessCounter: { fontFamily: "Inter_400Regular", fontSize: 13 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  witnessCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  witnessHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  witnessAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  witnessInfo: { flex: 1 },
  witnessName: { fontFamily: "Inter_700Bold", fontSize: 17 },
  witnessRole: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  statementBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  statementLabel: { fontFamily: "Inter_600SemiBold", fontSize: 11, letterSpacing: 1, marginBottom: 8 },
  statementText: { fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 24, fontStyle: "italic" },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  nextBtnText: { fontFamily: "Inter_700Bold", fontSize: 15 },
  questionCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
    gap: 8,
  },
  questionText: { fontFamily: "Inter_600SemiBold", fontSize: 15, lineHeight: 22, marginBottom: 4 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  optionBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionDot: { width: 8, height: 8, borderRadius: 4 },
  optionText: { fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
  submitBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  submitBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  explanationBox: {
    flexDirection: "row",
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "flex-start",
    marginTop: 4,
  },
  explanationText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20, flex: 1 },
  doneContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  doneIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  doneTitle: { fontFamily: "Inter_700Bold", fontSize: 24, textAlign: "center" },
  doneSubtitle: { fontFamily: "Inter_400Regular", fontSize: 15, textAlign: "center", lineHeight: 24 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 8,
  },
  continueBtnText: { fontFamily: "Inter_700Bold", fontSize: 15 },
});
