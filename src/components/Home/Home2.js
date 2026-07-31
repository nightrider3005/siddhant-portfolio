import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import portraitImg from "../../Assets/profile/siddhant-doodle-portrait.png";
import tapeImg from "../../Assets/stickers/collage-tape.png";

const styles = `
  /* ════════════════════════════
     SECTION
  ════════════════════════════ */
  .home-about-section {
    position: relative;
    padding: 90px 0 80px !important;
    background: #050010;
    overflow: hidden;
  }
  .home-about-section::before {
    content:'';
    position:absolute;
    top:0; left:10%; right:10%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(147,51,234,0.45) 50%,transparent);
  }

  /* Orbs */
  .ha-orb {
    position:absolute; border-radius:50%;
    pointer-events:none; filter:blur(90px); z-index:0;
    will-change: transform;
  }
  .ha-orb-1 {
    width:420px; height:420px;
    left:-120px; top:50%; transform:translateY(-50%);
    background:radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%);
    animation:haO1 18s ease-in-out infinite;
  }
  .ha-orb-2 {
    width:320px; height:320px;
    right:-80px; bottom:0;
    background:radial-gradient(circle, rgba(0,243,255,0.06) 0%, transparent 70%);
    animation:haO2 22s ease-in-out infinite;
  }
  @keyframes haO1{0%,100%{transform:translateY(-50%)}50%{transform:translateY(-58%)}}
  @keyframes haO2{0%,100%{transform:translate(0,0)}50%{transform:translate(-28px,-35px)}}

  .home-about-section .container { position:relative; z-index:1; }

  /* ════════════════════════════
     HEADING — two-line split
  ════════════════════════════ */
  .intro-heading-block { margin-bottom: 24px; }

  .intro-heading-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8em;
    font-weight: 400;
    color: rgba(255,255,255,0.4);
    letter-spacing: 6px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 6px;
    animation: haHeadIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
  }

  .intro-title {
    font-family: 'Syne', sans-serif !important;
    font-weight: 800 !important;
    font-size: clamp(1.7em, 3.2vw, 2.5em) !important;
    letter-spacing: -0.6px;
    background: linear-gradient(135deg, #c084fc, #e879f9, #00f3ff) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    margin: 0 0 0 0 !important;
    line-height: 1.1 !important;
    animation: haHeadIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
  }
  @keyframes haHeadIn { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }

  /* Accent bar */
  .intro-accent {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 14px 0 28px;
  }
  .ia-line1 {
    height:2px; width:0;
    background:linear-gradient(90deg,#9333ea,rgba(0,243,255,0.15));
    border-radius:2px;
    animation:iaLine1 0.9s ease 0.4s forwards;
    box-shadow:0 0 8px rgba(147,51,234,0.4);
  }
  .ia-line2 {
    height:2px; width:0;
    background:linear-gradient(90deg,rgba(147,51,234,0.15),transparent);
    border-radius:2px;
    animation:iaLine2 0.9s ease 0.5s forwards;
  }
  .ia-dot {
    width:7px; height:7px; border-radius:50%; flex-shrink:0;
    background:#9333ea;
    box-shadow:0 0 9px rgba(147,51,234,0.8);
    animation:iaDot 2s ease-in-out infinite; position:relative;
  }
  .ia-dot::before {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:1px solid rgba(147,51,234,0.4);
    animation:iaRing 2s ease-out infinite;
  }
  @keyframes iaLine1{to{width:52px}}
  @keyframes iaLine2{to{width:22px}}
  @keyframes iaDot{0%,100%{box-shadow:0 0 9px rgba(147,51,234,0.8)}50%{box-shadow:0 0 16px rgba(147,51,234,1)}}
  @keyframes iaRing{0%{transform:scale(1);opacity:0.7}100%{transform:scale(2.5);opacity:0}}

  /* ════════════════════════════
     TERMINAL CARDS
  ════════════════════════════ */
  .cards-timeline {
    position: relative;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .cards-timeline::before {
    content:'';
    position:absolute;
    left:0; top:18px; bottom:18px; width:1px;
    background:linear-gradient(180deg,transparent,rgba(147,51,234,0.35) 20%,rgba(147,51,234,0.2) 80%,transparent);
  }

  .intro-card {
    position: relative;
    background: rgba(13, 0, 30, 0.6);
    border: 1px solid rgba(147,51,234,0.12);
    border-left: 2px solid rgba(147,51,234,0.45);
    border-radius: 14px;
    padding: 14px 16px 14px 18px;
    display: flex;
    align-items: center;
    gap: 13px;
    overflow: hidden;
    backdrop-filter: blur(4px);
    cursor: default;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s, box-shadow 0.3s;
    opacity: 0;
    will-change: transform, opacity;
  }
  .intro-card.card-visible {
    animation: cardSlideIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .intro-card:nth-child(1){ animation-delay:0s }
  .intro-card:nth-child(2){ animation-delay:0.1s }
  .intro-card:nth-child(3){ animation-delay:0.2s }
  .intro-card:nth-child(4){ animation-delay:0.3s }
  .intro-card:nth-child(5){ animation-delay:0.4s }
  @keyframes cardSlideIn { from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }

  /* Hover scan line */
  .intro-card::after {
    content:''; position:absolute;
    top:-100%; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(147,51,234,0.5),transparent);
    transition:top 0.5s ease; pointer-events:none;
  }
  .intro-card:hover::after { top:100%; }

  .intro-card:hover {
    background: rgba(147,51,234,0.05);
    border-left-color: rgba(147,51,234,0.8);
    transform: translateX(4px);
    box-shadow: 0 0 16px rgba(147,51,234,0.1), 0 6px 20px rgba(0,0,0,0.3);
  }

  /* Timeline dot */
  .intro-card::before {
    content:'';
    position:absolute;
    left:-22px; top:50%; transform:translateY(-50%);
    width:7px; height:7px; border-radius:50%;
    background:rgba(147,51,234,0.25);
    border:1px solid rgba(147,51,234,0.5);
    transition:all 0.3s ease;
  }
  .intro-card:hover::before { background:#9333ea; box-shadow:0 0 9px rgba(147,51,234,0.7); }

  /* Terminal symbol */
  .card-symbol {
    font-family: 'Outfit', monospace;
    font-size: 1em;
    font-weight: 800;
    flex-shrink: 0;
    width: 26px;
    text-align: center;
  }
  .sym-purple { color: #9333ea; }
  .sym-cyan   { color: #00f3ff; }
  .sym-pink   { color: #ff007f; }

  /* Icon */
  .card-icon {
    width:38px; height:38px; flex-shrink:0;
    border-radius:10px;
    background:rgba(147,51,234,0.07);
    border:1px solid rgba(147,51,234,0.18);
    display:flex; align-items:center; justify-content:center;
    font-size:1.05em;
    transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .intro-card:hover .card-icon {
    background:rgba(147,51,234,0.14);
    border-color:rgba(147,51,234,0.45);
    box-shadow:0 0 12px rgba(147,51,234,0.2);
    transform:scale(1.1) rotate(-7deg);
  }

  /* Text */
  .card-body-text {
    margin:0 !important;
    font-family:'Outfit',sans-serif !important;
    font-size:0.87em !important;
    line-height:1.68 !important;
    font-weight:400 !important;
    color:rgba(255,255,255,0.58) !important;
    transition:color 0.3s;
  }
  .intro-card:hover .card-body-text { color:rgba(255,255,255,0.86) !important; }

  .chip {
    display:inline-block;
    font-family:'Outfit',sans-serif;
    font-size:0.64em; font-weight:700;
    letter-spacing:0.7px;
    padding:1px 8px; border-radius:20px;
    margin-left:5px; vertical-align:middle;
    background:rgba(147,51,234,0.08);
    border:1px solid rgba(147,51,234,0.22);
    color:#c084fc; text-transform:uppercase;
    transition:all 0.3s;
  }
  .intro-card:hover .chip {
    background:rgba(147,51,234,0.16);
    border-color:rgba(147,51,234,0.45);
  }

  /* ════════════════════════════
     AVATAR — Sticker Portrait
  ════════════════════════════ */
  .myAvtar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10px;
  }

  .avatar-outer {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Sticker-style portrait: rotated, drop-shadow, no circular crop */
  .avatar-photo {
    border-radius: 12px;
    border: none !important;
    box-shadow: none;
    position: relative; z-index: 2;
    display: block !important;
    max-width: 260px; width: 100%;
    transform: rotate(-4deg);
    filter: drop-shadow(0 12px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(147,51,234,0.15));
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s;
    animation: portraitReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }
  .avatar-outer:hover .avatar-photo {
    transform: rotate(-1deg) translateY(-6px);
    filter: drop-shadow(0 18px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 30px rgba(147,51,234,0.25));
  }
  @keyframes portraitReveal { from{opacity:0;transform:rotate(-8deg) scale(0.9)} to{opacity:1;transform:rotate(-4deg) scale(1)} }

  /* Tape strip pinned across portrait top corner */
  .avatar-tape {
    position: absolute;
    top: -14px;
    left: 10px;
    width: 96px;
    height: 34px;
    object-fit: contain;
    transform: rotate(-5deg);
    filter: drop-shadow(0 3px 8px rgba(0,0,0,.3));
    pointer-events: none;
    z-index: 5;
    opacity: 0;
    animation: stickerPopIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.7s both;
    --sticker-rot: -5deg;
  }

  /* AI Architect annotation badge */
  .ai-badge {
    position: absolute;
    top: -18px;
    right: -20px;
    background: rgba(147, 51, 234, 0.12);
    border: 1px solid rgba(147, 51, 234, 0.3);
    border-radius: 6px;
    padding: 4px 10px;
    color: #c084fc;
    font-size: 1em;
    white-space: nowrap;
    transform: rotate(4deg);
    pointer-events: none;
    z-index: 4;
    opacity: 0;
    animation: stickerPopIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.8s both;
    --sticker-rot: 4deg;
    backdrop-filter: blur(4px);
  }

  /* Nametag */
  .av-nametag { margin-top:20px; text-align:center; }
  .av-name {
    font-family:'Syne',sans-serif; font-weight:800;
    font-size:0.95em;
    background: linear-gradient(135deg, #c084fc, #e879f9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display:block; letter-spacing:0.3px;
  }
  .av-role {
    font-family:'Outfit',sans-serif; font-size:0.66em; font-weight:700;
    letter-spacing:1.8px; text-transform:uppercase;
    color:rgba(0,243,255,0.55); display:block; margin-top:4px;
  }

  /* ─── Info badges ─── */
  .av-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 14px;
  }
  .av-badge {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62em;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    background: rgba(147,51,234,0.06);
    border: 1px solid rgba(147,51,234,0.22);
    border-radius: 20px;
    padding: 4px 10px;
    white-space: nowrap;
    transition: border-color 0.3s, background 0.3s;
  }
  .av-badge:hover {
    border-color: rgba(147,51,234,0.5);
    background: rgba(147,51,234,0.1);
    color: #c084fc;
  }

  /* ════════════════════════════
     MOBILE ≤ 767px
  ════════════════════════════ */
  @media (max-width: 767px) {
    .home-about-section { padding: 70px 0 55px !important; }
    .ha-text-col  { order: 2 !important; }
    .ha-avatar-col{ order: 1 !important; padding-bottom: 36px; padding-top: 0; }
    .avatar-photo { max-width: 200px; }
    .avatar-tape  { width: 72px; top: -10px; left: 6px; }
    .ai-badge     { display: none; }
    .cards-timeline { padding-left: 13px; gap: 9px; }
    .intro-card { padding: 12px 13px 12px 14px; gap: 10px; }
    .intro-card::before { left:-18px; }
    .card-body-text { font-size: 0.84em !important; }
  }
`;

