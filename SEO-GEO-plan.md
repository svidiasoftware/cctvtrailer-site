# CCTV Trailer — SEO & GEO Optimization Roadmap

_Prepared: 2026-04-21 · Focus region: Puget Sound (Tacoma, Seattle, Bellevue, Everett, Federal Way, Kent, Auburn, Lakewood, Puyallup, Olympia, Bremerton, surrounding WA)_

---

## 1. Executive summary

The site has strong foundational SEO plumbing (clean Astro build, normalized canonicals, LocalBusiness/FAQ/Product schemas, geo meta tags, sitemap, 67 well-structured pages). But three structural problems are holding back organic growth:

1. **Indexation collapse** — only 44 of 123 discovered URLs are indexed (36%). 30 pages are "Crawled – currently not indexed" (quality signal), 31 legacy URLs redirect with validation failing, and 8 URLs return 404. This is the single biggest leak.
2. **GA4 is receiving zero data.** Consent Mode defaults to `analytics_storage: 'denied'` and there is no consent banner to grant it, so every visitor is silently blocked. The site has been flying blind on user behavior.
3. **Location pages are orphaned from the primary navigation.** No Puget Sound city page is linked from the Header or Footer. Crawlers reach them only through body-copy "related pages" modules, which is why impressions are tiny on the very pages that should dominate local search.

Current snapshot (GSC, last 90 days): **321 clicks · 23,000 impressions · 1.4% CTR · avg position 21.4**. Two pages account for 70% of all clicks (solar-powered-surveillance + technical-specifications). The rest of the site is effectively dead weight in Search.

The plan below is sequenced so the quickest wins (indexation, tracking, nav) ship first, then content depth and GEO expansion layer on top.

---

## 2. Current state — data snapshot

### 2.1 Google Search Console (90 days ending 2026-04-19)

| Metric | Value |
|---|---|
| Total clicks | 321 |
| Total impressions | 23,000 |
| Avg CTR | 1.4% |
| Avg position | 21.4 |
| Indexed pages | 44 |
| Not indexed pages | 79 |

**Top pages by clicks**

| URL | Clicks | Impressions | CTR | Avg pos |
|---|---:|---:|---:|---:|
| /solar-powered-surveillance | 116 | 2,708 | 4.3% | 30.3 |
| /technical-specifications | 107 | 4,262 | 2.5% | 36.9 |
| /blog/how-much-cost-rent-security-trailer | 31 | 3,532 | 0.9% | 7.4 |
| / (home) | 22 | 3,978 | 0.6% | 28.5 |
| /seattle-surveillance-rental | 9 | 392 | 2.3% | 31.0 |
| /trailer-technology | 6 | 1,157 | 0.5% | 18.5 |
| /construction-site-security-guide-2025 | 5 | 1,257 | 0.4% | 8.1 |
| /pricing | 4 | 513 | 0.8% | 8.7 |
| /kent-security-rental | 2 | 44 | 4.5% | 24.1 |

**Top queries (opportunity segments)**

| Query | Clicks | Impressions | CTR | Avg pos | Observation |
|---|---:|---:|---:|---:|---|
| mobile security camera trailer | 16 | 99 | 16.2% | 5.9 | Healthy — defend |
| mobile surveillance trailer | 13 | 224 | 5.8% | 3.7 | Healthy — defend |
| security camera trailer | 10 | 631 | 1.5% | 3.6 | **High-rank, low-CTR — title/meta rewrite** |
| cctv trailer | 4 | 1,248 | 0.3% | 16.2 | **Brand-adjacent, 1,248 imps wasted — push to page 1** |
| mobile surveillance trailer rental cost | 5 | 398 | 1.3% | 11.4 | Close to page 1, own with pricing content |
| solar trailer | 6 | 203 | 0% | 20.2 | Intent ambiguous; low priority |
| security camera trailer for sale | 7 | 107 | 0% | 5.6 | **Intent mismatch** — we sell rental |
| mobile surveillance trailer for sale | 9 | 139 | 6.5% | 4.1 | Same — clarify rental vs sale |

