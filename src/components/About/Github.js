import React from "react";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "60px",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 className="project-heading pb-4" style={{ paddingBottom: "20px" }}>
        Execution & <strong className="purple">Discipline</strong>
      </h1>

      <p style={{ maxWidth: "700px", marginBottom: "40px" }}>
        Growth is not accidental. It is structured, measured, and executed consistently.
        Every initiative is built with long term positioning and psychological precision.
      </p>

      <div className="execution-grid">
        <div className="execution-card">
          <h2 className="purple">4+</h2>
          <p>Years of Structured Learning</p>
        </div>

        <div className="execution-card">
          <h2 className="purple">10+</h2>
          <p>Strategic Initiatives Built</p>
        </div>

        <div className="execution-card">
          <h2 className="purple">Multiple</h2>
          <p>Brand Growth Campaigns</p>
        </div>

        <div className="execution-card">
          <h2 className="purple">End to End</h2>
          <p>Systems Designed & Executed</p>
        </div>
      </div>
    </Row>
  );
}

export default Github;
