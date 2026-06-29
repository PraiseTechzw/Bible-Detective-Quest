import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";

interface Props {
  suspects: string[];
  correctSuspect: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function VerdictScreen({ suspects, correctSuspect, onCorrect, onWrong }: Props) {
  const c = colors.light;
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (name: string) => {
    if (submitted) return;
    setSelected(name);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    const correct = selected === correctSuspect;
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
    );
  };

  const isCorrectAnswer = submitted && selected === correctSuspect;
  const isWrongAnswer = submitted && selected !== correctSuspect;

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={[styles.headerIcon, { backgroundColor: `${c.gold}20` }]}>
          <Feather name="scale" size={40} color={c.gold} />
        </View>

        <Text style={[styles.title, { color: c.foreground }]}>Final Verdict</Text>
        <Text style={[styles.subtitle, { color: c.mutedForeground }]}>
          You have examined the evidence, heard the witnesses, and studied the suspects.{"\n\n"}
          Who is responsible?
        </Text>

        <View style={styles.options}>
          {suspects.map((name) => {
            let bg = c.card;
            let border = c.border;
            let textColor = c.foreground;
            let icon: keyof typeof Feather.glyphMap = "circle";

            if (submitted) {
              if (name === correctSuspect) {
                bg = "#22C55E20";
                border = "#22C55E";
                textColor = "#22C55E";
                icon = "check-circle";
              } else if (name === selected) {
                bg = "#EF444420";
                border = "#EF4444";
                textColor = "#EF4444";
                icon = "x-circle";
              }
            } else if (name === selected) {
              bg = `${c.gold}20`;
              border = c.gold;
              textColor = c.gold;
              icon = "check-circle";
            }

            return (
              <Pressable
                key={name}
                onPress={() => handleSelect(name)}
                style={({ pressed }) => [
                  styles.option,
                  { backgroundColor: bg, borderColor: border, opacity: pressed && !submitted ? 0.8 : 1 },
                ]}
              >
                <Feather name={icon} size={20} color={submitted ? textColor : selected === name ? c.gold : c.mutedForeground} />
                <Text style={[styles.optionText, { color: textColor }]}>{name}</Text>
              </Pressable>
            );
          })}
        </View>

        {submitted && isCorrectAnswer && (
          <View style={[styles.resultBox, { backgroundColor: "#22C55E20", borderColor: "#22C55E" }]}>
            <Feather name="award" size={24} color="#22C55E" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.resultTitle, { color: "#22C55E" }]}>Correct! Justice Served.</Text>
              <Text style={[styles.resultSub, { color: c.mutedForeground }]}>
                Your detective instincts are sharp. Now hear the full biblical account.
              </Text>
            </View>
          </View>
        )}

        {submitted && isWrongAnswer && (
          <View style={[styles.resultBox, { backgroundColor: "#EF444420", borderColor: "#EF4444" }]}>
            <Feather name="alert-triangle" size={24} color="#EF4444" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.resultTitle, { color: "#EF4444" }]}>Not Quite…</Text>
              <Text style={[styles.resultSub, { color: c.mutedForeground }]}>
                The evidence points elsewhere. Read the full case reveal to discover the truth.
              </Text>
            </View>
          </View>
        )}

        {!submitted ? (
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitBtn,
              {
                backgroundColor: selected ? c.gold : c.muted,
                opacity: pressed && !!selected ? 0.8 : 1,
              },
            ]}
          >
            <Text style={[styles.submitBtnText, { color: selected ? c.primaryForeground : c.mutedForeground }]}>
              Deliver Verdict
            </Text>
            <Feather name="gavel" size={16} color={selected ? c.primaryForeground : c.mutedForeground} />
          </Pressable>
        ) : (
          <Pressable
            onPress={isCorrectAnswer ? onCorrect : onWrong}
            style={({ pressed }) => [styles.submitBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1 }]}
          >
            <Text style={[styles.submitBtnText, { color: c.primaryForeground }]}>Reveal the Truth</Text>
            <Feather name="book-open" size={16} color={c.primaryForeground} />
          </Pressable>
        )}
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  headerIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: { fontFamily: "Inter_700Bold", fontSize: 26, textAlign: "center" },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 15, textAlign: "center", lineHeight: 24 },
  options: { width: "100%", gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
  },
  optionText: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  resultBox: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: "flex-start",
  },
  resultTitle: { fontFamily: "Inter_700Bold", fontSize: 16 },
  resultSub: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20, marginTop: 4 },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 4,
  },
  submitBtnText: { fontFamily: "Inter_700Bold", fontSize: 16 },
});
