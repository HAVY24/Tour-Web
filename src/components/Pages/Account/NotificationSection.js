import React, { useState } from "react";
import { Box, Typography, Button, Divider, Card } from "@mui/material";

const NotificationsSection = ({ classes }) => {
  // State to manage the status of each notification type
  const [notifications, setNotifications] = useState({
    email: true, // Email Notifications: Enabled
    sms: false, // SMS Notifications: Disabled
    push: true, // Push Notifications: Enabled
    promotional: true, // Promotional Offers: Enabled
    security: true, // Security Alerts: Enabled
  });

  // Toggle notification state
  const handleToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Card className={classes.card}>
      <Box>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Box className={classes.sectionContent}>
          <Typography variant="body1" color="textPrimary" fontWeight="bold">
            Set your preferences for account notifications.
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Email Notifications */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Email Notifications:{" "}
                {notifications.email ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.email
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("email")}
              >
                {notifications.email ? "Disable" : "Enable"}
              </Button>
            </Box>

            {/* SMS Notifications */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                SMS Notifications: {notifications.sms ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.sms
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("sms")}
              >
                {notifications.sms ? "Disable" : "Enable"}
              </Button>
            </Box>

            {/* Push Notifications */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Push Notifications:{" "}
                {notifications.push ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.push
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("push")}
              >
                {notifications.push ? "Disable" : "Enable"}
              </Button>
            </Box>

            {/* Promotional Offers */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Promotional Offers:{" "}
                {notifications.promotional ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.promotional
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("promotional")}
              >
                {notifications.promotional ? "Disable" : "Enable"}
              </Button>
            </Box>

            {/* Security Alerts */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Security Alerts:{" "}
                {notifications.security ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.security
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("security")}
              >
                {notifications.security ? "Disable" : "Enable"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationsSection;
