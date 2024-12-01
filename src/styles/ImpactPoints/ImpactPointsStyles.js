import { styled } from "@mui/system";
import { Paper, Box, Typography } from "@mui/material";

// Container for the main content
export const Container = styled(Box)({
  padding: "24px",
});

// Title for the Dashboard
export const Title = styled(Typography)({
  fontWeight: 600,
});

// Dashboard Overview container (flex layout for cards)
export const DashboardOverview = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "24px",
  marginBottom: "24px",
});

// Card base styles for all overview cards
export const Card = styled(Paper)(({ theme }) => ({
  padding: "20px",
  borderRadius: 200, // Border radius applied here
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  },
}));

// Specific styled cards with gradient backgrounds
export const TotalProjectsCard = styled(Card)({
  background: "linear-gradient(to right, #8e44ad, #3498db)", // Gradient background
});

export const CapacityBuildingCard = styled(Card)({
  background: "linear-gradient(to right, #f39c12, #e74c3c)", // Gradient background
});

export const EventsCard = styled(Card)({
  background: "linear-gradient(to right, #3498db, #2ecc71)", // Gradient background
});

// BoxItem for individual card wrappers
export const BoxItem = styled(Box)({
  flex: "1 1 220px", // flex grow, shrink, and basis
  minWidth: "220px", // Ensures a minimum width for responsiveness
});

// Chart container that uses grid layout
export const ChartContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // Two columns
  gap: "24px",
  marginBottom: "24px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr", // Stack the charts on smaller screens
  },
});

// Styled Paper for charts
export const StyledPaper = styled(Paper)({
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: 50, // Border radius for Paper elements
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.02)",
  },
});

// PaperTitle for chart titles
export const PaperTitle = styled(Typography)({
  fontWeight: 500,
  marginBottom: "16px", // Adding space between title and chart
});
