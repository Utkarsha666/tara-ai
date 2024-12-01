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

// Fetch team data from the API
export const fetchTeamData = async (token) => {
  try {
    const response = await fetch(
      "https://taranepal.onrender.com/api/api/m&e/team",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch team data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchStatusData = async (token) => {
  try {
    const response = await fetch(
      "https://taranepal.onrender.com/api/api/m&e/status/count",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the raw response object
    return response.json();
  } catch (error) {
    console.error("Error fetching status data:", error);
    throw error; // Rethrow error if needed
  }
};

// Function to fetch time tracking data
export const fetchTimeTrackingData = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/api/m&e/time-tracking", // Update API endpoint if needed
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch time tracking data");
  }

  return response.json(); // Parse and return the JSON data
};

// Function to fetch impact score data
export const fetchImpactScoreData = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/api/m&e/impact-scores",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch impact score data");
  }

  return response.json(); // Parse and return the JSON data
};
