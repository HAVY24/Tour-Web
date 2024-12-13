import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles.module.css";

export default function WhyChooseSection() {
  return (
    <div
      id="why-choose"
      style={{
        textAlign: "center",
        marginTop: "30px",
        padding: "50px 20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <h1 style={{ fontWeight: "900", color: "#343a40" }}>Why Choose Us</h1>
      <hr
        style={{
          width: "60px",
          border: "2px solid #007bff",
          margin: "10px auto 30px",
        }}
      />
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <LocalOfferIcon
                sx={{
                  fontSize: "100px",
                  color: "blue",
                  background: "linear-gradient(135deg, #6EC1E4, #007bff)",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h5
                style={{
                  margin: "20px 0 10px",
                  fontWeight: "bold",
                  color: "#343a40",
                }}
              >
                Competitive Pricing
              </h5>
              <p style={{ color: "#6c757d" }}>
                With 500+ suppliers and the purchasing power of 300 million
                members, mytravel.com can save!
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <EmojiEventsIcon
                sx={{
                  fontSize: "100px",
                  color: "blue",
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h5
                style={{
                  margin: "20px 0 10px",
                  fontWeight: "bold",
                  color: "#343a40",
                }}
              >
                Trusted Excellence
              </h5>
              <p style={{ color: "#6c757d" }}>
                Our services are recognized with awards for excellent quality
                and reliability.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <PublicIcon
                sx={{
                  fontSize: "100px",
                  color: "blue",
                  background: "linear-gradient(135deg, #50C878, #008000)",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h5
                style={{
                  margin: "20px 0 10px",
                  fontWeight: "bold",
                  color: "#343a40",
                }}
              >
                Global Reach
              </h5>
              <p style={{ color: "#6c757d" }}>
                Access a vast network of destinations and services worldwide for
                your convenience.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
