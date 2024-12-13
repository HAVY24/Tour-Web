import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopDealCard from "./TopDealCard";
import TopDealSlider from "./SideCardTopDeal";

export default function TopDeal() {
  return (
    <div id="top-deals" style={{ textAlign: "center", marginTop: "100px" }}>
      <hr />
      <h1 style={{ fontWeight: "900" }}>Today's Top Deals</h1>
      <TopDealSlider />
    </div>
  );
}
