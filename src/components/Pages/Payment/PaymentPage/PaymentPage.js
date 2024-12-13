import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../../UserContext";
import TimerContext from "../../../../TimerContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookingRecap from "./BookingRecap";
import styles from "../../../../styles/PaymentPage.module.css";
import ChooseCardSection from "./ChooseCardSection";
import { getPaymentCard } from "../../../../api/Services/PaymentServices";
import { setStatus } from "../../../../api/Services/BookingServices";
import Swal from "sweetalert2";
import CountdownSection from "./CountdownSection";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [card, setCard] = useState([]);
  const { bookingId } = useParams();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const {
    timeRemaining,
    setTimeRemaining,
    timerExpired,
    setTimerExpired,
    stopTimer,
  } = useContext(TimerContext);
  const [paymentInfo, setPaymentInfo] = useState(
    location.state?.dataTransfer || {
      NumOfPeople: "",
      totalTemp: "",
      VATCost: "",
      total: "",
      totalDiscount: "",
      pricePerson: "",
    }
  );
  useEffect(() => {
    if (timerExpired) {
      const updateStatus = async () => {
        try {
          const res = await setStatus({
            bookingId: bookingId,
            status: "cancel",
          });
          console.log("Status updated:", res);
        } catch (err) {
          console.error("Failed to update status:", err);
        }
      };

      updateStatus();
    }
  }, [timerExpired, bookingId]);

  useEffect(() => {
    if (!timeRemaining && location.state?.timeRemaining) {
      setTimeRemaining(location.state.timeRemaining);
    }
    if (!timerExpired && location.state?.timerExpired) {
      setTimerExpired(location.state.timerExpired);
    }
  }, [location.state, setTimeRemaining, setTimerExpired]);

  const getSelectedPayment = (selected) => {
    setSelectedPayment(selected);
  };

  const handleClickToQR = () => {
    localStorage.setItem("selectedPayment", selectedPayment);
    navigate(`/QR/${bookingId}`);
  };

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getPaymentCard(user.userId);
        setCard(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCard();
  }, [user.userId]);

  const predefinedPayments = [
    {
      method: "visa",
      label: "Visa Debit Card",
      image: `${distributionUrl}/Static/visa.png`,
      lastDigits: "",
    },
    {
      method: "mastercard",
      label: "Mastercard Office",
      image: `${distributionUrl}/Static/mastercard.png`,
      lastDigits: "",
    },
    {
      method: "momo",
      label: "Momo Wallet",
      image: `${distributionUrl}/Static/momo.png`,
      lastDigits: "",
    },
    {
      method: "paypal",
      label: "Cash Payment",
      image: `${distributionUrl}/Static/paypal.png`,
      lastDigits: "",
    },
  ];

  const paymentOptions = predefinedPayments.map((payment, index) => {
    const cardData = card[index];
    return {
      ...payment,
      lastDigits: cardData?.Last4Digits || "No Data",
    };
  });

  const handleProceedToPayment = () => {
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

    if (!selectedPayment) {
      Swal.fire({
        title: "No Payment Method Selected",
        text: "Please choose a payment method to proceed.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#2575fc",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Please review your payment details before proceeding.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2575fc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        stopTimer();
        handleClickToQR();
      }
    });
  };

  const handleCancle = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setStatus({
          bookingId: bookingId,
          status: "cancel",
        });
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        navigate(`/user/booking`);
      } else {
        Swal.fire("Cancelled", "Your booking is safe.", "info");
      }
    });
  };

  return (
    <>
      <MDBContainer
        fluid
        className={`p-5 ${styles.pageBackground}`}
        style={{
          minHeight: "100vh",
        }}
      >
        <MDBCard
          className={`${styles.cardWithShadow} rounded-5`}
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <MDBCardBody>
            <MDBRow className="d-flex justify-content-center pb-5">
              {/* Countdown Timer */}
              <CountdownSection
                getTimerExpired={setTimerExpired}
                getTimeRemain={setTimeRemaining}
                timeRemained={timeRemaining}
                timerExpiring={timerExpired}
              />
              {/* Payment Section */}
              <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
                <div className="py-4 d-flex flex-row align-items-center">
                  <h5 className={styles.eligibility}>
                    <MDBIcon
                      fas
                      icon="check-circle"
                      className="pe-2 text-success"
                    />
                    <b>ELIGIBLE</b>
                  </h5>
                  <span className="ps-2 text-muted">| Pay</span>
                </div>
                <h4 className={`${styles.paymentAmount} text-success fw-bold`}>
                  ${paymentInfo.total}
                </h4>

                {/* Choose Card Section */}
                <ChooseCardSection
                  paymentOptions={paymentOptions}
                  styles={styles}
                  getSelectedPayment={getSelectedPayment}
                />

                <Button
                  onClick={handleProceedToPayment}
                  block
                  size="lg"
                  className="mt-4 fw-bold"
                  style={{
                    backgroundColor: "#2575fc",
                    color: "white",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#1e63db";
                    e.currentTarget.style.boxShadow =
                      "0 6px 10px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#2575fc";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Proceed to Payment
                </Button>

                <Button
                  onClick={handleCancle}
                  block
                  size="lg"
                  className="mt-4 fw-bold"
                  style={{
                    marginLeft: "20px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#d9534f";
                    e.currentTarget.style.boxShadow =
                      "0 6px 10px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "red";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Cancel Payment
                </Button>
              </MDBCol>

              {/* Order Recap Section */}
              <BookingRecap paymentInfo={paymentInfo} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
