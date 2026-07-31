import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Strategically Built by SG</h3>
          <p className="hand-marker" style={{
            fontSize: "0.95em",
            color: "rgba(255,255,255,0.3)",
            margin: "4px 0 0",
            fontWeight: 600,
            letterSpacing: "0.2px"
          }}>
            Built with AI tools + a lot of manual taste ✦
          </p>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} Siddhant Garg</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="mailto:siddhantgarg563@gmail.com"
                style={{ color: "white" }}
                title="Email"
              >
                <FaEnvelope />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/siddhant-garg-979378249?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
