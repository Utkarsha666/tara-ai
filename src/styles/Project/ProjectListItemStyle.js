// styles/Project/ProjectListItemStyle.js
import { styled } from "@mui/system";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

// Full Width Styled Card
export const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: theme.shadows[5],
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  width: "100%", // Make it full-width
  maxWidth: "100%", // Ensures full-width without restriction
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: theme.shadows[8],
    cursor: "pointer",
  },
}));

// Styled Card Content with padding and spacing
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1), // Increased padding
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
  marginTop: theme.spacing(1),
}));

// List and List Item Styling
export const Item = styled("li")(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: "1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const List = styled("ul")(({ theme }) => ({
  paddingLeft: theme.spacing(0),
  listStyleType: "none",
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(0),
}));

// Divider Styling
export const DividerStyled = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(1)} 0`,
}));
