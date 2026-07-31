import React, { useEffect, useState } from "react";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  .sg-about-card {
    position: relative;
    border-radius: 18px;
    background: rgba(6, 2, 18, 0.94);
    border: 1px solid rgba(160, 50, 210, 0.38);
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.7),
      inset 0 0 35px rgba(160, 50, 210, 0.06),
      0 0 30px rgba(147, 51, 234, 0.15);
    overflow: hidden;
    max-width: 760px;
    margin: 0 auto;
    width: 100%;
  }

  .sg-terminal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.035);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .sg-dot {
    width: 11px; height: 11px;
    border-radius: 50%;
  }
  .sg-dot-red    { background: #ff5f57; box-shadow: 0 0 6px rgba(255,95,87,0.6); }
  .sg-dot-yellow { background: #febc2e; box-shadow: 0 0 6px rgba(254,188,46,0.6); }
  .sg-dot-green  { background: #28c840; box-shadow: 0 0 6px rgba(40,200,64,0.6); }

  .sg-terminal-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78em;
    color: rgba(255, 255, 255, 0.45);
    margin-left: 8px;
    letter-spacing: 0.5px;
  }

  .sg-terminal-body {
    padding: 24px 28px 28px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85em;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sg-row {
    display: grid;
    grid-template-columns: 120px 15px 1fr;
    align-items: baseline;
    line-height: 1.65;
  }

  .sg-key {
    color: #c084fc;
    font-weight: 600;
  }

  .sg-sep {
    color: rgba(255, 255, 255, 0.25);
    text-align: center;
  }

  .sg-val {
    color: rgba(255, 255, 255, 0.9);
    word-break: break-word;
  }

  .sg-val-highlight {
    color: #00f3ff;
    font-weight: 600;
  }

  .sg-val-link {
    color: #00f3ff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }
  .sg-val-link:hover { text-decoration: underline; color: #c084fc; }

  .sg-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(40, 200, 64, 0.12);
    border: 1px solid rgba(40, 200, 64, 0.4);
    color: #28c840;
    padding: 3px 12px;
    border-radius: 14px;
    font-size: 0.86em;
    font-weight: 600;
    box-shadow: 0 0 12px rgba(40, 200, 64, 0.15);
  }
  .live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #28c840;
    box-shadow: 0 0 8px #28c840;
    animation: livePulse 1.8s ease-in-out infinite;
  }
  @keyframes livePulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.3); opacity: 0.6; }
  }

  .sg-terminal-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(160, 50, 210, 0.35), transparent);
    margin: 10px 0;
  }

  .sg-quote {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
    margin: 0;
    line-height: 1.6;
    font-family: 'Outfit', sans-serif;
    font-size: 0.92em;
  }
  .sg-quote span { color: #00f3ff; font-weight: 700; }

  /* ── Mobile Layout Optimization ── */
  @media (max-width: 600px) {
    .sg-terminal-body {
      padding: 18px 16px 20px;
      font-size: 0.78em;
      gap: 11px;
    }
    .sg-row {
      grid-template-columns: 95px 12px 1fr;
    }
    .sg-status-badge {
      font-size: 0.8em;
      padding: 2px 9px;
    }
  }
`;

const rows = [
  { key: "Name", val: "Siddhant Garg", highlight: false },
  { key: "Location", val: "Gwalior, India 🇮🇳", highlight: false },
  { key: "Background", val: "B.Tech Computer Science · VIT Bhopal", highlight: false },
  { key: "Focus", val: "Growth Strategy & Brand Positioning", highlight: true },
  { key: "Edge", val: "Consumer Psychology & Behaviour", highlight: true },
  { key: "Approach", val: "Systems Thinking · Data Driven", highlight: false },
];

function AboutCard() {
  const [typed, setTyped] = useState("");
  const fullText = "system_profile.exe";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{cardStyles}</style>

      <div className="sg-about-card">
        <div className="sg-terminal-header">
          <div className="sg-dot sg-dot-red" />
          <div className="sg-dot sg-dot-yellow" />
          <div className="sg-dot sg-dot-green" />
          <span className="sg-terminal-title">{typed}</span>
        </div>

        <div className="sg-terminal-body">
          {rows.map((r, i) => (
            <div className="sg-row" key={i}>
              <span className="sg-key">{r.key}</span>
              <span className="sg-sep">::</span>
              <span className={`sg-val${r.highlight ? " sg-val-highlight" : ""}`}>
                {r.val}
              </span>
            </div>
          ))}

          <div className="sg-row">
            <span className="sg-key">Current Work</span>
            <span className="sg-sep">::</span>
            <span className="sg-val">
              Building influencer networks & AI education ·{" "}
              <a
                href="https://www.ouriout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sg-val-link"
              >
                OURi.OUT ↗
              </a>
            </span>
          </div>

          <div className="sg-row">
            <span className="sg-key">Status</span>
            <span className="sg-sep">::</span>
            <span className="sg-val">
              <span className="sg-status-badge">
                <span className="live-dot" />
                Open to Opportunities
              </span>
            </span>
          </div>

          <div className="sg-terminal-divider" />

          <p className="sg-quote">
            <span>{"//"}</span> &quot;Growth is engineered through clarity, psychology and execution.&quot;
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutCard;
