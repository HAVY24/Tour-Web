import React, { useEffect, useContext, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";
import { DeleteForever, Restore, AccessTime } from "@mui/icons-material";
import {
  deletePermanentlyTour,
  getDeletedTour,
  restoreTour,
} from "../../../../api/Services/TourAndPackageServices";
import UserContext from "../../../../UserContext";
import Swal from "sweetalert2";
import DeletedTourCard from "./DeletedTourCard";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

const DeletedTourPage = () => {
  const [tours, setTours] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user?.userId) {
      return;
    }
    const fetchTours = async () => {
      try {
        const res = await getDeletedTour(user.userId);
        setTours(res);
      } catch (error) {
        alert("Cannot fetch deleted tours.");
      }
    };
    fetchTours();
  }, [user.userId]);

  const handlePermanentDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tour will be permanently deleted and cannot be restored.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePermanentlyTour(id);
        setTours((prevTours) => prevTours.filter((tour) => tour.Id !== id));
        Swal.fire(
          "Deleted!",
          "The tour has been permanently deleted.",
          "success"
        );
      }
    });
  };

  const handleRestoreTour = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tour will be restored and removed from the deleted list.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await restoreTour(id);
          setTours((prevTours) => prevTours.filter((tour) => tour.Id !== id));
          Swal.fire(
            "Restored!",
            "The tour has been restored successfully.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error!",
            "Failed to restore the tour. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const parseImageNames = (imageNames) => {
    if (!imageNames) return [];
    return imageNames.split(",").map((name) => name.trim());
  };

  const getTourImage = (imageName, index = 0) => {
    const images = parseImageNames(imageName);
    if (images.length > index) {
      return `${distributionUrl}/Tours/${images[index]}`;
    }
    if (typeof imageName === "string") {
      return `${distributionUrl}/Tours/${imageName}`;
    }
    return "https://via.placeholder.com/300";
  };

  function formatDate(jsonDate) {
    const timestamp = parseInt(jsonDate.match(/\d+/)[0], 10);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <DeletedTourCard
      tours={tours}
      formatDate={formatDate}
      getTourImage={getTourImage}
      handleRestoreTour={handleRestoreTour}
      handlePermanentDelete={handlePermanentDelete}
    />
  );
};

export default DeletedTourPage;
