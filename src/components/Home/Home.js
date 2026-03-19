import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const homeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  /* ═══════════════════════════════════════
     HERO SECTION
  ═══════════════════════════════════════ */
  .home-section {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background: #070711;
    display: flex;
    align-items: center;
  }

  /* Animated grid */
  .home-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(198,120,221,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(198,120,221,0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    animation: gridDrift 30s linear infinite;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
  }
  @keyframes gridDrift {
    0%   { background-position: 0 0, 0 0; }
    100% { background-position: 72px 72px, 72px 72px; }
  }

  /* Ambient orbs */
  .hero-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(100px);
    z-index: 0;
  }
  .hero-orb-1 {
    width: 700px; height: 700px;
    top: -200px; left: -200px;
    background: radial-gradient(circle, rgba(198,120,221,0.1) 0%, transparent 70%);
    animation: heroOrb1 20s ease-in-out infinite;
  }
  .hero-orb-2 {
    width: 500px; height: 500px;
    bottom: -100px; right: 0;
    background: radial-gradient(circle, rgba(100,80,200,0.08) 0%, transparent 70%);
    animation: heroOrb2 25s ease-in-out infinite;
  }
  .hero-orb-3 {
    width: 300px; height: 300px;
    top: 50%; right: 35%;
    background: radial-gradient(circle, rgba(198,120,221,0.06) 0%, transparent 70%);
    animation: heroOrb3 15s ease-in-out infinite;
  }
  @keyframes heroOrb1 {
    0%,100%{transform:translate(0,0)} 33%{transform:translate(80px,50px)} 66%{transform:translate(20px,90px)}
  }
  @keyframes heroOrb2 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(-70px,-60px)}
  }
  @keyframes heroOrb3 {
    0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.4)}
  }

  /* Corner brackets */
  .hero-corner {
    position: absolute;
    width: 40px; height: 40px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.35;
  }
  .hero-corner-tl { top: 30px; left: 30px; border-top: 1px solid #c678dd; border-left: 1px solid #c678dd; }
  .hero-corner-tr { top: 30px; right: 30px; border-top: 1px solid #c678dd; border-right: 1px solid #c678dd; }
  .hero-corner-bl { bottom: 30px; left: 30px; border-bottom: 1px solid #c678dd; border-left: 1px solid #c678dd; }
  .hero-corner-br { bottom: 30px; right: 30px; border-bottom: 1px solid #c678dd; border-right: 1px solid #c678dd; }

  .home-content {
    position: relative;
    z-index: 2;
    padding-top: 60px !important;
  }

  /* Greeting */
  .heading {
    font-family: 'Outfit', sans-serif !important;
    font-size: 1.6em !important;
    font-weight: 400 !important;
    color: rgba(255,255,255,0.75) !important;
    letter-spacing: 1px;
    animation: greetReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both;
    padding-bottom: 15px;
  }
  @keyframes greetReveal {
    from { opacity:0; transform:translateY(-20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .wave {
    display: inline-block;
    animation: waveHand 2.2s ease-in-out infinite;
    transform-origin: 70% 70%;
  }
  @keyframes waveHand {
    0%,60%,100%{transform:rotate(0deg)}
    10%,30%{transform:rotate(14deg)}
    20%{transform:rotate(-8deg)}
    40%{transform:rotate(14deg)}
    50%{transform:rotate(10deg)}
  }

  /* Name */
  .heading-name {
    font-family: 'Syne', sans-serif !important;
    font-size: 3.4em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -1.5px;
    line-height: 1.1 !important;
    animation: nameSlam 1s cubic-bezier(0.22,1,0.36,1) 0.3s both;
    position: relative;
  }
  @keyframes nameSlam {
    from { opacity:0; transform:translateX(-40px) skewX(8deg); }
    to   { opacity:1; transform:translateX(0) skewX(0deg); }
  }

  .main-name {
    position: relative;
    display: inline-block;
    color: #c678dd;
  }
  .main-name::before, .main-name::after {
    content: 'SIDDHANT GARG';
    position: absolute;
    top:0; left:0;
    font-family:'Syne',sans-serif;
    font-weight:800;
    pointer-events:none;
  }
  .main-name::before {
    color: rgba(198,120,221,0.7);
    animation: glitchA 6s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
  }
  .main-name::after {
    color: rgba(80,160,255,0.5);
    animation: glitchB 6s infinite;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  }
  @keyframes glitchA {
    0%,85%,100%{transform:translate(0,0);opacity:0}
    86%{transform:translate(-4px,-2px);opacity:1}
    88%{transform:translate(4px,0);opacity:1}
    90%{transform:translate(-2px,1px);opacity:1}
    92%{transform:translate(0,0);opacity:0}
  }
  @keyframes glitchB {
    0%,85%,100%{transform:translate(0,0);opacity:0}
    87%{transform:translate(4px,2px);opacity:1}
    89%{transform:translate(-3px,-1px);opacity:1}
    91%{transform:translate(1px,0);opacity:1}
    93%{transform:translate(0,0);opacity:0}
  }

  .name-underline {
    display: block;
    height: 2px;
    background: linear-gradient(90deg, #c678dd, rgba(198,120,221,0.2), transparent);
    border-radius: 2px;
    margin-top: 6px;
    width: 0;
    animation: underlineDraw 1.2s cubic-bezier(0.22,1,0.36,1) 0.9s forwards;
    box-shadow: 0 0 12px rgba(198,120,221,0.5);
    position: relative;
    overflow: hidden;
  }
  .name-underline::after {
    content: '';
    position: absolute;
    top:0; left:-100%;
    width:50%; height:100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    animation: underlineScan 3s ease-in-out 2s infinite;
  }
  @keyframes underlineDraw { to { width: 100%; } }
  @keyframes underlineScan { 0%{left:-100%} 100%{left:200%} }

  .type-wrapper {
    animation: typeReveal 0.8s ease 0.8s both;
  }
  @keyframes typeReveal {
    from{opacity:0;transform:translateY(16px)}
    to{opacity:1;transform:translateY(0)}
  }

  /* Hero stats */
  .hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 8px;
    animation: typeReveal 0.8s ease 1.1s both;
  }
  .hero-stat { display:flex; flex-direction:column; gap:2px; }
  .hero-stat-num {
    font-family:'Syne',sans-serif;
    font-size:1.4em;
    font-weight:800;
    color:#c678dd;
    line-height:1;
  }
  .hero-stat-label {
    font-family:'Outfit',sans-serif;
    font-size:0.65em;
    font-weight:600;
    letter-spacing:1.5px;
    text-transform:uppercase;
    color:rgba(255,255,255,0.35);
  }

  /* Logo col */
  .home-img-col {
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .logo-ring {
    position:absolute;
    border-radius:50%;
    pointer-events:none;
  }
  .logo-ring-1 {
    width:440px; height:440px;
    border:1px solid rgba(198,120,221,0.12);
    animation:ringRotate1 20s linear infinite;
  }
  .logo-ring-2 {
    width:360px; height:360px;
    border:1px dashed rgba(198,120,221,0.08);
    animation:ringRotate1 14s linear infinite reverse;
  }
  .logo-ring-3 {
    width:280px; height:280px;
    border:1px solid rgba(198,120,221,0.05);
    animation:ringRotate1 30s linear infinite;
  }
  .logo-ring-1::before {
    content:'';
    position:absolute;
    top:-3px; left:50%;
    transform:translateX(-50%);
    width:6px; height:6px;
    border-radius:50%;
    background:#c678dd;
    box-shadow:0 0 12px rgba(198,120,221,0.9),0 0 24px rgba(198,120,221,0.5);
  }
  @keyframes ringRotate1 {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }
  .logo-glow {
    position:absolute;
    width:350px; height:350px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(198,120,221,0.15) 0%, transparent 65%);
    filter:blur(30px);
    animation:logoPulse 4s ease-in-out infinite;
    pointer-events:none;
  }
  @keyframes logoPulse {
    0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.2);opacity:1}
  }
  .home-logo-img {
    max-height:450px !important;
    width:100%;
    object-fit:contain;
    position:relative;
    z-index:2;
    animation:logoFloat 6s ease-in-out infinite, logoReveal 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both;
    filter:drop-shadow(0 0 30px rgba(198,120,221,0.25));
  }
  @keyframes logoFloat {
    0%,100%{transform:translateY(0px) rotate(0deg)}
    33%{transform:translateY(-16px) rotate(0.8deg)}
    66%{transform:translateY(-8px) rotate(-0.5deg)}
  }
  @keyframes logoReveal {
    from{opacity:0;transform:translateX(60px) scale(0.9)}
    to{opacity:1;transform:translateX(0) scale(1)}
  }

  /* ═══════════════════════════════════════
     FIND ME ON — COMPLETE REDESIGN
  ═══════════════════════════════════════ */
  .social-section-wrap {
    position: relative;
    padding: 80px 0 100px;
    overflow: hidden;
    background: transparent;
  }

  /* Section top edge glow line */
  .social-section-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(198,120,221,0.6) 30%,
      rgba(198,120,221,0.9) 50%,
      rgba(198,120,221,0.6) 70%,
      transparent 100%
    );
    box-shadow: 0 0 30px rgba(198,120,221,0.3);
  }

  /* Central glow blob behind the whole section */
  .social-section-wrap::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(198,120,221,0.08) 0%, transparent 65%);
    filter: blur(60px);
    pointer-events: none;
    animation: socialGlow 8s ease-in-out infinite;
  }
  @keyframes socialGlow {
    0%,100%{opacity:0.6; transform:translate(-50%,-50%) scale(1)}
    50%{opacity:1; transform:translate(-50%,-50%) scale(1.2)}
  }

  .social-inner {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  /* ── HEADING ── */
  .social-heading {
    font-family: 'Syne', sans-serif !important;
    font-size: 3em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -1px;
    margin-bottom: 0 !important;
    animation: socialHeadIn 0.9s cubic-bezier(0.22,1,0.36,1) both;
    position: relative;
    display: inline-block;
  }
  @keyframes socialHeadIn {
    from{opacity:0; transform:translateY(-24px)}
    to{opacity:1; transform:translateY(0)}
  }

  /* ── DIVIDER ── */
  .social-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 16px 0 20px;
  }
  .sd-line {
    height: 1px;
    width: 70px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.7));
    position: relative;
    overflow: hidden;
  }
  .sd-line:last-child {
    background: linear-gradient(90deg, rgba(198,120,221,0.7), transparent);
  }
  .sd-line::after {
    content: '';
    position: absolute;
    top:0; left:-100%;
    width:50%; height:100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    animation: sdScan 3.5s ease-in-out infinite;
  }
  .sd-line:last-child::after { animation-delay: 1.75s; }
  @keyframes sdScan { 0%{left:-100%} 100%{left:200%} }

  .sd-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.9), 0 0 28px rgba(198,120,221,0.5);
    position: relative;
    animation: sdPulse 2s ease-in-out infinite;
  }
  .sd-dot::before, .sd-dot::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(198,120,221,0.5);
    animation: sdRing 2s ease-out infinite;
  }
  .sd-dot::after { animation-delay: 1s; }
  @keyframes sdPulse {
    0%,100%{box-shadow:0 0 12px rgba(198,120,221,0.9),0 0 28px rgba(198,120,221,0.5)}
    50%{box-shadow:0 0 22px rgba(198,120,221,1),0 0 50px rgba(198,120,221,0.7)}
  }
  @keyframes sdRing {
    0%{transform:scale(1);opacity:0.8} 100%{transform:scale(3);opacity:0}
  }

  /* ── SUBTITLE ── */
  .social-subtitle {
    font-family: 'Outfit', sans-serif !important;
    font-size: 1em !important;
    color: rgba(255,255,255,0.42) !important;
    margin-bottom: 48px !important;
    letter-spacing: 0.2px;
  }
  .social-subtitle .purple {
    color: #c678dd !important;
    font-weight: 600;
  }

  /* ── ICON CARDS ── */
  .social-cards-row {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .social-card {
    position: relative;
    width: 160px;
    padding: 28px 20px 24px;
    border-radius: 20px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(198,120,221,0.15);
    cursor: pointer;
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    transition:
      transform 0.4s cubic-bezier(0.22,1,0.36,1),
      border-color 0.35s ease,
      background 0.35s ease,
      box-shadow 0.4s ease;
    animation: socialCardIn 0.8s cubic-bezier(0.22,1,0.36,1) both;
    overflow: hidden;
    backdrop-filter: blur(8px);
  }
  .social-card:nth-child(1){animation-delay:0.15s}
  .social-card:nth-child(2){animation-delay:0.35s}
  @keyframes socialCardIn {
    from{opacity:0; transform:translateY(40px) scale(0.9) rotateX(10deg)}
    to{opacity:1; transform:translateY(0) scale(1) rotateX(0deg)}
  }

  /* Card top shimmer line */
  .social-card::before {
    content: '';
    position: absolute;
    top: 0; left: 20%; right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.8), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    box-shadow: 0 0 10px rgba(198,120,221,0.5);
  }
  .social-card:hover::before { opacity: 1; }

  /* Shimmer sweep */
  .social-card::after {
    content: '';
    position: absolute;
    top: -80%; left: -80%;
    width: 50%; height: 260%;
    background: linear-gradient(105deg, transparent, rgba(198,120,221,0.06), transparent);
    transform: rotate(15deg);
    pointer-events: none;
    transition: left 0.6s ease;
  }
  .social-card:hover::after { left: 160%; }

  .social-card:hover {
    transform: translateY(-12px) scale(1.04);
    border-color: rgba(198,120,221,0.55);
    background: rgba(198,120,221,0.07);
    box-shadow:
      0 20px 60px rgba(198,120,221,0.2),
      0 8px 20px rgba(0,0,0,0.5),
      inset 0 0 30px rgba(198,120,221,0.04);
  }

  /* Icon circle */
  .social-icon-circle {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: rgba(198,120,221,0.08);
    border: 1.5px solid rgba(198,120,221,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6em;
    color: #c678dd;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    overflow: hidden;
  }

  /* Spinning conic ring on icon */
  .social-icon-circle::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: conic-gradient(
      rgba(198,120,221,0.6) 0deg,
      transparent 90deg,
      rgba(198,120,221,0.4) 180deg,
      transparent 270deg,
      rgba(198,120,221,0.6) 360deg
    );
    animation: iconRingSpin 4s linear infinite;
    opacity: 0;
    transition: opacity 0.4s ease;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
  }
  .social-card:hover .social-icon-circle::before { opacity: 1; }
  @keyframes iconRingSpin {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }

  /* Inner glow on hover */
  .social-icon-circle::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(198,120,221,0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .social-card:hover .social-icon-circle::after { opacity: 1; }

  .social-card:hover .social-icon-circle {
    background: rgba(198,120,221,0.15);
    border-color: rgba(198,120,221,0.6);
    box-shadow: 0 0 30px rgba(198,120,221,0.4), 0 0 60px rgba(198,120,221,0.2);
    transform: scale(1.1) rotate(-5deg);
    color: #fff;
  }

  /* Platform name */
  .social-platform-name {
    font-family: 'Outfit', sans-serif;
    font-size: 0.82em;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    transition: color 0.3s ease;
  }
  .social-card:hover .social-platform-name {
    color: rgba(255,255,255,0.9);
  }

  /* "Connect" cta */
  .social-cta {
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.5);
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
  }
  .social-cta::after {
    content: '→';
    display: inline-block;
    transition: transform 0.3s ease;
  }
  .social-card:hover .social-cta {
    color: #c678dd;
  }
  .social-card:hover .social-cta::after {
    transform: translateX(4px);
  }

  /* ── OR DIVIDER BETWEEN CARDS ── */
  .social-or {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 4px;
  }
  .social-or span {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.35);
  }
  .social-or i {
    display: block;
    width: 1px;
    height: 30px;
    background: linear-gradient(180deg, transparent, rgba(198,120,221,0.3), transparent);
  }

  /* ── TAGLINE UNDER CARDS ── */
  .social-tagline {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    color: rgba(255,255,255,0.22);
    margin-top: 36px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .social-tagline .tl-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(198,120,221,0.4);
    display: inline-block;
    animation: tlDotBlink 3s ease-in-out infinite;
  }
  .social-tagline .tl-dot:nth-child(2){animation-delay:1s}
  .social-tagline .tl-dot:nth-child(3){animation-delay:2s}
  @keyframes tlDotBlink {
    0%,80%,100%{opacity:0.4} 40%{opacity:1}
  }
