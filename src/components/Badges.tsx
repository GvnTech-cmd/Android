
import React from 'react';
import { CVSS_SCORE, TARGET_NAME, VECTOR_NAME } from '../data/constants';
export default function Badges() {
  return (
    <div className="glass-panel" style={{ textAlign: 'center' }}>
      <span className="badge badge-critical">CVSS: {CVSS_SCORE}</span>
      <span className="badge badge-info">Target: {TARGET_NAME}</span>
      <span className="badge badge-critical">Vector: {VECTOR_NAME}</span>
    </div>
  );
}
