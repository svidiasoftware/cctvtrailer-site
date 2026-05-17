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
    backgroundImage?: { src: string; alt: string };
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

// -----------------------------------------------------------------------------
// Citation URL conventions
//
// Crime-stat URLs should point at sources whose numbers can be independently
// verified by a reader: Kent PD annual reports, City-Data.com pages,
// NeighborhoodScout, FBI Crime Data Explorer, or city press releases. The
// data-store author is responsible for keeping URLs reachable and accurate;
// stale citations are worse than no citations.
// -----------------------------------------------------------------------------

const kentProfile: CityProfile = {
  slug: 'kent-security-rental',
  cityName: 'Kent',
  region: 'Kent Valley',
  pageTitle: 'Kent Security Camera Rental | Mobile Surveillance Kent Valley WA',
  pageDescription:
    "Security camera trailer rentals across the Kent Valley warehouse corridor — Boeing suppliers, REI distribution, intermodal yards. Same-day deployment from Tacoma HQ: (253) 683-2288",

  theme: {
    heroGradient: 'bg-gradient-to-r from-purple-800 to-purple-900',
    crimeSectionBg: 'bg-purple-50',
    eyebrowBadge: 'bg-purple-700 text-purple-100',
    primaryCtaButton: 'bg-white text-purple-900 hover:bg-gray-100',
    secondaryCtaButton: 'bg-green-500 hover:bg-green-600 text-white',
    submitButton: 'bg-purple-600 hover:bg-purple-700',
    inlineLink: 'text-purple-700 underline hover:text-purple-900',
  },

  hero: {
    eyebrow: 'King County · Kent Valley',
    h1: 'Kent Valley Warehouse Surveillance — Mobile Camera Trailer Rentals',
    leadHtml:
      "<strong>Protecting the Pacific Northwest's largest warehouse cluster.</strong> Mobile camera trailers deployed across Kent Valley distribution centers, intermodal yards, and Boeing supplier facilities — same-day rollout from our Tacoma HQ.",
    ctaPrimaryText: 'Get Kent Quote',
    bullets: ["⚡ 30-minute response from Tacoma via I-5 / SR-167"],
    backgroundImage: {
      src: '/images/cities/kent-hero.webp',
      alt: 'CCTV surveillance trailer parked at the perimeter of a Kent Valley warehouse distribution center at dusk, loading docks lit by overhead lights',
    },
  },

  storyAnchor: {
    h2: 'Why Kent Valley Has a Different Security Problem',
    paragraphsHtml: [
      "Kent Valley is the warehouse capital of the Pacific Northwest — more than 70 million square feet of distribution, fulfillment, and light-manufacturing footprint sandwiched between the Green River and SR-167. The corridor stretches from Boeing's longest-tenured supplier ecosystem in the north (Renton/Tukwila edge) down through the REI distribution hub off South 212th, the BNSF intermodal yard, and out toward Auburn's Green River Valley industrial parks.",
      "That density creates a security profile most cities never see: <strong>multi-acre lots with thousands of feet of perimeter fencing</strong>, single-shift weekend gaps when entire campuses sit unattended, and a steady flow of high-value freight (electronics, sporting goods, automotive parts, aerospace components) moving through the I-5/SR-167 corridor day and night. A fixed CCTV install on a property like this can run six figures, with months of permitting and conduit work before a single camera goes live.",
      "Mobile surveillance trailers solve a different problem than a fixed install: we deploy in a single afternoon, cover the most active perimeter of a 200,000+ sq ft facility from one elevated pole, and relocate when the threat profile shifts (new construction phase, seasonal inventory peak, post-incident hardening). For property managers running multiple Kent Valley buildings, that flexibility is the whole point.",
    ],
  },

  crimeStats: {
    h2: 'Kent Crime Trends — Public Data 2024',
    intro:
      'Kent Police Department publishes year-over-year crime statistics for the city. The 2024 numbers show real progress on the headline categories that affect logistics tenants — vehicle theft and robbery — but a worrying climb in assault that property managers in busy retail/employment hubs need to factor into security planning.',
    stats: [
      {
        value: '27%',
        label: 'Vehicle Theft Reduction 2024',
        source: {
          text: 'Kent Police Department crime statistics',
          url: 'https://www.kentwa.gov/government/departments/police',
        },
      },
      {
        value: '56%',
        label: 'Homicide Reduction 2024',
        source: {
          text: 'Kent Police Department crime statistics',
          url: 'https://www.kentwa.gov/government/departments/police',
        },
      },
      {
        value: '18%',
        label: 'Robbery Reduction 2024',
        source: {
          text: 'Kent Police Department crime statistics',
          url: 'https://www.kentwa.gov/government/departments/police',
        },
      },
      {
        value: '26%',
        label: 'Increase in Assaults',
        highlight: true,
        source: {
          text: 'Kent Police Department crime statistics',
          url: 'https://www.kentwa.gov/government/departments/police',
        },
      },
    ],
    calloutHtml:
      "Mixed signal for 2024: <strong>property crime trending down</strong>, but personal-safety incidents climbing. For employers running multi-shift warehouse operations, that means lit, monitored parking and end-of-shift overwatch are no longer optional — they're a workplace-safety expectation.",
  },

  serviceAreas: {
    h2: 'Coverage Across Kent & South King County',
    columns: [
      {
        heading: 'Kent Districts',
        items: ['Downtown Kent', 'Kent Station', 'East Hill', 'West Hill', 'Meridian', 'Lake Meridian'],
      },
      {
        heading: 'Kent Valley Industrial',
        items: [
          'South 212th warehouse corridor',
          'REI Distribution Center',
          'BNSF intermodal yard',
          'Boeing supplier facilities',
          'Valley Medical campus',
          'ShoWare Center',
        ],
      },
      {
        heading: 'Surrounding Cities',
        items: ['Covington', 'Maple Valley', 'Renton (South)', 'Tukwila', 'Auburn (North)', 'Des Moines'],
      },
    ],
  },

  applications: {
    h2: 'What Kent Valley Operators Use Mobile Surveillance For',
    groups: [
      {
        heading: 'Warehouse & Distribution',
        bullets: [
          'Perimeter coverage on multi-acre lots (one trailer = 360° pole-mounted PTZ)',
          'Loading-dock and trailer-yard overwatch during off-shifts',
          'Intermodal container yard monitoring',
          'Inventory-area exterior surveillance',
        ],
      },
      {
        heading: 'Manufacturing & Supplier Ops',
        bullets: [
          'Employee parking lot safety during shift changes',
          'Equipment-storage perimeter (forklifts, trailers, generators)',
          'Weekend / holiday overwatch when site is dark',
          'Construction-phase coverage for facility expansions',
        ],
      },
    ],
  },

  whyUs: {
    h2: "Why Kent Valley Property Managers Pick Mobile Over Fixed",
    cards: [
      {
        icon: "\u{1F3ED}",
        title: 'Built for Industrial Scale',
        body: 'Pole-mount 20+ ft cameras with PTZ optics designed for multi-acre warehouse yards — not retrofit consumer gear.',
      },
      {
        icon: "\u{1F69A}",
        title: '30-Minute Response from Tacoma',
        body: 'Our headquarters at 222 E 26th St is 20 miles south of Kent on I-5. Same-day deployments are routine; emergency rollouts run sub-hour.',
      },
      {
        icon: "⏰",
        title: 'No Permits, No Conduit, No Months of Wait',
        body: 'A fixed CCTV install at a Kent Valley facility is a 90+ day project. A trailer is deployed in an afternoon and pulled back the same way.',
      },
    ],
  },

  faq: {
    h2: 'Kent Valley Surveillance — Frequently Asked Questions',
    items: [
      {
        question: 'How fast can a surveillance trailer be deployed to a Kent Valley warehouse?',
        answerText:
          "Standard deployments to Kent run same-day or next-day from our Tacoma HQ at 222 E 26th St — about 20 miles south on I-5/SR-167. Emergency rollouts for active-incident response can be sub-hour. We pre-stage two units specifically for the Kent / Auburn corridor demand spikes.",
        answerHtml:
          "Standard deployments to Kent run same-day or next-day from our Tacoma HQ at 222 E 26th St — about 20 miles south on I-5/SR-167. Emergency rollouts for active-incident response can be sub-hour. We pre-stage two units specifically for the Kent / Auburn corridor demand spikes. Call <a href=\"tel:2536832288\" class=\"text-purple-700 font-semibold\">(253) 683-2288</a> for current availability.",
      },
      {
        question: 'Do you serve the Boeing supplier corridor and other access-controlled industrial parks in Kent?',
        answerText:
          "Yes. We work routinely inside controlled-access industrial parks across the Kent Valley, including campuses adjacent to Boeing supplier facilities. Our field techs are accustomed to vendor-badging, escort-required deployments, after-hours coordination with site security, and W-9 / insurance-cert paperwork ahead of first deployment.",
      },
      {
        question: "What's the right camera-trailer count for a 200,000+ sq ft warehouse?",
        answerText:
          "One pole-mounted PTZ trailer can cover the active perimeter of a single 200,000-300,000 sq ft warehouse if positioned correctly — typically at the dominant fence-line or the main loading-dock cluster. Properties beyond that size, or campuses with multiple buildings and separated parking, usually need two units to avoid blind spots.",
      },
      {
        question: 'Can you cover an intermodal yard or BNSF-adjacent container facility?',
        answerText:
          "Yes — open container yards are one of the use cases mobile trailers are best suited for. Fixed installs struggle with the dynamic container topology (stacks move daily). A relocatable trailer with a PTZ optic and license-plate-read software handles entry/exit lanes, the lay-down area, and any portion of the rail-adjacent fence-line that the site security team flags.",
      },
      {
        question: 'How do you handle Maple Valley, Covington, and the unincorporated areas outside Kent city limits?',
        answerText:
          "We serve all of South King County, including Maple Valley, Covington, Black Diamond, and the unincorporated stretch between Kent and Auburn. Same Tacoma-HQ dispatch, same pricing — there's no separate \"out-of-city\" surcharge for properties within 30 miles of our base.",
      },
      {
        question: 'What does a Kent Valley security trailer rental cost?',
        answerText:
          "Weekly rates start at $3,499 with most multi-week and monthly contracts landing in the $3,499-$4,000/week range, depending on camera count, monitoring level, and project duration. Pricing includes delivery, setup, solar power, remote viewing access, 24/7 technical support, and equipment training. Call (253) 683-2288 for a written quote against your specific site plan.",
        answerHtml:
          "Weekly rates start at $3,499 with most multi-week and monthly contracts landing in the $3,499-$4,000/week range, depending on camera count, monitoring level, and project duration. Pricing includes delivery, setup, solar power, remote viewing access, 24/7 technical support, and equipment training. See our <a href=\"/pricing\" class=\"text-purple-700 underline hover:text-purple-900\">full pricing page</a> or call (253) 683-2288 for a written quote against your specific site plan.",
      },
    ],
  },

  quoteForm: {
    h2: 'Get Your Kent Valley Security Quote',
    anchorId: 'kent-quote',
    propertyTypes: [
      { value: 'warehouse', label: 'Warehouse / Distribution' },
      { value: 'manufacturing', label: 'Manufacturing / Supplier' },
      { value: 'intermodal', label: 'Intermodal / Container Yard' },
      { value: 'retail', label: 'Retail Center' },
      { value: 'construction', label: 'Construction Site' },
      { value: 'parking', label: 'Parking Lot' },
      { value: 'other', label: 'Other Industrial' },
    ],
  },

  relatedPages: [
    {
      title: 'Cargo Theft on the I-5 Corridor (Fife/Kent/Tacoma)',
      href: '/blog/warehouse-cargo-theft-i5-corridor-seattle-tacoma',
      description: 'Why the Kent-Fife-Tacoma warehouse cluster keeps getting hit and what changes the trendline.',
    },
    {
      title: 'Equipment Theft Prevention',
      href: '/solutions/equipment-theft-prevention',
      description: 'Protect forklifts, generators, trailers, and yard equipment from the most common loss patterns.',
    },
    {
      title: 'Copper Theft at Construction Sites',
      href: '/blog/copper-theft-seattle-tacoma-construction-sites',
      description: 'Active 2026 data on the copper-theft surge and the deterrence approach that actually works.',
    },
    {
      title: 'Auburn Manufacturing & Logistics Security',
      href: '/auburn-manufacturing-security',
      description: 'Green River Valley industrial corridor coverage — 8 miles south of Kent.',
    },
    {
      title: 'Federal Way Surveillance',
      href: '/federal-way-surveillance',
      description: 'Pacific Hwy S retail corridor — 10 miles north of Kent.',
    },
    {
      title: 'Construction Site Security Solutions',
      href: '/construction-security',
      description: 'Mobile surveillance for Kent Valley warehouse expansions and tenant fit-outs.',
    },
    {
      title: 'View Pricing & Plans',
      href: '/pricing',
      description: 'Transparent weekly and monthly rates for Kent Valley industrial sites.',
    },
  ],

  schema: {
    serviceName: 'Kent Valley Security Camera Trailer Rental',
    priceLow: '3499',
    priceHigh: '4000',
    priceUnit: 'WEEK',
    areaServed: [
      { type: 'City', name: 'Kent' },
      { type: 'City', name: 'Covington' },
      { type: 'City', name: 'Maple Valley' },
      { type: 'City', name: 'Renton' },
      { type: 'City', name: 'Tukwila' },
      { type: 'AdministrativeArea', name: 'King County' },
    ],
  },

  sectionOrder: [
    'hero',
    'crimeStats',
    'storyAnchor',
    'serviceAreas',
    'applications',
    'whyUs',
    'faq',
    'quoteForm',
    'relatedPages',
  ],
};

export const cityProfiles: Partial<Record<CitySlug, CityProfile>> = {
  'kent-security-rental': kentProfile,
};

export function cityProfileBySlug(slug: CitySlug): CityProfile {
  const profile = cityProfiles[slug];
  if (!profile) {
    throw new Error(`city-profiles.ts: no profile registered for slug "${slug}"`);
  }
  return profile;
}
