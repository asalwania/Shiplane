#!/usr/bin/env node
// Validates every skills/<name>/SKILL.md: frontmatter shape, the SKILL.md
// line budget, a bundle byte budget so decomposition doesn't quietly balloon
// what a skill costs to load, and the cross-client portability rules below
// (this project installs into Claude Code, Cursor, Codex, and Gemini CLI,
// so a rule any one of those clients would break on fails the build here):
//
//  1. Every skill declares `allowed-tools` in frontmatter, naming the
//     subagent tool `Agent` — not the legacy `Task` name.
//  2. `description` stays under 400 characters — every installed skill's
//     description loads into every session.
//  3. No skill hardcodes a Claude-only model alias (haiku/sonnet/opus/fable)
//     as a spawn directive — spawn instructions set the subagent model in
//     role words (a fast tier, a strong model), not a Claude-specific alias.
//  4. No skill names the subagent tool in prose ("the Agent tool", "the
//     Task tool", "spawn an Agent") — stay capability-first.
//  5. No non-git shell glue that breaks on PowerShell (`>/dev/null`,
//     `&& VAR=`, `|| VAR=`) in a SKILL body — git commands themselves are
//     fine, express anything else as prose.
//  6. The shared `<!-- OUTPUT-STYLE:START -->...END -->` block is present
//     in every SKILL.md and byte-identical across all of them — this is
//     the one deliberately duplicated rule (docs/conventions.md), so a
//     copy that's drifted is a real bug, not a style choice.
//  7. No em dash or en dash anywhere in a skill's prose, including
//     `description` — the output style block tells the model to write
//     without them, so the instructions it reads must set that example.
//  8. No hyphen used as prose punctuation or in a compound word (write
//     `read only`, not `read-only`); code, inline code spans, markdown
//     link targets, bare URLs, and frontmatter keys keep theirs.
//
// No dependencies on purpose — this repo's only build step should never need `npm install`.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SKILLS_DIR = new URL("../skills/", import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, "$1");

// SKILL.md line budget (unchanged from the original check.mjs): it loads in
// full on every invocation, so every line is a cost paid repeatedly.
const SOFT_LINE_BUDGET = 100;
const HARD_LINE_BUDGET = 220;

