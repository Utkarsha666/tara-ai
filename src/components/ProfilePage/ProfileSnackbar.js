import React from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const ProfileSnackbar = ({ snackbarOpen, handleSnackbarClose }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert onClose={handleSnackbarClose} severity="success">
        Profile updated successfully!
      </Alert>
    </Snackbar>
  );
};

export default ProfileSnackbar;
