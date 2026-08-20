#!/usr/bin/env node
// Validates every skills/<name>/SKILL.md: frontmatter shape and size budget.
// No dependencies on purpose — this repo's only build step should never need `npm install`.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = new URL("../skills/", import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, "$1");
const SOFT_LINE_BUDGET = 100;
const HARD_LINE_BUDGET = 220;

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

function checkSkill(name) {
  const errors = [];
  const warnings = [];
  const path = join(SKILLS_DIR, name, "SKILL.md");

  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return { name, errors: [`missing SKILL.md at skills/${name}/SKILL.md`], warnings };
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

  return { name, errors, warnings };
}

const skillNames = readdirSync(SKILLS_DIR).filter((entry) => statSync(join(SKILLS_DIR, entry)).isDirectory());

let hasErrors = false;
for (const name of skillNames) {
  const { errors, warnings } = checkSkill(name);
  for (const w of warnings) console.warn(`⚠ ${name}: ${w}`);
  for (const e of errors) {
    console.error(`✗ ${name}: ${e}`);
    hasErrors = true;
  }
  if (errors.length === 0) console.log(`✓ ${name}`);
}

if (skillNames.length === 0) {
  console.error("✗ no skill folders found under skills/");
  hasErrors = true;
}

process.exit(hasErrors ? 1 : 0);
