import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

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
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        maxWidth: 600,
        p: 3,
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        textAlign: "center",
        borderRadius: 3,
        mb: 3,
        color: "#0d47a1",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {timerExpired
          ? "⚠️ Payment session expired"
          : `⏳ Time remaining: ${formatTime(timeRemaining)}`}
      </Typography>
    </Paper>
  );
}
