import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Imagelist1() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g1.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g2.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g3.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g4.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g5.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g6.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g7.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g8.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g9.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
