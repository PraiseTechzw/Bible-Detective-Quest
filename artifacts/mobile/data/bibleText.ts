import { TextStore } from "@/constants/textstore";
import { KJV_EXTRA, mergeTextStores } from "./bibleContentExtra";
import { TranslationId } from "@/constants/translations";
import { KJV } from "./kjv";
import { WEB } from "./web";
import { ASV } from "./asv";
import { OSCB } from "./oscb";

const KJV_MERGED = mergeTextStores(KJV, KJV_EXTRA);

export const BIBLE_TEXT: Record<TranslationId, TextStore> = { KJV: KJV_MERGED, WEB, ASV, OSCB };

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
