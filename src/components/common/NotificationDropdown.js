import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Typography, Divider, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { blue, grey } from "@mui/material/colors";
import { fetchNotifications } from "../../utils/api/NotificationAPI";

const NotificationDropdown = ({
  anchorEl,
  onClose,
  userId,
  onNotificationUpdate,
  onNotificationClick, // New prop to handle notification click
}) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      if (userId) {
        const notificationsData = await fetchNotifications(userId);
        setNotifications(notificationsData);
        onNotificationUpdate(notificationsData.length > 0);
      }
    };

    getNotifications();
  }, [userId, onNotificationUpdate]);

  const hasNotifications = notifications.length > 0;

  const handleNotificationClick = async (notification) => {
    // First, trigger the API call to mark the notification as read
    await onNotificationClick(notification);

    // Update the state to reflect that the notification has been read
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);

    // Close the dropdown menu when a notification is clicked
    onClose();
  };

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
                key={notification.id} // Use notification.id as the key for uniqueness
                sx={{ padding: 1, display: "flex", flexDirection: "column" }}
                onClick={() => handleNotificationClick(notification)} // Handle click
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    textDecoration: notification.read ? "line-through" : "none",
                  }}
                >
                  {notification.notification_type === "TAG"
                    ? `${notification.tagged_by} has mentioned you.`
                    : notification.notification_type === "PROJECT"
                    ? `${notification.tagged_by} has assigned you a project.`
                    : "You have a new notification."}
                </Typography>
                <Typography
                  variant="body2"
                  color={grey[600]}
                  sx={{
                    textDecoration: notification.read ? "line-through" : "none",
                  }}
                >
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
