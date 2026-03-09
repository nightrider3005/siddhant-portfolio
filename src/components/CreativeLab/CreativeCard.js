import React from "react";
import Card from "react-bootstrap/Card";

function CreativeCard({ title, description, images }) {
    return (
        <Card className="project-card-view">

            <Card.Img
                variant="top"
                src={images[0]}
                alt="creative work"
            />

            <Card.Body>

                <Card.Title>{title}</Card.Title>

                <Card.Text style={{ textAlign: "justify" }}>
                    {description}
                </Card.Text>

            </Card.Body>

        </Card>
    );
}

export default CreativeCard;