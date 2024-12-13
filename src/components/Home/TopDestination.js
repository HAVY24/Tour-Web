import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "../../styles/styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TopDestination() {
  return (
    <>
      <div className="TopDestinationContainer" style={{ marginTop: "-100px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
          Top Destination
          <hr
            style={{
              width: "20%",
              border: "1px solid black",
              margin: "0 auto", // Căn giữa đường thẳng
            }}
          />
        </h1>

        <Container>
          <Row>
            <Col md={6}>
              <Card className={styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src="/des1.jpg"
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
            </Col>
            <Col md={6}>
              <Card className={styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src="/des2.jpg"
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
            </Col>
          </Row>

          <Row>
            {/* 4 ảnh chia đều trong hàng thứ hai */}
            <Col md={3}>
              <Card className={styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src="/des3.jpg"
                  className={styles.cardImg}
                />
                <Card.Text className={styles.cardText}>United States</Card.Text>

                <ul className={styles.cardList}>
                  <li>Hotel</li>
                  <li>Tours</li>
                  <li>Activity</li>
                  <li>Yatch</li>
                </ul>
              </Card>
            </Col>
            <Col md={3}>
              <Card className={styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src="/des4.jpg"
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
            </Col>
            <Col md={3}>
              <Card className={styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src="/des5.jpg"
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
            </Col>
            <Col md={3}>
              <Card className={styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src="/des6.jpeg"
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
