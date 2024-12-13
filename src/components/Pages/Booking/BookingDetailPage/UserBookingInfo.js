import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../../UserContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import Ticket from "./Ticket";
import TotalPriceSection from "./TotalPriceSection";
import ContactInfo from "./ContactInfo";
import TravelerInfo from "./TravelerInfo";
import {
  getVoucher,
  getVAT,
} from "../../../../api/Services/TourAndPackageServices";
import { sendBookingInfo } from "../../../../api/Services/BookingServices";
import ChooseVoucherSection from "./ChooseVoucherSection";
import styles from "../../../../styles/PaymentPage.module.css";
import Swal from "sweetalert2";

// Custom hook for fetching data
const useFetchData = (fetchFunction, dependency) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [dependency]);

  return { data, error };
};

export default function UserBookingPage() {
  const location = useLocation();
  const user = useContext(UserContext);
  const { tourPackageId } = useParams();
  const [bookingId, setBookingId] = useState(0);
  const navigate = useNavigate();

  // States
  const [voucher, setVoucher] = useState(0);
  const [VAT, setVAT] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [ticket, setTicket] = useState(() => ({
    name: "",
    description: "",
    date: "",
    travelerNum: 0,
    isChangeSchedule: false,
    isRefund: false,
    price: 0,
    totalPrice: 0,
    image: "",
    ...(location.state?.ticket || {}),
  }));
  const [vouchers, setVouchers] = useState([]);

  // Fetching data using custom hook
  const { data: fetchedVouchers } = useFetchData(
    () => getVoucher(tourPackageId),
    tourPackageId
  );
  const { data: fetchedVAT } = useFetchData(
    () => getVAT(tourPackageId),
    tourPackageId
  );

  useEffect(() => {
    if (fetchedVouchers) setVouchers(fetchedVouchers);
    if (fetchedVAT) setVAT(fetchedVAT);
  }, [fetchedVouchers, fetchedVAT]);

  useEffect(() => {
    setPeopleInfo(
      Array.from({ length: ticket.travelerNum }).map(() => ({
        name: "",
        phone: "",
      }))
    );
  }, [ticket.travelerNum]);

  const Booking = {
    TourPackageId: tourPackageId,
    BookingDate: ticket.date,
    Status: "pending",
    NumOfPeople: ticket.travelerNum,
  };

  const Contact = {
    Name: contactInfo.Name,
    Phone: contactInfo.Phone,
    Email: contactInfo.Email,
  };

  const Traveler = peopleInfo.map((person) => ({
    Name: person.name,
    Phone: person.phone,
  }));

  const info = {
    Booking: Booking,
    Contact: Contact,
    Traveler: Traveler,
  };

  const data = {
    info: info,
    User_Id: user.userId,
  };

  const totalTemp = ticket.totalPrice;
  const VATCost = (totalTemp * VAT) / 100;
  const total = totalTemp - voucher + VATCost;

  const dataTransfer = {
    bookingId: bookingId,
    TourPackageId: tourPackageId,
    BookingDate: ticket.date,
    Status: "pending",
    NumOfPeople: ticket.travelerNum,
    totalTemp: totalTemp,
    VATCost: VATCost,
    total: total,
    totalDiscount: voucher,
    pricePerson: ticket.price,
  };

  const handleOnclick = async () => {
    try {
      const res = await sendBookingInfo(data);
      setBookingId(res);
    } catch (err) {
      console.error("Error when sending booking info: ", err);
      Swal.fire({
        title: "Error",
        text: "You must provide complete contact information.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  localStorage.setItem("time", 600);
  localStorage.setItem("dataTransfer", JSON.stringify(dataTransfer));

  useEffect(() => {
    if (bookingId !== 0) {
      console.log(bookingId);
      navigate(`/payment/${bookingId}`, { state: { dataTransfer } });
      window.location.reload();
    }
  }, [bookingId]);

  return (
    <Box sx={{ p: 20, minHeight: "100vh" }}>
      <Box
        sx={{
          p: 4,
          mb: 4,
          marginTop: "-100px",
          borderRadius: "8px",
          background: "linear-gradient(to right, #0d47a1, #1976d2)",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Booking Details
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontStyle: "italic",
            opacity: 0.9,
          }}
        >
          Review and confirm your details before proceeding
        </Typography>
        <Box
          sx={{
            mt: 3,
            height: "3px",
            backgroundColor: "white",
            width: "50%",
            margin: "0 auto",
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Left Section: User Info */}
        <Grid item xs={12} md={8}>
          <ContactInfo setContactInformation={setContactInfo} />

          {/* Traveler Info */}
          <TravelerInfo ticket={ticket} setPeopleInformation={setPeopleInfo} />
        </Grid>

        {/* Right Section: Ticket Info */}
        <Grid item xs={12} md={4}>
          <Ticket ticket={ticket} tourPackageId={tourPackageId} />
          <ChooseVoucherSection
            vouchers={vouchers}
            styles={styles}
            getSelectedVoucer={setVoucher}
          />
        </Grid>
      </Grid>

      {/* Price Section */}
      <TotalPriceSection
        ticket={ticket}
        total={total}
        discount={voucher}
        VAT={VAT}
        handleOnclick={handleOnclick}
        VATCost={VATCost}
      />
    </Box>
  );
}
