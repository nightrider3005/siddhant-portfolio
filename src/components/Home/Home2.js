import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">

          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple">INTRODUCE</span> MYSELF
            </h1>

            <div className="home-about-body">

              <p>
                I am a B.Tech Computer Science graduate from VIT with a strong
                interest in building and scaling brands through structured
                strategy and psychological insight.
              </p>

              <p>
                Over the last four years, I have combined technical knowledge
                with growth-driven thinking to understand how digital systems,
                user behavior, and positioning intersect.
              </p>

              <p>
                I am deeply interested in behavioral psychology and how it
                influences decision-making, communication, and brand
                perception.
              </p>

              <p>
                I contributed significantly to shaping and expanding{" "}
                <span className="purple">OURi.OUT</span> by working on
                strategic positioning, execution systems, and structured growth
                initiatives.
              </p>

              <p>
                I believe growth is not accidental. It is engineered through
                clarity, psychology, and disciplined execution.
              </p>

            </div>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Home2;