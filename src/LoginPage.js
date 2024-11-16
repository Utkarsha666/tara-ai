import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, TextField, Typography, Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";

// Import the reusable GradientButton component
import GradientButton from "./components/common/Button";
import { fetchUserData } from "./utils/api/ProfilePageAPI"; // Import the fetchUserData function

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverInitializing, setServerInitializing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setServerInitializing(false);
    let timeout;

    try {
      timeout = setTimeout(() => {
        setServerInitializing(true);
      }, 12000);

      // Step 1: Request the access token
      const response = await fetch(
        "https://climate-and-gender-ai.onrender.com/auth/token",
        {
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
        }
      );

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token; // The access token received

        // Step 2: Use the access token to fetch user details (including id)
        const userDetails = await fetchUserData(accessToken); // Get user data using the token

        // Now that you have the user data (id, username, etc.), update the context
        login(accessToken, {
          username: credentials.username,
          id: userDetails.id,
        });

        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Login failed");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
      setServerInitializing(false);
      clearTimeout(timeout);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          padding: 3,
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 15px 45px rgba(0, 0, 0, 0.15)",
            transform: "scale(1.03)",
          },
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            variant="outlined"
          />
          {/* Use the reusable GradientButton component */}
          <GradientButton loading={loading} type="submit">
            Login
          </GradientButton>
        </form>

        {/* Info bar */}
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            borderRadius: 4,
            backgroundColor: "#e3f2fd",
            color: "#1e88e5",
            textAlign: "center",
            border: "1px solid #1e88e5",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InfoIcon sx={{ marginRight: 1, color: "#1e88e5" }} />
          <Typography variant="body2">
            Clicking the login button activates the server, which may take up to
            2 minutes to initialize. This will be resolved once a paid cloud
            plan is purchased. Please use Google Chrome on PC; Firefox is not
            supported.
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={loading ? "info" : "error"}
        >
          {loading
            ? "Turning on the server... this may take some time"
            : errorMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for Server Initialization */}
      <Snackbar
        open={serverInitializing}
        autoHideDuration={15000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          Come back after 2 minutes, server will be up and Ready!!!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
