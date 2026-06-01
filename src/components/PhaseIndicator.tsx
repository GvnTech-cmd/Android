
import React from 'react';

interface PhaseIndicatorProps {
  currentPhase: number;
  phases: string[];
}

export default function PhaseIndicator({ currentPhase, phases }: PhaseIndicatorProps) {
  return (
    <div className="phase-indicator">
      {phases.map((label, i) => (
        <div key={i} className={`phase-step ${i <= currentPhase ? 'active' : ''}`}>
          <div className="phase-dot" />
          <span className="phase-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
