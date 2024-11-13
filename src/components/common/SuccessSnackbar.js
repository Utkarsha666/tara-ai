import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessSnackbar = ({ open, onClose, message, severity = "success" }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
