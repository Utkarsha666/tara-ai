// ./utils/ImpactPointsAPI.js

const API_BASE_URL = "https://taranepal.onrender.com/api";

// Function to fetch the total projects count
export const fetchTotalProjects = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/count`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch total projects: ${response.statusText}`);
    }

    return await response.json(); // Return the JSON data
  } catch (error) {
    console.error("Error fetching total projects:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

// Function to fetch the total capacity building programs count
export const fetchCapacityBuildingPrograms = async (token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/capacity_building/count/total`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch capacity building programs: ${response.statusText}`
      );
    }

    return await response.json(); // Return the JSON data
  } catch (error) {
    console.error("Error fetching capacity building programs:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
