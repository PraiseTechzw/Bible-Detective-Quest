import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { MEMORY_VERSES } from "@/data/bibleTools";
import { getPassageText } from "@/data/bibleText";
import { useBible, MemoryVerseStatus } from "@/context/BibleContext";

type Mode = "library" | "practice";

interface Props { onBack: () => void; topPad: number; }

export default function MemoryVerses({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const [mode, setMode] = useState<Mode>("library");
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);

  const myVerses = bible.memoryVerses;
  const forPractice = myVerses.filter(v => v.status !== "mastered");

  const practicableVerse = forPractice[practiceIdx % Math.max(1, forPractice.length)];

  const handleStatus = (ref: string, status: MemoryVerseStatus) => {
    bible.updateMemoryVerseStatus(ref, status);
    if (practiceIdx + 1 >= forPractice.length) {
      setPracticeDone(true);
    } else {
      setPracticeIdx(i => i + 1);
      setRevealed(false);
    }
  };

  const statusColor: Record<MemoryVerseStatus, string> = {
    new: colors.textFaint,
    learning: colors.blue,
    reviewing: colors.amber,
    mastered: colors.green,
  };
  const statusIcon: Record<MemoryVerseStatus, string> = {
    new: "🆕", learning: "📖", reviewing: "🔄", mastered: "✅",
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Memory Verses</Text>
        </View>
      </View>

      <View style={styles.modeTabs}>
        {(["library", "practice"] as const).map(m => (
          <Pressable key={m} onPress={() => { setMode(m); setPracticeIdx(0); setRevealed(false); setPracticeDone(false); }} style={styles.modeTab}>
            {mode === m ? (
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.modeActive}>
                <Text style={styles.modeActiveText}>{m === "library" ? "📚 Library" : "🧠 Practice"}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.modeInactive}>
                <Text style={styles.modeInactiveText}>{m === "library" ? "📚 Library" : "🧠 Practice"}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {mode === "library" && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
          <Text style={styles.sectionLabel}>Suggested Verses ({MEMORY_VERSES.length})</Text>
          {MEMORY_VERSES.map(v => {
            const added = myVerses.find(m => m.ref === v.ref);
            const liveText = getPassageText("KJV", v.ref) ?? v.text;
            return (
              <View key={v.ref} style={styles.verseCard}>
                <View style={styles.verseHeader}>
                  <Text style={styles.verseRef}>{v.ref}</Text>
                  <Text style={styles.verseCategory}>{v.category}</Text>
                </View>
                <Text style={styles.verseText} numberOfLines={3}>{liveText}</Text>
                <View style={styles.verseActions}>
                  {added ? (
                    <View style={styles.statusRow}>
                      <Text style={{ fontSize: 14 }}>{statusIcon[added.status]}</Text>
                      <Text style={[styles.statusText, { color: statusColor[added.status] }]}>{added.status}</Text>
                      <Pressable onPress={() => bible.removeMemoryVerse(v.ref)}>
                        <Text style={styles.removeBtn}>Remove</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => bible.addMemoryVerse(v.ref, liveText)} style={styles.addBtn}>
                      <Text style={styles.addBtnText}>+ Add to My List</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      {mode === "practice" && (
        <ScrollView contentContainerStyle={[styles.practiceScroll, { paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }]}>
          {forPractice.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🧠</Text>
              <Text style={styles.emptyTitle}>No Verses to Practice</Text>
              <Text style={styles.emptyDesc}>Add verses from the Library tab. Mastered verses won't appear here.</Text>
            </View>
          ) : practiceDone ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyTitle}>Session Complete!</Text>
              <Text style={styles.emptyDesc}>You reviewed {forPractice.length} verse{forPractice.length !== 1 ? "s" : ""}. Keep it up!</Text>
              <Pressable onPress={() => { setPracticeIdx(0); setRevealed(false); setPracticeDone(false); }} style={styles.addBtn}>
                <Text style={styles.addBtnText}>Practice Again</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.practiceProgress}>{practiceIdx % forPractice.length + 1} of {forPractice.length}</Text>
              <LinearGradient colors={["rgba(212,150,42,0.1)", "rgba(212,150,42,0.03)"]} style={styles.practiceCard}>
                <Text style={styles.practiceRef}>{practicableVerse.ref}</Text>
                {revealed ? (
                  <Text style={styles.practiceVerseText}>{getPassageText("KJV", practicableVerse.ref) ?? practicableVerse.text}</Text>
                ) : (
                  <Pressable onPress={() => setRevealed(true)} style={styles.revealBtn}>
                    <Text style={styles.revealBtnText}>Tap to reveal verse</Text>
                  </Pressable>
                )}
              </LinearGradient>

              {revealed && (
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>How well did you know it?</Text>
                  <View style={styles.ratingBtns}>
                    <Pressable onPress={() => handleStatus(practicableVerse.ref, "learning")} style={[styles.ratingBtn, { borderColor: colors.red }]}>
                      <Text style={[styles.ratingBtnText, { color: colors.red }]}>Still Learning</Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus(practicableVerse.ref, "reviewing")} style={[styles.ratingBtn, { borderColor: colors.amber }]}>
                      <Text style={[styles.ratingBtnText, { color: colors.amber }]}>Almost</Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus(practicableVerse.ref, "mastered")} style={[styles.ratingBtn, { borderColor: colors.green }]}>
                      <Text style={[styles.ratingBtnText, { color: colors.green }]}>Mastered!</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
      )}
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
  modeTabs: { flexDirection: "row", gap: 8, paddingHorizontal: 16, marginBottom: 10 },
  modeTab: { flex: 1 },
  modeActive: { borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center" },
  modeActiveText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  modeInactive: { borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center", backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border },
  modeInactiveText: { fontFamily: "Inter_500Medium", fontSize: 13, color: colors.textMuted },
  list: { paddingHorizontal: 16 },
  sectionLabel: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text, marginBottom: 10 },
  verseCard: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 13, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  verseHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  verseRef: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.gold },
  verseCategory: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint, backgroundColor: colors.surface3, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  verseText: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text, lineHeight: 20, marginBottom: 8 },
  verseActions: {},
  statusRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusText: { fontFamily: "Inter_600SemiBold", fontSize: 11, flex: 1 },
  removeBtn: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textFaint },
  addBtn: { alignSelf: "flex-start", borderRadius: colors.radius.sm, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.goldGlow, borderWidth: 1, borderColor: colors.goldBorder },
  addBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.gold },
  practiceScroll: { paddingHorizontal: 16, paddingTop: 8 },
  practiceProgress: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, marginBottom: 12, textAlign: "center" },
  practiceCard: { borderRadius: colors.radius.lg, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: colors.goldBorder, alignItems: "center", gap: 16, minHeight: 200, justifyContent: "center" },
  practiceRef: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.gold },
  practiceVerseText: { fontFamily: "Inter_400Regular", fontSize: 16, color: colors.text, lineHeight: 28, textAlign: "center", fontStyle: "italic" },
  revealBtn: { borderRadius: colors.radius.md, paddingVertical: 12, paddingHorizontal: 20, backgroundColor: colors.surface3, borderWidth: 1, borderColor: colors.border },
  revealBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.textMuted },
  ratingRow: { gap: 10 },
  ratingLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text, textAlign: "center" },
  ratingBtns: { flexDirection: "row", gap: 8 },
  ratingBtn: { flex: 1, borderRadius: colors.radius.md, paddingVertical: 11, alignItems: "center", borderWidth: 1, backgroundColor: colors.surface2 },
  ratingBtnText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  empty: { alignItems: "center", paddingVertical: 50, gap: 10 },
  emptyIcon: { fontSize: 36 },
  emptyTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text },
  emptyDesc: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.textMuted, textAlign: "center", lineHeight: 20 },
});
