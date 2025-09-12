# Google Tag Manager Migration Guide

## Overview
This guide documents the migration from direct Google Analytics 4 (GA4) implementation to Google Tag Manager (GTM) for cctvtrailer.com.

## Migration Completed
The codebase has been updated to use GTM instead of direct GA4 implementation. All tracking events now push to the dataLayer for GTM to process.

## GTM Container Setup Required

### 1. Access GTM
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Login with your Google account
3. Access container ID: **GTM-5FPMNFLV**

### 2. Configure GA4 Tag
Create a new tag for GA4 configuration:

1. **Create Tag**:
   - Name: `GA4 Configuration`
   - Tag Type: `Google Analytics: GA4 Configuration`
   - Measurement ID: `G-VBNN5TGJ7D`
   
2. **Set Trigger**:
   - Trigger: `All Pages`

3. **Save Tag**

### 3. Configure Event Tags
Create tags for each custom event that the site tracks:

#### Phone Click Tracking
1. **Create Tag**:
   - Name: `GA4 - Phone Click`
   - Tag Type: `Google Analytics: GA4 Event`
   - Configuration Tag: `GA4 Configuration`
   - Event Name: `phone_click`
   
2. **Create Trigger**:
   - Name: `Phone Click Trigger`
   - Type: `Custom Event`
   - Event name: `phone_click`
   
3. **Add Event Parameters**:
   - Parameter Name: `phone_number` | Value: `{{dataLayer.phone_number}}`
   - Parameter Name: `engagement_type` | Value: `{{dataLayer.engagement_type}}`

#### Email Click Tracking
1. **Create Tag**:
   - Name: `GA4 - Email Click`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `email_click`
   
2. **Create Trigger**:
   - Name: `Email Click Trigger`
   - Type: `Custom Event`
   - Event name: `email_click`
   
3. **Add Event Parameters**:
   - Parameter Name: `email_address` | Value: `{{dataLayer.email_address}}`
   - Parameter Name: `engagement_type` | Value: `{{dataLayer.engagement_type}}`

#### Form Submission Tracking
1. **Create Tag**:
   - Name: `GA4 - Form Submission`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `form_submission`
   
2. **Create Trigger**:
   - Name: `Form Submission Trigger`
   - Type: `Custom Event`
   - Event name: `form_submission`
   
3. **Add Event Parameters**:
   - Parameter Name: `form_id` | Value: `{{dataLayer.form_id}}`
   - Parameter Name: `form_type` | Value: `{{dataLayer.form_type}}`

#### Quote Request Tracking
1. **Create Tag**:
   - Name: `GA4 - Quote Request`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `quote_request`
   
2. **Create Trigger**:
   - Name: `Quote Request Trigger`
   - Type: `Custom Event`
   - Event name: `quote_request`
   
3. **Add Event Parameters**:
   - Parameter Name: `form_id` | Value: `{{dataLayer.form_id}}`
   - Parameter Name: `request_type` | Value: `{{dataLayer.request_type}}`

#### Conversion Tracking
1. **Create Tag**:
   - Name: `GA4 - Conversion`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `conversion`
   
2. **Create Trigger**:
   - Name: `Conversion Trigger`
   - Type: `Custom Event`
   - Event name: `conversion`
   
3. **Add Event Parameters**:
   - Parameter Name: `conversion_type` | Value: `{{dataLayer.conversion_type}}`
   - Parameter Name: `form_id` | Value: `{{dataLayer.form_id}}`
   - Parameter Name: `value` | Value: `{{dataLayer.value}}`
   - Parameter Name: `currency` | Value: `{{dataLayer.currency}}`

#### CTA Click Tracking
1. **Create Tag**:
   - Name: `GA4 - CTA Click`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `cta_click`
   
2. **Create Trigger**:
   - Name: `CTA Click Trigger`
   - Type: `Custom Event`
   - Event name: `cta_click`
   
3. **Add Event Parameters**:
   - Parameter Name: `event_category` | Value: `{{dataLayer.event_category}}`
   - Parameter Name: `event_label` | Value: `{{dataLayer.event_label}}`
   - Parameter Name: `value` | Value: `{{dataLayer.value}}`

#### Scroll Depth Tracking
1. **Create Tag**:
   - Name: `GA4 - Scroll Depth`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `scroll_depth`
   
2. **Create Trigger**:
   - Name: `Scroll Depth Trigger`
   - Type: `Custom Event`
   - Event name: `scroll_depth`
   