/* ─── Card data ─── */
const CARDS = [
  {
    sym: ">", symClass: "sym-purple", icon: "🎓",
    content: <>B.Tech Computer Science graduate from VIT with a deep passion for growth, strategy, and the psychology behind decisions that drive real results.</>
  },
  {
    sym: "$", symClass: "sym-cyan", icon: "📈",
    content: <>I work with <span style={{color:"#ff007f"}}>brands</span><span className="chip">Marketing</span> to build sharper strategies, improve positioning, and directly increase sales through psychology driven execution.</>
  },
  {
    sym: "~", symClass: "sym-pink", icon: "🎥",
    content: <>I work with <span style={{color:"#00f3ff"}}>creators &amp; influencers</span><span className="chip">Collabs</span> to help them land consistent brand deals and turn their audience into a reliable source of income.</>
  },
  {
    sym: "*", symClass: "sym-purple", icon: "🤖",
    content: <>I help individuals and teams apply <span style={{color:"#ff007f"}}>Artificial Intelligence</span><span className="chip">AI</span> in real world ways, helping them save time, work smarter, and stay ahead.</>
  },
  {
    sym: "✦", symClass: "sym-cyan", icon: "⚡",
    content: <>Growth is not accidental. It is engineered through <span style={{color:"#9333ea"}}>clarity</span>, psychology, and disciplined execution.</>
  },
];