const DESCRIPTION_MAX_CHARS = 400;
const MODEL_ALIAS_RE = /\bmodel\s*[:=]\s*["'`]?(haiku|sonnet|opus|fable)\b/i;
const TOOL_NAMING_RE = /\bthe\s+(Agent|Task)\s+tool\b|\bspawn\s+an?\s+Agent\b/;
const POWERSHELL_UNSAFE_RE = />\s*\/dev\/null|&&\s*[A-Za-z_][A-Za-z0-9_]*=|\|\|\s*[A-Za-z_][A-Za-z0-9_]*=/;
const OUTPUT_STYLE_RE = /<!-- OUTPUT-STYLE:START -->[\s\S]*?<!-- OUTPUT-STYLE:END -->/;
const EM_EN_DASH_RE = /[—–]/;
const HYPHEN_WORD_RE = /[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+/g;

// Rules 7 and 8 read prose only: mask every region that's allowed to keep
// dashes and hyphens (code, links, URLs, frontmatter keys) with spaces of
// the same length, so line numbers still line up for the violations left.
const MASK = (s) => " ".repeat(s.length);
function proseOnly(text) {
  return text
    .replace(/```[\s\S]*?```/g, MASK)
    .replace(/`[^`\n]+`/g, MASK)
    .replace(/<!--[\s\S]*?-->/g, MASK)
    .replace(/\]\([^)]*\)/g, MASK)
    .replace(/https?:\/\/\S+/g, MASK)
    .replace(/^---\r?\n[\s\S]*?\r?\n---/m, (fm) =>
      fm.split(/\r?\n/).map((l) => (/^description:/.test(l) ? l : MASK(l))).join("\n")
    );
}
const isExemptHyphenTerm = (word) => /^[A-Z0-9-]+$/.test(word);

// BUDGET POLICY. A skill's "bundle" is SKILL.md plus every file it can read
// on demand (modes/, agent-modes/, patterns/, approaches/, flow/, ui/,
// templates/, internal/, and any loose .md file one level deep). The bundle
// total is not what loads on every run — SKILL.md alone is — but it bounds
// the worst case (a run that touches every branch) and is the signal that
// catches decomposition quietly turning into duplication. A warning means
// prune or split further, not raise the ceiling; a budget that's routinely
// raised stops meaning anything.
const BUNDLE_WARN_BYTES = 48 * 1024;
const BUNDLE_HARD_BYTES = 96 * 1024;

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const fieldMatch = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (fieldMatch) fields[fieldMatch[1]] = fieldMatch[2].trim();
  }
  return fields;
}

function walkBundleFiles(skillDir) {
  const files = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      const stat = statSync(path);
      if (stat.isDirectory()) {
        if (entry === "agents") continue; // openai.yaml adapter isn't part of the read-on-demand bundle
        walk(path);
      } else if (entry.endsWith(".md")) {
        files.push(path);
      }
    }
  }
  walk(skillDir);
  return files;
}

function checkSkill(name) {
  const errors = [];
  const warnings = [];
  const skillDir = join(SKILLS_DIR, name);
  const path = join(skillDir, "SKILL.md");

  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return { name, errors: [`missing SKILL.md at skills/${name}/SKILL.md`], warnings, bundleBytes: 0 };
  }

  const frontmatter = parseFrontmatter(text);
  if (!frontmatter) {
    errors.push("no --- frontmatter block found");
  } else {
    if (!frontmatter.name) errors.push("frontmatter missing `name`");
    else if (frontmatter.name !== name) errors.push(`frontmatter name "${frontmatter.name}" does not match folder "${name}"`);

    if (!frontmatter.description) errors.push("frontmatter missing `description`");
    else {
      if (!/use when/i.test(frontmatter.description)) warnings.push('description has no "Use when" trigger clause');
      if (frontmatter.description.length > DESCRIPTION_MAX_CHARS) {
        errors.push(`description is ${frontmatter.description.length} chars, over the ${DESCRIPTION_MAX_CHARS} limit`);
      }
      if (EM_EN_DASH_RE.test(frontmatter.description)) {
        errors.push("description contains an em or en dash — it loads into every session and must follow the no-dash output style");
      }
      for (const m of frontmatter.description.matchAll(HYPHEN_WORD_RE)) {
        if (isExemptHyphenTerm(m[0])) continue;
        errors.push(`description contains hyphenated \`${m[0]}\` — write it as plain words per the output style`);
      }
    }

    if (!frontmatter["allowed-tools"]) errors.push("frontmatter missing `allowed-tools`");
    else if (/\bTask\b/.test(frontmatter["allowed-tools"])) {
      errors.push("`allowed-tools` names the legacy `Task` tool — use `Agent`");
    }
  }

  if (!OUTPUT_STYLE_RE.test(text)) {
    errors.push("SKILL.md is missing the shared <!-- OUTPUT-STYLE:START/END --> block (see docs/conventions.md)");
  }

  const lineCount = text.split(/\r?\n/).length;
  if (lineCount > HARD_LINE_BUDGET) errors.push(`SKILL.md is ${lineCount} lines, over the hard budget of ${HARD_LINE_BUDGET}`);
  else if (lineCount > SOFT_LINE_BUDGET) warnings.push(`SKILL.md is ${lineCount} lines, over the soft budget of ${SOFT_LINE_BUDGET} — move rarely-needed content to a bundled file`);

  errors.push(...checkOpenaiAdapter(skillDir, name));

  const bundleFiles = walkBundleFiles(skillDir);
  const bundleBytes = bundleFiles.reduce((sum, f) => sum + statSync(f).size, 0);
  if (bundleBytes > BUNDLE_HARD_BYTES) {
    errors.push(`bundle (SKILL.md + ${bundleFiles.length - 1} bundled file(s)) is ${(bundleBytes / 1024).toFixed(1)}KB, over the hard budget of ${BUNDLE_HARD_BYTES / 1024}KB`);
  } else if (bundleBytes > BUNDLE_WARN_BYTES) {
    warnings.push(`bundle is ${(bundleBytes / 1024).toFixed(1)}KB, over the ${BUNDLE_WARN_BYTES / 1024}KB soft budget — prune before adding more`);
  }

  for (const file of bundleFiles) {
    const rel = relative(SKILLS_DIR, file);
    const content = readFileSync(file, "utf8");
    if (MODEL_ALIAS_RE.test(content)) {
      errors.push(`${rel} hardcodes a Claude-only model alias — spawn instructions should set the model in role words`);
    }
    if (TOOL_NAMING_RE.test(content)) {
      errors.push(`${rel} names the subagent tool in prose — stay capability-first`);
    }
    if (POWERSHELL_UNSAFE_RE.test(content)) {
      warnings.push(`${rel} has shell glue that may break on PowerShell — express it as prose instead`);
    }

    const contentLines = content.split(/\r?\n/);
    contentLines.forEach((line, i) => {
      if (EM_EN_DASH_RE.test(line)) {
        errors.push(`${rel}:${i + 1}: contains an em or en dash — write it as a comma, a colon, or parentheses instead`);
      }
    });

    const masked = proseOnly(content);
    const seenHyphens = new Set();
    for (const m of masked.matchAll(HYPHEN_WORD_RE)) {
      if (isExemptHyphenTerm(m[0])) continue;
      const line = masked.slice(0, m.index).split(/\r?\n/).length;
      const key = `${line}:${m[0]}`;
      if (seenHyphens.has(key)) continue;
      seenHyphens.add(key);
      errors.push(`${rel}:${line}: hyphen in prose \`${m[0]}\` — write it as plain words (code, paths, and flags keep theirs)`);
    }
  }

  const outputStyleMatch = text.match(OUTPUT_STYLE_RE);
  const outputStyleBlock = outputStyleMatch ? outputStyleMatch[0] : null;

  return { name, errors, warnings, bundleBytes, bundleFileCount: bundleFiles.length, outputStyleBlock };
}

