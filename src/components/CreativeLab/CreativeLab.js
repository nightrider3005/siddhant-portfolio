import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import CreativeCard from "./CreativeCard";
import creativeProjects from "./CreativeData";

const labStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  /* ═══════════════════════════════════
     SECTION BACKDROP
  ═══════════════════════════════════ */
  .creative-section {
    position: relative;
    padding: 120px 0 100px !important;
    overflow: hidden;
    background: #05050c;
    min-height: 100vh;
  }

  /* Animated grid */
  .creative-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 243, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 243, 255, 0.02) 1px, transparent 1px);
    background-size: 64px 64px;
    animation: clGridDrift 28s linear infinite;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
  }
  @keyframes clGridDrift {
    0%{background-position:0 0} 100%{background-position:64px 64px}
  }

  /* Ambient Blur Orbs */
  .cl-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(100px);
    z-index: 0;
  }
  .cl-orb-1 {
    width: 600px; height: 600px;
    top: -180px; left: -180px;
    background: radial-gradient(circle, rgba(0, 243, 255, 0.07) 0%, transparent 70%);
    animation: clOrb1 20s ease-in-out infinite;
  }
  .cl-orb-2 {
    width: 500px; height: 500px;
    bottom: -120px; right: -120px;
    background: radial-gradient(circle, rgba(255, 0, 127, 0.06) 0%, transparent 70%);
    animation: clOrb2 25s ease-in-out infinite;
  }
  .cl-orb-3 {
    width: 280px; height: 280px;
    top: 40%; left: 50%;
    background: radial-gradient(circle, rgba(0, 243, 255, 0.03) 0%, transparent 70%);
    animation: clOrb3 12s ease-in-out infinite;
  }
  @keyframes clOrb1 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,40px)}
  }
  @keyframes clOrb2 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-50px)}
  }
  @keyframes clOrb3 {
    0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.3)}
  }

  /* Centered Max Width Content Container */
  .cl-content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }
  @media (max-width: 767px) {
    .cl-content-container {
      padding: 0 16px;
    }
  }

  /* ═══════════════════════════════════
     HEADER SPLIT-TEXT REVEAL
  ═══════════════════════════════════ */
  .cl-heading-block {
    text-align: center;
    margin-bottom: 32px;
  }

  .cl-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(0, 243, 255, 0.5);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .cl-eyebrow::before, .cl-eyebrow::after {
    content: '';
    display: block;
    height: 1px;
    width: 32px;
    background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.3));
  }
  .cl-eyebrow::after {
    background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
  }

  .creative-heading-reveal {
    font-family: 'Syne', sans-serif !important;
    font-size: 3em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -1px;
    margin-bottom: 8px !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 1.15;
  }
  
  .cl-word-wrapper {
    overflow: hidden;
    display: inline-block;
  }
  
  .cl-word {
    display: inline-block;
    transform: translateY(100%);
    animation: clRevealWord 0.8s cubic-bezier(0.25, 1, 0.3, 1) forwards;
  }
  
  @keyframes clRevealWord {
    to { transform: translateY(0); }
  }

  .creative-subtitle-reveal {
    font-family: 'Syne', sans-serif !important;
    font-size: 1.25em !important;
    font-weight: 700 !important;
    color: #00f3ff !important;
    text-align: center;
    margin-bottom: 14px !important;
    opacity: 0;
    animation: clFadeIn 0.8s ease 0.35s forwards;
    letter-spacing: -0.2px;
  }

  .creative-description-reveal {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.95em !important;
    color: rgba(255,255,255,0.48) !important;
    text-align: center;
    margin-bottom: 0 !important;
    max-width: 680px;
    margin-left: auto !important;
    margin-right: auto !important;
    line-height: 1.7 !important;
    opacity: 0;
    animation: clFadeIn 0.8s ease 0.45s forwards;
  }

  @keyframes clFadeIn {
    to { opacity: 1; }
  }

  /* ─── ANIMATED DIVIDER ─── */
  .cl-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
    animation: clFadeIn 0.8s ease 0.25s both;
  }
  
  .cld-line {
    height: 1px; width: 60px;
    background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.5));
    position: relative; overflow: hidden;
  }
  
  .cld-line:last-child {
    background: linear-gradient(90deg, rgba(0, 243, 255, 0.5), transparent);
  }
  
  .cld-line::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: cldScan 3.5s ease-in-out infinite;
  }
  
  .cld-line:last-child::after{animation-delay:1.75s}
  
  @keyframes cldScan{0%{left:-100%}100%{left:200%}}
  
  .cld-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #00f3ff;
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.9);
    position: relative;
  }

  /* ─── PROJECT SWITCHER TABS ─── */
  .cl-project-switcher {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin: 36px 0 28px;
    animation: clFadeIn 0.8s ease 0.5s both;
  }
  
  .cl-switcher-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(0, 243, 255, 0.12);
    padding: 10px 24px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.25, 1, 0.3, 1);
    outline: none;
  }
  
  .cl-switcher-btn:hover {
    color: rgba(255,255,255,0.85);
    border-color: rgba(0, 243, 255, 0.32);
    background: rgba(0, 243, 255, 0.03);
  }
  
  .cl-switcher-btn.active {
    color: #fff;
    background: rgba(0, 243, 255, 0.12);
    border-color: rgba(0, 243, 255, 0.55);
    box-shadow:
      0 0 24px rgba(0, 243, 255, 0.18),
      inset 0 0 10px rgba(0, 243, 255, 0.08);
  }

  /* ─── MARQUEE TICKER ─── */
  .cl-marquee-wrap {
    overflow: hidden;
    margin: 20px 0 40px;
    mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
    animation: clFadeIn 0.8s ease 0.5s both;
  }
  
  .cl-marquee-track {
    display: flex;
    width: max-content;
    animation: clMarquee 24s linear infinite;
  }
  
  .cl-marquee-item {
    font-family: 'Outfit', monospace;
    font-size: 0.6em;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(0, 243, 255, 0.38);
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  
  .cl-marquee-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(0, 243, 255, 0.4);
    flex-shrink: 0;
  }
  
  @keyframes clMarquee {
    0%{transform:translateX(0)} 100%{transform:translateX(-50%)}
  }

  /* ─── FILTER TABS (MOBILE HORIZONTAL SCROLL) ─── */
  .cl-filter-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 32px;
    animation: clFadeIn 0.8s ease 0.55s both;
  }
  
  .cl-filter-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.01);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 6px 18px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    outline: none;
  }
  
  .cl-filter-btn:hover {
    color: rgba(255,255,255,0.85);
    border-color: rgba(0, 243, 255, 0.22);
    background: rgba(0, 243, 255, 0.03);
  }
  
  .cl-filter-btn.active {
    color: #fff;
    background: rgba(0, 243, 255, 0.08);
    border-color: rgba(0, 243, 255, 0.4);
    box-shadow: 0 0 16px rgba(0, 243, 255, 0.1);
  }

  @media (max-width: 767px) {
    .cl-filter-row {
      justify-content: flex-start;
      overflow-x: auto;
      white-space: nowrap;
      flex-wrap: nowrap;
      padding: 4px 16px 12px;
      margin-left: -16px;
      margin-right: -16px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .cl-filter-row::-webkit-scrollbar {
      display: none;
    }
    .cl-filter-btn {
      flex: 0 0 auto;
    }
  }

  /* ─── COUNT BADGE ─── */
  .cl-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(0, 243, 255, 0.5);
    background: rgba(0, 243, 255, 0.04);
    border: 1px solid rgba(0, 243, 255, 0.15);
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 40px;
    cursor: default;
    animation: clFadeIn 0.8s ease 0.58s both;
  }
  
  .cl-count-badge span {
    color: #00f3ff;
    font-size: 1.1em;
  }

  /* ─── PORTFOLIO GRID ─── */
  .creative-grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 0;
    margin-bottom: 56px;
    align-items: stretch;
  }

  @media (max-width: 991px) {
    .creative-grid-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }
  }

  @media (max-width: 767px) {
    .creative-grid-container {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .creative-grid-col {
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1),
      transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* Spotlight card spans full width */
  .creative-grid-col.spotlight {
    grid-column: 1 / -1;
  }

  .creative-grid-col.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ─── FOOTER STAR ─── */
  .cl-footer-note {
    font-family: 'Outfit', sans-serif;
    text-align: center;
    color: rgba(255,255,255,0.22);
    font-size: 0.8em;
    margin-top: 56px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    animation: clFadeIn 0.8s ease 0.7s both;
  }
  
  .cl-footer-star {
    color: #00f3ff;
    display: inline-block;
    animation: clStarSpin 5s linear infinite;
  }
  
  @keyframes clStarSpin {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }
`;

const MARQUEE_ITEMS = [
  "Visual Campaigns",
  "Brand Psychology",
  "D2C Marketing",
  "Social Creative",
  "Brand Strategy",
  "Digital Narratives",
  "Behavioral Design",
  "Event Design",
  "Visual Campaigns",
  "Brand Psychology",
  "D2C Marketing",
  "Social Creative",
  "Brand Strategy",
  "Digital Narratives",
];

function CreativeLab() {
  const [activeProject, setActiveProject] = useState("periodically");
  const [activeTag, setActiveTag] = useState("All");
  const gridRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("creative-lab-v5-styles")) {
      const tag = document.createElement("style");
      tag.id = "creative-lab-v5-styles";
      tag.innerHTML = labStyles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("creative-lab-v5-styles")?.remove();
  }, []);

  const projectData = creativeProjects[activeProject];
  const creatives = projectData.creatives;

  // Dynamically calculate tag filters from active project's creatives
  const FILTERS = ["All", ...new Set(creatives.flatMap((c) => c.tags || []))];

  // Filter creatives based on tag selection
  const displayed = creatives.filter((c) => {
    if (activeTag === "All") return true;
    return c.tags && c.tags.includes(activeTag);
  });

  // Staggered scroll animations using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".creative-grid-col");
            items.forEach((item, index) => {
              item.style.transitionDelay = `${index * 60}ms`;
              item.classList.add("visible");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02 }
    );

    const gridEl = gridRef.current;
    if (gridEl) {
      // Remove classes first to permit clean staggered transitions on switcher/filter trigger
      const items = gridEl.querySelectorAll(".creative-grid-col");
      items.forEach((item) => {
        item.classList.remove("visible");
        item.style.transitionDelay = "0ms";
      });
      
      // Short delay to reset DOM transition trigger
      const animTimeout = setTimeout(() => {
        observer.observe(gridEl);
      }, 50);
      
      return () => {
        clearTimeout(animTimeout);
        if (gridEl) {
          observer.unobserve(gridEl);
        }
      };
    }
  }, [activeProject, activeTag, displayed.length]);

  return (
    <Container fluid className="creative-section">
      {/* Ambient Orbs */}
      <div className="cl-orb cl-orb-1" />
      <div className="cl-orb cl-orb-2" />
      <div className="cl-orb cl-orb-3" />

      {/* Center Aligned Max Width Container */}
      <div className="cl-content-container">
        {/* ── HEADING BLOCK ── */}
        <div className="cl-heading-block">
          <p className="cl-eyebrow">Creative Visual Lab</p>
          
          {/* Split text reveal based on project header */}
          <h1 className="creative-heading-reveal" key={`heading-${activeProject}`}>
            {projectData.title.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="cl-word-wrapper">
                <span className="cl-word" style={{ animationDelay: `${wIdx * 0.08}s` }}>
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </h1>
          
          <h2 className="creative-subtitle-reveal" key={`subtitle-${activeProject}`}>
            {projectData.tagline}
          </h2>
          
          <p className="creative-description-reveal" key={`desc-${activeProject}`}>
            {projectData.description}
          </p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="cl-divider">
          <div className="cld-line" />
          <div className="cld-dot" />
          <div className="cld-line" />
        </div>

        {/* ── PROJECT SWITCHER TABS ── */}
        <div className="cl-project-switcher">
          <button
            className={`cl-switcher-btn ${activeProject === "periodically" ? "active" : ""}`}
            onClick={() => {
              setActiveProject("periodically");
              setActiveTag("All");
            }}
          >
            Periodically Campaign
          </button>
          <button
            className={`cl-switcher-btn ${activeProject === "concepts" ? "active" : ""}`}
            onClick={() => {
              setActiveProject("concepts");
              setActiveTag("All");
            }}
          >
            Speculative Concepts
          </button>
        </div>

        {/* ── INFINITE MARQUEE ── */}
        <div className="cl-marquee-wrap">
          <div className="cl-marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <span className="cl-marquee-item" key={i}>
                <span className="cl-marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── FILTER TAGS ── */}
        <div className="cl-filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`cl-filter-btn ${activeTag === f ? "active" : ""}`}
              onClick={() => setActiveTag(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── COUNT BADGE ── */}
        <div style={{ textAlign: "center" }}>
          <span className="cl-count-badge">
            <span>{displayed.length}</span> Creatives
          </span>
        </div>

        {/* ── CSS GRID DYNAMIC SPOTLIGHT PORTFOLIO ── */}
        <div ref={gridRef} className="creative-grid-container">
          {displayed.map((creative, index) => {
            // First card (index 0) and every 7th card (index 6, 13, 20 etc. - which is index % 7 === 0)
            const isSpotlight = index === 0 || index % 7 === 0;
            return (
              <div
                key={`${activeProject}-${creative.title}-${index}`}
                className={`creative-grid-col ${isSpotlight ? "spotlight" : ""}`}
              >
                <CreativeCard
                  title={creative.title}
                  cardDesc={creative.cardDesc}
                  modalDesc={creative.modalDesc}
                  images={creative.images}
                  tags={creative.tags}
                  index={index}
                  wide={isSpotlight}
                />
              </div>
            );
          })}
        </div>

        {/* ── FOOTER STAR ── */}
        <p className="cl-footer-note">
          <span className="cl-footer-star">✦</span>
          Click any card to explore the campaign frame details
          <span className="cl-footer-star">✦</span>
        </p>
      </div>
    </Container>
  );
}

export default CreativeLab;
