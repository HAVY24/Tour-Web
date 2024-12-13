import React, { useState, useContext } from "react";
import UserContext from "../../../UserContext";
import { passwordCheck } from "../../../api/Services/AuthServices";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePasswordSection = ({ currentUserId, handleChangePassword }) => {
  const user = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // States for toggling password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    } else {
      const data = {
        password: currentPassword,
        user_id: currentUserId,
      };
      const res = await passwordCheck(data);

      if (res.message == "Invalid Password") {
        setError("Invalid Password");
      } else if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      } else {
        handleChangePassword(newPassword);
        handleClose();
      }
    }
  };

  return (
    <Box>
      {/* Password Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Password: ******</Typography>
        <Tooltip title="Change Password" arrow>
          <IconButton color="primary" size="small" onClick={handleOpen}>
            <LockIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Edit Password Modal */}
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Change Password
          </Typography>

          {/* Input Fields */}
          <TextField
            label="Current Password"
            fullWidth
            margin="normal"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            fullWidth
            margin="normal"
            type={showNewPassword ? "text" : "password"} // Toggle input type for New Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm New Password"
            fullWidth
            margin="normal"
            type={showConfirmPassword ? "text" : "password"} // Toggle input type for Confirm Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}

          {/* Action Buttons */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangePasswordSection;
