import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import GoldButton from "@/components/ui/GoldButton";
import type { TimelineEvent } from "@/data/cases";
import { orderTimelineEvents } from "@/data/gameAlgorithms";

import type { GameMode } from "@/context/GameContext";

interface Props {
  events: TimelineEvent[];
  onContinue: () => void;
  mode?: GameMode;
  onPenalize?: () => void;
  seedKey?: string;
}

export default function TimelinePuzzle({
  events,
  onContinue,
  mode = "story",
  onPenalize,
  seedKey,
}: Props) {
  const shuffled = useMemo(
    () => orderTimelineEvents(events, seedKey ?? events.map((e) => e.id).join("|")),
    [events, seedKey],
  );
  const [order, setOrder] = useState<(string | null)[]>(Array(events.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const assigned = order.filter(Boolean) as string[];
  const unassigned = shuffled.filter((e) => !assigned.includes(e.id));
  const allPlaced = order.every(Boolean);

  const place = (id: string) => {
    if (submitted) return;
    const first = order.findIndex((o) => !o);
    if (first === -1) return;
    const next = [...order];
    next[first] = id;
    setOrder(next);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const remove = (idx: number) => {
    if (submitted) return;
    const next = [...order];
    next[idx] = null;
    setOrder(next);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const reset = () => {
    setOrder(Array(events.length).fill(null));
    setSubmitted(false);
    setScore(0);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const submit = () => {
    if (!allPlaced) return;
    let correct = 0;
    order.forEach((id, idx) => {
      const e = events.find((ev) => ev.id === id);
      if (e?.correctOrder === idx + 1) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    Haptics.notificationAsync(
      correct === events.length
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning
    );
  };

  const isCorrect = (idx: number) => {
    const e = events.find((ev) => ev.id === order[idx]);
    return e?.correctOrder === idx + 1;
  };

  const perfect = submitted && score === events.length;

  return (
    <View style={styles.root}>
      {/* Sub header */}
      <LinearGradient colors={["#0F1628", colors.bg]} style={styles.subHeader}>
        <View style={styles.subHeaderRow}>
          <View style={[styles.accent, { backgroundColor: colors.amber }]} />
          <Text style={styles.subHeaderTitle}>Timeline Puzzle</Text>
          <View style={styles.progressChip}>
            <Text style={styles.progressText}>{assigned.length}/{events.length}</Text>
          </View>
        </View>
        <Text style={styles.hint}>Tap events below to place them in chronological order</Text>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Placement slots */}
        <View style={styles.slotsWrap}>
          {order.map((id, idx) => {
            const event = events.find((e) => e.id === id);
            const correct = submitted && id ? isCorrect(idx) : null;
            const borderColor = submitted && id
              ? correct ? "rgba(46,204,142,0.5)" : "rgba(232,64,64,0.5)"
              : id ? colors.goldBorder : colors.border;
            const gradColors: readonly [string, string] = submitted && id
              ? correct
                ? ["rgba(46,204,142,0.12)", "rgba(46,204,142,0.04)"]
                : ["rgba(232,64,64,0.12)", "rgba(232,64,64,0.04)"]
              : id
              ? ["rgba(212,150,42,0.12)", "rgba(212,150,42,0.04)"]
              : [colors.surface2, colors.surface1];

            return (
              <Pressable
                key={idx}
                onPress={() => remove(idx)}
                style={({ pressed }) => ({ opacity: pressed && !submitted && !!id ? 0.8 : 1 })}
              >
                <LinearGradient colors={gradColors} style={[styles.slot, { borderColor }]}>
                  <LinearGradient
                    colors={id ? [colors.gold, colors.goldDim] : [colors.surface3, colors.surface2]}
                    style={styles.slotNum}
                  >
                    <Text style={[styles.slotNumText, { color: id ? "#000" : colors.textMuted }]}>{idx + 1}</Text>
                  </LinearGradient>
                  <Text style={[styles.slotText, { color: id ? colors.text : colors.textFaint, fontStyle: id ? "normal" : "italic" }]}>
                    {event ? event.text : "Tap an event below to place it here"}
                  </Text>
                  {submitted && id && (
                    <Feather name={correct ? "check-circle" : "x-circle"} size={16} color={correct ? colors.green : colors.red} />
                  )}
                  {!submitted && id && <Feather name="x" size={13} color={colors.textMuted} />}
                </LinearGradient>
              </Pressable>
            );
          })}
        </View>

        {/* Event pool */}
        {!submitted && unassigned.length > 0 && (
          <View style={styles.poolSection}>
            <View style={styles.poolHeader}>
              <View style={[styles.accent, { backgroundColor: colors.textMuted }]} />
              <Text style={styles.poolLabel}>Available Events</Text>
            </View>
            {unassigned.map((event) => (
              <Pressable
                key={event.id}
                onPress={() => place(event.id)}
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, marginBottom: 8 })}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]}
                  style={styles.eventChip}
                >
                  <View style={[styles.eventChipBorder, { borderColor: colors.border }]} />
                  <View style={styles.eventDot} />
                  <Text style={styles.eventChipText}>{event.text}</Text>
                  <Feather name="plus" size={14} color={colors.textMuted} />
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        )}

        {/* Result */}
        {submitted && (
          <LinearGradient
            colors={perfect
              ? ["rgba(46,204,142,0.15)", "rgba(46,204,142,0.05)"]
              : ["rgba(245,166,35,0.15)", "rgba(245,166,35,0.05)"]}
            style={styles.resultBox}
          >
            <View style={[styles.resultBorder, { borderColor: perfect ? "rgba(46,204,142,0.45)" : "rgba(245,166,35,0.45)" }]} />
            <Feather name={perfect ? "award" : "alert-circle"} size={26} color={perfect ? colors.green : colors.amber} />
            <View style={styles.resultText}>
              <Text style={[styles.resultTitle, { color: perfect ? colors.green : colors.amber }]}>
                {perfect ? "Perfect Chronology!" : `${score} / ${events.length} Correct`}
              </Text>
              <Text style={styles.resultSub}>
                {perfect ? "You reconstructed the biblical timeline accurately." : "Review the timeline and study the biblical sequence."}
              </Text>
            </View>
          </LinearGradient>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Footer */}
      <LinearGradient
        colors={["rgba(7,10,19,0)", "rgba(7,10,19,0.97)", colors.bg]}
        style={styles.footer}
      >
        <View style={styles.footerBtns}>
          {(submitted || allPlaced) && (
            <Pressable onPress={reset} style={[styles.resetBtn, { borderColor: colors.border }]}>
              <Feather name="rotate-ccw" size={16} color={colors.textMuted} />
            </Pressable>
          )}
          {!submitted ? (
            <GoldButton
              label="Submit Order"
              onPress={submit}
              disabled={!allPlaced}
              size="lg"
              style={styles.mainBtn}
            />
          ) : (
            <GoldButton
              label="Examine Suspects"
              onPress={onContinue}
              icon="arrow-right"
              size="lg"
              style={styles.mainBtn}
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  subHeader: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 12 },
  subHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  accent: { width: 3, height: 18, borderRadius: 2 },
  subHeaderTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text, flex: 1 },
  progressChip: {
    backgroundColor: colors.surface3,
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.textMuted },
  hint: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted },
  scroll: { flex: 1, paddingHorizontal: 16 },
  slotsWrap: { gap: 8, paddingTop: 8 },
  slot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: colors.radius.md,
    borderWidth: 1.5,
    overflow: "hidden",
  },
  slotNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
  },
  slotNumText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  slotText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20, flex: 1 },
  poolSection: { marginTop: 20 },
  poolHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  poolLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: colors.textMuted, letterSpacing: 1 },
  eventChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: colors.radius.md,
    position: "relative",
    overflow: "hidden",
  },
  eventChipBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
  },
  eventChipText: { fontFamily: "Inter_400Regular", fontSize: 13, flex: 1, color: colors.text, lineHeight: 20 },
  resultBox: {
    flexDirection: "row",
    gap: 12,
    borderRadius: colors.radius.lg,
    padding: 16,
    marginTop: 16,
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
  resultSub: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, marginTop: 4, lineHeight: 20 },
  footer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  footerBtns: { flexDirection: "row", gap: 10 },
  resetBtn: {
    width: 50,
    height: 50,
    borderRadius: colors.radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: colors.surface2,
  },
  mainBtn: { flex: 1 },
});
