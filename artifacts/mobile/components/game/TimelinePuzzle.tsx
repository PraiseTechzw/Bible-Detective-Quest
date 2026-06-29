import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import type { TimelineEvent } from "@/data/cases";

interface Props {
  events: TimelineEvent[];
  onContinue: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function TimelinePuzzle({ events, onContinue }: Props) {
  const c = colors.light;
  const shuffled = useMemo(() => shuffle(events), [events]);
  const [order, setOrder] = useState<(string | null)[]>(new Array(events.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const assignedIds = order.filter(Boolean) as string[];
  const unassigned = shuffled.filter((e) => !assignedIds.includes(e.id));

  const handleEventTap = (id: string) => {
    if (submitted) return;
    const firstEmpty = order.findIndex((o) => o === null);
    if (firstEmpty === -1) return;
    const newOrder = [...order];
    newOrder[firstEmpty] = id;
    setOrder(newOrder);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSlotTap = (slotIdx: number) => {
    if (submitted) return;
    if (order[slotIdx] === null) return;
    const newOrder = [...order];
    newOrder[slotIdx] = null;
    setOrder(newOrder);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleReset = () => {
    setOrder(new Array(events.length).fill(null));
    setSubmitted(false);
    setScore(0);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleSubmit = () => {
    if (order.some((o) => o === null)) return;
    let correct = 0;
    order.forEach((id, idx) => {
      const event = events.find((e) => e.id === id);
      if (event && event.correctOrder === idx + 1) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    Haptics.notificationAsync(
      correct === events.length
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning
    );
  };

  const isCorrect = (slotIdx: number) => {
    const id = order[slotIdx];
    const event = events.find((e) => e.id === id);
    return event?.correctOrder === slotIdx + 1;
  };

  const perfect = submitted && score === events.length;
  const allPlaced = order.every((o) => o !== null);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleRow}>
          <Feather name="clock" size={18} color={c.gold} />
          <Text style={[styles.sectionTitle, { color: c.gold }]}>Timeline Puzzle</Text>
        </View>
        <Text style={[styles.subtitle, { color: c.mutedForeground }]}>
          Tap events below to place them in the correct chronological order.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.slots}>
          {order.map((id, idx) => {
            const event = events.find((e) => e.id === id);
            const correct = submitted && id ? isCorrect(idx) : null;
            let borderColor = c.border;
            if (submitted && id) {
              borderColor = correct ? "#22C55E" : "#EF4444";
            } else if (id) {
              borderColor = c.gold;
            }

            return (
              <Pressable
                key={idx}
                onPress={() => handleSlotTap(idx)}
                style={({ pressed }) => [
                  styles.slot,
                  {
                    borderColor,
                    backgroundColor: id ? (submitted ? (correct ? "#22C55E15" : "#EF444415") : `${c.gold}10`) : c.card,
                    opacity: pressed && !submitted ? 0.8 : 1,
                  },
                ]}
              >
                <View style={[styles.slotNumber, { backgroundColor: borderColor }]}>
                  <Text style={[styles.slotNumText, { color: id ? c.primaryForeground : c.mutedForeground }]}>
                    {idx + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.slotText,
                    {
                      color: id ? c.foreground : c.mutedForeground,
                      fontStyle: id ? "normal" : "italic",
                    },
                  ]}
                >
                  {event ? event.text : "Tap an event below to place it here"}
                </Text>
                {submitted && id && (
                  <Feather
                    name={correct ? "check-circle" : "x-circle"}
                    size={16}
                    color={correct ? "#22C55E" : "#EF4444"}
                  />
                )}
                {!submitted && id && <Feather name="x" size={14} color={c.mutedForeground} />}
              </Pressable>
            );
          })}
        </View>

        {!submitted && (
          <View style={styles.eventPool}>
            <Text style={[styles.poolLabel, { color: c.mutedForeground }]}>
              {unassigned.length > 0 ? "Available Events — tap to place" : "All events placed"}
            </Text>
            {unassigned.map((event) => (
              <Pressable
                key={event.id}
                onPress={() => handleEventTap(event.id)}
                style={({ pressed }) => [
                  styles.eventChip,
                  { backgroundColor: c.card, borderColor: c.border, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Feather name="circle" size={8} color={c.gold} />
                <Text style={[styles.eventChipText, { color: c.foreground }]}>{event.text}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {submitted && (
          <View style={[styles.resultBox, { backgroundColor: perfect ? "#22C55E15" : "#F59E0B15", borderColor: perfect ? "#22C55E" : "#F59E0B" }]}>
            <Feather name={perfect ? "award" : "alert-circle"} size={24} color={perfect ? "#22C55E" : "#F59E0B"} />
            <View style={styles.resultText}>
              <Text style={[styles.resultTitle, { color: perfect ? "#22C55E" : "#F59E0B" }]}>
                {perfect ? "Perfect Order!" : `${score} / ${events.length} Correct`}
              </Text>
              <Text style={[styles.resultSub, { color: c.mutedForeground }]}>
                {perfect
                  ? "You reconstructed the biblical timeline perfectly."
                  : "Review the highlighted events and study the sequence."}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <View style={styles.footerBtns}>
          {(submitted || allPlaced) && (
            <Pressable
              onPress={handleReset}
              style={({ pressed }) => [styles.resetBtn, { borderColor: c.border, opacity: pressed ? 0.8 : 1 }]}
            >
              <Feather name="rotate-ccw" size={16} color={c.mutedForeground} />
              <Text style={[styles.resetBtnText, { color: c.mutedForeground }]}>Reset</Text>
            </Pressable>
          )}

          {!submitted ? (
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.mainBtn,
                { backgroundColor: allPlaced ? c.gold : c.muted, opacity: pressed && allPlaced ? 0.8 : 1, flex: 1 },
              ]}
            >
              <Text style={[styles.mainBtnText, { color: allPlaced ? c.primaryForeground : c.mutedForeground }]}>
                Submit Order
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={onContinue}
              style={({ pressed }) => [styles.mainBtn, { backgroundColor: c.gold, opacity: pressed ? 0.8 : 1, flex: 1 }]}
            >
              <Text style={[styles.mainBtnText, { color: c.primaryForeground }]}>Examine Suspects</Text>
              <Feather name="arrow-right" size={16} color={c.primaryForeground} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 20, letterSpacing: 0.5 },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 13 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  slots: { gap: 8, paddingTop: 8 },
  slot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 12,
  },
  slotNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
  },
  slotNumText: { fontFamily: "Inter_700Bold", fontSize: 13 },
  slotText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20, flex: 1 },
  eventPool: { marginTop: 20, gap: 8 },
  poolLabel: { fontFamily: "Inter_500Medium", fontSize: 12, letterSpacing: 0.5, marginBottom: 2 },
  eventChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  eventChipText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20, flex: 1 },
  resultBox: {
    flexDirection: "row",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 16,
    alignItems: "flex-start",
  },
  resultText: { flex: 1 },
  resultTitle: { fontFamily: "Inter_700Bold", fontSize: 16 },
  resultSub: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 4, lineHeight: 20 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: colors.light.background,
    borderTopWidth: 1,
  },
  footerBtns: { flexDirection: "row", gap: 10 },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  resetBtnText: { fontFamily: "Inter_500Medium", fontSize: 14 },
  mainBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  mainBtnText: { fontFamily: "Inter_700Bold", fontSize: 15 },
});
