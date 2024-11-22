// Fetch all posts
export const fetchPosts = async (token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/community/posts/",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
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
export const createPost = async (newPost, token) => {
  const response = await fetch(
    "https://taranepal.onrender.com/api/community/posts/",
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
