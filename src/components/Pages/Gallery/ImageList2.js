import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Imagelist2() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g10.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g11.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g12.jpeg`}
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
                src={`${distributionUrl}/Static/g13.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g14.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g15.jpeg`}
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
                src={`${distributionUrl}/Static/g16.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g17.jpeg`}
                rounded
                className="image"
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image
                src={`${distributionUrl}/Static/g18.jpeg`}
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
