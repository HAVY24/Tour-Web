import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function AddPayment() {
  return (
    <Container
      sx={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
      maxWidth="xl"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={8} lg={6}>
          <Paper sx={{ padding: 4, borderRadius: "12px" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Settings
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Payment
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Add new card:
            </Typography>
            <form>
              <TextField
                label="Cardholder's Name"
                variant="outlined"
                fullWidth
                size="medium"
                value="Anna Doe"
                sx={{ marginBottom: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    size="medium"
                    value="1234 5678 1234 5678"
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Expire"
                    variant="outlined"
                    fullWidth
                    size="medium"
                    placeholder="MM/YYYY"
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    size="medium"
                    placeholder="CVV"
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Add card
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
