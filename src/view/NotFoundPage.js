import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <ErrorOutlineIcon
              sx={{ fontSize: 120, color: "primary.main", mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" fontWeight="bold" color="text.primary">
              404
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mt: 2, mb: 3 }}
            >
              Sorry, we couldn’t find the page you’re looking for.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGoBack}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 4,
              }}
            >
              Return to Homepage
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
