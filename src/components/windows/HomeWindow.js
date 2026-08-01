import React, { useEffect, useState } from "react";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import avatarImg from "../../Assets/avatar.png";

/* ── Roles that cycle in the tag strip ───────────────── */
const ROLES = [
  { label: "Growth Strategist", color: "#c084fc" },
  { label: "AI-Orchestration Architect", color: "#00f3ff" },
  { label: "Product Builder", color: "#f0abfc" },
  { label: "Campaign Engineer", color: "#818cf8" },
  { label: "The Guy Who Ships", color: "#34d399" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  /* ── Root ─────────────────────────────────────────── */
  .hw-root {
    padding: 0;
    background: transparent;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* ── Two-panel layout ─────────────────────────────── */
  .hw-shell {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0;
    width: 100%;
    min-height: 100%;
    position: relative;
  }

  /* ── Left panel ─────────────────────────────────── */
  .hw-left {
    padding: 38px 40px 38px 44px;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    z-index: 2;
  }

  /* ── Right panel - floating avatar ──────────────── */
  .hw-right {
    width: 260px;
    padding: 32px 28px 32px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
  }

  /* ══════════════════════════════════════════════════
     GREETING LINE
  ══════════════════════════════════════════════════ */
  .hw-greeting {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin: 0 0 8px 0;
    animation: hwFade 0.5s ease 0.1s both;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hw-greeting::before {
    content: '';
    display: inline-block;
    width: 22px;
    height: 2px;
    background: linear-gradient(90deg, #9333ea, #00f3ff);
    border-radius: 2px;
  }

  /* ══════════════════════════════════════════════════
     NAME
  ══════════════════════════════════════════════════ */
  .hw-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6em, 5vw, 3.6em);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -2px;
    margin: 0 0 18px 0;
    background: linear-gradient(135deg, #ffffff 0%, #e4d4fd 40%, #c084fc 70%, #00f3ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: hwFade 0.5s ease 0.2s both;
  }

  /* ══════════════════════════════════════════════════
     ROLE TAG CAROUSEL (no typewriter, no overlap)
  ══════════════════════════════════════════════════ */
  .hw-role-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 22px 0;
    animation: hwFade 0.5s ease 0.3s both;
    min-height: 38px;
  }
  .hw-role-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: background 0.4s ease;
    box-shadow: 0 0 10px currentColor;
  }
  .hw-role-text {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1em, 2.2vw, 1.25em);
    font-weight: 700;
    transition: all 0.4s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* ══════════════════════════════════════════════════
     BIO
  ══════════════════════════════════════════════════ */
  .hw-bio {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(0.84em, 1.8vw, 0.94em);
    color: rgba(255,255,255,0.62);
    line-height: 1.75;
    margin: 0 0 28px 0;
    max-width: 460px;
    animation: hwFade 0.5s ease 0.4s both;
    border-left: 2px solid rgba(147, 51, 234, 0.5);
    padding-left: 14px;
  }
  .hw-bio strong {
    color: #c084fc;
    font-weight: 700;
  }

  /* ══════════════════════════════════════════════════
     STATS GRID
  ══════════════════════════════════════════════════ */
  .hw-stats {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 0;
    width: fit-content;
    margin: 0 0 28px 0;
    animation: hwFade 0.5s ease 0.5s both;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    overflow: hidden;
    background: rgba(255,255,255,0.02);
  }
  .hw-stat {
    padding: 14px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    border-right: 1px solid rgba(255,255,255,0.06);
    transition: background 0.3s ease;
  }
  .hw-stat:last-child { border-right: none; }
  .hw-stat:hover { background: rgba(147,51,234,0.08); }
  .hw-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.5em;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, #c084fc, #00f3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hw-stat-lbl {
    font-family: 'Outfit', sans-serif;
    font-size: 0.56em;
    font-weight: 700;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 1.2px;
    text-align: center;
    white-space: nowrap;
  }

  /* ══════════════════════════════════════════════════
     CTA BUTTONS
  ══════════════════════════════════════════════════ */
  .hw-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    animation: hwFade 0.5s ease 0.6s both;
    margin: 0 0 28px 0;
  }
  .hw-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #7c3aed, #9333ea);
    color: #fff;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.88em;
    font-weight: 700;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 18px rgba(124,58,237,0.45);
    white-space: nowrap;
  }
  .hw-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(124,58,237,0.6);
    color: #fff;
    text-decoration: none;
  }
  .hw-btn-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.75);
    font-size: 1.1em;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .hw-btn-icon:hover {
    background: rgba(0,243,255,0.15);
    border-color: rgba(0,243,255,0.45);
    color: #00f3ff;
    transform: translateY(-3px);
    text-decoration: none;
  }

  /* ══════════════════════════════════════════════════
     TAGLINE
  ══════════════════════════════════════════════════ */
  .hw-tagline {
    font-family: 'Outfit', sans-serif;
    font-size: 0.76em;
    color: rgba(255,255,255,0.32);
    letter-spacing: 0.5px;
    animation: hwFade 0.5s ease 0.7s both;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .hw-tagline::before {
    content: '●';
    color: #28c840;
    font-size: 0.7em;
    animation: tagPulse 2.5s ease infinite;
  }
  @keyframes tagPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }

  /* ══════════════════════════════════════════════════
     FLOATING CYBER AVATAR
  ══════════════════════════════════════════════════ */
  .hw-avatar-wrap {
    position: relative;
    width: 220px;
    height: 220px;
    margin-top: 12px;
  }

  /* Spinning ring */
  .hw-avatar-ring {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(0, 243, 255, 0.0) 0%,
      rgba(0, 243, 255, 0.8) 25%,
      rgba(147, 51, 234, 0.8) 50%,
      rgba(255, 0, 127, 0.6) 75%,
      rgba(0, 243, 255, 0.0) 100%
    );
    animation: ringSpinSlow 6s linear infinite;
    border-radius: 50%;
    padding: 2px;
  }
  .hw-avatar-ring::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: #080214;
  }
  @keyframes ringSpinSlow {
    to { transform: rotate(360deg); }
  }

  /* Outer glow */
  .hw-avatar-glow {
    position: absolute;
    inset: -30px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(147,51,234,0.22) 0%, transparent 70%);
    animation: glowPulse 4s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%,100% { opacity: 0.6; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.1); }
  }

  /* Float keyframes */
  @keyframes floatBob {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }

  .hw-avatar-circle {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: radial-gradient(circle at 50% 40%, rgba(147,51,234,0.3) 0%, rgba(4,1,14,0.95) 100%);
    border: 2px solid rgba(0,243,255,0.2);
    z-index: 2;
    animation: floatBob 5s ease-in-out infinite;
  }
  .hw-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: brightness(1.05) contrast(1.04);
  }

  /* ══════════════════════════════════════════════════
     ROLE INDEX INDICATOR (dots row)
  ══════════════════════════════════════════════════ */
  .hw-role-dots {
    display: flex;
    gap: 5px;
    margin: 0 0 22px 0;
    animation: hwFade 0.5s ease 0.3s both;
  }
  .hw-role-pip {
    width: 20px;
    height: 3px;
    border-radius: 3px;
    background: rgba(255,255,255,0.15);
    transition: all 0.35s ease;
  }
  .hw-role-pip.active {
    width: 28px;
    background: #c084fc;
    box-shadow: 0 0 8px rgba(192, 132, 252, 0.7);
  }

  /* ══════════════════════════════════════════════════
     ANIMATIONS
  ══════════════════════════════════════════════════ */
  @keyframes hwFade {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ══════════════════════════════════════════════════
     MOBILE RESPONSIVE
  ══════════════════════════════════════════════════ */
  @media (max-width: 860px) {
    .hw-shell {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
    .hw-right {
      width: 100%;
      padding: 28px 20px 0;
      justify-content: center;
      order: -1;
    }
    .hw-avatar-wrap {
      width: 160px;
      height: 160px;
      margin-top: 0;
    }
    .hw-left {
      padding: 24px 20px 32px;
    }
    .hw-name {
      font-size: 2.3em;
      letter-spacing: -1.5px;
      margin: 0 0 14px 0;
    }
    .hw-role-tag {
      margin: 0 0 16px 0;
      min-height: 32px;
    }
    .hw-role-text {
      font-size: 1em;
      white-space: normal;
    }
    .hw-bio {
      font-size: 0.84em;
      margin: 0 0 22px 0;
    }
    .hw-stats {
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
    }
    .hw-stat {
      padding: 12px 16px;
    }
    .hw-actions {
      width: 100%;
      margin: 0 0 22px 0;
    }
    .hw-btn-primary {
      flex: 1;
      justify-content: center;
    }
  }

  @media (max-width: 400px) {
    .hw-name { font-size: 2em; }
    .hw-left { padding: 20px 16px 28px; }
    .hw-stat-lbl { font-size: 0.5em; }
    .hw-stat-num { font-size: 1.3em; }
  }
`;

let injected = false;
function injectOnce() {
  if (injected) return;
  const el = document.createElement("style");
  el.id = "hw-v2-styles";
  el.textContent = styles;
  document.head.appendChild(el);
  injected = true;
}

function HomeWindow() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    injectOnce();
  }, []);

  /* Role carousel — cross-fade every 2.8s */
  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx(prev => (prev + 1) % ROLES.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  const role = ROLES[roleIdx];

  return (
    <div className="hw-root">
      <div className="hw-shell">

        {/* ── LEFT COLUMN ─────────────────────────────── */}
        <div className="hw-left">

          {/* Greeting */}
          <p className="hw-greeting">Hi there, I'm</p>

          {/* Name */}
          <h1 className="hw-name">Siddhant Garg</h1>

          {/* Role tag — fixed height, no overflow */}
          <div className="hw-role-tag">
            <span
              className="hw-role-dot"
              style={{
                background: role.color,
                color: role.color,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            />
            <span
              className="hw-role-text"
              style={{
                color: role.color,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {role.label}
            </span>
          </div>

          {/* Role progress pips */}
          <div className="hw-role-dots">
            {ROLES.map((_, i) => (
              <span
                key={i}
                className={`hw-role-pip${i === roleIdx ? " active" : ""}`}
                style={i === roleIdx ? { background: ROLES[i].color, boxShadow: `0 0 8px ${ROLES[i].color}` } : {}}
              />
            ))}
          </div>

          {/* Bio */}
          <p className="hw-bio">
            I engineer <strong>measurable growth</strong> at the intersection of{" "}
            <strong>AI, brand strategy</strong>, and consumer psychology — building
            campaigns, products, and systems that actually move numbers.
          </p>

          {/* Stats grid */}
          <div className="hw-stats">
            <div className="hw-stat">
              <span className="hw-stat-num">40+</span>
              <span className="hw-stat-lbl">Inbound Leads</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">200%</span>
              <span className="hw-stat-lbl">Growth Driven</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">12+</span>
              <span className="hw-stat-lbl">Projects Shipped</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">3+</span>
              <span className="hw-stat-lbl">Years Building</span>
            </div>
          </div>

          {/* Actions */}
          <div className="hw-actions">
            <a
              href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="hw-btn-primary"
            >
              Connect on LinkedIn →
            </a>
            <a href="mailto:siddhantgarg563@gmail.com" className="hw-btn-icon" title="Email">
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="hw-btn-icon"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* Tagline */}
          <p className="hw-tagline">
            Gwalior, India &nbsp;•&nbsp; VIT Bhopal &nbsp;•&nbsp; Open to Opportunities
          </p>
        </div>

        {/* ── RIGHT COLUMN — Avatar ────────────────────── */}
        <div className="hw-right">
          <div className="hw-avatar-wrap">
            <div className="hw-avatar-glow" />
            <div className="hw-avatar-ring" />
            <div className="hw-avatar-circle">
              <img
                src={avatarImg}
                alt="Siddhant Garg"
                className="hw-avatar-img"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomeWindow;
