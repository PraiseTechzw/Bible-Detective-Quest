import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { Witness } from "@/data/cases";
import { buildSupplementalQuestions, seededShuffle } from "@/data/gameAlgorithms";
import type { GameMode } from "@/context/GameContext";
import { IconCheckCircle } from "@/components/ui/SvgIcons";

interface Props {
  witnesses: Witness[];
  onContinue: () => void;
  mode?: GameMode;
  onPenalize?: () => void;
  scriptureFocus?: string;
}

function useShakeAnimation() {
  const shake = useRef(new Animated.Value(0)).current;
  const trigger = () => {
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 5, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };
  return { style: { transform: [{ translateX: shake }] }, trigger };
}

function useFlashAnimation(color: string) {
  const opacity = useRef(new Animated.Value(0)).current;
  const trigger = () => {
    opacity.setValue(0.6);
    Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }).start();
  };
  return { opacity, color, trigger };
}

function QuestionCard({
  question,
  selectedAnswer,
  submitted,
  onSelect,
  onSubmit,
  scriptureFocus,
}: {
  question: Witness["questions"][number];
  selectedAnswer: number | null;
  submitted: boolean;
  onSelect: (idx: number) => void;
  onSubmit: (correct: boolean) => void;
  scriptureFocus?: string;
}) {
  const shake = useShakeAnimation();
  const flash = useFlashAnimation(colors.green);

  const handleSubmit = () => {
    if (selectedAnswer == null || submitted) return;
    const correct = selectedAnswer === question.correctIndex;
    if (correct) {
      flash.trigger();
    } else {
      shake.trigger();
    }
    onSubmit(correct);
  };

  return (
    <Animated.View style={shake.style}>
      <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.questionCard}>
        <View style={[styles.cardBorder, { borderColor: colors.border }]} />
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: flash.color,
              opacity: flash.opacity,
              borderRadius: colors.radius.lg,
            },
          ]}
          pointerEvents="none"
        />
        <Text style={styles.questionText}>{question.text}</Text>
        <View style={styles.referenceChip}>
          <Text style={styles.referenceText}>{question.reference ?? scriptureFocus ?? "Bible focus"}</Text>
        </View>
        {question.options.map((opt, idx) => {
          const isCorrect = submitted && idx === question.correctIndex;
          const isWrong = submitted && idx === selectedAnswer && idx !== question.correctIndex;
          const isSelected = !submitted && selectedAnswer === idx;
          return (
            <Pressable
              key={idx}
              onPress={() => onSelect(idx)}
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <LinearGradient
                colors={
                  isCorrect
                    ? ["rgba(46,204,142,0.18)", "rgba(46,204,142,0.06)"]
                    : isWrong
                      ? ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.06)"]
                      : isSelected
                        ? ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.06)"]
                        : ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)"]
                }
                style={[
                  styles.option,
                  {
                    borderColor: isCorrect
                      ? "rgba(46,204,142,0.5)"
                      : isWrong
                        ? "rgba(232,64,64,0.5)"
                        : isSelected
                          ? colors.goldBorder
                          : colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.optionBullet,
                    {
                      borderColor: isCorrect
                        ? colors.green
                        : isWrong
                          ? colors.red
                          : isSelected
                            ? colors.gold
                            : colors.border,
                      backgroundColor: isCorrect
                        ? "rgba(46,204,142,0.2)"
                        : isWrong
                          ? "rgba(232,64,64,0.2)"
                          : isSelected
                            ? "rgba(212,150,42,0.2)"
                            : "transparent",
                    },
                  ]}
                >
                  {isCorrect && <Feather name="check" size={10} color={colors.green} />}
                  {isWrong && <Feather name="x" size={10} color={colors.red} />}
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isCorrect
                        ? colors.green
                        : isWrong
                          ? colors.red
                          : isSelected
                            ? colors.gold
                            : colors.text,
                    },
                  ]}
                >
                  {opt}
                </Text>
              </LinearGradient>
            </Pressable>
          );
        })}
        {!submitted ? (
          <GoldButton
            label="Confirm Answer"
            onPress={handleSubmit}
            disabled={selectedAnswer == null}
            size="md"
            style={styles.submitBtn}
          />
        ) : (
          <LinearGradient
            colors={["rgba(212,150,42,0.12)", "rgba(212,150,42,0.04)"]}
            style={styles.explanationBox}
          >
            <View style={[styles.explanationBorder, { borderColor: colors.goldBorder }]} />
            <Feather name="book-open" size={13} color={colors.gold} />
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </LinearGradient>
        )}
      </LinearGradient>
    </Animated.View>
  );
}

