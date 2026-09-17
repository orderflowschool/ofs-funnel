/**
 * Type definitions for Order Flow School application
 * These provide structure for data throughout the app
 */

// Testimonial types
export const TestimonialTypes = {
  VIDEO: 'video',
  TEXT: 'text',
  SCREENSHOT: 'screenshot'
};

// Application form steps
export const ApplicationSteps = {
  TRADING_PROFILE: 1,
  CURRENT_STRUGGLE: 2,
  SERIOUSNESS_FIT: 3,
  INVESTMENT_QUALIFICATION: 4,
  CONTACT_DETAILS: 5
};

/**
 * Example Testimonial structure:
 * {
 *   id: string,
 *   name: string,
 *   role: string,
 *   quote: string,
 *   videoThumbnail?: string,
 *   videoUrl?: string,
 *   type: 'video' | 'text' | 'screenshot'
 * }
 */

/**
 * Example ApplicationData structure:
 * {
 *   tradingExperience: string,
 *   tradingAssets: string[],
 *   futuresExperience: string,
 *   biggestStruggle: string[],
 *   consistencyBlocks: string,
 *   seriousness: string,
 *   whyOFS: string,
 *   readiness: string,
 *   investment: string,
 *   callWillingness: string,
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   phone: string,
 *   instagram: string
 * }
 */
