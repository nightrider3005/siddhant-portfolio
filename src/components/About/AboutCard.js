import React, { useEffect, useState } from "react";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  .sg-about-card {
    position: relative;
    border-radius: 20px;
    background: rgba(10, 8, 20, 0.85);
    border: 1px solid rgba(198,120,221,0.2);
    box-shadow:
      0 0 0 1px rgba(198,120,221,0.08),
      0 20px 60px rgba(198,120,221,0.1),
      0 8px 20px rgba(0,0,0,0.5),
      inset 0 0 60px rgba(198,120,221,0.02);
    backdrop-filter: blur(12px);
    overflow: hidden;
    animation: cardFloat 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes cardFloat {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .sg-about-card::before,
  .sg-about-card::after {
    content: '';
    position: absolute;
    width: 20px; height: 20px;
    border-color: rgba(198,120,221,0.5);
    border-style: solid;
    transition: all 0.4s ease;
  }
  .sg-about-card::before {
    top: -1px; left: -1px;
    border-width: 2px 0 0 2px;
    border-radius: 8px 0 0 0;
  }
  .sg-about-card::after {
    bottom: -1px; right: -1px;
    border-width: 0 2px 2px 0;
    border-radius: 0 0 8px 0;
  }
  .sg-about-card:hover::before,
  .sg-about-card:hover::after {
    width: 30px; height: 30px;
    border-color: rgba(198,120,221,0.9);
  }

  .sg-card-corner-tr,
  .sg-card-corner-bl {
    position: absolute;
    width: 20px; height: 20px;
    border-color: rgba(198,120,221,0.5);
    border-style: solid;
    transition: all 0.4s ease;
    z-index: 2;
  }
  .sg-card-corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; border-radius: 0 8px 0 0; }
  .sg-card-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; border-radius: 0 0 0 8px; }
  .sg-about-card:hover .sg-card-corner-tr,
  .sg-about-card:hover .sg-card-corner-bl {
    width: 30px; height: 30px;
    border-color: rgba(198,120,221,0.9);
  }

  .sg-terminal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    background: rgba(198,120,221,0.06);
    border-bottom: 1px solid rgba(198,120,221,0.1);
    position: relative;
  }
  .sg-terminal-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.4), transparent);
  }

  .sg-dot { width: 12px; height: 12px; border-radius: 50%; }
  .sg-dot-red    { background: #ff5f57; box-shadow: 0 0 6px rgba(255,95,87,0.6); }
  .sg-dot-yellow { background: #febc2e; box-shadow: 0 0 6px rgba(254,188,46,0.6); }
  .sg-dot-green  { background: #28c840; box-shadow: 0 0 6px rgba(40,200,64,0.6); }

  .sg-terminal-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75em;
    color: rgba(255,255,255,0.4);
    margin-left: 6px;
    letter-spacing: 0.5px;
  }

  .sg-cursor {
    display: inline-block;
    width: 7px; height: 13px;
    background: #c678dd;
    border-radius: 1px;
    margin-left: 6px;
    vertical-align: middle;
    animation: cursorBlink 1.1s step-end infinite;
    box-shadow: 0 0 8px rgba(198,120,221,0.8);
  }
  @keyframes cursorBlink {
    0%,100%{opacity:1} 50%{opacity:0}
  }

  .sg-terminal-body {
    padding: 24px 24px 20px;
    position: relative;
  }

  .sg-row {
    display: flex;
    align-items: flex-start;
    padding: 9px 12px;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: background 0.25s ease, transform 0.25s ease;
    cursor: default;
    animation: rowIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    gap: 0;
  }
  .sg-row:nth-child(1){animation-delay:0.15s}
  .sg-row:nth-child(2){animation-delay:0.22s}
  .sg-row:nth-child(3){animation-delay:0.29s}
  .sg-row:nth-child(4){animation-delay:0.36s}
  .sg-row:nth-child(5){animation-delay:0.43s}
  .sg-row:nth-child(6){animation-delay:0.50s}
  .sg-row:nth-child(7){animation-delay:0.57s}

  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-14px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .sg-row:hover {
    background: rgba(198,120,221,0.07);
    transform: translateX(5px);
  }

  .sg-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82em;
    font-weight: 600;
    color: #c678dd;
    min-width: 130px;
    flex-shrink: 0;
    text-shadow: 0 0 10px rgba(198,120,221,0.3);
  }

  .sg-sep {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82em;
    color: rgba(255,255,255,0.25);
    margin: 0 10px;
    flex-shrink: 0;
  }

  .sg-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82em;
    color: rgba(255,255,255,0.78);
    line-height: 1.5;
    flex: 1;
  }

  .sg-val-link {
    color: #c678dd;
    text-decoration: none;
    transition: text-shadow 0.3s ease;
  }
  .sg-val-link:hover {
    text-shadow: 0 0 12px rgba(198,120,221,0.8);
    color: #c678dd;
  }

  .sg-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(40,200,64,0.1);
    border: 1px solid rgba(40,200,64,0.25);
    border-radius: 20px;
    padding: 2px 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72em;
    color: #28c840;
    font-weight: 500;
  }
  .sg-status-badge .live-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #28c840;
    box-shadow: 0 0 6px rgba(40,200,64,0.8);
    animation: livePulse 1.5s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes livePulse {
    0%,100%{opacity:1} 50%{opacity:0.3}
  }

  .sg-terminal-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.2), transparent);
    margin: 12px 0;
  }

  .sg-quote {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78em;
    font-style: italic;
    color: rgba(255,255,255,0.38);
    text-align: center;
    padding: 14px 12px 4px;
    letter-spacing: 0.2px;
    animation: rowIn 0.5s ease 0.65s both;
  }
  .sg-quote span {
    color: rgba(198,120,221,0.6);
  }

  .sg-card-glow-line {
    position: absolute;
    bottom: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.5), transparent);
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(198,120,221,0.4);
  }
