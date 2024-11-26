// utils/api/ProjectManagementAPI.js
export const fetchProjects = async (token) => {
  if (!token) {
    throw new Error("No token available");
  }

  const response = await fetch("https://taranepal.onrender.com/api/projects/", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return await response.json();
};

export const fetchProjectDetails = async (projectId, token) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/projects/${projectId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project details");
  }

  return response.json();
};

export const updateProjectDetails = async (
  projectId,
  token,
  updatedProject
) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/projects/${projectId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return await response.json();
};

export const addProject = async (newProject, token) => {
  const response = await fetch("https://taranepal.onrender.com/api/projects/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });

  if (!response.ok) {
    throw new Error("Failed to add project");
  }

  return await response.json();
};

export const fetchCapacityBuildingPrograms = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/capacity_building/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch capacity building programs");
  }

  return await response.json();
};

export const fetchCapacityBuildingProgramsDetails = async (
  projectId,
  token
) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/capacity_building/${projectId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project details");
  }

  return response.json();
};

export const updateCapacityBuildingProgramsDetails = async (
  projectId,
  token,
  updatedProject
) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/capacity_building/${projectId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return await response.json();
};

export const addCapacityBuildingPrograms = async (newProject, token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/capacity_building/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add project");
  }

  return await response.json();
};

export const fetchProjectByStatus = async (token, status) => {
  const url = `https://taranepal.onrender.com/api/projects/status/?status=${status}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`, // Use the provided token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error; // Rethrow the error so it can be caught by the calling function
  }
};

export const fetchCapacityBuildingStatus = async (token, status) => {
  const url = `https://taranepal.onrender.com/api/capacity_building/status/?status=${status}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`, // Use the provided token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error; // Rethrow the error so it can be caught by the calling function
  }
};
