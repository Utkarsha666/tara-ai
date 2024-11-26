export const requestAccessToken = async (credentials) => {
  try {
    const response = await fetch("https://taranepal.onrender.com/auth/token", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: credentials.username,
        password: credentials.password,
        client_id: "string",
        client_secret: "string",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await response.json();
    return data.access_token; // Return access token
  } catch (error) {
    throw new Error(error.message || "An error occurred while logging in.");
  }
};
