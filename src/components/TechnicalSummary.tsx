
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
