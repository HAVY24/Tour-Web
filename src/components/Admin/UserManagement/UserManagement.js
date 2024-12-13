import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import {
  banUser,
  deleteUser,
  getBannedUser,
  getOfflineUser,
  getOnlineUser,
  getProfileBlockedUser,
  getSoftDeletedUser,
  getUsers,
  restoreAccount,
  unbanUser,
  unblockUserProfile,
} from "../../../api/Services/UserServices";
import { Visibility, Block, AccountCircle } from "@mui/icons-material";
import { useStyles } from "./UseStyles";
import FilterBox from "./FilterBox";

const UserManagementPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [searchQuery, setSearchQueryValue] = useState("");

  const setSearchQuery = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const filteredUsers = allUsers.filter((user) =>
      user.Username.toLowerCase().includes(lowerCaseQuery)
    );

    setUsers(filteredUsers);
    setSearchQueryValue(query);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
        setAllUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    const intervalId = setInterval(fetchUsers, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleFilter = async (filterType) => {
    try {
      let res;
      switch (filterType) {
        case "all":
          res = await getUsers();
          break;
        case "online":
          res = await getOnlineUser();
          break;
        case "offline":
          res = await getOfflineUser();
          break;
        case "banned":
          res = await getBannedUser();
          break;
        case "softDeleted":
          res = await getSoftDeletedUser();
          break;
        case "blockedProfile":
          res = await getProfileBlockedUser();
          break;
        default:
          throw new Error("Invalid filter type");
      }
      setUsers(res);
      setAllUsers(res);
    } catch (error) {}
  };

  const handleViewUser = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const restoreUserAccount = async (userId) => {
    const confirmRestore = await Swal.fire({
      title: "Are you sure?",
      text: "This will restore the user account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    });

    if (confirmRestore.isConfirmed) {
      try {
        const res = await restoreAccount(userId);
        if (res.message === "User restored successfully") {
          Swal.fire(
            "Restored!",
            "The user account has been restored.",
            "success"
          );
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.Id === userId ? { ...user, IsDeleted: false } : user
            )
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to restore user account.", "error");
      }
    }
  };

  const onBanUser = async (user_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to ban this user? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, ban them!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await banUser(user_id);

        if (res.message === "success") {
          Swal.fire({
            title: "User Banned!",
            text: "The user has been successfully banned.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.Id === user_id ? { ...user, IsBanned: true } : user
            )
          );
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to ban the user. Please try again.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `An error occurred: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  const onUnBlock = async (user_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to unblock this user profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unblock it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await unblockUserProfile(user_id);

        if (res.message === "success") {
          Swal.fire({
            title: "Unblocked!",
            text: "The user profile has been unblocked successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.Id === user_id ? { ...user, IsProfileBlocked: false } : user
            )
          );
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
          text: "Failed to unblock the user profile. Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const onUnbanUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to unban this user? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unban them!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await unbanUser(userId);

        if (res.message === "success") {
          Swal.fire({
            title: "User Banned!",
            text: "The user has been successfully banned.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.Id === userId ? { ...user, IsBanned: false } : user
            )
          );
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to ban the user. Please try again.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `An error occurred: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  const deletePermanently = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteUser(id);
        console.log(res);
        if (res.message === "success") {
          Swal.fire({
            title: "Deleted!",
            text: "The user has been permanently deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.Id === id ? { ...user } : user))
          );
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Unable to delete the user.",
          icon: "error",
        });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const renderUsers = (users) =>
    users.map((user) => (
      <TableRow key={user.Id}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            {user.Username}
          </Box>
        </TableCell>
        <TableCell>{user.Email}</TableCell>
        <TableCell>
          {user.IsOnline ? (
            <span className={classes.onlineStatus}>Online</span>
          ) : (
            <span className={classes.offlineStatus}>Offline</span>
          )}
        </TableCell>
        <TableCell className={classes.actionsCell}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleViewUser(user.Id)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => onBanUser(user.Id)}
          >
            <Block />
          </IconButton>
        </TableCell>
        <TableCell>
          {user.IsDeleted && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              Soft Deleted{" "}
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => restoreUserAccount(user.Id)}
              >
                Restore
              </Button>
              <Button
                sx={{ marginLeft: "20px" }}
                color="danger"
                variant="outlined"
                onClick={() => deletePermanently(user.Id)}
              >
                Delete Permanently
              </Button>
            </Typography>
          )}

          {user.IsBanned && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              Banned
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => onUnbanUser(user.Id)}
              >
                Unban
              </Button>
            </Typography>
          )}

          {user.IsProfileBlocked && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              Profile Block
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => onUnBlock(user.Id)}
              >
                Unblock Profile
              </Button>
            </Typography>
          )}
        </TableCell>
      </TableRow>
    ));

  return (
    <Box marginRight={"-110px"}>
      <Typography variant="h4" gutterBottom align="center">
        User Management
      </Typography>

      {/* Search Bar */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <TextField
          label="Search by Username"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          sx={{ width: "300px" }}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <FilterBox handleFilter={handleFilter} />
      </Box>

      <TableContainer component={Paper} elevation={5}>
        <Box className={classes.sectionHeader}>Admins</Box>
        <Table className={classes.table} aria-label="admin user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Online Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsers(users.filter((user) => user.Role === "admin"))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer
        component={Paper}
        elevation={5}
        sx={{ marginTop: "20px" }}
      >
        <Box className={classes.sectionHeaderUser}>Users</Box>
        <Table className={classes.table} aria-label="regular user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Online Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsers(users.filter((user) => user.Role === "user"))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagementPage;
