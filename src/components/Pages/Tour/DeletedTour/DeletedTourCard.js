import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { DeleteForever, Restore } from "@mui/icons-material";
import { Link } from "react-router-dom";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function DeletedTourCard({
  tours,
  formatDate,
  getTourImage,
  handleRestoreTour,
  handlePermanentDelete,
}) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333", marginBottom: "2rem" }}
      >
        Deleted Tours
      </Typography>

      <Grid container spacing={3}>
        {tours.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            No deleted tours available.
          </Typography>
        ) : (
          tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour.Id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "500px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 4,
                  },
                }}
              >
                {/* Tour Title and Location Section */}
                <Link
                  to={`/detail/${tour.Id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      sx={{ fontWeight: "600" }}
                    >
                      {tour.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tour.Region}, {tour.Country}, {tour.City}
                    </Typography>
                  </Box>
                </Link>

                {/* Tour Image Section */}
                <Link to={`/detail/${tour.Id}`}>
                  <Box
                    component="img"
                    src={getTourImage(tour.Image)}
                    alt={tour.Name}
                    sx={{ width: "100%", height: 240, objectFit: "cover" }}
                  />
                </Link>

                {/* Deleted At Section */}
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="caption" color="red">
                    Deleted At: {formatDate(tour.DeletedAt)}
                  </Typography>
                </Box>

                {/* Action Section */}
                <Box
                  display="flex"
                  justifyContent="space-around"
                  sx={{ p: 2, pt: 1 }}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<Restore />}
                    onClick={() => handleRestoreTour(tour.Id)}
                    sx={{
                      borderColor: "green",
                      "&:hover": {
                        backgroundColor: "green",
                        color: "#fff",
                      },
                    }}
                  >
                    Restore
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteForever />}
                    onClick={() => handlePermanentDelete(tour.Id)}
                    sx={{
                      borderColor: "red",
                      "&:hover": {
                        backgroundColor: "red",
                        color: "#fff",
                      },
                    }}
                  >
                    Delete Forever
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
