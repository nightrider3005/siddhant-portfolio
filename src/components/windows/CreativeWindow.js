import React, { useState } from "react";
import CreativeCard from "../CreativeLab/CreativeCard";
import creativeProjects from "../CreativeLab/CreativeData";

const styles = `
  .cw-root {
    padding: 32px 36px 48px;
    background: transparent;
  }
  .cw-header {
    margin-bottom: 16px;
  }
  .cw-title {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: clamp(1.7em, 3vw, 2.4em);
    font-weight: 800;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: -0.5px;
  }
  .cw-title span {
    background: linear-gradient(135deg, #00f3ff 0%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .cw-subtitle {
    font-family: 'Outfit',sans-serif;
    font-size: 0.9em;
    color: rgba(255,255,255,0.6);
    margin: 0 0 22px;
    max-width: 650px;
    line-height: 1.6;
  }

  /* Category tabs */
  .cw-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .cw-tab-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85em;
    font-weight: 700;
    padding: 9px 22px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cw-tab-btn:hover {
    background: rgba(0, 243, 255, 0.15);
    border-color: rgba(0, 243, 255, 0.45);
    color: #fff;
    transform: translateY(-2px);
  }
  .cw-tab-btn.active {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(0, 243, 255, 0.25));
    border-color: #00f3ff;
    color: #fff;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
  }

  .cw-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0,243,255,0.4), rgba(160,50,210,0.4), transparent);
    margin: 0 0 28px;
  }
  .cw-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  @media (max-width:600px) {
    .cw-root { padding: 20px 14px 36px; }
    .cw-tab-btn { font-size: 0.78em; padding: 8px 16px; width: 100%; text-align: center; }
    .cw-grid { grid-template-columns: 1fr; }
  }
`;

let injected = false;
function inject() {
  if (injected || document.getElementById("cw-styles")) return;
  const el = document.createElement("style");
  el.id = "cw-styles";
  el.textContent = styles;
  document.head.appendChild(el);
  injected = true;
}

function CreativeWindow() {
  inject();
  const [activeTab, setActiveTab] = useState("periodically");

  const category = creativeProjects[activeTab] || creativeProjects.periodically;
  const items = category.creatives || [];

  return (
    <div className="cw-root">
      <div className="cw-header">
        <h2 className="cw-title">Creative <span>Visual Lab</span></h2>
        <p className="cw-subtitle">{category.description}</p>
      </div>

      {/* Tabs */}
      <div className="cw-tabs">
        <button
          className={`cw-tab-btn ${activeTab === "periodically" ? "active" : ""}`}
          onClick={() => setActiveTab("periodically")}
        >
          ✦ Periodically Campaign Suite ({creativeProjects.periodically?.creatives?.length || 0})
        </button>
        <button
          className={`cw-tab-btn ${activeTab === "concepts" ? "active" : ""}`}
          onClick={() => setActiveTab("concepts")}
        >
          ✦ Speculative Concept Lab ({creativeProjects.concepts?.creatives?.length || 0})
        </button>
      </div>

      <div className="cw-divider" />

      <div className="cw-grid">
        {items.map((proj, i) => (
          <CreativeCard
            key={i}
            index={i}
            title={proj.title}
            cardDesc={proj.cardDesc}
            modalDesc={proj.modalDesc}
            images={proj.images}
            tags={proj.tags}
            wide={false}
          />
        ))}
      </div>
    </div>
  );
}

export default CreativeWindow;
