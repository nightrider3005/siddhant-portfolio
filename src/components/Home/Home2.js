import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  /* ═══════════════════════════════════
     ABOUT SECTION
  ═══════════════════════════════════ */
  .home-about-section {
    position: relative;
    padding: 100px 0 80px !important;
    overflow: hidden;
    background: #070711;
  }

  /* Top separator glow */
  .home-about-section::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(198,120,221,0.5) 50%,
      transparent 100%
    );
    box-shadow: 0 0 20px rgba(198,120,221,0.15);
  }

  /* Background blobs */
  .h2-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(90px);
    z-index: 0;
  }
  .h2-blob-1 {
    width: 500px; height: 500px;
    left: -150px; top: 50%;
    transform: translateY(-50%);
    background: radial-gradient(circle, rgba(198,120,221,0.07) 0%, transparent 70%);
    animation: blobD1 18s ease-in-out infinite;
  }
  .h2-blob-2 {
    width: 400px; height: 400px;
    right: -100px; bottom: 0;
    background: radial-gradient(circle, rgba(100,80,200,0.06) 0%, transparent 70%);
    animation: blobD2 22s ease-in-out infinite;
  }
  @keyframes blobD1 {
    0%,100%{transform:translateY(-50%) scale(1)} 50%{transform:translateY(-60%) scale(1.15)}
  }
  @keyframes blobD2 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-50px)}
  }

  .home-about-section .container { position: relative; z-index: 1; }

  /* ═══════════════════════════════════
     HEADING
  ═══════════════════════════════════ */
  .intro-title {
    font-family: 'Syne', sans-serif !important;
    font-weight: 800 !important;
    font-size: 2.8em !important;
    letter-spacing: -1px;
    color: #fff !important;
    animation: titleDrop 0.9s cubic-bezier(0.22,1,0.36,1) both;
    margin-bottom: 0 !important;
    line-height: 1.1 !important;
  }
  @keyframes titleDrop {
    from{opacity:0;transform:translateY(-28px) skewX(-3deg)}
    to{opacity:1;transform:translateY(0) skewX(0deg)}
  }

  /* Accent bar */
  .intro-accent {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0 36px;
  }
  .accent-line {
    height: 2px; width: 0;
    background: linear-gradient(90deg, #c678dd, rgba(198,120,221,0.3));
    border-radius: 2px;
    animation: growLine 1s cubic-bezier(0.22,1,0.36,1) 0.4s forwards;
    box-shadow: 0 0 10px rgba(198,120,221,0.5);
  }
  .accent-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 10px rgba(198,120,221,0.8), 0 0 22px rgba(198,120,221,0.4);
    flex-shrink: 0;
    animation: adPulse 2s ease-in-out infinite;
    position: relative;
  }
  .accent-dot::before {
    content:'';
    position:absolute;
    inset:-4px;
    border-radius:50%;
    border:1px solid rgba(198,120,221,0.5);
    animation:adRing 2s ease-out infinite;
  }
  .accent-line2 {
    height: 2px; width: 0;
    background: linear-gradient(90deg, rgba(198,120,221,0.3), transparent);
    border-radius: 2px;
    animation: growLine2 1s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
  }
  @keyframes growLine  {to{width:64px}}
  @keyframes growLine2 {to{width:28px}}
  @keyframes adPulse {
    0%,100%{box-shadow:0 0 10px rgba(198,120,221,0.8),0 0 22px rgba(198,120,221,0.4)}
    50%{box-shadow:0 0 18px rgba(198,120,221,1),0 0 36px rgba(198,120,221,0.6)}
  }
  @keyframes adRing {
    0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.5);opacity:0}
  }

  /* ═══════════════════════════════════
     TIMELINE CARDS
  ═══════════════════════════════════ */
  .cards-timeline {
    position: relative;
    padding-left: 22px;
  }
  .cards-timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 20px; bottom: 20px;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(198,120,221,0.4) 15%,
      rgba(198,120,221,0.2) 85%,
      transparent 100%
    );
  }

  .intro-card {
    position: relative;
    background: rgba(255,255,255,0.018);
    border: 1px solid rgba(198,120,221,0.1);
    border-radius: 16px;
    padding: 18px 22px 18px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: default;
    transition:
      transform 0.4s cubic-bezier(0.22,1,0.36,1),
      background 0.35s ease,
      border-color 0.35s ease,
      box-shadow 0.4s ease;
    animation: cardSlide 0.7s cubic-bezier(0.22,1,0.36,1) both;
    overflow: hidden;
    backdrop-filter: blur(6px);
  }
  .intro-card:nth-child(1){animation-delay:0.1s}
  .intro-card:nth-child(2){animation-delay:0.22s}
  .intro-card:nth-child(3){animation-delay:0.34s}
  .intro-card:nth-child(4){animation-delay:0.46s}
  .intro-card:nth-child(5){animation-delay:0.58s}
  @keyframes cardSlide {
    from{opacity:0;transform:translateX(-28px) rotateY(4deg)}
    to{opacity:1;transform:translateX(0) rotateY(0deg)}
  }

  /* Timeline dot */
  .intro-card::before {
    content: '';
    position: absolute;
    left: -27px;
    top: 50%; transform: translateY(-50%);
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(198,120,221,0.25);
    border: 1px solid rgba(198,120,221,0.5);
    transition: all 0.3s ease;
  }
  .intro-card:hover::before {
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.7), 0 0 0 4px rgba(198,120,221,0.1);
  }

  /* Shimmer */
  .intro-card::after {
    content: '';
    position: absolute;
    top:0; left:-120%;
    width:60%; height:100%;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.05), transparent);
    transition: left 0.6s ease;
    pointer-events: none;
  }
  .intro-card:hover::after { left:160%; }

  .intro-card:hover {
    background: rgba(198,120,221,0.06);
    border-color: rgba(198,120,221,0.32);
    transform: translateX(10px) translateY(-2px);
    box-shadow: 0 10px 40px rgba(198,120,221,0.1), 0 2px 10px rgba(0,0,0,0.3);
  }

  /* Left bar */
  .card-bar {
    position: absolute;
    left:0; top:15%; bottom:15%;
    width: 2px;
    background: linear-gradient(180deg, transparent, #c678dd, transparent);
    border-radius: 2px;
    opacity: 0;
    box-shadow: 0 0 10px rgba(198,120,221,0.9);
    transition: opacity 0.3s ease, top 0.3s ease, bottom 0.3s ease;
  }
  .intro-card:hover .card-bar { opacity:1; top:5%; bottom:5%; }

  /* Icon */
  .card-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    background: rgba(198,120,221,0.07);
    border: 1px solid rgba(198,120,221,0.18);
    display: flex; align-items:center; justify-content:center;
    font-size: 1.2em;
    flex-shrink: 0;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
  }
  .intro-card:hover .card-icon {
    background: rgba(198,120,221,0.14);
    border-color: rgba(198,120,221,0.5);
    box-shadow: 0 0 18px rgba(198,120,221,0.25);
    transform: scale(1.12) rotate(-8deg);
  }

  /* Text */
  .card-body-text {
    margin: 0 !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.95em !important;
    line-height: 1.75 !important;
    font-weight: 400 !important;
    color: rgba(255,255,255,0.68) !important;
    transition: color 0.3s ease;
  }
  .intro-card:hover .card-body-text { color: rgba(255,255,255,0.9) !important; }

  .chip {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 0.66em;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 1px 9px;
    border-radius: 20px;
    margin-left: 6px;
    vertical-align: middle;
    background: rgba(198,120,221,0.1);
    border: 1px solid rgba(198,120,221,0.25);
    color: #c678dd;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }
  .intro-card:hover .chip {
    background: rgba(198,120,221,0.2);
    border-color: rgba(198,120,221,0.55);
    box-shadow: 0 0 10px rgba(198,120,221,0.2);
  }

  /* ═══════════════════════════════════
     AVATAR
  ═══════════════════════════════════ */
  .myAvtar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }

  .avatar-outer {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  /* Glow */
  .avatar-glow {
    position: absolute;
    inset: -55px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(198,120,221,0.22) 0%, transparent 65%);
    filter: blur(20px);
    animation: avGlowPulse 4s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes avGlowPulse {
    0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)}
  }

  /* Plasma rings */
  .avatar-ring {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .avatar-ring-1 {
    inset: -18px;
    background: conic-gradient(
      rgba(198,120,221,0.7) 0deg,
      rgba(198,120,221,0.05) 90deg,
      rgba(198,120,221,0.6) 180deg,
      rgba(198,120,221,0.05) 270deg,
      rgba(198,120,221,0.7) 360deg
    );
    animation: avRingSpin 8s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
    filter: blur(0.5px);
  }
  .avatar-ring-2 {
    inset: -32px;
    background: conic-gradient(
      transparent 0deg,
      rgba(198,120,221,0.3) 120deg,
      transparent 180deg,
      rgba(198,120,221,0.3) 300deg,
      transparent 360deg
    );
    animation: avRingSpin 12s linear infinite reverse;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px));
  }
  .avatar-ring-3 {
    inset: -50px;
    background: conic-gradient(
      rgba(198,120,221,0.12) 0deg,
      transparent 60deg,
      rgba(198,120,221,0.18) 180deg,
      transparent 240deg,
      rgba(198,120,221,0.12) 360deg
    );
    animation: avRingSpin 20s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px));
  }
  @keyframes avRingSpin {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }

  /* Orbiting dots */
  .avatar-orbit {
    position: absolute;
    inset: -60px;
    border-radius: 50%;
    pointer-events: none;
    animation: avOrbitSpin 10s linear infinite;
  }
  .avatar-orbit::before {
    content:'';
    position:absolute;
    top:8px; left:50%;
    transform:translateX(-50%);
    width:7px; height:7px;
    border-radius:50%;
    background:#c678dd;
    box-shadow:0 0 10px rgba(198,120,221,0.9),0 0 20px rgba(198,120,221,0.5);
  }
  .avatar-orbit-2 {
    animation-duration:16s;
    animation-direction:reverse;
    inset:-45px;
  }
  .avatar-orbit-2::before {
    width:5px; height:5px;
    top:auto; bottom:5px;
    background:rgba(198,120,221,0.6);
    box-shadow:0 0 8px rgba(198,120,221,0.6);
  }
  @keyframes avOrbitSpin {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }

  /* Photo */
  .avatar-photo {
    border-radius: 50%;
    border: 3px solid rgba(198,120,221,0.45) !important;
    box-shadow:
      0 0 30px rgba(198,120,221,0.2),
      0 0 60px rgba(198,120,221,0.1);
    position: relative;
    z-index: 2;
    display: block !important;
    max-width: 290px;
    width: 100%;
    transition: box-shadow 0.4s ease;
    animation: avReveal 1s cubic-bezier(0.22,1,0.36,1) 0.4s both;
  }
  @keyframes avReveal {
    from{opacity:0;transform:scale(0.85) rotate(-4deg)}
    to{opacity:1;transform:scale(1) rotate(0deg)}
  }
  .avatar-outer:hover .avatar-photo {
    box-shadow:0 0 50px rgba(198,120,221,0.4),0 0 90px rgba(198,120,221,0.2);
  }

  /* Name tag */
  .avatar-nametag {
    margin-top: 24px;
    text-align: center;
  }
  .avatar-nametag-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1em;
    color: #fff;
    letter-spacing: 0.5px;
    display: block;
  }
  .avatar-nametag-role {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.6);
    display: block;
    margin-top: 4px;
  }
