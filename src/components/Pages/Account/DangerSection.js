import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  blockUserProfile,
  deleteAccount,
} from "../../../api/Services/UserServices";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import Swal from "sweetalert2";

const DangerZoneSection = ({ classes, currentUserId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (openSnackbar && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          setSnackbarMessage(
            `Your account has been successfully deleted. You can restore it within the next 30 days by contacting support. After that, your account will be permanently deleted. Click random area to cancel process, auto Log out in: ${newCountdown} second(s)`
          );
          return newCountdown;
        });
      }, 1000);
    } else if (countdown === 0) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    return () => clearInterval(timer);
  }, [openSnackbar, countdown, navigate]);

  const handleDelete = async () => {
    try {
      const res = await deleteAccount(currentUserId);
      console.log(res);
      if (res.message === "User marked as deleted") {
        setSnackbarMessage(
          `Your account has been successfully deleted. You can restore it within the next 30 days by contacting support. After that, your account will be permanently deleted. Click on random area to cancel, auto Log out in: ${countdown} second(s)`
        );
        setOpenSnackbar(true); // Show Snackbar
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage(
        "An error occurred while deleting your account. Please try again."
      );
      setOpenSnackbar(true); // Show Snackbar
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    handleDelete();
    handleCloseDialog();
  };

  const onBlockProfile = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to block this user profile? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await blockUserProfile(userId);

        if (res.message === "success") {
          Swal.fire({
            title: "Blocked!",
            text: "The user profile has been blocked successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: res.message || "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to block the user profile. Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };
  const dangerActions = [
    {
      label: "Block Profile",
      description: "Prevent any interactions with your profile.",
      action: "Block Profile",
      buttonText: "Block Profile Page",
      onClick: onBlockProfile,
    },
    {
      label: "Report Profile",
      description: "Flag any suspicious activity or inappropriate behavior.",
      action: "Report Profile",
      buttonText: "Report",
      onClick: () => alert("Report Profile feature coming soon!"),
    },
    {
      label: "Delete Account",
      description: "Permanently delete your account and all associated data.",
      action: "Delete Account",
      buttonText: "Delete",
      onClick: handleOpenDialog,
      buttonClass: classes.dangerButton,
    },
  ];

  return (
    <>
      <Card className={classes.card}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6" color="error">
            Danger Zone
          </Typography>
        </Box>
        <CardContent className={classes.sectionContent}>
          <Typography
            variant="body1"
            style={{ color: "#d32f2f" }}
            fontWeight="bold"
          >
            Please be careful with the actions below. These actions are
            irreversible and could result in permanent changes to your account.
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Box display="flex" flexDirection="column" gap={2}>
            {dangerActions.map(
              ({
                label,
                description,
                buttonText,
                onClick,
                buttonClass = classes.warningButton,
              }) => (
                <Box
                  key={label}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" style={{ color: "#d32f2f" }}>
                    {description}
                  </Typography>
                  <Button
                    size="small"
                    className={buttonClass}
                    onClick={onClick}
                  >
                    {buttonText}
                  </Button>
                </Box>
              )
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ color: "#d32f2f" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your account? This
            action is irreversible, and all your data will be permanently
            removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} className={classes.dangerButton}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={null} // Don't auto hide
        onClose={() => setOpenSnackbar(false)} // Close snackbar when called
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center it on the screen
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          zIndex: 9999, // Ensure it's on top
        }}
      >
        <Alert
          severity="error"
          sx={{
            width: "100%",
            fontSize: "1.25rem", // Increase font size
            padding: "20px", // Increase padding
            textAlign: "center", // Center the text
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DangerZoneSection;
