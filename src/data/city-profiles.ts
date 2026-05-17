// -----------------------------------------------------------------------------
// city-profiles.ts
//
// Single source of truth for per-city landing-page content. Consumed by
// src/layouts/CityLanding.astro, which renders an entire city page from one
// CityProfile entry plus its sectionOrder array.
//
// Why a per-city data store: the 7 city landing pages historically shared an
// identical H2 skeleton (just the city name swapped), which Google clustered
// as near-duplicates. Each profile now carries its own H2 strings, unique
// storyAnchor prose, cited crime data, FAQ items, and a per-city sectionOrder
// permutation so the rendered DOM differs structurally across cities.
//
// Adding a new city = add an entry here and create an 8-line shell page that
// reads it. No new section components or layout changes needed.
// -----------------------------------------------------------------------------

export type CitySlug =
  | 'kent-security-rental'
  | 'auburn-manufacturing-security'
  | 'puyallup-fairgrounds-security'
  | 'lakewood-jblm-security'
  | 'bremerton-naval-security'
  | 'federal-way-surveillance'
  | 'fife-security-rental';

export type SectionKey =
  | 'hero'
  | 'storyAnchor'
  | 'crimeStats'
  | 'serviceAreas'
  | 'applications'
  | 'whyUs'
  | 'faq'
  | 'quoteForm'
  | 'relatedPages';

export interface CitedStat {
  value: string;
  label: string;
  icon?: string;
  highlight?: boolean;
  source: { text: string; url: string };
}

export interface FAQItem {
  question: string;
  answerText: string;
  answerHtml?: string;
}

export interface ServiceAreaColumn {
  heading: string;
  items: string[];
}

export interface ApplicationGroup {
  heading: string;
  bullets: string[];
}

export interface WhyUsCard {
  icon: string;
  title: string;
  body: string;
}

export interface RelatedPageRef {
  title: string;
  href: string;
  description: string;
}

export interface AreaServedEntry {
  type: 'City' | 'Place' | 'AdministrativeArea';
  name: string;
}

export interface CityProfile {
  slug: CitySlug;
  cityName: string;
  region: string;

  pageTitle: string;
  pageDescription: string;

  theme: {
    /** Hero section background classes, e.g. "bg-gradient-to-r from-purple-800 to-purple-900". */
    heroGradient: string;
    /** Background class for the crime-stats section, e.g. "bg-purple-50". */
    crimeSectionBg: string;
    /** Optional pill/badge classes for the hero eyebrow, e.g. "bg-purple-700 text-purple-100". */
    eyebrowBadge?: string;
    /** Primary CTA button classes (typically white-bg on the gradient hero). */
    primaryCtaButton?: string;
    /** Secondary CTA button classes (typically accent-colored on the gradient hero). */
    secondaryCtaButton?: string;
    /** Quote-form submit button classes, e.g. "bg-purple-600 hover:bg-purple-700". */
    submitButton?: string;
    /** Inline-link classes used inside profile prose, e.g. "text-purple-700 underline hover:text-purple-900". */
    inlineLink?: string;
  };

  hero: {
    eyebrow?: string;
    h1: string;
    leadHtml: string;
    ctaPrimaryText: string;
    bullets?: string[];
  };

  storyAnchor: {
    h2: string;
    paragraphsHtml: string[];
    pullquoteHtml?: string;
  };

  crimeStats?: {
    h2: string;
    intro: string;
    stats: CitedStat[];
    calloutHtml?: string;
  };

  serviceAreas: {
    h2: string;
    columns: ServiceAreaColumn[];
  };

  applications: {
    h2: string;
    groups: ApplicationGroup[];
  };

  whyUs: {
    h2: string;
    cards: WhyUsCard[];
  };

  faq: {
    h2: string;
    items: FAQItem[];
  };

  quoteForm: {
    h2: string;
    anchorId: string;
    propertyTypes: { value: string; label: string }[];
  };

  relatedPages: RelatedPageRef[];

  schema: {
    serviceName: string;
    priceLow: string;
    priceHigh: string;
    priceUnit: 'WEEK' | 'MONTH';
    areaServed: AreaServedEntry[];
  };

  sectionOrder: SectionKey[];

  expanding?: {
    disclosureHtml: string;
    sitemapPriority: string;
  };
}

export const cityProfiles: Partial<Record<CitySlug, CityProfile>> = {};

export function cityProfileBySlug(slug: CitySlug): CityProfile {
  const profile = cityProfiles[slug];
  if (!profile) {
    throw new Error(`city-profiles.ts: no profile registered for slug "${slug}"`);
  }
  return profile;
}
