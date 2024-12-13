import React from "react";
import { Box, Typography, Card, Divider } from "@mui/material";

export default function PaymentDetail({ data }) {
  const { bookingId, total } = data;

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 600,
        width: "100%",
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        p: 4,
        mb: 3,
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h6"
        fontWeight="bold"
        color="text.secondary"
        gutterBottom
      >
        Payment Summary
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Booking Code */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Booking Code:
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ textTransform: "uppercase" }}
        >
          {bookingId || "N/A"}
        </Typography>
      </Box>

      {/* Total Amount */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Total Amount:
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="green">
          ${total?.toFixed(2) || "0.00"}
        </Typography>
      </Box>
    </Card>
  );
}
