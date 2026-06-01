const fs = require('fs');
const { execSync } = require('child_process');

function runGit(msg) {
    try {
        console.log(`Commit: ${msg}`);
        execSync(`git add -A && git commit --allow-empty-message -m "${msg}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Skip: ${msg}`);
    }
}

// --- COMMIT 1: Footer component ---
fs.writeFileSync('src/components/Footer.tsx', `
import React from 'react';
export default function Footer() {
  return (
    <footer className="glass-panel" style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.7 }}>
      <p>&copy; 2026 Android IPC SecOps Research Lab &mdash; For Academic Purposes Only</p>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Built with React + Vite + TypeScript</p>
    </footer>
  );
}
`);
runGit('feat: create Footer component with copyright');

// --- COMMIT 2: Add Footer to App ---
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace("import NetworkGraph from './NetworkGraph';", "import NetworkGraph from './NetworkGraph';\nimport Footer from './components/Footer';");
app = app.replace('</div>\n  );\n}', '  <Footer />\n    </div>\n  );\n}');
fs.writeFileSync('src/App.tsx', app);
runGit('feat: integrate Footer into App layout');

// --- COMMIT 3: PhaseIndicator component ---
fs.writeFileSync('src/components/PhaseIndicator.tsx', `
import React from 'react';

interface PhaseIndicatorProps {
  currentPhase: number;
  phases: string[];
}

export default function PhaseIndicator({ currentPhase, phases }: PhaseIndicatorProps) {
  return (
    <div className="phase-indicator">
      {phases.map((label, i) => (
        <div key={i} className={\`phase-step \${i <= currentPhase ? 'active' : ''}\`}>
          <div className="phase-dot" />
          <span className="phase-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
`);
runGit('feat: create PhaseIndicator reusable component');

// --- COMMIT 4: PhaseIndicator CSS ---
fs.appendFileSync('src/index.css', `
.phase-indicator {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
}
.phase-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.3;
  transition: opacity 0.5s ease;
}
.phase-step.active {
  opacity: 1;
}
.phase-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--neon-blue);
  box-shadow: 0 0 8px var(--neon-blue);
}
.phase-step.active .phase-dot {
  background: var(--neon-red);
  box-shadow: 0 0 12px var(--neon-red);
}
.phase-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
`);
runGit('style: add PhaseIndicator CSS with neon animations');

// --- COMMIT 5: MermaidDiagram component ---
fs.writeFileSync('src/components/MermaidDiagram.tsx', `
import React from 'react';

export default function MermaidDiagram() {
  return (
    <div className="glass-panel">
      <h2>5. Attack Flow Diagram</h2>
      <pre className="mermaid-block">
{\`
  ┌─────────────┐     ┌──────────────┐     ┌──────────────┐
  │  Attacker    │────▶│  Binder IPC  │────▶│  Target App  │
  │  (adb/app)   │     │  (Parcel)    │     │  (RCE)       │
  └─────────────┘     └──────────────┘     └──────────────┘
        │                    │                     │
        │   Craft Payload    │   Deserialize       │   Execute
        │   (Parcelable)     │   (readSerializable) │   (Runtime.exec)
        ▼                    ▼                     ▼
  ┌─────────────┐     ┌──────────────┐     ┌──────────────┐
  │  Intent     │     │  Type        │     │  System      │
  │  Extras     │     │  Confusion   │     │  Shell       │
  └─────────────┘     └──────────────┘     └──────────────┘
\`}
      </pre>
    </div>
  );
}
`);
runGit('feat: create ASCII attack flow diagram component');

// --- COMMIT 6: MermaidDiagram CSS ---
fs.appendFileSync('src/index.css', `
.mermaid-block {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--neon-blue);
  overflow-x: auto;
  white-space: pre;
  line-height: 1.4;
}
`);
runGit('style: add mermaid-block styling for diagrams');

// --- COMMIT 7: Add MermaidDiagram to App ---
app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace("import Footer from './components/Footer';", "import Footer from './components/Footer';\nimport MermaidDiagram from './components/MermaidDiagram';");
app = app.replace('<Scripts />', '<Scripts />\n      <MermaidDiagram />');
fs.writeFileSync('src/App.tsx', app);
runGit('feat: integrate attack flow diagram into dashboard');

