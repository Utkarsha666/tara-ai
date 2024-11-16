// NotificationAPI.js
const API_URL = "https://climate-and-gender-ai.onrender.com/api/notifications/";

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
