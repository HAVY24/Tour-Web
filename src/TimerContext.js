import React, { createContext, useState, useEffect, useRef } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const initialTime = parseInt(localStorage.getItem("time"));
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerRef = useRef(null); // Reference to the interval

  useEffect(() => {
    localStorage.setItem("time", timeRemaining);

    if (timeRemaining <= 0) {
      setTimerExpired(true);
      clearInterval(timerRef.current); // Clear the interval when time runs out
    }
  }, [timeRemaining]);

  const startTimer = () => {
    if (timerRef.current) return; // Avoid starting multiple intervals

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    // Start the timer when the component mounts if time is left
    if (timeRemaining > 0) {
      startTimer();
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [timeRemaining]);

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        setTimeRemaining,
        timerExpired,
        setTimerExpired,
        stopTimer,
        startTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
