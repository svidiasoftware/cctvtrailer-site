#!/usr/bin/env node
// -----------------------------------------------------------------------------
// update-blog-authors.mjs
//
// One-shot / idempotent migration: walks src/pages/blog/*.astro (skipping
// index.astro) and for each post:
//   1. Replaces the BlogPosting author from Organization → Person
//      (Val Zakharov, with knowsAbout + worksFor fields) in the inline
//      JSON-LD schema.
//   2. Adds `import AuthorBio from '../../components/AuthorBio.astro';`
//      to the frontmatter (only if missing).
//   3. Injects `<AuthorBio />` immediately before `</article>` (only if
//      missing).
//
// Safe to re-run — each step checks for existing state before modifying.
// Per SEO-GEO-plan.md section 4.11 #5 (Author E-E-A-T).
//
// Flags:
//   --dry-run            print which files would change without writing
//   --file <basename>    operate on a single file (for spot-checks)
// -----------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'pages', 'blog');

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
let onlyFile = null;
const ix = process.argv.indexOf('--file');
if (ix >= 0) onlyFile = process.argv[ix + 1];

const PERSON_AUTHOR = `"author": {
    "@type": "Person",
    "name": "Val Zakharov",
    "jobTitle": "Founder & Owner",
    "description": "Founder and owner of CCTV Trailer with 15 years of experience in the Pacific Northwest mobile surveillance and security industry, covering construction jobsite, warehouse, and event-security deployments across Pierce, King, Snohomish, and Kitsap counties.",
    "knowsAbout": ["Mobile CCTV Surveillance", "Construction Site Security", "Warehouse Security", "Event Security", "Puget Sound Security Operations"],
    "url": "https://www.cctvtrailer.com/about",
    "sameAs": ["https://www.linkedin.com/in/val-zakharov-293374397"],
    "worksFor": {
      "@type": "Organization",
      "name": "CCTV Trailer",
      "url": "https://www.cctvtrailer.com"
    }
  },`;

// Matches the original 5-line Organization author block.
const ORG_AUTHOR_RE =
  /"author":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"CCTV Trailer",\s*"url":\s*"https:\/\/www\.cctvtrailer\.com"\s*\},/;

// Matches ANY existing Person author block for Val Zakharov — lets us upgrade
// a v1 Person (no jobTitle/sameAs) to the current canonical shape without
// hand-crafted regexes for every intermediate state. Non-greedy across
// properties, and anchored on the closing `},` after the worksFor Org.
const PERSON_AUTHOR_RE =
  /"author":\s*\{\s*"@type":\s*"Person",\s*"name":\s*"Val Zakharov"[\s\S]*?"worksFor":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"CCTV Trailer",\s*"url":\s*"https:\/\/www\.cctvtrailer\.com"\s*\}\s*\},/;

const IMPORT_LINE =
  "import AuthorBio from '../../components/AuthorBio.astro';";

const files = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith('.astro') && f !== 'index.astro')
  .filter((f) => (onlyFile ? f === onlyFile : true))
  .sort();

let modified = 0;
let untouched = 0;
const failures = [];

for (const f of files) {
  const p = path.join(BLOG_DIR, f);
  const original = fs.readFileSync(p, 'utf8');
  let src = original;
  const changes = [];

  // 1. Normalise the author block to the current canonical Person shape.
  //    Order matters: try the Person upgrade first (most posts are here now),
  //    then the original Organization replacement for any greenfield post.
  if (PERSON_AUTHOR_RE.test(src)) {
    const before = src;
    src = src.replace(PERSON_AUTHOR_RE, PERSON_AUTHOR);
    if (src !== before) changes.push('person-author-upgrade');
  } else if (ORG_AUTHOR_RE.test(src)) {
    src = src.replace(ORG_AUTHOR_RE, PERSON_AUTHOR);
    changes.push('person-author');
  } else if (!src.includes('"name": "Val Zakharov"')) {
    failures.push(`${f}: could not find Organization author block to replace`);
    continue;
  }

  // 2. Add AuthorBio import (only if missing)
  if (!src.includes(IMPORT_LINE)) {
    // Insert after the last `import ... from '...';` line inside the
    // frontmatter fence. We assume the first `---\n...---\n` is the
    // Astro frontmatter.
    const fenceMatch = src.match(/^---\n([\s\S]*?)\n---\n/);
    if (!fenceMatch) {
      failures.push(`${f}: no Astro frontmatter fence found`);
      continue;
    }
    const fenceBody = fenceMatch[1];
    // Find index of last `import ...;` line in the fence body.
    const importLineRe = /^import [^;]+;$/gm;
    let lastImportEnd = -1;
    let m;
    while ((m = importLineRe.exec(fenceBody)) !== null) {
      lastImportEnd = m.index + m[0].length;
    }
    if (lastImportEnd === -1) {
      failures.push(`${f}: no import statements found in frontmatter`);
      continue;
    }
    const insertOffset = '---\n'.length + lastImportEnd;
    src =
      src.slice(0, insertOffset) +
      '\n' +
      IMPORT_LINE +
      src.slice(insertOffset);
    changes.push('add-import');
  }

  // 3. Inject <AuthorBio /> before </article> (only if missing)
  if (!/<AuthorBio\b/.test(src)) {
    // Find the last `</article>` (there should only be one, but be safe).
    const idx = src.lastIndexOf('</article>');
    if (idx === -1) {
      failures.push(`${f}: no </article> tag found`);
      continue;
    }
    // Find the start of that line to preserve indentation.
    const lineStart = src.lastIndexOf('\n', idx - 1) + 1;
    const indent = src.slice(lineStart, idx); // whitespace before </article>
    const injection = `${indent}<AuthorBio />\n\n`;
    src = src.slice(0, lineStart) + injection + src.slice(lineStart);
    changes.push('inject-component');
  }

  if (src !== original) {
    if (!dryRun) fs.writeFileSync(p, src);
    console.log(`${dryRun ? '[dry] ' : ''}✓ ${f}  (${changes.join(', ')})`);
    modified++;
  } else {
    console.log(`- ${f}  (already up to date)`);
    untouched++;
  }
}

console.log(
  `\n${modified} modified, ${untouched} untouched, ${failures.length} failed.`
);
if (failures.length) {
  for (const line of failures) console.error(`  ! ${line}`);
  process.exit(1);
}