3. **Add Event Parameters**:
   - Parameter Name: `event_category` | Value: `{{dataLayer.event_category}}`
   - Parameter Name: `event_label` | Value: `{{dataLayer.event_label}}`
   - Parameter Name: `value` | Value: `{{dataLayer.value}}`

#### Outbound Link Tracking
1. **Create Tag**:
   - Name: `GA4 - Outbound Click`
   - Tag Type: `Google Analytics: GA4 Event`
   - Event Name: `outbound_click`
   
2. **Create Trigger**:
   - Name: `Outbound Click Trigger`
   - Type: `Custom Event`
   - Event name: `outbound_click`
   
3. **Add Event Parameters**:
   - Parameter Name: `event_category` | Value: `{{dataLayer.event_category}}`
   - Parameter Name: `event_label` | Value: `{{dataLayer.event_label}}`
   - Parameter Name: `transport_type` | Value: `{{dataLayer.transport_type}}`

### 4. Create Variables
Create Data Layer Variables for accessing event data:

1. Go to Variables > User-Defined Variables
2. Create variables for each data layer field:
   - `dataLayer.phone_number`
   - `dataLayer.email_address`
   - `dataLayer.form_id`
   - `dataLayer.form_type`
   - `dataLayer.conversion_type`
   - `dataLayer.event_category`
   - `dataLayer.event_label`
   - `dataLayer.value`
   - `dataLayer.currency`
   - etc.

### 5. Testing

#### Preview Mode
1. Click "Preview" in GTM
2. Enter your website URL
3. Navigate through the site and interact with tracked elements
4. Verify events fire correctly in the GTM preview panel

#### GA4 Real-time
1. Open GA4 Real-time reports
2. Perform actions on the site
3. Verify events appear in real-time

### 6. Publishing
Once all tags are configured and tested:
1. Click "Submit" in GTM
2. Add version name: "GA4 Migration - Initial Setup"
3. Add description of changes
4. Click "Publish"

## Code Changes Made

### 1. Layout.astro
- Removed direct GA4 script
- Added GTM container script in `<head>`
- Added GTM noscript fallback in `<body>`

### 2. Analytics.astro
- Updated all `gtag()` calls to `dataLayer.push()`
- Changed event tracking to use GTM format
- Updated initialization to wait for dataLayer instead of gtag

### 3. analytics.js
- Updated `trackEvent()` function to use dataLayer
- Updated `trackConversion()` function to use dataLayer
- Maintained backward compatibility with existing code

## Benefits of GTM Migration

1. **No-code Updates**: Marketing team can update tracking without developer involvement
2. **Version Control**: Built-in versioning and rollback capabilities
3. **Debug Tools**: Preview mode for testing before publishing
4. **Centralized Management**: All tags managed from one interface
5. **Performance**: Single container script vs multiple tracking codes
6. **Flexibility**: Easy to add new marketing pixels and tracking

## Troubleshooting

### Events Not Firing
1. Check browser console for JavaScript errors
2. Verify dataLayer is defined (`window.dataLayer` in console)
3. Use GTM Preview mode to debug trigger conditions
4. Check that GTM container is published

### Data Not Appearing in GA4
1. Verify GA4 Configuration tag is firing on all pages
2. Check Measurement ID is correct
3. Wait 24-48 hours for full data processing
4. Use GA4 DebugView for real-time debugging

### Performance Issues
1. Review tag firing rules to prevent unnecessary loads
2. Use tag sequencing for dependent tags
3. Enable built-in variables only as needed
4. Monitor container size (keep under 200KB)

## Next Steps

1. **Add Additional Tags**:
   - Facebook Pixel
   - LinkedIn Insight Tag
   - Google Ads Conversion Tracking
   - Other marketing pixels

2. **Enhanced Ecommerce** (if applicable):
   - Product views
   - Add to cart
   - Checkout steps
   - Purchases

3. **Custom Dimensions**:
   - User segments
   - Content categories
   - Traffic sources

4. **Server-side Tagging** (advanced):
   - Improved privacy compliance
   - Better data control
   - Reduced client-side load

## Support Resources

- [GTM Help Center](https://support.google.com/tagmanager)
- [GA4 Documentation](https://support.google.com/analytics)
- [GTM Community](https://www.en.advertisercommunity.com/t5/Google-Tag-Manager/ct-p/Google_Tag_Manager)
- [Simo Ahava's Blog](https://www.simoahava.com/) - Advanced GTM techniques