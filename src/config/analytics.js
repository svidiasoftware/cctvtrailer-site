// Google Analytics and Search Console Configuration
// Replace these with your actual IDs when you receive them from Google

export const analyticsConfig = {
  // Google Analytics 4 Measurement ID
  // Get this from: https://analytics.google.com/
  // Format: G-XXXXXXXXXX
  googleAnalyticsId: 'G-VBNN5TGJ7D',
  
  // Google Tag Manager Container ID (optional, if you prefer GTM)
  // Get this from: https://tagmanager.google.com/
  // Format: GTM-XXXXXXX
  googleTagManagerId: 'GTM-5FPMNFLV',
  
  // Google Search Console Verification Code
  // Get this from: https://search.google.com/search-console
  // Use the HTML tag method and copy the content value
  searchConsoleVerification: 'YOUR_VERIFICATION_CODE_HERE',
  
  // Additional tracking settings
  settings: {
    // Enable enhanced measurement (recommended)
    enhancedMeasurement: true,
    
    // Enable debug mode in development
    debugMode: false, // Disabled to prevent ar_debug cookie
    
    // Custom dimensions (if needed)
    customDimensions: {
      // Example: 'dimension1': 'user_type'
    },
    
    // Conversion events to track
    conversionEvents: [
      'form_submission',
      'phone_click',
      'quote_request',
      'contact_form',
      'pricing_calculator_use'
    ]
  }
};

// Helper function to track custom events (GTM version)
export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      'event': eventName,
      ...parameters
    });
  }
}

// Helper function to track conversions (GTM version)
export function trackConversion(conversionType, value = null) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const params = {
      'event': 'conversion',
      'conversion_type': conversionType,
      'event_category': 'conversion',
      'event_label': conversionType
    };
    
    if (value) {
      params.value = value;
      params.currency = 'USD';
    }
    
    window.dataLayer.push(params);
  }
}