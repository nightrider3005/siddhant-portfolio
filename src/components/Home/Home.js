import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";


const homeStyles = `
  /* ════════════════════════════
     RESET
  ════════════════════════════ */
  .home-section * { box-sizing: border-box; }

  /* ════════════════════════════
     HERO SECTION
  ════════════════════════════ */
  .home-section {
    position: relative;
    background: radial-gradient(ellipse at 45% 40%, #0d0020 0%, #030008 70%);
    overflow: hidden;
    padding-top: 100px;
    padding-bottom: 70px;
  }

  /* Animated purple grid overlay */
  .home-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(124, 58, 237, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124, 58, 237, 0.04) 1px, transparent 1px);
    background-size: 70px 70px;
    pointer-events: none;
    z-index: 0;
    animation: gridDrift 40s linear infinite;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
    will-change: background-position;
  }
  @keyframes gridDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 70px 70px; }
  }

  /* ─── 3 Ambient Orbs ─── */
  .hero-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px); z-index: 0; will-change: transform; }
  .hero-orb-1 {
    width: 700px; height: 700px;
    top: -80px; left: -180px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
    animation: o1 20s ease-in-out infinite;
  }
  .hero-orb-2 {
    width: 500px; height: 500px;
    top: -120px; right: -60px;
    background: radial-gradient(circle, rgba(0, 243, 255, 0.07) 0%, transparent 70%);
    animation: o2 25s ease-in-out infinite;
    filter: blur(100px);
  }
  .hero-orb-3 {
    width: 400px; height: 400px;
    bottom: -80px; right: 10%;
    background: radial-gradient(circle, rgba(255, 0, 127, 0.06) 0%, transparent 70%);
    animation: o3 22s ease-in-out infinite;
    filter: blur(80px);
  }
  @keyframes o1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,40px)} }
  @keyframes o2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} }
  @keyframes o3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }

  .home-content { position: relative; z-index: 2; }

  /* ════════════════════════════
     LEFT TEXT BLOCK
  ════════════════════════════ */
  .hero-text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 30px;
  }

  /* Greeting */
  .h-greeting {
    font-family: 'Outfit', sans-serif;
    font-size: 1em;
    font-weight: 500;
    color: rgba(255,255,255,0.72);
    margin: 0 0 18px 0;
    letter-spacing: 0.3px;
    line-height: 1.6;
    animation: fadeUp 0.6s ease 0.3s both;
    max-width: 540px;
  }

  /* Name block */
  .h-name-block {
    margin: 0 0 4px 0;
    animation: slideIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  @keyframes slideIn { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }

  .h-im {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6em, 4vw, 2.4em);
    font-weight: 400;
    color: rgba(255,255,255,0.6);
    letter-spacing: -0.5px;
    line-height: 1.1;
    display: block;
  }

  /* Gradient name text */
  .h-fullname {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8em, 5vw, 3em);
    font-weight: 800;
    background: linear-gradient(135deg, #c084fc, #e879f9, #ff007f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -1px;
    line-height: 1.05;
    display: block;
    position: relative;
  }

  /* Underline grows from 0 to 100% */
  .h-underline {
    display: block;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #9333ea, #c084fc, rgba(0,243,255,0.3));
    border-radius: 2px;
    margin: 10px 0 24px 0;
    animation: ulDraw 1s ease 0.85s forwards;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 8px rgba(147,51,234,0.4);
  }
  .h-underline::after {
    content:'';
    position:absolute; top:0; left:-100%; width:50%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);
    animation:ulScan 3s ease-in-out 2s infinite;
  }
  @keyframes ulDraw { to{width:100%} }
  @keyframes ulScan { 0%{left:-100%} 100%{left:200%} }

  /* Type wrapper */
  .h-type-wrap {
    width: 100%;
    min-height: 64px;
    margin-bottom: 22px;
    animation: fadeUp 0.7s ease 0.7s both;
    display: flex;
    align-items: center;
  }

  /* Stats */
  .h-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 28px;
    animation: fadeUp 0.7s ease 0.95s both;
    margin-bottom: 28px;
  }
  .h-stat { display: flex; flex-direction: column; gap: 4px; }
  .h-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.3em;
    font-weight: 800;
    background: linear-gradient(135deg, #c084fc, #e879f9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  .h-stat-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.58em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.32);
  }

  /* CTA Button */
  .h-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.92em;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #ff007f);
    border: none;
    border-radius: 50px;
    padding: 13px 28px;
    cursor: pointer;
    text-decoration: none;
    animation: fadeUp 0.7s ease 1.1s both;
    transition: box-shadow 0.35s ease, transform 0.3s ease;
    will-change: transform;
  }
  .h-cta:hover {
    box-shadow: 0 0 24px rgba(124,58,237,0.55), 0 0 48px rgba(255,0,127,0.15);
    transform: translateY(-2px);
    color: #fff;
    text-decoration: none;
  }
  .h-cta-arrow { display: inline-block; transition: transform 0.3s ease; }
  .h-cta:hover .h-cta-arrow { transform: translateX(4px); }

  /* ════════════════════════════
     RIGHT IMAGE COL
  ════════════════════════════ */
  .hero-img-col {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }

  /* Spinning conic-gradient ring */
  /* ─── Mascot float ─── */
  .hero-mascot-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .hero-mascot-glow {
    position: absolute;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%);
    filter: blur(28px);
    pointer-events: none;
    animation: lgPulse 4s ease-in-out infinite;
  }
  @keyframes lgPulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }

  .logo-glow {
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%);
    filter: blur(24px);
    animation: lgPulse 4s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes lgPulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }

  /* Bhonpu mascot */
  .hero-mascot-img {
    max-height: 380px !important;
    width: 100%;
    object-fit: contain;
    position: relative; z-index: 2;
    animation: mascotFloat 3.5s ease-in-out infinite, imgReveal 1s ease 0.5s both;
    filter: drop-shadow(0 0 32px rgba(147,51,234,0.28));
    will-change: transform;
  }
  @keyframes imgReveal { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }

  /* ─── Decorative stickers ─── */

  /* Arrow: points from headline toward stat counters */
  .hero-sticker-arrow {
    position: absolute;
    left: -12px;
    bottom: -30px;
    width: 80px;
    height: 80px;
    background-image: url();
    background-size: 320px 320px;
    background-position: -10px -10px;
    background-repeat: no-repeat;
    --sticker-rot: -8deg;
    transform: rotate(-8deg);
    filter: drop-shadow(0 4px 10px rgba(0,0,0,.35));
    pointer-events: none;
    opacity: 0;
    animation: stickerPopIn 0.5s cubic-bezier(0.22,1,0.36,1) 1.4s both;
    z-index: 3;
  }

  /* Starburst near CTA button */
  .hero-sticker-star {
    position: absolute;
    right: -18px;
    bottom: -22px;
    width: 64px;
    height: 64px;
    object-fit: contain;
    --sticker-rot: 12deg;
    transform: rotate(12deg);
    filter: drop-shadow(0 4px 12px rgba(0,0,0,.4));
    pointer-events: none;
    opacity: 0;
    animation: stickerPopIn 0.5s cubic-bezier(0.22,1,0.36,1) 1.6s both, starburstPulse 2.5s ease-in-out 2.2s infinite;
    z-index: 3;
  }

  /* Tape strip on mascot corner */
  .hero-sticker-tape {
    position: absolute;
    top: 12px;
    right: 8px;
    width: 90px;
    height: 32px;
    object-fit: contain;
    --sticker-rot: -6deg;
    transform: rotate(-6deg);
    filter: drop-shadow(0 3px 8px rgba(0,0,0,.3));
    pointer-events: none;
    opacity: 0;
    animation: stickerPopIn 0.5s cubic-bezier(0.22,1,0.36,1) 1.2s both;
    z-index: 5;
  }

  /* ─── Scroll indicator ─── */
  .scroll-indicator {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: rgba(255,255,255,0.3);
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: opacity 0.4s ease;
    z-index: 3;
  }
  .scroll-arrow {
    display: block;
    width: 18px; height: 18px;
    border-right: 1.5px solid rgba(255,255,255,0.3);
    border-bottom: 1.5px solid rgba(255,255,255,0.3);
    transform: rotate(45deg);
    animation: scrollBounce 1.5s ease-in-out infinite;
  }
  @keyframes scrollBounce {
    0%,100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(5px); }
  }

  /* ════════════════════════════
     SOCIAL SECTION
  ════════════════════════════ */
  .social-section {
    position: relative;
    padding: 80px 0 90px;
    background: #050010;
    overflow: hidden;
  }
  .social-section::before {
    content:'';
    position:absolute;
    top:0; left:10%; right:10%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(147,51,234,0.5) 50%,transparent);
  }

  .social-center { text-align: center; }

  .social-h1 {
    font-family: 'Syne', sans-serif !important;
    font-size: clamp(1.8em, 4vw, 2.4em) !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -0.5px;
    margin: 0 !important;
  }

  .soc-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 14px 0 16px;
  }
  .soc-div-line {
    height:1px; width:55px;
    background:linear-gradient(90deg,transparent,rgba(147,51,234,0.5));
    position:relative; overflow:hidden;
  }
  .soc-div-line:last-child { background:linear-gradient(90deg,rgba(147,51,234,0.5),transparent); }
  .soc-div-line::after {
    content:''; position:absolute; top:0; left:-100%; width:50%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent);
    animation:sdScan 3.2s ease-in-out infinite;
  }
  .soc-div-line:last-child::after { animation-delay:1.6s; }
  @keyframes sdScan { 0%{left:-100%} 100%{left:200%} }
  .soc-div-dot {
    width:8px; height:8px; border-radius:50%; background:#9333ea;
    box-shadow:0 0 10px rgba(147,51,234,0.9),0 0 22px rgba(147,51,234,0.5);
    animation:dotPls 2s ease-in-out infinite; position:relative;
  }
  .soc-div-dot::before,.soc-div-dot::after {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:1px solid rgba(147,51,234,0.45);
    animation:dotRng 2s ease-out infinite;
  }
  .soc-div-dot::after { animation-delay:1s; }
  @keyframes dotPls { 0%,100%{box-shadow:0 0 10px rgba(147,51,234,0.9),0 0 22px rgba(147,51,234,0.5)} 50%{box-shadow:0 0 20px rgba(147,51,234,1),0 0 40px rgba(147,51,234,0.7)} }
  @keyframes dotRng { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.8);opacity:0} }

  .social-sub {
    font-family: 'Outfit', sans-serif !important;
    color: rgba(255,255,255,0.4) !important;
    font-size: 0.95em !important;
    margin: 0 0 40px 0 !important;
  }
  .social-sub .purple-txt { color: #9333ea !important; font-weight: 600; }

  .soc-cards {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .soc-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 145px;
    padding: 24px 16px 20px;
    border-radius: 18px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(147,51,234,0.18);
    text-decoration: none !important;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, background 0.3s, box-shadow 0.35s;
    animation: cardUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
    backdrop-filter: blur(8px);
  }
  .soc-card:nth-child(1) { animation-delay: 0.1s; }
  .soc-card:nth-child(3) { animation-delay: 0.25s; }
  @keyframes cardUp { from{opacity:0;transform:translateY(28px) scale(0.93)} to{opacity:1;transform:translateY(0) scale(1)} }

  .soc-card::before {
    content:''; position:absolute;
    top:0; left:20%; right:20%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(147,51,234,0.5),transparent);
    opacity:0; transition:opacity 0.3s ease;
  }
  .soc-card:hover::before { opacity:1; }
  .soc-card:hover {
    transform: translateY(-10px) scale(1.04);
    border-color: rgba(147,51,234,0.5);
    background: rgba(147,51,234,0.06);
    box-shadow: 0 16px 48px rgba(147,51,234,0.14), 0 4px 14px rgba(0,0,0,0.5);
  }

  .soc-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: rgba(147,51,234,0.08);
    border: 1.5px solid rgba(147,51,234,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4em; color: #9333ea;
    transition: all 0.35s ease;
  }
  .soc-card:hover .soc-icon {
    background: rgba(147,51,234,0.16);
    border-color: rgba(147,51,234,0.6);
    box-shadow: 0 0 22px rgba(147,51,234,0.35);
    color: #fff;
    transform: scale(1.08) rotate(-5deg);
  }

  .soc-name {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    transition: color 0.3s;
  }
  .soc-card:hover .soc-name { color: rgba(255,255,255,0.9); }

  .soc-cta {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62em; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(147,51,234,0.5);
    display: flex; align-items: center; gap: 4px;
    transition: color 0.3s;
  }
  .soc-cta-arrow { display:inline-block; transition:transform 0.3s ease; }
  .soc-card:hover .soc-cta { color: #9333ea; }
  .soc-card:hover .soc-cta-arrow { transform: translateX(4px); }

  .soc-or {
    display: flex; flex-direction: column;
    align-items: center; gap: 5px; flex-shrink: 0; padding: 0 4px;
  }
  .soc-or-line {
    display: block; width:1px; height:22px;
    background: linear-gradient(180deg,transparent,rgba(147,51,234,0.25),transparent);
  }
  .soc-or-text {
    font-family:'Outfit',sans-serif; font-size:0.6em; font-weight:700;
    letter-spacing:2px; text-transform:uppercase; color:rgba(147,51,234,0.3);
  }

  .soc-tagline {
    font-family:'Outfit',sans-serif; font-size:0.74em;
    color:rgba(255,255,255,0.18); margin-top:28px;
    letter-spacing:0.4px;
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .soc-star { color:#9333ea; display:inline-block; animation:starSpin 5s linear infinite; }
  @keyframes starSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* ════════════════════════════
     SHARED
  ════════════════════════════ */
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  /* ════════════════════════════
     MOBILE ≤ 767px
  ════════════════════════════ */
  @media (max-width: 767px) {
    .home-section { padding-top: 90px; padding-bottom: 60px; }
    .hero-text-col { order:1; padding-bottom: 10px; }
    .hero-img-col  { order:2; padding-top: 20px; }
    .h-im       { font-size: 1.5em; }
    .h-fullname { font-size: 2em; }
    .h-underline{ margin-bottom: 16px; }
    .hero-mascot-img { max-height: 260px !important; }
    .hero-mascot-glow { width:200px; height:200px; }
    .hero-sticker-tape { display: none; }
    .h-stats { gap: 14px 22px; }
    .h-stat-num { font-size: 1.1em; }
    .soc-cards { gap: 12px; }
    .soc-card { width: 130px; padding: 20px 12px 16px; }
    .soc-icon { width:50px; height:50px; font-size:1.3em; }
    .soc-or { flex-direction:row; gap:4px; }
    .soc-or-line { width:16px; height:1px; background:linear-gradient(90deg,transparent,rgba(147,51,234,0.2),transparent); }
    .scroll-indicator { display: none; }
  }
`;

