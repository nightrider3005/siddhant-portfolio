import React, { useState } from "react";

/* ───────────────────────────────────────
   Particle field helper — 50 floating dots
─────────────────────────────────────── */
const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 25;
function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    dur: Math.random() * 18 + 10,
    delay: Math.random() * 8,
    color: i % 3 === 0 ? "#9333ea" : i % 3 === 1 ? "#00f3ff" : "rgba(255,255,255,0.6)",
    dx: (Math.random() - 0.5) * 60,
    dy: (Math.random() - 0.5) * 60,
  }));
}
const PARTICLES = generateParticles();

/* ─── Styles ─── */
const preloaderStyles = `
  .portal-overlay {
    box-sizing: border-box;
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: radial-gradient(ellipse at center, #0d0020 0%, #030008 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transition: opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1);
    overflow: hidden;
  }

  /* ─── Particles ─── */
  .portal-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
  }

  /* ─── Card ─── */
  .portal-card {
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    background: rgba(13, 0, 30, 0.95);
    border: 1px solid rgba(124, 58, 237, 0.4);
    border-radius: 28px;
    padding: 44px 52px 40px;
    max-width: 660px;
    width: 100%;
    text-align: center;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }

  /* ─── Eyebrow with scan line ─── */
  .portal-eyebrow {
    position: relative;
    display: inline-block;
    font-size: 0.65em;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(0, 243, 255, 0.65);
    margin-bottom: 14px;
    overflow: hidden;
    padding-bottom: 2px;
  }
  .portal-eyebrow::after {
    content: '';
    position: absolute;
    bottom: 0; left: -100%;
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent, #00f3ff, transparent);
    animation: scanLine 2s ease 0.5s forwards;
  }
  @keyframes scanLine {
    0%   { left: -60%; }
    100% { left: 160%; }
  }

  /* ─── Title ─── */
  .portal-title {
    font-family: 'Syne', sans-serif;
    font-size: 2.2em;
    font-weight: 800;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  /* ─── Divider ─── */
  .portal-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(147,51,234,0.6), rgba(0,243,255,0.4), transparent);
    margin: 20px auto;
    width: 80%;
    border-radius: 2px;
  }

  /* ─── Question ─── */
  .portal-question {
    font-size: 0.96em;
    color: rgba(255,255,255,0.72);
    margin-bottom: 28px;
    line-height: 1.6;
  }

  /* ─── Buttons ─── */
  .portal-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .portal-btn {
    box-sizing: border-box;
    position: relative;
    font-family: 'Outfit', sans-serif;
    background: rgba(255,255,255,0.018);
    color: rgba(255,255,255,0.72);
    padding: 16px 20px 16px 24px;
    border-radius: 14px;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    line-height: 1.5;
    text-align: left;
    outline: none;
    overflow: hidden;
    transition:
      transform 0.32s cubic-bezier(0.25,1,0.5,1),
      box-shadow 0.32s ease,
      background 0.32s ease,
      border-color 0.32s ease,
      color 0.32s ease;
    will-change: transform;
  }
  .portal-btn-1 { border: 1px solid rgba(147,51,234,0.35); border-left: 3px solid #9333ea; }
  .portal-btn-2 { border: 1px solid rgba(0,243,255,0.25); border-left: 3px solid #00f3ff; }
  .portal-btn-3 { border: 1px solid rgba(255,0,127,0.25); border-left: 3px solid #ff007f; }

  /* Fill glow from left on hover */
  .portal-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .portal-btn-1::before { background: linear-gradient(90deg, rgba(147,51,234,0.12), transparent); }
  .portal-btn-2::before { background: linear-gradient(90deg, rgba(0,243,255,0.10), transparent); }
  .portal-btn-3::before { background: linear-gradient(90deg, rgba(255,0,127,0.10), transparent); }

  /* Arrow slides in from left */
  .portal-btn-arrow {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) translateX(-6px);
    opacity: 0;
    transition: opacity 0.28s ease, transform 0.28s ease;
    font-size: 1em;
  }
  .portal-btn-1 .portal-btn-arrow { color: #9333ea; }
  .portal-btn-2 .portal-btn-arrow { color: #00f3ff; }
  .portal-btn-3 .portal-btn-arrow { color: #ff007f; }

  .portal-btn:hover {
    transform: scale(1.025);
    color: #fff;
    padding-right: 40px;
  }
  .portal-btn-1:hover { box-shadow: 0 8px 28px rgba(147,51,234,0.22); border-color: rgba(147,51,234,0.7); background: rgba(147,51,234,0.06); }
  .portal-btn-2:hover { box-shadow: 0 8px 28px rgba(0,243,255,0.16); border-color: rgba(0,243,255,0.55); background: rgba(0,243,255,0.05); }
  .portal-btn-3:hover { box-shadow: 0 8px 28px rgba(255,0,127,0.18); border-color: rgba(255,0,127,0.55); background: rgba(255,0,127,0.05); }
  .portal-btn:hover::before { opacity: 1; }
  .portal-btn:hover .portal-btn-arrow { opacity: 1; transform: translateY(-50%) translateX(0); }

  .portal-btn-emoji {
    display: inline-block;
    margin-right: 8px;
    transition: transform 0.3s cubic-bezier(0.25,1,0.5,1);
  }
  .portal-btn:hover .portal-btn-emoji {
    transform: translateY(-4px);
  }

  .portal-btn.selected {
    opacity: 0.55;
    pointer-events: none;
  }

  /* ─── Initializing text ─── */
  .portal-init {
    margin-top: 22px;
    font-size: 0.85em;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 700;
    color: #9333ea;
    animation: initFlash 0.4s ease infinite;
    font-family: 'Outfit', monospace;
    min-height: 24px;
  }
  @keyframes initFlash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  /* ─── Feedback ─── */
  .portal-feedback {
    margin-top: 18px;
    font-size: 0.9em;
    line-height: 1.65;
    color: rgba(255,255,255,0.75);
    font-weight: 500;
    animation: fbFadeIn 0.4s ease forwards;
    min-height: 44px;
  }
  @keyframes fbFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── Footer ─── */
  .portal-footer {
    margin-top: 28px;
    font-size: 0.65em;
    color: rgba(255,255,255,0.2);
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  /* ─── Mobile ─── */
  @media (max-width: 767px) {
    .portal-card {
      padding: 32px 22px 28px;
      border-radius: 20px;
    }
    .portal-title { font-size: 1.75em; }
    .portal-btn   { padding: 13px 16px 13px 18px; font-size: 0.84em; }
  }
`;

