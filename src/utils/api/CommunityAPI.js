const API_URL = "https://taranepal.onrender.com/api";

// Function to fetch channels
export const fetchChannels = async (token) => {
  try {
    const response = await fetch(`${API_URL}/community/channels/`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch channels");
    }
  } catch (err) {
    throw new Error("Failed to fetch channels: " + err.message);
  }
};

export const createChannel = async (name, visibility, token) => {
  try {
    const response = await fetch(
      "https://taranepal.onrender.com/api/community/channels/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          visibility,
        }),
      }
    );

    if (response.ok) {
      return await response.json(); // Return the created channel data
    } else {
      throw new Error("Failed to create channel");
    }
  } catch (err) {
    throw new Error("Failed to create channel: " + err.message);
  }
};

// Function to fetch posts by channel ID
export const fetchPosts = async (channelId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/community/channels/${channelId}/posts/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (err) {
    throw new Error("Failed to fetch posts: " + err.message);
  }
};

// Fetch user data by username
export const fetchUserData = async (username, token) => {
  const response = await fetch(
    `https://taranepal.onrender.com/auth/users/${username}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

// Create a new post
export const createPost = async (newPost, token, channelId) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/community/channels/${channelId}/posts/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

// Add a comment to a post
export const addComment = async (postId, comment, token) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/community/posts/${postId}/comments/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json();
};

// Function to fetch members of a channel
export const fetchChannelMembers = async (channelId, token) => {
  try {
    // API URL with channelId in the path
    const response = await fetch(
      `https://taranepal.onrender.com/api/community/channels/${channelId}/members/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Authentication header
        },
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    // Parse the JSON response
    const data = await response.json();

    return data; // This will be the list of member usernames
  } catch (error) {
    console.error("Error fetching channel members:", error);
    throw error; // Propagate the error to be handled by the calling function
  }
};

// Function to add a user to a channel
export const addUserToChannel = async (channelId, username, token) => {
  const response = await fetch(
    `https://taranepal.onrender.com/api/community/channels/${channelId}/add_user/?username=${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add user to channel");
  }

  return response.json(); // Return the response body (channel data)
};
