import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import classNames from "classnames";

const PurchaseCard = ({
  styles,
  booking,
  detailOnclick,
  timeRemained,
  getTimeRemaining,
  timerExpire,
  getTimerExpired,
  deleteOnclick,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timeRemained);
  const [timerExpired, setTimerExpired] = useState(timerExpire);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("dataTransfer"))
  );

  useEffect(() => {
    getTimeRemaining(timeRemaining);
    getTimerExpired(timerExpired);
  }, [timeRemaining, timerExpired, getTimeRemaining, getTimerExpired]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimerExpired(true);
    }
  }, [timeRemaining]);

  const [isVisible, setIsVisible] = useState(false);

  const seeTicketOnclick = () => {
    setIsVisible(true);
  };

  const closeTicketBox = () => {
    setIsVisible(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Map status to class, message, and footer
  const statusMap = {
    pending: {
      class: styles.statusPending,
      message: timerExpired
        ? "⚠️ Expired"
        : `⏳ Time remaining: ${formatTime(timeRemaining)}`,
      footer: (
        <span
          className={classNames(styles.seeDetails, styles.pending)}
          onClick={detailOnclick}
        >
          See Details
        </span>
      ),
    },
    waiting: {
      class: styles.statusWaiting,
      message: "Waiting for payment approval",
      footer: (
        <span className={classNames(styles.seeDetails, styles.waiting)}>
          Please wait for approval
        </span>
      ),
    },
    success: {
      class: styles.statusSuccess,
      message: "Payment Successful",
      footer: (
        <span
          className={classNames(styles.seeDetails, styles.success)}
          onClick={seeTicketOnclick}
        >
          Click here to see Your Ticket
        </span>
      ),
    },
    cancel: {
      class: styles.statusCancel,
      message: "Payment Cancelled",
      footer: (
        <span className={classNames(styles.seeDetails, styles.cancel)}>
          Payment has been Cancelled
        </span>
      ),
    },
    fail: {
      class: styles.statusFail,
      message: "Your Payment Has Been Declined",
      footer: (
        <span
          className={classNames(styles.seeDetails, styles.fail)}
          onClick={deleteOnclick}
        >
          Contact support for details.
        </span>
      ),
    },
  };

  const {
    class: statusClass,
    message,
    footer,
  } = statusMap[booking.Status] || {};

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{booking.Name}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.bookingId}>Booking ID: {booking.Id}</span>
        <span className={classNames(styles.status, statusClass)}>
          {message}
        </span>
      </div>
      {/* Ticket mini-box */}
      {isVisible && (
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 400,
            width: "90%",
            borderRadius: 3,
            boxShadow: 6,
            zIndex: 1000,
            bgcolor: "background.paper",
            padding: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              fontWeight="bold"
            >
              {booking.Name}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color="text.secondary"
              align="center"
            >
              {booking.Description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CalendarTodayOutlinedIcon color="primary" />
              <Typography variant="body1">
                <strong>Date of Travel:</strong> {data?.BookingDate}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <PeopleOutlineIcon color="primary" />
              <Typography variant="body1">
                <strong>Number of People:</strong> {booking.NumOfPeople}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CachedOutlinedIcon color="primary" />
              <Typography variant="body1">
                <strong>Refund Policy:</strong>{" "}
                {booking.IsRefund ? "Can Refund" : "Can't Refund"}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EventRepeatOutlinedIcon color="primary" />
              <Typography variant="body1">
                <strong>Schedule Change:</strong>{" "}
                {booking.IsChangeSchedule
                  ? "Can Change Schedule"
                  : "Can't Change Schedule"}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={closeTicketBox}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  paddingX: 4,
                }}
              >
                Close
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <div className={styles.footer}>
        {footer}
        <span className={styles.dot}></span>
      </div>
      {/* Delete Button */}
      {booking.Status !== "waiting" && booking.Status !== "pending" && (
        <button
          className={classNames(styles.deleteButton)}
          onClick={() => deleteOnclick(booking.Id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PurchaseCard;
