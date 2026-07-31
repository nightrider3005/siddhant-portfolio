import React from "react";
import AboutCard from "../About/AboutCard";
import Techstack from "../About/Techstack";
import Toolstack from "../About/Toolstack";

const styles = `
  .aw-root {
    padding: 36px 44px 48px;
    background: transparent;
  }
  .aw-section-title {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: 1.05em;
    font-weight: 700;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0 0 22px;
  }
  .aw-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(147,51,234,0.35), transparent);
    margin: 32px 0;
  }
  .aw-stack-label {
    font-family: 'Outfit',sans-serif;
    font-size: 0.8em;
    color: rgba(255,255,255,0.45);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 24px 0 14px;
  }
  @media (max-width: 600px) {
    .aw-root { padding: 24px 16px 36px; }
  }
`;

let injected = false;
function inject() {
  if (injected || document.getElementById("aw-styles")) return;
  const el = document.createElement("style");
  el.id = "aw-styles";
  el.textContent = styles;
  document.head.appendChild(el);
  injected = true;
}

function AboutWindow() {
  inject();
  return (
    <div className="aw-root">
      <p className="aw-section-title">{"// profile.json"}</p>

      <AboutCard />

      <div className="aw-divider" />

      <p className="aw-stack-label">Tech Stack</p>
      <Techstack />

      <p className="aw-stack-label" style={{ marginTop: 28 }}>Tools & Workflow</p>
      <Toolstack />
    </div>
  );
}

export default AboutWindow;
