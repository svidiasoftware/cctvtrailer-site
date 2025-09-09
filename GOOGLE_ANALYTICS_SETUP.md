# Google Analytics & Search Console Setup Guide

## Overview
This guide will help you complete the setup of Google Analytics and Google Search Console for cctvtrailer.com

## 1. Google Analytics Setup

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Set up your account:
   - Account name: CCTV Trailer
   - Account Data Sharing Settings: Choose your preferences
5. Set up your property:
   - Property name: CCTV Trailer Website
   - Time zone: (GMT-08:00) Pacific Time
   - Currency: US Dollar
6. Choose "Web" platform
7. Set up Web Stream:
   - Website URL: https://www.cctvtrailer.com
   - Stream name: CCTV Trailer Main Site

### Step 2: Get Your Measurement ID
1. After creating the property, you'll receive a Measurement ID (format: G-XXXXXXXXXX)
2. Copy this ID

### Step 3: Update the Website Code
1. Open `/src/layouts/Layout.astro`
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID in two places:
   - Line 46: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
   - Line 51: `gtag('config', 'G-XXXXXXXXXX');`

### Step 4: Configure Enhanced Measurement (Recommended)
In Google Analytics:
1. Go to Admin > Data Streams > Web > Your stream
2. Toggle ON Enhanced Measurement
3. Enable these events:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Form interactions
   - File downloads

### Step 5: Set Up Conversions
1. Go to Admin > Events
2. Mark these events as conversions:
   - `form_submission`
   - `phone_click`
   - `quote_request`
   - `contact_form`

## 2. Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Choose "Domain" property type
4. Enter: cctvtrailer.com

### Step 2: Verify Ownership
Choose HTML tag method:
1. Copy the verification meta tag
2. Open `/src/layouts/Layout.astro`
3. Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` on line 43 with your actual verification code
4. Deploy the site
5. Click "Verify" in Search Console

### Alternative Verification Methods:
- **DNS TXT record** (if you have domain access)
- **Google Analytics** (after GA is set up)
- **HTML file upload** (upload the verification file to public folder)

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: sitemap.xml
3. Click "Submit"

### Step 4: Configure Settings
1. Set preferred domain (with or without www)
2. Set target country: United States
3. Review Coverage report for any issues

## 3. Google Tag Manager (Optional)

If you prefer using Google Tag Manager:

### Step 1: Create GTM Account
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create new account: CCTV Trailer
3. Create container: CCTV Trailer Website (Web)

### Step 2: Get Container ID
Copy your GTM container ID (format: GTM-XXXXXXX)

### Step 3: Update Website Code
1. Open `/src/layouts/Layout.astro`
2. Replace `GTM-XXXXXXX` with your container ID on line 61

### Step 4: Connect GA4 through GTM
1. In GTM, create new tag
2. Choose "Google Analytics: GA4 Configuration"
3. Enter your Measurement ID
4. Set up triggers for all pages

## 4. Testing Your Implementation

### Test Google Analytics:
1. Open your website in an incognito window
2. In GA, go to Reports > Realtime
3. You should see your visit in real-time

### Test Search Console:
1. After verification, check:
   - Coverage report
   - Performance report (data appears after 24-48 hours)
   - Mobile Usability report

### Use Google Tag Assistant:
1. Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your site
3. Check that all tags are firing correctly

## 5. Important Configuration Files

### Analytics Configuration
- Location: `/src/config/analytics.js`
- Update with your actual IDs
- Contains helper functions for event tracking

### Sitemap
- Location: `/public/sitemap.xml`
- Already created with all current pages
- Update when adding new pages

### Robots.txt
- Location: `/public/robots.txt`
- Configured for optimal crawling
- Includes sitemap reference

## 6. Next Steps

1. **Set up Goals/Conversions** in Google Analytics
2. **Create Custom Alerts** for traffic drops or spikes
3. **Link Google Ads account** (if applicable)
4. **Set up Google My Business** and link to Search Console
5. **Monitor Core Web Vitals** in Search Console
6. **Set up custom dimensions** for better tracking:
   - User type (new vs returning)
   - Traffic source
   - Device category

## 7. Tracking Custom Events

Use the helper functions in `/src/config/analytics.js`:

```javascript
import { trackEvent, trackConversion } from '../config/analytics.js';

// Track a custom event
trackEvent('video_play', {
  video_title: 'Security Trailer Demo',
  video_duration: 120
});

// Track a conversion
trackConversion('quote_request', 999);
```

## 8. Privacy & Compliance

Remember to:
1. Add a Privacy Policy page mentioning Google Analytics
2. Consider adding a cookie consent banner
3. Configure data retention settings in GA
4. Enable IP anonymization if required

## Support Resources

- [Google Analytics Help](https://support.google.com/analytics)
- [Search Console Help](https://support.google.com/webmasters)
- [Tag Manager Help](https://support.google.com/tagmanager)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)

## Checklist

- [ ] Google Analytics account created
- [ ] Measurement ID obtained and added to site
- [ ] Enhanced Measurement configured
- [ ] Search Console property added
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] Testing completed
- [ ] Conversions configured
- [ ] Privacy policy updated