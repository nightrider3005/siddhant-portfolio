import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .home-about-section {
    position: relative;
    padding: 70px 0 !important;
    overflow: hidden;
  }

  /* Subtle star-like particles in background */
  .home-about-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(1px 1px at 20% 30%, rgba(198,120,221,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 70%, rgba(198,120,221,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.2) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 60%, rgba(198,120,221,0.3) 0%, transparent 100%),
      radial-gradient(600px 400px at 10% 20%, rgba(198,120,221,0.06) 0%, transparent 60%),
      radial-gradient(500px 400px at 90% 80%, rgba(198,120,221,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .home-about-section .container {
    position: relative;
    z-index: 1;
  }

  /* HEADING */
  .intro-title {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 800 !important;
    font-size: 2.6em !important;
    letter-spacing: -0.5px;
    color: #fff;
    animation: titleDrop 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
    margin-bottom: 6px !important;
  }

  @keyframes titleDrop {
    from { opacity: 0; transform: translateY(-30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Animated underline accent */
  .intro-accent {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 28px;
    animation: fadeIn 0.7s ease 0.3s both;
  }
  .accent-line {
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #c678dd, rgba(198,120,221,0.3));
    border-radius: 2px;
    animation: growLine 1s cubic-bezier(0.22,1,0.36,1) 0.4s forwards;
    box-shadow: 0 0 8px rgba(198,120,221,0.4);
  }
  .accent-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 10px rgba(198,120,221,0.8), 0 0 20px rgba(198,120,221,0.4);
    flex-shrink: 0;
    animation: pulse 2s ease-in-out infinite;
  }
  .accent-line2 {
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, rgba(198,120,221,0.3), transparent);
    border-radius: 2px;
    animation: growLine2 1s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
  }
  @keyframes growLine  { to { width: 55px; } }
  @keyframes growLine2 { to { width: 25px; } }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 10px rgba(198,120,221,0.8), 0 0 20px rgba(198,120,221,0.4); }
    50%      { box-shadow: 0 0 16px rgba(198,120,221,1),   0 0 32px rgba(198,120,221,0.6); }
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  /* CARDS */
  .intro-card {
    position: relative;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(198, 120, 221, 0.13);
    border-radius: 14px;
    padding: 15px 20px;
    margin-bottom: 11px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    cursor: default;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                background 0.35s ease,
                border-color 0.35s ease,
                box-shadow 0.35s ease;
    animation: cardSlide 0.65s cubic-bezier(0.22,1,0.36,1) both;
    overflow: hidden;
    backdrop-filter: blur(4px);
  }

  .intro-card:nth-child(1) { animation-delay: 0.15s; }
  .intro-card:nth-child(2) { animation-delay: 0.25s; }
  .intro-card:nth-child(3) { animation-delay: 0.35s; }
  .intro-card:nth-child(4) { animation-delay: 0.45s; }
  .intro-card:nth-child(5) { animation-delay: 0.55s; }

  @keyframes cardSlide {
    from { opacity: 0; transform: translateX(-22px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Shimmer sweep on hover */
  .intro-card::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 55%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(198,120,221,0.07),
      transparent
    );
    transition: left 0.55s ease;
    pointer-events: none;
  }
  .intro-card:hover::after { left: 160%; }

  /* Top glow border */
  .intro-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.7), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    box-shadow: 0 0 8px rgba(198,120,221,0.5);
  }

  .intro-card:hover {
    background: rgba(198, 120, 221, 0.07);
    border-color: rgba(198, 120, 221, 0.38);
    transform: translateX(8px) translateY(-2px);
    box-shadow:
      0 8px 32px rgba(198,120,221,0.12),
      0 2px 8px rgba(0,0,0,0.3),
      inset 0 0 20px rgba(198,120,221,0.03);
  }
  .intro-card:hover::before { opacity: 1; }

  /* Left accent bar */
  .card-bar {
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 2px;
    background: linear-gradient(180deg, transparent, #c678dd, transparent);
    border-radius: 2px;
    opacity: 0;
    box-shadow: 0 0 8px rgba(198,120,221,0.8);
    transition: opacity 0.3s ease, top 0.3s ease, bottom 0.3s ease;
  }
  .intro-card:hover .card-bar {
    opacity: 1;
    top: 8%; bottom: 8%;
  }

  /* Icon box */
  .card-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(198,120,221,0.08);
    border: 1px solid rgba(198,120,221,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15em;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    box-shadow: inset 0 0 10px rgba(198,120,221,0.05);
  }
  .intro-card:hover .card-icon {
    background: rgba(198,120,221,0.16);
    border-color: rgba(198,120,221,0.5);
    box-shadow: 0 0 16px rgba(198,120,221,0.25),
                inset 0 0 10px rgba(198,120,221,0.1);
    transform: scale(1.1) rotate(-6deg);
  }

  /* Card text */
  .card-body-text {
    margin: 0 !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.95em !important;
    line-height: 1.75 !important;
    font-weight: 400 !important;
    color: rgba(255,255,255,0.72) !important;
    transition: color 0.3s ease;
  }
  .intro-card:hover .card-body-text { color: rgba(255,255,255,0.9) !important; }

  .chip {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em;
    font-weight: 600;
    letter-spacing: 0.8px;
    padding: 1px 9px;
    border-radius: 20px;
    margin-left: 6px;
    vertical-align: middle;
    background: rgba(198,120,221,0.12);
    border: 1px solid rgba(198,120,221,0.28);
    color: #c678dd;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }
  .intro-card:hover .chip {
    background: rgba(198,120,221,0.2);
    border-color: rgba(198,120,221,0.5);
    box-shadow: 0 0 8px rgba(198,120,221,0.2);
  }

  /* AVATAR */
  .myAvtar {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-wrapper {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  /* Outer glow ring */
  .avatar-wrapper::before {
    content: '';
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    background: conic-gradient(
      rgba(198,120,221,0.6),
      rgba(198,120,221,0.1),
      rgba(198,120,221,0.6),
      rgba(198,120,221,0.05),
      rgba(198,120,221,0.6)
    );
    animation: spinRing 8s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
    opacity: 0.7;
  }

  /* Inner glow pulse */
  .avatar-wrapper::after {
    content: '';
    position: absolute;
    inset: -40px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(198,120,221,0.2) 0%, transparent 65%);
    animation: avatarPulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes avatarPulse {
    0%,100% { opacity: 0.5; transform: scale(1); }
    50%     { opacity: 1;   transform: scale(1.08); }
  }

  .avatar-wrapper img {
    border-radius: 50%;
    border: 3px solid rgba(198,120,221,0.4) !important;
    box-shadow:
      0 0 25px rgba(198,120,221,0.2),
      0 0 50px rgba(198,120,221,0.1);
    position: relative;
    z-index: 1;
    transition: box-shadow 0.4s ease;
    display: block !important;
    max-width: 300px;
    width: 100%;
  }

  .avatar-wrapper:hover img {
    box-shadow:
      0 0 35px rgba(198,120,221,0.4),
      0 0 70px rgba(198,120,221,0.2);
  }
`;

function Home2() {
  useEffect(() => {
    if (!document.getElementById("home2-v3-styles")) {
      const tag = document.createElement("style");
      tag.id = "home2-v3-styles";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("home2-v3-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={8} className="home-about-description">
            <h1 className="intro-title">
              LET ME <span className="purple">INTRODUCE</span> MYSELF
            </h1>

            <div className="intro-accent">
              <div className="accent-line" />
              <div className="accent-dot" />
              <div className="accent-line2" />
            </div>

            <div className="home-about-body">
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
                  I work with <span className="purple">brands</span>
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
                  <span className="purple">creators & influencers</span>
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
                  <span className="purple">Artificial Intelligence</span>
                  <span className="chip">AI</span> in real-world ways — so they
                  can save time, work smarter, and stay ahead.
                </p>
              </div>

              <div className="intro-card">
                <div className="card-bar" />
                <div className="card-icon">⚡</div>
                <p className="card-body-text">
                  Growth is not accidental. It is engineered through{" "}
                  <span className="purple">clarity</span>, psychology, and
                  disciplined execution.
                </p>
              </div>
            </div>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.08}
              glareColor="#c678dd"
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
            >
              <div className="avatar-wrapper">
                <img src={myImg} className="img-fluid" alt="avatar" />
              </div>
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
