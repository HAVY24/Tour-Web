import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
  Checkbox,
  FormControlLabel,
  CardMedia,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function CreatePackage({
  getPackage,
  numPackage,
  defaultPackage,
}) {
  const initialTourPackages =
    Array.isArray(defaultPackage) && defaultPackage.length > 0
      ? defaultPackage.map((pkg) => ({
          ...pkg,
          Activities: pkg.Activities ? pkg.Activities.split(",") : [],
        }))
      : Array(numPackage).fill({
          Name: "",
          Description: "",
          Image: "",
          Price: "",
          Quantity: "",
          CheckIn: "",
          Activities: [""],
          VAT: "",
          IsChangeSchedule: false,
          IsRefund: false,
          imageUpload: "",
        });

  const [tourPackages, setTourPackage] = useState(initialTourPackages);
  const distributorUrl = process.env.REACT_APP_DISTRIBUTION_URL;

  useEffect(() => {
    getPackage(
      tourPackages.map((tour) => ({
        ...tour,
        Activities: tour.Activities.join(", "),
      }))
    );
  }, [tourPackages, getPackage]);

  const removeTour = (index) => {
    const updatedTours = tourPackages.filter((_, i) => i !== index);
    setTourPackage(updatedTours);
  };

  const handleTourChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTours = [...tourPackages];
    updatedTours[index][name] = value;
    setTourPackage(updatedTours);
  };

  const handleCheckboxChange = (index, e) => {
    const { name, checked } = e.target;
    const updatedTours = [...tourPackages];
    updatedTours[index][name] = checked;
    setTourPackage(updatedTours);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedTours = [...tourPackages];
    updatedTours[index].Image = file.name;
    updatedTours[index].imagePreview = URL.createObjectURL(file);
    updatedTours[index].imageUpload = file;
    setTourPackage(updatedTours);
  };

  const handleActivityChange = (tourIndex, activityIndex, value) => {
    const updatedTours = [...tourPackages];
    updatedTours[tourIndex].Activities[activityIndex] = value;
    setTourPackage(updatedTours);
  };

  const addActivityField = (tourIndex) => {
    const updatedTours = [...tourPackages];
    updatedTours[tourIndex].Activities.push(""); // Add an empty activity
    setTourPackage(updatedTours);
  };

  const removeActivityField = (tourIndex, activityIndex) => {
    const updatedTours = [...tourPackages];
    updatedTours[tourIndex].Activities = updatedTours[
      tourIndex
    ].Activities.filter((_, i) => i !== activityIndex);
    setTourPackage(updatedTours);
  };

  const addTour = () => {
    setTourPackage([
      ...tourPackages,
      {
        Name: "",
        Description: "",
        Image: "",
        Price: "",
        Quantity: "",
        CheckIn: "",
        Activities: [""],
        VAT: "",
        IsChangeSchedule: false,
        IsRefund: false,
        imageUpload: "",
      },
    ]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tour Package
      </Typography>
      {tourPackages.map((tour, tourIndex) => (
        <Box
          key={tourIndex}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            p: 2,
            mb: 3,
            position: "relative",
            marginBottom: "125px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Tour Name"
                name="Name"
                value={tour.Name}
                onChange={(e) => handleTourChange(tourIndex, e)}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="VAT"
                name="VAT"
                value={tour.VAT}
                onChange={(e) => handleTourChange(tourIndex, e)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Check In"
                name="CheckIn"
                value={tour.CheckIn}
                onChange={(e) => handleTourChange(tourIndex, e)}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Price ($)"
                name="Price"
                type="number"
                value={tour.Price}
                onChange={(e) => handleTourChange(tourIndex, e)}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Quantity"
                name="Quantity"
                type="number"
                value={tour.Quantity}
                onChange={(e) => handleTourChange(tourIndex, e)}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Description"
                name="Description"
                value={tour.Description}
                onChange={(e) => handleTourChange(tourIndex, e)}
                required
                multiline
                minRows={5}
                maxRows={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                Uploaded Images: {tour.Image}
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(tourIndex, e)}
                style={{ display: "block", marginBottom: "10px" }}
              />

              {!tour.imagePreview && (
                <CardMedia
                  component="img"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  image={
                    `${distributorUrl}/Packages/${tour.Image}` ||
                    "https://via.placeholder.com/300"
                  }
                  alt={tour.Name}
                />
              )}

              {tour.imagePreview && (
                <img
                  src={tour.imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "auto",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Activities
              </Typography>
              {tour.Activities.map((activity, activityIndex) => (
                <Box
                  key={activityIndex}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    label={`Activity ${activityIndex + 1}`}
                    value={activity}
                    onChange={(e) =>
                      handleActivityChange(
                        tourIndex,
                        activityIndex,
                        e.target.value
                      )
                    }
                  />
                  <IconButton
                    onClick={() =>
                      removeActivityField(tourIndex, activityIndex)
                    }
                    disabled={tour.Activities.length === 1}
                    sx={{ ml: 1 }}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddCircleIcon />}
                onClick={() => addActivityField(tourIndex)}
                sx={{ mt: 1 }}
              >
                Add Activity
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tour.IsChangeSchedule}
                    onChange={(e) => handleCheckboxChange(tourIndex, e)}
                    name="IsChangeSchedule"
                  />
                }
                label="Can Change Schedule"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tour.IsRefund}
                    onChange={(e) => handleCheckboxChange(tourIndex, e)}
                    name="IsRefund"
                  />
                }
                label="Can Refund"
              />
            </Grid>
          </Grid>
          {tourPackages.length > 1 && (
            <IconButton
              onClick={() => removeTour(tourIndex)}
              sx={{
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
            >
              <RemoveCircleIcon color="error" />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        onClick={addTour}
        sx={{ mt: 2 }}
      >
        Add Another Package
      </Button>
    </Paper>
  );
}
