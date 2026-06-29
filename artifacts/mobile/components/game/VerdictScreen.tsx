import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";

interface Props {
  suspects: string[];
  correctSuspect: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function VerdictScreen({ suspects, correctSuspect, onCorrect, onWrong }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrectAnswer = submitted && selected === correctSuspect;
  const isWrongAnswer = submitted && selected !== correctSuspect;

  const select = (name: string) => {
    if (submitted) return;
    setSelected(name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const submit = () => {
    if (!selected) return;
    setSubmitted(true);
    Haptics.notificationAsync(
      selected === correctSuspect
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error
    );
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0A0D1A", colors.bg, colors.bg]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <LinearGradient
          colors={["rgba(212,150,42,0.15)", "rgba(212,150,42,0.05)", "transparent"]}
          style={styles.heroBg}
        >
          <LinearGradient
            colors={["rgba(212,150,42,0.25)", "rgba(212,150,42,0.08)"]}
            style={styles.heroIcon}
          >
            <Feather name="scale" size={36} color={colors.gold} />
          </LinearGradient>
        </LinearGradient>

        <Text style={styles.title}>Final Verdict</Text>
        <Text style={styles.subtitle}>
          You have examined the evidence, heard the witnesses, studied the timeline, and analysed every suspect.{"\n\n"}The truth now rests in your judgment.
        </Text>
        <Text style={styles.question}>Who is responsible?</Text>

        {/* Options */}
        <View style={styles.options}>
          {suspects.map((name, idx) => {
            const isSelected = selected === name;
            const correct = submitted && name === correctSuspect;
            const wrong = submitted && name === selected && name !== correctSuspect;

            const gradColors: readonly [string, string] = correct
              ? ["rgba(46,204,142,0.18)", "rgba(46,204,142,0.06)"]
              : wrong
              ? ["rgba(232,64,64,0.18)", "rgba(232,64,64,0.06)"]
              : isSelected
              ? ["rgba(212,150,42,0.18)", "rgba(212,150,42,0.06)"]
              : ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)"];

            const borderColor = correct
              ? "rgba(46,204,142,0.5)"
              : wrong
              ? "rgba(232,64,64,0.5)"
              : isSelected
              ? colors.goldBorder
              : colors.border;

            const textColor = correct ? colors.green : wrong ? colors.red : isSelected ? colors.gold : colors.text;
            const icon: keyof typeof Feather.glyphMap = correct ? "check-circle" : wrong ? "x-circle" : isSelected ? "disc" : "circle";

            return (
              <Pressable
                key={name}
                onPress={() => select(name)}
                style={({ pressed }) => ({ opacity: pressed && !submitted ? 0.8 : 1 })}
              >
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
            );
          })}
        </View>

        {/* Result box */}
        {isCorrectAnswer && (
          <LinearGradient
            colors={["rgba(46,204,142,0.15)", "rgba(46,204,142,0.05)"]}
            style={styles.resultBox}
          >
            <View style={[styles.resultBorder, { borderColor: "rgba(46,204,142,0.4)" }]} />
            <Feather name="award" size={24} color={colors.green} />
            <View style={styles.resultText}>
              <Text style={[styles.resultTitle, { color: colors.green }]}>Correct! Justice Served.</Text>
              <Text style={styles.resultSub}>Your detective instincts are sharp. Now hear the full biblical account.</Text>
            </View>
          </LinearGradient>
        )}
        {isWrongAnswer && (
          <LinearGradient
            colors={["rgba(232,64,64,0.12)", "rgba(232,64,64,0.04)"]}
            style={styles.resultBox}
          >
            <View style={[styles.resultBorder, { borderColor: "rgba(232,64,64,0.35)" }]} />
            <Feather name="alert-triangle" size={24} color={colors.red} />
            <View style={styles.resultText}>
              <Text style={[styles.resultTitle, { color: colors.red }]}>Not Quite…</Text>
              <Text style={styles.resultSub}>The evidence points elsewhere. Read the full case reveal to discover the truth.</Text>
            </View>
          </LinearGradient>
        )}

        {/* CTA */}
        {!submitted ? (
          <GoldButton
            label="Deliver Verdict"
            onPress={submit}
            icon="gavel"
            iconRight
            disabled={!selected}
            size="lg"
            style={styles.cta}
          />
        ) : (
          <GoldButton
            label="Reveal the Truth"
            onPress={isCorrectAnswer ? onCorrect : onWrong}
            icon="book-open"
            iconRight
            size="lg"
            style={styles.cta}
          />
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, alignItems: "center", gap: 16 },
  heroBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.goldBorder,
  },
  title: { fontFamily: "Inter_700Bold", fontSize: 28, color: colors.text, textAlign: "center" },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.textMuted, textAlign: "center", lineHeight: 23 },
  question: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: colors.gold,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  options: { width: "100%", gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: colors.radius.lg,
    borderWidth: 1.5,
  },
  optionLeft: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  optionText: { fontFamily: "Inter_600SemiBold", fontSize: 16, flex: 1 },
  correctBadge: {
    backgroundColor: "rgba(46,204,142,0.2)",
    borderRadius: colors.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(46,204,142,0.5)",
  },
  correctBadgeText: { fontFamily: "Inter_700Bold", fontSize: 9, color: colors.green, letterSpacing: 1 },
  resultBox: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    borderRadius: colors.radius.lg,
    padding: 14,
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
  },
  resultBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  resultText: { flex: 1 },
  resultTitle: { fontFamily: "Inter_700Bold", fontSize: 16 },
  resultSub: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, lineHeight: 20, marginTop: 4 },
  cta: { width: "100%" },
});
