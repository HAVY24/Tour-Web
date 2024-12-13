import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Grid } from "@mui/material";

const UserAddress = ({ onSubmit }) => {
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for missing fields
    const missingFields = Object.entries(address).filter(
      ([key, value]) => !value
    );
    if (missingFields.length > 0) {
      alert(
        `Please fill in all fields: ${missingFields.map(([key]) => key).join(", ")}`
      );
      return;
    }

    // Validate postal code to ensure it's an integer
    if (!/^\d+$/.test(address.postalCode)) {
      setError("Postal code must be a valid number.");
      return;
    } else {
      setError(""); // Clear any previous error
    }

    // Format address as a comma-separated string
    const addressString = Object.values(address).join(", ");
    onSubmit(addressString);
  };

  return (
    <Box sx={{ minWidth: "50%", padding: 2, maxWidth: "100%" }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Billing Address
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                value={address.street}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={address.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={address.state}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                required
                error={!!error} // Show error styling if error exists
                helperText={error} // Display error message
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={address.country}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Address
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UserAddress;
