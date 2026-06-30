import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { BIBLE_BOOKS } from "@/data/bibleBooks";
import { BIBLE_TEXT, TRANSLATIONS, TranslationId } from "@/data/bibleText";
import { useBible } from "@/context/BibleContext";

type ResultItem = { book: string; bookName: string; chapter: number; verse: number; text: string };
type SearchMode = "keyword" | "verse";

interface Props {
  onBack: () => void;
  topPad: number;
  onOpenReader: (book: string, bookName: string, chapter: number) => void;
}

export default function BibleSearch({ onBack, topPad, onOpenReader }: Props) {
  const insets = useSafeAreaInsets();
  const bible = useBible();
  const [mode, setMode] = useState<SearchMode>("keyword");
  const [query, setQuery] = useState("");
  const [translation, setTranslation] = useState<TranslationId>("KJV");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [searched, setSearched] = useState(false);

  const [vBook, setVBook] = useState("");
  const [vChapter, setVChapter] = useState("");
  const [vVerse, setVVerse] = useState("");

  const handleKeywordSearch = useCallback(() => {
    if (!query.trim() || query.trim().length < 3) return;
    setSearching(true);
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      const found: ResultItem[] = [];
      const store = BIBLE_TEXT[translation];
      for (const bookId of Object.keys(store)) {
        const book = BIBLE_BOOKS.find(b => b.id === bookId);
        if (!book) continue;
        for (const chNum of Object.keys(store[bookId])) {
          for (const vNum of Object.keys(store[bookId][Number(chNum)])) {
            const text = store[bookId][Number(chNum)][Number(vNum)];
            if (text.toLowerCase().includes(q)) {
              found.push({ book: bookId, bookName: book.name, chapter: Number(chNum), verse: Number(vNum), text });
              if (found.length >= 200) break;
            }
          }
          if (found.length >= 200) break;
        }
        if (found.length >= 200) break;
      }
      setResults(found);
      setSearched(true);
      setSearching(false);
    }, 50);
  }, [query, translation]);

  const handleVerseLookup = useCallback(() => {
    const book = BIBLE_BOOKS.find(b => b.name.toLowerCase() === vBook.toLowerCase() || b.abbr.toLowerCase() === vBook.toLowerCase() || b.id === vBook.toLowerCase());
    if (!book) { setResults([]); setSearched(true); return; }
    const ch = Number(vChapter);
    const v = Number(vVerse);
    const store = BIBLE_TEXT[translation];
    if (vVerse) {
      const text = store[book.id]?.[ch]?.[v];
      setResults(text ? [{ book: book.id, bookName: book.name, chapter: ch, verse: v, text }] : []);
    } else {
      const chapter = store[book.id]?.[ch];
      if (!chapter) { setResults([]); setSearched(true); return; }
      const entries = Object.entries(chapter).map(([vn, t]) => ({ book: book.id, bookName: book.name, chapter: ch, verse: Number(vn), text: t }));
      setResults(entries);
    }
    setSearched(true);
  }, [vBook, vChapter, vVerse, translation]);

  const highlighted = useCallback((text: string) => {
    if (!query.trim()) return text;
    return text;
  }, [query]);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>TOOLS</Text>
          <Text style={styles.headerTitle}>Bible Search</Text>
        </View>
      </View>

      <View style={styles.modeTabs}>
        {(["keyword", "verse"] as const).map(m => (
          <Pressable key={m} onPress={() => { setMode(m); setResults([]); setSearched(false); }} style={styles.modeTab}>
            {mode === m ? (
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.modeActive}>
                <Text style={styles.modeActiveText}>{m === "keyword" ? "Keyword Search" : "Verse Lookup"}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.modeInactive}>
                <Text style={styles.modeInactiveText}>{m === "keyword" ? "Keyword Search" : "Verse Lookup"}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.translationRow}>
        {TRANSLATIONS.map(t => (
          <Pressable key={t.id} onPress={() => setTranslation(t.id as TranslationId)}
            style={[styles.transBtn, { borderColor: translation === t.id ? colors.gold : colors.border, backgroundColor: translation === t.id ? colors.goldGlow : colors.surface2 }]}>
            <Text style={[styles.transBtnText, { color: translation === t.id ? colors.gold : colors.textMuted }]}>{t.id}</Text>
          </Pressable>
        ))}
      </View>

      {mode === "keyword" ? (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Search the Bible (min. 3 chars)..."
            placeholderTextColor={colors.textFaint}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleKeywordSearch}
            returnKeyType="search"
          />
          <Pressable onPress={handleKeywordSearch} style={styles.searchBtn}>
            <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.searchBtnInner}>
              <Text style={styles.searchBtnText}>Go</Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        <View style={styles.verseRow}>
          <TextInput style={[styles.input, { flex: 3 }]} placeholder="Book (e.g. John)" placeholderTextColor={colors.textFaint} value={vBook} onChangeText={setVBook} />
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="Ch" placeholderTextColor={colors.textFaint} value={vChapter} onChangeText={setVChapter} keyboardType="numeric" />
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="V" placeholderTextColor={colors.textFaint} value={vVerse} onChangeText={setVVerse} keyboardType="numeric" />
          <Pressable onPress={handleVerseLookup} style={styles.searchBtn}>
            <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.searchBtnInner}>
              <Text style={styles.searchBtnText}>Go</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}

      {searching && <ActivityIndicator color={colors.gold} style={{ marginTop: 20 }} />}

      {searched && !searching && (
        <Text style={styles.resultCount}>
          {results.length === 0 ? "No results found" : `${results.length} result${results.length !== 1 ? "s" : ""}${results.length >= 200 ? " (limit 200)" : ""}`}
        </Text>
      )}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90 }}
      >
        {results.map((r, i) => {
          const isBookmarked = bible.isBookmarked(r.book, r.chapter, r.verse);
          return (
            <Pressable key={i} onPress={() => onOpenReader(r.book, r.bookName, r.chapter)} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultRef}>{r.bookName} {r.chapter}:{r.verse}</Text>
                <Pressable onPress={() => {
                  if (isBookmarked) {
                    const bm = bible.bookmarks.find(b => b.book === r.book && b.chapter === r.chapter && b.verse === r.verse);
                    if (bm) bible.removeBookmark(bm.id);
                  } else {
                    bible.addBookmark({ book: r.book, bookName: r.bookName, chapter: r.chapter, verse: r.verse, text: r.text, translation });
                  }
                }}>
                  <Text style={{ fontSize: 16, opacity: isBookmarked ? 1 : 0.4 }}>🔖</Text>
                </Pressable>
              </View>
              <Text style={styles.resultText} numberOfLines={4}>{r.text}</Text>
              <Text style={styles.resultTrans}>{translation}</Text>
            </Pressable>
          );
        })}
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
  modeTabs: { flexDirection: "row", gap: 8, paddingHorizontal: 16, marginBottom: 10 },
  modeTab: { flex: 1 },
  modeActive: { borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center" },
  modeActiveText: { fontFamily: "Inter_700Bold", fontSize: 12, color: "#000" },
  modeInactive: { borderRadius: colors.radius.md, paddingVertical: 9, alignItems: "center", backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border },
  modeInactiveText: { fontFamily: "Inter_500Medium", fontSize: 12, color: colors.textMuted },
  translationRow: { flexDirection: "row", gap: 6, paddingHorizontal: 16, marginBottom: 10 },
  transBtn: { borderRadius: colors.radius.full, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  transBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  inputRow: { flexDirection: "row", gap: 8, paddingHorizontal: 16, marginBottom: 8 },
  verseRow: { flexDirection: "row", gap: 6, paddingHorizontal: 16, marginBottom: 8 },
  input: { flex: 1, backgroundColor: colors.surface2, borderRadius: colors.radius.md, paddingHorizontal: 12, paddingVertical: 10, fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border },
  searchBtn: { alignSelf: "stretch" },
  searchBtnInner: { borderRadius: colors.radius.md, paddingHorizontal: 16, height: "100%", alignItems: "center", justifyContent: "center" },
  searchBtnText: { fontFamily: "Inter_700Bold", fontSize: 13, color: "#000" },
  resultCount: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.textMuted, paddingHorizontal: 16, marginBottom: 8 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  resultCard: { backgroundColor: colors.surface2, borderRadius: colors.radius.md, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  resultHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  resultRef: { fontFamily: "Inter_700Bold", fontSize: 12, color: colors.gold },
  resultText: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text, lineHeight: 21 },
  resultTrans: { fontFamily: "Inter_400Regular", fontSize: 10, color: colors.textFaint, marginTop: 4 },
});
