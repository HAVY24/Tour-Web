import React, { useState } from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateTour from "./CreateTour";
import { Description } from "@mui/icons-material";

const CreateTourPage = () => {
  const [tour, setTour] = useState({
    Name: "",
    Region: "",
    Country: "",
    City: "",
    Image: "",
    Opening: "",
    Ending: "",
    imageUpload: "",
    UserId: "",
    Description: "",
  });

  const getTour = (data) => {
    setTour(data);
  };

  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate("/createTourPackage", { state: { tour } });
  };

  const handleManageTour = () => {
    navigate("/tour/manage");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Tour
      </Typography>
      <CreateTour getTour={getTour} defautlTour={null} />

      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateNew}
          sx={{ mr: 2 }}
        >
          Create New
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={handleManageTour}
        >
          Manage Tour
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTourPage;