**Index coverage breakdown (79 not-indexed pages)**

| Reason | Pages | Cause |
|---|---:|---|
| Page with redirect | 31 | Legacy URL redirect chains, validation failing |
| Crawled – currently not indexed | 30 | Quality signal: thin / duplicative content |
| Not found (404) | 8 | Dead links in sitemap or external refs |
| Discovered – not indexed | 6 | Crawl budget, weak internal linking |
| Alternate page w/ canonical | 2 | Expected |
| Duplicate, Google chose different canonical | 1 | Canonical mismatch |
| Excluded by `noindex` | 1 | Expected |

**Core Web Vitals:** GSC says "Not enough usage data in the last 90 days" for both mobile and desktop — not failing, just lacking real-user data. Lab data must be used until traffic grows.

### 2.2 Google Analytics 4 (property `G-VBNN5TGJ7D`)

GA4 shows: _"No data received from your website yet."_ Zero sessions, zero users, last 28 days and all-time. Root cause identified (see §4.2).

### 2.3 Competitive landscape — Puget Sound

| Competitor | Positioning | Coverage |
|---|---|---|
| FSI Security & Technology (Bellevue) | Solar camera trailers, "designed for WA weather" | Bellevue, Everett, Kent, Seattle |
| United Security Patrol | "Mobile security trailers installed in minutes" | Seattle, Bellevue, Kent |
| Central Protection (Seattle) | Tailored security strategy, mobile trailers | Seattle |
| HPD Security | Construction site security (guards + tech) | Seattle, Puget Sound |
| Diligence Security | 24/7 fire watch, patrol, mobile trailers | Seattle, Bellevue, Kent |
| Sound Surveillance | AI 4K cameras + human monitoring | Seattle, Tacoma, PNW |
| Street Smart Rental | National brand, mobile cameras | Nationwide |
| Edge CCTV, WCCTV USA, Video Security Trailer Rental | National rental brands | Nationwide |

**Gaps vs. competitors:** Bellevue, Everett, Renton, Kirkland, and Redmond are served by FSI, United Security, and Diligence — CCTV Trailer has no dedicated page for any of them.

---

## 3. Gap matrix (severity × effort)

| # | Gap | Severity | Effort | Owner area |
|---|---|---|---|---|
| G1 | GA4 receiving zero data (consent denied by default, no banner) | **P0** | S | Analytics |
| G2 | 79/123 pages not indexed (31 redirect, 30 quality, 8 404) | **P0** | M | Tech SEO |
| G3 | Location pages orphaned from Header/Footer | **P0** | S | IA/links |
| G4 | Expired `priceValidUntil` dates (2025-12-31) in Product schema | **P0** | S | Schema |
| G5 | High-impression queries with <1% CTR (titles/meta) | **P1** | S | On-page |
| G6 | "For sale" query intent mismatch on rental pages | **P1** | M | Content |
| G7 | Trailing-slash canonical duplication (both `/x` and `/x/` in GSC) | **P1** | S | Tech SEO |
| G8 | Missing Puget Sound cities (Bellevue, Everett, Renton, Kirkland, Redmond) | **P1** | L | GEO content |
| G9 | No Google Business Profile signals in the data we could see | **P1** | S | GEO |
| G10 | Thin "Crawled – not indexed" pages need depth | **P1** | L | Content |
| G11 | Blog has no category/tag taxonomy, limited topical silos | **P2** | M | Content IA |
| G12 | No real-user CWV data; lab perf likely OK but unmeasured | **P2** | S | Perf |
| G13 | No author bios / E-E-A-T signals on blog posts | **P2** | M | Content trust |
| G14 | Limited review/testimonial diversity (3 reviews in schema) | **P2** | M | GEO trust |
| G15 | robots.txt blocks SemrushBot & AhrefsBot — fine, but blocks self-audit tools | **P3** | S | Tech SEO |
| G16 | No hreflang or language signals (fine for now; single-language) | P3 | — | — |

---

## 4. Prioritized roadmap

### Phase 0 — Stop the leaks (week 1)

