import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import macOs from "../../Assets/TechIcons/Apple MacOSX.svg";
import chrome from "../../Assets/TechIcons/Google Chrome.svg";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import canva from "../../Assets/TechIcons/Canva.svg";
import chatgpt from "../../Assets/TechIcons/chatgpt.svg";
import photoshop from "../../Assets/TechIcons/Photoshop.svg";

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

  .sg-tool-card:nth-child(1){animation-delay:0.05s}
  .sg-tool-card:nth-child(2){animation-delay:0.12s}
  .sg-tool-card:nth-child(3){animation-delay:0.19s}
  .sg-tool-card:nth-child(4){animation-delay:0.26s}
  .sg-tool-card:nth-child(5){animation-delay:0.33s}
  .sg-tool-card:nth-child(6){animation-delay:0.40s}

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
  { src: canva, label: "Canva" },
  { src: photoshop, label: "Photoshop" },
  { src: chatgpt, label: "ChatGPT" },
  { src: chrome, label: "Chrome" },
  { src: vsCode, label: "VS Code" },
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
