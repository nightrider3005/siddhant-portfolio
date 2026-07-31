import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import avatarImg from "../../Assets/avatar.png";

const styles = `
  .hw-root {
    padding: 36px 44px 48px;
    background: transparent;
    position: relative;
    min-height: 100%;
  }

  .hw-grid {
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 40px;
    align-items: center;
    width: 100%;
  }

  .hw-left-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  /* Greeting */
  .hw-im {
    font-family: 'Outfit','Inter',sans-serif;
    font-size: clamp(0.8em, 1.8vw, 0.9em);
    font-weight: 600;
    color: rgba(255,255,255,0.48);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 4px;
    animation: hwUp 0.6s ease 0.1s both;
  }
  .hw-name {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: clamp(2.4em, 4.5vw, 3.5em);
    font-weight: 800;
    line-height: 1.05;
    margin: 0 0 4px;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #ffffff 0%, #c084fc 55%, #00f3ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: hwUp 0.6s ease 0.2s both;
  }
  .hw-type {
    font-family: 'Outfit','Inter',sans-serif;
    font-size: clamp(1.05em, 2.2vw, 1.28em);
    font-weight: 600;
    color: #00f3ff;
    min-height: 56px;
    line-height: 1.4;
    margin: 10px 0 20px;
    display: block;
    animation: hwUp 0.6s ease 0.35s both;
  }

  /* Bio */
  .hw-bio {
    font-family: 'Outfit','Inter',sans-serif;
    font-size: clamp(0.88em, 1.8vw, 0.96em);
    color: rgba(255,255,255,0.68);
    line-height: 1.7;
    max-width: 520px;
    margin: 0 0 28px;
    animation: hwUp 0.6s ease 0.45s both;
  }

  /* Stats row */
  .hw-stats {
    display: flex;
    gap: 26px;
    flex-wrap: wrap;
    margin: 0 0 32px;
    animation: hwUp 0.6s ease 0.55s both;
  }
  .hw-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .hw-stat-num {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: 1.55em;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
  }
  .hw-stat-num span { color: #c084fc; }
  .hw-stat-lbl {
    font-family: 'Outfit',sans-serif;
    font-size: 0.68em;
    color: rgba(255,255,255,0.42);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* CTA row */
  .hw-cta-row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    animation: hwUp 0.6s ease 0.65s both;
  }
  .hw-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 26px;
    background: linear-gradient(135deg, #9333ea, #7c3aed);
    color: #fff;
    border-radius: 12px;
    font-family: 'Outfit',sans-serif;
    font-size: 0.88em;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(147,51,234,0.4);
  }
  .hw-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(147,51,234,0.55);
    color: #fff;
    text-decoration: none;
  }

  .hw-soc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    border-radius: 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    color: rgba(255,255,255,0.8);
    font-size: 1.15em;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s;
    cursor: pointer;
  }
  .hw-soc-icon:hover {
    background: rgba(0,243,255,0.18);
    border-color: rgba(0,243,255,0.5);
    color: #00f3ff;
    transform: translateY(-3px);
    text-decoration: none;
  }

  /* ════════════════════════════
     HIGH-TECH ROTATING CYBER AVATAR (NO PILLS)
  ════════════════════════════ */
  .hw-right-col {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: hwUp 0.6s ease 0.3s both;
  }

  .hw-avatar-frame {
    position: relative;
    width: 270px;
    height: 270px;
    border-radius: 50%;
    padding: 6px;
    background: linear-gradient(135deg, rgba(0, 243, 255, 0.6), rgba(147, 51, 234, 0.6), rgba(255, 0, 127, 0.6));
    box-shadow:
      0 0 45px rgba(0, 243, 255, 0.25),
      0 0 60px rgba(147, 51, 234, 0.2),
      0 20px 50px rgba(0, 0, 0, 0.8);
    animation: floatFrame 5s ease-in-out infinite;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .hw-avatar-frame:hover {
    transform: scale(1.04) rotate(2deg);
    box-shadow:
      0 0 60px rgba(0, 243, 255, 0.45),
      0 0 80px rgba(147, 51, 234, 0.35),
      0 30px 60px rgba(0, 0, 0, 0.9);
  }

  @keyframes floatFrame {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }

  .hw-avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, rgba(4, 1, 15, 0.95) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hw-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(1.06) contrast(1.04);
    transition: transform 0.5s ease;
  }
  .hw-avatar-frame:hover .hw-avatar-img {
    transform: scale(1.08);
  }

  /* Divider */
  .hw-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(147,51,234,0.4), transparent);
    margin: 32px 0 20px 0;
    animation: hwUp 0.6s ease 0.75s both;
  }

  /* Bottom tagline */
  .hw-tagline {
    font-family: 'Outfit', sans-serif;
    font-size: 0.9em;
    color: rgba(255,255,255,0.4);
    animation: hwUp 0.6s ease 0.85s both;
  }

  @keyframes hwUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  @media (max-width: 859px) {
    .hw-root { padding: 20px 16px 28px; }
    .hw-grid { grid-template-columns: 1fr; gap: 24px; }
    .hw-right-col { order: -1; margin-bottom: 4px; }
    .hw-avatar-frame { width: 200px; height: 200px; padding: 4px; }
    .hw-name { font-size: 2.1em; }
    .hw-type { font-size: 1.1em; min-height: 56px; line-height: 1.35; margin: 8px 0 18px; }
    .hw-bio  { font-size: 0.85em; margin-bottom: 20px; line-height: 1.6; }
    .hw-stats { gap: 14px 20px; margin-bottom: 22px; }
    .hw-stat-num { font-size: 1.35em; }
    .hw-cta-row { width: 100%; gap: 10px; }
    .hw-cta-primary { flex: 1; justify-content: center; padding: 11px 18px; font-size: 0.84em; }
    .hw-divider { margin: 20px 0 16px 0; }
    .hw-tagline { font-size: 0.8em; line-height: 1.5; }
  }
`;

