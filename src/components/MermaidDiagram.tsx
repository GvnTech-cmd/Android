
import React from 'react';

export default function MermaidDiagram() {
  return (
    <div className="glass-panel">
      <h2>5. Attack Flow Diagram</h2>
      <pre className="mermaid-block">
{`
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
`}
      </pre>
    </div>
  );
}
