import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DropdownListHome from "./DropDownListHome";
import DropdownListTour from "./DropDownListTour";
import DropdownListBlog from "./dropblog";
import { useMediaQuery } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleMouseEnter = (item) => {
    setShowDropdown(item);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menu dạng Drawer cho chế độ mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: 250 }}>
      <List>
        {["Home", "Tour", "Blog", "Gallery", "About Us", "Sponsor"].map(
          (item, index) => (
            <ListItem
              button
              component={Link}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              key={index}
            >
              <ListItemText primary={item} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "transparent",
          border: "0.8px",
          color: "black",
        }}
        position="static"
      >
        <Toolbar>
          {isMobile ? ( // Kiểm tra xem có ở chế độ mobile không
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                height: "40px",
              }}
            >
              {["Home", "Tour", "Blog", "Gallery", "About Us", "Sponsor"].map(
                (item, index) => (
                  <Box
                    key={index}
                    sx={{
                      mx: 2,
                      px: 2,
                      py: 1,
                      borderRadius: "50px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "LightGray",
                      },
                      position: "relative",
                    }}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Typography variant="h6">
                      <Link
                        to={`/${item.toLowerCase().replace(" ", "-")}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          transition: "color 0.3s",
                          fontWeight: "500",
                        }}
                      >
                        {item}
                      </Link>
                    </Typography>
                    {showDropdown === "Home" && (
                      <DropdownListHome show={item} />
                    )}
                    {showDropdown === "Tour" && (
                      <DropdownListTour show={item} />
                    )}
                  </Box>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