export default function WitnessInterview({
  witnesses,
  onContinue,
  mode = "story",
  onPenalize,
  scriptureFocus,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState<"statement" | "questions">("statement");
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [allDone, setAllDone] = useState(false);

  const doneScale = useRef(new Animated.Value(0)).current;
  const doneOpacity = useRef(new Animated.Value(0)).current;

  const witness = witnesses[activeIdx];
  const orderedQuestions = React.useMemo(
    () =>
      seededShuffle(
        [
          ...witness.questions,
          ...buildSupplementalQuestions(
            witness.name,
            witness.role,
            scriptureFocus ?? "Bible focus",
            `${witness.id}:${scriptureFocus ?? "bible"}`,
          ),
        ],
        `${witness.id}:${scriptureFocus ?? "bible"}:deck`,
      ),
    [witness.id, witness.name, witness.questions, witness.role, scriptureFocus],
  );
  const allAnswered = orderedQuestions.every((q) => submitted[q.id]);

  const isTimed = mode === "timeAttack";
  const isSurvival = mode === "survival";

  const select = (qId: string, idx: number) => {
    if (submitted[qId]) return;
    setAnswers((p) => ({ ...p, [qId]: idx }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const nextWitness = () => {
    if (activeIdx < witnesses.length - 1) {
      setActiveIdx((p) => p + 1);
      setPhase("statement");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Animated.parallel([
        Animated.timing(doneOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(doneScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      ]).start();
      setAllDone(true);
    }
  };

  if (allDone) {
    return (
      <View style={styles.doneRoot}>
        <LinearGradient colors={["#1A2640", "#0E1628", colors.bg]} style={StyleSheet.absoluteFill} />
        <Animated.View style={{ opacity: doneOpacity, transform: [{ scale: doneScale }], alignItems: "center", gap: 16 }}>
          <LinearGradient colors={["rgba(46,204,142,0.2)", "rgba(46,204,142,0.05)"]} style={styles.doneIconBg}>
            <IconCheckCircle size={44} color={colors.green} />
          </LinearGradient>
          <Text style={styles.doneTitle}>All Witnesses Heard</Text>
          <Text style={styles.doneSub}>Testimony gathered. The timeline awaits your analysis.</Text>
          <GoldButton label="Examine Timeline" onPress={onContinue} icon="clock" iconRight size="lg" style={styles.doneBtn} />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0F1628", colors.bg]} style={styles.subHeader}>
        <View style={styles.subHeaderRow}>
          <View style={[styles.accent, { backgroundColor: colors.purple }]} />
          <Text style={styles.subHeaderTitle}>Witness Interview</Text>
          <View style={styles.progressChip}>
            <Text style={styles.progressText}>{activeIdx + 1}/{witnesses.length}</Text>
          </View>
          {(isTimed || isSurvival) && (
            <View style={[styles.modePill, { backgroundColor: isTimed ? "rgba(232,64,64,0.15)" : "rgba(155,89,182,0.15)", borderColor: isTimed ? "rgba(232,64,64,0.4)" : "rgba(155,89,182,0.4)" }]}>
              <Text style={[styles.modePillText, { color: isTimed ? colors.red : colors.purple }]}>
                {isTimed ? "TIMED" : "SURVIVAL"}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.dotRow}>
          {witnesses.map((_, i) => (
            <Animated.View
              key={i}
              style={[styles.witnessDot, {
                backgroundColor: i < activeIdx ? colors.green : i === activeIdx ? colors.purple : colors.surface3,
                transform: [{ scaleX: i === activeIdx ? 1.3 : 1 }],
              }]}
            />
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#1C1840", "#0F0E28", "#0A0A1A"]} style={styles.witnessCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={[styles.cardBorder, { borderColor: "rgba(124,94,232,0.35)" }]} />
          <View style={styles.witnessTop}>
            <LinearGradient colors={["rgba(124,94,232,0.25)", "rgba(124,94,232,0.08)"]} style={styles.witnessAvatar}>
              <Feather name="user" size={24} color={colors.purple} />
            </LinearGradient>
            <View style={styles.witnessInfo}>
              <Text style={styles.witnessName}>{witness.name}</Text>
              <Text style={styles.witnessRole}>{witness.role}</Text>
            </View>
          </View>
        </LinearGradient>

        {phase === "statement" ? (
          <View>
            <LinearGradient colors={[colors.surface2, colors.surface1]} style={styles.statementCard}>
              <View style={[styles.cardBorder, { borderColor: colors.border }]} />
              <Text style={styles.statementLabel}>RECORDED STATEMENT</Text>
              <Text style={styles.statementText}>"{witness.statement}"</Text>
            </LinearGradient>
            {isSurvival && (
              <LinearGradient colors={["rgba(155,89,182,0.1)", "rgba(155,89,182,0.04)"]} style={styles.survivalHint}>
                <View style={[styles.cardBorder, { borderColor: "rgba(155,89,182,0.3)" }]} />
                <Text style={styles.survivalHintText}>Survival Mode: Wrong answers cost a life. Read carefully.</Text>
              </LinearGradient>
            )}
            <GoldButton label="Begin Questioning" onPress={() => setPhase("questions")} icon="help-circle" iconRight={false} size="lg" style={styles.actionBtn} />
          </View>
        ) : (
          <View style={styles.questions}>
            {orderedQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                selectedAnswer={answers[q.id] ?? null}
                submitted={!!submitted[q.id]}
                onSelect={(idx) => select(q.id, idx)}
                scriptureFocus={scriptureFocus}
                onSubmit={(correct) => {
                  setSubmitted((p) => ({ ...p, [q.id]: true }));
                  if (correct) {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  } else {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                    onPenalize?.();
                  }
                }}
              />
            ))}
            {allAnswered && (
              <GoldButton label={activeIdx < witnesses.length - 1 ? "Next Witness" : "All Witnesses Heard"} onPress={nextWitness} icon="arrow-right" size="lg" style={styles.actionBtn} />
            )}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  subHeader: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 },
  subHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  accent: { width: 3, height: 18, borderRadius: 2 },
  subHeaderTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text, flex: 1 },
  progressChip: { backgroundColor: colors.surface3, borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: colors.border },
  progressText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted },
  modePill: { borderWidth: 1, borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  modePillText: { fontFamily: "Inter_700Bold", fontSize: 9, letterSpacing: 1 },
  dotRow: { flexDirection: "row", gap: 6 },
  witnessDot: { width: 24, height: 4, borderRadius: 2 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  witnessCard: { borderRadius: colors.radius.lg, padding: 16, marginTop: 4, marginBottom: 12, position: "relative", overflow: "hidden" },
  cardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  witnessTop: { flexDirection: "row", alignItems: "center", gap: 14 },
  witnessAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(124,94,232,0.4)" },
  witnessInfo: { flex: 1 },
  witnessName: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text },
  witnessRole: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  statementCard: { borderRadius: colors.radius.lg, padding: 18, marginBottom: 14, position: "relative", overflow: "hidden", gap: 8 },
  statementLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, color: colors.textMuted, letterSpacing: 2 },
  statementText: { fontFamily: "Inter_400Regular", fontSize: 15, color: colors.parchment, lineHeight: 25, fontStyle: "italic" },
  survivalHint: { borderRadius: colors.radius.md, padding: 12, marginBottom: 12, position: "relative", overflow: "hidden" },
  survivalHintText: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.purple },
  questions: { gap: 12 },
  questionCard: { borderRadius: colors.radius.lg, padding: 16, position: "relative", overflow: "hidden", gap: 10 },
  questionText: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.text, lineHeight: 22, marginBottom: 2 },
  referenceChip: {
    alignSelf: "flex-start",
    borderRadius: colors.radius.full,
    paddingHorizontal: 9,
    paddingVertical: 4,
    backgroundColor: "rgba(212,150,42,0.10)",
    borderWidth: 1,
    borderColor: "rgba(212,150,42,0.18)",
    marginBottom: 6,
  },
  referenceText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  option: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderRadius: colors.radius.md, borderWidth: 1 },
  optionBullet: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
  optionText: { fontFamily: "Inter_400Regular", fontSize: 14, flex: 1, lineHeight: 20 },
  submitBtn: { marginTop: 4, width: "100%" },
  explanationBox: { flexDirection: "row", gap: 8, padding: 12, borderRadius: colors.radius.md, alignItems: "flex-start", marginTop: 4, position: "relative", overflow: "hidden" },
  explanationBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  explanationText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text, lineHeight: 20, flex: 1 },
  actionBtn: { width: "100%", marginTop: 4, marginBottom: 4 },
  doneRoot: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: colors.bg },
  doneIconBg: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(46,204,142,0.4)", marginBottom: 8 },
  doneTitle: { fontFamily: "Inter_700Bold", fontSize: 24, color: colors.text, textAlign: "center" },
  doneSub: { fontFamily: "Inter_400Regular", fontSize: 15, color: colors.textMuted, textAlign: "center", lineHeight: 24 },
  doneBtn: { width: "100%", marginTop: 8 },
});
