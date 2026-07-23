import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { GameMode } from "@/context/GameContext";
import { IconGavel } from "@/components/ui/SvgIcons";

interface Props {
  suspects: string[];
  correctSuspect: string;
  onCorrect: () => void;
  onWrong: () => void;
  mode?: GameMode;
}

function PulsingGlow() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 1.35, duration: 1200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.3, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View style={[glowStyles.ring, { transform: [{ scale }], opacity }]} />
  );
}
const glowStyles = StyleSheet.create({
  ring: { position: "absolute", width: 110, height: 110, borderRadius: 55, backgroundColor: colors.gold },
});

export default function VerdictScreen({ suspects, correctSuspect, onCorrect, onWrong, mode = "story" }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const heroEntrance = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.7)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const resultSlide = useRef(new Animated.Value(20)).current;
  const optionOpacities = useRef(suspects.map(() => new Animated.Value(0))).current;
  const optionSlides = useRef(suspects.map(() => new Animated.Value(16))).current;

  const isCorrectAnswer = submitted && selected === correctSuspect;
  const isWrongAnswer = submitted && selected !== correctSuspect;

  const isSurvival = mode === "survival";

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroEntrance, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(heroScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
    suspects.forEach((_, i) => {
      Animated.parallel([
        Animated.timing(optionOpacities[i], { toValue: 1, duration: 350, delay: 200 + i * 80, useNativeDriver: true }),
        Animated.spring(optionSlides[i], { toValue: 0, delay: 200 + i * 80, useNativeDriver: true, tension: 70, friction: 12 }),
      ]).start();
    });
  }, []);

  const select = (name: string) => {
    if (submitted) return;
    setSelected(name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const doSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    Animated.parallel([
      Animated.timing(resultOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(resultSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
    ]).start();
    Haptics.notificationAsync(
      selected === correctSuspect ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
    );
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", colors.bg, colors.bg]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: heroEntrance, transform: [{ scale: heroScale }], alignItems: "center" }}>
          <View style={styles.heroBg}>
            <PulsingGlow />
            <LinearGradient colors={["rgba(212,150,42,0.25)", "rgba(212,150,42,0.08)"]} style={styles.heroIcon}>
              <IconGavel size={36} color={colors.gold} />
            </LinearGradient>
          </View>
        </Animated.View>

        <Text style={styles.title}>Final Verdict</Text>
        <Text style={styles.subtitle}>
          You have examined the evidence, heard the witnesses, studied the timeline, and analysed every suspect.{"\n\n"}
          {isSurvival
            ? "Survival Mode: This is your one chance. Choose wrong and the case ends."
            : "The truth now rests in your judgment."}
        </Text>
        {isSurvival && (
          <View style={styles.survivalWarning}>
            <View style={[styles.swBorder, { borderColor: "rgba(155,89,182,0.4)" }]} />
            <Text style={styles.swText}>One shot. One verdict. No second chances.</Text>
          </View>
        )}
        <Text style={styles.question}>Who is responsible?</Text>

        <View style={styles.options}>
          {suspects.map((name, idx) => {
            const isSelected = selected === name;
            const correct = submitted && name === correctSuspect;
            const wrong = submitted && name === selected && name !== correctSuspect;
            const gradColors: readonly [string, string] = correct ? ["rgba(46,204,142,0.18)", "rgba(46,204,142,0.06)"] : wrong ? ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.06)"] : isSelected ? ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.06)"] : ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)"];
            const borderColor = correct ? "rgba(46,204,142,0.5)" : wrong ? "rgba(232,64,64,0.5)" : isSelected ? colors.goldBorder : colors.border;
            const textColor = correct ? colors.green : wrong ? colors.red : isSelected ? colors.gold : colors.text;
            const icon: keyof typeof Feather.glyphMap = correct ? "check-circle" : wrong ? "x-circle" : isSelected ? "disc" : "circle";

            return (
              <Animated.View key={name} style={{ opacity: optionOpacities[idx], transform: [{ translateY: optionSlides[idx] }] }}>
                <Pressable onPress={() => select(name)} style={({ pressed }) => ({ opacity: pressed && !submitted ? 0.8 : 1 })}>
                  <LinearGradient colors={gradColors} style={[styles.option, { borderColor }]}>
                    <View style={[styles.optionLeft, { backgroundColor: `${textColor}20`, borderColor: `${textColor}40` }]}>
                      <Feather name={icon} size={16} color={textColor} />
                    </View>
                    <Text style={[styles.optionText, { color: textColor }]}>{name}</Text>
                    {correct && (
                      <View style={styles.correctBadge}>
                        <Text style={styles.correctBadgeText}>CORRECT</Text>
                      </View>
                    )}
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        {(isCorrectAnswer || isWrongAnswer) && (
          <Animated.View style={{ opacity: resultOpacity, transform: [{ translateY: resultSlide }], width: "100%" }}>
            <LinearGradient
              colors={isCorrectAnswer ? ["rgba(46,204,142,0.15)", "rgba(46,204,142,0.05)"] : ["rgba(232,64,64,0.12)", "rgba(232,64,64,0.04)"]}
              style={styles.resultBox}
            >
              <View style={[styles.resultBorder, { borderColor: isCorrectAnswer ? "rgba(46,204,142,0.4)" : "rgba(232,64,64,0.35)" }]} />
              <Feather name={isCorrectAnswer ? "award" : "alert-triangle"} size={24} color={isCorrectAnswer ? colors.green : colors.red} />
              <View style={styles.resultText}>
                <Text style={[styles.resultTitle, { color: isCorrectAnswer ? colors.green : colors.red }]}>
                  {isCorrectAnswer ? "Correct! Justice Served." : "Not Quite..."}
                </Text>
                <Text style={styles.resultSub}>
                  {isCorrectAnswer
                    ? "Your detective instincts are sharp. Now hear the full biblical account."
                    : isSurvival
                    ? "Wrong answer in Survival Mode. The ancient tribunal is not amused."
                    : "The evidence points elsewhere. Read the full case reveal to discover the truth."}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {!submitted ? (
          <GoldButton label="Deliver Verdict" onPress={doSubmit} icon="gavel" iconRight disabled={!selected} size="lg" style={styles.cta} />
        ) : (
          <GoldButton label="Reveal the Truth" onPress={isCorrectAnswer ? onCorrect : onWrong} icon="book-open" iconRight size="lg" style={styles.cta} />
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, alignItems: "center", gap: 16 },
  heroBg: { width: 120, height: 120, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  heroIcon: { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: colors.goldBorder },
  title: { fontFamily: "Inter_700Bold", fontSize: 28, color: colors.text, textAlign: "center" },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center", lineHeight: 23 },
  survivalWarning: { width: "100%", backgroundColor: "rgba(155,89,182,0.12)", borderRadius: colors.radius.md, padding: 12, position: "relative", overflow: "hidden" },
  swBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.md },
  swText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.purple, textAlign: "center" },
  question: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.gold, letterSpacing: 0.5, textAlign: "center" },
  options: { width: "100%", gap: 10 },
  option: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderRadius: colors.radius.lg, borderWidth: 1.5 },
  optionLeft: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  optionText: { fontFamily: "Inter_600SemiBold", fontSize: 16, flex: 1 },
  correctBadge: { backgroundColor: "rgba(46,204,142,0.2)", borderRadius: colors.radius.full, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: "rgba(46,204,142,0.5)" },
  correctBadgeText: { fontFamily: "Inter_700Bold", fontSize: 9, color: colors.green, letterSpacing: 1 },
  resultBox: { flexDirection: "row", gap: 12, width: "100%", borderRadius: colors.radius.lg, padding: 14, alignItems: "flex-start", position: "relative", overflow: "hidden" },
  resultBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1, borderRadius: colors.radius.lg },
  resultText: { flex: 1 },
  resultTitle: { fontFamily: "Inter_700Bold", fontSize: 16 },
  resultSub: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20, marginTop: 4 },
  cta: { width: "100%" },
});
