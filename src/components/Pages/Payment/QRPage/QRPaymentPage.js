import React, { useState, useContext } from "react";
import TimerContext from "../../../../TimerContext";
import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import Instructions from "./QRInstructions";
import PaymentDetail from "./PaymentDetai";
import QRCodeSection from "./QRCodeSection";
import CountdownSection from "./CountdownSection";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmSection from "./ConfirmSection";
import {
  createPaymentInfo,
  setPaymentStatus,
} from "../../../../api/Services/PaymentServices";
import { setStatus } from "../../../../api/Services/BookingServices";

export default function QRPaymentPage() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("dataTransfer"))
  );

  const {
    timeRemaining,
    setTimeRemaining,
    timerExpired,
    setTimerExpired,
    stopTimer,
  } = useContext(TimerContext);

  const selectedPayment = localStorage.getItem("selectedPayment");

  const paymentInfo = {
    PaymentMethod: selectedPayment,
    PaymentAmount: data.total,
    PaymentStatus: "pending",
    TransactionId: "",
    BookingId: bookingId,
  };

  const onClickCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you leave, the transaction will be canceled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Leave Process",
      cancelButtonText: "Stay Here",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await setPaymentStatus({
            bookingId: bookingId,
            status: "cancel",
          });
        } catch (err) {
          console.error(err);
        }
        navigate("/");
      }
    });
  };

  const onConfirmClick = async () => {
    try {
      console.log(paymentInfo);
      await createPaymentInfo(paymentInfo);
      await setStatus({
        bookingId: bookingId,
        status: "waiting",
      });
    } catch (err) {
      console.error("Error sending: ", err);
    }
    stopTimer();
    navigate("/user/booking");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#f4f5fa",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Cancel Button with SweetAlert2 */}
      <Button
        onClick={onClickCancel}
        startIcon={<ArrowBack />}
        variant="contained"
        color="error"
        sx={{
          alignSelf: "flex-start",
          mb: 2,
          fontWeight: "bold",
          bgcolor: "#f44336",
          "&:hover": {
            bgcolor: "#d32f2f",
          },
        }}
      >
        Cancel
      </Button>

      {/* Countdown Section */}
      <CountdownSection
        getTimerExpired={setTimerExpired}
        getTimeRemain={setTimeRemaining}
        timeRemained={timeRemaining}
        timerExpiring={timerExpired}
      />

      {/* QR Code and Confirmation Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 600,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          mb: 3,
        }}
      >
        <QRCodeSection data={data} />

        {/* Confirmation Section */}
        <ConfirmSection
          onConfirmClick={onConfirmClick}
          timerExpired={timerExpired}
        />
      </Box>

      {/* Payment Details Section */}
      <PaymentDetail data={data} />

      {/* QR Payment Instructions */}
      <Instructions />
    </Box>
  );
}
