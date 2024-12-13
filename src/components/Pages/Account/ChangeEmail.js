import React, { useState } from "react";
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
import SettingsIcon from "@mui/icons-material/Settings";

const ChangeEmailSection = ({
  currentEmail,
  currentUserId,
  handleChangeEmail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    setNewEmail("");
    setPassword("");
    setIsModalOpen(true);
    setError("");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleSubmit = async () => {
    if (!newEmail || !password) {
      setError("Please fill in both fields.");
      return;
    } else {
      const data = {
        password: password,
        user_id: currentUserId,
      };
      const res = await passwordCheck(data);

      if (res.message == "Invalid Password") {
        setError("Invalid Password");
      } else if ((res.message = "Success")) {
        handleChangeEmail(newEmail);
        setEmail(newEmail);
        handleClose();
      }
    }
  };

  return (
    <Box>
      {/* Display Current Email */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Email: {email || currentEmail}</Typography>
        <Tooltip title="Change Email" arrow>
          <IconButton color="primary" size="small" onClick={handleOpen}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Edit Email Modal */}
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
            Edit Email
          </Typography>

          {/* Input Fields */}
          <TextField
            label="New Email"
            fullWidth
            margin="normal"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default ChangeEmailSection;
