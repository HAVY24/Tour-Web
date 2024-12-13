import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Person2Icon from "@mui/icons-material/Person2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import TourIcon from "@mui/icons-material/Tour";
import Sidebar from "./Sidebar/Sidebar";

import { Link } from "react-router-dom";

export default function UserMenu({ username, handleSignOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // State for controlling sidebar visibility

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Button to trigger sidebar */}
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Person2Icon color="primary" />@{username}
      </Button>

      {/* Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            borderRadius: "10px",
            boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AccountCircleIcon sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <SettingsIcon sx={{ mr: 1 }} /> My Account
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TourIcon sx={{ mr: 1 }} /> My Tour
        </MenuItem>
        <Button
          onClick={handleSignOut}
          component={Link}
          variant="outlined"
          color="error"
          fullWidth
          sx={{
            mb: 1,
            borderRadius: "50px",
            backgroundColor: "whitesmoke",
          }}
          style={{
            textDecoration: "none",
          }}
        >
          Logout
        </Button>
      </Menu>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
    </div>
  );
}
