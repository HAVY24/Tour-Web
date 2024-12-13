import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slide2 from "../../../Slideshow/Slide2";
import TourSection from "./TourSection";

const Tour = () => {
  return (
    <div>
      <Slide2 />
      <Container>
        <Row>
          <Col className="col-12">
            <TourSection />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tour;
