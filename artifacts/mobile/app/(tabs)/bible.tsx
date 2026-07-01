import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import {
  OT_BOOKS,
  NT_BOOKS,
  OT_CATEGORIES,
  NT_CATEGORIES,
  BibleBook,
  VERSE_COUNTS,
} from "@/data/bibleBooks";
import { BIBLE_TEXT, getChapter, hasChapter } from "@/data/bibleText";
import {
  IconBookOpen,
  IconArrowLeft,
  IconArrowRight,
  IconInfo,
  IconScroll,
} from "@/components/ui/SvgIcons";
import { TranslationId, TRANSLATIONS } from "@/constants/translations";

type View = "home" | "chapters" | "reader";

function getBooksForCategory(books: BibleBook[], category: string) {
  return books.filter((b) => b.category === category);
}

function TranslationBadge({
  id,
  active,
  onPress,
}: {
  id: TranslationId;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      {active ? (
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          style={tlStyles.active}
        >
          <Text style={tlStyles.activeText}>{id}</Text>
        </LinearGradient>
      ) : (
        <View style={tlStyles.inactive}>
          <Text style={tlStyles.inactiveText}>{id}</Text>
        </View>
      )}
    </Pressable>
  );
}
const tlStyles = StyleSheet.create({
  active: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeText: { fontFamily: "Inter_700Bold", fontSize: 11, color: "#000" },
  inactive: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.surface3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inactiveText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: colors.textMuted,
  },
});

function BookCard({ book, onPress }: { book: BibleBook; onPress: () => void }) {
  const hasContent = !!BIBLE_TEXT.KJV[book.id];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [bkStyles.wrap, { opacity: pressed ? 0.8 : 1 }]}
    >
      <LinearGradient
        colors={
          hasContent
            ? ["rgba(212,150,42,0.1)", "rgba(212,150,42,0.03)"]
            : [colors.surface2, colors.surface1]
        }
        style={[
          bkStyles.card,
          { borderColor: hasContent ? colors.goldBorder : colors.border },
        ]}
      >
        <Text
          style={[
            bkStyles.abbr,
            { color: hasContent ? colors.gold : colors.textMuted },
          ]}
          numberOfLines={1}
        >
          {book.abbr}
        </Text>
        <Text
          style={[
            bkStyles.name,
            { color: hasContent ? colors.text : colors.textMuted },
          ]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {book.name}
        </Text>
        <Text style={bkStyles.meta}>{book.chapters} ch</Text>
        {book.gameCases && (
          <View style={bkStyles.gamePip}>
            <Text style={bkStyles.gamePipText}>IN GAME</Text>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
}
const bkStyles = StyleSheet.create({
  wrap: { width: "31%", marginBottom: 8 },
  card: {
    borderRadius: colors.radius.md,
    paddingHorizontal: 6,
    paddingVertical: 8,
    alignItems: "center",
    gap: 2,
    borderWidth: 1,
    height: 88,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  abbr: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    width: "100%",
    textAlign: "center",
  },
  name: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    textAlign: "center",
    lineHeight: 13,
    width: "100%",
  },
  meta: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    color: colors.textFaint,
  },
  gamePip: {
    position: "absolute",
    top: 3,
    right: 3,
    backgroundColor: colors.gold,
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  gamePipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 6,
    color: "#000",
    letterSpacing: 0.3,
  },
});

function ChapterButton({
  num,
  hasText,
  onPress,
}: {
  num: number;
  hasText: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [chStyles.wrap, { opacity: pressed ? 0.8 : 1 }]}
    >
      {hasText ? (
        <LinearGradient
          colors={["rgba(212,150,42,0.15)", "rgba(212,150,42,0.05)"]}
          style={[chStyles.btn, { borderColor: colors.goldBorder }]}
        >
          <Text style={[chStyles.num, { color: colors.gold }]}>{num}</Text>
        </LinearGradient>
      ) : (
        <View
          style={[
            chStyles.btn,
            { borderColor: colors.border, backgroundColor: colors.surface2 },
          ]}
        >
          <Text style={[chStyles.num, { color: colors.textMuted }]}>{num}</Text>
        </View>
      )}
    </Pressable>
  );
}
const chStyles = StyleSheet.create({
  wrap: { width: "18%", marginBottom: 8 },
  btn: {
    borderRadius: colors.radius.sm,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  num: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
});

function VerseRow({
  num,
  text,
  translation,
  fontSize,
}: {
  num: number;
  text: string;
  translation: TranslationId;
  fontSize: number;
}) {
  return (
    <View style={vrStyles.row}>
      <Text style={vrStyles.num}>{num}</Text>
      <Text style={[vrStyles.text, { fontSize }]}>{text}</Text>
    </View>
  );
}
const vrStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  num: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: colors.gold,
    minWidth: 22,
    textAlign: "right",
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    color: colors.text,
    lineHeight: 26,
  },
});

