import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Bookmark = {
  id: string; book: string; bookName: string; chapter: number; verse: number;
  text: string; translation: string; date: string;
};
export type Highlight = {
  id: string; book: string; chapter: number; verse: number; color: string; date: string;
};
export type Note = {
  id: string; book: string; bookName: string; chapter: number; verse: number;
  note: string; date: string;
};
export type HistoryEntry = {
  book: string; bookName: string; chapter: number; date: string;
};
export type PrayerRequest = {
  id: string; title: string; body: string; answered: boolean; date: string;
};
export type SermonNote = {
  id: string; title: string; reference: string; body: string; date: string;
};
export type MemoryVerseStatus = "new" | "learning" | "reviewing" | "mastered";
export type MemoryVerseEntry = {
  ref: string; text: string; status: MemoryVerseStatus; lastReviewed: string | null;
};
export type ReadingPlanProgress = {
  planId: string; startDate: string; completedDays: number[];
};
export type BibleStreak = {
  count: number; lastDate: string | null; activityDates: string[];
};

interface BibleState {
  bookmarks: Bookmark[];
  highlights: Highlight[];
  notes: Note[];
  history: HistoryEntry[];
  prayerRequests: PrayerRequest[];
  sermonNotes: SermonNote[];
  memoryVerses: MemoryVerseEntry[];
  readingPlanProgress: ReadingPlanProgress | null;
  chaptersRead: Record<string, number[]>;
  bibleStreak: BibleStreak;
  verseOfDayDate: string | null;
}

interface BibleContextValue extends BibleState {
  addBookmark: (b: Omit<Bookmark, "id" | "date">) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (book: string, chapter: number, verse: number) => boolean;
  addHighlight: (h: Omit<Highlight, "id" | "date">) => void;
  removeHighlight: (id: string) => void;
  getHighlight: (book: string, chapter: number, verse: number) => Highlight | undefined;
  addNote: (n: Omit<Note, "id" | "date">) => void;
  updateNote: (id: string, note: string) => void;
  removeNote: (id: string) => void;
  getNote: (book: string, chapter: number, verse: number) => Note | undefined;
  addHistory: (book: string, bookName: string, chapter: number) => void;
  addPrayerRequest: (p: Omit<PrayerRequest, "id" | "date">) => void;
  updatePrayerRequest: (id: string, changes: Partial<PrayerRequest>) => void;
  removePrayerRequest: (id: string) => void;
  addSermonNote: (s: Omit<SermonNote, "id" | "date">) => void;
  updateSermonNote: (id: string, changes: Partial<SermonNote>) => void;
  removeSermonNote: (id: string) => void;
  addMemoryVerse: (ref: string, text: string) => void;
  updateMemoryVerseStatus: (ref: string, status: MemoryVerseStatus) => void;
  removeMemoryVerse: (ref: string) => void;
  startReadingPlan: (planId: string) => void;
  markPlanDay: (day: number) => void;
  abandonPlan: () => void;
  markChapterRead: (bookId: string, chapter: number) => void;
  isChapterRead: (bookId: string, chapter: number) => boolean;
  getBookProgress: (bookId: string, totalChapters: number) => number;
}

const BibleContext = createContext<BibleContextValue | null>(null);

const STORAGE_KEY = "@bible_detective_bible_v2";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function today() {
  return new Date().toISOString().slice(0, 10);
}

const defaultState: BibleState = {
  bookmarks: [],
  highlights: [],
  notes: [],
  history: [],
  prayerRequests: [],
  sermonNotes: [],
  memoryVerses: [],
  readingPlanProgress: null,
  chaptersRead: {},
  bibleStreak: { count: 0, lastDate: null, activityDates: [] },
  verseOfDayDate: null,
};

