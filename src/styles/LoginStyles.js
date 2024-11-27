// ./styles/LoginStyles.js

import { styled } from "@mui/system";
import { Box, Grid, TextField, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

// Left Grid and Form Box
export const ContainerBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  borderRadius: 50,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  width: "80%",
  maxWidth: "400px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 15px 45px rgba(0, 0, 0, 0.15)",
    transform: "scale(1.03)",
  },
});

export const LeftGrid = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem",
});

// Right Grid and Image
export const RightGrid = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  overflow: "hidden", // Ensure the image doesn't overflow the container
});

export const ImageContainer = styled(Box)({
  position: "center",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: 50,
});

export const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Cover the entire area while preserving the aspect ratio
  objectPosition: "center", // Ensure the image is centered
  transition: "transform 0.5s ease-in-out", // Smooth zoom effect
});

// Form components
export const FormHeading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "1rem",
});

export const InfoBar = styled(Box)({
  marginTop: "1rem",
  padding: "1rem",
  borderRadius: 30,
  backgroundColor: "#e3f2fd",
  color: "#1e88e5",
  textAlign: "center",
  border: "1px solid #1e88e5",
  display: "flex",
  alignItems: "center",
  fontSize: "0.9rem",
});

export const InfoBarIcon = styled(InfoIcon)({
  marginRight: "0.5rem",
  color: "#1e88e5",
});

// Form Elements
export const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
});

export const GradientButtonWrapper = styled(Box)({
  marginBottom: "1rem",
});
