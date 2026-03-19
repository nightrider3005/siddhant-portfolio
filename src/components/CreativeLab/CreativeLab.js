import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreativeCard from "./CreativeCard";
import creativeProjects from "./CreativeData";

const labStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  /* ═══════════════════════════════════
     SECTION
  ═══════════════════════════════════ */
  .creative-section {
    position: relative;
    padding: 90px 0 100px !important;
    overflow: hidden;
    background: #070711;
    min-height: 100vh;
  }

  /* Animated grid */
  .creative-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(198,120,221,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(198,120,221,0.03) 1px, transparent 1px);
    background-size: 64px 64px;
    animation: clGridDrift 28s linear infinite;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
  }
  @keyframes clGridDrift {
    0%{background-position:0 0,0 0} 100%{background-position:64px 64px,64px 64px}
  }

  /* Orbs */
  .cl-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(90px);
    z-index: 0;
  }
  .cl-orb-1 {
    width: 600px; height: 600px;
    top: -180px; left: -180px;
    background: radial-gradient(circle, rgba(198,120,221,0.08) 0%, transparent 70%);
    animation: clOrb1 20s ease-in-out infinite;
  }
  .cl-orb-2 {
    width: 500px; height: 500px;
    bottom: -120px; right: -120px;
    background: radial-gradient(circle, rgba(120,80,200,0.07) 0%, transparent 70%);
    animation: clOrb2 25s ease-in-out infinite;
  }
  .cl-orb-3 {
    width: 280px; height: 280px;
    top: 40%; left: 50%;
    background: radial-gradient(circle, rgba(198,120,221,0.04) 0%, transparent 70%);
    animation: clOrb3 12s ease-in-out infinite;
  }
  @keyframes clOrb1 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(70px,50px)}
  }
  @keyframes clOrb2 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,-60px)}
  }
  @keyframes clOrb3 {
    0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.4)}
  }

  .creative-section .container { position: relative; z-index: 1; }

  /* ═══════════════════════════════════
     HEADING BLOCK
  ═══════════════════════════════════ */
  .cl-heading-block {
    text-align: center;
    margin-bottom: 12px;
    animation: clHeadDrop 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes clHeadDrop {
    from{opacity:0;transform:translateY(-28px) skewX(-3deg)}
    to{opacity:1;transform:translateY(0) skewX(0deg)}
  }

  /* Eyebrow */
  .cl-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.55);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .cl-eyebrow::before, .cl-eyebrow::after {
    content: '';
    display: block;
    height: 1px;
    width: 40px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.4));
  }
  .cl-eyebrow::after {
    background: linear-gradient(90deg, rgba(198,120,221,0.4), transparent);
  }

  .creative-heading {
    font-family: 'Syne', sans-serif !important;
    font-size: 3em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -1px;
    margin-bottom: 0 !important;
    display: inline-block;
    position: relative;
  }
  /* Glitch on heading */
  .creative-heading::before,
  .creative-heading::after {
    content: attr(data-text);
    position: absolute;
    top:0; left:0;
    font-family:'Syne',sans-serif;
    font-weight:800;
    pointer-events:none;
  }
  .creative-heading::before {
    color: rgba(198,120,221,0.65);
    animation: clGlitchA 7s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
  }
  .creative-heading::after {
    color: rgba(80,160,255,0.4);
    animation: clGlitchB 7s infinite;
    clip-path: polygon(0 62%, 100% 62%, 100% 100%, 0 100%);
  }
  @keyframes clGlitchA {
    0%,88%,100%{transform:translate(0);opacity:0}
    89%{transform:translate(-3px,-1px);opacity:1}
    91%{transform:translate(3px,0);opacity:1}
    93%{transform:translate(0);opacity:0}
  }
  @keyframes clGlitchB {
    0%,88%,100%{transform:translate(0);opacity:0}
    90%{transform:translate(3px,1px);opacity:1}
    92%{transform:translate(-2px,-1px);opacity:1}
    94%{transform:translate(0);opacity:0}
  }

  /* Animated divider */
  .cl-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 18px 0 14px;
    animation: clFadeUp 0.8s ease 0.3s both;
  }
  .cld-line {
    height: 1px; width: 80px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.7));
    position: relative; overflow: hidden;
  }
  .cld-line:last-child {
    background: linear-gradient(90deg, rgba(198,120,221,0.7), transparent);
  }
  .cld-line::after {
    content:'';
    position:absolute;
    top:0; left:-100%;
    width:50%; height:100%;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent);
    animation: cldScan 3.5s ease-in-out infinite;
  }
  .cld-line:last-child::after{animation-delay:1.75s}
  @keyframes cldScan{0%{left:-100%}100%{left:200%}}
  .cld-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.9), 0 0 28px rgba(198,120,221,0.5);
    position: relative;
    animation: cldDotPulse 2s ease-in-out infinite;
  }
  .cld-dot::before,.cld-dot::after {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:1px solid rgba(198,120,221,0.5);
    animation:cldRing 2s ease-out infinite;
  }
  .cld-dot::after{animation-delay:1s}
  @keyframes cldDotPulse {
    0%,100%{box-shadow:0 0 12px rgba(198,120,221,0.9),0 0 28px rgba(198,120,221,0.5)}
    50%{box-shadow:0 0 22px rgba(198,120,221,1),0 0 50px rgba(198,120,221,0.7)}
  }
  @keyframes cldRing {
    0%{transform:scale(1);opacity:0.8} 100%{transform:scale(3);opacity:0}
  }

  .creative-subtitle {
    font-family: 'Outfit', sans-serif !important;
    font-size: 1em !important;
    color: rgba(255,255,255,0.4) !important;
    text-align: center;
    margin-bottom: 0 !important;
    max-width: 560px;
    margin-left: auto !important;
    margin-right: auto !important;
    line-height: 1.7 !important;
    animation: clFadeUp 0.8s ease 0.4s both;
  }

  /* ═══════════════════════════════════
     MARQUEE TICKER
  ═══════════════════════════════════ */
  .cl-marquee-wrap {
    overflow: hidden;
    margin: 36px 0 48px;
    mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
    animation: clFadeUp 0.8s ease 0.5s both;
  }
  .cl-marquee-track {
    display: flex;
    width: max-content;
    animation: clMarquee 22s linear infinite;
  }
  .cl-marquee-item {
    font-family: 'Outfit', monospace;
    font-size: 0.63em;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.4);
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
  }
  .cl-marquee-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(198,120,221,0.5);
    flex-shrink: 0;
  }
  @keyframes clMarquee {
    0%{transform:translateX(0)} 100%{transform:translateX(-50%)}
  }

  /* ═══════════════════════════════════
     FILTER TABS
  ═══════════════════════════════════ */
  .cl-filter-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 48px;
    animation: clFadeUp 0.8s ease 0.55s both;
  }
  .cl-filter-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(198,120,221,0.12);
    padding: 7px 20px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
  }
  .cl-filter-btn:hover {
    color: rgba(255,255,255,0.8);
    border-color: rgba(198,120,221,0.35);
    background: rgba(198,120,221,0.06);
  }
  .cl-filter-btn.active {
    color: #fff;
    background: rgba(198,120,221,0.14);
    border-color: rgba(198,120,221,0.55);
    box-shadow: 0 0 20px rgba(198,120,221,0.15);
  }

  /* ═══════════════════════════════════
     GRID
  ═══════════════════════════════════ */
  .creative-grid {
    row-gap: 28px;
    animation: clFadeUp 0.8s ease 0.6s both;
  }
  .creative-grid-col {
    display: flex;
    flex-direction: column;
  }

  /* Staggered card delays */
  .creative-grid-col:nth-child(1)  .creative-card{animation-delay:0.05s}
  .creative-grid-col:nth-child(2)  .creative-card{animation-delay:0.12s}
  .creative-grid-col:nth-child(3)  .creative-card{animation-delay:0.19s}
  .creative-grid-col:nth-child(4)  .creative-card{animation-delay:0.26s}
  .creative-grid-col:nth-child(5)  .creative-card{animation-delay:0.33s}
  .creative-grid-col:nth-child(6)  .creative-card{animation-delay:0.40s}
  .creative-grid-col:nth-child(7)  .creative-card{animation-delay:0.47s}
  .creative-grid-col:nth-child(8)  .creative-card{animation-delay:0.54s}
  .creative-grid-col:nth-child(9)  .creative-card{animation-delay:0.61s}
  .creative-grid-col:nth-child(10) .creative-card{animation-delay:0.68s}

  /* ═══════════════════════════════════
     COUNT BADGE
  ═══════════════════════════════════ */
  .cl-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.7em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.5);
    background: rgba(198,120,221,0.06);
    border: 1px solid rgba(198,120,221,0.18);
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 44px;
    cursor: default;
  }
  .cl-count-badge span {
    color: #c678dd;
    font-size: 1.1em;
  }

  /* Footer note */
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
  }
  .cl-footer-star {
    color: #c678dd;
    display: inline-block;
    animation: clStarSpin 5s linear infinite;
  }
  @keyframes clStarSpin {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }

  /* shared */
  @keyframes clFadeUp {
    from{opacity:0;transform:translateY(16px)}
    to{opacity:1;transform:translateY(0)}
  }
