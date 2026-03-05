import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I’m <span className="purple">Siddhant Garg</span> from{" "}
            <span className="purple">Gwalior, India</span>.
            <br />
            I am a <span className="purple">B.Tech Computer Science graduate</span> from{" "}
            <span className="purple">VIT</span> with a strong interest in growth strategy and brand building.
            <br />
            My academic foundation is technical, but my real strength lies in understanding markets, positioning, and consumer psychology.
            <br />
            <br />
            I played a key role in contributing to the growth and structuring of{" "}
            <span className="purple">OURi.OUT</span> by working on strategy, positioning, and execution systems.
            <br />
            <br />
            Outside of work, I constantly study behavioral psychology and strategic thinking to build brands that grow by design.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Studying Behavioral Psychology
            </li>
            <li className="about-activity">
              <ImPointRight /> Building Growth Systems
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring Brand Strategy and Positioning
            </li>
            <li className="about-activity">
              <ImPointRight /> Continuous Self Development
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Growth is engineered through clarity, psychology, and disciplined execution."{" "}
          </p>
          <footer className="blockquote-footer">Siddhant</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
