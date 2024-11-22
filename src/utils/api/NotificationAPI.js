// NotificationAPI.js
const API_URL = "https://taranepal.onrender.com/api/notifications/";

export const fetchNotifications = async (userId) => {
  try {
    const response = await fetch(`${API_URL}${userId}`, {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    const data = await response.json();
    return data; // Return the notifications data
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return []; // Return an empty array in case of an error
  }
};

// Function to mark a notification as read
export const markNotificationAsRead = async (userId, notificationId) => {
  const url = `https://taranepal.onrender.com/api/mark_notification_as_read/${userId}/${notificationId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: "",
    });

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