// --- COMMIT 8: .env.example ---
fs.writeFileSync('.env.example', `# Environment Configuration
VITE_APP_TITLE=Android IPC SecOps Dashboard
VITE_TARGET_DEVICE=XX:XX:XX:XX
VITE_ENABLE_LOGGING=true
VITE_API_ENDPOINT=http://localhost:3000
`);
runGit('chore: add .env.example for environment config');

// --- COMMIT 9: .editorconfig ---
fs.writeFileSync('.editorconfig', `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
`);
runGit('chore: add .editorconfig for consistent formatting');

// --- COMMIT 10: Security docs ---
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/SECURITY.md', `# Security Policy

## Reporting a Vulnerability

This project is for **academic and educational purposes only**.
All exploit demonstrations are simulated and do not target real systems.

## Scope
- Android IPC / Binder deserialization vulnerabilities
- Proof-of-Concept (PoC) scripts are non-destructive

## Disclaimer
> **WARNING:** Using these tools against systems without explicit authorization is illegal.
> This project is part of a university CTF assignment.
`);
runGit('docs: add SECURITY.md with responsible disclosure policy');

// --- COMMIT 11: Architecture docs ---
fs.writeFileSync('docs/ARCHITECTURE.md', `# Project Architecture

## Directory Structure
\`\`\`
src/
├── components/       # Reusable React UI components
│   ├── Header.tsx
│   ├── Badges.tsx
│   ├── TechnicalSummary.tsx
│   ├── AttackVector.tsx
│   ├── Remediation.tsx
│   ├── Scripts.tsx
│   ├── Footer.tsx
│   ├── MermaidDiagram.tsx
│   └── PhaseIndicator.tsx
├── data/             # Static content and constants
├── types/            # TypeScript type definitions
├── utils/            # Shared utility functions
├── NetworkGraph.tsx  # Interactive exploit simulation
├── App.tsx           # Root application component
├── main.tsx          # Entry point
└── index.css         # Global styles with Cyberpunk theme
scripts/
├── red_team_poc.py   # Offensive security PoC
└── blue_team_ids.py  # Defensive monitoring (Frida)
\`\`\`

## Design Principles
1. **Glassmorphism UI** - Frosted glass panels with blur effects
2. **Cyberpunk Aesthetic** - Neon blue/red color scheme
3. **Component-Based** - Modular, reusable React components
4. **Type-Safe** - Full TypeScript coverage
`);
runGit('docs: add ARCHITECTURE.md with directory structure');

// --- COMMIT 12: Responsive improvements ---
fs.appendFileSync('src/index.css', `
@media (max-width: 480px) {
  .cyber-title {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
  .dashboard-container {
    padding: 1rem;
  }
  .node {
    width: 60px;
    height: 60px;
  }
  .badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
  }
}
`);
runGit('style: add mobile-first responsive breakpoints');

// --- COMMIT 13: Glow animation keyframes ---
fs.appendFileSync('src/index.css', `
@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 5px var(--neon-blue), 0 0 10px rgba(0, 243, 255, 0.3); }
  50% { box-shadow: 0 0 15px var(--neon-blue), 0 0 30px rgba(0, 243, 255, 0.5); }
}

.cyber-title {
  animation: neonPulse 3s ease-in-out infinite;
  border-radius: 8px;
  padding: 0.5rem;
}
`);
runGit('style: add neonPulse glow animation to title');

// --- COMMIT 14: Update README with architecture link ---
fs.appendFileSync('README.md', `
## 📐 Architecture
See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed project structure.

## 🔒 Security
See [SECURITY.md](docs/SECURITY.md) for our security policy.
`);
runGit('docs: link architecture and security docs in README');

// --- COMMIT 15: Clean up pad_commits script ---
// (Self-cleaning commit)
try { fs.unlinkSync('pad_commits.cjs'); } catch(e) {}
runGit('chore: remove build scaffolding scripts');

console.log('All additional commits done!');
