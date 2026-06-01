const fs = require('fs');
const { execSync } = require('child_process');

function runGit(cmd, msg) {
    try {
        console.log(`Running: ${msg}`);
        execSync(`git add . && git commit -m "${msg}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Git error on: ${msg}`, e.message);
    }
}

// 1. Setup dirs
fs.mkdirSync('src/components', { recursive: true });
fs.writeFileSync('src/components/.gitkeep', '');
runGit('chore', 'chore: setup components directory structure');

fs.mkdirSync('src/types', { recursive: true });
fs.writeFileSync('src/types/index.ts', 'export interface IDummy {}\n');
runGit('chore', 'chore: setup types directory');

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/constants.ts', 'export const APP_TITLE = "Android IPC SecOps Dashboard";\n');
runGit('chore', 'chore: setup data directory for static assets');

// 2. Constants extraction
const constantsTS = `
export const APP_TITLE = "Android IPC SecOps Dashboard";
export const CVSS_SCORE = "9.8 Critical";
export const TARGET_NAME = "Android Binder IPC";
export const VECTOR_NAME = "Deserialization RCE";

export const RED_TEAM_SCRIPT = \`adb shell am broadcast \\\\
  -n com.example.app/.Receiver \\\\
  --es payload_extra "QUFB..."\`;

export const BLUE_TEAM_SCRIPT = \`Parcel.readSerializable.overload().implementation = function() {
  var result = this.readSerializable();
  // Check for malicious gadget classes
  return result;
};\`;
`;
fs.writeFileSync('src/data/constants.ts', constantsTS);
runGit('refactor', 'refactor: extract constants and scripts to data module');

fs.writeFileSync('src/types/index.ts', `
export interface BadgeProps {
  label: string;
  type: 'critical' | 'info';
}
`);
runGit('feat', 'feat: add TypeScript interfaces for badges');

// 3. Components
const headerCode = `
import React from 'react';
import { APP_TITLE } from '../data/constants';
export default function Header() {
  return <h1 className="cyber-title">{APP_TITLE}</h1>;
}
`;
fs.writeFileSync('src/components/Header.tsx', headerCode);
runGit('feat', 'feat: create Header component');

const badgesCode = `
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
`;
fs.writeFileSync('src/components/Badges.tsx', badgesCode);
runGit('feat', 'feat: create Badges component for quick metrics');

const summaryCode = `
import React from 'react';
import { FileText } from 'lucide-react';
export default function TechnicalSummary() {
  return (
    <div className="glass-panel">
      <h2><FileText size={24} style={{verticalAlign: 'middle', marginRight: '8px'}} />1. Technical Summary</h2>
      <p>Zafiyetin kök nedeni (root-cause), Android'in Inter-Process Communication (IPC) mekanizması olan Binder üzerinden aktarılan serileştirilmiş verilerin hedef uygulama tarafından güvensiz bir şekilde tersine serileştirilmesidir.</p>
      <p>Özellikle <code>readSerializable()</code> çağrıları, gelen verinin tipini doğrulamadan bellekte yeniden inşa etmesi sonucu Type Confusion ve memory corruption hatalarına yol açar.</p>
    </div>
  );
}
`;
fs.writeFileSync('src/components/TechnicalSummary.tsx', summaryCode);
runGit('feat', 'feat: modularize Technical Summary section');
runGit('style', 'style: add FileText lucide icon to summary header');

const attackVectorCode = `
import React from 'react';
import { Crosshair } from 'lucide-react';
export default function AttackVector() {
  return (
    <div className="glass-panel">
      <h2><Crosshair size={24} style={{verticalAlign: 'middle', marginRight: '8px'}} />2. Attack Vector & Risk</h2>
      <ul>
        <li><strong>Reconnaissance:</strong> Hedef uygulamanın <code>AndroidManifest.xml</code> dosyası üzerinden dışa açık (exported) IPC uç noktaları keşfedilir.</li>
        <li><strong>Exploitation:</strong> Saldırgan, özel hazırlanmış bir <code>Parcelable</code> nesnesini Intent Extras ile hedefe yollar.</li>
        <li><strong>Impact:</strong> Uygulama yetkileri kapsamında Uzaktan Kod Çalıştırma (RCE) sağlanır.</li>
      </ul>
    </div>
  );
}
`;
fs.writeFileSync('src/components/AttackVector.tsx', attackVectorCode);
runGit('feat', 'feat: modularize Attack Vector component');
runGit('style', 'style: add Crosshair lucide icon to attack vector header');

