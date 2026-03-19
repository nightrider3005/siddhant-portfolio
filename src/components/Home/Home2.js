import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  /* ════════════════════════════
     SECTION
  ════════════════════════════ */
  .home-about-section {
    position: relative;
    padding: 90px 0 80px !important;
    background: #070711;
    overflow: hidden;
  }
  .home-about-section::before {
    content:'';
    position:absolute;
    top:0; left:10%; right:10%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(198,120,221,0.4) 50%,transparent);
  }

  /* Orbs */
  .ha-orb {
    position:absolute; border-radius:50%;
    pointer-events:none; filter:blur(90px); z-index:0;
  }
  .ha-orb-1 {
    width:420px; height:420px;
    left:-120px; top:50%; transform:translateY(-50%);
    background:radial-gradient(circle, rgba(198,120,221,0.065) 0%, transparent 70%);
    animation:haO1 18s ease-in-out infinite;
  }
  .ha-orb-2 {
    width:320px; height:320px;
    right:-80px; bottom:0;
    background:radial-gradient(circle, rgba(100,80,200,0.055) 0%, transparent 70%);
    animation:haO2 22s ease-in-out infinite;
  }
  @keyframes haO1{0%,100%{transform:translateY(-50%)}50%{transform:translateY(-58%)}}
  @keyframes haO2{0%,100%{transform:translate(0,0)}50%{transform:translate(-28px,-35px)}}

  .home-about-section .container { position:relative; z-index:1; }

  /* ════════════════════════════
     HEADING
  ════════════════════════════ */
  .intro-title {
    font-family: 'Syne', sans-serif !important;
    font-weight: 800 !important;
    font-size: clamp(1.7em, 3.2vw, 2.5em) !important;
    letter-spacing: -0.6px;
    color: #fff !important;
    margin: 0 0 0 0 !important;
    line-height: 1.1 !important;
    animation: haHeadIn 0.8s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes haHeadIn { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }

  /* Accent bar */
  .intro-accent {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 14px 0 26px;
  }
  .ia-line1 {
    height:2px; width:0;
    background:linear-gradient(90deg,#c678dd,rgba(198,120,221,0.15));
    border-radius:2px;
    animation:iaLine1 0.9s ease 0.4s forwards;
    box-shadow:0 0 8px rgba(198,120,221,0.35);
  }
  .ia-line2 {
    height:2px; width:0;
    background:linear-gradient(90deg,rgba(198,120,221,0.15),transparent);
    border-radius:2px;
    animation:iaLine2 0.9s ease 0.5s forwards;
  }
  .ia-dot {
    width:7px; height:7px; border-radius:50%; flex-shrink:0;
    background:#c678dd;
    box-shadow:0 0 9px rgba(198,120,221,0.8);
    animation:iaDot 2s ease-in-out infinite;
    position:relative;
  }
  .ia-dot::before {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:1px solid rgba(198,120,221,0.4);
    animation:iaRing 2s ease-out infinite;
  }
  @keyframes iaLine1{to{width:52px}}
  @keyframes iaLine2{to{width:22px}}
  @keyframes iaDot{0%,100%{box-shadow:0 0 9px rgba(198,120,221,0.8)}50%{box-shadow:0 0 16px rgba(198,120,221,1)}}
  @keyframes iaRing{0%{transform:scale(1);opacity:0.7}100%{transform:scale(2.5);opacity:0}}

  /* ════════════════════════════
     TIMELINE CARDS
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
    background:linear-gradient(180deg,transparent,rgba(198,120,221,0.32) 20%,rgba(198,120,221,0.18) 80%,transparent);
  }

  .intro-card {
    position: relative;
    background: rgba(255,255,255,0.018);
    border: 1px solid rgba(198,120,221,0.09);
    border-radius: 14px;
    padding: 15px 16px;
    display: flex;
    align-items: center;
    gap: 13px;
    overflow: hidden;
    backdrop-filter: blur(4px);
    cursor: default;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s, box-shadow 0.3s;
    animation: cardSlideIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
  }
  .intro-card:nth-child(1){animation-delay:0.07s}
  .intro-card:nth-child(2){animation-delay:0.16s}
  .intro-card:nth-child(3){animation-delay:0.25s}
  .intro-card:nth-child(4){animation-delay:0.34s}
  .intro-card:nth-child(5){animation-delay:0.43s}
  @keyframes cardSlideIn { from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }

  /* Timeline dot */
  .intro-card::before {
    content:'';
    position:absolute;
    left:-22px; top:50%; transform:translateY(-50%);
    width:7px; height:7px; border-radius:50%;
    background:rgba(198,120,221,0.2);
    border:1px solid rgba(198,120,221,0.42);
    transition:all 0.3s ease;
  }
  .intro-card:hover::before { background:#c678dd; box-shadow:0 0 9px rgba(198,120,221,0.65); }

  /* Shimmer */
  .intro-card::after {
    content:''; position:absolute;
    top:0; left:-110%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(198,120,221,0.04),transparent);
    transition:left 0.5s ease; pointer-events:none;
  }
  .intro-card:hover::after { left:145%; }

  /* Left bar */
  .card-bar {
    position:absolute; left:0; top:12%; bottom:12%;
    width:2px;
    background:linear-gradient(180deg,transparent,#c678dd,transparent);
    border-radius:2px; opacity:0;
    box-shadow:0 0 8px rgba(198,120,221,0.8);
    transition:opacity 0.3s;
  }
  .intro-card:hover .card-bar { opacity:1; }

  .intro-card:hover {
    background: rgba(198,120,221,0.05);
    border-color: rgba(198,120,221,0.26);
    transform: translateX(7px);
    box-shadow: 0 6px 28px rgba(198,120,221,0.07);
  }

  /* Icon */
  .card-icon {
    width:40px; height:40px; flex-shrink:0;
    border-radius:11px;
    background:rgba(198,120,221,0.07);
    border:1px solid rgba(198,120,221,0.17);
    display:flex; align-items:center; justify-content:center;
    font-size:1.1em;
    transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .intro-card:hover .card-icon {
    background:rgba(198,120,221,0.13);
    border-color:rgba(198,120,221,0.42);
    box-shadow:0 0 12px rgba(198,120,221,0.18);
    transform:scale(1.1) rotate(-7deg);
  }

  /* Text */
  .card-body-text {
    margin:0 !important;
    font-family:'Outfit',sans-serif !important;
    font-size:0.88em !important;
    line-height:1.68 !important;
    font-weight:400 !important;
    color:rgba(255,255,255,0.62) !important;
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
    background:rgba(198,120,221,0.09);
    border:1px solid rgba(198,120,221,0.22);
    color:#c678dd; text-transform:uppercase;
    transition:all 0.3s;
  }
  .intro-card:hover .chip {
    background:rgba(198,120,221,0.17);
    border-color:rgba(198,120,221,0.46);
  }

  /* ════════════════════════════
     AVATAR
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

  .av-glow {
    position:absolute; inset:-48px; border-radius:50%;
    background:radial-gradient(circle, rgba(198,120,221,0.18) 0%, transparent 65%);
    filter:blur(16px);
    animation:avGl 4s ease-in-out infinite; pointer-events:none;
  }
  @keyframes avGl{0%,100%{opacity:0.55;transform:scale(1)}50%{opacity:0.9;transform:scale(1.08)}}

  /* Plasma rings */
  .av-ring {
    position:absolute; border-radius:50%; pointer-events:none;
  }
  .av-ring-1 {
    inset:-14px;
    background:conic-gradient(rgba(198,120,221,0.65) 0deg,rgba(198,120,221,0.04) 90deg,rgba(198,120,221,0.55) 180deg,rgba(198,120,221,0.04) 270deg,rgba(198,120,221,0.65) 360deg);
    animation:avSpin 8s linear infinite;
    -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2px),black calc(100% - 2px));
    mask:radial-gradient(farthest-side,transparent calc(100% - 2px),black calc(100% - 2px));
  }
  .av-ring-2 {
    inset:-28px;
    background:conic-gradient(transparent 0deg,rgba(198,120,221,0.25) 120deg,transparent 200deg,rgba(198,120,221,0.22) 300deg,transparent 360deg);
    animation:avSpin 13s linear infinite reverse;
    -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 1px),black calc(100% - 1px));
    mask:radial-gradient(farthest-side,transparent calc(100% - 1px),black calc(100% - 1px));
  }
  .av-ring-3 {
    inset:-46px;
    background:conic-gradient(rgba(198,120,221,0.09) 0deg,transparent 70deg,rgba(198,120,221,0.11) 180deg,transparent 260deg,rgba(198,120,221,0.09) 360deg);
    animation:avSpin 22s linear infinite;
    -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 1px),black calc(100% - 1px));
    mask:radial-gradient(farthest-side,transparent calc(100% - 1px),black calc(100% - 1px));
  }
  @keyframes avSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

  /* Orbit dot */
  .av-orbit {
    position:absolute; inset:-52px; border-radius:50%;
    pointer-events:none;
    animation:avOrb 10s linear infinite;
  }
  .av-orbit::before {
    content:''; position:absolute;
    top:6px; left:50%; transform:translateX(-50%);
    width:6px; height:6px; border-radius:50%;
    background:#c678dd;
    box-shadow:0 0 9px rgba(198,120,221,0.9),0 0 18px rgba(198,120,221,0.5);
  }
  @keyframes avOrb{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

  /* Photo */
  .avatar-photo {
    border-radius:50%;
    border:3px solid rgba(198,120,221,0.38) !important;
    box-shadow:0 0 26px rgba(198,120,221,0.16),0 0 50px rgba(198,120,221,0.07);
    position:relative; z-index:2;
    display:block !important;
    max-width:270px; width:100%;
    transition:box-shadow 0.4s;
    animation:avReveal 1s cubic-bezier(0.22,1,0.36,1) 0.4s both;
  }
  @keyframes avReveal{from{opacity:0;transform:scale(0.87) rotate(-3deg)}to{opacity:1;transform:scale(1) rotate(0)}}
  .avatar-outer:hover .avatar-photo {
    box-shadow:0 0 40px rgba(198,120,221,0.32),0 0 72px rgba(198,120,221,0.14);
  }

  /* Nametag */
  .av-nametag { margin-top:18px; text-align:center; }
  .av-name {
    font-family:'Syne',sans-serif; font-weight:800;
    font-size:0.92em; color:#fff; display:block; letter-spacing:0.3px;
  }
  .av-role {
    font-family:'Outfit',sans-serif; font-size:0.66em; font-weight:600;
    letter-spacing:1.8px; text-transform:uppercase;
    color:rgba(198,120,221,0.52); display:block; margin-top:3px;
  }

  /* ════════════════════════════
     MOBILE ≤ 767px
  ════════════════════════════ */
  @media (max-width: 767px) {
    .home-about-section { padding: 70px 0 55px !important; }

    /* Avatar goes ABOVE cards on mobile */
    .ha-text-col  { order: 2 !important; }
    .ha-avatar-col{ order: 1 !important; padding-bottom: 36px; padding-top: 0; }

    .avatar-photo { max-width: 200px; }
    .av-ring-3 { display:none; }
    .av-orbit { inset: -42px; }

    .cards-timeline { padding-left: 13px; gap: 9px; }
    .intro-card { padding: 13px 13px; gap: 11px; }
    .intro-card::before { left:-18px; }
    .card-body-text { font-size: 0.86em !important; }
  }
`;

function Home2() {
  useEffect(() => {
    if (!document.getElementById("home2-v6-styles")) {
      const tag = document.createElement("style");
      tag.id = "home2-v6-styles";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("home2-v6-styles")?.remove();
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <div className="ha-orb ha-orb-1" />
      <div className="ha-orb ha-orb-2" />

      <Container>
        <Row className="align-items-center">
          {/* AVATAR — right on desktop, top on mobile via CSS order */}
          <Col md={4} className="myAvtar ha-avatar-col">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.07}
              glareColor="#c678dd"
              tiltMaxAngleX={9}
              tiltMaxAngleY={9}
            >
              <div className="avatar-outer">
                <div className="av-glow" />
                <div className="av-ring av-ring-1" />
                <div className="av-ring av-ring-2" />
                <div className="av-ring av-ring-3" />
                <div className="av-orbit" />
                <img
                  src={myImg}
                  className="img-fluid avatar-photo"
                  alt="Siddhant Garg"
                />
              </div>
            </Tilt>
            <div className="av-nametag">
              <span className="av-name">Siddhant Garg</span>
              <span className="av-role">Growth Strategist</span>
            </div>
          </Col>

          {/* TEXT */}
          <Col md={8} className="home-about-description ha-text-col">
            <h1 className="intro-title">
              LET ME <span style={{ color: "#c678dd" }}>INTRODUCE</span> MYSELF
            </h1>

            <div className="intro-accent">
              <div className="ia-line1" />
              <div className="ia-dot" />
              <div className="ia-line2" />
            </div>

            <div className="cards-timeline">
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
                  strategies, improve positioning, and directly increase sales
                  through psychology-driven execution.
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
                  <span className="chip">AI</span> in real-world ways — save
                  time, work smarter, and stay ahead.
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
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
