import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Typography, Divider, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { blue, grey } from "@mui/material/colors";

// Import the notification fetching API utility
import { fetchNotifications } from "../../utils/api/NotificationAPI";

const NotificationDropdown = ({ anchorEl, onClose, userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      if (userId) {
        const notificationsData = await fetchNotifications(userId);
        setNotifications(notificationsData);
      }
    };

    getNotifications();
  }, [userId]);

  const hasNotifications = notifications.length > 0;

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          maxHeight: 400,
          overflowY: "auto",
          padding: 1,
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        {/* Header with the number of notifications */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <NotificationsIcon sx={{ color: blue[500], marginRight: 1 }} />
          <Typography variant="h6">Notifications</Typography>
        </Box>

        {/* If no notifications */}
        {!hasNotifications && (
          <Typography
            variant="body2"
            color={grey[600]}
            sx={{ textAlign: "center" }}
          >
            No new notifications
          </Typography>
        )}

        {/* Display the notifications */}
        {hasNotifications && (
          <>
            {notifications.map((notification, index) => (
              <MenuItem
                key={index}
                sx={{ padding: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {notification.tagged_by} tagged you.
                </Typography>
                <Typography variant="body2" color={grey[600]}>
                  {notification.message ||
                    "View the details of the notification."}
                </Typography>
              </MenuItem>
            ))}
            {/* Divider to separate the notifications from the footer */}
            <Divider sx={{ marginY: 1 }} />
            <MenuItem
              sx={{ padding: 1, textAlign: "center" }}
              onClick={onClose}
            >
              <Typography variant="body2" color={blue[500]}>
                View all
              </Typography>
            </MenuItem>
          </>
        )}
      </Box>
    </Menu>
  );
};

export default NotificationDropdown;
