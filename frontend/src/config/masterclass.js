/**
 * Masterclass configuration — single source of truth.
 * All UI copy that depends on event specifics reads from here.
 *
 * If a value is null or unset, the UI falls back to safe editable copy
 * (e.g. "Next live session — details sent after registration.")
 */

export const MASTERCLASS = {
  // Identity
  id: 'ofs-masterclass-2026',
  title: 'Order Flow Masterclass',
  shortTitle: 'Masterclass',

  // Event details — set to null if unknown. UI hides fields that are null.
  date: null,                   // e.g. '2026-08-14'
  time: null,                   // e.g. '7:00 PM'
  timeZone: null,               // e.g. 'ET'
  durationMinutes: null,        // e.g. 90
  isLive: true,
  isFree: false,                // Do NOT set true unless the event is genuinely free
  registrationOpen: true,
  registrationDeadline: null,   // ISO date; UI hides countdown when null
  maxAttendance: null,

  // Routing
  confirmationPath: '/masterclass-confirmed',
  registrationAnchor: '#masterclass-registration',

  // Support
  supportEmail: 'support@orderflowschool.com',

  // Optional integrations
  calendarLink: null,           // e.g. .ics URL if available
  eventPlatformLink: null,      // e.g. Zoom link — only after registration typically

  // Copy fallbacks
  fallbackDateLabel: 'Next live session — details sent after registration.',
  fallbackStatusLabel: 'Registration open',
};

/** Format the event date + time for display. Returns null if not enough data. */
export const formatEventDateTime = (mc = MASTERCLASS) => {
  if (!mc.date) return null;
  try {
    const d = new Date(mc.date + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
    });
    const parts = [dateStr];
    if (mc.time) parts.push(mc.time);
    if (mc.timeZone) parts.push(mc.timeZone);
    return parts.join(' · ');
  } catch {
    return null;
  }
};

/** Event details row items — filters out anything null. */
export const eventDetailChips = (mc = MASTERCLASS) => {
  const items = [];
  if (mc.isLive) items.push('LIVE ONLINE');
  const dt = formatEventDateTime(mc);
  if (dt) items.push(dt.toUpperCase());
  if (mc.durationMinutes) items.push(`${mc.durationMinutes} MINUTES`);
  else if (mc.registrationOpen) items.push('LIMITED REGISTRATION');
  return items;
};
