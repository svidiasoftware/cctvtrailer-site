import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// -----------------------------------------------------------------------------
// Dynamic sitemap.xml
//
// Auto-discovers every static page under src/pages/ and emits a sitemap with
// per-route priority/changefreq overrides. Lastmod is derived from the source
// file's mtime, so sitemap entries move automatically when content is edited.
//
// When a new page is added under src/pages/ (that isn't in `excludePaths`),
// it is included in the sitemap on next build — no manual sitemap edits
// required. Per CLAUDE.md's "keep sitemap updated" rule.
//
// If you need to override priority/changefreq for a route, add it to
// `overrides` below. If a route should NOT appear in the sitemap (e.g. a
// success page), add it to `excludePaths`.
// -----------------------------------------------------------------------------

const SITE = 'https://www.cctvtrailer.com';

type VideoEntry = {
  thumbnail_loc: string;
  title: string;
  description: string;
  content_loc: string;
  player_loc: string;
  duration: number;
  publication_date: string;
  tags: string[];
  category: string;
};

type Override = {
  priority?: string;
  changefreq?: string;
  lastmod?: string;
  video?: VideoEntry;
};

const defaults = { priority: '0.7', changefreq: 'monthly' } as const;

const overrides: Record<string, Override> = {
  '/': { priority: '1.0', changefreq: 'weekly' },

  // Top-tier commercial pages
  '/services': { priority: '0.9', changefreq: 'monthly' },
  '/pricing': { priority: '0.9', changefreq: 'weekly' },
  '/contact': { priority: '0.8', changefreq: 'monthly' },
  '/locations': { priority: '0.9', changefreq: 'monthly' },
  '/same-day-security-rental': { priority: '0.95', changefreq: 'weekly' },
  '/roi-calculator': { priority: '0.9', changefreq: 'weekly' },
  '/security-trailer-vs-guards': { priority: '0.9', changefreq: 'monthly' },

  // Tacoma sub-verticals (high-performing)
  '/tacoma-auto-dealer-security': { priority: '0.9', changefreq: 'monthly' },
  '/tacoma-construction-site-security': { priority: '0.9', changefreq: 'monthly' },
  '/tacoma-retail-parking-lot-security': { priority: '0.9', changefreq: 'monthly' },

  // Solutions
  '/solutions/equipment-theft-prevention': { priority: '0.9', changefreq: 'monthly' },
  '/solutions/vandalism-prevention': { priority: '0.9', changefreq: 'monthly' },
  '/solutions/copper-wire-theft-prevention': { priority: '0.8', changefreq: 'monthly' },

  // Conversion-priority pages
  '/case-studies': { priority: '0.85', changefreq: 'monthly' },
  '/construction-security': { priority: '0.85', changefreq: 'monthly' },
  '/event-security': { priority: '0.85', changefreq: 'monthly' },
  '/emergency-surveillance': { priority: '0.85', changefreq: 'monthly' },
  '/construction-site-security-guide-2025': { priority: '0.8', changefreq: 'monthly' },
  '/construction-compliance-guide': { priority: '0.85', changefreq: 'monthly' },
  '/insurance-security-requirements': { priority: '0.85', changefreq: 'monthly' },
  '/mobile-vs-fixed-surveillance': { priority: '0.85', changefreq: 'monthly' },
  '/bellevue-surveillance-trailer': { priority: '0.85', changefreq: 'monthly' },
  '/everett-mobile-security-trailer': { priority: '0.85', changefreq: 'monthly' },
  '/seattle-construction-security': { priority: '0.85', changefreq: 'monthly' },
  '/solar-powered-surveillance': { priority: '0.85', changefreq: 'monthly' },
  '/wireless-security-systems': { priority: '0.85', changefreq: 'monthly' },

  // City pages (standard)
  '/tacoma-security-trailer': { priority: '0.8', changefreq: 'monthly' },
  '/seattle-surveillance-rental': { priority: '0.8', changefreq: 'monthly' },
  '/kent-security-rental': { priority: '0.8', changefreq: 'monthly' },
  '/federal-way-surveillance': { priority: '0.8', changefreq: 'monthly' },
  '/olympia-mobile-cctv': { priority: '0.8', changefreq: 'monthly' },
  '/puyallup-fairgrounds-security': { priority: '0.8', changefreq: 'monthly' },
  '/auburn-manufacturing-security': { priority: '0.8', changefreq: 'monthly' },
  '/lakewood-jblm-security': { priority: '0.8', changefreq: 'monthly' },
  '/bremerton-naval-security': { priority: '0.8', changefreq: 'monthly' },
  '/fife-security-rental': { priority: '0.8', changefreq: 'monthly' },

  // Technology pages
  '/trailer-technology': { priority: '0.8', changefreq: 'monthly' },
  '/trailer-standalone-hybrid-power-architecture': { priority: '0.8', changefreq: 'monthly' },
  '/video-technology': { priority: '0.8', changefreq: 'monthly' },
  '/security-cost-calculator': { priority: '0.8', changefreq: 'monthly' },

  // /technical-specifications has an embedded YouTube video → video sitemap
  '/technical-specifications': {
    priority: '0.9',
    changefreq: 'monthly',
    video: {
      thumbnail_loc: 'https://i.ytimg.com/vi/WZh4h-t1D18/maxresdefault.jpg',
      title: 'Mobile Surveillance Trailer Technical Specifications | CCTV Trailer',
      description:
        'Explore the technical specifications and features of our advanced mobile surveillance trailers, including PTZ cameras, S-VIDIA technology, and solar power systems.',
      content_loc: 'https://www.youtube.com/watch?v=WZh4h-t1D18',
      player_loc: 'https://www.youtube-nocookie.com/embed/WZh4h-t1D18',
      duration: 150,
      publication_date: '2024-10-15T00:00:00+00:00',
      tags: [
        'mobile surveillance trailer',
        'CCTV trailer',
        'security system',
        'construction site security',
        'PTZ cameras',
        'S-VIDIA technology',
      ],
      category: 'Security Technology',
    },
  },

  // Supporting content
  '/about': { priority: '0.7', changefreq: 'monthly' },
  '/faq': { priority: '0.7', changefreq: 'monthly' },
  '/how-to-secure-construction-site': { priority: '0.7', changefreq: 'monthly' },
  '/how-to-setup-security-trailer': { priority: '0.7', changefreq: 'monthly' },
  '/how-to-calculate-security-roi': { priority: '0.7', changefreq: 'monthly' },
  '/sitemap': { priority: '0.5', changefreq: 'monthly' },
  '/privacy-policy': { priority: '0.3', changefreq: 'yearly' },

  // Blog hub
  '/blog': { priority: '0.7', changefreq: 'weekly' },
};

