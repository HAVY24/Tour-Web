import * as React from "react";
import { Button, Box, Typography, Divider, Stack, Modal } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function DetailCard({ item, packages, rating, reviews }) {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpen = (pkg) => {
    setSelectedPackage(pkg);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  console.log(rating);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating > i) {
        stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
      } else if (rating > i && rating < i + 1) {
        stars.push(<StarHalfIcon key={i} sx={{ color: "gold" }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "gold" }} />);
      }
    }
    return stars;
  };

  console.log(renderStars);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1080px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={`${distributionUrl}/Tours/${item.Image}`}
          alt={item.Name}
          sx={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: "rgba(3, 18, 26, 1)",
              fontSize: "20px",
              lineHeight: "5px",
              margin: "18px auto 12px auto",
              width: "96%",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              to="/tour"
              sx={{
                color: "rgb(255,165,0)",
                "&:hover": {
                  color: "rgb(255,165,0)",
                  textDecoration: "underline",
                },
              }}
            >
              Tour
            </Link>
            <Link
              underline="hover"
              color="inherit"
              to={`/${item.Region}`}
              sx={{
                color: "rgb(255,165,0)",
                "&:hover": {
                  color: "rgb(255,165,0)",
                  textDecoration: "underline",
                },
              }}
            >
              {item.Region}
            </Link>
            <Typography sx={{ color: "rgba(3, 18, 26, 1)" }}>
              {item.Name}
            </Typography>
          </Breadcrumbs>
        </div>
        <Box sx={{ padding: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#2c3e50", marginBottom: 2 }}
          >
            {item.Name}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Description: {item.Description}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginBottom: 3 }}
          >
            {renderStars(rating || 0)}
            <Typography sx={{ fontWeight: "bold", color: "#555" }}>
              {rating || "0.0"} / 5.0
            </Typography>
          </Stack>

          <Divider
            sx={{
              marginY: 3, // Tăng khoảng cách giữa các phần trên và dưới vạch phân chia
              borderBottomWidth: 1.5, // Tăng độ dày của vạch phân chia
              borderColor: "rgb(44,62,80)", // Đổi màu vạch phân chia
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            Các Gói Tour
          </Typography>
          <Box>
            {packages.map((tour, index) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 3,
                  padding: 2,
                  border: "1.5px solid #ccc",
                  borderRadius: 2,
                }}
              >
                {/* Góc trái bên trên: Tên package và nút "Xem chi tiết" */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#2c3e50",
                      marginBottom: 1,
                    }}
                  >
                    {tour.Name || "Tên gói tour"}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpen(tour)}
                    sx={{
                      borderColor: "#3498db",
                      color: "#3498db",
                      "&:hover": { borderColor: "#2980b9", color: "#2980b9" },
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Box>

                {/* Góc phải bên trên: Giá tiền và nút "Đặt vé" */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // Sắp xếp giá và nút theo cột
                    alignItems: "flex-start", // Căn lề trái cho giá và nút
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#27ae60",
                      marginBottom: 1, // Tạo khoảng cách giữa giá tiền và nút
                    }}
                  >
                    Price: ${tour.Price || "0.00"}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(`/booking/${tour.Id}`)}
                    sx={{
                      backgroundColor: "#3498db",
                      color: "#fff",
                      minWidth: 350, // Đặt chiều rộng tối thiểu để nút dài hơn
                      "&:hover": { backgroundColor: "#2980b9" },
                    }}
                  >
                    Đặt vé
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider
            sx={{
              marginY: 3, // Tăng khoảng cách giữa các phần trên và dưới vạch phân chia
              borderBottomWidth: 1.5, // Tăng độ dày của vạch phân chia
              borderColor: "rgb(44,62,80)", // Đổi màu vạch phân chia
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            Đánh giá từ khách hàng
          </Typography>
          <Box>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: 2,
                    marginBottom: 3,
                    border: "1.5px solid #ccc",
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#2c3e50",
                      marginBottom: 1,
                    }}
                  >
                    {review.FirstName} {review.LastName}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ marginBottom: 1 }}
                  >
                    {renderStars(review.Star || 0)} {/* Hiển thị sao */}
                    <Typography sx={{ fontWeight: "bold", color: "#555" }}>
                      {review.Star || "0"} / 5.0
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#555" }}>
                    {review.Review || "Không có mô tả đánh giá."}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "#777" }}>
                Chưa có đánh giá nào.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%", // Responsive width
            maxWidth: 500, // Giới hạn chiều rộng
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 3, // Làm mềm các góc
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Chi tiết gói tour
          </Typography>
          {selectedPackage ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  lineHeight: 1.8,
                  color: "#555",
                }}
              >
                <strong>Mô tả:</strong> {selectedPackage.Description}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: "#27ae60",
                }}
              >
                Giá: ${selectedPackage.Price}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  color: "#555",
                }}
              >
                <strong>Các hoạt động: </strong>
                {selectedPackage.Activities ? (
                  Array.isArray(selectedPackage.Activities) ? (
                    <ul style={{ margin: "10px 0 0 20px", padding: 0 }}>
                      {selectedPackage.Activities.map((activity, idx) => (
                        <li
                          key={idx}
                          style={{
                            listStyle: "disc",
                            marginBottom: "8px",
                          }}
                        >
                          {activity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    selectedPackage.Activities
                  )
                ) : (
                  "Không có thông tin hoạt động."
                )}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "#777" }}>
              Không có thông tin chi tiết.
            </Typography>
          )}
          <Box
            sx={{
              textAlign: "center",
              marginTop: 3,
            }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                backgroundColor: "#3498db",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
