import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function ProjectCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="project-card-view" onClick={handleShow} style={{ cursor: "pointer" }}>
        <Card.Img variant="top" src={props.imgPath} alt="project-img" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "center" }}>
            {props.shortDescription}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* POPUP MODAL */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        contentClassName="custom-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ color: "white" }}>
          {props.fullDescription}
        </Modal.Body>

        <Modal.Footer>
          {props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
            >
              Live Demo
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;