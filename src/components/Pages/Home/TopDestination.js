import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../../styles/styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function TopDestination() {
  return (
    <>
      <div
        className="TopDestinationContainer"
        id="top-destination"
        style={{ marginTop: "-100px" }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontWeight: "900",
          }}
        >
          Top Destination
          <hr
            style={{
              width: "20%",
              border: "1px solid black",
              margin: "0 auto",
            }}
          />
        </h1>

        <Container>
          <Row>
            <Col md={6}>
              <Link to={"/detail/39"}>
                <Card className={styles.cardContainer}>
                  <Card.Img
                    variant="top"
                    src={`${distributionUrl}/Static/des1.jpg`}
                    className={styles.cardImg}
                    style={{ height: "410px" }}
                  />
                  <Card.Text className={styles.cardText}>
                    United Kingdom
                  </Card.Text>

                  <ul className={styles.cardList}>
                    <li>Hotel</li>
                    <li>Tours</li>
                    <li>Activity</li>
                    <li>Yatch</li>
                  </ul>
                </Card>
              </Link>
              1
            </Col>
            <Col md={6}>
              <Link to={"/detail/42"}>
                <Card className={styles.cardContainer}>
                  <Card.Img
                    variant="top"
                    src={`${distributionUrl}/Static/des2.jpg`}
                    className={styles.cardImg}
                  />
                  <Card.Text className={styles.cardText}>Turkey</Card.Text>

                  <ul className={styles.cardList}>
                    <li>Hotel</li>
                    <li>Tours</li>
                    <li>Activity</li>
                    <li>Yatch</li>
                  </ul>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Link to={"/detail/45"}>
                <Card className={styles.cardContainer}>
                  <Card.Img
                    variant="top"
                    src={`${distributionUrl}/Static/des3.jpg`}
                    className={styles.cardImg}
                  />
                  <Card.Text className={styles.cardText}>
                    United States
                  </Card.Text>

                  <ul className={styles.cardList}>
                    <li>Hotel</li>
                    <li>Tours</li>
                    <li>Activity</li>
                    <li>Yatch</li>
                  </ul>
                </Card>
              </Link>
            </Col>
            <Col md={3}>
              <Link to={"/detail/45"}>
                <Card className={styles.cardContainer}>
                  <Card.Img
                    variant="top"
                    src={`${distributionUrl}/Static/des4.jpg`}
                    className={styles.cardImg}
                    style={{ height: "170px" }}
                  />
                  <Card.Text className={styles.cardText}>Ukraine</Card.Text>

                  <ul className={styles.cardList}>
                    <li>Hotel</li>
                    <li>Tours</li>
                    <li>Activity</li>
                    <li>Yatch</li>
                  </ul>
                </Card>
              </Link>
            </Col>
            <Col md={3}>
              <Link to={"/detail/44"}>
                <Card className={styles.cardContainer}>
                  <Card.Img
                    variant="top"
                    src={`${distributionUrl}/Static/des5.jpg`}
                    className={styles.cardImg}
                  />
                  <Card.Text className={styles.cardText}>France</Card.Text>

                  <ul className={styles.cardList}>
                    <li>Hotel</li>
                    <li>Tours</li>
                    <li>Activity</li>
                    <li>Yatch</li>
                  </ul>
                </Card>
              </Link>
            </Col>
            <Col md={3}>
              <Link to={"/detail/44"}>
                <Card className={styles.cardContainer}>
                  <Card.Img
                    variant="top"
                    src={`${distributionUrl}/Static/des6.jpeg`}
                    className={styles.cardImg}
                  />
                  <Card.Text className={styles.cardText}>India</Card.Text>

                  <ul className={styles.cardList}>
                    <li>Hotel</li>
                    <li>Tours</li>
                    <li>Activity</li>
                    <li>Yatch</li>
                  </ul>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
        <hr
          style={{
            width: "20%",
            border: "1px solid black",
            margin: "0 auto", // Căn giữa đường thẳng
          }}
        />
      </div>
    </>
  );
}
