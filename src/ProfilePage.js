import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { fetchUserData, updateUserProfile } from "./utils/api/ProfilePageAPI";
import ProfileInfo from "./components/ProfilePage/ProfileInfo";
import EditProfileDialog from "./components/ProfilePage/EditProfileDialog";
import ProfileSnackbar from "./components/ProfilePage/ProfileSnackbar";
import profileStyles from "./styles/ProfilePageStyles";

const ProfilePage = () => {
  const { token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    role: "",
    status: "",
    organization: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const roles = [
    "Staff",
    "Technical",
    "Volunteer",
    "Trainer",
    "Project Manager",
  ];
  const statuses = ["Active", "Inactive"];

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await fetchUserData(token);
        setUserData(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          emergencyContact: data.emergencyContact || "",
          role: data.role || "",
          status: data.disabled ? "Suspended" : "Active",
          organization: data.organization || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = await updateUserProfile(token, formData);
      setUserData(updatedData);
      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <Button variant="contained" onClick={logout}>
          Log Out
        </Button>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error">
          User data not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={profileStyles.container}>
      <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
        <Paper sx={profileStyles.paper}>
          <ProfileInfo userData={userData} />
          <Box sx={profileStyles.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>

        <EditProfileDialog
          openDialog={openDialog}
          handleDialogClose={handleDialogClose}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveProfile={handleSaveProfile}
          roles={roles}
          statuses={statuses}
        />

        <ProfileSnackbar
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
        />
      </Box>
    </Box>
  );
};

export default ProfilePage;
