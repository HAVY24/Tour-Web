import TourCard from "./MainTour/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getTours } from "../../../api/services";
import { Link } from "react-router-dom";

export default function ListCard() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, []);

  console.log(tours);
  return (
    <Container>
      <Row>
        {tours.map((item) => {
          return (
            <Col className="col-3">
              <div style={{ margin: "10px" }}>
                <Link to={`/detail/${item.Id}`}>
                  <TourCard item={item} />
                </Link>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
