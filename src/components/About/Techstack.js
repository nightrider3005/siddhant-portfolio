import React, { useEffect } from "react";

import HTML from "../../Assets/TechIcons/HTML.svg";
import CSS from "../../Assets/TechIcons/CSS.svg";
import Javascript from "../../Assets/TechIcons/Javascript.svg";
import Python from "../../Assets/TechIcons/Python.svg";
import ReactIcon from "../../Assets/TechIcons/React.svg";
import NodeJs from "../../Assets/TechIcons/Node.svg";
import Mongo from "../../Assets/TechIcons/Mongo.svg";
import Firebase from "../../Assets/TechIcons/Firebase.svg";
import Shopify from "../../Assets/TechIcons/Shopify.svg";
import Supabase from "../../Assets/TechIcons/Supabase.svg";

const techStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

  .sg-tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 12px;
    width: 100%;
    margin-top: 10px;
  }

  .sg-icon-card {
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

  .sg-icon-card:hover {
    background: rgba(160,50,210,0.12);
    border-color: rgba(0,243,255,0.5);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(160,50,210,0.25);
  }

  .sg-icon-img {
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
  .sg-icon-card:hover .sg-icon-img {
    transform: scale(1.1);
  }

  .sg-icon-label {
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
  .sg-icon-card:hover .sg-icon-label {
    color: #c084fc;
  }
`;

const techs = [
  { src: HTML, label: "HTML5" },
  { src: CSS, label: "CSS3" },
  { src: Javascript, label: "JavaScript" },
  { src: ReactIcon, label: "React" },
  { src: NodeJs, label: "Node.js" },
  { src: Mongo, label: "MongoDB" },
  { src: Firebase, label: "Firebase" },
  { src: Python, label: "Python" },
  { src: Shopify, label: "Shopify" },
  { src: Supabase, label: "Supabase" },
];

function Techstack() {
  useEffect(() => {
    if (!document.getElementById("sg-tech-styles")) {
      const tag = document.createElement("style");
      tag.id = "sg-tech-styles";
      tag.innerHTML = techStyles;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div className="sg-tech-grid">
      {techs.map((t, i) => (
        <div key={i} className="sg-icon-card">
          <img src={t.src} alt={t.label} className="sg-icon-img" />
          <span className="sg-icon-label">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
