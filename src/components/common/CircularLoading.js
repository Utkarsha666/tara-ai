import React from "react";
import { CircularProgress, Box } from "@mui/material";

// CircularLoading component that can be reused throughout the app
const CircularLoading = ({
  size = 40,
  color = "primary",
  message = "Loading...",
  style = {},
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={style}
    >
      {/* Spinner */}
      <CircularProgress size={size} color={color} />

      {/* Styled Loading Message with Gradient */}
      {message && (
        <div
          style={{
            marginTop: 16,
            fontSize: "18px",
            fontWeight: "600",
            background: "linear-gradient(to right, #00c6ff, #0072ff)", // Gradient color
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            letterSpacing: "1px",
            animation: "pulse 1.5s infinite ease-in-out", // Pulse animation
            textShadow: "0 2px 5px rgba(0, 114, 255, 0.3)", // Light shadow for text depth
          }}
        >
          {message}
        </div>
      )}
    </Box>
  );
};

export default CircularLoading;