#### 4.1 — Fix GA4 tracking (G1)

The current `OptimizedScripts.astro` sets Consent Mode defaults to `analytics_storage: 'denied'` and there is no consent banner anywhere on the site to upgrade consent. Every pageview is silently dropped.

Choose one of the two safe paths:

**Option A — Ship a cookie banner.** Add a minimal consent banner (e.g. CookieYes, Cookiebot, or a hand-rolled one) that, on "Accept", calls:

```js
gtag('consent', 'update', {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
});
```

**Option B — Switch defaults to granted for `analytics_storage`** (legal only in jurisdictions where implied consent for first-party analytics is acceptable — the US is generally OK for anonymous GA4; WA residents and Europeans would still require a banner). In `src/components/OptimizedScripts.astro`:

```diff
- 'analytics_storage': 'denied',
+ 'analytics_storage': 'granted',
```

Either way, verify in GTM that a GA4 Configuration tag is attached to `GTM-5FPMNFLV` with Measurement ID `G-VBNN5TGJ7D` and fires on All Pages. If the tag exists but consent is still blocking it, confirm its "Consent Settings" require only `analytics_storage`. Use GTM Preview + GA4 DebugView to validate.

Also remove the stale comment in `src/config/analytics.js` — the `searchConsoleVerification: 'YOUR_VERIFICATION_CODE_HERE'` placeholder should either be set or deleted.

**Success criterion:** GA4 Realtime shows your own pageview within 10 minutes of deploy.

#### 4.2 — Reclaim indexation (G2)

Actions in sequence:

1. **Run the 404 list.** In GSC → Indexing → Pages → "Not found (404)" — export the 8 URLs. For each: either 301-redirect to the closest live page, or delete from sitemap. Do not leave sitemap-listed 404s; Google punishes crawl trust.
2. **Audit the 31 redirects.** These are "Page with redirect" validations that failed. Most likely these are pre-migration URLs. Decide: keep the 301s (map in `vercel.json`), or if they're no longer earning anything, remove them from external references and any internal links. Make sure every redirect is a single-hop 301 to a 200 page.
3. **Fix the 30 "Crawled – currently not indexed."** These are the quality-signal victims. Priority order based on GSC impressions:
   - `/construction-security` (613 imps, 0 clicks): expand to 1,800+ words, add case study, FAQ, photos, internal links to 4–5 city pages.
   - `/blog/construction-site-security-mobile-vs-fixed` (574 imps): add data tables, chart, OG image, internal link back.
   - `/services` (476 imps): rewrite as hub page linking each vertical + city.
   - `/solutions/copper-wire-theft-prevention` (405 imps): add Puget Sound stats, 2026 incident data, internal CTA.
   - `/insurance-security-requirements` (368 imps): add specific insurer requirement templates (common asks by Liberty Mutual, Travelers, Zurich, etc.).
   - `/emergency-surveillance`, `/roi-calculator`, `/mobile-vs-fixed-surveillance`, `/how-to-calculate-security-roi`, `/case-studies`, `/security-trailer-vs-guards`, `/seattle-construction-security`, `/tacoma-security-trailer`, `/olympia-mobile-cctv`, `/same-day-security-rental`, `/bremerton-naval-security`, `/lakewood-jblm-security`, `/tacoma-construction-site-security`, `/tacoma-retail-parking-lot-security`, `/federal-way-surveillance`, `/puyallup-fairgrounds-security`, `/trailer-standalone-hybrid-power-architecture`: each needs a minimum-viable-content pass: unique H1, unique meta description, 1,200+ words of original local info, one local photo with alt text, FAQ block, 3+ internal links to related hub, breadcrumb schema present, service-area schema.
4. **Re-submit via GSC URL Inspection → Request Indexing** for each fixed page (10/day rate limit).

**Success criterion:** Indexed pages ≥ 60 within 30 days; ≥ 90 within 90 days.

#### 4.3 — Wire location pages into the nav (G3)

Location pages get zero crawl priority when they have zero inbound site links from the global nav. Two changes in `src/components/Footer.astro`:

