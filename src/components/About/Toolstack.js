import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import macOs from "../../Assets/TechIcons/Apple MacOSX.svg";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import chrome from "../../Assets/TechIcons/Google Chrome.svg";
import canva from "../../Assets/TechIcons/Canva.svg";
import photoshop from "../../Assets/TechIcons/Photoshop.svg";
import chatgpt from "../../Assets/TechIcons/chatgpt.svg";
import gemini from "../../Assets/TechIcons/gemini.svg";
import claude from "../../Assets/TechIcons/claude.svg";
import claudeCode from "../../Assets/TechIcons/ClaudeCode.svg";
import render from "../../Assets/TechIcons/Render.svg";
import railway from "../../Assets/TechIcons/Railway.png";
import hoppscotch from "../../Assets/TechIcons/Hoppscotch.svg";
import kling from "../../Assets/TechIcons/kling.svg";
import postman from "../../Assets/TechIcons/Postman.svg";

const toolStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

  .sg-tool-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px 14px;
    border-radius: 16px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(198,120,221,0.14);
    cursor: default;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    overflow: hidden;
    animation: toolCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  .sg-tool-card:nth-child(1) {animation-delay:0.05s}
  .sg-tool-card:nth-child(2) {animation-delay:0.10s}
  .sg-tool-card:nth-child(3) {animation-delay:0.15s}
  .sg-tool-card:nth-child(4) {animation-delay:0.20s}
  .sg-tool-card:nth-child(5) {animation-delay:0.25s}
  .sg-tool-card:nth-child(6) {animation-delay:0.30s}
  .sg-tool-card:nth-child(7) {animation-delay:0.35s}
  .sg-tool-card:nth-child(8) {animation-delay:0.40s}
  .sg-tool-card:nth-child(9) {animation-delay:0.45s}
  .sg-tool-card:nth-child(10){animation-delay:0.50s}
  .sg-tool-card:nth-child(11){animation-delay:0.55s}
  .sg-tool-card:nth-child(12){animation-delay:0.60s}
  .sg-tool-card:nth-child(13){animation-delay:0.65s}
  .sg-tool-card:nth-child(14){animation-delay:0.70s}

  @keyframes toolCardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .sg-tool-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.07), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }
  .sg-tool-card:hover::after { left: 160%; }

  .sg-tool-card::before {
    content: '';
    position: absolute;
    top: 0; left: 20%; right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.7), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .sg-tool-card:hover::before { opacity: 1; }

  .sg-tool-card:hover {
    background: rgba(198,120,221,0.08);
    border-color: rgba(198,120,221,0.42);
    transform: translateY(-7px) scale(1.04);
    box-shadow:
      0 14px 40px rgba(198,120,221,0.14),
      0 4px 12px rgba(0,0,0,0.3);
  }

  .sg-tool-img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease;
    filter: drop-shadow(0 0 0px rgba(198,120,221,0));
  }
  .sg-tool-card:hover .sg-tool-img {
    transform: scale(1.18) rotate(-4deg);
    filter: drop-shadow(0 0 8px rgba(198,120,221,0.5));
  }

  .sg-tool-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    font-weight: 600;
    color: rgba(255,255,255,0.65);
    letter-spacing: 0.3px;
    transition: color 0.3s ease;
    text-align: center;
  }
  .sg-tool-card:hover .sg-tool-label {
    color: #c678dd;
  }
`;

const tools = [
  { src: macOs, label: "Mac OS" },
  { src: vsCode, label: "VS Code" },
  { src: chrome, label: "Chrome" },
  { src: canva, label: "Canva" },
  { src: photoshop, label: "Photoshop" },
  { src: postman, label: "Postman" },
  { src: chatgpt, label: "ChatGPT" },
  { src: gemini, label: "Gemini" },
  { src: claude, label: "Claude" },
  { src: claudeCode, label: "Claude Code" },
  { src: render, label: "Render" },
  { src: railway, label: "Railway" },
  { src: hoppscotch, label: "Hoppscotch" },
  { src: kling, label: "Kling AI" },
];

function Toolstack() {
  useEffect(() => {
    if (!document.getElementById("sg-tool-styles")) {
      const tag = document.createElement("style");
      tag.id = "sg-tool-styles";
      tag.innerHTML = toolStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("sg-tool-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "50px",
        gap: "14px",
        margin: "0 10px",
      }}
    >
      {tools.map((t, i) => (
        <Col key={i} xs={4} md={1} style={{ padding: "0" }}>
          <div className="sg-tool-card">
            <img src={t.src} alt={t.label} className="sg-tool-img" />
            <div className="sg-tool-label">{t.label}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
