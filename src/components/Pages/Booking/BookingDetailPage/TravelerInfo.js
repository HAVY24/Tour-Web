import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";

export default function TravelerInfo({ ticket, setPeopleInformation }) {
  // State to store traveler information
  const [peopleInfo, setPeopleInfo] = useState(
    Array(ticket.travelerNum).fill({ name: "", phone: "" })
  );

  // Update parent component's state whenever peopleInfo changes
  useEffect(() => {
    setPeopleInformation(peopleInfo);
  }, [peopleInfo, setPeopleInformation]);

  // Handle changes to traveler information inputs
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setPeopleInfo((prev) =>
      prev.map((person, i) =>
        i === index ? { ...person, [name]: value } : person
      )
    );
  };

  return (
    <Card
      sx={{
        mb: 4,
        boxShadow: 4,
        border: "1px solid #bbdefb",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardHeader
        title="Traveler Information"
        subheader="Optional: Enter information for each traveler."
        avatar={<Person sx={{ color: "#1e88e5" }} />}
        sx={{
          background: "#e3f2fd",
          py: 2,
          "& .MuiCardHeader-title": { fontWeight: "bold", fontSize: "1.2rem" },
        }}
      />
      <Divider sx={{ backgroundColor: "#90caf9" }} />
      <CardContent>
        <Grid container spacing={3}>
          {peopleInfo.map((person, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  p: 2,
                  boxShadow: 2,
                  border: "1px solid #e0f7fa",
                  borderRadius: 1,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    color: "#00695c",
                    textAlign: "center",
                  }}
                >
                  Traveler {index + 1}
                </Typography>
                <TextField
                  label="Full Name"
                  value={person.name}
                  name="name"
                  onChange={(e) => handleInputChange(e, index)}
                  fullWidth
                  sx={{ mb: 2 }}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Phone Number"
                  value={person.phone}
                  name="phone"
                  onChange={(e) => handleInputChange(e, index)}
                  fullWidth
                  sx={{ mb: 2 }}
                  variant="outlined"
                  size="small"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
