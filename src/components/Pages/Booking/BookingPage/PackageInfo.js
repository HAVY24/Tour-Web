import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Tooltip,
  Modal,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function PackageInfo({ tourPackage }) {
  const fallbackImage = "/images/default-tour.jpg"; // Placeholder image
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    navigate(`/detail/${tourPackage.Id}`);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#f9f9f9",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1e88e5",
          textAlign: "center",
          mb: 3,
        }}
      >
        Tour Package Information
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Image Section */}
      <Box
        sx={{
          mb: 3,
          textAlign: "center",
        }}
      >
        <img
          src={
            tourPackage?.Image
              ? `${distributionUrl}/Packages/${tourPackage.Image}`
              : fallbackImage
          }
          alt="Tour Package"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* Information Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body1"
          sx={{ mb: 1.5, fontSize: "1rem", color: "#424242" }}
        >
          <strong style={{ color: "#1565c0" }}>Name:</strong>{" "}
          {tourPackage?.Name || "N/A"} Package
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 1.5, fontSize: "1rem", color: "#424242" }}
        >
          <strong style={{ color: "#1565c0" }}>Check-in:</strong>{" "}
          {tourPackage?.CheckIn
            ? new Date(tourPackage.CheckIn).toLocaleDateString()
            : "N/A"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            fontSize: "1rem",
            color: tourPackage?.IsChangeSchedule ? "#4caf50" : "#f44336",
            display: "flex",
            alignItems: "center",
          }}
        >
          <strong style={{ color: "#1565c0", marginRight: "8px" }}>
            {tourPackage?.IsChangeSchedule ? (
              <CheckCircleIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            ) : (
              <CancelIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            )}
            {tourPackage?.IsChangeSchedule
              ? "Can Reschedule"
              : "Cannot Reschedule"}
          </strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            fontSize: "1rem",
            color: tourPackage?.IsRefund ? "#4caf50" : "#f44336",
            display: "flex",
            alignItems: "center",
          }}
        >
          <strong style={{ color: "#1565c0", marginRight: "8px" }}>
            {tourPackage?.IsRefund ? (
              <CheckCircleIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            ) : (
              <CancelIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            )}
            {tourPackage?.IsRefund ? "Refund Possible" : "No Refund Possible"}
          </strong>
        </Typography>
      </Box>

      {/* Button Section */}
      <Tooltip title="Click to get more details about the package!" arrow>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
            color: "#fff",
            borderRadius: "12px",
            transition: "transform 0.3s ease, background 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
              transform: "scale(1.05)",
            },
          }}
        >
          Show Tour Package Info
        </Button>
      </Tooltip>

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
          {tourPackage ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  lineHeight: 1.8,
                  color: "#555",
                }}
              >
                <strong>Mô tả:</strong> {tourPackage.Description}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: "#27ae60",
                }}
              >
                Giá: ${tourPackage.Price}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  color: "#555",
                }}
              >
                <strong>Các hoạt động: </strong>
                {tourPackage.Activities ? (
                  Array.isArray(tourPackage.Activities) ? (
                    <ul style={{ margin: "10px 0 0 20px", padding: 0 }}>
                      {tourPackage.Activities.map((activity, idx) => (
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
                    tourPackage.Activities
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
    </Paper>
  );
}
