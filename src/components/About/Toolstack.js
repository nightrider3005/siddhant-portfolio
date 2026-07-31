import React, { useEffect } from "react";

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

  .sg-tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 12px;
    width: 100%;
    margin-top: 10px;
  }

  .sg-tool-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 8px;
    border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(160,50,210,0.2);
    cursor: default;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }

  .sg-tool-card:hover {
    background: rgba(160,50,210,0.12);
    border-color: rgba(0,243,255,0.5);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(160,50,210,0.25);
  }

  .sg-tool-img {
    width: 40px !important;
    height: 40px !important;
    max-width: 40px !important;
    max-height: 40px !important;
    min-width: 40px !important;
    min-height: 40px !important;
    object-fit: contain !important;
    display: block !important;
    transition: transform 0.3s ease;
  }
  .sg-tool-card:hover .sg-tool-img {
    transform: scale(1.1);
  }

  .sg-tool-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.2px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .sg-tool-card:hover .sg-tool-label {
    color: #00f3ff;
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
  }, []);

  return (
    <div className="sg-tool-grid">
      {tools.map((t, i) => (
        <div key={i} className="sg-tool-card">
          <img src={t.src} alt={t.label} className="sg-tool-img" />
          <span className="sg-tool-label">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Toolstack;
