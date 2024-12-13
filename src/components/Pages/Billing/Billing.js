import React, { useContext } from "react";
import UserContext from "../../../UserContext";
import OrderSummary from "./TransactionHistory";
import UserAddress from "./UserInformation";
import { Box, Grid } from "@mui/material";
import PaymentCard from "./CreditCard";
import InvoiceList from "./InvoiceList";
import MethodPayment from "./MethodPayment";
import example from "../../../assets/images/mastercard-logo.png";
import exampleLogo from "../../../assets/images/visa-logo.png";
import styles from "../../../styles/Billing.module.css";
import Swal from "sweetalert2";
import { storeBillingAddress } from "../../../api/Services/PaymentServices";
import AddPaymemt from "../Payment/AddPaymentPage/AddPayment";

const Billing = () => {
  const cardNumber = "1234567812341234";
  const logoUrl = example; // Đường dẫn đến logo
  const user = useContext(UserContext);

  const onSubmit = async (address) => {
    if (!user?.userId) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to submit your billing address.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "No, cancel",
    });

    if (confirm.isConfirmed) {
      const res = await storeBillingAddress(user.userId, address);

      if (res?.message === "success") {
        Swal.fire({
          title: "Success!",
          text: "Your billing address has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue submitting your billing address. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Tùy chọn: thêm màu nền
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        {/* PaymentCard takes 9/12 columns */}
        <Grid item xs={12} md={4}>
          <PaymentCard />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* InvoiceList takes 3/12 columns */}
        <Grid item xs={12} md={8}>
          <UserAddress onSubmit={onSubmit} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InvoiceList />
        </Grid>
      </Grid>

      {/* OrderSummary now positioned below InvoiceList, to the right */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={9} style={{ marginBottom: "200px" }}>
          <AddPaymemt />
        </Grid>
        <Grid item xs={12} md={3}>
          <OrderSummary styles={styles} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Billing;