`;

function Home() {
  useEffect(() => {
    if (!document.getElementById("home-v4-styles")) {
      const tag = document.createElement("style");
      tag.id = "home-v4-styles";
      tag.innerHTML = homeStyles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("home-v4-styles")?.remove();
  }, []);

  return (
    <section>
      {/* ════════════════════ HERO ════════════════════ */}
      <Container fluid className="home-section" id="home">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-corner hero-corner-tl" />
        <div className="hero-corner hero-corner-tr" />
        <div className="hero-corner hero-corner-bl" />
        <div className="hero-corner hero-corner-br" />
        <Particle />

        <Container className="home-content">
          <Row className="align-items-center">
            {/* LEFT */}
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <br />
                <strong className="main-name"> SIDDHANT GARG</strong>
                <span className="name-underline" />
              </h1>

              <div
                style={{ padding: "50px 0 0 0", textAlign: "left" }}
                className="type-wrapper"
              >
                <Type />
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-num">40+</span>
                  <span className="hero-stat-label">Leads Generated</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-num">200%</span>
                  <span className="hero-stat-label">Social Growth</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-num">6</span>
                  <span className="hero-stat-label">Live Projects</span>
                </div>
              </div>
            </Col>

            {/* RIGHT */}
            <Col md={5} className="home-img-col" style={{ paddingBottom: 20 }}>
              <div className="logo-ring logo-ring-1" />
              <div className="logo-ring logo-ring-2" />
              <div className="logo-ring logo-ring-3" />
              <div className="logo-glow" />
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid home-logo-img"
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <Home2 />

      {/* ════════════════════ FIND ME ON ════════════════════ */}
      <div className="social-section-wrap">
        <Container>
          <div className="social-inner">
            {/* Heading */}
            <h1 className="social-heading">
              Find Me{" "}
              <span className="purple" style={{ color: "#c678dd" }}>
                On
              </span>
            </h1>

            {/* Animated divider */}
            <div className="social-divider">
              <div className="sd-line" />
              <div className="sd-dot" />
              <div className="sd-line" />
            </div>

            {/* Subtitle */}
            <p className="social-subtitle">
              Feel free to <span className="purple">connect</span> with me
            </p>

            {/* Cards */}
            <div className="social-cards-row">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noreferrer"
                className="social-card"
              >
                <div className="social-icon-circle">
                  <FaLinkedinIn />
                </div>
                <span className="social-platform-name">LinkedIn</span>
                <span className="social-cta">Connect</span>
              </a>

              {/* OR divider */}
              <div className="social-or">
                <i />
                <span>or</span>
                <i />
              </div>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/berealsid_?igsh=MTR4Z2xvNnFqZTY1MQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="social-card"
              >
                <div className="social-icon-circle">
                  <AiFillInstagram />
                </div>
                <span className="social-platform-name">Instagram</span>
                <span className="social-cta">Follow</span>
              </a>
            </div>

            {/* Tagline */}
            <p className="social-tagline">
              <span className="tl-dot" />
              Let's build something extraordinary together
              <span className="tl-dot" />
              <span className="tl-dot" />
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Home;
