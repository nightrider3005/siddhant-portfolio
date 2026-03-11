import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import ourioutImg from "../../Assets/Projects/ouriout.png";
import arogyamImg from "../../Assets/Projects/arogyam.png";
import vendorImg from "../../Assets/Projects/vendor.png";

const sectionStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .project-section {
    position: relative;
    padding: 80px 0 60px !important;
    min-height: 100vh;
    overflow: hidden;
  }

  /* Ambient background glows */
  .project-section::before {
    content: '';
    position: absolute;
    top: -100px; left: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(198,120,221,0.07) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: bgDrift1 14s ease-in-out infinite;
  }
  .project-section::after {
    content: '';
    position: absolute;
    bottom: -80px; right: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(198,120,221,0.05) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: bgDrift2 18s ease-in-out infinite;
  }
  @keyframes bgDrift1 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)}
  }
  @keyframes bgDrift2 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-25px)}
  }

  .project-section .container { position: relative; z-index: 1; }

  /* HEADING */
  .project-heading {
    font-family: 'Outfit', sans-serif !important;
    font-size: 2.8em !important;
    font-weight: 800 !important;
    color: #fff !important;
    text-align: center !important;
    letter-spacing: -0.5px;
    margin-bottom: 14px !important;
    animation: headDrop 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes headDrop {
    from { opacity: 0; transform: translateY(-24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Subtitle */
  .project-subtitle {
    font-family: 'Outfit', sans-serif;
    font-size: 1em;
    color: rgba(255,255,255,0.52);
    text-align: center;
    margin-bottom: 10px;
    animation: fadeUp 0.8s ease 0.2s both;
  }

  /* Decorative divider */
  .project-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 50px;
    animation: fadeUp 0.8s ease 0.3s both;
  }
  .project-divider span:nth-child(1),
  .project-divider span:nth-child(3) {
    display: block;
    height: 1px;
    width: 60px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.6));
  }
  .project-divider span:nth-child(3) {
    background: linear-gradient(90deg, rgba(198,120,221,0.6), transparent);
  }
  .project-divider span:nth-child(2) {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.8), 0 0 24px rgba(198,120,221,0.4);
    animation: dotPulse 2s ease-in-out infinite;
  }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 12px rgba(198,120,221,0.8), 0 0 24px rgba(198,120,221,0.4); }
    50%     { box-shadow: 0 0 18px rgba(198,120,221,1),   0 0 36px rgba(198,120,221,0.6); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Cards row gap */
  .project-cards-row {
    row-gap: 28px;
  }

  /* Column height fix */
  .project-card-col {
    display: flex;
    flex-direction: column;
  }

  /* Bottom CTA text */
  .project-footer-note {
    font-family: 'Outfit', sans-serif;
    text-align: center;
    color: rgba(255,255,255,0.3);
    font-size: 0.82em;
    margin-top: 40px;
    letter-spacing: 0.5px;
    animation: fadeUp 0.8s ease 0.6s both;
  }
  .project-footer-note span {
    color: #c678dd;
    cursor: pointer;
  }
`;

function Projects() {
  useEffect(() => {
    if (!document.getElementById("projects-v2-styles")) {
      const tag = document.createElement("style");
      tag.id = "projects-v2-styles";
      tag.innerHTML = sectionStyles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("projects-v2-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Strategic <strong className="purple">Projects</strong>
        </h1>

        <p className="project-subtitle">
          A curated portfolio of problem-solving initiatives focused on growth,
          clarity and measurable business impact.
        </p>

        <div className="project-divider">
          <span />
          <span />
          <span />
        </div>

        <Row className="project-cards-row" style={{ justifyContent: "center" }}>
          <Col md={4} className="project-card-col">
            <ProjectCard
              imgPath={ourioutImg}
              badge="01 · Founder"
              title="OURi.OUT"
              tags={["Branding", "Growth", "Strategy"]}
              shortDescription="Founded OURi.OUT to build identity driven branding that earns trust and long term attention in a fast swiping digital culture."
              demoLink="https://www.ouriout.com"
              fullDescription={
                <>
                  <h5>The Core Problem</h5>
                  <p>
                    In today's digital world, brands are judged within seconds.
                    The culture of constant swiping reduces authentic
                    positioning. Talented individuals struggle to stand out
                    because their identity is not strategically structured.
                  </p>

                  <h5>The Vision</h5>
                  <p>
                    OURi.OUT was created to solve this perception gap by
                    building strong, clear and authority driven brand
                    positioning that captures attention beyond the first glance.
                  </p>

                  <h5>My Role as Founder</h5>
                  <p>
                    • Conceptualized and built the complete brand identity from
                    scratch
                  </p>
                  <p>
                    • Designed positioning framework and communication strategy
                  </p>
                  <p>
                    • Executed LinkedIn outreach generating 40+ qualified leads
                  </p>
                  <p>
                    • Scaled social media visibility by over 200% during early
                    growth phase
                  </p>
                  <p>
                    • Built digital infrastructure and optimized user
                    communication flow
                  </p>

                  <h5>Growth and Impact</h5>
                  <p>
                    Rapid early stage traction, measurable inbound interest,
                    strong trust building and credible authority positioning
                    within a short time frame.
                  </p>
                </>
              }
            />
          </Col>

          <Col md={4} className="project-card-col">
            <ProjectCard
              imgPath={arogyamImg}
              badge="02 · Product"
              title="Arogyam"
              tags={["AI", "Healthcare", "React"]}
              shortDescription="AI enabled healthcare platform designed to simplify early symptom understanding through intelligent conversational support."
              fullDescription={
                <>
                  <h5>The Problem</h5>
                  <p>
                    Many individuals ignore early symptoms due to confusion,
                    scattered information and lack of structured guidance —
                    delaying decisions and creating anxiety.
                  </p>

                  <h5>The Idea</h5>
                  <p>
                    Arogyam provides instant, structured and easy to understand
                    symptom support through an AI powered conversational
                    interface.
                  </p>

                  <h5>My Contribution</h5>
                  <p>
                    • Conceptualized the product vision with focus on
                    accessibility
                  </p>
                  <p>• Designed complete user experience flow</p>
                  <p>• Built frontend architecture using React and Next.js</p>
                  <p>• Integrated conversational AI workflows</p>
                  <p>
                    • Ensured smooth performance and intuitive interaction
                    design
                  </p>

                  <h5>Impact</h5>
                  <p>
                    Transformed complex symptom queries into structured guidance
                    and demonstrated ability to combine product thinking with
                    execution.
                  </p>
                </>
              }
            />
          </Col>

          <Col md={4} className="project-card-col">
            <ProjectCard
              imgPath={vendorImg}
              badge="03 · Analytics"
              title="Vendor Performance Analysis"
              tags={["Data", "Analytics", "Business"]}
              shortDescription="Business focused analytics project designed to improve vendor evaluation through structured performance insights."
              fullDescription={
                <>
                  <h5>The Problem</h5>
                  <p>
                    Organizations often continue vendor partnerships without
                    structured evaluation. Decisions are influenced by habit
                    rather than measurable insight.
                  </p>

                  <h5>The Objective</h5>
                  <p>
                    To create a clear vendor performance evaluation framework
                    that supports smarter business decisions.
                  </p>

                  <h5>My Contribution</h5>
                  <p>• Analyzed 10,000+ vendor transaction records</p>
                  <p>
                    • Identified cost inconsistencies and delivery
                    inefficiencies
                  </p>
                  <p>
                    • Segmented vendors based on reliability and contribution
                  </p>
                  <p>• Designed visual dashboards for management clarity</p>
                  <p>• Converted raw data into actionable recommendations</p>

                  <h5>Impact</h5>
                  <p>
                    Enabled structured vendor comparison and improved decision
                    making clarity aligned with business outcomes.
                  </p>
                </>
              }
            />
          </Col>
        </Row>

        <p className="project-footer-note">
          Click any card to explore the full case study ✦
        </p>
      </Container>
    </Container>
  );
}

export default Projects;
