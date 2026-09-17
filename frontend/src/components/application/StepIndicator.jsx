import React from 'react';

const STEPS = [
  { label: 'Your details', sub: 'Who you are and where to reach you.' },
  { label: 'Your trading', sub: 'How long you have traded, and where it breaks down. Nothing here gets replaced.' },
  { label: 'Commitment',   sub: 'How serious you are, and how ready to work.' },
  { label: 'Fit',          sub: 'Whether the timing works on both sides. Last step.' },
];

const StepIndicator = ({ currentStep, totalSteps }) => {
  const pct = Math.round((currentStep / totalSteps) * 100);
  const step = STEPS[currentStep - 1] || STEPS[0];

  return (
    <div className="ofs-progress">
      <div className="ofs-progress-head">
        <span className="ofs-label ofs-label--green">
          Step {currentStep} of {totalSteps} · {step.label}
        </span>
        <span className="ofs-label" aria-hidden="true">{pct}%</span>
      </div>

      <div
        className="ofs-progress-track"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Application progress: step ${currentStep} of ${totalSteps}`}
      >
        <div className="ofs-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <p className="ofs-fine" style={{ marginTop: 2 }}>{step.sub}</p>
    </div>
  );
};

export default StepIndicator;