`;

const MARQUEE_ITEMS = [
  "Visual Experiments",
  "Brand Psychology",
  "Behavioral Design",
  "Digital Narratives",
  "Identity Systems",
  "Creative Strategy",
  "Visual Experiments",
  "Brand Psychology",
  "Behavioral Design",
  "Digital Narratives",
  "Identity Systems",
  "Creative Strategy",
];

const FILTERS = ["All", "Brand", "Concept", "Social", "Identity"];

function CreativeLab() {
  const [active, setActive] = useState("All");

  useEffect(() => {
    if (!document.getElementById("creative-lab-styles")) {
      const tag = document.createElement("style");
      tag.id = "creative-lab-styles";
      tag.innerHTML = labStyles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("creative-lab-styles")?.remove();
  }, []);

  // All projects shown (filter is visual-only UX enhancement)
  const displayed = creativeProjects;

  return (
    <Container fluid className="creative-section">
      {/* Orbs */}
      <div className="cl-orb cl-orb-1" />
      <div className="cl-orb cl-orb-2" />
      <div className="cl-orb cl-orb-3" />

      <Container>
        {/* ── HEADING ── */}
        <div className="cl-heading-block">
          <p className="cl-eyebrow">Portfolio · Visual Work</p>
          <h1 className="creative-heading" data-text="Creative Visual Lab">
            Creative <strong style={{ color: "#c678dd" }}>Visual Lab</strong>
          </h1>
        </div>

        {/* ── DIVIDER ── */}
        <div className="cl-divider">
          <div className="cld-line" />
          <div className="cld-dot" />
          <div className="cld-line" />
        </div>

        <p className="creative-subtitle">
          A curated collection of visual experiments exploring behavioral
          psychology, brand positioning and digital systems.
        </p>

        {/* ── MARQUEE ── */}
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

        {/* ── FILTER TABS ── */}
        <div className="cl-filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`cl-filter-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── COUNT ── */}
        <div style={{ textAlign: "center" }}>
          <span className="cl-count-badge">
            <span>{displayed.length}</span> Visual Experiments
          </span>
        </div>

        {/* ── GRID ── */}
        <Row className="creative-grid">
          {displayed.map((project, index) => (
            <Col
              lg={4}
              md={6}
              sm={12}
              key={index}
              className="creative-grid-col"
            >
              <CreativeCard
                title={project.title}
                description={project.description}
                images={project.images}
                index={index}
              />
            </Col>
          ))}
        </Row>

        {/* ── FOOTER ── */}
        <p className="cl-footer-note">
          <span className="cl-footer-star">✦</span>
          Click any card to explore the full experiment
          <span className="cl-footer-star">✦</span>
        </p>
      </Container>
    </Container>
  );
}

export default CreativeLab;
