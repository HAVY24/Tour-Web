import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function BookingDetail({
  tourDates,
  tourPackage,
  totalQuantity,
  setTravelDay,
  handleClickBook,
  setTravlerNumber,
  setTotal,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);

  setTravelDay(selectedDate);
  setTravlerNumber(quantity);

  const totalPrice = quantity * tourPackage?.Price;
  setTotal(totalPrice);

  const handleBookNow = () => {
    if (!selectedDate) {
      Swal.fire({
        title: "Please choose a travel date",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#1976d2",
      });
    } else {
      // Proceed with the booking logic
      handleClickBook();
    }
  };

  return (
    <Paper elevation={8} sx={{ p: 4, borderRadius: 2, boxShadow: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "600",
          color: "#1976d2",
          mb: 3,
          textAlign: "center",
          fontSize: "28px",
        }}
      >
        Booking Details
      </Typography>
      <Divider sx={{ my: 3 }} />

      {/* Part 1: Schedule */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#455a64", fontWeight: "600" }}
        >
          Choose Your Travel Date
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tourDates.map((date, index) => (
            <Button
              key={index}
              variant={selectedDate === date ? "contained" : "outlined"}
              onClick={() => setSelectedDate(date)}
              sx={{
                minWidth: "120px",
                borderRadius: "20px",
                color: selectedDate === date ? "#fff" : "#1976d2",
                backgroundColor:
                  selectedDate === date ? "#1976d2" : "transparent",
                "&:hover": {
                  backgroundColor: "#145ca0",
                  color: "#fff",
                },
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
            >
              {new Date(date).toLocaleDateString()}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Part 2: Selected Date */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#455a64",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Selected Date
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            color: selectedDate ? "#1976d2" : "#757575",
            fontWeight: "500",
            fontSize: "18px",
            padding: "8px 16px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "No date selected"}
        </Box>
      </Box>

      {/* Part 3: Price per Person */}
      <Box
        sx={{ mb: 5, backgroundColor: "#e3f2fd", p: 2, borderRadius: "10px" }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "600", fontSize: "20px" }}
        >
          Price per Person
        </Typography>
        <Typography variant="body2" sx={{ color: "#455a64" }}>
          (If you are a group of more than 10 people, please contact us for the
          best price.)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h4"
            sx={{
              flex: 1,
              fontWeight: "700",
              color: "#1976d2",
              fontSize: "24px",
            }}
          >
            ${tourPackage?.Price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              color="error"
              sx={{
                "&:hover": { backgroundColor: "#f2f2f2" },
                transition: "background-color 0.2s ease",
              }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6" sx={{ color: "#1976d2" }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={() => setQuantity((prev) => prev + 1)}
              color="success"
              sx={{
                "&:hover": { backgroundColor: "#f2f2f2" },
                transition: "background-color 0.2s ease",
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: "#455a64" }}>
          Remaining: {totalQuantity ? totalQuantity : "N/A"}
        </Typography>
      </Box>

      {/* Part 4: Total Price and Book Button */}
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#455a64",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Total Price:{" "}
          <span style={{ color: "#1976d2", fontWeight: "700" }}>
            ${totalPrice.toFixed(2)}
          </span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleBookNow} // Use the new function to handle booking
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#145ca0" },
            padding: "14px",
            borderRadius: "20px",
            fontWeight: "600",
          }}
        >
          Book Now
        </Button>
      </Box>
    </Paper>
  );
}
