import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Import the reusable GradientButton component
import GradientButton from "./components/common/Button";
import { fetchUserData } from "./utils/api/ProfilePageAPI"; // Import the API functions
import { requestAccessToken } from "./utils/api/LoginAPI";

// Import styled components
import {
  ContainerBox,
  LeftGrid,
  RightGrid,
  ImageContainer,
  Image,
  FormHeading,
  InfoBar,
  InfoBarIcon,
  StyledTextField,
  GradientButtonWrapper,
} from "./styles/LoginStyles";

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

      // Step 1: Request the access token using the API function
      const accessToken = await requestAccessToken(credentials);

      // Step 2: Use the access token to fetch user details (including id)
      const userDetails = await fetchUserData(accessToken); // Get user data using the token

      // Now that you have the user data (id, username, etc.), update the context
      login(accessToken, {
        username: credentials.username,
        id: userDetails.id,
      });

      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
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
    <Container maxWidth="xl">
      <Grid container sx={{ height: "100%" }}>
        {/* Left half (Login form) */}
        <LeftGrid item xs={12} sm={6}>
          <ContainerBox>
            <FormHeading variant="h4">Login</FormHeading>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <StyledTextField
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
              <StyledTextField
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
              <GradientButtonWrapper>
                <GradientButton loading={loading} type="submit">
                  Login
                </GradientButton>
              </GradientButtonWrapper>
            </form>

            {/* Info bar */}
            <InfoBar>
              <InfoBarIcon />
              <Typography variant="body2">
                Clicking the login button activates the server, which may take
                some time to initialize. This will be resolved once a paid cloud
                plan is purchased. Please use Google Chrome on PC; Firefox is
                not supported.
              </Typography>
            </InfoBar>
          </ContainerBox>
        </LeftGrid>

        {/* Right half (Image) */}
        <RightGrid item xs={12} sm={6}>
          <ImageContainer>
            <Image src={require("./assets/images/Login.jpg")} alt="Login" />
          </ImageContainer>
        </RightGrid>
      </Grid>

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
          Server Initializing, will be ready and log you in, you can explore
          other pages till then!!!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