export function BibleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BibleState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setState(s => ({ ...s, ...parsed }));
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  const save = useCallback((next: BibleState) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const update = useCallback((fn: (s: BibleState) => BibleState) => {
    setState(prev => {
      const next = fn(prev);
      save(next);
      return next;
    });
  }, [save]);

  const touchStreak = useCallback(() => {
    update(s => {
      const t = today();
      const streak = s.bibleStreak;
      if (streak.lastDate === t) return s;
      const dates = streak.activityDates ?? [];
      const newDates = dates.includes(t) ? dates : [...dates, t].slice(-365);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);
      const count = streak.lastDate === yStr ? streak.count + 1 : 1;
      return { ...s, bibleStreak: { count, lastDate: t, activityDates: newDates } };
    });
  }, [update]);

  const addBookmark = useCallback((b: Omit<Bookmark, "id" | "date">) => {
    update(s => ({ ...s, bookmarks: [{ ...b, id: uid(), date: today() }, ...s.bookmarks] }));
  }, [update]);

  const removeBookmark = useCallback((id: string) => {
    update(s => ({ ...s, bookmarks: s.bookmarks.filter(b => b.id !== id) }));
  }, [update]);

  const isBookmarked = useCallback((book: string, chapter: number, verse: number) => {
    return state.bookmarks.some(b => b.book === book && b.chapter === chapter && b.verse === verse);
  }, [state.bookmarks]);

  const addHighlight = useCallback((h: Omit<Highlight, "id" | "date">) => {
    update(s => {
      const filtered = s.highlights.filter(x => !(x.book === h.book && x.chapter === h.chapter && x.verse === h.verse));
      return { ...s, highlights: [...filtered, { ...h, id: uid(), date: today() }] };
    });
  }, [update]);

  const removeHighlight = useCallback((id: string) => {
    update(s => ({ ...s, highlights: s.highlights.filter(h => h.id !== id) }));
  }, [update]);

  const getHighlight = useCallback((book: string, chapter: number, verse: number) => {
    return state.highlights.find(h => h.book === book && h.chapter === chapter && h.verse === verse);
  }, [state.highlights]);

  const addNote = useCallback((n: Omit<Note, "id" | "date">) => {
    update(s => {
      const filtered = s.notes.filter(x => !(x.book === n.book && x.chapter === n.chapter && x.verse === n.verse));
      return { ...s, notes: [{ ...n, id: uid(), date: today() }, ...filtered] };
    });
  }, [update]);

  const updateNote = useCallback((id: string, note: string) => {
    update(s => ({ ...s, notes: s.notes.map(n => n.id === id ? { ...n, note, date: today() } : n) }));
  }, [update]);

  const removeNote = useCallback((id: string) => {
    update(s => ({ ...s, notes: s.notes.filter(n => n.id !== id) }));
  }, [update]);

  const getNote = useCallback((book: string, chapter: number, verse: number) => {
    return state.notes.find(n => n.book === book && n.chapter === chapter && n.verse === verse);
  }, [state.notes]);

  const addHistory = useCallback((book: string, bookName: string, chapter: number) => {
    touchStreak();
    update(s => {
      const filtered = s.history.filter(h => !(h.book === book && h.chapter === chapter));
      return { ...s, history: [{ book, bookName, chapter, date: today() }, ...filtered].slice(0, 50) };
    });
  }, [update, touchStreak]);

  const addPrayerRequest = useCallback((p: Omit<PrayerRequest, "id" | "date">) => {
    update(s => ({ ...s, prayerRequests: [{ ...p, id: uid(), date: today() }, ...s.prayerRequests] }));
  }, [update]);

  const updatePrayerRequest = useCallback((id: string, changes: Partial<PrayerRequest>) => {
    update(s => ({ ...s, prayerRequests: s.prayerRequests.map(p => p.id === id ? { ...p, ...changes } : p) }));
  }, [update]);

  const removePrayerRequest = useCallback((id: string) => {
    update(s => ({ ...s, prayerRequests: s.prayerRequests.filter(p => p.id !== id) }));
  }, [update]);

  const addSermonNote = useCallback((sn: Omit<SermonNote, "id" | "date">) => {
    update(s => ({ ...s, sermonNotes: [{ ...sn, id: uid(), date: today() }, ...s.sermonNotes] }));
  }, [update]);

  const updateSermonNote = useCallback((id: string, changes: Partial<SermonNote>) => {
    update(s => ({ ...s, sermonNotes: s.sermonNotes.map(sn => sn.id === id ? { ...sn, ...changes } : sn) }));
  }, [update]);

  const removeSermonNote = useCallback((id: string) => {
    update(s => ({ ...s, sermonNotes: s.sermonNotes.filter(sn => sn.id !== id) }));
  }, [update]);

  const addMemoryVerse = useCallback((ref: string, text: string) => {
    update(s => {
      if (s.memoryVerses.find(m => m.ref === ref)) return s;
      return { ...s, memoryVerses: [...s.memoryVerses, { ref, text, status: "new", lastReviewed: null }] };
    });
  }, [update]);

  const updateMemoryVerseStatus = useCallback((ref: string, status: MemoryVerseStatus) => {
    update(s => ({
      ...s,
      memoryVerses: s.memoryVerses.map(m => m.ref === ref ? { ...m, status, lastReviewed: today() } : m),
    }));
  }, [update]);

  const removeMemoryVerse = useCallback((ref: string) => {
    update(s => ({ ...s, memoryVerses: s.memoryVerses.filter(m => m.ref !== ref) }));
  }, [update]);

  const startReadingPlan = useCallback((planId: string) => {
    update(s => ({ ...s, readingPlanProgress: { planId, startDate: today(), completedDays: [] } }));
  }, [update]);

  const markPlanDay = useCallback((day: number) => {
    update(s => {
      if (!s.readingPlanProgress) return s;
      const days = s.readingPlanProgress.completedDays;
      const completedDays = days.includes(day) ? days : [...days, day];
      return { ...s, readingPlanProgress: { ...s.readingPlanProgress, completedDays } };
    });
  }, [update]);

  const abandonPlan = useCallback(() => {
    update(s => ({ ...s, readingPlanProgress: null }));
  }, [update]);

  const markChapterRead = useCallback((bookId: string, chapter: number) => {
    update(s => {
      const current = s.chaptersRead[bookId] ?? [];
      if (current.includes(chapter)) return s;
      return { ...s, chaptersRead: { ...s.chaptersRead, [bookId]: [...current, chapter] } };
    });
  }, [update]);

  const isChapterRead = useCallback((bookId: string, chapter: number) => {
    return (state.chaptersRead[bookId] ?? []).includes(chapter);
  }, [state.chaptersRead]);

  const getBookProgress = useCallback((bookId: string, totalChapters: number) => {
    if (!totalChapters) return 0;
    const read = (state.chaptersRead[bookId] ?? []).length;
    return Math.round((read / totalChapters) * 100);
  }, [state.chaptersRead]);

  if (!loaded) return null;

  return (
    <BibleContext.Provider value={{
      ...state,
      addBookmark, removeBookmark, isBookmarked,
      addHighlight, removeHighlight, getHighlight,
      addNote, updateNote, removeNote, getNote,
      addHistory,
      addPrayerRequest, updatePrayerRequest, removePrayerRequest,
      addSermonNote, updateSermonNote, removeSermonNote,
      addMemoryVerse, updateMemoryVerseStatus, removeMemoryVerse,
      startReadingPlan, markPlanDay, abandonPlan,
      markChapterRead, isChapterRead, getBookProgress,
    }}>
      {children}
    </BibleContext.Provider>
  );
}

export function useBible() {
  const ctx = useContext(BibleContext);
  if (!ctx) throw new Error("useBible must be inside BibleProvider");
  return ctx;
}
