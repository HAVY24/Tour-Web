import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../../UserContext";
import { useLocation } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

import { createTourAndPackages } from "../../../../../api/Services/TourAndPackageServices";
import CreatePackage from "./CreatePackage";
import Swal from "sweetalert2";
import { sendImage } from "../../../../../api/Services/CloudServices";

const CreateTourPackage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const user_id = user.userId;
  const [tour, setTour] = useState(
    location.state?.tour || {
      Name: "",
      Region: "",
      Country: "",
      City: "",
      Image: "",
      Opening: "",
      Ending: "",
      imageUpload: "",
      Description: "",
    }
  );

  const [tourPackages, setTourPackage] = useState([
    {
      name: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      checkkIn: "",
      activities: [""],
      VAT: "",
      isChangeSchedule: false,
      isRefund: false,
      imageUpload: "",
    },
  ]);

  const getPackage = React.useCallback((data) => {
    setTourPackage(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { tour, tourPackages, user_id };
    console.log(data);

    Swal.fire({
      title: "Submitting...",
      text: "Please wait while your tour and packages are being created.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await createTourAndPackages(data);
      await sendImage(tour.imageUpload, "Tours");

      await Promise.all(
        tourPackages.map(async (item) => {
          await sendImage(item.imageUpload, "Packages");
        })
      );
      if (res.message === "success") {
        Swal.fire({
          title: "Success!",
          text: "Your tour and packages have been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/tour/manage");
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was a problem creating your tour and packages. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was a problem creating your tour and packages. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  console.log(tour);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create TourPackages
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Tours Section */}
        <CreatePackage getPackage={getPackage} />

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTourPackage;
