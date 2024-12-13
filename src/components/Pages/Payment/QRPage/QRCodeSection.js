import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";

export default function QRCodeSection({ data }) {
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 600,
        width: "100%",
        borderRadius: 3,
        p: 4,
        mb: 3,
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
        sx={{ color: "#1976d2" }}
      >
        Scan the QR Code to Pay
      </Typography>
      <Typography
        variant="body2"
        sx={{
          backgroundColor: "rgba(255, 249, 196, 0.8)", // Slightly transparent yellow background
          p: 2,
          borderRadius: 2,
          textAlign: "center",
          color: "#f57c00",
          mb: 3,
          boxShadow: "inset 0px 0px 8px rgba(0,0,0,0.1)",
        }}
      >
        Please complete the payment before the specified time. Otherwise, the
        transaction will be automatically refunded within 1 working day.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px dashed #ccc",
          borderRadius: 2,
          p: 3,
          mb: 2,
          transition: "all 0.3s ease",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle white background with transparency
          "&:hover": {
            borderColor: "#1976d2",
            boxShadow: "0px 0px 15px rgba(25, 118, 210, 0.2)",
          },
        }}
      >
        <img
          src="https://via.placeholder.com/150" // Replace with QR code URL
          alt="QR Code"
          style={{ width: "150px", height: "150px", marginBottom: "16px" }}
        />
        <Typography fontWeight="bold" sx={{ mb: 1, color: "#1976d2" }}>
          Traveloka Vietnam
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Pay before: 23:59, {data.BookingDate}
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
        >
          Download QR Code
        </Button>
      </Box>
    </Card>
  );
}
