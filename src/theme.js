import { createTheme } from "@mui/material/styles";

// Define the gradient color for the theme
const gradient = "linear-gradient(135deg, #005f7f, #003c5b)"; // Gradient color

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
          background: gradient, // Apply gradient to AppBar
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: gradient, // Apply gradient to Button
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
          backgroundColor: "#005f7f", // Set background to white
          color: "white", // Set text color to dark (primary color for contrast)
          "&:hover": {
            backgroundColor: "#005f7f", // Hover background in primary color
            color: "white", // Ensure the text is white on hover for visibility
          },
        },
      },
    },
  },
});

export default theme;
