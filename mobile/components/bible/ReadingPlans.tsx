import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { READING_PLANS } from "@/data/bibleTools";
import { useBible } from "@/context/BibleContext";

interface Props {
  onBack: () => void;
  topPad: number;
  onOpenReader: (book: string, bookName: string, chapter: number) => void;
}

export default function ReadingPlans({ onBack, topPad, onOpenReader }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const progress = bible.readingPlanProgress;
  const activePlan = progress ? READING_PLANS.find(p => p.id === progress.planId) : null;

  const percentComplete = activePlan && progress
    ? Math.round((progress.completedDays.length / activePlan.durationDays) * 100)
    : 0;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Reading Plans</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
        {activePlan && progress ? (
          <>
            <LinearGradient colors={["rgba(46,204,142,0.12)", "rgba(46,204,142,0.03)"]} style={styles.activePlanCard}>
              <View style={styles.activePlanHeader}>
                <Text style={styles.activePlanIcon}>{activePlan.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activePlanName}>{activePlan.name}</Text>
                  <Text style={styles.activePlanDesc}>{progress.completedDays.length} / {activePlan.durationDays} days · {percentComplete}%</Text>
                </View>
                <Pressable onPress={() => Alert.alert("Abandon Plan?", "This will clear your progress.", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Abandon", style: "destructive", onPress: () => bible.abandonPlan() },
                ])}>
                  <Text style={styles.abandonBtn}>✕ Quit</Text>
                </Pressable>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${percentComplete}%` as any }]} />
              </View>
            </LinearGradient>

            <Text style={styles.sectionTitle}>Plan Days</Text>
            {activePlan.days.map(day => {
              const done = progress.completedDays.includes(day.day);
              const expanded = expandedDay === day.day;
              return (
                <View key={day.day} style={[styles.dayCard, done && styles.dayCardDone]}>
                  <Pressable onPress={() => setExpandedDay(expanded ? null : day.day)} style={styles.dayHeader}>
                    <View style={[styles.dayNumCircle, { backgroundColor: done ? colors.green : colors.surface3 }]}>
                      <Text style={[styles.dayNum, { color: done ? "#000" : colors.textMuted }]}>{done ? "✓" : day.day}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.dayTitle, done && { color: colors.textMuted }]}>{day.title}</Text>
                      <Text style={styles.dayReadings}>{day.readings.length} reading{day.readings.length !== 1 ? "s" : ""}</Text>
                    </View>
                    <Text style={{ color: colors.textMuted, fontSize: 12 }}>{expanded ? "▲" : "▼"}</Text>
                  </Pressable>

                  {expanded && (
                    <View style={styles.dayExpanded}>
                      {day.readings.map((r, i) => (
                        <Pressable key={i} onPress={() => onOpenReader(r.bookId, r.bookName, r.chapter)} style={styles.readingRow}>
                          <Text style={styles.readingText}>{r.bookName} {r.chapter}</Text>
                          <Text style={styles.readArrow}>→</Text>
                        </Pressable>
                      ))}
                      {!done && (
                        <Pressable onPress={() => bible.markPlanDay(day.day)} style={styles.markDoneBtn}>
                          <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.markDoneBtnInner}>
                            <Text style={styles.markDoneText}>Mark Day {day.day} Complete</Text>
                          </LinearGradient>
                        </Pressable>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Choose a Reading Plan</Text>
            {READING_PLANS.map(plan => (
              <Pressable key={plan.id} onPress={() => {
                Alert.alert(`Start "${plan.name}"?`, `${plan.durationDays}-day plan. ${plan.desc}`, [
                  { text: "Cancel", style: "cancel" },
                  { text: "Start Plan", onPress: () => bible.startReadingPlan(plan.id) },
                ]);
              }} style={styles.planCard}>
                <Text style={styles.planIcon}>{plan.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDesc}>{plan.desc}</Text>
                  <Text style={styles.planDuration}>{plan.durationDays} days</Text>
                </View>
                <Text style={styles.startArrow}>→</Text>
              </Pressable>
            ))}
          </>
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
  scroll: { paddingHorizontal: 16 },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text, marginBottom: 10, marginTop: 4 },
  activePlanCard: { borderRadius: colors.radius.lg, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.greenGlow },
  activePlanHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  activePlanIcon: { fontSize: 28 },
  activePlanName: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text },
  activePlanDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginTop: 2 },
  abandonBtn: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.red },
  progressBar: { height: 6, borderRadius: 3, backgroundColor: colors.surface3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.green, borderRadius: 3 },
  dayCard: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, marginBottom: 8, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  dayCardDone: { opacity: 0.7 },
  dayHeader: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12 },
  dayNumCircle: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  dayNum: { fontFamily: "Inter_700Bold", fontSize: 12 },
  dayTitle: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text },
  dayReadings: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint, marginTop: 2 },
  dayExpanded: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12, gap: 6 },
  readingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: colors.border },
  readingText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text },
  readArrow: { color: colors.gold, fontSize: 14 },
  markDoneBtn: { marginTop: 8 },
  markDoneBtnInner: { borderRadius: colors.radius.md, paddingVertical: 10, alignItems: "center" },
  markDoneText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  planCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  planIcon: { fontSize: 28 },
  planName: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text },
  planDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, lineHeight: 18, marginTop: 2 },
  planDuration: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold, marginTop: 4 },
  startArrow: { color: colors.textMuted, fontSize: 18 },
});
