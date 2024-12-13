import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "../../../UserContext";
import ChangePasswordSection from "./ChangePassword";
import EditUsernameSection from "./EditUsername";
import ChangeEmailSection from "./ChangeEmail";
import NotificationsSection from "./NotificationSection";
import DangerZoneSection from "./DangerSection";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getAccountInfo,
  updateAccount,
} from "../../../api/Services/UserServices";
import { useParams, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    maxWidth: "900px",
    margin: "auto",
    marginTop: "20px",
    padding: "30px",
    backgroundColor: "#f0f2f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: "120px",
    height: "120px",
    marginRight: "30px",
    border: "5px solid #eeeeee",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  section: {
    marginBottom: "30px",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #eeeeee",
    backgroundColor: "#f7f7f7",
  },
  sectionContent: {
    padding: "20px",
  },
  actionButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "#1976d2",
  },
  warningButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "#d32f2f",
  },
  card: {
    marginBottom: "25px",
    borderRadius: "10px",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    },
  },
  dangerButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#d32f2f", // Red color for danger actions
    "&:hover": {
      backgroundColor: "#b71c1c", // Darker red on hover
    },
  },
});

const AccountPage = () => {
  const { userId } = useParams();
  const [info, setInfo] = useState({});
  const user = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State for the dialog
  const navigate = useNavigate();

  const originalInfoRef = useRef({});

  const handleChangeUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const res = await getAccountInfo(userId);
      setInfo(res);
      originalInfoRef.current = res;
      setUsername(info.Username || "");
      setEmail(user.email || "");
    };
    fetchAccountInfo();
  }, [userId]);

  const classes = useStyles();

  const handleAction = async () => {
    const userInfo = {
      Username: username,
      Email: email,
      Password: password,
      user_id: user.userId,
    };

    const isUsernameChanged = username !== originalInfoRef.current.Username;
    const isEmailChanged = email !== originalInfoRef.current.Email;
    const isPasswordChanged = password !== originalInfoRef.current.Password;

    if (!isUsernameChanged && !isEmailChanged && !isPasswordChanged) {
      setSnackbarMessage("No changes were made.");
      setOpenSnackbar(true);
      return;
    }

    try {
      await updateAccount(userInfo);

      setOpenLogoutDialog(true); // Show the logout confirmation dialog
    } catch (err) {
      console.error("Error updating account:", err);
      setSnackbarMessage("Error updating account. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    const original = originalInfoRef.current;
    setUsername(original.Username || "");
    setEmail(original.Email || "");
    setPassword("");
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
    setOpenLogoutDialog(false); // Close the dialog after logout
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false); // Close the dialog if user cancels
  };

  return (
    <Box className={classes.container} sx={{ marginTop: "50px" }}>
      {/* User Info Header */}
      <Box className={classes.header}>
        <Avatar
          className={classes.avatar}
          src="/selfie.jpg"
          alt="User Avatar"
        />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {info.FirstName} {info.LastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Member since: {info.registerDate || ""}
          </Typography>
        </Box>
      </Box>

      <Divider style={{ marginBottom: "30px" }} />

      {/* Account Settings Sections */}
      <Card className={classes.card}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6">Account Settings</Typography>
        </Box>
        <CardContent className={classes.sectionContent}>
          <Typography variant="body1" color="textPrimary" fontWeight="bold">
            Manage your account settings below.
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Username Section */}
            <EditUsernameSection
              currentUserId={user.userId}
              currentUsername={info.Username}
              handleChangeUsername={handleChangeUsername}
            />
            {/* Email Section */}
            <ChangeEmailSection
              currentUserId={user.userId}
              currentEmail={user.email}
              handleChangeEmail={handleChangeEmail}
            />
            {/* Password Section */}
            <ChangePasswordSection
              currentUserId={user.userId}
              handleChangePassword={handleChangePassword}
            />
          </Box>
        </CardContent>
      </Card>

      <NotificationsSection classes={classes} />
      <DangerZoneSection classes={classes} currentUserId={user.userId} />

      <Divider style={{ margin: "20px 0" }} />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        {/* Cancel Button */}
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Reset
        </Button>
        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleAction}>
          Save
        </Button>
      </Box>

      {/* Snackbar for alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{
            width: "100%",
            fontSize: "1.25rem", // Increase font size
            padding: "20px", // Increase padding
            textAlign: "center", // Center the text
            backgroundColor: "#f44336", // Red color for the alert
            color: "#fff", // White text
            fontWeight: "bold", // Bold font for emphasis
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Log Out?"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Changes were made. You will need to log in again. Do you want to log
            out now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountPage;
