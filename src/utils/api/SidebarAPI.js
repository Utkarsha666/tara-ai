const API_BASE_URL = "https://taranepal.onrender.com/api/community";

// Fetch post data by ID using fetch API
export const fetchPostById = async (postId, token) => {
  const url = `${API_BASE_URL}/posts/${postId}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  return response.json();
};

// Fetch comment data by ID using fetch API
export const fetchCommentById = async (postId, commentId, token) => {
  const url = `${API_BASE_URL}/posts/${postId}/comments/${commentId}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comment data");
  }

  return response.json();
};
