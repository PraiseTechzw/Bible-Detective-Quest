const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(projectRoot, "data", "asv", "ASV.json");
const catalogPath = path.join(projectRoot, "data", "bibleBooks.ts");
const outputPath = path.join(projectRoot, "data", "asv.ts");
const SOURCE_NAME_ALIASES = {
  "1 samuel": "i samuel",
  "2 samuel": "ii samuel",
  "1 kings": "i kings",
  "2 kings": "ii kings",
  "1 chronicles": "i chronicles",
  "2 chronicles": "ii chronicles",
  "1 corinthians": "i corinthians",
  "2 corinthians": "ii corinthians",
  "1 thessalonians": "i thessalonians",
  "2 thessalonians": "ii thessalonians",
  "1 timothy": "i timothy",
  "2 timothy": "ii timothy",
  "1 peter": "i peter",
  "2 peter": "ii peter",
  "1 john": "i john",
  "2 john": "ii john",
  "3 john": "iii john",
  revelation: "revelation of john",
};

function generateStore() {
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const catalogText = fs.readFileSync(catalogPath, "utf8");
  const books = [...catalogText.matchAll(/\{ id: "([^"]+)", name: "([^"]+)"/g)]
    .map(([, id, name]) => ({ id, name }));
  const sourceBooks = new Map(
    source.books.map((book) => [book.name.toLowerCase(), book]),
  );
  const store = {};

  for (const { id, name } of books) {
    const sourceName = SOURCE_NAME_ALIASES[name.toLowerCase()] ?? name.toLowerCase();
    const sourceBook = sourceBooks.get(sourceName);
    if (!sourceBook) {
      throw new Error(`ASV source is missing "${name}"`);
    }

    const chapters = {};
    for (const chapter of sourceBook.chapters) {
      const verses = {};
      for (const verse of chapter.verses) {
        const text = verse.text.trim();
        if (text) verses[verse.verse] = text;
      }
      if (Object.keys(verses).length) chapters[chapter.chapter] = verses;
    }
    if (Object.keys(chapters).length) store[id] = chapters;
  }

  if (Object.keys(store).length !== 66) {
    throw new Error(`Expected ASV text for 66 books, found ${Object.keys(store).length}`);
  }
  return store;
}

function main() {
  const store = generateStore();
  const fileContent = `import { TextStore } from "@/constants/textstore";

// Auto-generated from data/asv/ASV.json by scripts/parse-asv.js.
export const ASV: TextStore = ${JSON.stringify(store, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent, "utf8");
  console.log(`Wrote ${outputPath} with ${Object.keys(store).length} book(s).`);
}

main();
