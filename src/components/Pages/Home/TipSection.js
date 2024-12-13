import React from "react";
import { Button, Typography, Box } from "@mui/material";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function TipSection() {
  return (
    <Box sx={{ position: "relative", textAlign: "center", mt: 8 }}>
      {/* Background Image */}
      <Box
        component="img"
        src={`${distributionUrl}/Static/travelTrip.jpg`}
        alt="Travel Tips"
        sx={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          filter: "brightness(0.7)",
        }}
      />
      {/* Overlay Content */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          TRAVEL TIPS
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            maxWidth: "600px",
            mx: "auto",
            mb: 3,
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          Northern Ireland’s is now contingent. Britain is getting a divorce.
          Northern Ireland is being offered a trial separation from Britain.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontSize: "18px",
            px: 4,
            py: 1.5,
            textTransform: "uppercase",
          }}
        >
          Get Inspired
        </Button>
      </Box>
    </Box>
  );
}
