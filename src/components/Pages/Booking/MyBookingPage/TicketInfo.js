import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

const TicketInfo = () => {
  const [ticket, setTicket] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const seeTicketOnclick = () => {
    const mockTicket = {
      packageName: "Summer Adventure Package",
      description: "A thrilling adventure in the mountains.",
      travelDate: "2024-12-15",
      numberOfPeople: 4,
      isRefund: true,
      isChangeSchedule: false,
    };

    setTicket(mockTicket);
    setIsVisible(true); // Show the ticket mini-box
  };

  const closeTicketBox = () => {
    setIsVisible(false); // Hide the ticket mini-box
  };

  return (
    <Box sx={{ textAlign: "center", padding: 4 }}>
      {/* Button to see ticket */}
      <Button
        variant="contained"
        color="primary"
        onClick={seeTicketOnclick}
        sx={{ fontSize: 16, fontWeight: "bold" }}
      >
        See Ticket
      </Button>

      {/* Ticket mini-box */}
      {isVisible && ticket && (
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 400,
            width: "90%",
            borderRadius: 3,
            boxShadow: 4,
            zIndex: 1000,
            bgcolor: "white",
            padding: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {ticket.packageName}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {ticket.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Date of Travel:</strong> {ticket.travelDate}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Number of People:</strong> {ticket.numberOfPeople}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Refund Policy:</strong>{" "}
              {ticket.isRefund ? "Can Refund" : "Can't Refund"}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Schedule Change:</strong>{" "}
              {ticket.isChangeSchedule
                ? "Can Change Schedule"
                : "Can't Change Schedule"}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={closeTicketBox}
              sx={{ marginTop: 2 }}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Overlay to dim background when ticket is visible */}
      {isVisible && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeTicketBox}
        />
      )}
    </Box>
  );
};

export default TicketInfo;
