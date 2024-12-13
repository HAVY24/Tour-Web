import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Imagelist3() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g19.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g20.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g21.jpeg`}
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
                src={`${distributionUrl}/Static/g22.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g23.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g24.jpeg`}
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
                src={`${distributionUrl}/Static/g25.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g26.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g27.jpeg`}
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
