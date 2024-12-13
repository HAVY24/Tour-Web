import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../../UserContext";
import CreateTour from "../CreateTourAndPackage/CreateTourPage/CreateTour";
import CreatePackage from "../CreateTourAndPackage/CreatePackagePage/CreatePackage";
import {
  countPackageInTour,
  getPackageByTourId,
  getTourDetail,
  updateTourAndPackages,
} from "../../../../api/Services/TourAndPackageServices";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { sendImage } from "../../../../api/Services/CloudServices";

export default function UpdateTourPage() {
  const { tourId } = useParams();
  const user = useContext(UserContext);
  const user_id = user.userId;
  const [numPackage, setNumPackage] = useState();
  const [tourChange, setTourChange] = useState(null);
  const [packageChange, setPackageChange] = useState(null);
  const [isPackageChange, setIsPackageChange] = useState(false);

  const [tourPackages, setTourPackage] = useState([
    {
      name: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      activities: [""],
      VAT: "",
      checkIn: "",
      isChangeSchedule: false,
      isRefund: false,
      imageUpload: "",
    },
  ]);

  const [tour, setTour] = useState({
    Name: "",
    Region: "",
    Country: "",
    City: "",
    Image: "",
    Opening: "",
    Ending: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [tourRes, packagesRes, countRes] = await Promise.all([
        getTourDetail(tourId),
        getPackageByTourId(tourId),
        countPackageInTour(tourId),
      ]);
      setTour(tourRes);
      setTourChange(tourRes);
      setTourPackage(packagesRes);
      setPackageChange(packagesRes);
      setNumPackage(countRes);
    };
    fetchData();
  }, [tourId]);

  const getPackage = (data) => {
    setTourPackage(data);
  };

  const getTour = (data) => {
    setTour(data);
  };

  const updateClick = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to update the tour and packages.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "Updating...",
          text: "Please wait while the tour and packages are being updated.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const data = { tour, tourPackages, user_id };

        const res = await updateTourAndPackages(data);

        if (tourChange.Image != tour.Image) {
          await sendImage(tour.imageUpload, "Tours");
        }

        await Promise.all(
          tourPackages.map(async (item) => {
            if (item.imageUpload != null) {
              await sendImage(item.imageUpload, "Packages");
            }
          })
        );

        if (res.message === "success") {
          Swal.fire({
            title: "Updated!",
            text: "The tour and packages have been successfully updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an issue updating the tour and packages. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the tour and packages. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Update Tour
      </Typography>
      {numPackage > 0 && (
        <>
          <CreateTour getTour={getTour} defaultTour={tour} />

          <CreatePackage
            getPackage={getPackage}
            defaultPackage={tourPackages}
            numPackage={numPackage}
          />
        </>
      )}

      <Box textAlign="center">
        <Button
          onClick={updateClick}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
        >
          Update
        </Button>
      </Box>
    </>
  );
}
