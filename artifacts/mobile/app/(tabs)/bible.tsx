import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Modal,
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
  BIBLE_BOOKS,
  BibleBook,
  VERSE_COUNTS,
} from "@/data/bibleBooks";
import { BIBLE_TEXT, getChapter, hasChapter } from "@/data/bibleText";
import {
  IconBookOpen,
  IconArrowLeft,
  IconArrowRight,
  IconScroll,
  IconMoreVertical,
  IconBookmark,
  IconNote,
  IconMarker,
  IconSparkles,
} from "@/components/ui/SvgIcons";
import BibleToolsHub, { ToolView } from "@/components/bible/BibleToolsHub";
import BibleSearch from "@/components/bible/BibleSearch";
import DailyDevotional from "@/components/bible/DailyDevotional";
import ParallelBible from "@/components/bible/ParallelBible";
import ReadingPlans from "@/components/bible/ReadingPlans";
import BibleQuiz from "@/components/bible/BibleQuiz";
import MemoryVerses from "@/components/bible/MemoryVerses";
import CharacterProfiles from "@/components/bible/CharacterProfiles";
import BookmarksView from "@/components/bible/BookmarksView";
import SermonNotes from "@/components/bible/SermonNotes";
import BibleDictionary from "@/components/bible/BibleDictionary";
import { useBible } from "@/context/BibleContext";
import { TranslationId, TRANSLATIONS } from "@/constants/translations";
import { HIGHLIGHT_COLORS } from "@/data/highlightColors";

type BibleView =
  | "home"
  | "tools"
  | "search"
  | "daily"
  | "parallel"
  | "plans"
  | "quiz"
  | "memory"
  | "characters"
  | "chapters"
  | "reader"
  | "saved"
  | "sermons"
  | "dictionary";
type SavedTab = "bookmarks" | "highlights" | "notes";

function getBooksForCategory(books: BibleBook[], category: string) {
  return books.filter((b) => b.category === category);
}