`;

const rows = [
  { key: "Name", val: "Siddhant Garg" },
  { key: "Location", val: "Gwalior, India 🇮🇳" },
  { key: "Background", val: "B.Tech Computer Science · VIT" },
  { key: "Focus", val: "Growth Strategy & Brand Positioning" },
  { key: "Edge", val: "Consumer Psychology & Behaviour" },
  { key: "Approach", val: "Systems Thinking · Data Driven" },
];

function AboutCard() {
  const [typed, setTyped] = useState("");
  const full = "system_profile.exe";

  useEffect(() => {
    if (!document.getElementById("sg-about-card-styles")) {
      const tag = document.createElement("style");
      tag.id = "sg-about-card-styles";
      tag.innerHTML = cardStyles;
      document.head.appendChild(tag);
    }
    let i = 0;
    const interval = setInterval(() => {
      setTyped(full.slice(0, ++i));
      if (i >= full.length) clearInterval(interval);
    }, 60);

    return () => {
      clearInterval(interval);
      const el = document.getElementById("sg-about-card-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="sg-about-card">
      <div className="sg-card-corner-tr" />
      <div className="sg-card-corner-bl" />

      <div className="sg-terminal-header">
        <div className="sg-dot sg-dot-red" />
        <div className="sg-dot sg-dot-yellow" />
        <div className="sg-dot sg-dot-green" />
        <span className="sg-terminal-title">
          {typed}
          <span className="sg-cursor" />
        </span>
      </div>

      <div className="sg-terminal-body">
        {rows.map((r, i) => (
          <div className="sg-row" key={i}>
            <span className="sg-key">{r.key}</span>
            <span className="sg-sep">::</span>
            <span className="sg-val">{r.val}</span>
          </div>
        ))}

        <div className="sg-row">
          <span className="sg-key">Current&nbsp;Work</span>
          <span className="sg-sep">::</span>
          <span className="sg-val">
            Building influencer networks, brand strategies & AI education ·{" "}
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
          <span>{"//"}</span> &quot;Growth is engineered through clarity,
          psychology and execution.&quot;
        </p>

        <div className="sg-card-glow-line" />
      </div>
    </div>
  );
}

export default AboutCard;
