/**
 * Single source of truth for every commercial detail on the funnel.
 * Change a price or a checkout link here and it updates everywhere.
 *
 * ⚠️ CONFIRM BEFORE LAUNCH — OFS_LIVE.checkoutUrl currently points at the
 * Foundations plan, because the OFS Live plan id was not in the codebase.
 * Replace it with the real Whop plan for the $75/mo Live membership.
 */

export const CALENDLY_URL = 'https://calendly.com/orderflowschool-support/30min';

export const OFS_LIVE = {
  name: 'OFS Live',
  priceLabel: '$75 / month',
  priceShort: '$75/month',
  renewalNote: '1-day free trial, then $74.99 every 30 days. Cancel anytime in Whop.',
  trialMicro: '1 day free · then $74.99 every 30 days · cancel anytime in Whop',
  trialNote: '1-day free trial',
  checkoutUrl: 'https://whop.com/checkout/plan_3VIsMeJcCRHpX', // TODO: confirm OFS Live plan id
};

/**
 * Entry price for the private program. Shown only inside the application, and
 * only to the applicants who get the commitment re-check — most people never
 * see a number before the conversation.
 */
export const PRIVATE_PROGRAM = {
  fromPrice: '$3,000',
};

export default { CALENDLY_URL, OFS_LIVE, PRIVATE_PROGRAM };
