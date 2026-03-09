import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreativeCard from "./CreativeCard";
import creativeProjects from "./CreativeData";

function CreativeLab() {

    return (

        <Container fluid className="project-section">

            <Container>

                <h1 className="project-heading">
                    Strategic <strong className="purple">Visual Lab</strong>
                </h1>

                <p style={{ color: "white", textAlign: "center" }}>
                    A curated collection of concept visuals exploring behavioral
                    psychology, brand thinking and digital systems.
                </p>

                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

                    {creativeProjects.map((project, index) => (

                        <Col md={4} className="project-card" key={index}>

                            <CreativeCard
                                title={project.title}
                                description={project.description}
                                images={project.images}
                            />

                        </Col>

                    ))}

                </Row>

            </Container>

        </Container>

    );
}

export default CreativeLab;