// Every skill ships an OpenAI Codex adapter at agents/openai.yaml, so the same
// skill installs for Codex users without a second copy of the instructions.
function checkOpenaiAdapter(skillDir, name) {
  const errors = [];
  const path = join(skillDir, "agents", "openai.yaml");

  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    errors.push("missing agents/openai.yaml (OpenAI Codex adapter)");
    return errors;
  }

  for (const field of ["interface:", "display_name:", "short_description:", "default_prompt:"]) {
    if (!text.includes(field)) errors.push(`agents/openai.yaml missing \`${field.replace(":", "")}\` field`);
  }

  return errors;
}

const skillNames = readdirSync(SKILLS_DIR).filter((entry) => statSync(join(SKILLS_DIR, entry)).isDirectory());

let hasErrors = false;
let referenceOutputStyle = null;
let referenceOutputStyleOwner = null;
const results = skillNames.map((name) => checkSkill(name));

for (const { name, outputStyleBlock } of results) {
  if (!outputStyleBlock) continue;
  if (referenceOutputStyle === null) {
    referenceOutputStyle = outputStyleBlock;
    referenceOutputStyleOwner = name;
  } else if (outputStyleBlock !== referenceOutputStyle) {
    const result = results.find((r) => r.name === name);
    result.errors.push(`OUTPUT-STYLE block has drifted from ${referenceOutputStyleOwner}'s — the shared block must stay byte-identical (see docs/conventions.md)`);
  }
}

for (const { name, errors, warnings, bundleBytes, bundleFileCount } of results) {
  for (const w of warnings) console.warn(`⚠ ${name}: ${w}`);
  for (const e of errors) {
    console.error(`✗ ${name}: ${e}`);
    hasErrors = true;
  }
  if (errors.length === 0) {
    const size = bundleBytes ? ` (bundle ${(bundleBytes / 1024).toFixed(1)}KB across ${bundleFileCount} file(s))` : "";
    console.log(`✓ ${name}${size}`);
  }
}

if (skillNames.length === 0) {
  console.error("✗ no skill folders found under skills/");
  hasErrors = true;
}

process.exit(hasErrors ? 1 : 0);
