/**
 * Mirror of the qualification rules in backend/server.py.
 *
 * The backend remains the authority — this exists only so the application form
 * can decide, live, whether to show the commitment re-check on the last step.
 * If you change a rule or an option string here, change it in server.py too;
 * the two are deliberately kept literal so a diff is obvious.
 */
import { TIER1_COUNTRIES } from '../data/countries';

export const SERIOUSNESS_ABS_LOW = 'Curious, but not fully committed';
export const SERIOUSNESS_MED = "I want to improve, but I haven't treated it seriously enough yet";
export const SERIOUSNESS_HIGH = new Set([
  "I'm serious and ready to put in the work",
  "I'm fully committed to becoming consistently profitable",
]);

export const READINESS_ABS_LOW = 'Just exploring';
export const READINESS_MED = 'Interested but unsure';
export const READINESS_HIGH = new Set(['Ready to commit', 'Fully ready']);

export const HIGH_BUDGETS = new Set(['$2,500-$4,000', '$4,000+']);
export const MID_BUDGET = '$1,000-$2,500';
export const LOW_HIGH_BUDGET = '$500-$1,000';
export const DIRT_BUDGET = '$0-$500';

/** Answers to the commitment re-check. Only DECLINE removes qualification. */
export const REVALIDATION = {
  YES: 'Yes — I can move forward at that level',
  MAYBE: "Possibly — I'd need to arrange it, but it's realistic",
  NO: 'No — not at that level right now',
};

const sTier = (a) => {
  if (!a) return 0;
  if (a === SERIOUSNESS_ABS_LOW) return 1;
  if (a === SERIOUSNESS_MED) return 2;
  if (SERIOUSNESS_HIGH.has(a)) return 3;
  return 0;
};

const rTier = (a) => {
  if (!a) return 0;
  if (a === READINESS_ABS_LOW) return 1;
  if (a === READINESS_MED) return 2;
  if (READINESS_HIGH.has(a)) return 3;
  return 0;
};

/** The budget + commitment result, before the country re-check is applied. */
export const passesCoreQualification = ({ investment, seriousness, readiness, country }) => {
  if (!investment || !investment.trim()) return false;
  const s = sTier(seriousness);
  const r = rTier(readiness);
  const bothLowest = s === 1 && r === 1;
  const budget = investment.trim();

  if (HIGH_BUDGETS.has(budget)) return !bothLowest;
  if (budget === MID_BUDGET) return s !== 1 && r !== 1;
  if (budget === LOW_HIGH_BUDGET) {
    // Tier 1 markets can finance enrolment, so HIGH seriousness qualifies (readiness
    // only needs to be above "just exploring"). Elsewhere, require both signals HIGH.
    return isTier1Country(country) ? (s === 3 && r !== 1) : (s === 3 && r === 3);
  }
  if (budget === DIRT_BUDGET) return false;
  return false;
};

/**
 * Applicants outside the Tier 1 markets get one additional commitment question
 * before the conversation is offered — a stated budget band does not always
 * translate to intent at the real enrolment number. It is a re-check, not a
 * bar: answering yes keeps them fully qualified.
 */
export const isTier1Country = (country) => TIER1_COUNTRIES.has(country);

export const needsInvestmentRevalidation = (formData) =>
  Boolean(formData.country)
  && !isTier1Country(formData.country)
  && passesCoreQualification(formData);

export default { passesCoreQualification, needsInvestmentRevalidation, REVALIDATION };
