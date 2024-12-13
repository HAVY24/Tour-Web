// CountdownSection Component
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/PaymentPage.module.css";

export default function CountdownSection({
  getTimerExpired,
  getTimeRemain,
  timeRemained,
  timerExpiring,
}) {
  const [timeRemaining, setTimeRemaining] = useState(timeRemained);
  const [timerExpired, setTimerExpired] = useState(timerExpiring);

  useEffect(() => {
    getTimerExpired(timerExpired);
    getTimeRemain(timeRemaining);
  }, [timerExpired, timeRemaining, getTimerExpired, getTimeRemain]);

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={styles.timerContainer}
      style={{
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "12px 20px",
        borderRadius: "8px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <p className={styles.timerText}>
        {timerExpired
          ? "⚠️ Payment session expired"
          : `⏳ Time remaining: ${formatTime(timeRemaining)}`}
      </p>
    </div>
  );
}
