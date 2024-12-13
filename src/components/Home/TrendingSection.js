import SimpleBottomNavigation from "./NavBarTrending";
import Box from "@mui/material/Box";
import React from "react";
import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TrendingSection() {
  return (
    <div>
      <SimpleBottomNavigation />
      <Container>
        <Row>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
        </Row>
        <Row>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
          <Col class="col-3">
            {" "}
            <TrendingCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
