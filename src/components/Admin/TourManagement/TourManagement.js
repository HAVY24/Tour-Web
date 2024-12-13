import React, { useEffect, useContext, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Pagination,
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import {
  deleteSoftTour,
  getTours,
} from "../../../api/Services/TourAndPackageServices";
import UserContext from "../../../UserContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FilterBox from "./FilterBox";

const TourManagement = () => {
  const distributorUrl = process.env.REACT_APP_DISTRIBUTION_URL;
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(6);
  const [filters, setFilters] = useState({
    searchQuery: "",
    searchBy: "",
    sortBy: "",
  });
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user?.userId) {
      return;
    }
    fetchTours(currentPage, filters);
  }, [user?.userId, currentPage, filters]);

  const fetchTours = async (page, filters) => {
    try {
      const res = await getTours(page, pageSize, filters);
      setTours(res.tours);
      setTotalPages(res.totalPages);
    } catch (error) {
      alert("Can't fetch tours");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tour will be moved to the trash can.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, move to trash!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteSoftTour(id);

        if (res.message === "success") {
          setTours((prevTours) => prevTours.filter((tour) => tour.Id !== id));
          Swal.fire(
            "Moved to Trash!",
            "The tour has been moved to the trash can.",
            "success"
          );
        } else {
          Swal.fire(
            "Error!",
            "There was an issue moving the tour to the trash can.",
            "error"
          );
        }
      }
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  function formatDate(jsonDate) {
    if (!jsonDate || typeof jsonDate !== "string") {
      return "Invalid date"; // Handle null, undefined, or invalid inputs
    }

    const date = new Date(jsonDate);
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Handle invalid date strings
    }

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format and return the result
    return `${year}/${month}/${day}`;
  }

  return (
    <Box sx={{ display: "flex", gap: 3, p: 3 }}>
      {/* FilterBox on the left */}
      <FilterBox onSearch={handleSearch} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Manage Tours
        </Typography>

        <Grid container spacing={3}>
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour.Id}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 4,
                  },
                }}
              >
                <Link to={`/detail/${tour.Id}`}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      `${distributorUrl}/Tours/${tour.Image}` ||
                      "https://via.placeholder.com/300"
                    }
                    alt={tour.Name}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {tour.Name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {tour.City}, {tour.Country}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    Created: {formatDate(tour.CreatedAt)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    Updated: {formatDate(tour.UpdateAt)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Link to={`/admin/tour/detal/${tour.Id}`}>
                    <Button
                      variant="outlined"
                      startIcon={<Info />}
                      sx={{ textTransform: "none" }}
                    >
                      Details
                    </Button>
                  </Link>
                  <Box>
                    <Link to={`/tour/update/${tour.Id}`}>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(tour.Id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination Component */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TourManagement;
