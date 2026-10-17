import { readFileSync, writeFileSync } from "node:fs";

const version = process.argv[2];

if (version === undefined) {
  throw Error("missing version arg!");
}

const jsr = JSON.parse(readFileSync("./jsr.json", "utf-8"));
jsr.version = version;
writeFileSync("./jsr.json", JSON.stringify(jsr, null, 2) + "\n");

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
pkg.version = version;
writeFileSync("./package.json", JSON.stringify(pkg, null, 2) + "\n");

console.log(`version set to ${version}`);