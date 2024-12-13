import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPackageByTourId,
  getTourDetail,
} from "../../../api/Services/TourAndPackageServices";
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

const AdminPackageDetails = ({ tourPackage }) => {
  const formatDate = (jsonDate) => {
    const timestamp = parseInt(jsonDate.match(/\d+/)[0], 10);
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (!tourPackage) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Loading Package Details...
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
          Package Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  ID
                </TableCell>
                <TableCell>{tourPackage.Id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell>{tourPackage.Name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  CheckIn
                </TableCell>
                <TableCell>{tourPackage.CheckIn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Image
                </TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={`${distributionUrl}/Packages/${tourPackage.Image}`}
                    alt={tourPackage.Name}
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
                  Quantity
                </TableCell>
                <TableCell>{tourPackage.Quantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Activites
                </TableCell>
                <TableCell>
                  <TableCell>{tourPackage.Activities}</TableCell>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Change Schedule
                </TableCell>
                <TableCell>
                  {tourPackage.IsChangeSchedule ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Refund
                </TableCell>
                <TableCell>{tourPackage.IsRefund ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Price
                </TableCell>
                <TableCell>{tourPackage.Price}$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Created At
                </TableCell>
                <TableCell>
                  {tourPackage.CreatedAt
                    ? formatDate(tourPackage.CreatedAt)
                    : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" sx={{ fontWeight: 600 }}>
                  Updated At
                </TableCell>
                <TableCell>
                  {tourPackage.UpdateAt
                    ? formatDate(tourPackage.UpdateAt)
                    : "N/A"}
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

export default AdminPackageDetails;