`;

function Home2() {
  useEffect(() => {
    if (!document.getElementById("home2-v4-styles")) {
      const tag = document.createElement("style");
      tag.id = "home2-v4-styles";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("home2-v4-styles")?.remove();
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <div className="h2-blob h2-blob-1" />
      <div className="h2-blob h2-blob-2" />

      <Container>
        <Row className="align-items-center">
          {/* TEXT */}
          <Col md={8} className="home-about-description">
            <h1 className="intro-title">
              LET ME <span style={{ color: "#c678dd" }}>INTRODUCE</span> MYSELF
            </h1>

            <div className="intro-accent">
              <div className="accent-line" />
              <div className="accent-dot" />
              <div className="accent-line2" />
            </div>

            <div className="home-about-body cards-timeline">
              <div className="intro-card">
                <div className="card-bar" />
                <div className="card-icon">🎓</div>
                <p className="card-body-text">
                  B.Tech Computer Science graduate from VIT with a deep passion
                  for growth, strategy, and the psychology behind decisions that
                  drive real results.
                </p>
              </div>

              <div className="intro-card">
                <div className="card-bar" />
                <div className="card-icon">📈</div>
                <p className="card-body-text">
                  I work with <span style={{ color: "#c678dd" }}>brands</span>
                  <span className="chip">Marketing</span> to build sharper
                  strategies, improve their positioning, and directly increase
                  sales through psychology-driven execution.
                </p>
              </div>

              <div className="intro-card">
                <div className="card-bar" />
                <div className="card-icon">🎥</div>
                <p className="card-body-text">
                  I work with{" "}
                  <span style={{ color: "#c678dd" }}>
                    creators &amp; influencers
                  </span>
                  <span className="chip">Collabs</span> to help them land
                  consistent brand deals and turn their audience into a reliable
                  source of income.
                </p>
              </div>

              <div className="intro-card">
                <div className="card-bar" />
                <div className="card-icon">🤖</div>
                <p className="card-body-text">
                  I help individuals and teams apply{" "}
                  <span style={{ color: "#c678dd" }}>
                    Artificial Intelligence
                  </span>
                  <span className="chip">AI</span> in real-world ways — so they
                  can save time, work smarter, and stay ahead.
                </p>
              </div>

              <div className="intro-card">
                <div className="card-bar" />
                <div className="card-icon">⚡</div>
                <p className="card-body-text">
                  Growth is not accidental. It is engineered through{" "}
                  <span style={{ color: "#c678dd" }}>clarity</span>, psychology,
                  and disciplined execution.
                </p>
              </div>
            </div>
          </Col>

          {/* AVATAR */}
          <Col md={4} className="myAvtar">
            <div>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#c678dd"
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
              >
                <div className="avatar-outer">
                  <div className="avatar-glow" />
                  <div className="avatar-ring avatar-ring-1" />
                  <div className="avatar-ring avatar-ring-2" />
                  <div className="avatar-ring avatar-ring-3" />
                  <div className="avatar-orbit" />
                  <div className="avatar-orbit avatar-orbit-2" />
                  <img
                    src={myImg}
                    className="img-fluid avatar-photo"
                    alt="Siddhant Garg"
                  />
                </div>
              </Tilt>

              <div className="avatar-nametag">
                <span className="avatar-nametag-name">Siddhant Garg</span>
                <span className="avatar-nametag-role">Growth Strategist</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