// Pages to exclude from sitemap (not meant for direct indexing)
const excludePaths = new Set([
  '/404',
  '/contact-success', // post-submit thank-you page
  '/roi-calculator-widget', // embedded widget route, not a landing page
]);

// Individual blog posts default to priority 0.75 / monthly.
// Override specific posts here if needed.
const blogOverrides: Record<string, Override> = {
  '/blog/how-much-cost-rent-security-trailer': { priority: '0.85', changefreq: 'weekly' },
};

function routeFromRel(rel: string): string {
  let r = rel.replace(/^\.\//, '').replace(/\.astro$/, '');
  r = r.replace(/\/index$/, '');
  return r === 'index' ? '/' : '/' + r;
}

function resolveAbsPath(rel: string): string {
  // src/pages/sitemap.xml.ts is the caller, so rel is relative to src/pages/.
  return path.resolve(process.cwd(), 'src/pages', rel.replace(/^\.\//, ''));
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const modules = import.meta.glob('./**/*.astro');

  type Entry = {
    path: string;
    lastmod: string;
    priority: string;
    changefreq: string;
    video?: VideoEntry;
  };

  const entries: Entry[] = [];

  for (const rel of Object.keys(modules)) {
    const route = routeFromRel(rel);

    // Skip dynamic routes and explicit excludes
    if (route.includes('[')) continue;
    if (excludePaths.has(route)) continue;

    // Resolve per-route override (blog posts fall through to blogOverrides
    // default if present, otherwise defaults)
    const isBlogPost = route.startsWith('/blog/') && route !== '/blog';
    const o: Override =
      overrides[route] ??
      (isBlogPost
        ? blogOverrides[route] ?? { priority: '0.75', changefreq: 'monthly' }
        : {});

    // Determine lastmod from file mtime
    let lastmod: string;
    try {
      lastmod = fs.statSync(resolveAbsPath(rel)).mtime.toISOString().split('T')[0];
    } catch {
      lastmod = new Date().toISOString().split('T')[0];
    }

    entries.push({
      path: route,
      lastmod: o.lastmod ?? lastmod,
      priority: o.priority ?? defaults.priority,
      changefreq: o.changefreq ?? defaults.changefreq,
      video: o.video,
    });
  }

  // Root first, then alphabetical
  entries.sort((a, b) => {
    if (a.path === '/') return -1;
    if (b.path === '/') return 1;
    return a.path.localeCompare(b.path);
  });

  const urlBlocks = entries
    .map((u) => {
      const loc = `${SITE}${u.path === '/' ? '/' : u.path}`;
      let videoBlock = '';
      if (u.video) {
        const v = u.video;
        videoBlock = `
    <video:video>
      <video:thumbnail_loc>${escapeXml(v.thumbnail_loc)}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>${escapeXml(v.content_loc)}</video:content_loc>
      <video:player_loc>${escapeXml(v.player_loc)}</video:player_loc>
      <video:duration>${v.duration}</video:duration>
      <video:publication_date>${v.publication_date}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
${v.tags.map((t) => `      <video:tag>${escapeXml(t)}</video:tag>`).join('\n')}
      <video:category>${escapeXml(v.category)}</video:category>
    </video:video>`;
      }
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${videoBlock}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlBlocks}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
