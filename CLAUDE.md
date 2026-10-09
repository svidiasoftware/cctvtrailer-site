## Geographic location
- the location of this project is Tacoma-Seattle area, Washington, US, then making analysis and web searches consider this location

## general
- this site is suppose to be static compiled astro site
- before creating pages look how Home page and other pages are implemented
- use the same patterns, styles and approaches while creating new pages
- check components folder and use reusable components when appropriate
- use styles defined in src/styles/critical.css and src/styles/non-critical.css and create additional one only if no similar exist
- pay attention to Google Analytics and update new pages accordingly
- the XML sitemap is generated dynamically by src/pages/sitemap.xml.ts — do NOT create or restore public/sitemap.xml. New pages under src/pages/ are picked up automatically on next build; only edit sitemap.xml.ts if you need to override priority/changefreq for a specific route or exclude a route from the sitemap (e.g. success pages, embedded widgets)
- keep the human-facing HTML sitemap at src/pages/sitemap.astro in sync when adding new pages
- JSON-LD schema is validated at build time by scripts/validate-schema.mjs (runs as npm prebuild). If you add <script type="application/ld+json"> blocks, make sure they parse; run `npm run validate:schema` to check without a full build
- pricing is quote-only: never publish CCTV Trailer rental rates, discounts, fees, or savings/ROI figures derived from our rate — use "call (253) 683-2288 for a quote". /pricing is the "Rental Options & Quotes" page (no prices); calculators take the visitor's own quoted rate. Third-party market figures (guard rates, theft losses, fixed-install costs) are fine
- owner-confirmed offering claims: 24/7 self-monitoring (no staffed monitoring center); availability "call to inquire" (same-day delivery OK); professional delivery and setup *available*, not included; included = 4 cameras (1 fixed fisheye + 3 PTZ 25x zoom with IR), equipment training, 24/7 technical support, solar power/generator, remote viewing on mobile devices or computer; thermal cameras optional; in business since 2009; retention two weeks of motion-only recording by default, extendable in special cases
- when crafting a new blog article update src/pages/blog/index.astro page