export default function BibleScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const [view, setView] = useState<View>("home");
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [translation, setTranslation] = useState<TranslationId>("KJV");
  const [testament, setTestament] = useState<"OT" | "NT">("OT");
  const [fontSize, setFontSize] = useState(15);
  const [search, setSearch] = useState("");

  const filteredBooks = useMemo(() => {
    const base = testament === "OT" ? OT_BOOKS : NT_BOOKS;
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.abbr.toLowerCase().includes(q),
    );
  }, [testament, search]);

  const openBook = useCallback((book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setView("chapters");
  }, []);

  const openChapter = useCallback((ch: number) => {
    setSelectedChapter(ch);
    setView("reader");
  }, []);

  const chapterVerses = useMemo(() => {
    if (!selectedBook) return null;
    return getChapter(translation, selectedBook.id, selectedChapter);
  }, [selectedBook, selectedChapter, translation]);

  const verseCount = useMemo(() => {
    if (!selectedBook) return 0;
    const counts = VERSE_COUNTS[selectedBook.id];
    return counts ? (counts[selectedChapter - 1] ?? 0) : 0;
  }, [selectedBook, selectedChapter]);

  const verseEntries = useMemo(() => {
    if (!chapterVerses) return [];
    return Object.entries(chapterVerses)
      .map(([v, t]) => ({ verse: Number(v), text: t }))
      .sort((a, b) => a.verse - b.verse);
  }, [chapterVerses]);

  const totalChapters = selectedBook?.chapters ?? 0;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0A0D1A", "#070A13"]}
        style={StyleSheet.absoluteFill}
      />

      {view === "home" && (
        <>
          <View style={[styles.header, { paddingTop: topPad + 8 }]}>
            <Text style={styles.headerLabel}>
              OFFLINE · KJV · WEB · ASV · SHONA
            </Text>
            <Text style={styles.headerTitle}>Bible</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
              contentContainerStyle={styles.translationRow}
            >
              {TRANSLATIONS.map((t) => (
                <TranslationBadge
                  key={t.id}
                  id={t.id as TranslationId}
                  active={translation === t.id}
                  onPress={() => setTranslation(t.id as TranslationId)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.searchWrap}>
            <View style={styles.searchBox}>
              <IconBookOpen size={15} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search book name..."
                placeholderTextColor={colors.textFaint}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>

          <View style={styles.testamentTabs}>
            {(["OT", "NT"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTestament(t)}
                style={styles.testamentTab}
              >
                {testament === t ? (
                  <LinearGradient
                    colors={[colors.goldLight, colors.gold]}
                    style={styles.testamentActive}
                  >
                    <Text style={styles.testamentActiveText}>
                      {t === "OT" ? "Old Testament" : "New Testament"}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.testamentInactive}>
                    <Text style={styles.testamentInactiveText}>
                      {t === "OT" ? "Old Testament" : "New Testament"}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90,
            }}
          >
            {(testament === "OT" ? OT_CATEGORIES : NT_CATEGORIES).map(
              (category) => {
                const books = getBooksForCategory(filteredBooks, category);
                if (books.length === 0) return null;
                return (
                  <View key={category} style={styles.categorySection}>
                    <View style={styles.categoryHeader}>
                      <View style={styles.categoryAccent} />
                      <Text style={styles.categoryTitle}>{category}</Text>
                      <Text style={styles.categoryCount}>
                        {books.length} books
                      </Text>
                    </View>
                    <View style={styles.bookGrid}>
                      {books.map((b) => (
                        <BookCard
                          key={b.id}
                          book={b}
                          onPress={() => openBook(b)}
                        />
                      ))}
                    </View>
                  </View>
                );
              },
            )}

            <LinearGradient
              colors={["rgba(212,150,42,0.08)", "rgba(212,150,42,0.02)"]}
              style={styles.infoCard}
            >
              <View
                style={[
                  styles.infoCardBorder,
                  { borderColor: colors.goldBorder },
                ]}
              />
              <IconInfo size={16} color={colors.gold} />
              <Text style={styles.infoText}>
                <Text
                  style={{ color: colors.gold, fontFamily: "Inter_700Bold" }}
                >
                  KJV, WEB & ASV
                </Text>
                {" are public domain. "}
                <Text
                  style={{ color: colors.gold, fontFamily: "Inter_700Bold" }}
                >
                  SHONA
                </Text>
                {
                  " (Open Shona Contemporary Bible) is CC BY-SA 4.0 — bundled with attribution. All four are fully offline. NIV, ESV, NKJV & NLT require a licence and cannot be bundled."
                }
              </Text>
            </LinearGradient>
          </ScrollView>
        </>
      )}

      {view === "chapters" && selectedBook && (
        <>
          <View style={[styles.header, { paddingTop: topPad + 8 }]}>
            <Pressable onPress={() => setView("home")} style={styles.backBtn}>
              <IconArrowLeft size={18} color={colors.textMuted} />
            </Pressable>
            <View style={styles.headerCenter}>
              <Text style={styles.headerLabel}>
                {selectedBook.testament} · {selectedBook.category}
              </Text>
              <Text style={styles.headerTitle}>{selectedBook.name}</Text>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90,
            }}
          >
            <View style={styles.chapterGrid}>
              {Array.from(
                { length: selectedBook.chapters },
                (_, i) => i + 1,
              ).map((ch) => (
                <ChapterButton
                  key={ch}
                  num={ch}
                  hasText={hasChapter(translation, selectedBook.id, ch)}
                  onPress={() => openChapter(ch)}
                />
              ))}
            </View>

            {!BIBLE_TEXT.KJV[selectedBook.id] && (
              <LinearGradient
                colors={[colors.surface2, colors.surface1]}
                style={styles.noTextCard}
              >
                <View
                  style={[styles.noTextBorder, { borderColor: colors.border }]}
                />
                <IconScroll size={28} color={colors.textFaint} />
                <Text style={styles.noTextTitle}>Full text coming soon</Text>
                <Text style={styles.noTextBody}>
                  {selectedBook.name} will be included in a future update. The
                  game cases reference Genesis, which has full inline text.
                  Meanwhile, all {selectedBook.chapters} chapter navigation is
                  available.
                </Text>
              </LinearGradient>
            )}
          </ScrollView>
        </>
      )}

      {view === "reader" && selectedBook && (
        <>
          <View style={[styles.header, { paddingTop: topPad + 8 }]}>
            <Pressable
              onPress={() => setView("chapters")}
              style={styles.backBtn}
            >
              <IconArrowLeft size={18} color={colors.textMuted} />
            </Pressable>
            <View style={styles.headerCenter}>
              <Text style={styles.headerLabel}>
                {selectedBook.name.toUpperCase()}
              </Text>
              <Text style={styles.readerChapterTitle}>
                Chapter {selectedChapter}
              </Text>
            </View>
          </View>

          <View style={styles.readerControls}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.translationRow}
            >
              {TRANSLATIONS.map((t) => (
                <TranslationBadge
                  key={t.id}
                  id={t.id as TranslationId}
                  active={translation === t.id}
                  onPress={() => setTranslation(t.id as TranslationId)}
                />
              ))}
            </ScrollView>
            <View style={styles.fontControls}>
              <Pressable
                onPress={() => setFontSize((f) => Math.max(12, f - 1))}
                style={styles.fontBtn}
              >
                <Text style={styles.fontBtnText}>A−</Text>
              </Pressable>
              <Pressable
                onPress={() => setFontSize((f) => Math.min(22, f + 1))}
                style={styles.fontBtn}
              >
                <Text style={styles.fontBtnTextLg}>A+</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 90,
            }}
          >
            <LinearGradient
              colors={["rgba(212,150,42,0.06)", "transparent"]}
              style={styles.chapterHeading}
            >
              <Text style={styles.chapterHeadingText}>
                {selectedBook.name} {selectedChapter}
              </Text>
              <Text style={styles.chapterTranslationLabel}>
                {translation} ·{" "}
                {TRANSLATIONS.find((t) => t.id === translation)?.year}
              </Text>
            </LinearGradient>

            {verseEntries.length > 0 ? (
              verseEntries.map(({ verse, text }) => (
                <VerseRow
                  key={verse}
                  num={verse}
                  text={text}
                  translation={translation}
                  fontSize={fontSize}
                />
              ))
            ) : (
              <View style={styles.noVerseWrap}>
                <IconScroll size={36} color={colors.textFaint} />
                <Text style={styles.noVerseTitle}>
                  {selectedBook.name} {selectedChapter}
                </Text>
                <Text style={styles.noVerseBody}>
                  Full verse text for this chapter is not yet bundled in this
                  translation.
                  {"\n\n"}Switch to{" "}
                  <Text style={{ color: colors.gold }}>KJV</Text> or{" "}
                  <Text style={{ color: colors.gold }}>SHONA</Text> to read
                  chapters that power Bible Detective game cases (Genesis 1,
                  3–4, 25–27, 37).
                </Text>
                {verseCount > 0 && (
                  <Text style={styles.noVerseCount}>
                    {verseCount} verses in this chapter
                  </Text>
                )}
              </View>
            )}
          </ScrollView>

          <View
            style={[
              styles.chapterNav,
              {
                paddingBottom: Platform.OS === "web" ? 10 : insets.bottom + 70,
              },
            ]}
          >
            <Pressable
              onPress={() =>
                selectedChapter > 1 && setSelectedChapter((c) => c - 1)
              }
              style={[
                styles.navBtn,
                { opacity: selectedChapter <= 1 ? 0.3 : 1 },
              ]}
            >
              <LinearGradient
                colors={[colors.surface2, colors.surface1]}
                style={styles.navBtnInner}
              >
                <IconArrowLeft size={16} color={colors.textMuted} />
                <Text style={styles.navBtnText}>Previous</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.navCenter}>
              <Text style={styles.navChapterLabel}>
                {selectedChapter} / {totalChapters}
              </Text>
            </View>

            <Pressable
              onPress={() =>
                selectedChapter < totalChapters &&
                setSelectedChapter((c) => c + 1)
              }
              style={[
                styles.navBtn,
                { opacity: selectedChapter >= totalChapters ? 0.3 : 1 },
              ]}
            >
              <LinearGradient
                colors={[colors.surface2, colors.surface1]}
                style={styles.navBtnInner}
              >
                <Text style={styles.navBtnText}>Next</Text>
                <IconArrowRight size={16} color={colors.textMuted} />
              </LinearGradient>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "column", paddingHorizontal: 16, paddingBottom: 10 },
  headerLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: colors.text,
  },
  headerCenter: { flex: 1 },
  readerChapterTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: colors.text,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 10,
  },
  translationRow: { flexDirection: "row", gap: 6, marginTop: 8 },
  searchWrap: { paddingHorizontal: 16, marginBottom: 10 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
  },
  testamentTabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  testamentTab: { flex: 1 },
  testamentActive: {
    borderRadius: colors.radius.md,
    padding: 10,
    alignItems: "center",
  },
  testamentActiveText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#000",
  },
  testamentInactive: {
    borderRadius: colors.radius.md,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  testamentInactiveText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: colors.textMuted,
  },
  scroll: { flex: 1, paddingHorizontal: 16 },
  categorySection: { marginBottom: 18 },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  categoryAccent: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.gold,
  },
  categoryTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  categoryCount: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.textFaint,
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "3.5%" as any,
    rowGap: 6,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: colors.radius.md,
    padding: 13,
    marginTop: 4,
    marginBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  infoCardBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.md,
  },
  infoText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 18,
  },
  chapterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "2.5%" as any,
    rowGap: 6,
    paddingTop: 4,
    paddingHorizontal: 4,
  },
  noTextCard: {
    borderRadius: colors.radius.lg,
    padding: 24,
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    position: "relative",
    overflow: "hidden",
  },
  noTextBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: colors.radius.lg,
  },
  noTextTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: colors.text,
  },
  noTextBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  readerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  fontControls: { flexDirection: "row", gap: 4 },
  fontBtn: {
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fontBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: colors.textMuted,
  },
  fontBtnTextLg: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: colors.gold,
  },
  chapterHeading: {
    borderRadius: colors.radius.md,
    padding: 14,
    marginBottom: 18,
    gap: 2,
  },
  chapterHeadingText: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: colors.text,
  },
  chapterTranslationLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.textMuted,
  },
  noVerseWrap: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  noVerseTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: colors.text,
  },
  noVerseBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 21,
  },
  noVerseCount: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.textFaint,
    marginTop: 6,
  },
  chapterNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
    backgroundColor: colors.surface1,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navBtn: { flex: 1 },
  navBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: colors.radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: colors.textMuted,
  },
  navCenter: { alignItems: "center" },
  navChapterLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.text,
  },
});
