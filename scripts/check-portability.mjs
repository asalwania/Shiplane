#!/usr/bin/env node
// Validates every skills/<name>/SKILL.md: frontmatter shape, the SKILL.md
// line budget, and — now that skills can carry bundled mode/pattern/flow
// files — a bundle byte budget so decomposition doesn't quietly balloon
// what a skill costs to load.
// No dependencies on purpose — this repo's only build step should never need `npm install`.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SKILLS_DIR = new URL("../skills/", import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, "$1");

// SKILL.md line budget (unchanged from the original check.mjs): it loads in
// full on every invocation, so every line is a cost paid repeatedly.
const SOFT_LINE_BUDGET = 100;
const HARD_LINE_BUDGET = 220;

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
    const fieldMatch = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
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
    else if (!/use when/i.test(frontmatter.description)) warnings.push('description has no "Use when" trigger clause');
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

  return { name, errors, warnings, bundleBytes, bundleFileCount: bundleFiles.length };
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
for (const name of skillNames) {
  const { errors, warnings, bundleBytes, bundleFileCount } = checkSkill(name);
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