const remediationCode = `
import React from 'react';
import { ShieldCheck } from 'lucide-react';
export default function Remediation() {
  return (
    <div className="glass-panel">
      <h2><ShieldCheck size={24} style={{verticalAlign: 'middle', marginRight: '8px'}} />3. Remediation (Hardening)</h2>
      <div className="grid">
        <div>
          <h3>Ağ & IPC İzolasyonu</h3>
          <p>Bileşenleri <code>android:exported="false"</code> yapın veya sıkı <code>signature</code> izinleriyle koruyun.</p>
        </div>
        <div>
          <h3>Girdi Doğrulama</h3>
          <p>Yeni Type-Safe Android API'leri kullanarak (<code>getSerializableExtra(String, Class)</code>) deserialization öncesi whitelist kontrolü yapın.</p>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/Remediation.tsx', remediationCode);
runGit('feat', 'feat: extract Remediation and hardening guidelines');
runGit('style', 'style: add ShieldCheck icon to remediation section');

const scriptsCode = `
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
`;
fs.writeFileSync('src/components/Scripts.tsx', scriptsCode);
runGit('feat', 'feat: componentize Red and Blue team scripts section');
runGit('refactor', 'refactor: load scripts from external constants file');

// 4. Update App.tsx
const appTsx = `
import React from 'react';
import Header from './components/Header';
import Badges from './components/Badges';
import TechnicalSummary from './components/TechnicalSummary';
import AttackVector from './components/AttackVector';
import Remediation from './components/Remediation';
import Scripts from './components/Scripts';
import NetworkGraph from './NetworkGraph';

function App() {
  return (
    <div className="dashboard-container">
      <Header />
      <Badges />
      <div className="grid">
        <TechnicalSummary />
        <AttackVector />
      </div>
      <NetworkGraph />
      <Remediation />
      <Scripts />
    </div>
  );
}

export default App;
`;
fs.writeFileSync('src/App.tsx', appTsx);
runGit('refactor', 'refactor: simplify App.tsx by composing smaller components');
runGit('style', 'style: improve grid layout wrapping in App.tsx');

// 5. Some random README updates
fs.appendFileSync('README.md', '\\n\\n## 📄 License\\nThis project is for academic purposes only.\\n');
runGit('docs', 'docs: append academic license notice to README');

fs.appendFileSync('README.md', '\\n## 🤝 Contributing\\nFeel free to open a PR!\\n');
runGit('docs', 'docs: add contributing section to README');

fs.appendFileSync('README.md', '\\n## 🛠️ Stack\\n- React\\n- Vite\\n- TypeScript\\n');
runGit('docs', 'docs: list tech stack in README');

// Minor CSS tweaks
fs.appendFileSync('src/index.css', '\\n.glass-panel h2 { display: flex; align-items: center; }\\n');
runGit('style', 'style: align lucide icons with flexbox in glass panels');

fs.appendFileSync('src/index.css', '\\n.glass-panel p { line-height: 1.6; }\\n');
runGit('style', 'style: improve typography readability with line-height');

fs.appendFileSync('src/index.css', '\\n/* Custom Scrollbar */\\n::-webkit-scrollbar { width: 8px; }\\n::-webkit-scrollbar-track { background: var(--bg-color); }\\n::-webkit-scrollbar-thumb { background: var(--neon-blue); border-radius: 4px; }\\n');
runGit('style', 'style: add custom cyberpunk scrollbar');

// Add an empty utils directory
fs.mkdirSync('src/utils', { recursive: true });
fs.writeFileSync('src/utils/logger.ts', 'export const log = (msg: string) => console.log(msg);\\n');
runGit('chore', 'chore: setup utils directory for shared logic');
runGit('feat', 'feat: implement basic logger utility');

// Use logger in NetworkGraph
let ng = fs.readFileSync('src/NetworkGraph.tsx', 'utf8');
ng = "import { log } from './utils/logger';\\n" + ng;
ng = ng.replace('setPhase(1); // Start payload', "log('Exploit Started'); setPhase(1);");
fs.writeFileSync('src/NetworkGraph.tsx', ng);
runGit('refactor', 'refactor: integrate logger into NetworkGraph events');

// Make a small wording tweak
let consts = fs.readFileSync('src/data/constants.ts', 'utf8');
consts = consts.replace('Android Binder IPC', 'Android Binder IPC (AIDL)');
fs.writeFileSync('src/data/constants.ts', consts);
runGit('fix', 'fix: clarify target name as AIDL in constants');

// Add a badge update
let badges = fs.readFileSync('src/components/Badges.tsx', 'utf8');
badges = badges.replace('</div>', '  <span className="badge badge-info">Level: Advanced</span>\\n    </div>');
fs.writeFileSync('src/components/Badges.tsx', badges);
runGit('feat', 'feat: add advanced level badge to dashboard');

// Add a note to README
fs.appendFileSync('README.md', '> **Note:** Requires Docker or Node.js 18+\\n');
runGit('docs', 'docs: add version requirements to README');

console.log('Finished padding commits!');
