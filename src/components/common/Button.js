import React from "react";
import { Button, CircularProgress } from "@mui/material";

const GradientButton = ({ loading, children, ...props }) => {
  const gradient = "linear-gradient(135deg, #005f7f 0%, #003c5b 100%)"; // Button gradient

  return (
    <Button
      {...props}
      fullWidth
      variant="contained"
      sx={{
        marginTop: 2,
        background: gradient, // Gradient background
        borderRadius: "8px", // Rounded corners
        padding: "10px 20px",
        "&:hover": {
          background: "linear-gradient(135deg, #003c5b 0%, #005f7f 100%)", // Hover gradient
          transform: "scale(1.05)", // Slight scale on hover
          transition: "all 0.3s ease",
        },
        disabled: loading,
      }}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default GradientButton;
