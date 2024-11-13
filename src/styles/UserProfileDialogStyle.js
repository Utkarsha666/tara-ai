import { styled } from "@mui/material/styles";
import {
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  Avatar,
  Dialog,
} from "@mui/material";

// Outer Dialog with rounded corners
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: theme.spacing(2), // Apply rounded corners to the outer Dialog container
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(2), // Ensure the paper inside Dialog is also rounded
    overflow: "hidden", // Prevent content overflow for rounded corners
  },
}));

// Dialog Title
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
}));

// Dialog Content
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "#fff",
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
}));

// Typography with margins
export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  "&:first-of-type": {
    marginTop: theme.spacing(2),
  },
}));

// Styled Button
export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

// Profile Box with Avatar and content styling
export const ProfileBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
  },
}));

// Avatar styling for initials
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  fontSize: theme.typography.h4.fontSize,
  marginBottom: theme.spacing(2),
}));
