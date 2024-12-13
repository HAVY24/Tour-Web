import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../../UserContext";
import { useNavigate } from "react-router-dom";
import PurchaseCard from "./PurchaseCard";
import styles from "../../../../styles/MyBookingPage.module.css";
import {
  getMyAcceptBooking,
  getMyApprovalBooking,
  getMyBooking,
  getMyCanceledBooking,
  getMyPendingBooking,
  getMyUnacceptedBooking,
  setStatus,
  softDeleteBooking,
} from "../../../../api/Services/BookingServices.js";

import Commercial from "./Commercial";
import NotFoundBooking from "./NotFoundBooking";
import TimerContext from "../../../../TimerContext";
import Swal from "sweetalert2";
import FilterBox from "./FilterBox";

export default function MyBookingPage() {
  const user = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("dataTransfer"));
  const dataTransfer = storedData;

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { timeRemaining, setTimeRemaining, timerExpired, setTimerExpired } =
    useContext(TimerContext);

  const detailOnclick = (bookingId) => {
    navigate(`/payment/${bookingId}`, {
      state: {
        dataTransfer,
      },
    });
  };

  const deleteOnclick = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await softDeleteBooking(bookingId);

        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.Id !== bookingId)
        );

        Swal.fire("Deleted!", "Your booking has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete the booking:", error);
        Swal.fire(
          "Error!",
          "An error occurred while trying to delete the booking.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    const fetchMyBooking = async () => {
      if (!user?.userId) {
        return;
      }
      try {
        setIsLoading(true);
        const res = await getMyBooking(user.userId);
        setBookings(res);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyBooking();
  }, [user.userId]);

  useEffect(() => {
    if (timerExpired) {
      const updateStatus = async () => {
        try {
          const res = await setStatus({
            bookingId: storedData?.bookingId,
            status: "cancel",
          });
          console.log("Status updated:", res);
        } catch (err) {
          console.error("Failed to update status:", err);
        }
      };

      updateStatus();
    }
  }, [timerExpired, storedData?.bookingId]);

  const handleFilter = async (filterType) => {
    try {
      let res;
      switch (filterType) {
        case "all":
          res = await getMyBooking(user.userId);
          break;
        case "pending":
          res = await getMyPendingBooking(user.userId);
          break;
        case "waiting":
          res = await getMyApprovalBooking(user.userId);
          break;
        case "accepted":
          res = await getMyAcceptBooking(user.userId);
          break;
        case "unaccepted":
          res = await getMyUnacceptedBooking(user.userId);
          break;
        case "cancel":
          res = await getMyCanceledBooking(user.userId);
          break;
        default:
          throw new Error("Invalid filter type");
      }
      setBookings(res);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  return (
    <div className={styles.page}>
      <Commercial />

      <div className={styles.rightSide}>
        <h1 className={styles.pageTitle}>My Bookings</h1>
        <p className={styles.pageSubtitle}>
          View and manage your tour bookings here
        </p>
        <FilterBox handleFilter={handleFilter} />

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}>Loading your bookings...</div>
          </div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : bookings.length > 0 ? (
          <div
            className={
              bookings.length >= 5
                ? `${styles.bookingList} ${styles.scrollableList}`
                : styles.bookingList
            }
          >
            {[...bookings].reverse().map((booking) => (
              <PurchaseCard
                key={booking.Id}
                styles={styles}
                booking={booking}
                detailOnclick={() => detailOnclick(booking.Id)}
                timeRemained={timeRemaining}
                timerExpire={timerExpired}
                getTimeRemaining={setTimeRemaining}
                getTimerExpired={setTimerExpired}
                deleteOnclick={() => deleteOnclick(booking.Id)}
              />
            ))}
          </div>
        ) : (
          <NotFoundBooking styles={styles} />
        )}
      </div>
    </div>
  );
}
