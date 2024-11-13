import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Divider,
  Chip,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Dialog Wrapper
export const DialogWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(3),
  overflowY: "auto",
  maxHeight: "80vh",
}));

// Dialog Title
export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: 700,
  color: "#2E3B4E",
  backgroundColor: "#F1F8FF",
  padding: theme.spacing(2, 3),
  borderRadius: "12px 12px 0 0",
  textAlign: "center",
  borderBottom: "1px solid #dce2e7",
}));

// Dialog Content
export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#333",
  backgroundColor: "#F9FAFB",
  borderRadius: "8px",
  maxHeight: "60vh", // Scrollable content area if needed
  overflowY: "auto",
}));

// Section Title (e.g., Description, Status)
export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#3C4F76", // Professional blue color
  fontWeight: 600,
  fontSize: "1.1rem",
  marginBottom: theme.spacing(1),
  textTransform: "uppercase", // Adds a formal, structured feel
}));

// Section Text (e.g., Description content, Status text)
export const SectionText = styled(Typography)(({ theme }) => ({
  color: "#555",
  fontSize: "1rem",
  lineHeight: "1.6",
  marginBottom: theme.spacing(2),
}));

// Status Text with dynamic color based on the status
export const StatusText = styled(Typography)(({ theme, statusColor }) => ({
  color: statusColor, // Dynamic color based on the project status
  fontWeight: 600,
  fontSize: "1.1rem",
  marginTop: theme.spacing(1),
}));

// Chip style for locations
export const ChipTag = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: "#E3F2FD", // Light blue chip for locations
  fontWeight: 600,
  color: "#3C4F76",
  fontSize: "0.9rem",
  borderRadius: "16px",
}));

// Team Member Link
export const TeamMemberLink = styled("a")({
  color: "#00796B", // Teal color for team members (calming and professional)
  fontWeight: 500,
  fontSize: "1rem",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline", // Subtle hover effect for interaction
  },
});

// Dialog Actions (buttons)
export const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: "1px solid #dce2e7",
  justifyContent: "center",
}));

// Styled Button (for custom 'Close' button)
export const StyledButton = styled(Button)(({ theme }) => ({
  background: "#1E88E5",
  color: "#ffffff",
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  borderRadius: "20px",
  textTransform: "none",
  "&:hover": {
    background: "#1565C0",
  },
}));
