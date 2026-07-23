import { TextStore } from "@/constants/textstore";
import { KJV_EXTRA, mergeTextStores } from "./bibleContentExtra";
import { TranslationId } from "@/constants/translations";
import { KJV } from "./kjv";
import { ASV } from "./asv";
import { OSCB } from "./oscb";
import { BIBLE_BOOKS } from "./bibleBooks";

const KJV_MERGED = mergeTextStores(KJV, KJV_EXTRA);

export const BIBLE_TEXT: Record<TranslationId, TextStore> = { KJV: KJV_MERGED, ASV, OSCB };

export function getVerse(translation: TranslationId, bookId: string, chapter: number, verse: number): string | null {
  return BIBLE_TEXT[translation]?.[bookId]?.[chapter]?.[verse] ?? null;
}

export function getChapter(translation: TranslationId, bookId: string, chapter: number): Record<number, string> | null {
  return BIBLE_TEXT[translation]?.[bookId]?.[chapter] ?? null;
}

export function hasChapter(translation: TranslationId, bookId: string, chapter: number): boolean {
  const ch = BIBLE_TEXT[translation]?.[bookId]?.[chapter];
  return ch != null && Object.keys(ch).length > 0;
}

const BOOK_LOOKUP = [...BIBLE_BOOKS]
  .sort((a, b) => b.name.length - a.name.length)
  .flatMap((book) => [
    { key: book.name.toLowerCase(), id: book.id },
    { key: book.abbr.toLowerCase(), id: book.id },
    { key: book.id.toLowerCase(), id: book.id },
  ]);

function normalizeReferenceText(text: string): string {
  return text
    .replace(/[.]/g, "")
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function resolveBookIdFromReference(reference: string): string | null {
  const normalized = normalizeReferenceText(reference);
  const match = BOOK_LOOKUP.find(({ key }) => normalized === key || normalized.startsWith(`${key} `));
  return match?.id ?? null;
}

function getVersesForChapter(translation: TranslationId, bookId: string, chapter: number): string[] {
  const ch = getChapter(translation, bookId, chapter);
  if (!ch) return [];
  return Object.keys(ch)
    .map(Number)
    .sort((a, b) => a - b)
    .map((v) => ch[v])
    .filter(Boolean);
}

function extractPassageText(
  translation: TranslationId,
  bookId: string,
  chapter: number,
  verseStart?: number,
  verseEnd?: number,
): string | null {
  if (verseStart == null) {
    const verses = getVersesForChapter(translation, bookId, chapter);
    return verses.length > 0 ? verses.join(" ") : null;
  }

  const ch = getChapter(translation, bookId, chapter);
  if (!ch) return null;
  const start = verseStart;
  const end = verseEnd ?? verseStart;
  const verses = Object.keys(ch)
    .map(Number)
    .sort((a, b) => a - b)
    .filter((v) => v >= start && v <= end)
    .map((v) => ch[v])
    .filter(Boolean);
  return verses.length > 0 ? verses.join(" ") : null;
}

export function getPassageText(translation: TranslationId, reference: string): string | null {
  const segments = reference
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const textParts: string[] = [];

  for (const segment of segments) {
    const bookId = resolveBookIdFromReference(segment);
    if (!bookId) {
      continue;
    }

    const bookMeta = BIBLE_BOOKS.find((b) => b.id === bookId);
    const bookTokens = [bookMeta?.name, bookMeta?.abbr, bookId]
      .filter(Boolean)
      .map((token) => token!.toLowerCase())
      .sort((a, b) => b.length - a.length);

    const normalized = normalizeReferenceText(segment);
    const token = bookTokens.find((candidate) => normalized.startsWith(candidate));
    if (!token) {
      continue;
    }

    const remainder = normalized.slice(token.length).trim();
    if (!remainder) {
      const verses = getVersesForChapter(translation, bookId, 1);
      if (verses.length > 0) textParts.push(verses.join(" "));
      continue;
    }

    const chapterVerse = remainder.match(/^(\d+)(?::(\d+)(?:-(\d+))?)?$/);
    if (chapterVerse) {
      const chapter = Number(chapterVerse[1]);
      const verseStart = chapterVerse[2] ? Number(chapterVerse[2]) : undefined;
      const verseEnd = chapterVerse[3] ? Number(chapterVerse[3]) : verseStart;
      const text = extractPassageText(translation, bookId, chapter, verseStart, verseEnd);
      if (text) textParts.push(text);
      continue;
    }

    const chapterRange = remainder.match(/^(\d+)\s*-\s*(\d+)$/);
    if (chapterRange) {
      const start = Number(chapterRange[1]);
      const end = Number(chapterRange[2]);
      const chapterTexts: string[] = [];
      for (let chapter = start; chapter <= end; chapter++) {
        const text = extractPassageText(translation, bookId, chapter);
        if (text) chapterTexts.push(text);
      }
      if (chapterTexts.length > 0) textParts.push(chapterTexts.join(" "));
      continue;
    }

    const singleChapter = remainder.match(/^(\d+)$/);
    if (singleChapter) {
      const text = extractPassageText(translation, bookId, Number(singleChapter[1]));
      if (text) textParts.push(text);
    }
  }

  return textParts.length > 0 ? textParts.join(" ") : null;
}