function Home() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    // Inject styles
    if (!document.getElementById("home-v7-styles")) {
      const tag = document.createElement("style");
      tag.id = "home-v7-styles";
      tag.innerHTML = homeStyles;
      document.head.appendChild(tag);
    }

    // Hide scroll indicator after 100px scroll
    const onScroll = () => { if (window.scrollY > 100) setShowScroll(false); };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.getElementById("home-v7-styles")?.remove();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);


  return (
    <section>
      {/* ── HERO ── */}
      <Container fluid className="home-section" id="home">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <Particle />

        <Container className="home-content">
          <Row className="align-items-center">
            {/* LEFT */}
            <Col md={7} className="hero-text-col">

              {/* Name */}
              <div className="h-name-block">
                <span className="h-im">I'M</span>
                <span className="h-fullname">SIDDHANT GARG</span>
              </div>

              {/* Underline */}
              <span className="h-underline" />

              {/* Typing text */}
              <div className="h-type-wrap">
                <Type />
              </div>

              {/* Stats */}
              <div className="h-stats">
                <div className="h-stat">
                  <span className="h-stat-num">40+</span>
                  <span className="h-stat-label">Leads Generated</span>
                </div>
                <div className="h-stat">
                  <span className="h-stat-num">200%</span>
                  <span className="h-stat-label">Social Growth</span>
                </div>
                <div className="h-stat">
                  <span className="h-stat-num">12+</span>
                  <span className="h-stat-label">Live Projects</span>
                </div>
              </div>

              {/* CTA + stickers */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <a href="/project" className="h-cta">
                  View My Work <span className="h-cta-arrow">→</span>
                </a>
                {/* Starburst near CTA */}
                <img
                  src={starburstImg}
                  alt=""
                  className="hero-sticker-star sticker-base"
                  aria-hidden="true"
                />
              </div>
            </Col>

            {/* RIGHT — Bhonpu mascot */}
            <Col md={5} className="hero-img-col">
              <div className="hero-mascot-wrap">
                <div className="hero-mascot-glow" />
                {/* Tape strip pinned to corner of mascot */}
                <img
                  src={tapeImg}
                  alt=""
                  className="hero-sticker-tape"
                  aria-hidden="true"
                />
                <img
                  src={bhonpuImg}
                  alt="Bhonpu mascot"
                  className="img-fluid hero-mascot-img"
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll indicator */}
        {showScroll && (
          <div className="scroll-indicator" style={{ opacity: showScroll ? 1 : 0 }}>
            <span>scroll</span>
            <span className="scroll-arrow" />
          </div>
        )}
      </Container>

      {/* ── ABOUT ── */}
      <Home2 />

      {/* ── FIND ME ON ── */}
      <div className="social-section">
        <Container>
          <div className="social-center">
            <h1 className="social-h1">
              Find Me <span style={{ color: "#9333ea" }}>On</span>
            </h1>

            <div className="soc-div">
              <div className="soc-div-line" />
              <div className="soc-div-dot" />
              <div className="soc-div-line" />
            </div>

            <p className="social-sub">
              Feel free to{" "}
              <span className="purple-txt" style={{ color: "#9333ea", fontWeight: 600 }}>
                connect
              </span>{" "}
              with me
            </p>

            <div className="soc-cards">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noreferrer"
                className="soc-card"
              >
                <div className="soc-icon">
                  <FaLinkedinIn />
                </div>
                <span className="soc-name">LinkedIn</span>
                <span className="soc-cta">
                  Connect <span className="soc-cta-arrow">→</span>
                </span>
              </a>

              {/* OR */}
              <div className="soc-or">
                <span className="soc-or-line" />
                <span className="soc-or-text">or</span>
                <span className="soc-or-line" />
              </div>

              {/* Email */}
              <a
                href="mailto:siddhantgarg563@gmail.com"
                className="soc-card"
              >
                <div className="soc-icon">
                  <FaEnvelope />
                </div>
                <span className="soc-name">Email</span>
                <span className="soc-cta">
                  Send Mail <span className="soc-cta-arrow">→</span>
                </span>
              </a>
            </div>

            <p className="soc-tagline">
              <span className="soc-star">✦</span>
              Let's build something extraordinary together
              <span className="soc-star">✦</span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Home;
