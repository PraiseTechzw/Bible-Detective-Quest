const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(projectRoot, "data", "shona");
const outputPath = path.join(projectRoot, "data", "oscb.ts");

const BIBLE_ORDER = [
  "gen",
  "exo",
  "lev",
  "num",
  "deu",
  "jos",
  "jdg",
  "rut",
  "1sa",
  "2sa",
  "1ki",
  "2ki",
  "1ch",
  "2ch",
  "ezr",
  "neh",
  "est",
  "job",
  "psa",
  "pro",
  "ecc",
  "sng",
  "isa",
  "jer",
  "lam",
  "eze",
  "dan",
  "hos",
  "joe",
  "amo",
  "oba",
  "jon",
  "mic",
  "nah",
  "hab",
  "zep",
  "hag",
  "zec",
  "mal",
  "mat",
  "mar",
  "luk",
  "joh",
  "act",
  "rom",
  "1co",
  "2co",
  "gal",
  "eph",
  "phi",
  "col",
  "1th",
  "2th",
  "1ti",
  "2ti",
  "tit",
  "phm",
  "heb",
  "jam",
  "1pe",
  "2pe",
  "1jo",
  "2jo",
  "3jo",
  "jud",
  "rev",
];

const NAME_TO_ID = {
  "1 Chronicles": "1ch",
  "1 Corinthians": "1co",
  "1 John": "1jo",
  "1 Kings": "1ki",
  "1 Peter": "1pe",
  "1 Samuel": "1sa",
  "1 Thessalonians": "1th",
  "1 Timothy": "1ti",
  "2 Chronicles": "2ch",
  "2 Corinthians": "2co",
  "2 John": "2jo",
  "2 Kings": "2ki",
  "2 Peter": "2pe",
  "2 Samuel": "2sa",
  "2 Thessalonians": "2th",
  "2 Timothy": "2ti",
  "3 John": "3jo",
  Acts: "act",
  Amos: "amo",
  Colossians: "col",
  Daniel: "dan",
  Deuteronomy: "deu",
  Ecclesiastes: "ecc",
  Ephesians: "eph",
  Esther: "est",
  Exodus: "exo",
  Ezekiel: "eze",
  Ezra: "ezr",
  Galatians: "gal",
  Genesis: "gen",
  Habakkuk: "hab",
  Haggai: "hag",
  Hebrews: "heb",
  Hosea: "hos",
  Isaiah: "isa",
  James: "jam",
  Judges: "jdg",
  Jeremiah: "jer",
  Job: "job",
  Joel: "joe",
  John: "joh",
  Jonah: "jon",
  Joshua: "jos",
  Jude: "jud",
  Lamentations: "lam",
  Leviticus: "lev",
  Luke: "luk",
  Malachi: "mal",
  Mark: "mar",
  Matthew: "mat",
  Micah: "mic",
  Nahum: "nah",
  Nehemiah: "neh",
  Numbers: "num",
  Obadiah: "oba",
  Philemon: "phm",
  Philippians: "phi",
  Proverbs: "pro",
  Psalms: "psa",
  Revelation: "rev",
  Romans: "rom",
  Ruth: "rut",
  "1 Chronicles": "1ch",
  "1 Corinthians": "1co",
  "1 John": "1jo",
  "1 Kings": "1ki",
  "1 Peter": "1pe",
  "1 Samuel": "1sa",
  "1 Thessalonians": "1th",
  "1 Timothy": "1ti",
  "2 Chronicles": "2ch",
  "2 Corinthians": "2co",
  "2 John": "2jo",
  "2 Kings": "2ki",
  "2 Peter": "2pe",
  "2 Samuel": "2sa",
  "2 Thessalonians": "2th",
  "2 Timothy": "2ti",
  "3 John": "3jo",
  "Song of Solomon": "sng",
  Titus: "tit",
  Zechariah: "zec",
  Zephaniah: "zep",
};

const USFM_TO_ID = {
  GEN: "gen",
  EXO: "exo",
  LEV: "lev",
  NUM: "num",
  DEU: "deu",
  JOS: "jos",
  JDG: "jdg",
  RUT: "rut",
  "1SA": "1sa",
  "2SA": "2sa",
  "1KI": "1ki",
  "2KI": "2ki",
  "1CH": "1ch",
  "2CH": "2ch",
  EZR: "ezr",
  NEH: "neh",
  EST: "est",
  JOB: "job",
  PSA: "psa",
  PRO: "pro",
  ECC: "ecc",
  SNG: "sng",
  ISA: "isa",
  JER: "jer",
  LAM: "lam",
  EZE: "eze",
  DAN: "dan",
  HOS: "hos",
  JOE: "joe",
  AMO: "amo",
  OBA: "oba",
  JON: "jon",
  MIC: "mic",
  NAH: "nah",
  HAB: "hab",
  ZEP: "zep",
  HAG: "hag",
  ZEC: "zec",
  MAL: "mal",
  MAT: "mat",
  MAR: "mar",
  LUK: "luk",
  JOH: "joh",
  ACT: "act",
  ROM: "rom",
  "1CO": "1co",
  "2CO": "2co",
  GAL: "gal",
  EPH: "eph",
  PHI: "phi",
  COL: "col",
  "1TH": "1th",
  "2TH": "2th",
  "1TI": "1ti",
  "2TI": "2ti",
  TIT: "tit",
  PHM: "phm",
  HEB: "heb",
  JAM: "jam",
  "1PE": "1pe",
  "2PE": "2pe",
  "1JN": "1jo",
  "2JN": "2jo",
  "3JN": "3jo",
  JUD: "jud",
  REV: "rev",
};

