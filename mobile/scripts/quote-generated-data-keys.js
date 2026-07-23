const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const targets = [
  "data/kjv.ts",
  "data/web.ts",
  "data/asv.ts",
  "data/bibleContentExtra.ts",
];

function quoteTopLevelBookKeys(source) {
  return source.replace(/^(\s{2})([A-Za-z0-9]+): (?=\{)/gm, '$1"$2": ');
}

function main() {
  for (const relativePath of targets) {
    const filePath = path.join(projectRoot, relativePath);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const original = fs.readFileSync(filePath, "utf8");
    const updated = quoteTopLevelBookKeys(original);

    if (updated !== original) {
      fs.writeFileSync(filePath, updated, "utf8");
      console.log(`Updated ${relativePath}`);
    }
  }
}

main();
