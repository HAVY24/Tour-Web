import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import TourCard from "./../MainTour/Card"; // Đảm bảo rằng đường dẫn này chính xác
import { getTours } from "../../../../api/Services/TourAndPackageServices"; // Lấy dữ liệu từ API
import { Box } from "@mui/material"; // Import Box từ Material-UI
import FilterBox from "./FilterBox";

export default function ListCard() {
  const [tours, setTours] = useState([]); // Đảm bảo tours là mảng
  const [totalTours, setTotalTours] = useState(0); // Số lượng tour tổng
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const cardsPerPage = 6; // Số lượng tour trên mỗi trang

  const [filters, setFilters] = useState({
    searchQuery: "",
    searchBy: "",
    sortBy: "",
    priceRange: [1, 10000],
  });

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  useEffect(() => {
    fetchTours(page, filters);
  }, [page, filters]);

  const fetchTours = async (page, filters) => {
    try {
      const res = await getTours(page, cardsPerPage, filters);
      setTours(res.tours);
      setTotalPages(res.totalPages);
      setTotalTours(res.totalTours);
    } catch (error) {
      alert("Can't fetch tours");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); // Cập nhật trang khi người dùng thay đổi
  };

  return (
    <Container>
      <Row>
        <Col className="col-3">
          <FilterBox onSearch={handleSearch} />
        </Col>

        <Col className="col-9">
          <Row>
            {Array.isArray(tours) && tours.length > 0 ? (
              tours.map((item) => (
                <Col className="col-4" key={item.Id}>
                  <div style={{ margin: "40px 0 50px 0" }}>
                    <TourCard item={item} />
                  </div>
                </Col>
              ))
            ) : (
              <p>No tours available.</p> // Thông báo khi không có tour
            )}
          </Row>
          {/* Box để căn giữa phần Pagination */}
          <Box
            sx={{
              display: "flex", // Dùng flexbox
              justifyContent: "center", // Căn giữa theo chiều ngang
              marginTop: "20px",
            }}
          >
            <Pagination
              count={totalPages} // Tổng số trang
              page={page} // Trang hiện tại
              onChange={handlePageChange} // Thay đổi trang
              color="secondary"
            />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}
