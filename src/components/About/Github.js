import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";

const execStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .exec-section {
    justify-content: center;
    padding-bottom: 60px;
    color: white;
    text-align: center;
    position: relative;
  }

  .exec-heading {
    font-family: 'Outfit', sans-serif !important;
    font-size: 2.4em !important;
    font-weight: 800 !important;
    padding-bottom: 12px;
    animation: execHeadIn 0.8s cubic-bezier(0.22,1,0.36,1) both;
    letter-spacing: -0.3px;
  }
  @keyframes execHeadIn {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .exec-sub {
    font-family: 'Outfit', sans-serif;
    max-width: 600px;
    margin: 0 auto 48px;
    font-size: 0.95em;
    line-height: 1.75;
    color: rgba(255,255,255,0.5);
    animation: execFadeUp 0.8s ease 0.2s both;
  }
  @keyframes execFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .exec-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    max-width: 900px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .exec-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .exec-stat-card {
    position: relative;
    border-radius: 18px;
    padding: 30px 16px 24px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(198,120,221,0.14);
    overflow: hidden;
    cursor: default;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    animation: statCardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
  }

  .exec-stat-card:nth-child(1){animation-delay:0.1s}
  .exec-stat-card:nth-child(2){animation-delay:0.2s}
  .exec-stat-card:nth-child(3){animation-delay:0.3s}
  .exec-stat-card:nth-child(4){animation-delay:0.4s}

  @keyframes statCardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.94); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Shimmer sweep */
  .exec-stat-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.08), transparent);
    transition: left 0.55s ease;
    pointer-events: none;
  }
  .exec-stat-card:hover::after { left: 160%; }

  /* Top glow on hover */
  .exec-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.8), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    box-shadow: 0 0 8px rgba(198,120,221,0.5);
  }
  .exec-stat-card:hover::before { opacity: 1; }

  .exec-stat-card:hover {
    background: rgba(198,120,221,0.07);
    border-color: rgba(198,120,221,0.45);
    transform: translateY(-8px) scale(1.03);
    box-shadow:
      0 18px 50px rgba(198,120,221,0.14),
      0 6px 16px rgba(0,0,0,0.35),
      inset 0 0 30px rgba(198,120,221,0.03);
  }

  /* Icon circle */
  .exec-icon {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: rgba(198,120,221,0.1);
    border: 1px solid rgba(198,120,221,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2em;
    margin: 0 auto 14px;
    transition: all 0.35s ease;
    box-shadow: inset 0 0 10px rgba(198,120,221,0.05);
  }
  .exec-stat-card:hover .exec-icon {
    background: rgba(198,120,221,0.18);
    border-color: rgba(198,120,221,0.5);
    box-shadow: 0 0 16px rgba(198,120,221,0.3);
    transform: scale(1.1) rotate(-5deg);
  }

  /* Big number */
  .exec-number {
    font-family: 'Outfit', sans-serif;
    font-size: 2.2em;
    font-weight: 800;
    color: #c678dd;
    line-height: 1;
    margin-bottom: 8px;
    text-shadow: 0 0 20px rgba(198,120,221,0.4);
    transition: text-shadow 0.3s ease;
  }
  .exec-stat-card:hover .exec-number {
    text-shadow: 0 0 30px rgba(198,120,221,0.7), 0 0 60px rgba(198,120,221,0.3);
  }

  .exec-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.82em;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    line-height: 1.4;
    transition: color 0.3s ease;
  }
  .exec-stat-card:hover .exec-label {
    color: rgba(255,255,255,0.85);
  }

  /* Bottom accent bar */
  .exec-bar {
    position: absolute;
    bottom: 0; left: 30%; right: 30%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c678dd, transparent);
    border-radius: 2px;
    opacity: 0;
    box-shadow: 0 0 8px rgba(198,120,221,0.6);
    transition: opacity 0.3s ease, left 0.3s ease, right 0.3s ease;
  }
  .exec-stat-card:hover .exec-bar {
    opacity: 1;
    left: 15%; right: 15%;
  }

  /* Divider */
  .exec-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 44px;
    animation: execFadeUp 0.8s ease 0.15s both;
  }
  .exec-divider span:nth-child(1),
  .exec-divider span:nth-child(3) {
    display: block; height: 1px; width: 60px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.6));
  }
  .exec-divider span:nth-child(3) {
    background: linear-gradient(90deg, rgba(198,120,221,0.6), transparent);
  }
  .exec-divider span:nth-child(2) {
    width: 8px; height: 8px; border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.9), 0 0 24px rgba(198,120,221,0.4);
    animation: eDotPulse 2s ease-in-out infinite;
  }
  @keyframes eDotPulse {
    0%,100%{box-shadow:0 0 12px rgba(198,120,221,0.9),0 0 24px rgba(198,120,221,0.4)}
    50%    {box-shadow:0 0 20px rgba(198,120,221,1),  0 0 40px rgba(198,120,221,0.6)}
  }
`;

const stats = [
  { icon: "🚀", number: "4+", label: "Years of Structured Learning" },
  { icon: "⚡", number: "10+", label: "Strategic Initiatives Built" },
  { icon: "📈", number: "Multiple", label: "Brand Growth Campaigns" },
  { icon: "🎯", number: "End to End", label: "Systems Designed & Executed" },
];

function Github() {
  useEffect(() => {
    if (!document.getElementById("sg-exec-styles")) {
      const tag = document.createElement("style");
      tag.id = "sg-exec-styles";
      tag.innerHTML = execStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("sg-exec-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <Row className="exec-section">
      <h1 className="project-heading exec-heading">
        Execution & <strong className="purple">Discipline</strong>
      </h1>

      <div className="exec-divider">
        <span />
        <span />
        <span />
      </div>

      <p className="exec-sub">
        Growth is not accidental. It is structured, measured, and executed
        consistently. Every initiative is built with long-term positioning and
        psychological precision.
      </p>

      <div className="exec-grid">
        {stats.map((s, i) => (
          <div className="exec-stat-card" key={i}>
            <div className="exec-icon">{s.icon}</div>
            <div className="exec-number">{s.number}</div>
            <div className="exec-label">{s.label}</div>
            <div className="exec-bar" />
          </div>
        ))}
      </div>
    </Row>
  );
}

export default Github;
