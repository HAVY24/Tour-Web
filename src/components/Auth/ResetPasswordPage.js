import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../../api/Services/AuthServices";

export default function ResetPassword() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.forgotPassEmail || "");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setVerifyCodeError("");

    // Validate inputs
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!verifyCode) {
      setVerifyCodeError("Please enter the verification code.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({
        Email: email,
        VerificationCode: verifyCode,
        NewPassword: newPassword,
      });
      if (response.message == "success") {
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: "Your password has been successfully reset.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "An error occurred.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Invalid or expired verification code.",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: 3 }}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 3,
          color: "primary.main",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          borderBottom: "2px solid",
          borderColor: "divider",
          paddingBottom: 1,
        }}
      >
        Restore Password
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={!!emailError}
            helperText={emailError}
            id="email"
            name="email"
            type="email"
            defaultValue={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="verifyCode">Verification Code</FormLabel>
          <TextField
            error={!!verifyCodeError}
            helperText={verifyCodeError}
            id="verifyCode"
            name="verifyCode"
            type="text"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="newPassword">New Password</FormLabel>
          <TextField
            error={!!passwordError}
            helperText={passwordError}
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <TextField
            error={!!passwordError}
            helperText={passwordError}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Restore Password
        </Button>
      </Box>
      <Divider sx={{ margin: "20px 0" }}>or</Divider>
      <Typography sx={{ textAlign: "center" }}>
        Remember your password?{" "}
        <span>
          <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
            Sign In
          </Link>
        </span>
      </Typography>
    </Box>
  );
}
