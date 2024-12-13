import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Swal from "sweetalert2";
import styles from "../../../styles/UserRequest.module.css";

import { setStatus } from "../../../api/Services/BookingServices";
import {
  getUserPaymentRequest,
  getPaymentPending,
  getProcessedPayment,
  getAcceptedPayment,
  getUnacceptedPayment,
} from "../../../api/Services/UserServices";
import { setPaymentStatus } from "../../../api/Services/PaymentServices";

import FilterBox from "./FilterBox";

const UserRequest = () => {
  const [paymentRequests, setPaymentRequests] = useState([]);

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const res = await getUserPaymentRequest();
      setPaymentRequests(res);
      console.log(res);
    };
    fetchPaymentRequest();
  }, []);

  const handleAccept = async (id) => {
    try {
      await setStatus({
        bookingId: id,
        status: "success",
      });

      await setPaymentStatus({
        bookingId: id,
        status: "success",
      });

      Swal.fire({
        icon: "success",
        title: "Payment Accepted!",
        text: "The payment request has been successfully accepted.",
      });

      setPaymentRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.Booking_Id === id
            ? { ...request, Payment_Status: "success" }
            : request
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while accepting the payment. Please try again.",
      });
    }
  };

  const handleDecline = async (id) => {
    try {
      await setStatus({
        bookingId: id,
        status: "fail",
      });

      await setPaymentStatus({
        bookingId: id,
        status: "fail",
      });

      Swal.fire({
        icon: "info",
        title: "Payment Declined",
        text: "The payment request has been declined.",
      });

      setPaymentRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.Booking_Id === id
            ? { ...request, Payment_Status: "fail" }
            : request
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while declining the payment. Please try again.",
      });
    }
  };

  const handleFilter = async (filterType) => {
    try {
      let res;
      switch (filterType) {
        case "all":
          res = await getUserPaymentRequest();
          break;
        case "pending":
          res = await getPaymentPending();
          break;
        case "processed":
          res = await getProcessedPayment();
          break;
        case "accepted":
          res = await getAcceptedPayment();
          break;
        case "unaccepted":
          res = await getUnacceptedPayment();
          break;
        default:
          throw new Error("Invalid filter type");
      }
      setPaymentRequests(res);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  return (
    <div className={styles.container}>
      <FilterBox handleFilter={handleFilter} />
      <h1 className={styles.title}>Manage User Payment Requests</h1>
      {paymentRequests.length === 0 ? (
        <p className={styles.noRequests}>No payment requests available.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Booking ID</TableCell>
                <TableCell>Tour Package Id</TableCell>
                <TableCell>Tour Package Name</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...paymentRequests].reverse().map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.User_Id}</TableCell>
                  <TableCell>{request.User_Name}</TableCell>
                  <TableCell>{request.Booking_Date}</TableCell>
                  <TableCell>{request.Booking_Id}</TableCell>
                  <TableCell>{request.TourPackage_Id}</TableCell>
                  <TableCell>{request.TourPackage_Name}</TableCell>
                  <TableCell>${request.Total_Price}</TableCell>
                  <TableCell>{request.Payment_Method}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-between">
                      {request.Payment_Status === "success" ||
                      request.Payment_Status === "fail" ? (
                        <Chip
                          label={request.Payment_Status}
                          color={
                            request.Payment_Status === "success"
                              ? "success"
                              : "error"
                          }
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            marginRight: "10px",
                          }}
                        />
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            className={styles.acceptButton}
                            onClick={() => handleAccept(request.Booking_Id)}
                            startIcon={<CheckCircle />}
                            style={{ marginRight: "10px" }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            className={styles.declineButton}
                            onClick={() => handleDecline(request.Booking_Id)}
                            startIcon={<Cancel />}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserRequest;
