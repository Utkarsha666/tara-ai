// utils/api/ResourceHubAPI.js

export const fetchFolders = async (token) => {
  try {
    const response = await fetch(
      "https://taranepal.onrender.com/files/api/resources/all_folders/",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch folders");
    }

    const data = await response.json();
    // Filter folders where parent_folder is null
    const filteredFolders = data.folders.filter(
      (folder) => folder.parent_folder === null
    );
    return filteredFolders;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchFolderContents = async (folderId, token) => {
  try {
    const response = await fetch(
      `https://taranepal.onrender.com/files/api/resources/list/${folderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error("Failed to fetch folder contents");
    }

    // Parse the JSON response
    const data = await response.json();

    // Map the API response to your required structure
    const items = data.items.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type, // 'folder' or 'file'
      parent_folder: item.parent_folder || null,
    }));

    return { items };
  } catch (error) {
    throw new Error(error.message || "Unknown error fetching folder contents");
  }
};

export const downloadFile = async (fileId, token) => {
  try {
    const response = await fetch(
      `https://taranepal.onrender.com/files/api/resources/download/${fileId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      return blob;
    } else {
      throw new Error("Failed to download file");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createFolder = async (folderName, parentFolder, token) => {
  const url = new URL(
    "https://taranepal.onrender.com/files/api/resources/create_folder/"
  );
  // Prepare the parameters for the API request
  const params = {
    folder_name: folderName,
  };

  // If parentFolder is not null, add it to the query string
  if (parentFolder !== null) {
    params.parent_folder = parentFolder;
  }

  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create folder");
  }

  return response.json();
};