const OPTIONS = [
  {
    id: "recruiter",
    label: "💼",
    text: "I am a recruiter looking for someone who actually ships things, not just talks about them.",
    feedback: "Hi there, HR. I know you scrolled 50 templates today. Let me save you a coffee. Redirecting now...",
    cls: "portal-btn-1",
  },
  {
    id: "client",
    label: "🚀",
    text: "I am a founder or brand that needs real growth, killer campaigns, and zero excuses.",
    feedback: "You want growth. I engineer it. Let's skip the small talk. Entering the ROI zone...",
    cls: "portal-btn-2",
  },
  {
    id: "curious",
    label: "👀",
    text: "I have no idea how I got here but I am intrigued and staying.",
    feedback: "You wandered in. Good. Stay a while. Things get weird. Initializing the experience...",
    cls: "portal-btn-3",
  },
];

function Pre({ load, setLoad }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showInit, setShowInit] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleSelection = (opt) => {
    if (selected !== null) return;
    setSelected(opt.id);
    setFeedback(opt.feedback);
    // Store visitor type for Home.js to read
    try { localStorage.setItem("visitorType", opt.id); } catch(e) {}

    // After 1.8s, show "SYSTEM INITIALIZING..." flash, then fade out
    setTimeout(() => {
      setShowInit(true);
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setLoad(false), 700);
      }, 1200);
    }, 1800);
  };

  if (!load) return null;

  return (
    <>
      <style>{preloaderStyles}</style>

      {/* Particle field */}
      <div
        className="portal-overlay"
        style={{ opacity: isFading ? 0 : 1, pointerEvents: isFading ? "none" : "auto" }}
      >
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="portal-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `portalDrift${p.id % 4} ${p.dur}s ${p.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}

        {/* Keyframes for drift — 4 variation patterns */}
        <style>{`
          ${PARTICLES.map(p => `
            @keyframes portalDrift${p.id % 4} {
              from { transform: translate(0, 0); opacity: ${0.3 + (p.id % 5) * 0.14}; }
              to   { transform: translate(${p.dx}px, ${p.dy}px); opacity: ${0.1 + (p.id % 4) * 0.18}; }
            }
          `).slice(0,4).join('')}
        `}</style>

        {/* Card */}
        <div
          className="portal-card"
          style={{ transform: (selected && showInit) ? "scale(0.97)" : "scale(1)" }}
        >
          <p className="portal-eyebrow">Visitor Diagnostic Portal</p>
          <h1 className="portal-title">Identity Verification</h1>
          <div className="portal-divider" />

          <p className="portal-question">
            Declare your commercial intentions before entering Siddhant's space.
          </p>

          <div className="portal-options">
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`portal-btn ${opt.cls} ${selected && selected !== opt.id ? "selected" : ""}`}
                onClick={() => handleSelection(opt)}
              >
                <span className="portal-btn-emoji">{opt.label}</span>
                {opt.text}
                <span className="portal-btn-arrow">→</span>
              </button>
            ))}
          </div>

          {feedback && !showInit && (
            <p className="portal-feedback" key={selected}>{feedback}</p>
          )}

          {showInit && (
            <p className="portal-init">System Initializing...</p>
          )}

          <p className="portal-footer">Siddhant Garg · Growth Strategist Portfolio</p>
        </div>
      </div>
    </>
  );
}

export default Pre;
