import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";

const BlockedProfilePage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ff4b2b, #ff416c)",
        padding: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 4,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BlockIcon sx={{ fontSize: 60, color: "#ff416c", marginBottom: 2 }} />
        <Typography
          variant="h4"
          component="h2"
          color="#ff416c"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Profile Blocked
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 3 }}>
          We're sorry, but your profile is currently blocked due to some issues.
          Please contact support for more information.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={goBack}
          sx={{
            fontWeight: "bold",
            borderRadius: "30px",
            padding: "10px 30px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default BlockedProfilePage;