function TranslationBadge({
  id,
  label,
  active,
  onPress,
}: {
  id: TranslationId;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${id} translation`}
      accessibilityState={{ selected: active }}
      hitSlop={4}
    >
      {active ? (
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          style={tlStyles.active}
        >
          <Text style={tlStyles.activeText}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={tlStyles.inactive}>
          <Text style={tlStyles.inactiveText}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}
const tlStyles = StyleSheet.create({
  active: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  activeText: { fontFamily: "Inter_700Bold", fontSize: 11, color: "#000" },
  inactive: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
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

function BookCard({
  book,
  onPress,
  translation,
}: {
  book: BibleBook;
  onPress: () => void;
  translation: TranslationId;
}) {
  const hasContent = !!BIBLE_TEXT[translation]?.[book.id];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${book.name}, ${book.chapters} chapters${hasContent ? "" : ", text not yet available"}`}
      style={({ pressed }) => [bkStyles.wrap, { opacity: pressed ? 0.75 : 1 }]}
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
      accessibilityRole="button"
      accessibilityLabel={`Chapter ${num}${hasText ? "" : ", text not yet available"}`}
      style={({ pressed }) => [chStyles.wrap, { opacity: pressed ? 0.75 : 1 }]}
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
  fontSize,
  selected,
  highlightColor,
  onPress,
}: {
  num: number;
  text: string;
  fontSize: number;
  selected: boolean;
  highlightColor?: string | null;
  onPress: () => void;
}) {
  const verseBg = highlightColor
    ? highlightColor.replace("0.35", "0.18")
    : selected
      ? "rgba(212,150,42,0.14)"
      : "transparent";
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Verse ${num}`}
      style={({ pressed }) => [
        vrStyles.row,
        selected && vrStyles.rowActive,
        highlightColor && vrStyles.rowHighlighted,
        highlightColor ? { backgroundColor: verseBg } : null,
        highlightColor ? { borderLeftColor: highlightColor } : null,
        { opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <Text style={vrStyles.num}>{num}</Text>
      <Text style={[vrStyles.text, { fontSize }]}>{text}</Text>
    </Pressable>
  );
}
const vrStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  rowActive: {
    backgroundColor: "rgba(212,150,42,0.14)",
    borderRadius: colors.radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: -6,
  },
  rowHighlighted: {
    borderLeftWidth: 3,
    borderRadius: colors.radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: -6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  num: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: colors.gold,
    minWidth: 24,
    textAlign: "right",
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    color: colors.text,
    lineHeight: 30,
  },
});

function VerseActionButton({
  label,
  icon,
  onPress,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        actionStyles.btnWrap,
        { opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <LinearGradient
        colors={
          active
            ? ["rgba(212,150,42,0.22)", "rgba(212,150,42,0.08)"]
            : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]
        }
        style={[
          actionStyles.btn,
          { borderColor: active ? colors.goldBorder : colors.border },
        ]}
      >
        <View style={actionStyles.btnIcon}>{icon}</View>
        <Text style={[actionStyles.btnLabel, active && { color: colors.gold }]}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const actionStyles = StyleSheet.create({
  btnWrap: { minWidth: "31%", flexGrow: 1 },
  btn: {
    minHeight: 42,
    borderRadius: colors.radius.sm,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnIcon: { width: 14, height: 14, alignItems: "center", justifyContent: "center" },
  btnLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: colors.text,
  },
});

function VerseEditorModal({
  visible,
  mode,
  reference,
  initialTitle,
  initialBody,
  onClose,
  onSave,
}: {
  visible: boolean;
  mode: "note" | "sermon";
  reference: string;
  initialTitle?: string;
  initialBody?: string;
  onClose: () => void;
  onSave: (payload: { title?: string; body: string }) => void;
}) {
  const [title, setTitle] = useState(initialTitle ?? "");
  const [body, setBody] = useState(initialBody ?? "");

  React.useEffect(() => {
    if (!visible) return;
    setTitle(initialTitle ?? "");
    setBody(initialBody ?? "");
  }, [visible, initialTitle, initialBody]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={modalStyles.backdrop} onPress={onClose}>
        <Pressable style={modalStyles.sheet} onPress={() => {}}>
          <Text style={modalStyles.kicker}>
            {mode === "note" ? "Verse Note" : "Sermon Note"}
          </Text>
          <Text style={modalStyles.title}>{reference}</Text>
          {mode === "sermon" && (
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Sermon title..."
              placeholderTextColor={colors.textFaint}
              style={modalStyles.input}
            />
          )}
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder={mode === "note" ? "Write your note..." : "Write sermon notes..."}
            placeholderTextColor={colors.textFaint}
            style={[modalStyles.input, modalStyles.inputMulti]}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <View style={modalStyles.actions}>
            <Pressable onPress={onClose} style={modalStyles.cancelBtn}>
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => onSave({ title: title.trim(), body: body.trim() })}
              style={modalStyles.saveBtn}
            >
              <LinearGradient colors={[colors.goldLight, colors.gold]} style={modalStyles.saveBtnInner}>
                <Text style={modalStyles.saveText}>Save</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  kicker: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputMulti: {
    minHeight: 120,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  cancelBtn: {
    flex: 1,
    borderRadius: colors.radius.md,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: colors.textMuted,
  },
  saveBtn: { flex: 1 },
  saveBtnInner: {
    borderRadius: colors.radius.md,
    paddingVertical: 10,
    alignItems: "center",
  },
  saveText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#000",
  },
});

const menuStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  closeBtn: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: colors.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  closeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: colors.textMuted,
  },
  sectionLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 1,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
  },
  chipActive: {
    backgroundColor: colors.goldGlow,
    borderColor: colors.gold,
  },
  chipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: colors.textMuted,
  },
  chipTextActive: {
    color: colors.gold,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sizeBtn: {
    flex: 1,
    borderRadius: colors.radius.md,
    paddingVertical: 11,
    alignItems: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sizeBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.textMuted,
  },
  sizeValue: {
    minWidth: 34,
    textAlign: "center",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: colors.text,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  actionCard: {
    width: "48%",
    minHeight: 72,
    borderRadius: colors.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
    padding: 12,
    gap: 4,
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface1,
  },
  actionText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: colors.text,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: colors.text,
  },
  kicker: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
  },
});

export default function BibleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bible = useBible();
  const topPad = Platform.OS === "web" ? 60 : insets.top;
  const [view, setView] = useState<BibleView>("home");
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [translation, setTranslation] = useState<TranslationId>("KJV");
  const [testament, setTestament] = useState<"OT" | "NT">("OT");
  const [fontSize, setFontSize] = useState(15);
  const [search, setSearch] = useState("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [editorMode, setEditorMode] = useState<"note" | "sermon" | null>(null);
  const [editorDraft, setEditorDraft] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [savedTab, setSavedTab] = useState<SavedTab>("bookmarks");
  const [readerMenuOpen, setReaderMenuOpen] = useState(false);

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

  const openReaderFromSaved = useCallback(
    (book: string, _bookName: string, chapter: number) => {
      const resolved =
        BIBLE_BOOKS.find(
          (b) =>
            b.id === book ||
            b.name.toLowerCase() === book.toLowerCase() ||
            b.abbr.toLowerCase() === book.toLowerCase(),
        ) ?? null;
      if (!resolved) return;
      setSelectedBook(resolved);
      setSelectedChapter(chapter);
      setView("reader");
    },
    [],
  );

  const openSavedScreen = useCallback((tab: SavedTab) => {
    setSavedTab(tab);
    setView("saved");
  }, []);

  const openTool = useCallback(
    (tool: ToolView) => {
      setReaderMenuOpen(false);
      switch (tool) {
        case "tools":
          setView("tools");
          break;
        case "search":
          setView("search");
          break;
        case "daily":
          setView("daily");
          break;
        case "parallel":
          setView("parallel");
          break;
        case "plans":
          setView("plans");
          break;
        case "quiz":
          setView("quiz");
          break;
        case "memory":
          setView("memory");
          break;
        case "characters":
          setView("characters");
          break;
        case "dictionary":
          setView("dictionary");
          break;
        case "sermons":
          setView("sermons");
          break;
        case "bookmarks":
          openSavedScreen("bookmarks");
          break;
        case "highlights":
          openSavedScreen("highlights");
          break;
        case "notes":
          openSavedScreen("notes");
          break;
        default:
          setView("tools");
          break;
      }
    },
    [openSavedScreen],
  );

  const openDictionary = useCallback(() => {
    setReaderMenuOpen(false);
    setView("dictionary");
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

  const selectedVerseEntry = useMemo(
    () => verseEntries.find((v) => v.verse === selectedVerse) ?? null,
    [selectedVerse, verseEntries],
  );

  const selectedReference = selectedVerseEntry
    ? `${selectedBook?.name ?? ""} ${selectedChapter}:${selectedVerseEntry.verse}`
    : "";

  const currentNote = selectedVerseEntry
    ? bible.getNote(selectedBook?.id ?? "", selectedChapter, selectedVerseEntry.verse)
    : undefined;

  React.useEffect(() => {
    setSelectedVerse(null);
    setEditorMode(null);
  }, [selectedBook?.id, selectedChapter, translation]);

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
            <View style={styles.homeHeaderRow}>
              <Pressable
                onPress={() => router.back()}
                accessibilityRole="button"
                accessibilityLabel="Back"
                style={styles.backBtn}
              >
                <IconArrowLeft size={18} color={colors.textMuted} />
              </Pressable>
              <View style={styles.homeHeaderTitleWrap}>
            <Text style={styles.headerLabel}>BIBLE READER</Text>
            <Text style={styles.headerTitle}>Bible</Text>
          </View>
              <Pressable
                onPress={() => setView("tools")}
                accessibilityRole="button"
                accessibilityLabel="Open tools hub"
                style={styles.menuBtn}
              >
                <IconSparkles size={18} color={colors.textMuted} />
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 12 }}
              contentContainerStyle={styles.translationRow}
            >
              {TRANSLATIONS.map((t) => (
                <TranslationBadge
                  key={t.id}
                  id={t.id as TranslationId}
                  label={t.name}
                  active={translation === t.id}
                  onPress={() => setTranslation(t.id as TranslationId)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.searchWrap}>
            <LinearGradient
              colors={["rgba(255,255,255,0.04)", "rgba(255,255,255,0.015)"]}
              style={styles.searchPanel}
            >
              <View style={styles.searchBox}>
                <IconBookOpen size={16} color={colors.textMuted} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search books or abbreviations"
                  placeholderTextColor={colors.textFaint}
                  value={search}
                  onChangeText={setSearch}
                  accessibilityLabel="Search books"
                  returnKeyType="search"
                  autoCorrect={false}
                />
                {search.length > 0 && (
                  <Pressable
                    onPress={() => setSearch("")}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Clear search"
                  >
                    <Text style={styles.clearBtn}>x</Text>
                  </Pressable>
                )}
              </View>
              <Text style={styles.searchHint}>
                Find a book by name, abbreviation, or category, then tap to open the chapter grid.
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.quickToolsRow}>
            <Pressable style={styles.quickToolCard} onPress={() => setView("tools")}>
              <Text style={styles.quickToolTitle}>Tools Hub</Text>
              <Text style={styles.quickToolDesc}>Study tools, notes, search, plans, and more.</Text>
            </Pressable>
            <Pressable style={styles.quickToolCard} onPress={() => setView("search")}>
              <Text style={styles.quickToolTitle}>Search</Text>
              <Text style={styles.quickToolDesc}>Jump straight into verse lookup.</Text>
            </Pressable>
          </View>

          <View style={styles.testamentTabs}>
            {(["OT", "NT"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTestament(t)}
                accessibilityRole="button"
                accessibilityState={{ selected: testament === t }}
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
                      <Text style={styles.categoryCount}>{books.length}</Text>
                    </View>
                    <View style={styles.bookGrid}>
                      {books.map((b) => (
                        <BookCard
                          key={b.id}
                          book={b}
                          onPress={() => openBook(b)}
                          translation={translation}
                        />
                      ))}
                    </View>
                  </View>
                );
              },
            )}

            {filteredBooks.length === 0 && (
              <View style={styles.emptyState}>
                <IconBookOpen size={32} color={colors.textFaint} />
                <Text style={styles.emptyStateText}>
                  No books match "{search}"
                </Text>
              </View>
            )}
          </ScrollView>
        </>
      )}

      {view === "tools" && (
        <BibleToolsHub
          onNavigate={openTool}
          onBack={() => setView("home")}
          topPad={topPad}
        />
      )}

      {view === "search" && (
        <BibleSearch
          onBack={() => setView("tools")}
          topPad={topPad}
          onOpenReader={openReaderFromSaved}
        />
      )}

      {view === "daily" && (
        <DailyDevotional
          onBack={() => setView("tools")}
          topPad={topPad}
          onOpenReader={openReaderFromSaved}
        />
      )}

      {view === "parallel" && (
        <ParallelBible
          onBack={() => setView("tools")}
          topPad={topPad}
        />
      )}

      {view === "plans" && (
        <ReadingPlans
          onBack={() => setView("tools")}
          topPad={topPad}
          onOpenReader={openReaderFromSaved}
        />
      )}

      {view === "quiz" && (
        <BibleQuiz
          onBack={() => setView("tools")}
          topPad={topPad}
        />
      )}

      {view === "memory" && (
        <MemoryVerses
          onBack={() => setView("tools")}
          topPad={topPad}
        />
      )}

      {view === "characters" && (
        <CharacterProfiles
          onBack={() => setView("tools")}
          topPad={topPad}
        />
      )}

      {view === "chapters" && selectedBook && (
        <>
          <View style={[styles.header, { paddingTop: topPad + 8 }]}>
            <Pressable
              onPress={() => setView("home")}
              accessibilityRole="button"
              accessibilityLabel="Back to books"
              style={styles.backBtn}
            >
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

            {!BIBLE_TEXT[translation]?.[selectedBook.id] && (
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
                  {selectedBook.name} isn't bundled in this translation yet. You
                  can still browse and jump to any of its{" "}
                  {selectedBook.chapters} chapters.
                </Text>
              </LinearGradient>
            )}
          </ScrollView>
        </>
      )}

      {view === "reader" && selectedBook && (
        <>
          <View style={[styles.readerHeader, { paddingTop: topPad + 8 }]}>
            <Pressable
              onPress={() => setView("chapters")}
              accessibilityRole="button"
              accessibilityLabel="Back to chapters"
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
            <Pressable
              onPress={() => setReaderMenuOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Reader menu"
              style={styles.menuBtn}
            >
              <IconMoreVertical size={18} color={colors.textMuted} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: (Platform.OS === "web" ? 24 : insets.bottom) + 56,
            }}
          >
            <LinearGradient
              colors={["rgba(212,150,42,0.12)", "rgba(212,150,42,0.03)", "transparent"]}
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
              verseEntries.map(({ verse, text }) => {
                const isSelected = selectedVerse === verse;
                const bookmark = bible.bookmarks.find(
                  (b) =>
                    b.book === selectedBook.id &&
                    b.chapter === selectedChapter &&
                    b.verse === verse,
                );
                const highlight = bible.getHighlight(
                  selectedBook.id,
                  selectedChapter,
                  verse,
                );
                const highlightColor =
                  HIGHLIGHT_COLORS.find((c) => c.id === highlight?.color)?.value ??
                  null;
                const note = bible.getNote(selectedBook.id, selectedChapter, verse);

                return (
                  <View key={verse} style={{ marginBottom: 8 }}>
                    <VerseRow
                      num={verse}
                      text={text}
                      fontSize={fontSize}
                      selected={isSelected}
                      highlightColor={highlightColor}
                      onPress={() =>
                        setSelectedVerse((current) => (current === verse ? null : verse))
                      }
                    />
                    {isSelected && (
                      <View style={styles.verseActionsCard}>
                        <View style={styles.verseActionsRow}>
                          <VerseActionButton
                            label={bookmark ? "Saved" : "Bookmark"}
                            icon={<IconBookmark size={14} color={bookmark ? colors.gold : colors.textMuted} />}
                            active={!!bookmark}
                            onPress={() => {
                              if (bookmark) {
                                bible.removeBookmark(bookmark.id);
                                return;
                              }
                              bible.addBookmark({
                                book: selectedBook.id,
                                bookName: selectedBook.name,
                                chapter: selectedChapter,
                                verse,
                                text,
                                translation,
                              });
                            }}
                          />
                          <VerseActionButton
                            label="Note"
                            icon={<IconNote size={14} color={note ? colors.gold : colors.textMuted} />}
                            active={!!note}
                            onPress={() => {
                              setEditorMode("note");
                              setEditorDraft(note?.note ?? "");
                            }}
                          />
                          <VerseActionButton
                            label="Sermon"
                            icon={<IconScroll size={14} color={colors.textMuted} />}
                            onPress={() => {
                              setEditorMode("sermon");
                              setEditorTitle(
                                `Sermon note: ${selectedBook.name} ${selectedChapter}:${verse}`,
                              );
                              setEditorDraft("");
                            }}
                          />
                        </View>
                        <View style={styles.highlightRow}>
                          {HIGHLIGHT_COLORS.map((color) => (
                            <Pressable
                              key={color.id}
                              onPress={() =>
                                bible.addHighlight({
                                  book: selectedBook.id,
                                  chapter: selectedChapter,
                                  verse,
                                  color: color.id,
                                })
                              }
                              style={[
                                styles.highlightChip,
                                { backgroundColor: color.value },
                                highlight?.color === color.id &&
                                  styles.highlightChipActive,
                              ]}
                            >
                              <Text style={styles.highlightChipText}>
                                {color.label}
                              </Text>
                            </Pressable>
                          ))}
                          {highlight && (
                            <Pressable
                              onPress={() => bible.removeHighlight(highlight.id)}
                              style={styles.highlightClear}
                            >
                              <Text style={styles.highlightClearText}>Clear</Text>
                            </Pressable>
                          )}
                        </View>
                        <Text style={styles.verseMeta}>
                          {highlight ? "Highlighted" : "Tap a color to highlight"}
                          {note ? " - Note saved" : ""}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <View style={styles.noVerseWrap}>
                <IconScroll size={36} color={colors.textFaint} />
                <Text style={styles.noVerseTitle}>
                  {selectedBook.name} {selectedChapter}
                </Text>
                <Text style={styles.noVerseBody}>
                  Not yet available in {translation}. Try{" "}
                  <Text style={{ color: colors.gold }}>KJV</Text> or{" "}
                  <Text style={{ color: colors.gold }}>SHONA</Text> instead.
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
                paddingBottom: Platform.OS === "web" ? 10 : insets.bottom + 14,
              },
            ]}
          >
            <Pressable
              onPress={() =>
                selectedChapter > 1 && setSelectedChapter((c) => c - 1)
              }
              accessibilityRole="button"
              accessibilityLabel="Previous chapter"
              disabled={selectedChapter <= 1}
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
              accessibilityRole="button"
              accessibilityLabel="Next chapter"
              disabled={selectedChapter >= totalChapters}
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

          <VerseEditorModal
            visible={editorMode !== null && !!selectedReference}
            mode={editorMode ?? "note"}
            reference={selectedReference}
            initialTitle={editorTitle}
            initialBody={editorDraft}
            onClose={() => setEditorMode(null)}
            onSave={({ title, body }) => {
              if (!selectedVerseEntry || !selectedBook) return;
              if (editorMode === "sermon") {
                if (!body.trim()) return;
                bible.addSermonNote({
                  title: title?.trim() || `Sermon note: ${selectedReference}`,
                  reference: selectedReference,
                  body,
                });
              } else {
                if (!body.trim()) return;
                const existing = currentNote;
                if (existing) {
                  bible.updateNote(existing.id, body);
                } else {
                  bible.addNote({
                    book: selectedBook.id,
                    bookName: selectedBook.name,
                    chapter: selectedChapter,
                    verse: selectedVerseEntry.verse,
                    note: body,
                  });
                }
              }
              setEditorMode(null);
              setEditorDraft("");
            }}
          />

          <Modal
            visible={readerMenuOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setReaderMenuOpen(false)}
          >
            <Pressable
              style={menuStyles.backdrop}
              onPress={() => setReaderMenuOpen(false)}
            >
              <Pressable style={menuStyles.sheet} onPress={() => {}}>
                <View style={menuStyles.sheetHeader}>
                  <View>
                    <Text style={menuStyles.kicker}>READER MENU</Text>
                    <Text style={menuStyles.title}>Bible settings</Text>
                  </View>
                  <Pressable
                    onPress={() => setReaderMenuOpen(false)}
                    style={menuStyles.closeBtn}
                  >
                    <Text style={menuStyles.closeText}>Close</Text>
                  </Pressable>
                </View>

                <Text style={menuStyles.sectionLabel}>Translation</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={menuStyles.chipRow}
                >
                  {TRANSLATIONS.map((t) => (
                    <Pressable
                      key={t.id}
                      onPress={() => setTranslation(t.id as TranslationId)}
                      style={[
                        menuStyles.chip,
                        translation === t.id && menuStyles.chipActive,
                      ]}
                    >
                      <Text
                        style={[
                          menuStyles.chipText,
                          translation === t.id && menuStyles.chipTextActive,
                        ]}
                      >
                        {t.id}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>

                <Text style={menuStyles.sectionLabel}>Text Size</Text>
                <View style={menuStyles.sizeRow}>
                  <Pressable
                    onPress={() => setFontSize((f) => Math.max(12, f - 1))}
                    disabled={fontSize <= 12}
                    style={[
                      menuStyles.sizeBtn,
                      fontSize <= 12 && { opacity: 0.4 },
                    ]}
                  >
                    <Text style={menuStyles.sizeBtnText}>A-</Text>
                  </Pressable>
                  <Text style={menuStyles.sizeValue}>{fontSize}</Text>
                  <Pressable
                    onPress={() => setFontSize((f) => Math.min(22, f + 1))}
                    disabled={fontSize >= 22}
                    style={[
                      menuStyles.sizeBtn,
                      fontSize >= 22 && { opacity: 0.4 },
                    ]}
                  >
                    <Text style={[menuStyles.sizeBtnText, { color: colors.gold }]}>A+</Text>
                  </Pressable>
                </View>

                <Text style={menuStyles.sectionLabel}>Tools</Text>
                <View style={menuStyles.actionGrid}>
                  <Pressable
                    onPress={() => {
                      setReaderMenuOpen(false);
                      openSavedScreen("bookmarks");
                    }}
                    style={menuStyles.actionCard}
                  >
                    <View style={menuStyles.actionIcon}><IconBookmark size={18} color={colors.gold} /></View>
                    <Text style={menuStyles.actionText}>Bookmarks</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setReaderMenuOpen(false);
                      openSavedScreen("highlights");
                    }}
                    style={menuStyles.actionCard}
                  >
                    <View style={menuStyles.actionIcon}><IconMarker size={18} color={colors.blue} /></View>
                    <Text style={menuStyles.actionText}>Highlights</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setReaderMenuOpen(false);
                      openSavedScreen("notes");
                    }}
                    style={menuStyles.actionCard}
                  >
                    <View style={menuStyles.actionIcon}><IconNote size={18} color={colors.green} /></View>
                    <Text style={menuStyles.actionText}>Notes</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setReaderMenuOpen(false);
                      setView("sermons");
                    }}
                    style={menuStyles.actionCard}
                  >
                    <View style={menuStyles.actionIcon}><IconScroll size={18} color={colors.purple} /></View>
                    <Text style={menuStyles.actionText}>Sermons</Text>
                  </Pressable>
                  <Pressable
                    onPress={openDictionary}
                    style={menuStyles.actionCard}
                  >
                    <View style={menuStyles.actionIcon}><IconBookOpen size={18} color={colors.red} /></View>
                    <Text style={menuStyles.actionText}>Dictionary</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </>
      )}

      {view === "saved" && (
        <BookmarksView
          onBack={() => setView(selectedBook ? "reader" : "home")}
          topPad={topPad}
          initialTab={savedTab}
          onOpenReader={openReaderFromSaved}
        />
      )}

      {view === "sermons" && (
        <SermonNotes
          onBack={() => setView(selectedBook ? "reader" : "home")}
          topPad={topPad}
        />
      )}

      {view === "dictionary" && (
        <BibleDictionary
          onBack={() => setView(selectedBook ? "reader" : "home")}
          topPad={topPad}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "column", paddingHorizontal: 16, paddingBottom: 10 },
  homeHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  homeHeaderTitleWrap: {
    flex: 1,
    alignItems: "center",
  },
  readerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
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
  headerCenter: { flex: 1, alignItems: "center" },
  readerChapterTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: colors.text,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
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
  },
  translationRow: { flexDirection: "row", gap: 6, marginTop: 8 },
  searchWrap: { paddingHorizontal: 16, marginBottom: 12 },
  searchPanel: {
    borderRadius: colors.radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    gap: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
  },
  clearBtn: {
    fontSize: 13,
    color: colors.textFaint,
    paddingHorizontal: 2,
  },
  searchHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.textFaint,
    lineHeight: 16,
  },
  quickToolsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  quickToolCard: {
    flex: 1,
    minHeight: 76,
    borderRadius: colors.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
    padding: 12,
    gap: 4,
  },
  quickToolTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.text,
  },
  quickToolDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 14,
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
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: colors.textFaint,
    backgroundColor: colors.surface2,
    borderRadius: colors.radius.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
    overflow: "hidden",
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "3.5%" as any,
    rowGap: 6,
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 32,
  },
  emptyStateText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
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
    borderRadius: colors.radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 18,
    gap: 2,
    borderWidth: 1,
    borderColor: "rgba(212,150,42,0.18)",
    overflow: "hidden",
  },
  chapterHeadingText: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: colors.text,
  },
  chapterTranslationLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.textMuted,
  },
  verseActionsCard: {
    marginTop: 8,
    borderRadius: colors.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface2,
    padding: 10,
    gap: 8,
  },
  verseActionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  highlightRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  highlightChip: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  highlightChipActive: {
    borderColor: colors.gold,
    transform: [{ scale: 1.02 }],
  },
  highlightChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#fff",
  },
  highlightClear: {
    borderRadius: colors.radius.full,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: colors.surface3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlightClearText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: colors.textMuted,
  },
  verseMeta: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: colors.textFaint,
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
