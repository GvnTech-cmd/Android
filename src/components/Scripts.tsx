
import React from 'react';
import { Terminal } from 'lucide-react';
import { RED_TEAM_SCRIPT, BLUE_TEAM_SCRIPT } from '../data/constants';
export default function Scripts() {
  return (
    <div className="glass-panel">
      <h2><Terminal size={24} style={{verticalAlign: 'middle', marginRight: '8px'}} />4. Red/Blue Team Scripts</h2>
      <div className="grid">
        <div>
          <h3 style={{ color: 'var(--neon-red)' }}>Red Team PoC</h3>
          <pre><code>{RED_TEAM_SCRIPT}</code></pre>
        </div>
        <div>
          <h3 style={{ color: 'var(--neon-blue)' }}>Blue Team IDS (Frida)</h3>
          <pre><code>{BLUE_TEAM_SCRIPT}</code></pre>
        </div>
      </div>
    </div>
  );
}
