import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";

// Full Width Styled Card
export const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 20,
  boxShadow: theme.shadows[5],
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: theme.shadows[12],
    cursor: "pointer",
  },
}));

// Styled Card Content with padding and spacing
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1),
  background: "linear-gradient(145deg, #f0f4f7, #c9d6e3)",
  display: "flex",
  flexDirection: "column",
}));

// Project Name
export const ProjectName = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
}));

// Status Badge
export const Status = styled(Typography)(({ theme, statusColor }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: statusColor || theme.palette.text.primary,
  padding: theme.spacing(1),
  borderRadius: 12,
  backgroundColor: statusColor ? `${statusColor}20` : theme.palette.grey[200],
  textAlign: "center",
  width: "fit-content",
  marginTop: theme.spacing(1),
}));

// Label for sections like Locations, Objectives
export const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
}));

// Styled Chip for Objectives (Tags)
export const ObjectiveTag = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: "#aaa", // Light background for tags
  color: theme.palette.text.primary, // Text color for tags
  fontWeight: 600,
  borderRadius: 16, // Rounded corners
  "&:hover": {
    backgroundColor: "#999", // Darker on hover
  },
}));

// Divider Styling
export const DividerStyled = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(0)} 0`,
}));
