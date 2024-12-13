import React from "react";
import { Typography, Card, Divider, Grid, Box } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

export default function Instructions() {
  const instructions = [
    "Open an e-wallet or banking app that supports QR payment via VietQR, then scan the QR code above.",
    "Verify the amount and payment information matches the order details, then complete the transaction within the payment deadline.",
    "Your booking will be automatically confirmed after a successful payment. Check your booking status on the Booking page.",
  ];

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 600,
        width: "100%",
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        p: 4,
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
        sx={{ color: "primary.main", textAlign: "center" }}
      >
        QR Payment Instructions
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Instructions */}
      <Grid container spacing={2}>
        {instructions.map((instruction, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            <Box sx={{ mr: 2 }}>
              <CheckCircleOutline color="primary" />
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              <strong>{index + 1}.</strong> {instruction}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Divider sx={{ my: 3 }} />
      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        For further assistance, contact our support team.
      </Typography>
    </Card>
  );
}
