import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Paper,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

const AdminTourDetails = ({ tour }) => {
  const formatTime = (time) => {
    if (!time) return "N/A";

    const date = new Date();
    date.setHours(time.Hours, time.Minutes, 0, 0);

    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleString("en-US", options);
  };

  const formatDate = (jsonDate) => {
    const timestamp = parseInt(jsonDate.match(/\d+/)[0], 10);
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (!tour) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Loading tour details...
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 900,
        margin: "20px auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Tour Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  ID
                </TableCell>
                <TableCell>{tour.Id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell>{tour.Name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Region
                </TableCell>
                <TableCell>{tour.Region}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Country
                </TableCell>
                <TableCell>{tour.Country}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  City
                </TableCell>
                <TableCell>{tour.City}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Image
                </TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={`${distributionUrl}/Tours/${tour.Image}`}
                    alt={tour.Name}
                    sx={{
                      width: 150,
                      height: 100,
                      borderRadius: 2,
                      objectFit: "cover",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Description
                </TableCell>
                <TableCell>{tour.Description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Opening Time
                </TableCell>
                <TableCell>
                  {tour.Opening ? formatTime(tour.Opening) : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Ending Time
                </TableCell>
                <TableCell>
                  {tour.Ending ? formatTime(tour.Ending) : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Created At
                </TableCell>
                <TableCell>
                  {tour.CreatedAt ? formatDate(tour.CreatedAt) : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Updated At
                </TableCell>
                <TableCell>
                  {tour.UpdateAt ? formatDate(tour.UpdateAt) : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Created By
                </TableCell>
                <TableCell>
                  {tour.FirstName} {tour.LastName} (ID: {tour.UserId})
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            component={Link}
            to="/tour/manage"
            sx={{ borderRadius: 2 }}
          >
            Back
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdminTourDetails;
