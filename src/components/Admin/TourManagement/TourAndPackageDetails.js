import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPackageByTourId,
  getTourDetail,
} from "../../../api/Services/TourAndPackageServices";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

import AdminTourDetails from "./TourDetails";
import AdminPackageDetails from "./PackageDetails";

const TourAndPackageDetails = () => {
  const [tour, setTour] = useState({});
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // Track the selected package
  const { tourId } = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await getTourDetail(tourId);
        setTour(res);
      } catch (err) {
        alert("Can't fetch tour details");
      }
    };

    fetchTour();
  }, [tourId]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getPackageByTourId(tourId);
        setPackages(res);
      } catch (err) {
        alert("Can't fetch packages for this tour");
      }
    };

    fetchPackages();
  }, [tourId]);

  const handleTogglePackage = (tourPackage) => {
    if (selectedPackage?.Id === tourPackage.Id) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(tourPackage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <AdminTourDetails tour={tour} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Packages for this Tour:
        </Typography>
        <Grid container spacing={3}>
          {packages.map((tourPackage, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  border:
                    selectedPackage?.Id === tourPackage.Id
                      ? "2px solid #2196f3"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  transition: "0.3s",
                  ":hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {tourPackage.Name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {tourPackage.Id}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color={
                      selectedPackage?.Id === tourPackage.Id
                        ? "error"
                        : "primary"
                    }
                    onClick={() => handleTogglePackage(tourPackage)}
                  >
                    {selectedPackage?.Id === tourPackage.Id ? "Unsee" : "See"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {selectedPackage && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Selected Package Details:
          </Typography>
          <AdminPackageDetails tourPackage={selectedPackage} />
        </Box>
      )}
    </Box>
  );
};

export default TourAndPackageDetails;
