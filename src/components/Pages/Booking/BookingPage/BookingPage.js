import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../../UserContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  checkStatus,
  getBookingInfo,
} from "../../../../api/Services/BookingServices";
import PackageInfo from "./PackageInfo";
import BookingDetail from "./BookingDetail";
import Swal from "sweetalert2";

const BookingPage = () => {
  const { tourPackageId } = useParams();
  const [tourPackage, setTourPackage] = useState({});
  const [tourDates, setTourDates] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [date, setDate] = useState(null);
  const [travelerNum, setTravelerNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const setTravelDay = (Date) => setDate(Date);
  const setTravlerNumber = (ravelerNum) => setTravelerNum(ravelerNum);
  const setTotal = (total) => setTotalPrice(total);

  const handleClickBook = async () => {
    try {
      const res = await checkStatus(user.userId);
      if (res.message === "Has booking Pending") {
        Swal.fire({
          title: "Pending Payment Detected",
          text: "You need to complete or cancel the payment for your existing booking before proceeding with a new one.",
          icon: "warning",
          confirmButtonText: "See detail",
          showCancelButton: true,
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/user/booking`);
          }
        });
      } else if (res.message === "No booking Pending") {
        navigate(`/traveler/info/${tourPackageId}`, {
          state: { ticket, tourPackageId },
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while checking the booking status. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const fetchingBooking = async () => {
      try {
        const res = await getBookingInfo(tourPackageId);
        console.log(res);
        setTourPackage(res.tourPackage || {});
        setTourDates(res.formatDate || []);
        setTotalQuantity(res.totalQuantity || 0);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    fetchingBooking();
  }, [tourPackageId]);

  const ticket = {
    name: tourPackage.Name,
    description: tourPackage.Description,
    date: date,
    travelerNum: travelerNum,
    isChangeSchedule: tourPackage.IsChangeSchedule,
    isRefund: tourPackage.IsRefund,
    price: tourPackage.Price,
    totalPrice: totalPrice,
    image: tourPackage.Image,
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}
      >
        Booking Page
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Section 1: Tour Information */}
        <Grid item xs={10} md={3}>
          <PackageInfo tourPackage={tourPackage} />
        </Grid>

        {/* Section 2: Booking Details */}
        <Grid item xs={10} md={6}>
          <BookingDetail
            tourDates={tourDates} // Pass the tourDates state here
            tourPackage={tourPackage}
            totalQuantity={totalQuantity}
            setTravelDay={setTravelDay}
            handleClickBook={handleClickBook}
            setTravlerNumber={setTravlerNumber}
            setTotal={setTotal}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingPage;
