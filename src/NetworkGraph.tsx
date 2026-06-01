import { log } from './utils/logger';
import { useState, useEffect } from 'react';
import { Smartphone, Database, ShieldAlert, Cpu } from 'lucide-react';

export default function NetworkGraph() {
  const [phase, setPhase] = useState(0);

  const startExploit = () => {
    log('Exploit Started'); setPhase(1);
    setTimeout(() => setPhase(2), 1000); // Hit IPC
    setTimeout(() => setPhase(3), 2000); // Hit Target App
    setTimeout(() => setPhase(4), 3000); // RCE Success
    setTimeout(() => setPhase(0), 5000); // Reset
  };

  return (
    <div className="network-graph-container glass-panel">
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Interactive Topology: Intent Propagation</h3>
      
      <div className="network-nodes">
        {/* Edge connecting nodes */}
        <div className="edge">
          {phase > 0 && phase < 4 && (
            <div 
              className="payload-packet" 
              style={{ left: phase === 1 ? '0%' : phase === 2 ? '50%' : '100%' }}
            />
          )}
        </div>

        <div className="node">
          <Smartphone size={32} />
          <span className="node-label">Attacker</span>
        </div>

        <div className={\`node \${phase >= 2 ? 'hacked' : ''}\`}>
          <Cpu size={32} />
          <span className="node-label">Binder IPC</span>
        </div>

        <div className={\`node \${phase >= 3 ? 'hacked' : ''}\`}>
          <Database size={32} />
          <span className="node-label">Target App</span>
        </div>
      </div>

      <div className="controls">
        <button className="btn-cyber" onClick={startExploit} disabled={phase !== 0}>
          {phase === 0 ? '▶ Run Exploit Simulation' : 'Compromising...'}
        </button>
        {phase === 4 && (
          <p style={{ color: 'var(--neon-red)', marginTop: '1rem', fontWeight: 'bold' }}>
            <ShieldAlert size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }}/>
            RCE ACHIEVED: System Compromised
          </p>
        )}
      </div>
    </div>
  );
}
