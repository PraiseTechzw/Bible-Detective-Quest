
export type TranslationId = "KJV" | "WEB" | "ASV" | "OSCB";

export interface Translation {
  id: TranslationId;
  name: string;
  fullName: string;
  year: string;
  language: string;
  license: string;
  description: string;
}

export const TRANSLATIONS: Translation[] = [
  {
    id: "KJV",
    name: "KJV",
    fullName: "King James Version",
    year: "1611 / 1769",
    language: "Early Modern English",
    license: "Public Domain",
    description: "The classic Authorized Version. Majestic prose, memorised by generations. Used in all Bible Detective game cases.",
  },
  {
    id: "WEB",
    name: "WEB",
    fullName: "World English Bible",
    year: "2020",
    language: "Modern English",
    license: "Public Domain",
    description: "A modern English update of the American Standard Version. Readable and accurate — no archaic 'thee' and 'thou'.",
  },
  {
    id: "ASV",
    name: "ASV",
    fullName: "American Standard Version",
    year: "1901",
    language: "Late Victorian English",
    license: "Public Domain",
    description: "A highly literal revision of the KJV by 100 scholars. Scholar's favourite for accuracy. Basis for many modern translations.",
  },
  {
    id: "OSCB",
    name: "OSCB",
    fullName: "Open Shona Contemporary Bible",
    year: "2012",
    language: "Shona",
    license: "CC BY-SA 4.0",
    description: "Bhaibheri muChiShona — inoshandiswa muZimbabwe nevanhu vanosvika mamiriyoni gumi. Yakaitwa nevanhu vemakereke eZimbabwe. © Open Shona Bible Project (CC BY-SA 4.0).",
  },
];