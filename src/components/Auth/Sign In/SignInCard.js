import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ForgotPassword from "./ForgotPassword";
import { SitemarkIcon } from "./CustomIcons";
import { sendToEmail, signin } from "../../../api/Services/AuthServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginByGoogle from "./GoogleLoginButton";
import { Card } from "./Card";

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [forgotPassEmail, setforgotPassEmail] = React.useState("");
  const navigate = useNavigate();

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const getEmail = (email) => {
    setforgotPassEmail(email);
  };

  const handleContinue = async () => {
    setOpen(false);

    try {
      Swal.fire({
        title: "Sending verification code...",
        text: "Please wait a moment.",
        icon: "info",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await sendToEmail({
        To: forgotPassEmail,
        Subject: "Verify Identity",
        Body: "",
      });

      Swal.close();

      if (res.message === "success") {
        Swal.fire({
          title: "Success!",
          text: "The verification code has been sent to your email.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/restore/password", { state: { forgotPassEmail } });
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Email Not Found",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const formData = new FormData(event.currentTarget);

    const data = {
      Email: formData.get("Email"),
      Password: formData.get("Password"),
    };

    try {
      const user = await signin(data);
      if (user && user.token) {
        if (rememberMe) {
          localStorage.setItem("token", user.token);
        } else {
          sessionStorage.setItem("token", user.token);
        }
        Swal.fire({
          icon: "success",
          title: "Sign In Successful",
          text: "Welcome back! Redirecting to the home page...",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
          window.location.reload();
        });

        console.log("Token stored in localStorage:", user.token);
        console.log("User info:", user);
      }
    } catch (err) {
      if (
        err.message === "Email Not Found" ||
        err.message === "Incorrect Password"
      ) {
        setEmailError(true);
        setPasswordError(true);
        setPasswordErrorMessage("Incorrect Email Or Password");
      } else if (
        err.message ===
        "Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days"
      ) {
        setEmailError(true);
        setEmailErrorMessage(err.message);
      } else if (
        err.message ===
        "Your account has been banned. Please contact us to know details."
      ) {
        setEmailError(true);
        setEmailErrorMessage(err.message);
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          fontWeight: "700",
        }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="Email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="Password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox checked={rememberMe} onChange={handleRememberMeChange} />
          }
          label="Remember me"
        />
        <ForgotPassword
          open={open}
          handleClose={handleClose}
          handleContinue={handleContinue}
          getEmail={getEmail}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign In
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link href="/register" variant="body2" sx={{ alignSelf: "center" }}>
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <LoginByGoogle />
        {/* <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button> */}
      </Box>
    </Card>
  );
}