- Add a new **"Service Areas"** column listing all 14 city pages. Group: Tacoma (Tacoma, Fife, Puyallup, Lakewood, Auburn), Seattle metro (Seattle construction, Seattle surveillance rental, Kent, Federal Way), South Sound & Peninsula (Olympia, Bremerton, JBLM/Lakewood).
- In `src/components/Header.astro`, add a **"Service Areas" dropdown** or at minimum a "Locations" link pointing to a new `/locations` hub.

Then create `/src/pages/locations.astro` as a hub page: map of service areas, list of all 14 city pages with 1-sentence descriptor, FAQ, LocalBusiness schema with multi-city `serviceArea`. This also gives you a landing page for the search "cctv trailer service areas Tacoma Seattle".

**Success criterion:** Each city page gets ≥ 5 global-nav inbound links within a week.

#### 4.4 — Refresh expired schema dates (G4)

In `src/pages/pricing.astro` and anywhere else using `priceValidUntil: "2025-12-31"`, set to a rolling 12-month date (`2027-04-21`) or compute dynamically. Also verify the rental prices match the site copy (currently schema says $499–999/day, $3,499–4,000/week, $7,999+/month — validate against `CLAUDE.md`'s pricing rule).

```bash
grep -rn "priceValidUntil" src/
```

Update all instances.

---

### Phase 1 — Own the queries we already show up for (weeks 2–4)

#### 4.5 — Rewrite titles/meta for low-CTR high-impression pages (G5)

Target: pages with ≥ 300 impressions and CTR < 1%.

| Page | Current issue | Action |
|---|---|---|
| /technical-specifications | 4,262 imps, 2.5% CTR, pos 36.9 | Position is weak but CTR could double. Rewrite title to front-load "Mobile Surveillance Trailer Specs & 4K PTZ Features — CCTV Trailer" and meta to include "solar, 360°, same-day setup". |
| /event-security | 844 imps, 0.1% CTR, pos 11.4 | Title probably too generic. Test: "Event Security Trailer Rental Tacoma–Seattle · 24/7 Mobile Surveillance". |
| /construction-security | 613 imps, 0% CTR, pos 33 | Weak ranking + thin content. Rewrite meta to include price ("from $499/day") and "Pierce County · King County". |
| /construction-site-security-guide-2025 | 1,257 imps, 0.4% CTR, pos 8.1 | Near page 1 but losing clicks. Rewrite title to "How to Secure a Construction Site in 2026 · Puget Sound Guide" and meta to include specific value prop (e.g. "OSHA-compliant, reduces theft 85%"). |
| /blog/how-much-cost-rent-security-trailer | 3,532 imps, 0.9% CTR, pos 7.4 | This is your closest page-1 candidate — rewrite title to "Security Trailer Rental Cost: 2026 Pricing Guide ($499–$8K)" and meta with price range + "no deposit, same-day". |
| /solutions/copper-wire-theft-prevention | 405 imps, 0% CTR, pos 14.9 | Title likely generic. Front-load "Copper Theft Prevention for Construction Sites · Seattle–Tacoma". |

Keep titles under 60 characters, meta descriptions 140–155 characters. Always include a location modifier for the service/location pages.

#### 4.6 — Resolve "for sale" intent mismatch (G6)

~20 queries in the top 200 are "X for sale" where we rank but serve rental content. Options:

1. Add a prominent "Not for rent — looking to buy? See our [XYZ partners / industry guide]" block on the pages attracting these queries. This improves user satisfaction (reduces pogo-sticking) and might even get us a rich snippet as a rental alternative.
2. Create a new page `/security-trailer-rental-vs-purchase` that captures "for sale" intent, educates on the cost/operations tradeoff, and redirects the reader toward rental. Target meta: "Security Trailer: Rent or Buy? Puget Sound 2026 Cost Comparison".

#### 4.7 — Fix trailing-slash canonical duplication (G7)

GSC shows both `/solar-powered-surveillance` and `/solar-powered-surveillance/` as separate entries. This is fragmenting signals. Action:

1. In `vercel.json`, add redirects from `/<slug>/` → `/<slug>` (301) for all non-root paths. Example:

```json
"redirects": [
  { "source": "/:path((?!api).*)/", "destination": "/:path", "permanent": true }
]
```

2. Verify `Layout.astro` canonical normalization (already handles trailing slash removal — good). The issue is Google knows the trailing-slash versions exist; a server 301 is what solves it.
3. Audit `public/sitemap.xml` for any trailing-slash entries and remove them.

---

### Phase 2 — GEO expansion (weeks 4–10)

Goal: rank page 1 for "mobile surveillance trailer {city}" in the 10 most valuable Puget Sound cities, and own the "near me" local-pack signals.

#### 4.8 — Existing city pages — depth pass (G10)

For each of the 14 existing location pages, bring them up to a consistent quality bar:

Template checklist (apply to every city page):

- [ ] Unique H1 with `{Service} in {City}, WA`
- [ ] Unique meta description (140–155 chars) with price and phone
- [ ] 1,500–2,500 words of local, original content:
  - Intro grounded in local context (a specific neighborhood, industry, or crime stat for that city)
  - 3+ real local landmarks / business districts named
  - Local crime or construction stat with citation (Pierce County Sheriff, Tacoma PD CompStat, WA L&I, NICB)
  - 2 embedded case studies or customer quotes from that city
  - "Service area" map section (embedded or hand-drawn radius image)
  - Pricing for that city (can be the same numbers, but phrased locally)
  - FAQ block (5–7 Q&A, location-specific)
- [ ] Local photo with descriptive alt text ("Mobile surveillance trailer on Seattle construction site near SR-99")
- [ ] `LocalBusiness` schema with `areaServed: City`, `geo`, and `containsPlace` for local landmarks
- [ ] `BreadcrumbList` schema: Home → Service Areas → {City}
- [ ] `FAQPage` schema for the FAQ block
- [ ] 3 internal links: to the primary service hub, to an adjacent city, and to a relevant blog post
- [ ] 1 internal link from `/locations` hub
- [ ] `lastmod` updated in sitemap.xml

#### 4.9 — Create missing Puget Sound city pages (G8)

Priority order based on population × competitor pressure × likely search volume:

| Priority | City | Proposed URL | Primary angle |
|---|---|---|---|
| P1 | Bellevue | /bellevue-surveillance-trailer | Tech campus / Amazon / Microsoft contractor security |
| P1 | Everett | /everett-mobile-security-trailer | Boeing, port, I-5 corridor warehouse |
| P1 | Renton | /renton-construction-security | Boeing, data centers, I-405 builds |
| P1 | Kirkland/Redmond | /kirkland-redmond-security-rental | Tech corridor, high-value electronics theft |
| P2 | Gig Harbor | /gig-harbor-security-trailer | Marinas, residential construction |
| P2 | Bellingham | /bellingham-mobile-surveillance | Port, WWU, border logistics |
| P2 | Lacey / Thurston Co. | /lacey-mobile-cctv | State capitol region, warehouse |
| P3 | Sammamish | /sammamish-security-trailer | Upscale residential, HOAs |
| P3 | Lynnwood / Bothell | /lynnwood-bothell-surveillance | Light rail expansion construction |

Each new page follows the Phase 2.8 template. Add to `public/sitemap.xml` and `src/pages/sitemap.astro` on creation, per CLAUDE.md.

#### 4.10 — Google Business Profile (G9)

Off-repo, but critical for GEO. Confirm / complete the GBP listing at business.google.com:

- [ ] Verify the Tacoma address or declare as service-area business (SAB) listing all Puget Sound cities
- [ ] Primary category: **Security system supplier**; secondary: **Security service**, **Security system installer**
- [ ] All service categories filled in (Construction site security, Event security, Mobile surveillance, etc.)
- [ ] Business hours, phone, website all match schema/LocalBusiness
- [ ] 15+ photos (trailer on-site at recognizable locations, team, equipment close-ups)
- [ ] Weekly GBP Posts (service highlights, case studies, new blog links)
- [ ] Active review-solicitation flow — aim for ≥ 20 reviews in 12 months, natural pacing
- [ ] Q&A populated with 10+ common questions (same content as FAQ schema)
- [ ] Services and Products sections populated with prices (from `src/pages/pricing.astro`)

GBP is the single biggest GEO lever we don't have visibility into from the codebase.

#### 4.11 — Hyper-local content clusters (G11, G13)

Create topical clusters that make Google treat CCTV Trailer as _the_ Puget Sound authority:

1. **Puget Sound copper theft watch** — monthly blog series with new incident data (pull from kxly/kiro/kimd/king5 feeds; cite sources). Each post internal-links to `/solutions/copper-wire-theft-prevention` and 2 city pages.
2. **Construction boom map** — quarterly post mapping major active builds (light rail, Amazon Bellevue, Boeing, Microsoft, etc.) and the security gap at each.
3. **Event calendar** — seasonal post of Puget Sound events needing security (Emerald Downs, Washington State Fair, Tacoma Dome concerts, Seafair, Bumbershoot), linking `/event-security`.
4. **Local compliance** — pages/posts on WA DOSH, Tacoma PD theft reporting, King County construction code. These are evergreen and high-intent for B2B.
5. **Author E-E-A-T** — add author bios to each blog post with credentials ("Kevin, 15 years PNW security industry, formerly Pierce County Sheriff reserve"). Use `Person` schema.

---

### Phase 3 — Defensive & compounding (ongoing)

#### 4.12 — Core Web Vitals groundwork (G12)

Even though GSC has no real-user data yet, ensure lab scores stay green so when traffic grows you don't fail CWV later:

- Run PageSpeed Insights manually for: `/`, `/pricing`, `/services`, `/technical-specifications`, `/blog/how-much-cost-rent-security-trailer`, `/seattle-surveillance-rental`, and two new city pages once created.
- Target: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Hot spots to check: `OptimizedScripts.astro` defers GTM up to 3s (good), but confirm the hero image on `/` (tacoma-dome-bg-hero4.webp) uses `fetchpriority="high"` and `loading="eager"` — above-the-fold LCP image should never be lazy.
- Set up a monthly PSI run (could be a scheduled task) that saves scores to a CSV for trend tracking.

#### 4.13 — Review diversity (G14)

Current homepage has 3 reviews in schema. Google prefers naturally-growing review counts. Aim for 12+ reviews in the schema, pulled from GBP. Automate by having a small JSON file (`src/data/reviews.json`) that's imported by both `index.astro` and a new `/reviews` page. Each review should reference a different city / use case. Caveat: don't fabricate reviews — Google can and does detect it, and it violates their structured data guidelines.

#### 4.14 — Robots.txt decision (G15)

Current `public/robots.txt` blocks Ahrefs and Semrush bots. This hurts your own ability to run third-party SEO audits. Recommendation: unblock them. They don't hurt crawl budget meaningfully and you lose self-visibility. If you have no Ahrefs/Semrush seat, leaving them blocked is fine but you'll want a quarterly DIY audit using Screaming Frog (free for ≤500 URLs).

---

## 5. Per-page action list (top 20)

| Page | P0/P1/P2 | Action |
|---|---|---|
| `/pricing` | P0 | Fix `priceValidUntil` (2025-12-31 expired); add same-day rental CTA |
| `/` (home) | P0 | Expand internal links from 4 to 15+ (hit all services + 6 top cities) |
| `/services` | P1 | Rewrite as hub linking each vertical + each city; 2,000+ words |
| `/construction-security` | P1 | Content expansion; add 3 Puget Sound case studies |
| `/technical-specifications` | P1 | Title rewrite + add spec comparison table (S-VIDIA vs generic) |
| `/construction-site-security-guide-2025` | P1 | Rename to /construction-site-security-guide-2026; update date; update content |
| `/solar-powered-surveillance` | P1 | Leverage page's 4.3% CTR — add 3 related city pages at bottom |
| `/seattle-surveillance-rental` | P1 | Add SODO/Ballard/Georgetown neighborhood sections |
| `/tacoma-security-trailer` | P1 | Already strongest city page; add Fife/Puyallup sub-sections |
| `/olympia-mobile-cctv` | P1 | Add Lacey + Tumwater + JBLM-north; Thurston Co. crime context |
| `/bremerton-naval-security` | P1 | Add Silverdale, Port Orchard, Kitsap Co. |
| `/lakewood-jblm-security` | P1 | Military-contractor compliance angle |
| `/federal-way-surveillance` | P1 | Add Milton, Auburn-adjacent, SR-18 corridor |
| `/kent-security-rental` | P1 | Warehouse corridor — already 4.5% CTR, lean in |
| `/solutions/copper-wire-theft-prevention` | P1 | Add 2026 Seattle-Tacoma incident data |
| `/blog/how-much-cost-rent-security-trailer` | P1 | Rewrite title, add 2026 price table, add CTA |
| `/emergency-surveillance` | P1 | Add real deployment time log (e.g. "avg 4.2 hr response Q1 2026") |
| `/case-studies` | P1 | Add 3+ Puget Sound case studies with photos |
| `/blog/event-security-seattle-tacoma-summer-2026` | P2 | Keep calendar current; link from `/event-security` |
| `/insurance-security-requirements` | P2 | Add specific insurer templates |

---

## 6. Analytics & tracking plan

### 6.1 Minimum viable tracking (after GA4 is fixed)

Configure these as GA4 key events (`Admin → Events → Mark as key event`):

- `form_submit` (already pushed via dataLayer — matches GA4's recommended event name)
- `phone_click` (already pushed)
- `quote_request` (already pushed)
- `cta_click` (already pushed)
- `pricing_calculator_interaction` (already pushed)

Create the following GA4 Explorations:

1. **Landing page × conversion rate** — shows which SEO entry points actually convert.
2. **City × engagement** — break down sessions by `city` dimension (GA4 auto-captures) to validate GEO strategy.
3. **Query → landing page → conversion** (after linking Search Console to GA4).

### 6.2 Search Console → GA4 link

In GA4 Admin → Product Links → Search Console, connect the `sc-domain:cctvtrailer.com` property. Unlocks query-level data inside GA4.

### 6.3 Monthly SEO dashboard

Build a simple monthly report pulling:

- GSC: clicks, impressions, CTR, position, indexed pages (delta vs prior month)
- GA4: sessions (organic), engaged sessions, key events, conversion rate
- Per-city performance table (landing page × city × sessions × conversions)

This can live as `SEO-monthly-report.md` or an interactive dashboard.

---

## 7. Content calendar (weeks 1–12)

| Week | Deliverable | Type | Targets |
|---|---|---|---|
| 1 | GA4 fix + GSC cleanup (404s, redirects) | Tech | G1, G2 |
| 1 | Footer Service Areas column + /locations hub | Tech/IA | G3 |
| 2 | priceValidUntil + title/meta rewrites on top 6 pages | On-page | G4, G5 |
| 2 | Trailing-slash redirects + sitemap cleanup | Tech | G7 |
| 3 | Content pass on /services, /construction-security, /event-security | Content | G10 |
| 3 | New blog: "Puget Sound Copper Theft Report Q1 2026" | Blog | G11 |
| 4 | New city page: /bellevue-surveillance-trailer | GEO | G8 |
| 4 | GBP completeness pass (photos, posts, categories, Q&A) | GEO | G9 |
| 5 | New city page: /everett-mobile-security-trailer | GEO | G8 |
| 5 | Depth pass on 5 existing city pages | GEO | G10 |
| 6 | /security-trailer-rental-vs-purchase | Content | G6 |
| 6 | New blog: "Seattle construction boom map 2026 — where to deploy security" | Blog | G11 |
| 7 | New city page: /renton-construction-security | GEO | G8 |
| 7 | Author bios + E-E-A-T markup | Content trust | G13 |
| 8 | New city page: /kirkland-redmond-security-rental | GEO | G8 |
| 8 | Review expansion on homepage + /reviews page | Trust | G14 |
| 9–12 | Tier-2 cities (Gig Harbor, Bellingham, Lacey) + depth passes + monthly blog cadence | — | — |

---

## 8. Success metrics — targets 90 days from launch

| KPI | Baseline (today) | 90-day target |
|---|---:|---:|
| Indexed pages | 44 | ≥ 90 |
| 404 / redirect validation failures | 39 | 0 |
| GSC clicks (90-day trailing) | 321 | ≥ 700 |
| GSC avg CTR | 1.4% | ≥ 2.5% |
| GSC avg position | 21.4 | ≤ 15 |
| Queries with ≥ 1 click | ~60 | ≥ 120 |
| Pages with ≥ 10 clicks | 5 | ≥ 15 |
| GA4 monthly sessions (organic) | 0 (broken) | ≥ 800 |
| GA4 monthly key events | 0 (broken) | ≥ 40 |
| City pages with ≥ 50 impressions / 90d | 2 | ≥ 10 |
| New city pages live | 0 | ≥ 4 |
| Google Business Profile reviews | unknown | +10 vs baseline |

---

## 9. Technical debt to address alongside

- `src/pages/index.astro` only internally links 4 URLs — expand to 15+
- Blog posts (`src/pages/blog/*.astro`) have several `<img>` without alt text — audit and fix (grep showed 4 offenders)
- `src/config/analytics.js` has placeholder `searchConsoleVerification: 'YOUR_VERIFICATION_CODE_HERE'` — either populate or delete
- Consider adding `src/pages/sitemap.xml.ts` (Astro dynamic sitemap) so sitemap updates automatically when pages are added, per CLAUDE.md's "keep sitemap updated" rule
- Add a tiny schema validator script in `package.json` (e.g., `schema-dts` or manual `JSON.parse` check in CI) to catch broken JSON-LD before deploy

---

## 10. Appendix

### 10.1 Indexed vs not-indexed inventory (GSC, 2026-04-19)

- Indexed: 44 pages — top performers concentrated in `/solar-powered-surveillance`, `/technical-specifications`, `/blog/how-much-cost-rent-security-trailer`, `/`
- Not indexed breakdown: see §2.1

### 10.2 Query intent segmentation (sample)

- **Rental commercial intent** (own these): "mobile surveillance trailer rental cost", "security trailer rental", "cctv trailer for rent"
- **Rental local intent** (own these per city): "mobile surveillance trailer seattle", "cctv trailer tacoma", "construction security kent"
- **Purchase intent** (deflect, don't fight): "security camera trailer for sale", "mobile surveillance trailer for sale"
- **Informational / top-of-funnel** (earn with blog): "how to prevent construction site theft", "cctv vs guards cost", "solar surveillance benefits"
- **Brand/navigational** (protect): "cctv trailer", "svidia", "cctv trailer tacoma reviews"

### 10.3 CLAUDE.md alignment checklist

When executing any item in this plan:
- [ ] Follow existing Astro page patterns (look at `/tacoma-security-trailer.astro` as template for new city pages)
- [ ] Reuse components from `src/components/` (Layout, Header, Footer, BreadcrumbSchema, ServiceSchema, QuoteForm, LazyImage)
- [ ] Use styles from `src/styles/critical.css` and `src/styles/non-critical.css`
- [ ] Update `public/sitemap.xml` and `src/pages/sitemap.astro` for every new page
- [ ] For pricing/cost copy, read `src/pages/pricing.astro` first — never invent prices
- [ ] For new blog posts, update `src/pages/blog/index.astro`
- [ ] Update Google Analytics tracking where appropriate (see `src/components/Analytics.astro`)

### 10.4 Tools & references used

- Google Search Console (`sc-domain:cctvtrailer.com`) — Overview, Performance, Indexing, Core Web Vitals
- Google Analytics 4 (`G-VBNN5TGJ7D`) — Home, Landing Page report
- Competitive SERP research — Google Search for Puget Sound CCTV trailer competitors
- Source-code audit of `src/pages/`, `src/components/`, `src/layouts/`, `public/`

