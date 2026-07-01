import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";
import colors from "@/constants/colors";
import { BIBLE_BOOKS } from "@/data/bibleBooks";
import { BIBLE_TEXT } from "@/data/bibleText";
import { TranslationId, TRANSLATIONS } from "@/constants/translations";
import { useBible } from "@/context/BibleContext";
import { IconArrowLeft } from "@/components/ui/SvgIcons";

type ResultItem = {
  book: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
};
type SearchMode = "keyword" | "verse";

interface Props {
  onBack: () => void;
  topPad: number;
  onOpenReader: (book: string, bookName: string, chapter: number) => void;
}

/* ----------------------------- Local icons ----------------------------- */

function IconSearch({
  size = 16,
  color = colors.textMuted,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
      <Line
        x1="21"
        y1="21"
        x2="16.2"
        y2="16.2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconClose({
  size = 14,
  color = colors.textMuted,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line
        x1="5"
        y1="5"
        x2="19"
        y2="19"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <Line
        x1="19"
        y1="5"
        x2="5"
        y2="19"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconBookOpen({
  size = 18,
  color = colors.gold,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.5C10.3 5 7.8 4.3 5 4.3c-.6 0-1 .4-1 1v12.4c0 .6.4 1 1 1 2.6 0 5 .7 7 2 2-1.3 4.4-2 7-2 .6 0 1-.4 1-1V5.3c0-.6-.4-1-1-1-2.8 0-5.3.7-7 2.2Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Line
        x1="12"
        y1="6.5"
        x2="12"
        y2="20.7"
        stroke={color}
        strokeWidth={1.6}
      />
    </Svg>
  );
}

function IconBookmark({
  size = 17,
  color = colors.gold,
  filled = false,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3.5h12c.55 0 1 .45 1 1V21l-7-3.6L5 21V4.5c0-.55.45-1 1-1Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </Svg>
  );
}

function IconChevronRight({
  size = 14,
  color = colors.textFaint,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconFeather({
  size = 40,
  color = colors.gold,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 4c-6 0-13 3-15 12-.3 1.4 1.1 2.4 2.3 1.7L20 4Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Line
        x1="4"
        y1="20"
        x2="13"
        y2="11"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/* --------------------------- Bookmark button ---------------------------- */

function BookmarkButton({
  active,
  onPress,
}: {
  active: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.75,
        useNativeDriver: true,
        speed: 30,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
        tension: 160,
      }),
    ]).start();
    onPress();
  };
  return (
    <Pressable onPress={handlePress} hitSlop={10} style={styles.bookmarkBtn}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <IconBookmark
          filled={active}
          color={active ? colors.gold : colors.textFaint}
        />
      </Animated.View>
    </Pressable>
  );
}

/* -------------------------- Highlighted text ---------------------------- */

function HighlightedText({
  text,
  query,
  style,
  highlightStyle,
}: {
  text: string;
  query: string;
  style: any;
  highlightStyle: any;
}) {
  const parts = useMemo(() => {
    const q = query.trim();
    if (!q) return [{ t: text, m: false }];
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${escaped})`, "ig");
    return text
      .split(re)
      .map((chunk) => ({
        t: chunk,
        m: chunk.toLowerCase() === q.toLowerCase(),
      }));
  }, [text, query]);

  return (
    <Text style={style} numberOfLines={4}>
      {parts.map((p, i) =>
        p.m ? (
          <Text key={i} style={highlightStyle}>
            {p.t}
          </Text>
        ) : (
          <Text key={i}>{p.t}</Text>
        ),
      )}
    </Text>
  );
}

/* ------------------------------ Component -------------------------------- */

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

  const [tabWidth, setTabWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const listFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: mode === "keyword" ? 0 : 1,
      useNativeDriver: true,
      friction: 9,
      tension: 90,
    }).start();
  }, [mode, slideAnim]);

  useEffect(() => {
    if (searched && !searching) {
      listFade.setValue(0);
      Animated.timing(listFade, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }).start();
    }
  }, [searched, searching, results, listFade]);

  const handleKeywordSearch = useCallback(() => {
    if (!query.trim() || query.trim().length < 3) return;
    setSearching(true);
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      const found: ResultItem[] = [];
      const store = BIBLE_TEXT[translation];
      for (const bookId of Object.keys(store)) {
        const book = BIBLE_BOOKS.find((b) => b.id === bookId);
        if (!book) continue;
        for (const chNum of Object.keys(store[bookId])) {
          for (const vNum of Object.keys(store[bookId][Number(chNum)])) {
            const text = store[bookId][Number(chNum)][Number(vNum)];
            if (text.toLowerCase().includes(q)) {
              found.push({
                book: bookId,
                bookName: book.name,
                chapter: Number(chNum),
                verse: Number(vNum),
                text,
              });
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
    const book = BIBLE_BOOKS.find(
      (b) =>
        b.name.toLowerCase() === vBook.toLowerCase() ||
        b.abbr.toLowerCase() === vBook.toLowerCase() ||
        b.id === vBook.toLowerCase(),
    );
    if (!book) {
      setResults([]);
      setSearched(true);
      return;
    }
    const ch = Number(vChapter);
    const v = Number(vVerse);
    const store = BIBLE_TEXT[translation];
    if (vVerse) {
      const text = store[book.id]?.[ch]?.[v];
      setResults(
        text
          ? [
              {
                book: book.id,
                bookName: book.name,
                chapter: ch,
                verse: v,
                text,
              },
            ]
          : [],
      );
    } else {
      const chapter = store[book.id]?.[ch];
      if (!chapter) {
        setResults([]);
        setSearched(true);
        return;
      }
      const entries = Object.entries(chapter).map(([vn, t]) => ({
        book: book.id,
        bookName: book.name,
        chapter: ch,
        verse: Number(vn),
        text: t,
      }));
      setResults(entries);
    }
    setSearched(true);
  }, [vBook, vChapter, vVerse, translation]);

  const canSearchKeyword = query.trim().length >= 3;
  const innerTabWidth = tabWidth > 0 ? (tabWidth - 8) / 2 : 0;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <IconArrowLeft size={16} color={colors.textMuted} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View style={styles.headerLabelRow}>
            <IconBookOpen size={13} />
            <Text style={styles.headerLabel}>TOOLS</Text>
          </View>
          <Text style={styles.headerTitle}>Search Scripture</Text>
        </View>
      </View>

      {/* Segmented control */}
      <View
        style={styles.modeTabs}
        onLayout={(e) => setTabWidth(e.nativeEvent.layout.width)}
      >
        {tabWidth > 0 && (
          <Animated.View
            style={[
              styles.modeIndicator,
              {
                width: innerTabWidth,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, innerTabWidth],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={[colors.goldLight, colors.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        )}
        {(["keyword", "verse"] as const).map((m) => (
          <Pressable
            key={m}
            onPress={() => {
              setMode(m);
              setResults([]);
              setSearched(false);
            }}
            style={styles.modeTab}
          >
            <Text
              style={
                mode === m ? styles.modeActiveText : styles.modeInactiveText
              }
            >
              {m === "keyword" ? "Keyword" : "Verse Lookup"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Translation pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.translationScroll}
        contentContainerStyle={styles.translationRow}
      >
        {TRANSLATIONS.map((t) => {
          const active = translation === t.id;
          return (
            <Pressable
              key={t.id}
              onPress={() => setTranslation(t.id as TranslationId)}
              style={[
                styles.transBtn,
                {
                  borderColor: active ? colors.gold : colors.border,
                  backgroundColor: active ? colors.goldGlow : colors.surface2,
                },
              ]}
            >
              <Text
                style={[
                  styles.transBtnText,
                  { color: active ? colors.gold : colors.textMuted },
                ]}
              >
                {t.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {mode === "keyword" ? (
        <View style={styles.searchPillRow}>
          <View style={styles.searchPill}>
            <IconSearch size={16} />
            <TextInput
              style={styles.pillInput}
              placeholder="Search the Bible (min. 3 characters)"
              placeholderTextColor={colors.textFaint}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleKeywordSearch}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable
                onPress={() => {
                  setQuery("");
                  setResults([]);
                  setSearched(false);
                }}
                hitSlop={8}
                style={styles.clearBtn}
              >
                <IconClose />
              </Pressable>
            )}
          </View>
          <Pressable
            onPress={handleKeywordSearch}
            disabled={!canSearchKeyword}
            style={{ opacity: canSearchKeyword ? 1 : 0.45 }}
          >
            <LinearGradient
              colors={[colors.goldLight, colors.gold]}
              style={styles.goBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSearch size={16} color="#000" />
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        <View style={styles.verseRow}>
          <View style={styles.versePill}>
            <TextInput
              style={styles.verseBookInput}
              placeholder="Book · e.g. John"
              placeholderTextColor={colors.textFaint}
              value={vBook}
              onChangeText={setVBook}
            />
            <View style={styles.verseDivider} />
            <TextInput
              style={styles.verseNumInput}
              placeholder="Ch"
              placeholderTextColor={colors.textFaint}
              value={vChapter}
              onChangeText={setVChapter}
              keyboardType="numeric"
            />
            <Text style={styles.verseColon}>:</Text>
            <TextInput
              style={styles.verseNumInput}
              placeholder="V"
              placeholderTextColor={colors.textFaint}
              value={vVerse}
              onChangeText={setVVerse}
              keyboardType="numeric"
            />
          </View>
          <Pressable onPress={handleVerseLookup}>
            <LinearGradient
              colors={[colors.goldLight, colors.gold]}
              style={styles.goBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSearch size={16} color="#000" />
            </LinearGradient>
          </Pressable>
        </View>
      )}

      {searching && (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.gold} />
          <Text style={styles.loadingText}>Searching the Scriptures…</Text>
        </View>
      )}

      {searched && !searching && (
        <View style={styles.resultCountRow}>
          <View style={styles.resultCountDot} />
          <Text style={styles.resultCount}>
            {results.length === 0
              ? "No results found"
              : `${results.length} result${results.length !== 1 ? "s" : ""}${
                  results.length >= 200 ? " · showing first 200" : ""
                }`}
          </Text>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90,
        }}
      >
        {!searched && !searching && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <IconFeather size={30} />
            </View>
            <Text style={styles.emptyTitle}>
              {mode === "keyword"
                ? "Find a word, verse, or theme"
                : "Look up a specific verse"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {mode === "keyword"
                ? "Type at least 3 characters to search across the entire text."
                : "Enter a book, chapter, and optionally a verse to jump right to it."}
            </Text>
          </View>
        )}

        {searched && !searching && results.length === 0 && (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyIconCircle,
                { backgroundColor: colors.surface2 },
              ]}
            >
              <IconClose size={22} color={colors.textFaint} />
            </View>
            <Text style={styles.emptyTitle}>Nothing matched</Text>
            <Text style={styles.emptySubtitle}>
              Try a different word, spelling, or reference.
            </Text>
          </View>
        )}

        <Animated.View style={{ opacity: listFade }}>
          {results.map((r, i) => {
            const isBookmarked = bible.isBookmarked(r.book, r.chapter, r.verse);
            return (
              <Pressable
                key={`${r.book}-${r.chapter}-${r.verse}-${i}`}
                onPress={() => onOpenReader(r.book, r.bookName, r.chapter)}
                style={({ pressed }) => [
                  styles.resultCard,
                  pressed && styles.resultCardPressed,
                ]}
              >
                <View style={styles.resultAccent} />
                <View style={styles.resultBody}>
                  <View style={styles.resultHeader}>
                    <View style={styles.resultRefRow}>
                      <View style={styles.verseBadge}>
                        <Text style={styles.verseBadgeText}>{r.verse}</Text>
                      </View>
                      <Text style={styles.resultRef}>
                        {r.bookName} {r.chapter}:{r.verse}
                      </Text>
                    </View>
                    <View style={styles.resultActions}>
                      <BookmarkButton
                        active={isBookmarked}
                        onPress={() => {
                          if (isBookmarked) {
                            const bm = bible.bookmarks.find(
                              (b) =>
                                b.book === r.book &&
                                b.chapter === r.chapter &&
                                b.verse === r.verse,
                            );
                            if (bm) bible.removeBookmark(bm.id);
                          } else {
                            bible.addBookmark({
                              book: r.book,
                              bookName: r.bookName,
                              chapter: r.chapter,
                              verse: r.verse,
                              text: r.text,
                              translation,
                            });
                          }
                        }}
                      />
                    </View>
                  </View>

                  <HighlightedText
                    text={r.text}
                    query={mode === "keyword" ? query : ""}
                    style={styles.resultText}
                    highlightStyle={styles.resultTextHighlight}
                  />

                  <View style={styles.resultFooter}>
                    <Text style={styles.resultTrans}>
                      {TRANSLATIONS.find((t) => t.id === translation)?.name ??
                        translation}
                    </Text>
                    <IconChevronRight />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </Animated.View>
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
    paddingBottom: 14,
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
  headerLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 2,
  },
  headerLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 23,
    color: colors.text,
    letterSpacing: -0.3,
  },

  modeTabs: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 4,
    borderRadius: colors.radius.full,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
  },
  modeIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: colors.radius.full,
    overflow: "hidden",
  },
  modeTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  modeActiveText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12.5,
    color: "#000",
  },
  modeInactiveText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12.5,
    color: colors.textMuted,
  },

  translationScroll: { marginBottom: 12, flexGrow: 0 },
  translationRow: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 16,
  },
  transBtn: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
  },
  transBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 11.5 },

  searchPillRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: "center",
  },
  searchPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.full,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
    height: "100%",
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  goBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  verseRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: "center",
  },
  versePill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.full,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    gap: 8,
  },
  verseBookInput: {
    flex: 2.4,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
    height: "100%",
  },
  verseDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  verseNumInput: {
    flex: 0.8,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
    height: "100%",
    textAlign: "center",
  },
  verseColon: {
    fontFamily: "Inter_700Bold",
    color: colors.textFaint,
    fontSize: 14,
  },

  loadingWrap: { alignItems: "center", paddingVertical: 26, gap: 8 },
  loadingText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.textMuted,
  },

  resultCountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  resultCountDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.gold,
  },
  resultCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: colors.textMuted,
  },

  scroll: { flex: 1, paddingHorizontal: 16 },

  emptyState: {
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.goldGlow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: colors.text,
    marginBottom: 6,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 19,
  },

  resultCard: {
    flexDirection: "row",
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  resultCardPressed: {
    opacity: 0.75,
  },
  resultAccent: {
    width: 3,
    backgroundColor: colors.gold,
  },
  resultBody: {
    flex: 1,
    padding: 14,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resultRefRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  verseBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.goldGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  verseBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: colors.gold,
  },
  resultRef: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text },
  resultActions: { flexDirection: "row", alignItems: "center" },
  bookmarkBtn: { padding: 2 },
  resultText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 22,
  },
  resultTextHighlight: {
    fontFamily: "Inter_700Bold",
    color: colors.gold,
    backgroundColor: colors.goldGlow,
  },
  resultFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  resultTrans: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9.5,
    color: colors.textFaint,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
