import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import ourioutImg from "../../Assets/Projects/ouriout.png";
import arogyamImg from "../../Assets/Projects/arogyam.png";
import vendorImg from "../../Assets/Projects/vendor.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>

        <h1 className="project-heading">
          Strategic <strong className="purple">Projects</strong>
        </h1>

        <p style={{ color: "white", textAlign: "center" }}>
          A curated portfolio of problem solving initiatives focused on growth,
          clarity and measurable business impact.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          {/* PROJECT 1 — OURi.OUT */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ourioutImg}
              title="OURi.OUT"
              shortDescription="Founded OURi.OUT to build identity driven branding that earns trust and long term attention in a fast swiping digital culture."
              demoLink="https://www.ouriout.com"
              fullDescription={
                <>
                  <h5>The Core Problem</h5>
                  <p>
                    In today’s digital world, brands and individuals are judged
                    within seconds. The culture of constant swiping reduces
                    attention span and weakens authentic positioning. Talented
                    individuals struggle to stand out because their identity is
                    not strategically structured.
                  </p>

                  <h5>The Vision</h5>
                  <p>
                    OURi.OUT was created to solve this perception gap by building
                    strong, clear and authority driven brand positioning that
                    captures attention beyond the first glance.
                  </p>

                  <h5>My Role as Founder</h5>
                  <p>
                    • Conceptualized and built the complete brand identity from scratch
                    • Designed positioning framework and communication strategy
                    • Led branding execution including messaging clarity and visual alignment
                    • Executed LinkedIn outreach strategy generating 40+ qualified leads
                    • Scaled social media visibility by over 200% during early growth phase
                    • Built digital infrastructure and optimized user communication flow
                  </p>

                  <h5>Growth and Impact</h5>
                  <p>
                    Rapid early stage traction, measurable inbound interest,
                    strong trust building and credible authority positioning
                    within a short time frame.
                  </p>

                  <p>
                    OURi.OUT reflects my entrepreneurial mindset, brand
                    intelligence and execution capability at a founder level.
                  </p>
                </>
              }
            />
          </Col>


          {/* PROJECT 2 — AROGYAM */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={arogyamImg}
              title="Arogyam"
              shortDescription="AI enabled healthcare platform designed to simplify early symptom understanding through intelligent conversational support."
              fullDescription={
                <>
                  <h5>The Problem</h5>
                  <p>
                    Many individuals ignore early symptoms due to confusion,
                    scattered information and lack of structured guidance.
                    This delays decisions and creates anxiety.
                  </p>

                  <h5>The Idea</h5>
                  <p>
                    Arogyam was created to provide instant, structured and easy
                    to understand symptom support through an AI powered
                    conversational interface.
                  </p>

                  <h5>My Contribution</h5>
                  <p>
                    • Conceptualized the product vision with focus on accessibility
                    • Designed complete user experience flow
                    • Built frontend architecture using React and Next.js
                    • Integrated conversational AI workflows
                    • Ensured smooth performance and intuitive interaction design
                  </p>

                  <h5>Impact</h5>
                  <p>
                    Transformed complex symptom queries into structured guidance
                    and demonstrated ability to combine product thinking with
                    execution.
                  </p>

                  <p>
                    This project reflects my capability to identify real world
                    problems and build scalable digital solutions.
                  </p>
                </>
              }
            />
          </Col>


          {/* PROJECT 3 — VENDOR PERFORMANCE */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vendorImg}
              title="Vendor Performance Data Analysis"
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
                  <p>
                    • Analyzed 10,000+ vendor transaction records
                    • Identified cost inconsistencies and delivery inefficiencies
                    • Segmented vendors based on reliability and contribution
                    • Designed visual dashboards for management clarity
                    • Converted raw data into actionable recommendations
                  </p>

                  <h5>Impact</h5>
                  <p>
                    Enabled structured vendor comparison and improved
                    decision making clarity aligned with business outcomes.
                  </p>

                  <p>
                    This project highlights analytical thinking combined with
                    strategic business perspective.
                  </p>
                </>
              }
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;