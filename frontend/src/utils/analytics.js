/**
 * Analytics tracking utilities — GA4
 */

const gtag = (...args) => {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

/* ---------- initialisation (called once in App.js) ---------- */

export const initGA = () => {
  gtag('event', 'page_view');
};

export const initMetaPixel = () => {
  // TODO: Replace with your Meta Pixel ID when ready
};

/* ---------- CTA ---------- */

export const trackCTAClick = (location) => {
  gtag('event', 'cta_click', {
    event_category: 'CTA',
    event_label: location,
  });
};

/* ---------- application funnel ---------- */

export const trackApplicationStart = () => {
  gtag('event', 'application_started', {
    event_category: 'Application',
  });
};

export const trackApplicationStep = (stepNumber, stepName) => {
  gtag('event', 'application_step_completed', {
    event_category: 'Application',
    step_number: stepNumber,
    step_name: stepName,
  });
};

export const trackFormSubmission = () => {
  gtag('event', 'application_submitted', {
    event_category: 'Application',
  });
};

/* ---------- lead qualification ---------- */

export const trackQualifiedLead = () => {
  gtag('event', 'qualified_lead', {
    event_category: 'Lead',
  });
};

export const trackNonQualifiedLead = () => {
  gtag('event', 'non_qualified_lead', {
    event_category: 'Lead',
  });
};

/* ---------- booking ---------- */

export const trackBookingPageViewed = () => {
  gtag('event', 'booking_page_viewed', {
    event_category: 'Booking',
  });
};

export const trackCalendlyBookingCompleted = () => {
  gtag('event', 'calendly_booking_completed', {
    event_category: 'Booking',
  });
};

export const trackBookingClick = () => {
  gtag('event', 'booking_click', {
    event_category: 'Booking',
    event_label: 'Calendar Opened',
  });
};

/* ---------- video ---------- */

export const trackVideoPlay = (videoName) => {
  gtag('event', 'video_play', {
    event_category: 'Video',
    event_label: videoName,
  });
};

/* ---------- section visibility ---------- */

export const trackSectionView = (sectionName) => {
  gtag('event', 'section_view', {
    event_category: 'Section',
    event_label: sectionName,
  });
};

/* ---------- masterclass ---------- */

export const trackMasterclassPageView = () => {
  gtag('event', 'masterclass_page_view', {
    event_category: 'Masterclass',
  });
};

export const trackMasterclassCtaClicked = (props = {}) => {
  gtag('event', 'masterclass_cta_clicked', {
    event_category: 'Masterclass',
    ...props,
  });
};

export const trackMasterclassFormStarted = () => {
  gtag('event', 'masterclass_form_started', {
    event_category: 'Masterclass',
  });
};

export const trackMasterclassRegistrationSubmitted = (props = {}) => {
  gtag('event', 'masterclass_registration_submitted', {
    event_category: 'Masterclass',
    ...props,
  });
};

export const trackMasterclassRegistrationSuccess = (props = {}) => {
  gtag('event', 'masterclass_registration_success', {
    event_category: 'Masterclass',
    ...props,
  });
};

export const trackMasterclassRegistrationError = (props = {}) => {
  gtag('event', 'masterclass_registration_error', {
    event_category: 'Masterclass',
    ...props,
  });
};
