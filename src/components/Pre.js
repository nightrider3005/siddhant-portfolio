import React, { useState, useEffect, useRef } from "react";

/* ─── Boot sequence lines ─── */
const BOOT_LINES = [
  "SG.OS v1.0 booting...",
  "> loading portfolio.exe ... ok",
  "> waking up growth engine ... ok",
  "> syncing AI models ... ok",
  "> ready.",
];

const BOOT_DELAY = 380; /* ms between each line */
const PROGRESS_DURATION = 2200; /* ms for progress to reach 100 */

function ProgressBars({ progress }) {
  const count = 30;
  return (
    <div className="sgpre-eqbars">
      {Array.from({ length: count }, (_, i) => {
        const pct = ((i + 1) / count) * 100;
        const filled = pct <= progress;
        const ht = 14 + (i % 4 === 0 ? 18 : i % 3 === 0 ? 12 : i % 2 === 0 ? 8 : 4);
        return (
          <div
            key={i}
            className={`sgpre-bar${filled ? " filled" : ""}`}
            style={{ height: ht + "px" }}
          />
        );
      })}
    </div>
  );
}

function Preloader({ load, setLoad }) {
  const [visLines, setVisLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const styleRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) { setLoad(false); return; }
    if (!load) return;

    /* Inject scoped styles */
    if (!document.getElementById("sgpre-styles")) {
      const el = document.createElement("style");
      el.id = "sgpre-styles";
      el.textContent = styles;
      document.head.appendChild(el);
      styleRef.current = el;
    }

    /* Stagger lines */
    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisLines(p => [...p, i]), i * BOOT_DELAY)
    );

    /* Progress ticker */
    const step = 100 / (PROGRESS_DURATION / 50);
    const ticker = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(ticker); return 100; }
        return Math.min(100, p + step);
      });
    }, 50);

    /* Exit */
    const exitT = setTimeout(() => setExiting(true), PROGRESS_DURATION + 300);
    const doneT = setTimeout(() => {
      setLoad(false);
      styleRef.current?.remove();
    }, PROGRESS_DURATION + 900);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearInterval(ticker);
      clearTimeout(exitT);
      clearTimeout(doneT);
      styleRef.current?.remove();
    };
  }, [load, prefersReduced, setLoad]);

  if (!load || prefersReduced) return null;

  return (
    <div className={`sgpre-root${exiting ? " sgpre-exit" : ""}`}>
      {/* Liquid Cosmic Gradient Background */}
      <div className="sgpre-bg" />
      <div className="sgpre-rays" />

      {/* Terminal window */}
      <div className="sgpre-terminal">
        {/* Traffic-light header */}
        <div className="sgpre-header">
          <div className="sgpre-dot red" />
          <div className="sgpre-dot yellow" />
          <div className="sgpre-dot green" />
          <span className="sgpre-htitle">boot.exe</span>
        </div>

        {/* Boot lines */}
        <div className="sgpre-body">
          {BOOT_LINES.map((line, i) =>
            visLines.includes(i) ? (
              <div key={i} className="sgpre-line">
                {line}
                {i === visLines[visLines.length - 1] && (
                  <span className="sgpre-cursor" />
                )}
              </div>
            ) : null
          )}
        </div>

        {/* Progress / equalizer bars */}
        <div className="sgpre-progress">
          <ProgressBars progress={progress} />
          <div className="sgpre-pf">
            <span>SG PORTFOLIO</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;

/* ─────────────────────────────────────────────
   SCOPED STYLES — injected into <head>
───────────────────────────────────────────── */
const styles = `
  .sgpre-root {
    position: fixed;
    inset: 0;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    overflow: hidden;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .sgpre-exit {
    opacity: 0;
    transform: scale(1.04);
    pointer-events: none;
  }

  /* ── Liquid Cosmic Gradient Background ── */
  .sgpre-bg {
    position: absolute;
    inset: 0;
    background: #04010a;
    background-image: 
      radial-gradient(at 20% 20%, rgba(147, 51, 234, 0.35) 0px, transparent 50%),
      radial-gradient(at 80% 20%, rgba(0, 243, 255, 0.25) 0px, transparent 50%),
      radial-gradient(at 50% 80%, rgba(224, 72, 200, 0.28) 0px, transparent 50%),
      radial-gradient(at 80% 80%, rgba(124, 58, 237, 0.3) 0px, transparent 50%);
    z-index: 0;
  }
  .sgpre-rays {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
    z-index: 0;
    pointer-events: none;
  }

  /* ── Terminal window ── */
  .sgpre-terminal {
    position: relative;
    z-index: 2;
    width: min(500px, 90vw);
    background: rgba(4, 0, 16, 0.92);
    border: 1px solid rgba(200, 80, 240, 0.35);
    border-radius: 14px;
    overflow: hidden;
    box-shadow:
      0 28px 70px rgba(0,0,0,0.65),
      0 0 0 1px rgba(200,80,240,0.12),
      0 0 50px rgba(150,30,200,0.2);
    backdrop-filter: blur(4px);
  }

  .sgpre-header {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 11px 16px;
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .sgpre-dot {
    width: 12px; height: 12px;
    border-radius: 50%;
  }
  .sgpre-dot.red    { background: #ff5f57; box-shadow: 0 0 6px rgba(255,95,87,0.6); }
  .sgpre-dot.yellow { background: #febc2e; box-shadow: 0 0 6px rgba(254,188,46,0.6); }
  .sgpre-dot.green  { background: #28c840; box-shadow: 0 0 6px rgba(40,200,64,0.6); }
  .sgpre-htitle {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.71em;
    color: rgba(255,255,255,0.35);
    margin-left: 8px;
    letter-spacing: 0.5px;
  }

  .sgpre-body {
    padding: 18px 20px 8px;
    min-height: 100px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: clamp(0.72em, 1.8vw, 0.85em);
    line-height: 1.85;
    color: rgba(255,255,255,0.85);
  }
  .sgpre-line { display: block; }
  .sgpre-cursor {
    display: inline-block;
    width: 7px; height: 13px;
    background: #c678dd;
    border-radius: 1px;
    vertical-align: middle;
    margin-left: 3px;
    animation: sgpreBlink 0.9s step-end infinite;
  }
  @keyframes sgpreBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── Equalizer progress bars ── */
  .sgpre-progress {
    padding: 6px 20px 16px;
  }
  .sgpre-eqbars {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 44px;
  }
  .sgpre-bar {
    flex: 1;
    border-radius: 2px 2px 0 0;
    background: rgba(255,255,255,0.1);
    transition: background 0.12s;
  }
  .sgpre-bar.filled {
    background: linear-gradient(180deg,
      #ff007f 0%, #c678dd 45%, #9333ea 100%);
    box-shadow: 0 0 4px rgba(200,80,240,0.4);
  }
  .sgpre-pf {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 0.62em;
    color: rgba(255,255,255,0.32);
    margin-top: 7px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }
`;
