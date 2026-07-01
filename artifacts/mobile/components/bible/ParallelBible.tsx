import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { BIBLE_BOOKS } from "@/data/bibleBooks";
import { BIBLE_TEXT, getChapter } from "@/data/bibleText";
import { TranslationId, TRANSLATIONS } from "@/constants/translations";
import { IconArrowLeft } from "@/components/ui/SvgIcons";

interface Props {
  onBack: () => void;
  topPad: number;
}

export default function ParallelBible({ onBack, topPad }: Props) {
  const insets = useSafeAreaInsets();
  const [leftTrans, setLeftTrans] = useState<TranslationId>("KJV");
  const [rightTrans, setRightTrans] = useState<TranslationId>("ASV");
  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [pickerMode, setPickerMode] = useState<"book" | "chapter" | null>(null);

  const leftVerses = useMemo(() => {
    const ch = getChapter(leftTrans, selectedBook.id, selectedChapter);
    return ch
      ? Object.entries(ch)
          .map(([v, t]) => ({ v: Number(v), t }))
          .sort((a, b) => a.v - b.v)
      : [];
  }, [leftTrans, selectedBook, selectedChapter]);

  const rightVerses = useMemo(() => {
    const ch = getChapter(rightTrans, selectedBook.id, selectedChapter);
    return ch
      ? Object.entries(ch)
          .map(([v, t]) => ({ v: Number(v), t }))
          .sort((a, b) => a.v - b.v)
      : [];
  }, [rightTrans, selectedBook, selectedChapter]);

  const allVerseNums = useMemo(() => {
    const nums = new Set([
      ...leftVerses.map((v) => v.v),
      ...rightVerses.map((v) => v.v),
    ]);
    return Array.from(nums).sort((a, b) => a - b);
  }, [leftVerses, rightVerses]);

  const leftMap = useMemo(
    () => Object.fromEntries(leftVerses.map((v) => [v.v, v.t])),
    [leftVerses],
  );
  const rightMap = useMemo(
    () => Object.fromEntries(rightVerses.map((v) => [v.v, v.t])),
    [rightVerses],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <IconArrowLeft size={16} color={colors.textMuted} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Parallel Bible</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={() => setPickerMode("book")}
          style={styles.bookPicker}
        >
          <Text style={styles.bookPickerText}>{selectedBook.name}</Text>
          <Text style={styles.bookPickerIcon}>▾</Text>
        </Pressable>
        <Pressable
          onPress={() => setPickerMode("chapter")}
          style={styles.chapterPicker}
        >
          <Text style={styles.chapterPickerText}>Ch {selectedChapter}</Text>
          <Text style={styles.bookPickerIcon}>▾</Text>
        </Pressable>
      </View>

      {pickerMode === "book" && (
        <View style={styles.pickerSheet}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 42 }}
          >
            {BIBLE_BOOKS.map((b) => (
              <Pressable
                key={b.id}
                onPress={() => {
                  setSelectedBook(b);
                  setSelectedChapter(1);
                  setPickerMode(null);
                }}
                style={[
                  styles.pickerItem,
                  b.id === selectedBook.id && styles.pickerItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    b.id === selectedBook.id && { color: colors.gold },
                  ]}
                >
                  {b.abbr}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {pickerMode === "chapter" && (
        <View style={styles.pickerSheet}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 42 }}
          >
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(
              (ch) => (
                <Pressable
                  key={ch}
                  onPress={() => {
                    setSelectedChapter(ch);
                    setPickerMode(null);
                  }}
                  style={[
                    styles.pickerItem,
                    ch === selectedChapter && styles.pickerItemActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      ch === selectedChapter && { color: colors.gold },
                    ]}
                  >
                    {ch}
                  </Text>
                </Pressable>
              ),
            )}
          </ScrollView>
        </View>
      )}

      <View style={styles.transRow}>
        {TRANSLATIONS.map((t) => (
          <Pressable
            key={`l-${t.id}`}
            onPress={() => setLeftTrans(t.id as TranslationId)}
            style={[
              styles.transBtn,
              leftTrans === t.id && {
                backgroundColor: colors.goldGlow,
                borderColor: colors.gold,
              },
            ]}
          >
            <Text
              style={[
                styles.transBtnText,
                { color: leftTrans === t.id ? colors.gold : colors.textMuted },
              ]}
            >
              ← {t.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.transRow}>
        {TRANSLATIONS.map((t) => (
          <Pressable
            key={`r-${t.id}`}
            onPress={() => setRightTrans(t.id as TranslationId)}
            style={[
              styles.transBtn,
              rightTrans === t.id && {
                backgroundColor: colors.blueGlow,
                borderColor: colors.blue,
              },
            ]}
          >
            <Text
              style={[
                styles.transBtnText,
                { color: rightTrans === t.id ? colors.blue : colors.textMuted },
              ]}
            >
              {t.name} →
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.colHeaders}>
        <View style={[styles.colHeader, { backgroundColor: colors.goldGlow }]}>
          <Text style={[styles.colHeaderText, { color: colors.gold }]}>
            {TRANSLATIONS.find((t) => t.id === leftTrans)?.name ?? leftTrans}
          </Text>
        </View>
        <View style={[styles.colHeader, { backgroundColor: colors.blueGlow }]}>
          <Text style={[styles.colHeaderText, { color: colors.blue }]}>
            {TRANSLATIONS.find((t) => t.id === rightTrans)?.name ?? rightTrans}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90,
          paddingHorizontal: 8,
        }}
      >
        {allVerseNums.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No text available for this chapter in the selected translations.
            </Text>
          </View>
        ) : (
          allVerseNums.map((vNum) => (
            <View key={vNum} style={styles.verseRow}>
              <View style={styles.verseNumWrap}>
                <Text style={styles.verseNum}>{vNum}</Text>
              </View>
              <Text style={styles.leftText}>{leftMap[vNum] ?? "—"}</Text>
              <View style={styles.divider} />
              <Text style={styles.rightText}>{rightMap[vNum] ?? "—"}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 10,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: colors.text,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  bookPicker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bookPickerText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: colors.text,
  },
  bookPickerIcon: { color: colors.textMuted, fontSize: 12 },
  chapterPicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chapterPickerText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: colors.text,
  },
  pickerSheet: { paddingHorizontal: 16, marginBottom: 8 },
  pickerItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: colors.radius.sm,
    marginRight: 4,
    backgroundColor: colors.surface2,
  },
  pickerItemActive: { backgroundColor: colors.goldGlow },
  pickerItemText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: colors.textMuted,
  },
  transRow: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  transBtn: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: colors.radius.sm,
    alignItems: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 10 },
  colHeaders: {
    flexDirection: "row",
    marginHorizontal: 8,
    marginBottom: 4,
    gap: 4,
  },
  colHeader: {
    flex: 1,
    borderRadius: colors.radius.sm,
    paddingVertical: 5,
    alignItems: "center",
  },
  colHeaderText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  verseRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
    gap: 6,
  },
  verseNumWrap: { width: 18 },
  verseNum: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    color: colors.gold,
    marginTop: 3,
  },
  leftText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.text,
    lineHeight: 20,
  },
  divider: { width: 1, backgroundColor: colors.border },
  rightText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.text,
    lineHeight: 20,
  },
  empty: { paddingVertical: 40, alignItems: "center" },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
  },
});
