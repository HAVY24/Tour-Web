import React, { useState } from "react";
import {
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  Card,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";

export default function TotalPriceSection({
  ticket,
  total,
  discount,
  VAT,
  handleOnclick,
  VATCost,
}) {
  const [isAgreed, setIsAgreed] = useState(false); // state to track agreement

  const handleProceed = () => {
    if (!isAgreed) {
      // Show SweetAlert2 warning if the user hasn't agreed
      Swal.fire({
        title: "You must agree to the terms and conditions to continue.",
        icon: "warning",
        confirmButtonText: "Got it",
        confirmButtonColor: "#1976d2",
      });
    } else {
      // Ask the user to confirm their details before proceeding
      Swal.fire({
        title: "Please review your information",
        text: "Ensure all the details are correct before proceeding to the payment page.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Proceed to Payment",
        cancelButtonText: "Go Back",
        confirmButtonColor: "#1976d2",
        cancelButtonColor: "#d32f2f",
      }).then((result) => {
        if (result.isConfirmed) {
          handleOnclick();
        }
      });
    }
  };

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        width: "70%",
        maxWidth: 600,
        mt: 5,
        marginTop: "-50px",
        backgroundColor: "#f4f6f8",
        border: "1px solid #cfd8dc",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1565c0", textAlign: "center" }}
      >
        Total Price Summary
      </Typography>
      <Divider sx={{ my: 3, backgroundColor: "#90caf9" }} />
      <Stack spacing={2}>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Price per person:</span>
          <strong style={{ color: "#43a047" }}>
            ${ticket.price.toFixed(2)}
          </strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Number of people:</span>
          <strong>{ticket.travelerNum}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Discount:</span>
          <strong style={{ color: "#43a047" }}>- ${discount.toFixed(2)}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>VAT ({VAT}%):</span>
          <strong style={{ color: "#43a047" }}>+ ${VATCost.toFixed(2)}</strong>
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "#e0e0e0" }} />
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: "#d32f2f",
          }}
        >
          <span>Total Price:</span>
          <strong>${total.toFixed(2)}</strong>
        </Typography>
      </Stack>
      <FormControlLabel
        control={
          <Switch
            checked={isAgreed}
            onChange={() => setIsAgreed((prev) => !prev)} // toggle agreement state
            color="primary"
          />
        }
        label="I agree to the terms and conditions"
        sx={{
          mt: 3,
          display: "block",
          textAlign: "center",
          color: "#5f6368",
        }}
      />
      <Button
        variant="contained"
        onClick={handleProceed} // Use the handleProceed function to check agreement
        sx={{
          mt: 3,
          width: "100%",
          background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(45deg, #1565c0, #1e88e5)",
          },
          fontWeight: "bold",
          py: 1.5,
        }}
        size="large"
      >
        Proceed to Payment
      </Button>
    </Card>
  );
}
