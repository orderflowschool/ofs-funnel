/**
 * Single source of truth for every commercial detail on the funnel.
 * Change a price, the trial length or a link here and it updates everywhere.
 */

export const CALENDLY_URL = 'https://calendly.com/orderflowschool-support/30min';

/* Free-trial length shown on the pages. It MUST match the trial length set on
   the Whop plan below — Whop is what actually bills, the pages only describe it.

   It is read from the host setting REACT_APP_TRIAL_DAYS when the site is built,
   so it can be changed in Render (ofs-frontend → Environment →
   REACT_APP_TRIAL_DAYS → save and redeploy) at the same moment the plan is
   changed in Whop, with no code change. If the setting is missing or invalid
   it falls back to 1 day — the shorter, safer claim. */
const envTrialDays = parseInt(process.env.REACT_APP_TRIAL_DAYS, 10);
const TRIAL_DAYS = Number.isInteger(envTrialDays) && envTrialDays >= 1 && envTrialDays <= 30
  ? envTrialDays
  : 1;
const SESSIONS_PER_WEEK = '3–4';
const SESSIONS_PER_WEEK_WORDS = 'Three to four';   // same figure, for starting a sentence

const NUMBER_WORDS = { 1: 'one', 2: 'two', 3: 'three', 5: 'five', 7: 'seven', 14: 'fourteen' };
const days = (n) => `${n} ${n === 1 ? 'day' : 'days'}`;

export const OFS_LIVE = {
  name: 'OFS Live',
  priceLabel: '$75 / month',
  priceShort: '$75/month',
  trialDays: TRIAL_DAYS,
  trialLength: days(TRIAL_DAYS),                                   // "3 days"
  trialLengthWords: `${NUMBER_WORDS[TRIAL_DAYS] || TRIAL_DAYS} ${TRIAL_DAYS === 1 ? 'day' : 'days'}`, // "three days"
  sessionsPerWeek: SESSIONS_PER_WEEK,
  sessionsPerWeekWords: SESSIONS_PER_WEEK_WORDS,
  renewalNote: `${TRIAL_DAYS}-day free trial, then $74.99 every 30 days. Cancel anytime in Whop.`,
  trialMicro: `${days(TRIAL_DAYS)} free · then $74.99 every 30 days · cancel anytime in Whop`,
  trialNote: `${TRIAL_DAYS}-day free trial`,
  checkoutUrl: 'https://whop.com/checkout/plan_xAelJXG9Fv4QE',
};

/**
 * The free community server. `memberCount` is a rounded-down figure shown as
 * social proof — update it by hand when the server grows.
 *
 * ⚠️ The invite must be set to NEVER expire in Discord (Invite → Edit invite
 * link → Expire after: Never). A default invite dies after 7–30 days and the
 * button on the page dies with it.
 */
export const DISCORD = {
  inviteUrl: 'https://discord.gg/645VWV5S3',
  memberCount: '1,300+',
};

/**
 * Entry price for the private program. Shown only inside the application, and
 * only to the applicants who get the commitment re-check — most people never
 * see a number before the conversation.
 */
export const PRIVATE_PROGRAM = {
  fromPrice: '$3,000',
};

export default { CALENDLY_URL, OFS_LIVE, DISCORD, PRIVATE_PROGRAM };
