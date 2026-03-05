import React from "react";
import { Col, Row } from "react-bootstrap";
import macOs from "../../Assets/TechIcons/Apple MacOSX.svg";
import chrome from "../../Assets/TechIcons/Google Chrome.svg";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import canva from "../../Assets/TechIcons/Canva.svg";
import chatgpt from "../../Assets/TechIcons/chatgpt.svg";
import photoshop from "../../Assets/TechIcons/Photoshop.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={macOs} alt="macOs" className="tech-icon-images" />
        <div className="tech-icons-text">Mac Os</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={canva} alt="canva" className="tech-icon-images" />
        <div className="tech-icons-text">Canva</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={photoshop} alt="Photoshop" className="tech-icon-images" />
        <div className="tech-icons-text">Photoshop</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={chatgpt} alt="chatgpt" className="tech-icon-images" />
        <div className="tech-icons-text">Chatgpt</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={chrome} alt="Chrome" className="tech-icon-images" />
        <div className="tech-icons-text">Google Chrome</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={vsCode} alt="vscode" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>
    </Row>
  );
}

export default Toolstack;