import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const styles = `
  .hw-root {
    padding: 40px 48px 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: transparent;
    position: relative;
    min-height: 100%;
  }

  /* Name */
  .hw-im {
    font-family: 'Outfit','Inter',sans-serif;
    font-size: clamp(0.85em,2vw,0.95em);
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 4px;
    animation: hwUp 0.6s ease 0.1s both;
  }
  .hw-name {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: clamp(2.4em,5vw,3.4em);
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
    font-size: clamp(1.05em,2.4vw,1.3em);
    font-weight: 600;
    color: #00f3ff;
    min-height: 56px;
    line-height: 1.4;
    margin: 12px 0 24px;
    display: block;
    animation: hwUp 0.6s ease 0.35s both;
  }

  /* Bio */
  .hw-bio {
    font-family: 'Outfit','Inter',sans-serif;
    font-size: clamp(0.88em,2vw,0.98em);
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
    max-width: 520px;
    margin: 0 0 30px;
    animation: hwUp 0.6s ease 0.45s both;
  }

  /* Stats row */
  .hw-stats {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    margin: 0 0 36px;
    animation: hwUp 0.6s ease 0.55s both;
  }
  .hw-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .hw-stat-num {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: 1.6em;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
  }
  .hw-stat-num span { color: #c084fc; }
  .hw-stat-lbl {
    font-family: 'Outfit',sans-serif;
    font-size: 0.7em;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* CTA row */
  .hw-cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    animation: hwUp 0.6s ease 0.65s both;
  }
  .hw-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
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
    border: 1px solid rgba(255,255,255,0.13);
    color: rgba(255,255,255,0.7);
    font-size: 1.15em;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s;
    cursor: pointer;
  }
  .hw-soc-icon:hover {
    background: rgba(147,51,234,0.2);
    border-color: rgba(147,51,234,0.5);
    color: #c084fc;
    transform: translateY(-3px);
    text-decoration: none;
  }

  /* Divider */
  .hw-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(147,51,234,0.4), transparent);
    margin: 32px 0;
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

  @media (max-width: 600px) {
    .hw-root { padding: 22px 18px 28px; }
    .hw-name { font-size: 2em; }
    .hw-type { font-size: 1.1em; min-height: 64px; line-height: 1.35; margin: 8px 0 22px; }
    .hw-bio  { font-size: 0.85em; margin-bottom: 20px; line-height: 1.6; }
    .hw-stats { gap: 16px 24px; margin-bottom: 24px; }
    .hw-stat-num { font-size: 1.35em; }
    .hw-cta-row { width: 100%; gap: 10px; }
    .hw-cta-primary { width: 100%; justify-content: center; padding: 11px 20px; }
    .hw-divider { margin: 20px 0; }
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
          href="https://www.linkedin.com/in/siddhantgarg3005/"
          target="_blank"
          rel="noopener noreferrer"
          className="hw-cta-primary"
        >
          Connect on LinkedIn →
        </a>
        <a
          href="mailto:sidd.garg3005@gmail.com"
          className="hw-soc-icon"
          title="Email"
        >
          ✉
        </a>
        <a
          href="https://www.linkedin.com/in/siddhantgarg3005/"
          target="_blank"
          rel="noopener noreferrer"
          className="hw-soc-icon"
          title="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://www.instagram.com/siddhantgarg.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hw-soc-icon"
          title="Instagram"
        >
          <AiFillInstagram />
        </a>
      </div>

      <div className="hw-divider" />

      <p className="hw-tagline">
        Gwalior, India • VIT Bhopal • Open to Opportunities
      </p>
    </div>
  );
}

export default HomeWindow;
