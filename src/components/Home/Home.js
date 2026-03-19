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

  /* ════════════════════════════
     RESET — critical
  ════════════════════════════ */
  .home-section * { box-sizing: border-box; }

  /* ════════════════════════════
     HERO SECTION
  ════════════════════════════ */
  .home-section {
    position: relative;
    background: #070711;
    overflow: hidden;
    padding-top: 100px;
    padding-bottom: 70px;
  }

  /* Subtle grid */
  .home-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(198,120,221,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(198,120,221,0.028) 1px, transparent 1px);
    background-size: 68px 68px;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
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
    width: 550px; height: 550px;
    top: -160px; left: -160px;
    background: radial-gradient(circle, rgba(198,120,221,0.09) 0%, transparent 70%);
    animation: o1 20s ease-in-out infinite;
  }
  .hero-orb-2 {
    width: 400px; height: 400px;
    bottom: -100px; right: 0;
    background: radial-gradient(circle, rgba(120,80,210,0.07) 0%, transparent 70%);
    animation: o2 25s ease-in-out infinite;
  }
  @keyframes o1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,40px)} }
  @keyframes o2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-40px)} }

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
    font-size: 1.15em;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
    margin: 0 0 10px 0;
    letter-spacing: 0.3px;
    animation: fadeDown 0.6s ease 0.1s both;
  }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }

  .wave {
    display: inline-block;
    animation: wv 2s ease-in-out infinite;
    transform-origin: 70% 70%;
  }
  @keyframes wv {
    0%,60%,100%{transform:rotate(0deg)}
    10%,30%{transform:rotate(14deg)}
    20%{transform:rotate(-8deg)}
    40%{transform:rotate(12deg)}
    50%{transform:rotate(8deg)}
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
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
    line-height: 1.1;
    display: block;
  }
  .h-fullname {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8em, 5vw, 3em);
    font-weight: 800;
    color: #c678dd;
    letter-spacing: -1px;
    line-height: 1.05;
    display: block;
  }

  /* Underline */
  .h-underline {
    display: block;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #c678dd, rgba(198,120,221,0.1));
    border-radius: 2px;
    margin: 8px 0 22px 0;
    animation: ulDraw 1s ease 0.85s forwards;
    box-shadow: 0 0 8px rgba(198,120,221,0.35);
    overflow: hidden;
    position: relative;
  }
  .h-underline::after {
    content:'';
    position:absolute; top:0; left:-100%; width:50%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);
    animation:ulScan 3s ease-in-out 2s infinite;
  }
  @keyframes ulDraw { to{width:100%} }
  @keyframes ulScan { 0%{left:-100%} 100%{left:200%} }

  /* Type wrapper — CRITICAL: min-height prevents overlap */
  .h-type-wrap {
    width: 100%;
    min-height: 50px;
    margin-bottom: 24px;
    animation: fadeUp 0.7s ease 0.7s both;
  }

  /* Stats — always below type, no overlap */
  .h-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 28px;
    animation: fadeUp 0.7s ease 0.95s both;
  }
  .h-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .h-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.25em;
    font-weight: 800;
    color: #c678dd;
    line-height: 1;
  }
  .h-stat-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.58em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

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

  .logo-ring {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .logo-ring-1 {
    width: 400px; height: 400px;
    border: 1px solid rgba(198,120,221,0.1);
    animation: rSpin 22s linear infinite;
  }
  .logo-ring-2 {
    width: 300px; height: 300px;
    border: 1px dashed rgba(198,120,221,0.06);
    animation: rSpin 16s linear infinite reverse;
  }
  .logo-ring-1::before {
    content:'';
    position:absolute;
    top:-4px; left:50%; transform:translateX(-50%);
    width:7px; height:7px; border-radius:50%;
    background:#c678dd;
    box-shadow:0 0 12px rgba(198,120,221,1),0 0 24px rgba(198,120,221,0.5);
  }
  @keyframes rSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .logo-glow {
    position:absolute; width:300px; height:300px; border-radius:50%;
    background:radial-gradient(circle, rgba(198,120,221,0.13) 0%, transparent 65%);
    filter:blur(24px);
    animation:lgPulse 4s ease-in-out infinite; pointer-events:none;
  }
  @keyframes lgPulse { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }

  .hero-logo-img {
    max-height: 400px !important;
    width: 100%;
    object-fit: contain;
    position: relative; z-index: 2;
    animation: imgFloat 6s ease-in-out infinite, imgReveal 1s ease 0.5s both;
    filter: drop-shadow(0 0 24px rgba(198,120,221,0.2));
  }
  @keyframes imgFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
  @keyframes imgReveal { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }

  /* ════════════════════════════
     SOCIAL SECTION
  ════════════════════════════ */
  .social-section {
    position: relative;
    padding: 80px 0 90px;
    background: #070711;
    overflow: hidden;
  }
  .social-section::before {
    content:'';
    position:absolute;
    top:0; left:10%; right:10%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(198,120,221,0.55) 50%,transparent);
  }

  .social-center { text-align: center; }

  .social-h1 {
    font-family: 'Syne', sans-serif !important;
    font-size: clamp(1.8em, 4vw, 2.4em) !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -0.5px;
    margin: 0 0 0 0 !important;
  }

  /* Divider */
  .soc-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 14px 0 16px;
  }
  .soc-div-line {
    height:1px; width:55px;
    background:linear-gradient(90deg,transparent,rgba(198,120,221,0.65));
    position:relative; overflow:hidden;
  }
  .soc-div-line:last-child { background:linear-gradient(90deg,rgba(198,120,221,0.65),transparent); }
  .soc-div-line::after {
    content:''; position:absolute; top:0; left:-100%; width:50%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent);
    animation:sdScan 3.2s ease-in-out infinite;
  }
  .soc-div-line:last-child::after { animation-delay:1.6s; }
  @keyframes sdScan { 0%{left:-100%} 100%{left:200%} }
  .soc-div-dot {
    width:8px; height:8px; border-radius:50%; background:#c678dd;
    box-shadow:0 0 10px rgba(198,120,221,0.9),0 0 22px rgba(198,120,221,0.5);
    animation:dotPls 2s ease-in-out infinite;
    position:relative;
  }
  .soc-div-dot::before,.soc-div-dot::after {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:1px solid rgba(198,120,221,0.45);
    animation:dotRng 2s ease-out infinite;
  }
  .soc-div-dot::after { animation-delay:1s; }
  @keyframes dotPls { 0%,100%{box-shadow:0 0 10px rgba(198,120,221,0.9),0 0 22px rgba(198,120,221,0.5)} 50%{box-shadow:0 0 20px rgba(198,120,221,1),0 0 40px rgba(198,120,221,0.7)} }
  @keyframes dotRng { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.8);opacity:0} }

  .social-sub {
    font-family: 'Outfit', sans-serif !important;
    color: rgba(255,255,255,0.4) !important;
    font-size: 0.95em !important;
    margin: 0 0 40px 0 !important;
  }
  .social-sub .purple-txt { color: #c678dd !important; font-weight: 600; }

  /* ── TWO CARDS SIDE BY SIDE ── */
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
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(198,120,221,0.14);
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
    background:linear-gradient(90deg,transparent,rgba(198,120,221,0.7),transparent);
    opacity:0; transition:opacity 0.3s ease;
  }
  .soc-card:hover::before { opacity:1; }
  .soc-card:hover {
    transform: translateY(-10px) scale(1.04);
    border-color: rgba(198,120,221,0.48);
    background: rgba(198,120,221,0.07);
    box-shadow: 0 16px 48px rgba(198,120,221,0.17), 0 4px 14px rgba(0,0,0,0.5);
  }

  .soc-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: rgba(198,120,221,0.08);
    border: 1.5px solid rgba(198,120,221,0.22);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4em; color: #c678dd;
    transition: all 0.35s ease;
  }
  .soc-card:hover .soc-icon {
    background: rgba(198,120,221,0.15);
    border-color: rgba(198,120,221,0.55);
    box-shadow: 0 0 22px rgba(198,120,221,0.35);
    color: #fff;
    transform: scale(1.08) rotate(-5deg);
  }

  .soc-name {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: rgba(255,255,255,0.52);
    transition: color 0.3s;
  }
  .soc-card:hover .soc-name { color: rgba(255,255,255,0.9); }

  .soc-cta {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62em; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(198,120,221,0.48);
    display: flex; align-items: center; gap: 4px;
    transition: color 0.3s;
  }
  .soc-cta-arrow { display:inline-block; transition:transform 0.3s ease; }
  .soc-card:hover .soc-cta { color: #c678dd; }
  .soc-card:hover .soc-cta-arrow { transform: translateX(4px); }

  /* OR separator */
  .soc-or {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    padding: 0 4px;
  }
  .soc-or-line {
    display: block; width:1px; height:22px;
    background: linear-gradient(180deg,transparent,rgba(198,120,221,0.28),transparent);
  }
  .soc-or-text {
    font-family:'Outfit',sans-serif; font-size:0.6em; font-weight:700;
    letter-spacing:2px; text-transform:uppercase;
    color:rgba(198,120,221,0.28);
  }

  /* Tagline */
  .soc-tagline {
    font-family:'Outfit',sans-serif; font-size:0.74em;
    color:rgba(255,255,255,0.18); margin-top:28px;
    letter-spacing:0.4px;
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .soc-star { color:#c678dd; display:inline-block; animation:starSpin 5s linear infinite; }
  @keyframes starSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* ════════════════════════════
     SHARED
  ════════════════════════════ */
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  /* ════════════════════════════
     MOBILE  ≤ 767px
  ════════════════════════════ */
  @media (max-width: 767px) {
    .home-section {
      padding-top: 90px;
      padding-bottom: 50px;
    }
    /* Stack: text first, image second */
    .hero-text-col { order:1; padding-bottom: 10px; }
    .hero-img-col  { order:2; padding-top: 20px; padding-bottom: 0; }

    .h-im       { font-size: 1.5em; }
    .h-fullname { font-size: 2em; }
    .h-underline{ margin-bottom: 16px; }

    /* Rings hidden — too big on mobile */
    .logo-ring-1, .logo-ring-2 { display:none; }
    .logo-glow { width:200px; height:200px; }
    .hero-logo-img { max-height: 260px !important; }

    /* Stats clean row */
    .h-stats { gap: 14px 22px; }
    .h-stat-num { font-size: 1.1em; }

    /* Social cards — side by side even on mobile */
    .soc-cards { gap: 12px; }
    .soc-card { width: 130px; padding: 20px 12px 16px; }
    .soc-icon { width:50px; height:50px; font-size:1.3em; }
    .soc-or { flex-direction:row; gap:4px; }
    .soc-or-line { width:16px; height:1px; background:linear-gradient(90deg,transparent,rgba(198,120,221,0.28),transparent); }
  }
`;

function Home() {
  useEffect(() => {
    if (!document.getElementById("home-v6-styles")) {
      const tag = document.createElement("style");
      tag.id = "home-v6-styles";
      tag.innerHTML = homeStyles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("home-v6-styles")?.remove();
  }, []);

  return (
    <section>
      {/* ── HERO ── */}
      <Container fluid className="home-section" id="home">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <Particle />

        <Container className="home-content">
          <Row className="align-items-center">
            {/* LEFT */}
            <Col md={7} className="hero-text-col">
              {/* Greeting */}
              <p className="h-greeting">
                Hi There!{" "}
                <span className="wave" role="img" aria-label="wave">
                  👋🏻
                </span>
              </p>

              {/* Name */}
              <div className="h-name-block">
                <span className="h-im">I'M</span>
                <span className="h-fullname">SIDDHANT GARG</span>
              </div>

              {/* Underline */}
              <span className="h-underline" />

              {/* Typing text — isolated block with min-height */}
              <div className="h-type-wrap">
                <Type />
              </div>

              {/* Stats — always below typing text */}
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
                  <span className="h-stat-num">6</span>
                  <span className="h-stat-label">Live Projects</span>
                </div>
              </div>
            </Col>

            {/* RIGHT */}
            <Col md={5} className="hero-img-col">
              <div className="logo-ring logo-ring-1" />
              <div className="logo-ring logo-ring-2" />
              <div className="logo-glow" />
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid hero-logo-img"
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* ── ABOUT ── */}
      <Home2 />

      {/* ── FIND ME ON ── */}
      <div className="social-section">
        <Container>
          <div className="social-center">
            <h1 className="social-h1">
              Find Me <span style={{ color: "#c678dd" }}>On</span>
            </h1>

            <div className="soc-div">
              <div className="soc-div-line" />
              <div className="soc-div-dot" />
              <div className="soc-div-line" />
            </div>

            <p className="social-sub">
              Feel free to{" "}
              <span
                className="purple-txt"
                style={{ color: "#c678dd", fontWeight: 600 }}
              >
                connect
              </span>{" "}
              with me
            </p>

            <div className="soc-cards">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/siddhant-garg-979378249"
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

              {/* Instagram */}
              <a
                href="https://www.instagram.com/berealsid_"
                target="_blank"
                rel="noreferrer"
                className="soc-card"
              >
                <div className="soc-icon">
                  <AiFillInstagram />
                </div>
                <span className="soc-name">Instagram</span>
                <span className="soc-cta">
                  Follow <span className="soc-cta-arrow">→</span>
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
