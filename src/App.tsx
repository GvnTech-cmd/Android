
import React from 'react';
import Header from './components/Header';
import Badges from './components/Badges';
import TechnicalSummary from './components/TechnicalSummary';
import AttackVector from './components/AttackVector';
import Remediation from './components/Remediation';
import Scripts from './components/Scripts';
import NetworkGraph from './NetworkGraph';
import Footer from './components/Footer';
import MermaidDiagram from './components/MermaidDiagram';

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
      <MermaidDiagram />
      <Footer />
    </div>
  );
}

export default App;
