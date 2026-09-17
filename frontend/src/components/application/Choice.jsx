import React from 'react';

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#03251A"
       strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * One selectable row. The whole row is the target (52px minimum), not a 16px
 * dot — the single biggest usability difference on a form filled on a phone.
 */
const Choice = ({ type = 'radio', name, value, label, checked, onChange }) => (
  <label className={`ofs-option${checked ? ' ofs-option--on' : ''}`}>
    <input
      type={type}
      name={name}
      value={value}
      checked={!!checked}
      onChange={onChange}
      className="ofs-sr"
    />
    <span className={`ofs-tick ofs-tick--${type === 'radio' ? 'radio' : 'box'}`} aria-hidden="true">
      <Check />
    </span>
    <span>{label}</span>
  </label>
);

export const ChoiceGroup = ({ legend, hint, optional, error, children, id }) => (
  <fieldset className="ofs-fieldset" aria-describedby={error ? `${id}-err` : undefined}>
    <legend className="ofs-field-label">
      {legend} {optional
        ? <span style={{ color: 'var(--paper-faint)', fontWeight: 400 }}>(optional)</span>
        : <span className="ofs-req" aria-hidden="true">*</span>}
    </legend>
    {hint && <p className="ofs-fine" style={{ margin: '-4px 0 12px' }}>{hint}</p>}
    <div className="ofs-choices">{children}</div>
    {error && <p className="ofs-error" id={`${id}-err`} role="alert">{error}</p>}
  </fieldset>
);

export default Choice;
