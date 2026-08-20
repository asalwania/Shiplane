#!/usr/bin/env node
// Reports the approximate token footprint of every skill under skills/,
// broken into SKILL.md (loaded every invocation) vs. its bundled files
// (loaded only when that branch is read). Informational — `check-portability.mjs`
// is what fails a build; this is for spotting where a skill's weight actually is.
// No dependencies on purpose — this repo's only build step should never need `npm install`.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = new URL("../skills/", import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, "$1");

// Rough, provider-agnostic estimate: ~4 bytes/token for English markdown.
// Good enough to compare skills against each other; not a billing figure.
const BYTES_PER_TOKEN = 4;

function walkMarkdown(dir, skip = new Set(["agents"])) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (skip.has(entry)) continue;
      files.push(...walkMarkdown(path, skip));
    } else if (entry.endsWith(".md")) {
      files.push(path);
    }
  }
  return files;
}

function tokens(bytes) {
  return Math.round(bytes / BYTES_PER_TOKEN);
}

const skillNames = readdirSync(SKILLS_DIR)
  .filter((entry) => statSync(join(SKILLS_DIR, entry)).isDirectory())
  .sort();

const rows = [];
let totalRouter = 0;
let totalBundle = 0;

for (const name of skillNames) {
  const skillDir = join(SKILLS_DIR, name);
  const skillMdPath = join(skillDir, "SKILL.md");

  let routerBytes = 0;
  try {
    routerBytes = statSync(skillMdPath).size;
  } catch {
    // no SKILL.md — check-portability.mjs reports this as an error, skip here
  }

  const allMd = walkMarkdown(skillDir);
  const bundleBytes = allMd.filter((f) => f !== skillMdPath).reduce((sum, f) => sum + statSync(f).size, 0);
  const bundleFileCount = allMd.length - (routerBytes ? 1 : 0);

  totalRouter += routerBytes;
  totalBundle += bundleBytes;

  rows.push({ name, routerBytes, bundleBytes, bundleFileCount });
}

rows.sort((a, b) => b.routerBytes + b.bundleBytes - (a.routerBytes + a.bundleBytes));

const nameWidth = Math.max(...rows.map((r) => r.name.length), "skill".length);
console.log(
  `${"skill".padEnd(nameWidth)}  ${"SKILL.md".padStart(10)}  ${"bundle".padStart(12)}  ${"total".padStart(10)}`,
);
for (const r of rows) {
  const total = r.routerBytes + r.bundleBytes;
  console.log(
    `${r.name.padEnd(nameWidth)}  ${`${tokens(r.routerBytes)}tok`.padStart(10)}  ${`${tokens(r.bundleBytes)}tok/${r.bundleFileCount}f`.padStart(12)}  ${`${tokens(total)}tok`.padStart(10)}`,
  );
}
console.log("-".repeat(nameWidth + 38));
console.log(
  `${"total".padEnd(nameWidth)}  ${`${tokens(totalRouter)}tok`.padStart(10)}  ${`${tokens(totalBundle)}tok`.padStart(12)}  ${`${tokens(totalRouter + totalBundle)}tok`.padStart(10)}`,
);
console.log(`\n${skillNames.length} skills. "bundle" is every mode/pattern/flow/template file a skill can read on demand, not what loads on every run.`);
