import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="about-card">
      <Card.Body>

        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-title">system_profile</span>
        </div>

        <div className="terminal-body">

          <p><span className="terminal-key">Name</span> : Siddhant Garg</p>
          <p><span className="terminal-key">Location</span> : Gwalior, India</p>
          <p><span className="terminal-key">Background</span> : B.Tech Computer Science — VIT</p>

          <p><span className="terminal-key">Focus</span> : Growth Strategy</p>
          <p><span className="terminal-key">Edge</span> : Consumer Psychology</p>
          <p><span className="terminal-key">Approach</span> : Systems Thinking</p>

          <p>
            <span className="terminal-key">Current Work</span> :
            Structuring growth systems and strategic positioning for
            <span className="purple"> OURi.OUT</span>
          </p>

          <p className="terminal-quote">
            "Growth is engineered through clarity, psychology and execution."
          </p>

        </div>

      </Card.Body>
    </Card>
  );
}

export default AboutCard;