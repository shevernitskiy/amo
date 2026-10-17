import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = process.argv[2] ?? "./npm";

let patched = 0;

for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".d.ts")) continue;

  const path = `${entry.parentPath}/${entry.name}`;
  const source = readFileSync(path, "utf-8");
  const result = source.replace(/(\bfrom\s*["'][^"']+)\.ts(["'])/g, "$1.js$2");

  if (result !== source) {
    writeFileSync(path, result);
    patched++;
  }
}

console.log(`rewrote relative extensions in ${patched} declaration file(s)`);