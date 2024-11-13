// theme.js
import { createTheme } from "@mui/material/styles";

// Define the gradient color for the theme
const gradient = "linear-gradient(135deg, #005f7f 0%, #003c5b 100%)"; // Gradient color

// Create and export the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#005f7f", // Set the primary color
    },
    secondary: {
      main: "#003c5b", // Set the secondary color
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: gradient,
          backdropFilter: "blur(10px)",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: gradient,
          borderRadius: "8px",
          "&:hover": {
            background: "linear-gradient(135deg, #003c5b 0%, #005f7f 100%)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#003c5b",
            color: "white",
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#003c5b",
          "&:hover": {
            backgroundColor: "#005b7f",
          },
        },
      },
    },
  },
});

export default theme;