function Home2() {
  const containerRef = useRef(null);

  // Inject styles
  useEffect(() => {
    if (!document.getElementById("home2-v7-styles")) {
      const tag = document.createElement("style");
      tag.id = "home2-v7-styles";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("home2-v7-styles")?.remove();
  }, []);

  // Staggered IntersectionObserver reveal for cards
  useEffect(() => {
    const cards = document.querySelectorAll(".intro-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <div className="ha-orb ha-orb-1" />
      <div className="ha-orb ha-orb-2" />

      <Container>
        <Row className="align-items-center">
          {/* AVATAR */}
          <Col md={4} className="myAvtar ha-avatar-col">
            <div className="avatar-outer">
              {/* Tape strip pinned to portrait corner */}
              <img
                src={tapeImg}
                alt=""
                className="avatar-tape"
                aria-hidden="true"
              />
              <img
                src={portraitImg}
                className="img-fluid avatar-photo"
                alt="Siddhant Garg"
                loading="lazy"
              />
            </div>
            <div className="av-nametag">
              <span className="av-name">Siddhant Garg</span>
              <span className="av-role">Growth Strategist</span>
            </div>
            {/* Info badges */}
            <div className="av-badges">
              <span className="av-badge">🎓 VIT Bhopal</span>
              <span className="av-badge">📍 India</span>
              <span className="av-badge">⚡ Open to Work</span>
            </div>
          </Col>

          {/* TEXT */}
          <Col md={8} className="home-about-description ha-text-col">
            <div className="intro-heading-block">
              <span className="intro-heading-sub">The Person</span>
              <h1 className="intro-title">Behind The Work.</h1>
            </div>

            <div className="intro-accent">
              <div className="ia-line1" />
              <div className="ia-dot" />
              <div className="ia-line2" />
            </div>

            <div className="cards-timeline" ref={containerRef}>
              {CARDS.map((card, i) => (
              <div className="intro-card" key={i} style={{ position: "relative" }}>
                <span className={`card-symbol ${card.symClass}`}>{card.sym}</span>
                <div className="card-icon">{card.icon}</div>
                <p className="card-body-text">{card.content}</p>
                {/* AI Architect badge on the AI row */}
                {i === 3 && (
                  <span className="ai-badge hand-marker">🤖 AI Architect</span>
                )}
              </div>
            ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
