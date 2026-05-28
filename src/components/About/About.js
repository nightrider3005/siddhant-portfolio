import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";

const aboutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .about-section {
    position: relative;
    padding: 80px 0 40px !important;
    overflow: hidden;
  }

  /* Ambient glows */
  .about-section::before {
    content: '';
    position: absolute;
    top: -120px; left: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(198,120,221,0.07) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: aDrift1 14s ease-in-out infinite;
  }
  .about-section::after {
    content: '';
    position: absolute;
    bottom: 0; right: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(198,120,221,0.05) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: aDrift2 18s ease-in-out infinite;
  }
  @keyframes aDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)} }
  @keyframes aDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-30px)} }

  .about-section .container { position: relative; z-index: 1; }

  /* Page heading */
  .sg-about-heading {
    font-family: 'Outfit', sans-serif !important;
    font-size: 2.6em !important;
    font-weight: 800 !important;
    color: #fff !important;
    padding-bottom: 16px !important;
    letter-spacing: -0.3px;
    animation: aHeadIn 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes aHeadIn {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Section headings (Core Expertise, Tools) */
  .sg-section-heading {
    font-family: 'Outfit', sans-serif !important;
    font-size: 2em !important;
    font-weight: 700 !important;
    color: #fff !important;
    text-align: center !important;
    margin-bottom: 10px !important;
    letter-spacing: -0.2px;
  }

  /* Divider used under each section heading */
  .sg-section-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 36px;
  }
  .sg-section-divider span:nth-child(1),
  .sg-section-divider span:nth-child(3) {
    display: block; height: 1px; width: 55px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.6));
  }
  .sg-section-divider span:nth-child(3) {
    background: linear-gradient(90deg, rgba(198,120,221,0.6), transparent);
  }
  .sg-section-divider span:nth-child(2) {
    width: 7px; height: 7px; border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.9), 0 0 24px rgba(198,120,221,0.4);
    animation: sDotPulse 2s ease-in-out infinite;
  }
  @keyframes sDotPulse {
    0%,100%{box-shadow:0 0 12px rgba(198,120,221,0.9),0 0 24px rgba(198,120,221,0.4)}
    50%    {box-shadow:0 0 20px rgba(198,120,221,1),  0 0 40px rgba(198,120,221,0.6)}
  }

  /* Laptop image */
  .about-img img {
    filter: drop-shadow(0 10px 40px rgba(198,120,221,0.15));
    transition: filter 0.4s ease, transform 0.4s ease;
    animation: imgFloatIn 1s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }
  @keyframes imgFloatIn {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .about-img img:hover {
    filter: drop-shadow(0 14px 50px rgba(198,120,221,0.28));
    transform: translateY(-6px);
  }

  /* Section separator */
  .sg-section-sep {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.15), transparent);
    margin: 20px 0 50px;
  }
`;

function About() {
  useEffect(() => {
    if (!document.getElementById("sg-about-styles")) {
      const tag = document.createElement("style");
      tag.id = "sg-about-styles";
      tag.innerHTML = aboutStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("sg-about-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <Particle />
      <Container fluid className="about-section">
        <Container>
          {/* Top: AboutCard + Laptop */}
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <h1 className="sg-about-heading">
                Know Who <strong className="purple">I'M</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "100px", paddingBottom: "50px" }}
              className="about-img"
            >
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Col>
          </Row>

          <div className="sg-section-sep" />

          {/* Core Expertise */}
          <h1 className="sg-section-heading">
            Core <strong className="purple">Expertise</strong>
          </h1>
          <div className="sg-section-divider">
            <span />
            <span />
            <span />
          </div>
          <Techstack />

          <div className="sg-section-sep" />

          {/* Tools */}
          <h1 className="sg-section-heading">
            <strong className="purple">Tools</strong> I Use
          </h1>
          <div className="sg-section-divider">
            <span />
            <span />
            <span />
          </div>
          <Toolstack />

          <div className="sg-section-sep" />

          {/* Execution stats */}
          <Github />
        </Container>
      </Container>
    </>
  );
}

export default About;