let injected = false;

function HomeWindow() {
  useEffect(() => {
    if (injected) return;
    if (!document.getElementById("hw-styles")) {
      const el = document.createElement("style");
      el.id = "hw-styles";
      el.textContent = styles;
      document.head.appendChild(el);
      injected = true;
    }
  }, []);

  return (
    <div className="hw-root">
      <div className="hw-grid">
        {/* Left Column: Bio & Text */}
        <div className="hw-left-col">
          <p className="hw-im">HI THERE, I'M</p>
          <h1 className="hw-name">Siddhant Garg</h1>

          <div className="hw-type">
            <Typewriter
              options={{
                strings: [
                  "Growth Strategist.",
                  "AI-Orchestration Architect.",
                  "Product Builder.",
                  "Campaign Engineer.",
                  "The Guy Who Ships.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 40,
                delay: 60,
              }}
            />
          </div>

          <p className="hw-bio">
            I engineer measurable growth at the intersection of AI, brand strategy, and
            consumer psychology - building campaigns, products, and systems that
            move numbers.
          </p>

          {/* Stats */}
          <div className="hw-stats">
            <div className="hw-stat">
              <span className="hw-stat-num">40<span>+</span></span>
              <span className="hw-stat-lbl">Inbound Leads</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">200<span>%</span></span>
              <span className="hw-stat-lbl">Growth Driven</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">12<span>+</span></span>
              <span className="hw-stat-lbl">Projects Shipped</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">3<span>+</span></span>
              <span className="hw-stat-lbl">Years Building</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hw-cta-row">
            <a
              href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="hw-cta-primary"
            >
              Connect on LinkedIn →
            </a>
            <a
              href="mailto:siddhantgarg563@gmail.com"
              className="hw-soc-icon"
              title="Email Siddhant"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="hw-soc-icon"
              title="LinkedIn Profile"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Column: Circular Floating Cyber Avatar (Original avatar.png) */}
        <div className="hw-right-col">
          <div className="hw-avatar-frame">
            <div className="hw-avatar-inner">
              <img
                src={avatarImg}
                alt="Siddhant Garg Avatar"
                className="hw-avatar-img"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hw-divider" />

      <p className="hw-tagline">
        Gwalior, India • VIT Bhopal • Open to Opportunities
      </p>
    </div>
  );
}

export default HomeWindow;
