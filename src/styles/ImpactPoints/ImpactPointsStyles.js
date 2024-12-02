import { styled } from "@mui/system";
import {
  Paper,
  Box,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

// Styled Table Container (Paper)
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.02)",
  },
}));

// Styled Table Header
export const TableHeader = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(to right, #8e44ad, #3498db)", // Gradient background for header
  color: "#ffffff",
  textTransform: "uppercase", // Capitalize header text
  fontWeight: 600,
  "& th": {
    padding: "12px 16px", // Padding for header cells
    textAlign: "left",
  },
}));

// Styled Table Row
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9", // Alternating row colors
  },
  "&:hover": {
    backgroundColor: "#f0f0f0", // Hover effect for rows
    cursor: "pointer", // Change cursor to pointer
  },
}));

// Styled Table Cells (for better readability)
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px", // Padding for table cells
  fontWeight: 500,
  color: "#333333",
  "&:first-of-type": {
    fontWeight: 600, // Make first column (Project Name) bolder
  },
}));

// Table Title for better UI consistency
export const TableTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#3f51b5",
  marginBottom: "16px",
}));

// Styled Table Cell for Status with Icon
export const StatusCell = styled(TableCell)(({ status }) => ({
  display: "flex",
  alignItems: "center",
  color:
    status === "Ongoing"
      ? "#27ae60"
      : status === "Completed"
      ? "#e74c3c"
      : "#f39c12", // Green for Ongoing, Red for Completed, Orange for Pending
  fontWeight: 500,
  padding: "12px 16px",
  textTransform: "capitalize", // Ensures the status is capitalized

  "& svg": {
    marginRight: "8px", // Space between icon and text
  },
}));
