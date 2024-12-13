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
import EditIcon from "@mui/icons-material/Edit";

const EditUsernameSection = ({
  currentUsername,
  currentUserId,
  handleChangeUsername,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUsername] = useState(currentUsername); // For immediate display updates
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    setNewUsername("");
    setPassword("");
    setIsModalOpen(true);
    setError("");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleSubmit = async () => {
    if (!newUsername || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const data = {
      password: password,
      user_id: currentUserId,
    };

    try {
      const res = await passwordCheck(data);

      if (res.message === "Invalid Password") {
        setError("Invalid Password");
      } else if (res.message === "Success") {
        handleChangeUsername(newUsername);
        setUsername(newUsername);
        handleClose();
      }
    } catch (error) {
      console.error("Error while updating username:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box>
      {/* Display Current Username */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Username: {userName || currentUsername}
        </Typography>
        <Tooltip title="Edit Username" arrow>
          <IconButton color="primary" size="small" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Edit Username Modal */}
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
            Edit Username
          </Typography>

          {/* Input Fields */}
          <TextField
            label="New Username"
            fullWidth
            margin="normal"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
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

export default EditUsernameSection;
