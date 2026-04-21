#!/usr/bin/env node
// -----------------------------------------------------------------------------
// validate-schema.mjs
//
// Walks src/pages/**/*.{astro,mdx,md} and extracts every
//   <script type="application/ld+json">...</script>
// block, running JSON.parse on each. Exits non-zero (and lists all offenders)
// if any block fails to parse.
//
// Runs as `prebuild` so a broken schema block breaks the build before deploy —
// this is what catches the "copy/pasted JSON-LD with a trailing comma or curly
// quote" class of bug that used to slip past manual review.
//
// Usage:
//   node scripts/validate-schema.mjs          # validate
//   npm run validate:schema                   # same, via npm
//   (invoked automatically by `npm run build` via the prebuild hook)
// -----------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Walk every Astro source file that could contain a <script type="application/ld+json">
// block — pages, layouts, and components all emit schema.
const SCAN_DIRS = [
  path.join(ROOT, 'src', 'pages'),
  path.join(ROOT, 'src', 'layouts'),
  path.join(ROOT, 'src', 'components'),
].filter((d) => fs.existsSync(d));

// Matches <script type="application/ld+json" ...>BODY</script>. The `is`
// flags (s = dotall, i = case-insensitive) let BODY span newlines and tolerate
// odd casing. The `g` flag lets us iterate every block in the file.
const SCHEMA_RE =
  /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

/**
 * Recursively yield absolute paths to every file under `dir` matching any of
 * the given extensions.
 */
function* walk(dir, exts) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full, exts);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      yield full;
    }
  }
}

/**
 * Given the full source of a file and the character offset where a match
 * begins, return the 1-based line number of that offset.
 */
function lineOf(source, offset) {
  let line = 1;
  for (let i = 0; i < offset && i < source.length; i++) {
    if (source.charCodeAt(i) === 10 /* \n */) line++;
  }
  return line;
}

const failures = [];
let fileCount = 0;
let blockCount = 0;

for (const dir of SCAN_DIRS) {
  for (const file of walk(dir, ['.astro', '.mdx', '.md'])) {
    fileCount++;
    const source = fs.readFileSync(file, 'utf8');
    SCHEMA_RE.lastIndex = 0;
    let match;
    let blockIdxInFile = 0;
    while ((match = SCHEMA_RE.exec(source)) !== null) {
      blockCount++;
      blockIdxInFile++;
      const rawBody = match[1];
      const bodyOffset = match.index + match[0].indexOf(rawBody);
      const line = lineOf(source, bodyOffset);

      // Astro files sometimes interpolate ${expr} inside JSON-LD. We cannot
      // parse those without running the template engine, so we skip blocks
      // that contain an unescaped `${` — the build itself will surface
      // template errors. Pure static JSON is what we guard here.
      if (/\$\{/.test(rawBody)) continue;

      const body = rawBody.trim();
      if (!body) continue;

      try {
        JSON.parse(body);
      } catch (err) {
        failures.push({
          file: path.relative(ROOT, file),
          line,
          block: blockIdxInFile,
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }
}

if (failures.length > 0) {
  console.error(
    `\n\u2717 validate-schema: ${failures.length} invalid JSON-LD block(s) in ${fileCount} file(s):\n`
  );
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}  (block #${f.block})`);
    console.error(`    ${f.message}\n`);
  }
  process.exit(1);
}

console.log(
  `\u2713 validate-schema: ${blockCount} JSON-LD block(s) across ${fileCount} page file(s) parsed cleanly.`
);
