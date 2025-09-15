# Reusable Schema Components

This directory contains reusable structured data schema components for the CCTV Trailer website.

## Components

### ServiceSchema.astro

Generates Service-type structured data for SEO. Includes default CCTV Trailer business information.

**Usage:**
```astro
---
import ServiceSchema from '../components/ServiceSchema.astro';

const serviceData = {
  serviceName: "Construction Site Security Trailer Rental",
  description: "Professional construction site surveillance...",
  images: [
    "https://www.cctvtrailer.com/images/trailer-1x1.png",
    "https://www.cctvtrailer.com/images/trailer-4x3.png",
    "https://www.cctvtrailer.com/images/trailer-16x9.png",
  ],
  price: "8000",
  priceUnit: "MONTH", // Options: DAY, WEEK, MONTH, YEAR, HOUR
  areaServed: [
    { type: "State", name: "Washington" },
    { type: "City", name: "Tacoma" },
    { type: "City", name: "Seattle" }
  ]
};
---

<ServiceSchema {...serviceData} />
```

**Props:**
- `serviceName` (string, required): Name of the service
- `description` (string, required): Service description
- `images` (string[], optional): Array of image URLs
- `price` (string, optional): Price value
- `priceCurrency` (string, optional, default: "USD"): Currency code
- `priceUnit` (string, optional): Unit of pricing (DAY, WEEK, MONTH, YEAR, HOUR)
- `areaServed` (array, optional): Areas where service is available
- `customProvider` (object, optional): Override default business info

### BreadcrumbSchema.astro

Generates breadcrumb structured data for better navigation in search results.

**Usage:**
```astro
---
import BreadcrumbSchema from '../components/BreadcrumbSchema.astro';

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Construction Security" } // No URL for current page
];
---

<BreadcrumbSchema items={breadcrumbs} />
```

**Props:**
- `items` (array, required): Array of breadcrumb items with `name` and optional `url`
- `baseUrl` (string, optional, default: "https://www.cctvtrailer.com"): Base URL for relative paths

## Implementation Notes

1. Place schema components in the page body, not in the `<head>` section
2. Components automatically generate JSON-LD script tags
3. Multiple schemas can be used on the same page
4. The ServiceSchema component includes default CCTV Trailer business information
5. All schemas follow Google's structured data guidelines

## Example: Complete Page Implementation

```astro
---
import Layout from '../layouts/Layout.astro';
import ServiceSchema from '../components/ServiceSchema.astro';
import BreadcrumbSchema from '../components/BreadcrumbSchema.astro';

const serviceData = {
  serviceName: "Event Security Trailer Rental",
  description: "Mobile surveillance for events...",
  price: "500",
  priceUnit: "DAY"
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Event Security" }
];
---

<Layout title="Event Security" description="...">
  <ServiceSchema {...serviceData} />
  <BreadcrumbSchema items={breadcrumbs} />

  <!-- Page content -->
</Layout>
```