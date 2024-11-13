export const fetchUserData = async (token) => {
  const response = await fetch(
    "https://climate-and-gender-ai.onrender.com/auth/users/me/",
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

export const updateUserProfile = async (token, formData) => {
  const response = await fetch(
    "https://climate-and-gender-ai.onrender.com/auth/users/me/",
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};
