import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import {
  getTourPackages,
  getTours,
} from "../../../api/Services/TourAndPackageServices";
import { Link } from "react-router-dom";

export default function ListTrendingCardActivity() {
  const [tours, setTours] = useState([]); // Lưu danh sách tour
  const [loading, setLoading] = useState(true); // Kiểm tra trạng thái đang tải
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours(3, 9, null, ""); // Gọi hàm lấy tour từ API
        setTours(data); // Lưu danh sách tour vào state
      } catch (err) {
        setError("Có lỗi xảy ra khi lấy dữ liệu tour.");
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return <p>Đang tải danh sách tour...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <Container>
      <Row>
        {tours.tours.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <TrendingCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