function stripUsfmMarkers(text) {
  return text
    .replace(/\\f(?:\+|\b)[\s\S]*?\\f\*/g, "")
    .replace(/\\x(?:\+|\b)[\s\S]*?\\x\*/g, "")
    .replace(/\\w\s+([^|]+?)\|[\s\S]*?\\w\*/g, "$1")
    .replace(/\\add\*?/g, "")
    .replace(/\\nd\*?/g, "")
    .replace(/\\qt\*?/g, "")
    .replace(/\\qs\*?/g, "")
    .replace(/\\rq\*?/g, "")
    .replace(/\\[A-Za-z0-9+_-]+\*?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseChapterFile(filePath, fallbackChapter) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  const verses = {};
  let currentChapter = fallbackChapter;
  let currentVerse = null;
  let currentText = "";

  const flushVerse = () => {
    if (currentVerse == null) {
      return;
    }
    const cleaned = stripUsfmMarkers(currentText);
    if (cleaned) {
      verses[currentVerse] = cleaned;
    }
    currentVerse = null;
    currentText = "";
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    const chapterMatch = line.match(/^\\c\s+(\d+)/);
    if (chapterMatch) {
      flushVerse();
      currentChapter = Number(chapterMatch[1]);
      continue;
    }

    const verseMatch = line.match(/^\\v\s+(\d+)\s*(.*)$/);
    if (verseMatch) {
      flushVerse();
      currentVerse = Number(verseMatch[1]);
      currentText = verseMatch[2] ?? "";
      continue;
    }

    if (currentVerse != null) {
      currentText += (currentText ? " " : "") + line;
    }
  }

  flushVerse();
  return { chapter: currentChapter, verses };
}

function parseIntroFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const idMatch = content.match(/^\\id\s+([A-Z0-9]+)/m);
  return idMatch ? idMatch[1] : null;
}

function resolveBookId(bookName, introCode) {
  if (NAME_TO_ID[bookName]) {
    return NAME_TO_ID[bookName];
  }

  if (introCode && USFM_TO_ID[introCode]) {
    return USFM_TO_ID[introCode];
  }

  return null;
}

function generateStore() {
  const store = {};
  const bookDirs = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  for (const bookName of bookDirs) {
    const bookPath = path.join(sourceRoot, bookName);
    const introCode = parseIntroFile(path.join(bookPath, "0", "data"));
    const bookId = resolveBookId(bookName, introCode);

    if (!bookId) {
      throw new Error(`Unable to resolve book id for "${bookName}"${introCode ? ` (${introCode})` : ""}`);
    }

    const chapterDirs = fs
      .readdirSync(bookPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== "0")
      .map((entry) => entry.name)
      .sort((a, b) => Number(a) - Number(b));

    const chapters = {};

    for (const chapterName of chapterDirs) {
      const chapterNumber = Number(chapterName);
      if (!Number.isFinite(chapterNumber)) {
        continue;
      }

      const chapterFile = path.join(bookPath, chapterName, "data");
      if (!fs.existsSync(chapterFile)) {
        continue;
      }

      const parsed = parseChapterFile(chapterFile, chapterNumber);
      if (Object.keys(parsed.verses).length > 0) {
        chapters[parsed.chapter] = parsed.verses;
      }
    }

    if (Object.keys(chapters).length > 0) {
      store[bookId] = chapters;
    }
  }

  const orderedStore = {};
  for (const bookId of BIBLE_ORDER) {
    if (store[bookId]) {
      orderedStore[bookId] = store[bookId];
    }
  }

  return orderedStore;
}

function main() {
  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Could not find Shona source data at ${sourceRoot}`);
  }

  const store = generateStore();
  const fileContent = `import { TextStore } from "@/constants/textstore";

// Auto-generated from data/shona by scripts/parse-oscb.js.
export const OSCB: TextStore = ${JSON.stringify(store, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent, "utf8");
  const bookCount = Object.keys(store).length;
  console.log(`Wrote ${outputPath} with ${bookCount} book(s).`);
}

main();
