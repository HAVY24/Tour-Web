import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ConfirmSection({ onConfirmClick, timerExpired }) {
  const navigate = useNavigate();
  const onClickAccept = () => {
    if (timerExpired) {
      Swal.fire({
        title: "Payment Time Expired",
        text: "Your session has expired.",
        icon: "error",
        confirmButtonText: "Exit",
      }).then(() => {
        navigate("/user/booking");
      });
      return;
    }

    Swal.fire({
      title: "Confirm Payment?",
      text: "Have you completed your payment? Click 'Yes' to confirm.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I have paid!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thank You!",
          text: "We have received your payment request. We will confirm as soon as possible",
          icon: "success",
          confirmButtonColor: "#28a745",
        }).then(() => {
          onConfirmClick();
        });
      }
    });
  };

  return (
    <Box
      sx={{
        mt: 2,
        marginTop: "-50px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
      >
        Have you completed your payment?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Click "Accept" to confirm your payment and wait for us to contact you.
      </Typography>
      <Button
        onClick={onClickAccept}
        variant="contained"
        color="primary"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          borderRadius: 3,
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        Accept
      </Button>
    </Box>
  );
}
