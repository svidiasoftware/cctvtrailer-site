// Canonical list of Puget Sound service-area pages.
// Used by the Header dropdown, Footer column, /locations hub, sitemap, and
// LocalBusiness schemas. Keep this file as the single source of truth — when
// a new city page is added, add it here and every surface updates.
//
// Groups are ordered by population density × click value (Pierce Co. first
// because the home base is Tacoma, then Seattle/King, then Peninsula/South).

export const locationGroups = [
  {
    label: "Tacoma & Pierce County",
    slug: "pierce-county",
    cities: [
      {
        city: "Tacoma",
        href: "/tacoma-security-trailer",
        angle: "Citywide mobile surveillance trailer rental",
      },
      {
        city: "Tacoma — Construction",
        href: "/tacoma-construction-site-security",
        angle: "Active Tacoma construction site security",
      },
      {
        city: "Tacoma — Auto Dealers",
        href: "/tacoma-auto-dealer-security",
        angle: "Dealership lot + inventory surveillance",
      },
      {
        city: "Tacoma — Retail & Parking",
        href: "/tacoma-retail-parking-lot-security",
        angle: "Retail center + parking-lot deterrence",
      },
      {
        city: "Fife",
        href: "/fife-security-rental",
        angle: "I-5 corridor warehouse & logistics",
      },
      {
        city: "Puyallup",
        href: "/puyallup-fairgrounds-security",
        angle: "Fairgrounds & event security",
      },
      {
        city: "Lakewood / JBLM",
        href: "/lakewood-jblm-security",
        angle: "Military-adjacent & contractor compliance",
      },
    ],
  },
  {
    label: "Seattle & King County",
    slug: "king-county",
    cities: [
      {
        city: "Seattle — Surveillance Rental",
        href: "/seattle-surveillance-rental",
        angle: "Citywide mobile surveillance rental",
      },
      {
        city: "Seattle — Construction",
        href: "/seattle-construction-security",
        angle: "Light-rail, high-rise & infill construction",
      },
      {
        city: "Bellevue",
        href: "/bellevue-surveillance-trailer",
        angle: "Eastside tech corridor & downtown high-rise",
      },
      {
        city: "Kent",
        href: "/kent-security-rental",
        angle: "Kent Valley warehouse corridor",
      },
      {
        city: "Federal Way",
        href: "/federal-way-surveillance",
        angle: "SR-18 corridor, mixed-use development",
      },
      {
        city: "Auburn",
        href: "/auburn-manufacturing-security",
        angle: "Manufacturing + rail-adjacent security",
      },
    ],
  },
  {
    label: "North Sound & Snohomish County",
    slug: "snohomish-county",
    cities: [
      {
        city: "Everett",
        href: "/everett-mobile-security-trailer",
        angle: "Aerospace, I-5 corridor & Port of Everett",
      },
    ],
  },
  {
    label: "South Sound & Peninsula",
    slug: "south-sound",
    cities: [
      {
        city: "Olympia",
        href: "/olympia-mobile-cctv",
        angle: "Capitol region & Thurston County",
      },
      {
        city: "Bremerton",
        href: "/bremerton-naval-security",
        angle: "Naval shipyard & Kitsap County",
      },
    ],
  },
];

// Flattened convenience list for places that need every city at once.
export const allLocations = locationGroups.flatMap((g) => g.cities);
