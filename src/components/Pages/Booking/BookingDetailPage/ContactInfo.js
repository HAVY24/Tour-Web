import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../../UserContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import { Edit, Save, Person } from "@mui/icons-material";
import { getContactInfo } from "../../../../api/Services/BookingServices";

export default function ContactInfo({ setContactInformation }) {
  const user = useContext(UserContext);
  const [contactInfo, setContactInfo] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });
  setContactInformation(contactInfo);

  const [isEditingContact, setIsEditingContact] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await getContactInfo(user.userId);
        setContactInfo(res);
        setContactInformation(res);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };
    fetchContactInfo();
  }, [user.userId, setContactInformation]);

  // Save contact changes
  const handleSaveContact = () => {
    setIsEditingContact(false);
    // Add API call for saving updates here
  };

  // Rendered JSX
  return (
    <Card
      sx={{
        mb: 4,
        boxShadow: 4,
        border: "1px solid #bbdefb",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardHeader
        title="Contact Information"
        subheader="Your information or someone we can contact to confirm."
        avatar={<Person sx={{ color: "#1e88e5" }} />}
        action={
          isEditingContact && (
            <Tooltip title="Save Changes">
              <IconButton onClick={handleSaveContact} sx={{ color: "#2e7d32" }}>
                <Save />
              </IconButton>
            </Tooltip>
          )
        }
        sx={{
          background: "#e3f2fd",
          py: 2,
          "& .MuiCardHeader-title": { fontWeight: "bold", fontSize: "1.2rem" },
        }}
      />
      <Divider sx={{ backgroundColor: "#90caf9" }} />
      <CardContent>
        {isEditingContact ? (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Full Name"
              value={contactInfo.Name}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, Name: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Phone Number"
              value={contactInfo.Phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, Phone: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Email Address"
              value={contactInfo.Email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, Email: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              size="small"
            />
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Name:</strong> {contactInfo.Name || "Not provided"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {contactInfo.Phone || "Not provided"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email:</strong> {contactInfo.Email || "Not provided"}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setIsEditingContact(true)}
              sx={{
                mt: 2,
                color: "#0d47a1",
                borderColor: "#0d47a1",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                },
              }}
              startIcon={<Edit />}
            >
              Edit Info
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
