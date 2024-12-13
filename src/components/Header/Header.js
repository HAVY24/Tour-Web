import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Popover,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomIcon from "@mui/icons-material/Room";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "react-bootstrap/Image";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import SearchAppBar from "./SearchBar";
import { heartBeat } from "../../api/Services/UserServices";
import { signout } from "../../api/Services/AuthServices";
import UserMenu from "./UserMenu";

const token = sessionStorage.getItem("token") || localStorage.getItem("token");
const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

const Header = () => {
  const user = useContext(UserContext);
  const username = user.username;
  const role = user.role;

  const isMobile = useMediaQuery("(max-width:600px)");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      const data = await signout();
      console.log(data);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "account-popover" : undefined;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const data = await heartBeat(user.userId);
        console.log("Heartbeat data:", data);
      } catch (error) {
        console.error("Error in heartbeat:", error.message || error);
      }
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user.userId]);

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", height: "70px" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Link to="/Home">
            <Image
              src={`${distributionUrl}/Static/logo_vvba.jpg`}
              style={{ width: "50px", height: "50px" }}
              roundedCircle
            />
          </Link>

          {!isMobile && (
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                component="div"
                sx={{ marginLeft: "20px", marginTop: "10px" }}
              >
                <h4
                  style={{
                    fontWeight: "600",
                    color: "orange",
                    fontFamily: "Brush Script MT",
                  }}
                >
                  VVBA Travel Company
                </h4>
              </Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton color="black">
            <PhoneIcon />
          </IconButton>
          {!isMobile && (
            <Typography
              variant="body1"
              component="a"
              href="tel:+84912345678"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "500",
              }}
            >
              0343-811-543
            </Typography>
          )}
        </Box>

        {!token && (
          <IconButton onClick={handleAccountClick} color="black">
            <AccountCircle />
            <Typography variant="body1" sx={{ ml: 1 }}>
              Account
            </Typography>
          </IconButton>
        )}

        {token && role == "user" && (
          <>
            <Typography color="black" variant="body1" sx={{ ml: 1 }}>
              Welcome
            </Typography>
            <UserMenu username={username} handleSignOut={handleSignOut} />
          </>
        )}

        {token && role == "admin" && (
          <>
            <Typography color="black" variant="body1" sx={{ ml: 1 }}>
              Hello Admin,
            </Typography>
            <UserMenu username={username} handleSignOut={handleSignOut} />
          </>
        )}

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              p: 2,
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {!token ? (
            <>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                fullWidth
                sx={{
                  mb: 2,
                  borderRadius: "25px",
                  py: 1.5,
                  backgroundColor: "orange",
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "Verdana",
                  "&:hover": {
                    backgroundColor: "darkorange",
                  },
                }}
                onClick={handlePopoverClose}
              >
                Sign In
              </Button>

              <Box textAlign="center" sx={{ mt: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Don't have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.2,
                    borderRadius: "25px",
                    borderColor: "orange",
                    color: "orange",
                    fontWeight: "600",
                    fontFamily: "Verdana",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "orange",
                      color: "white",
                    },
                  }}
                  onClick={handlePopoverClose}
                >
                  Sign Up
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
